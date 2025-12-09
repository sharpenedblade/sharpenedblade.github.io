---
title: Secure boot with Unified Kernel Images on Fedora
date: "2025-12-06"
description: Signed locally built UKIs using systemd-boot
---

Most modern linux distributions sign the kernel and bootloader, but leave the initrd completely unprotected. Secure boot will protect everything up to the kernel, but the initrd is trivially vulnerable to evil maid attacks. This can be fixed using signed [Unified Kernel Images](https://uapi-group.org/specifications/specs/boot_loader_specification/#type-2-efi-unified-kernel-images) (UKI) and `systemd-boot`.

A UKI contains the kernel, initrd, and command line all in a single PE file. This whole file can be cryptographically signed to prevent tampering. When used with a LUKS encrypted root partition, signed UKIs can prevent evil maid attacks as long as there are no [vulnerabilities](https://www.eset.com/us/about/newsroom/press-releases/eset-research-discovers-uefi-secure-boot-bypass-vulnerability/) in the UEFI firmware. UKIs also are a single file in the EFI partition, which makes them easy to manage.

_I am not responsible for any bricked computers, loss of important data, wasted time, and/or other problems caused by this article._

## Prerequisites

This needs reasonably modern UEFI firmware (most x86_64 CPUs will work) which is in secure boot `setup` mode. This guide assumes that Fedora is the only installed OS and that it is using the default partition layout. **Do not reboot until after the last step, and make sure to have a backup before beginning.**

## Move the EFI partition Mount Point

It is [recommended](https://0pointer.net/blog/linux-boot-partitions.html) to mount the EFI partition to `/efi`.

Create the new mount point.

```bash
mkdir /efi
```

Change the line in `/etc/fstab` that starts with `/boot/efi` to start with just `/efi`, and delete the line that starts with `/boot`.

Mount the EFI partition at the new mount point.

```bash
umount /boot/efi
mount /efi
```

Tell `kernel-install` to install new kernels to `/efi` by adding this to `/etc/kernel/install.conf`:

```
BOOT_ROOT=/efi
```

### Remove /boot and Grow /efi

The boot partition is not useful with systemd-boot, so it can safely be deleted. Identify the current root device by running `lsblk`, I am going to use `/dev/sdX` as a placeholder.

Back up all of `/efi`.

```bash
cp -a /efi /efi.bak
```

Unmount the EFI and boot partitions.

```bash
umount /efi /boot
```

Modify the partition table.

```
fdisk /dev/sdX
```

Delete (`d`) partition 1 (the EFI partition) and partition 2 (the boot partition). Create a new partition (`n`) and accept the default values. Set the partition type (`t`) to `EFI System`. Save these changes and quit (`w`).

Create an empty FAT32 filesystem in the new EFI partition.

```bash
mkfs.vfat -F 32 /dev/sdX1
```

Run `lsblk -o NAME,UUID` and copy the UUID of the new EFI partition. Open `/etc/fstab`, find the line that starts with `/efi`, and change the second field to `/dev/disk/by-uuid/DEAD-BEAF` (replace `DEAD-BEEF` with the UUID you just copied).

Mount the new EFI partition.

```bash
mount /efi
```

Restore the contents of the EFI partition.

```bash
cp -a /efi.bak/. /efi
rm -r /efi.bak
```

## Uninstall GRUB

Remove GRUB packages and install systemd-boot. Shim is also unnecessary because the firmware will directly trust the local signing key.

```bash
rm /etc/dnf/protected.d/{grub2*,shim.conf}
dnf remove grubby grub2-efi grub2-common shim
dnf install systemd-boot-unsigned sdubby
```

## Disable the Rescue Kernel

The rescue kernel does not work with UKI generation or secure boot signing. Fedora already keeps the last 3 installed kernels, so the rescue kernel is not very useful. Disable rescue kernel generation by adding this to `/etc/dracut.conf.d/50-no-rescue-image.conf`:

```
dracut_rescue_image=no
```

## Sign the Bootloader

First you have to install some utilities to help sign the bootloader. Install [`sbctl`](https://github.com/Foxboron/sbctl) from the [copr package](https://copr.fedorainfracloud.org/coprs/chenxiaolong/sbctl/). The RPM package has a scriptlet that will automatically sign EFI binaries when they are updated by dnf, so it is not recommended to manually install `sbctl`.

```bash
dnf copr enable chenxiaolong/sbctl
dnf install sbctl
```

Create a new signing key and enroll it with the firmware. This will also add the Microsoft signing key which is [required](https://github.com/Foxboron/sbctl/wiki/FAQ#option-rom) for some hardware. Enrolling the key will cause secure boot to exit `setup` mode, so other operating systems or ISOs will not boot anymore.

```bash
sbctl create-keys
sbctl enroll-keys
```

Copy the private key from `/var/lib/sbctl/keys/PK/PK.key` to somewhere safe, like a password manager, so you don't lose it. Make sure you keep this key a secret, anyone with the key can install a rootkit on your computer.

### Sign and Install systemd-boot

Sign the bootloader binary and register it with `sbctl`. `bootctl` will always use the signed binary, even if it is older than the unsigned binary.

```bash
sbctl sign -s /usr/lib/systemd/boot/efi/systemd-bootx64.efi -o /usr/lib/systemd/boot/efi/systemd-bootx64.efi.signed
```

Install systemd-boot into the efi partition.

```bash
bootctl install
```

Run `bootctl status` to make sure that everything is working correctly.

### Sign `fwupd`

Sign `fwupd`, which is required for firmware updates.

```bash
sbctl sign -s /usr/libexec/fwupd/efi/fwupdx64.efi -o /usr/libexec/fwupd/efi/fwupdx64.efi.signed
```

Tell `fwupd` to not use GRUB chainloading by adding this to `/etc/fwupd/fwupd.conf`:

```
[uefi_capsule]
EnableGrubChainLoad=false
DisableShimForSecureBoot=true
```

## Enable Unified Kernel Images

`ukify` can generate UKIs locally and is natively supported by `kernel-install`.

```bash
dnf install systemd-ukify
```

Add these lines to `/etc/kernel/install.conf` to enable `ukify`. Dracut will still be used to generate the initrd, so everything else will continue to work the same.

```
layout=uki
initrd_generator=dracut
uki_generator=ukify
```

Install the kernel into the EFI partition.

```bash
kernel-install add-all
```

**You can reboot your computer now.** You should also enable a firmware password, because otherwise attackers can secretly disable secure boot.

### Credits

https://swsnr.de/simple-secure-boot-in-fedora/

https://wiki.archlinux.org/title/Unified_Extensible_Firmware_Interface/Secure_Boot

https://www.freedesktop.org/software/systemd/man/latest/ukify.html

https://www.freedesktop.org/software/systemd/man/253/kernel-install.html

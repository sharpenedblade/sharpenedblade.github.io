---
title: Using a Fully Signed Boot Chain on Fedora 37
date: "2023-02-16"
description: The tooling for a fully signed boot chain already exists, how do we use it?
---

# Using a Fully Signed Boot Chain on Fedora 37

Modern linux distributions sign the kernel and the bootloader/shim, but leave the initrd completely unprotected. If the initrd is comprimised, then an attacker can steal your LUKS passphrase, tamper with the rest of you system, or do other bad things. It has been technically possible to fix this massive security hole for a long time, so why don't popular distributions do something about it? It turns out that fixing the gaping initrd hole might prevent people from running these distros on old/niche hardware.

Why don't distros just fix this security problem on supported hardware? It's _complicated_, but some distros are working on it. The existing solution to encrypt all of `/boot` is very fragile, and it also relies on support in `GRUB2`. There is a better way to fix the initrd hole, using modern UEFI features, without invasive system changes. How? By using `systemd-boot`, `sbctl`, `dracut`, and some clever scripts. We are going to create and sign a unified kernel image, then boot it with `systemd-boot`.

_I am not responsible for any bricked computers, loss of important data, wasted time, and/or other problems caused by this article._

## Prerequisites

You need to be running a modern Fedora system, preferably at least Fedora 36. You also need reasonable modern UEFI hardware. This method only works with x86_64 compatible CPUs, and your firmware has to be in secure boot `setup` mode.

## Replacing GRUB with systemd-boot

First, move the EFI system partition to `/efi`.

```bash
sudo mkdir /efi
sudo sed -i 's@/boot/efi@/efi@' /etc/fstab
sudo umount /boot/efi && sudo mount /efi
sudo ln -s /efi /boot/efi
```

This will move the ESP, change the mountpoint in `/etc/fstab`, then symlink our new mountpoint to `/boot/efi`. This makes sure naive packages still work with our new mountpoint.

Then remove `GRUB2` and install `systemd-boot`. **DO NOT REBOOT AFTER THIS STEP!**

```bash
sudo rm sudo rm /etc/dnf/protected.d/{grub*,shim.conf}
sudo dnf remove grubby grub2\* shim\*
sudo bootctl install
```

After running this you need to reinstall the kernel with `sudo dnf reinstall kernel-core`. This makes sure the kernel is installed to the right spot in the ESP.

### Signing the bootloader

First we have to install some utilities to help us sign the bootloader. Install [`sbctl`](https://github.com/Foxboron/sbctl), at the time of writing(2023-02-16) there are no packages for Fedora, so you have to compile and install it yourself.

```bash
sbctl create-keys
sbctl enroll-keys
sbctl sign -s /efi/EFI/systemd/systemd-bootx64.efi
sbctl sign -s /efi/EFI/BOOT/BOOTX64.EFI
```

### Signing fwupd

`fwupd` is used to update the system with new firmware from the vendor, so it is highly recomended to use `fwupd`. It is run at boot time so it has to be signed.

```bash
sbctl sign -s /efi/EFI/arch/fwupdx64.efi
sbctl sign -s /usr/lib/fwupd/efi/fwupdx64.efi -o /usr/lib/fwupd/efi/fwupdx64.efi.signed
```

## Using Unified Kernel Images

The default scripts to create the initrd do not handle unified images very well, so we have to write custom logic. These custom scripts might break for edge cases, but they _work for me_.

```bash
sudo ln -s /dev/null /etc/kernel/install.d/50-dracut.install
sudo ln -s /dev/null /etc/kernel/install.d/90-loaderentry.install
echo "layout=uki" >> /etc/kernel/install.conf
wget "https://raw.githubusercontent.com/Foxboron/sbctl/master/contrib/kernel-install/91-sbctl.install" /etc/kernel/install.d/91-sbctl.install
wget "https://gist.githubusercontent.com/sharpenedblade/3340f3235d7d5781c6e66547da7fd91f/raw/63c11f7ca8f1ad756db6439c8fab2c5e979ba83e/90-uefi-image.install" /etc/kernel/install.d/90-uefi-image.install
```

## Preparing to reboot

You have to reinstall the kernel for the changes we just made to apply. **You can reboot your computer after this step.**

Run `dnf reinstall kernel-core`

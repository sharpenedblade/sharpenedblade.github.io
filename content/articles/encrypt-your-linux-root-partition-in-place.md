---
title: Encrypting your Linux root partition in-place
date: "2025-05-20"
description: Convert your root partition to LUKS2 without reinstalling
---

You do not have to reinstall your system to convert your root partition to LUKS2. Existing data on disk might still be recoverable because of how modern flash storage works, but encryption will prevent any future data from being stolen by bad actors. Converting to LUKS2 means reading and writing to your entire partition, so for large disks this will take a long time. Even blocks that are not being used by your filesystem will be encrypted, which will make your entire partition look like random data.

You should have an ISO with a basic linux environment ready before you follow the rest of this guide. The ISO you used to install your system will usually work. Boot into the ISO to follow the rest of this guide. I will refer to the root partition as `/dev/sdX3`, you should replace that with the path to your actual root partition. You can find it by running `lsblk`.

## Shrink your partition

I am using btrfs, but there are similar commands for most other filesystems, you can search for them on you favorite search engine.

Shrink the root filesystem by 32 MiB:

```bash
mount /dev/sdX3 /mnt
btrfs filesystem resize -32M /mnt
umount /mnt
```

## Encrypt the partition with LUKS2

This will take a long time but it is safe to stop the command at any time, you just need to run it again when you want to resume. Once you run this command, there is no way to cancel the conversion, so only run this if you have the time to wait for it to finish. You can safely continue to use the filesystem during the conversion.

```bash
cryptsetup reencrypt --encrypt --reduce-device-size 32M --type luks2 /dev/sdX3
```

## Fix /etc/fstab and the kernel command line

Unlock your encrypted root filesystem.

```bash
cryptsetup open /dev/sdX3 root
```

Find the UUIDs of your encrypted root partition. You will need these later so you should write them down somewhere.

```bash
LUKS_UUID=$(cryptsetup luksUUID /dev/sdX3)
FS_UUID=$(lsblk -n -o UUID /dev/mapper/root)
```

Mount your root filesystem and efi partition to `/mnt`, for btrfs with the default subvolume setup on Fedora you can run these commands:

```bash
mount -o subvol=root /dev/mapper/root /mnt/
mount -o subvol=home /dev/mapper/root /mnt/home
mount /dev/sdX2 /mnt/boot
mount /dev/sdX1 /mnt/boot/efi
```

Create a shell in your root filesystem

```bash
systemd-nspawn -D /mnt
```

Make sure `/etc/fstab` refers the unlocked root partition by UUID, which is the default on most distros. If your system does not use UUIDs, you need to replace the block device path with `UUID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`(where the placeholder is your `$FS_UUID`). This is how it looks for me:

```txt
UUID=12345678-DEAD-BEEF-1234-123456ABCDEF / btrfs subvol=root 0 0
```

Add your encrypted root partition to `/etc/crypttab` so systemd can automatically unlock it.

```bash
echo "luks-$LUKS_UUID UUID=$LUKS_UUID none discard" >> /etc/crypttab
```

Add `rd.luks.uuid=` to your kernel command line, the instructions will vary depending on your distro. Also make sure your kernel command line refers to the root partition by UUID. On Fedora you can do this by running:

```bash
grubby --update-kernel=ALL --args=rd.luks.uuid=$LUKS_UUID
grubby --update-kernel=ALL --args=root=UUID=$FS_UUID
```

You can `exit` the chroot and reboot back into your main install now. Make sure to backup your LUKS header to somewhere safe so you don't lose all of your data, see the [ArchWiki page](https://wiki.archlinux.org/title/Dm-crypt/Device_encryption#Backup_and_restore) for more details.

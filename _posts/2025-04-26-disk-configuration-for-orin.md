---
title: 'Disk Configuration for Jetson Orin (JetPack 6.2)'
date: 2025-04-26
permalink: /posts/2025/01/disk-configuration-for-orin/
tags:
  - Robotics
  - Embedded System
  - OS
  - File System
  - exFAT
---



## Portable SSD (exFAT)
On JetPack 6.2, the exFAT file system is not recognized by default. Therefore, you need to perform the following steps to enable exFAT support, ensuring that your portable SSD formatted with exFAT can be properly read and written.

To enable exFAT support on your system, follow these steps:

1. Install the required packages:

   ```bash
   sudo apt install exfatprogs exfat-fuse
   ```

2. Create a mount point for the SSD:

   ```bash
   sudo mkdir -p /media/T7
   ```

3. Mount the SSD:

   ```bash
   sudo mount -t exfat-fuse /dev/sda1 /media/T7
   ```

4. Create a symbolic link to make exFAT mounting more accessible:

   ```bash
   sudo ln -s /usr/sbin/mount.exfat-fuse /sbin/mount.exfat
   ```



## NVME M.2 SSD

1. Identify the device

   ```bash
   # identify the device
   lsblk
   ```

   Assuming you identify the disk `/dev/nvme0n1`, this is the device we will mount.

2. Create the partition

   Create a new partition using `parted`:

   ```bash
   sudo parted /dev/nvme0n1 --script \
     mklabel gpt \
     mkpart primary ext4 0% 100%
   ```

   Replace `/dev/nvme0n1` with the device name identified in step 1.

3. Format the partition

   ```bash
   sudo mkfs.ext4 /dev/nvme0n1p1
   ```

   Again, replace `/dev/nvme0n1` with your actual device name from step 1.

4. Get the partition UUID

   ```bash
   sudo blkid /dev/nvme0n1p1
   ```

   Replace `/dev/nvme0n1p1` with the correct partition name identified in the previous steps. The output will look like this:

   ```bash
   /dev/nvme0n1p1: UUID="4849c3c4-3362-4e89-8457-b4b7d1804602" BLOCK_SIZE="4096" TYPE="ext4" PARTLABEL="primary" PARTUUID="b72a3784-c4ba-454c-98f1-01822c4a695f"
   ```

5. Create mount point

   Create the directory where the drive will be mounted:

   ```bash
   sudo mkdir -p /media/Data
   ```

6. Modify `/etc/fstab`

   ```bash
   sudo gedit /etc/fstab # nano is not available on JetPack 6.2
   ```

   Add the following line to the end of the file:

   ```bash
   UUID={the UUID you get from the previous command}  /media/Data  ext4  defaults,nofail,x-systemd.device-timeout=10  0  2
   ```

   Replace `{the UUID you got from the previous command}` with the actual UUID from step 4.

7. Mount and validate

   Mount all filesystems and check if the new drive is mounted correctly:

   ```bash
   sudo mount -a
   df -h | grep /media/Data
   ```

   Ensure that `/media/Data` shows up as the mount point.

8. (optional) Adjust user access

   ```bash
   # Adjust ownership and group
   sudo chown -R cairlab:cairlab /media/Data
   
   # Create a group for data users
   sudo groupadd datausers
   sudo usermod -aG datausers cairlab
   
   # (Optional) Add other users to the group if needed
   # sudo usermod -aG datausers {user_name}
   
   # Change ownership of the mounted directory to root and datausers group
   sudo chown root:datausers /media/Data
   
   # Set read/write permissions for all users
   sudo chmod 777 /media/Data
   
   ```

This ensures proper access control and permissions for the directory and mounted device.

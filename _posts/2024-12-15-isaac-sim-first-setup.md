---
title: 'Isaac Sim Beginner Tutorial and First Setup'
date: 2024-12-15
permalink: /posts/2024/12/isaac-sim-first-setup/
tags:
  - Isaac Sim
  - Isaac Lab
  - Robotics
  - Digital twins
  - Simulation
  - BRDF
  - BTDF
---



## Installation

### Omniverse Installation

**Omniverse is a platform of tools, and Isaac Sim is one of these tools.** Please refer to the [official tutorial](https://docs.omniverse.nvidia.com/isaacsim/latest/installation/distributions.html) for downloading Omniverse (and Isaac Sim). You may also find this unofficial [video tutorial](https://www.youtube.com/watch?v=SyrsAd8WbCo) useful. Please carefully check the hardware and system requirements to ensure the compatibility.

Even if you have already run the `chmod +x` command, the .AppImage file of Omniverse Launcher might still fail to execute due to permission issues.

Please check the permissions again:

```bash
ls -l omniverse-launcher-linux.AppImage
```

Ensure that the file has the `x` (executable) permission. If not, reset it:

```bash
sudo chmod +x omniverse-launcher-linux.AppImage
```

**File Manager Settings in the Desktop Environment**
Some Linux desktop environments do not allow .AppImage files to be executed directly by double-clicking. You can try running the file manually in the terminal to troubleshoot the issue:

```bash
./omniverse-launcher-linux.AppImage
```

Then, install any missing dependencies based on the error messages.



Here is the issue I encountered because of missing package of FUSE (libfuse2). After finishing the installation of FUSE, the Omniverse Launcher can be launched successfully. 

```bash
(base) yl3663@yiyuanlin-Desktop-CU:~/Downloads$ ls -l omniverse-launcher-linux.AppImage
-rwxrwxr-x 1 yl3663 yl3663 138424296 Dec 16 11:49 omniverse-launcher-linux.AppImage

(base) yl3663@yiyuanlin-Desktop-CU:~/Downloads$ ./omniverse-launcher-linux.AppImage 
dlopen(): error loading libfuse.so.2

AppImages require FUSE to run. 
You might still be able to extract the contents of this AppImage 
if you run it with the --appimage-extract option. 
See https://github.com/AppImage/AppImageKit/wiki/FUSE 
for more information

(base) yl3663@yiyuanlin-Desktop-CU:~/Downloads$ sudo apt update

(base) yl3663@yiyuanlin-Desktop-CU:~/Downloads$ sudo apt install libfuse2

```



### Isaac Sim Installation

Before installing Isaac Sim, it is helpful to install and run the lightweight app [Isaac Sim Compatibility Checker](https://docs.omniverse.nvidia.com/isaacsim/latest/installation/requirements.html#isaac-sim-compatibility-checker) to check if the machine meets the system requirements and compatibility.

Then you can install `Isaac Sim`,  `Omniverse Cache`, `Omniverse Nucleus Navigator` and `Omniverse Nucleus WRAPP` from **Omniverse->EXCHANGE**, where the other three are also essential for using Isaac Sim smoothly.



## Isaac Sim Beginner Crash Course

Please refer to the [official tutorial](https://docs.omniverse.nvidia.com/isaacsim/latest/introductory_tutorials/index.html)

### Basic Information

- Stage units
  - Isaac Sim versions prior to 2022.1 have stage units in centimeters, but the default is now meters. However, the default units for Omniverse Kit is still in centimeters.Keep that in mind if you see USD units that are seemingly off by 100x.

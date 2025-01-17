---
title: 'NTRIP and Local NTRIP via eduroam'
date: 2025-01-07
permalink: /posts/2025/01/ntrip-via-eduroam/
tags:
  - GPS
  - Navigation
  - Swarm
  - Robotics
  - NTRIP
  - Local NTRIP
  - Network
---


## Terms

- **(Reach) RS2+ / RS2plus** : the model name of a GPS receiver products from Emlid
- **(Reach) RS3** : the model name of another GPS receiver products from Emlid
- **base station**: a GPS receiver that keeps stable in a place to output stable correction signals to the moving GPS receiver (rover). The base station will NOT have RTK on itself.
- **rover**: a GPS receiver that moves in the field and receive correction signals from the base station. The rover will have RTK on itself since it receives corrections.
- **NTRIP**: NTRIP (Networked Transport of RTCM via Internet Protocol) is a protocol that streams GNSS correction data over the **internet.**
- **Local NTRIP**: a setup where a nearby base station provides corrections within a limited area via a local network (it doesn’t need to have internet connection). In our setup, the network we use to achieve local NTRIP is `eduroam`.



---



On Windows, MacOS and iPhone devices, the `eduroam` Wi-Fi connection is straightforward, as you just need to connect to the `eduroam` Wi-Fi and there will be a popping up web interface for you to login with your university ID. But we will not have a interface like this on a GPS receiver or any other devices without a GUI or browser. 

If you have some experiences on the `eduroam` Wi-Fi connection on Linux devices, you probably know we need to choose the `Security` as `WPA2, Enterprise` so you can enter your SSID and password instead of going to the web interface to log in with your university ID (and do the second step authentication).

We tested the NTRIP via eduroam on  Emlid Reach RS2+ and Reach RS3 successfully. Here are the workflow:

1. Enter the interface for your GPS receiver, and go to the Wi-Fi setting. Choose `Add a new network` , Do **NOT** click `eduroam` in the available network list since it will automatically choose the security option as `open` and this is not allowed for the connection between `eduroam` and other devices. Your connection will not be successful if you use the default setting.
   
    <img src='/images/posts/ntrip_via_eduroam/step_1.png'>
    
    Figure 1. Wi-Fi conection operation
    
2. Enter the Wi-Fi network information and then click `Connect` .
    - Network name: `eduroam`
    - Security: `WPA Enterprise`
    - Password: <Your password for you university ID / email>
    - Username: <Your university ID / email>
    - Authentication type: PEAP
    - IP settings: Automatic
    
    <img src='/images/posts/ntrip_via_eduroam/step_2.png'>
    
    Figure 2. eduroam connection information
    
3. Follow the instruction on your device to connect the GPS receiver to the `eduroam` Wi-Fi network. For Emlid Reach GPS receivers, you need to connect your own device (e.g. your computer or phone, which is used to connect to the GPS receiver and edit the information in the interface) to the `eduroam` Wi-Fi network. Then the GPS receiver would also connect to it.



> [!TIP]
>
> Now we have connected our devices to the `eduroam` . In our setup, we use RS2+ as the base station (set `Base output`) and RS3 as the rover (set `Correction input`). They are all connected to the `eduroam` .
>
> **Note**: You may **NOT** be able to see the GPS receivers via network in the available devices list because `eduroam` may block the search, although there was once that I am able to see it but I guess this is just a coincidence.



4. Connect to the base station (RS2+) and enter the interface, then click `Base output` (Figure 3a) to select the base output method as `Local NTRIP` (Figure 3b). It will automatically generate the NTRIP configuration information (Figure 3c). You probably want to write it down or make a screenshot to record this as you will need to enter these information on the rover (RS3)
   
    <img src='/images/posts/ntrip_via_eduroam/Figure_3_Operation_on_the_base_station.png'>
    
    Figure 3. Operation on the base station
    
5. Connect to the rover (RS3) and enter the interface, then click `Correction input` (Figure 4a) to select the correction input method as `NTRIP`. You need to enter the NTRIP configuration information generated from the base station (RS2+) from step 4 (Figure 3c and 4b). Then the rover (RS3) should receive corrections (Figure 4c) from the base station (RS2+).
   
    <img src='/images/posts/ntrip_via_eduroam/Figure_4_Operation_on_the_rover.png'>

    Figure 4. Operation on the rover


For the above operations, we used local NTRIP via eduroam. We can also use NTRIP via eduroam since Emlid provides Emlid NTRIP Caster. Emlid Caster is a cloud service that implements the NTRIP protocol and acts as a line of communication between connected to the internet GNSS receivers. With Emlid Caster, you can easily transmit RTK corrections—connect your base and rover to the same mount point, an automatically generated correction stream, and start surveying.

To set up RTK over Emlid NTRIP Caster, please refer to the [official guide](https://docs.emlid.com/reachrs3/rtk-quickstart/reachrs3-kit/rtk-over-emlid-ntrip-caster/).
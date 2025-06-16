---
title: 'Building a Robust WiFi Relay with Wireless Router'
date: 2025-06-16
permalink: /posts/2025/01/wifi-relay/
tags:
  - Robotics
  - GPS
  - Navigation
  - Swarm
  - NTRIP
  - Local NTRIP
  - Network
---



This dev note summarizes how I configured a wireless relay system using the Teltonika RUT951 wireless router to support **robot swarm communication via network** and two types of RTK GPS correction workflows:

1. **NTRIP over the Internet**
2. **Local NTRIP caster within a WiFi-only LAN**

At the core of both workflows is a **robust and flexible network bridge**, built with the wireless router, that overcomes the weak WiFi reception of many field-deployed GPS receivers and edge computing units. The same architecture also enables scalable **robot swarm networking** in outdoor environments.



## Motivation

Many GPS receivers (especially embedded or compact modules) have **weak WiFi radios and frequent disconnections** when accessing distant APs in the field. In vineyard-scale environments, access points like McCarthy_Internet may be available, but devices fail to maintain stable links.

Wireless router solves this problem by acting as:

1. **A wireless client** to central APs
2. **A local access point** for GPS and companion devices
3. **A NAT/relay bridge**, enabling devices to reach the Internet or LAN services



## Hardware Architecture

Each robot is equipped with:

1. **A wireless router** as the networking hub
2. **A network switch**, connected to the wireless router via LAN

Multiple onboard devices (e.g., GPS receiver, edge computer, cameras) connected to the switch

```markdown
                    [Central WiFi: McCarthy_Internet]
                             (192.168.50.1, No Internet or with Internet)
                                  ↓
          [Wireless Router RUT951 connects as WiFi Client (WWAN)]
                             (WAN IP: e.g., 192.168.50.10)
                                  ↓
                          [LAN: 192.168.4.1]   -> GPS Rover (192.168.4.xx)
                                  ↓
                             [Onboard Switch]
              ┌────────────┬──────────────┬────────────┐
              │Raspberry Pi| Jetson Orin  │ Other Node │
              │ 192.168.4.X│  192.168.4.Y │ 192.168.4.Z│
              └────────────┴──────────────┴────────────┘
```



This ensures **a stable internal LAN** on each robot, while the wireless router handles upstream relay to the central WiFi network.



## Wireless Router Configuration

1. Wireless WAN (Client Mode)
   - Go to Network → Wireless → scan for the central WiFi (e.g. McCarthy_Internet)
   - Join network → set interface to `wwan`
   - Check under Status → Interfaces that `wwan` gets an IP (e.g., `192.168.50.10`)

2. Local LAN and WiFi
   - LAN IP: `192.168.4.1` (default)
   - DHCP server enabled
   - WiFi AP (SSID: `RUT951_BD51`) also bridged to LAN

3. Enable Routing & NAT
   - **Firewall → Zones**: ensure LAN → WWAN and WWAN → LAN forwarding are enabled
   - **Masquerading (NAT)** should be checked for wwan interface
   - Devices on LAN/switch receive IPs and route via `192.168.4.1`

<img src='/images/posts/wifi_relay/client.png'>


<img src='/images/images/posts/wifi_relay/zones.png'>

## 🤖 Beyond GPS: Robust Networking for Edge Devices and Robot Swarms

While GPS receivers often struggle with weak WiFi connectivity in the field, edge computing devices (e.g., Jetson Orin, Raspberry Pi, industrial PCs) face similar challenges — especially when mounted on mobile robots operating across large outdoor environments like vineyards.

Each robot integrates a **local network switch**, connecting all internal modules (GPS, camera, compute) via Ethernet. The switch uplinks to the wireless router’s LAN port, forming a reliable and low-latency **robot-local LAN**.

In the context of robot swarms, where multiple autonomous units operate concurrently, maintaining **reliable inter-robot communication** becomes just as critical as accessing external services such as NTRIP or cloud storage.

To support this, we adopt the following principle:

- Each robot builds a self-contained LAN, centered on a wireless router + switch
- All robots connect their LANs to a shared central WiFi (WAN) — ideally with field-wide coverage — to enable:
  - RTK correction from a centralized base station
  - Swarm coordination and messaging
  - Telemetry upload and cloud integration
  - Remote SSH, debugging, or control

This architecture scales well and ensures that even if Internet access is unavailable, local NTRIP services and inter-robot communication can still operate effectively within the same wireless infrastructure.



## 🛰️ RTK-GPS Application Layer

With the above network infrastructure, two downstream GPS correction pipelines become possible:

### Option 1: NTRIP Over the Internet

- GPS Rover connects to the wireless router AP (IP: 192.168.4.65)

- RUT951 relays traffic through wwan → McCarthy_Internet → Internet

- GPS configured as NTRIP client

- Internet is **required**

- Benefit: Global NTRIP access from anywhere with WiFi.

  

### Option 2: Local NTRIP (No Internet)

- GPS Base station is connected to Crittenden_South (only local network, no Internet, e.g., gets IP 192.168.50.25)
- Runs a local NTRIP base output
- Wireless router connects to same AP (wwan gets 192.168.50.xx)
- Rover GPS (connected to wireless router AP) gets IP: 192.168.4.65
- Rover NTRIP client configured as:
  - Host: 192.168.50.25 ✅ (Base device IP)
  - Port: 2101
  - Mountpoint: ...
- No Internet required ❌
- Benefit: Full local RTK corrections in no Internet environments.



## Takeaways

- Separate the concerns: let the router and switch manage connectivity; sensors and GPS stay focused on their roles.

- RUT951 performs far better than embedded WiFi modules, especially in signal-challenged outdoor environments.

- The architecture supports modular scalability: plug additional devices into the switch with zero reconfiguration.





This flexible relay design with RUT951 and onboard network switches has become the backbone of my field robot swarm and RTK deployments. It enables robust communication, scalable sensor integration, and swarm coordination in real-world environments.


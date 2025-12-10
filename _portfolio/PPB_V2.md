---
title: "PhytoPatholoBot V2 - PPBv2"
excerpt: "Dual side phenotyping robot with active illumination<br/><img src='/images/portfolio/PPB_V2/ppbv2_in_field.gif'>"
collection: robot
permalink: /robots/ppbv2
date: 2025-05-01
---

> The PPBv2 codebase, including navigation modules and data acquisition scripts is open-source [here](https://github.com/YiyuanLinXX/PPBv2).

<img src='/images/portfolio/PPB_V2/ppbv2_in_field.gif'>

## Overview

PhytoPatholoBot v2 (PPBv2) is a second-generation field-deployable robotic platform designed for high-throughput phenotyping in specialty crops. Built on a compact mobile base and integrated with an active illumination system, PPBv2 captures synchronized structured-light RGB stereo imagery under controlled lighting conditions. The robot supports real-time navigation and GPS-synchronized data logging, providing centimeter-level localization and precise geo-referencing of every image frame in vineyard environments.

The imaging system is optimized for powdery mildew detection and canopy analysis, supporting downstream tasks such as semantic segmentation, disease quantification, and multi-date temporal phenotyping. PPBv2 has been actively used in field deployments across commercial vineyards and research plots, providing robust, consistent, and scalable data for vision-language-model (VLM) based phenotyping pipelines such as [SAM-CLIP](https://github.com/YiyuanLinXX/SAM-CLIP).

**Key Feature:**
- Active illumination module (strobe-based) with fast shutter camera(s) to reduce background
- Stereo RGB camera pair for 3D canopy reconstruction
- RTK-GPS + IMU for autonomous navigation and precise georeferencing of each image frame

The platform is fully ROS2-integrated and designed for rugged outdoor operation in vineyards. Data collected by PPBv2 fuels downstream disease segmentation models and multi-modal phenotyping studies, enabling scalable, objective, and repeatable measurement of grapevine disease severity.

## Collected Sample Data
<img src='/images/portfolio/PPB_V2/ppbv2_sample_data.png'>

# PPBv2 2025 Edition
<img src='/images/portfolio/PPB_V2/ppbv2_2025.jpeg'>

# PPBv2 2024 Edition
<img src='/images/portfolio/PPB_V2/PPB_Amiga_1.gif'> <img src='/images/portfolio/PPB_V2/PPB_Amiga_turn.gif'>

<img src='/images/portfolio/PPB_V2/IMG_0394.jpeg'>

<img src='/images/portfolio/PPB_V2/IMG_0395.jpeg'>

<img src='/images/portfolio/PPB_V2/IMG_0397.jpeg'>

<img src='/images/portfolio/PPB_V2/IMG_0398.jpeg'>
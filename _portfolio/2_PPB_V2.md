---
title: "PhytoPatholoBot V2 - PPB-Amiga"
excerpt: "Dual side phenotyping robot with active illumination<br/><img src='/images/portfolio/PPB_V2/PPB_Amiga_1.gif'> <img src='/images/portfolio/PPB_V2/PPB_Amiga_turn.gif'>"
collection: portfolio
---

> The PPBv2 codebase, including navigation modules and data acquisition scripts is open-source [here](https://github.com/YiyuanLinXX/PPBv2).
<img src='/images/portfolio/PPB_V2/ppbv2_in_field.gif'>

PPBv2 (PhytoPatholoBot v2) is a second-generation field-deployable robotic platform designed for high-throughput phenotyping in specialty crops. Built on a compact mobile base and integrated with an active illumination system, PPBv2 captures synchronized structured-light RGB stereo imagery under controlled lighting conditions. The robot is equipped with GPS-synchronized data logging and real-time navigation, enabling centimeter-level localization in vineyard environments.

The imaging suite is optimized for powdery mildew detection and canopy analysis, supporting downstream tasks such as semantic segmentation, disease quantification, and multi-date temporal phenotyping. PPBv2 has been actively used in field deployments across commercial vineyards and research plots, providing robust, consistent, and scalable data for vision-language-model (VLM) based phenotyping pipelines such as SAM-CLIP.

If you want a slightly more detailed technical version (still concise)

PPBv2 is a second-generation autonomous phenotyping robot equipped with:

Key Feature:
- Active illumination module (strobe-based) with fast shutter camera(s) to reduce background
- Stereo RGB camera pair for 3D canopy reconstruction
- RTK-GPS + IMU for autonomous navigation and precise georeferencing of each image frame

The platform is fully ROS2-integrated and designed for rugged outdoor operation in vineyards. Data collected by PPBv2 fuels downstream disease segmentation models and multi-modal phenotyping studies, enabling scalable, objective, and repeatable measurement of grapevine powdery mildew severity.


<img src='/images/portfolio/PPB_V2/ppbv2_2025.jpeg'>
<img src='/images/portfolio/PPB_V2/IMG_0394.jpeg'>
<img src='/images/portfolio/PPB_V2/IMG_0395.jpeg'>
<img src='/images/portfolio/PPB_V2/IMG_0397.jpeg'>
<img src='/images/portfolio/PPB_V2/IMG_0398.jpeg'>
---
title: "Automated rice phenology stage mapping using UAV images and deep learning"
collection: publications
category: manuscripts
permalink: /publication/rice-phenology-stage-mapping
excerpt: 'Xiangyu Lu, Jun Zhou, Rui Yang, Zhiyan Yan, <strong>Yiyuan Lin</strong>, Jie Jiao, Fei Liu, Drones'
date: 2023-01-25
venue: 'Drones'
paperurl: 'https://www.mdpi.com/2504-446X/7/2/83'
---

**Abstract**
Accurate monitoring of rice phenology is critical for crop management, cultivars breeding, and yield estimating. Previously, research for phenology detection relied on time-series data and orthomosaic and manually plotted regions, which are difficult to automate. This study presented a novel approach for extracting and mapping phenological traits directly from the unmanned aerial vehicle (UAV) photograph sequence. First, a multi-stage rice field segmentation dataset containing four growth stages and 2600 images, namely PaddySeg, was built. Moreover, an efficient Ghost Bilateral Network (GBiNet) was proposed to generate trait masks. To locate the trait of each pixel, we introduced direct geo-locating (DGL) and incremental sparse sampling (ISS) techniques to eliminate redundant computation. According to the results on PaddySeg, the proposed GBiNet with 91.50% mean-Intersection-over-Union (mIoU) and 41 frames-per-second (FPS) speed outperformed the baseline model (90.95%, 36 FPS), while the fastest GBiNet_t reached 62 FPS which was 1.7 times faster than the baseline model, BiSeNetV2. Additionally, the measured average DGL deviation was less than 1% of the relative height. Finally, the mapping of rice phenology was achieved by interpolation on trait value–location pairs. The proposed approach demonstrated great potential for automatic rice phenology stage surveying and mapping.

**Keywords**: rice phenology; image segmentation; deep learning; UAV images; direct geo-locating
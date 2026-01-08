---
title: "Automated rice phenology stage mapping using UAV images and deep learning"
collection: publications
category: manuscripts
permalink: /publication/rice-phenology-stage-mapping
excerpt: "Xiangyu Lu, Jun Zhou, Rui Yang, Zhiyan Yan, <strong>Yiyuan Lin</strong>, Jie Jiao, Fei Liu, <i><strong>Drones</strong></i>, 2023<br/><img src='/images/publications/drones-07-00083-g005.webp'>"
paperurl: 'https://www.mdpi.com/2504-446X/7/2/83'
date: 2023-01-25
---

<!-- Authors -->
Xiangyu Lu<sup>1,2</sup>, Jun Zhou<sup>1,3</sup>, Rui Yang<sup>1</sup>, Zhiyan Yan<sup>4</sup>, Yiyuan Lin<sup>1</sup>, Jie Jiao<sup>1</sup>, Fei Liu<sup>1,2,*</sup>

<!-- Affiliation -->
<sup>1</sup> College of Biosystems Engineering and Food Science, Zhejiang University, Hangzhou 310058, China<br/>
<sup>2</sup> Huanan Industrial Technology Research Institute, Zhejiang University, Guangzhou 510700, China<br/>
<sup>3</sup> College of Mechanical and Electrical Engineering, Xinjiang Agricultural University, Urumqi 830052, China<br/>
<sup>4</sup> Institute of Agricultural Economics and information, Jiangxi Academy of Agricultural Sciences, Nanchang 330200, China<br/>
<sup>*</sup> Author to whom correspondence should be addressed.

<!-- Paper URL -->
### Publication

[Full Paper](https://www.mdpi.com/2504-446X/7/2/83)

---

<!-- Abstract and Keyword -->
### Abstract

Accurate monitoring of rice phenology is critical for crop management, cultivars breeding, and yield estimating. Previously, research for phenology detection relied on time-series data and orthomosaic and manually plotted regions, which are difficult to automate. This study presented a novel approach for extracting and mapping phenological traits directly from the unmanned aerial vehicle (UAV) photograph sequence. First, a multi-stage rice field segmentation dataset containing four growth stages and 2600 images, namely PaddySeg, was built. Moreover, an efficient Ghost Bilateral Network (GBiNet) was proposed to generate trait masks. To locate the trait of each pixel, we introduced direct geo-locating (DGL) and incremental sparse sampling (ISS) techniques to eliminate redundant computation. According to the results on PaddySeg, the proposed GBiNet with 91.50% mean-Intersection-over-Union (mIoU) and 41 frames-per-second (FPS) speed outperformed the baseline model (90.95%, 36 FPS), while the fastest GBiNet_t reached 62 FPS which was 1.7 times faster than the baseline model, BiSeNetV2. Additionally, the measured average DGL deviation was less than 1% of the relative height. Finally, the mapping of rice phenology was achieved by interpolation on trait value–location pairs. The proposed approach demonstrated great potential for automatic rice phenology stage surveying and mapping.

**Keywords**: rice phenology; image segmentation; deep learning; UAV images; direct geo-locating

<!-- Citation -->
### Citation
```bibtex
@Article{drones7020083,
AUTHOR = {Lu, Xiangyu and Zhou, Jun and Yang, Rui and Yan, Zhiyan and Lin, Yiyuan and Jiao, Jie and Liu, Fei},
TITLE = {Automated Rice Phenology Stage Mapping Using UAV Images and Deep Learning},
JOURNAL = {Drones},
VOLUME = {7},
YEAR = {2023},
NUMBER = {2},
ARTICLE-NUMBER = {83},
URL = {https://www.mdpi.com/2504-446X/7/2/83},
ISSN = {2504-446X},
DOI = {10.3390/drones7020083}
}
```
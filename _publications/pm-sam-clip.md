---
title: "Effective integration of vision foundational models for semantic segmentation to quantify grape foliage powdery mildew infection"
collection: publications
category: conferences
permalink: /publications/pm-sam-clip
excerpt: "<strong>2024 ITSC Best Paper Award</strong><br/><strong>Yiyuan Lin</strong>, Anna Underhill, Lance Cadle-Davison, Ana Jimenez, Summaira Riaz, Yu Jiang, <i><strong>ASABE Annual International Meeting</strong></i>, 2024<br/><img src='/images/publications/pm_sam_clip_asabe.png'>"
# slidesurl: 'http://academicpages.github.io/files/slides1.pdf'
paperurl: 'https://elibrary.asabe.org/abstract.asp?aid=54830'
date: 2024-04-21
---

<!-- Authors -->
Yiyuan Lin<sup>1</sup>, Anna Underhill<sup>2</sup>, Lance Cadle-Davison<sup>2,3</sup>, Ana Jimenez<sup>4</sup>, Summaira Riaz<sup>4</sup>, Yu Jiang<sup>5,*</sup>

<!-- Affiliation -->
<sup>1</sup> School of Electrical and Computer Engineering, College of Engineering, Cornell University, Ithaca, NY 14850, USA<br/>
<sup>2</sup> Grape Genetics Research Unit, United States Department of Agriculture-Agricultural Research Service, Geneva, NY 14456, USA<br/>
<sup>3</sup> Plant Pathology and Plant-Microbe Biology Section, School of Integrative Plant Science, Cornell University, Geneva, NY 14456, USA<br/>
<sup>4</sup> San Joaquin Valley Agricultural Center, United States Department of Agriculture-Agricultural Research Service, Parlier, CA 93648, USA<br/>
<sup>5</sup> Horticulture Section, School of Integrative Plant Science, Cornell University, Geneva NY 14456, USA<br/>
<sup>*</sup> Correspondence: yujiang@cornell.edu

<!-- Paper URL -->
**Publication**

[Full Paper](https://elibrary.asabe.org/abstract.asp?aid=54830)

---

<!-- Abstract and Keyword -->
**Abstract**

Deepening the understanding of powdery mildew (PM) and developing PM-resistant crop cultivars are crucial for developing sustainable, resilient agrifood systems, particularly for valuable crops like wine grapes. Advances in sensing and AI have enhanced high-throughput phenotyping, aiding genetic research and breeding. However, most analysis pipelines rely on extensive data annotation and struggles with generalizability across geographic variations and genetic background. Vision foundational models (VFMs) show great potential in image-based tasks but adapting them to specific agricultural challenges requires significant customization to incorporate specialized knowledge and appearances. In this study, we proposed a simple yet effective method to integrate two VFMs, CLIP and SAM, and applied this approach to grape PM segmentation. Image datasets were collected using a custom active illumination imaging system from vineyards in CA and NY. The merged SAM-CLIP model was fine-tuned with the NY dataset into a model yielding PM-SAM-CLIP that possesses a strong semantic and spatial understanding of powdery mildew. The two datasets were segmented by SAM-CLIP and PM-SAM-CLIP to generate masks of grapevine canopy and PM infection, which were then used to quantify the infection severity. Our results showed that PM-SAM-CLIP outperformed the fine-tuned SAM model and the DeepLab v3+ model. This suggested the effectiveness of integrating and fine-tuning multimodal VFMs and the efficacy of using VFMs for domain-specific applications. Therefore, the developed training strategy would significantly facilitate the development of data analysis pipelines for high throughput phenotyping and increase the total throughput and outcome of genetics studies and breeding programs.

**Keywords**: CLIP; Computer Vision; Powdery Mildew; SAM; Semantic Segmentation; Vineyard Management

<!-- Citation -->
**Citation**
```bibtex
@inproceedings{linEffectiveIntegrationVision2024,
  title = {Effective Integration of Vision Foundational Models for Semantic Segmentation to Quantify Grape Foliage Powdery Mildew Infection},
  booktitle = {2024 {{ASABE Annual International Meeting}}},
  author = {Lin, Yiyuan and Underhill, Anna and {Cadle-Davison}, Lance and Jimenez, Ana and Riaz, Summaira and Jiang, Yu},
  year = 2024,
  series = {{{ASABE Paper No}}. 2401108},
  pages = {1},
  publisher = {ASABE},
  address = {St. Joseph, MI},
  doi = {10.13031/aim.202401108},
  keywords = {CLIP,Computer Vision,Powdery Mildew,SAM,Semantic Segmentation,Vineyard Management.}
}
```
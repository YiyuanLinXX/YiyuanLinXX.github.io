---
title: "Effective integration of vision foundational models for semantic segmentation to quantify grape foliage powdery mildew infection"
collection: publications
category: conferences
permalink: /publications/pm-sam-clip
excerpt: '<strong>Yiyuan Lin</strong>, Anna Underhill, Lance Cadle-Davison, Ana Jimenez, Summaira Riaz, Yu Jiang, 2024 ASABE Annual International Meeting'
date: 2024-02-18
venue: 'ASABE AIM 2024'
slidesurl: 'http://academicpages.github.io/files/slides1.pdf'
paperurl: 'https://elibrary.asabe.org/abstract.asp?aid=54830'
---

Citation:  2024 ASABE Annual International Meeting  2401108.(doi:10.13031/aim.202401108)
Authors:   Yiyuan Lin, Anna Underhill, Lance Cadle-Davison, Ana Jimenez, Summaira Riaz, Yu Jiang
Keywords:   CLIP, Computer Vision, Powdery Mildew, SAM, Semantic Segmentation, Vineyard Management.

Abstract: Deepening the understanding of powdery mildew (PM) and developing PM-resistant crop cultivars are crucial for developing sustainable, resilient agrifood systems, particularly for valuable crops like wine grapes. Advances in sensing and AI have enhanced high-throughput phenotyping, aiding genetic research and breeding. However, most analysis pipelines rely on extensive data annotation and struggles with generalizability across geographic variations and genetic background. Vision foundational models (VFMs) show great potential in image-based tasks but adapting them to specific agricultural challenges requires significant customization to incorporate specialized knowledge and appearances. In this study, we proposed a simple yet effective method to integrate two VFMs, CLIP and SAM, and applied this approach to grape PM segmentation. Image datasets were collected using a custom active illumination imaging system from vineyards in CA and NY. The merged SAM-CLIP model was fine-tuned with the NY dataset into a model yielding PM-SAM-CLIP that possesses a strong semantic and spatial understanding of powdery mildew. The two datasets were segmented by SAM-CLIP and PM-SAM-CLIP to generate masks of grapevine canopy and PM infection, which were then used to quantify the infection severity. Our results showed that PM-SAM-CLIP outperformed the fine-tuned SAM model and the DeepLab v3+ model. This suggested the effectiveness of integrating and fine-tuning multimodal VFMs and the efficacy of using VFMs for domain-specific applications. Therefore, the developed training strategy would significantly facilitate the development of data analysis pipelines for high throughput phenotyping and increase the total throughput and outcome of genetics studies and breeding programs.
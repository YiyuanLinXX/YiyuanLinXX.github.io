---
title: "SAM-CLIP-Thermal: Leveraging Large Multimodal Models for Reliable and Scalable Annotation of Thermal Image Segmentation in Field Plant Phenotyping"
collection: publications
category: manuscripts
permalink: /publications/sam-clip-thermal
excerpt: '<strong>Yiyuan Lin</strong>, Chenjiao Tan, Changying Li, Yu Jiang, Computers and Electronics in Agriculture (under review), 2025'
# slidesurl: 'http://academicpages.github.io/files/slides1.pdf'
# paperurl: 'https://elibrary.asabe.org/abstract.asp?aid=54830'
date: 2025-12-04
---

<!-- Citation:  2024 ASABE Annual International Meeting  2401108.(doi:10.13031/aim.202401108) -->
Authors: Yiyuan Lin<sup>1†</sup>, Chenjiao Tan<sup>2†</sup>, Changying Li<sup>2*</sup>, Yu Jiang<sup>3*</sup>

1 School of Electrical and Computer Engineering, College of Engineering, Cornell University, Ithaca, NY 14850, USA

2 Department of Agricultural and Biological Engineering, Institute of Food and Agricultural Sciences, University of Florida, Gainesville, FL 32611, USA

3 Horticulture Section, School of Integrative Plant Science, Cornell University, Geneva, NY 14456, USA

<sup>†</sup> These authors contributed equally and share first authorship.

<sup>*</sup> Corresponding authors.

**Abstract**

Thermal imaging enables non-invasive assessment of canopy temperature an essential indicator of plant stresses, yet the lack of color cues and strong shadow interference makes plant segmentation in thermal images difficult. Recent advances in foundation models have demonstrated improved performance and generalizability across applications, showing promises to domain applications with limited annotated datasets such as plant segmentation in thermal images. This study investigates large multimodal models (LMMs) for thermal image segmentation in plant phenotyping. Building upon the SAM-CLIP framework, we design a unified pipeline spanning zero-shot inference, few-shot and low-shot fine-tuning, and active learning to maximize accuracy with minimal supervision. Evaluations on two thermal datasets, LadyBird Brassica and UGA Brassica, demonstrate robust performance after minimal adaptation across both datasets and superior performance over conventional baselines, achieving mIoU^D^ values of 97.54% on LadyBird dataset and 76.94% on UGA dataset. We also release the resulting thermal segmentation annotations to support community benchmarking and reproducible research, highlighting the potential of LMMs to enable scalable, high quality dataset construction for field phenotyping. The released datasets can be found at: [https://cornell.box.com/s/dh69xf84464yrc1vlws92l1tflx7qa89](https://cornell.box.com/s/dh69xf84464yrc1vlws92l1tflx7qa89).

**Keywords**: thermal image segmentation; large multimodal models; SAM; CLIP; transfer learning; dataset

**Citation**
```bibtex
TODO
```
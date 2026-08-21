---
title: "SAM-CLIP-Thermal: Leveraging Large Multimodal Models for Reliable and Scalable Annotation in Thermal Image Segmentation for Field Plant Phenotyping"
collection: publications
category: manuscripts
permalink: /publications/sam-clip-thermal
authors: "<strong>Yiyuan Lin</strong>, Chenjiao Tan, Changying Li, Yu Jiang"
publication: "Plant Phenomics"
pub_image: "/images/publications/sam_clip_thermal.png"
date: 2026-08-09
---

<!-- Authors -->
Yiyuan Lin<sup>1,†</sup>, Chenjiao Tan<sup>2,†</sup>, Changying Li<sup>2,*</sup>, Yu Jiang<sup>3,*</sup>

<!-- Affiliation -->
<sup>1</sup> School of Electrical and Computer Engineering, College of Engineering, Cornell University, Ithaca, NY 14850, USA<br/>
<sup>2</sup> Department of Agricultural and Biological Engineering, Institute of Food and Agricultural Sciences, University of Florida, Gainesville, FL 32611, USA<br/>
<sup>3</sup> Horticulture Section, School of Integrative Plant Science, Cornell University, Geneva, NY 14456, USA<br/>
<sup>†</sup> These authors contributed equally and share first authorship.<br/>
<sup>*</sup> Corresponding authors.


[[**`Paper`**](https://www.sciencedirect.com/science/article/pii/S2643651526001019)] [[**`Codebase`**](https://github.com/YiyuanLinXX/SAM-CLIP)] [[**`Dataset`**](https://cornell.box.com/s/dh69xf84464yrc1vlws92l1tflx7qa89)]

<!-- Paper URL -->
### Publication

Please find the manuscript published on Plant Phenomics [here](https://www.sciencedirect.com/science/article/pii/S2643651526001019).

---

<!-- Abstract and Keyword -->
### Abstract

Thermal imaging enables non-invasive assessment of canopy temperature an essential indicator of plant stresses, yet the lack of color cues and strong shadow interference makes plant segmentation in thermal images difficult. Recent advances in foundation models have demonstrated improved performance and generalizability across applications, showing promises to domain applications with limited annotated datasets such as plant segmentation in thermal images. This study investigates large multimodal models (LMMs) for thermal image segmentation in plant phenotyping. Building upon the SAM-CLIP framework, we design a unified pipeline spanning zero-shot inference, few-shot and low-shot fine-tuning, and active learning to maximize accuracy with minimal supervision. Evaluations on two thermal datasets, LadyBird Brassica and UGA Brassica, demonstrate robust performance after minimal adaptation across both datasets and superior performance over conventional baselines, achieving mIoU^D^ values of 97.54% on LadyBird dataset and 76.94% on UGA dataset. We also release the resulting thermal segmentation annotations to support community benchmarking and reproducible research, highlighting the potential of LMMs to enable scalable, high quality dataset construction for field phenotyping. The released datasets can be found at: [https://cornell.box.com/s/dh69xf84464yrc1vlws92l1tflx7qa89](https://cornell.box.com/s/dh69xf84464yrc1vlws92l1tflx7qa89).

**Keywords**: thermal image segmentation; large multimodal models; SAM; CLIP; transfer learning; dataset


### Author’s Note

Although this paper was successfully accepted and published, I was not entirely satisfied with the final version. After two rounds of revisions in response to reviewer feedback, the manuscript became substantially longer and more crowded, and I felt that its central message became less visible.

This experience also reflects a broader shift in how I have come to think about research over the past two years. With the rapid development of foundation models and supervised fine-tuning, the marginal gains from incremental changes to model architectures and algorithms are becoming increasingly small. In many applied domains, greater progress may now come from **building better benchmarks and providing larger, more diverse, and more reliable training datasets**.

This is particularly relevant in agricultural research. Once model performance begins to plateau, I do not think we should place too much emphasis on marginal improvements in metrics such as mIoU or mDice. Our ultimate goal is to **answer biological questions**, not merely computer vision questions. In many cases, the final gain of less than one percentage point has little or no effect on downstream applications such as phenotypic analysis. Any such gain can easily be overwhelmed by the noise introduced by biological variability and by the multiple stages of a downstream analytical pipeline.

Unfortunately, after we submitted this paper, one question repeatedly appeared in the reviewer feedback: if the models were adopted from previous work, where was the novelty?

From my perspective as the first author, the paper makes two contributions that matter far more than proposing another model architecture:

1. It releases **a large annotated dataset containing more than 58,000 images and their corresponding crop segmentation masks**.

2. It provides **an in-depth analysis of the agreement between model-generated masks and human annotations, evaluates their consistency and reliability, and demonstrates the clear advantages of model-generated masks in this setting**.

In response to the reviews (some comments appeared to be AI-generated), we were required to add extensive comparisons among model architectures and training configurations. Although these experiments may satisfy conventional expectations for a computer vision paper, I do not consider them the most meaningful part of this work. The literature already contains countless papers built around similar comparisons, each claiming a new state of the art, while the same small group of architectures continues to dominate most benchmarks.

As a result, the published paper is longer and less focused than I would have preferred. For readers interested in the work, I particularly recommend **Section 3.4, “Human annotation consistency and reliability of model-generated masks”, Figure 6 and Figure 7**. In my view, this is both the most interesting and the most scientifically meaningful part of the paper.

<img src='/images/publications/violin_t_test_and_pairwise_miou.png' width="100%">
Figure 6. Analysis of human annotation disagreement on the UGA global test dataset. (A) Distribution of per-image Fleiss' κ across three UGA subsets, comparing human-only annotations with annotations that include the SAM-CLIP prediction. (B) Inter-annotator agreement measured by pairwise mIoUD and mIoUI among human annotators.


<img src='/images/publications/disagreement_entropy_map.png' width="100%">
Figure 7. Visualization of annotation disagreement on the UGA global test dataset. Each row shows a thermal image, the SAM-CLIP prediction (used as a pre-label), four human annotations (A1–A4), and the corresponding binary entropy map. In the entropy map, yellow denotes maximum disagreement (2:2 voting), green indicates moderate disagreement (3:1 voting), and purple indicates full agreement (4:0 voting).


<!-- Citation -->
### Citation
```bibtex
@article{LIN2026100264,
title = {SAM-CLIP-Thermal: Leveraging Large Multimodal Models for Reliable and Scalable Annotation in Thermal Image Segmentation for Field Plant Phenotyping},
journal = {Plant Phenomics},
pages = {100264},
year = {2026},
issn = {2643-6515},
doi = {https://doi.org/10.1016/j.plaphe.2026.100264},
url = {https://www.sciencedirect.com/science/article/pii/S2643651526001019},
author = {Yiyuan Lin and Chenjiao Tan and Changying Li and Yu Jiang},
keywords = {thermal image segmentation, large multimodal models, SAM, CLIP, active learning, transfer learning, dataset},
}
```

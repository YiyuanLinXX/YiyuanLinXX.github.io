---
title: "Integrating Large Multi-Modal Models for Automated Powdery Mildew Phenotyping in Grapevines"
collection: publications
category: manuscripts
permalink: /publications/sam-clip
excerpt: "<strong>Yiyuan Lin</strong>, Zachary Dashner, Ana Jimenez, Dustin Wilkerson, Lance Cadle-Davidson, Summaira Riaz, Yu Jiang, <i><strong>GigaScience</strong></i> (under review), 2026<br/><img src='/images/publications/sam_clip_gigascience.png'>"
# slidesurl: 'http://academicpages.github.io/files/slides1.pdf'
# paperurl: 'https://elibrary.asabe.org/abstract.asp?aid=54830'
date: 2026-01-08
---

<!-- Authors -->
Yiyuan Lin<sup>1</sup>, Zachary Dashner<sup>2</sup>, Ana Jimenez<sup>2</sup>, Dustin Wilkerson<sup>3</sup>, Lance Cadle-Davidson<sup>4,5</sup>, Summaira Riaz<sup>2,*</sup>, Yu Jiang <sup>5,*</sup>

<!-- Affiliation -->
<sup>1</sup> School of Electrical and Computer Engineering, College of Engineering, Cornell University, Ithaca, NY 14850, USA<br/>
<sup>2</sup> San Joaquin Valley Agricultural Sciences Center, United States Department of Agriculture-Agricultural Research Service, Parlier, CA 93648, USA <br/>
<sup>3</sup> Institute of Biotechnology, Cornell University, Ithaca, NY 14850, USA<br/>
<sup>4</sup> Grape Genetics Research Unit, United States Department of Agriculture-Agricultural Research Service, Geneva, NY 14456, USA<br/>
<sup>5</sup> School of Integrative Plant Science, Cornell University, Geneva, NY 14456, USA<br/>
<sup>*</sup> Corresponding authors.

<!-- Paper URL -->
**Publication**

Paper is currently under review and will be released once published.

**Codebase**

The codebase for this work is open source and public available at [SAM-CLIP](https://github.com/YiyuanLinXX/SAM-CLIP).

**Dataset**

The data for this work is open source and public available at [PM-SAM-CLIP_GigaScience](https://cornell.box.com/s/qkofzu5b24hqkev6y9raga9t9ihoc5l1).

---

<!-- Abstract and Keyword -->
**Abstract**

Powdery mildew is a major fungal disease of grapevines, yet its field quantification remains constrained by subjective visual assessments, inconsistent scoring protocols, and the high cost of annotated datasets. Large multi-modal models that integrate vision and language offer new opportunities for scalable phenotyping, but applying them to agricultural imagery is challenging due to subtle symptoms and domain shifts across environments. This study presents an automated phenotyping pipeline that combines active illumination imaging with a unified Segment Anything Model-Contrastive Language-Image Pretraining (SAM-CLIP) framework for powdery mildew segmentation and vine-level severity quantification.

The PM-SAM-CLIP model achieved 58.43\% image-level mean Intersection over Union ($mIoU^I$), substantially outperforming baselines. For canopy segmentation, Canopy-SAM-CLIP reached 95.48\% $mIoU^I$, providing a stable foundation for severity normalization. Applied to independent field datasets without fine-tuning, the pipeline demonstrated strong zero-shot generalization, with over 98\% of vines scored within one category of expert ratings. Multi-date analyses further produced spatial and temporal infection maps that captured vineyard-scale heterogeneity and disease progression.

To assess biological relevance, a downstream quantitative trait locus (QTL) analysis was performed using image-derived severity metrics. This analysis identified a major resistance locus on chromosome~13, consistent with QTL mapped from human scouting scores and aligned with previously reported loci, supporting the validity of the automated phenotypes.

Overall, this work demonstrates that large multi-modal models adapted through vision-language integration can generate accurate, reproducible, and scalable phenotypes for plant disease assessment. The proposed pipeline reduces human subjectivity and provides high-quality quantitative traits that support downstream genotype-phenotype analyses in viticulture.

**Keywords**: Large multi-modal model; foundation model; grape powdery mildew; high-throughput phenotyping; semantic segmentation; SAM; CLIP; QTL analysis; precision viticulture;

<!-- Citation -->
**Citation**
```bibtex
TODO
```
---
title: "Robot-Enabled Field Phenotyping of Grape Berry Cluster Color Using Multimodal Vision Foundation Models for Genetic Mapping"
collection: publications
category: conferences
permalink: /publications/berry-color-asabe
authors: "<strong>Yiyuan Lin</strong>, Madan Pandey, Lance Cadle-Davidson, Matthew Clark, Soon Li Teh, Yu Jiang"
publication: "ASABE 2026 Annual International Meeting"
pub_image: "/images/publications/berry_color_asabe.png"
highlight: "1st Place in the 2026 AOCABFE Student Paper Competition<br>2nd Place in the 2026 AOCABFE Student Research Presentation Competition"
date: 2026-05-14
---

<!-- Authors -->
Yiyuan Lin<sup>1</sup>, Madan Pandey<sup>2</sup>, Lance Cadle-Davidson<sup>3,4</sup>, Matthew Clark<sup>2</sup>, Soon Li Teh<sup>2</sup>, Yu Jiang <sup>4,&#42;</sup>

<!-- Affiliation -->
<sup>1</sup> School of Electrical and Computer Engineering, College of Engineering, Cornell University, Ithaca, NY, USA<br/>
<sup>2</sup> Department of Horticulture Science, University of Minnesota, Minneapolis, MN, USA <br/>
<sup>3</sup> Grape Genetics Research Unit, United States Department of Agriculture-Agricultural Research Service, Geneva, NY, USA<br/>
<sup>4</sup> School of Integrative Plant Science, Cornell University, Geneva, NY, USA<br/>
<sup>&#42;</sup> Corresponding authors.


[[**`Paper`**](https://elibrary.asabe.org/abstract.asp?aid=55975)]

<!-- Paper URL -->
### Publication

Please find the manuscript published on ASABE 2026 AIM [here](https://elibrary.asabe.org/abstract.asp?aid=55975).


<!-- ### Dataset -->

<!-- The data for this work is open source and public available at [PM-SAM-CLIP_AI_in_Ag](https://cornell.box.com/s/qkofzu5b24hqkev6y9raga9t9ihoc5l1). -->

---

<!-- Abstract and Keyword -->
### Abstract

Grape berry color is an important horticultural trait associated with fruit maturity, wine quality, and underlying genetic variation in grape breeding programs. However, scalable field phenotyping of grape berry color remains challenging due to occlusion, uncontrolled outdoor illumination, and substantial biological variability in vineyard environments. In this study, we developed a robot-enabled field phenotyping workflow that integrates stereo RGB imaging, image analysis using vision foundation models, and quantitative trait locus (QTL) analysis to characterize grape cluster color from vineyard imagery. High-resolution stereo RGB images were collected in a research vineyard at the University of Minnesota using a mobile imaging platform equipped with active strobe illumination and synchronized RTK GPS. Grape berry cluster regions were identified using a SAM-CLIP-based segmentation framework, followed by depth-aware filtering and instance-to-vine spatial mapping to construct stable vine-level phenotypic representations. Color descriptors extracted from multiple color spaces were subsequently aggregated at the vine level and treated as quantitative phenotypic traits for successive genetic analysis. Results showed that moderate depth filtering preserved phenotype stability while reducing potentially unreliable distant observations. The resulting image-derived phenotypes captured substantial continuous variation in grape berry coloration across vines and identified a major QTL on chromosome 2 consistent with previous categorical berry color analyses. Overall, this work demonstrates a scalable workflow for transforming vineyard imagery into biologically meaningful quantitative phenotypes for genetic studies and highlights the potential of integrating field robotics, computer vision, and quantitative genetics for future vineyard phenotyping and grape breeding applications.

**Keywords**: Field phenotyping; grape berry cluster color; quantitative phenotypes; QTL; precision viticulture;


### Awards

#### 1st Place in the 2026 AOCABFE Student Paper Competition
<img src='/images/awards/AOC_2026_1st_place_paper_award.png'>

#### 2nd Place in the 2026 AOCABFE Student Research Presentation Competition
<img src='/images/awards/AOC_2026_2nd_place_presentation_award.png'>


<!-- Citation -->
### Citation
```bibtex
@inproceedings{LinRobotEnabledFieldPhenotyping_2026,
  title={Robot-enabled field phenotyping of grape Berry cluster color using Multimodal Vision Foundation models for genetic mapping},
  author={Lin, Yiyuan and Pandey, Madan and Cadle-Davidson, Lance and Clark, Matthew and Teh, Soon Li and Jiang, Yu},
  publisher={American Society of Agricultural and Biological Engineers},
  year = 2026,
  series = {ASABE Paper No. 2600399},
  pages = {1-13},
  publisher = {ASABE},
  address = {St. Joseph, MI},
  doi = {10.13031/aim.202600399},
}

```

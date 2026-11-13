---
title: "3D Grapevine Disease Quantification and Mapping"
collection: publications
category: manuscripts
permalink: /publications/wacv-workshop-3d-disease-mapping
authors: "<strong>Yiyuan Lin</strong>, Ruiming Du, Cole Regnier, Kaitlin M. Gold, Yu Jiang"
publication: "WACV HARVEST-Vision 2027 (accepted for oral presentation)"
pub_image: "/images/publications/wacv_workshop_3d_vineyard.webp"
date: 2026-10-17
---

<!-- Authors -->
Yiyuan Lin, Ruiming Du, Cole Regnier, Kaitlin M. Gold, Yu Jiang<sup>&#42;</sup>

<!-- Affiliation -->
Cornell University

<sup>&#42;</sup> Corresponding author.

[[**`Paper`**](https://openreview.net/forum?id=tHwDSjWeob)] [[**`Codebase`**](https://github.com/YiyuanLinXX/3D_Vineyard_Reconstruction)]

<!-- Paper URL -->
### Publication

Please find the manuscript preprint on [OpenReview](https://openreview.net/forum?id=tHwDSjWeob). 

### Codebase

The codebase for this work is open source and public available at [3D Vineyard Reconstruction](https://github.com/YiyuanLinXX/3D_Vineyard_Reconstruction).

### Dataset

Dataset will be released soon.

---

<!-- Abstract and Keyword -->
### Abstract

Autonomous imaging enables dense observation of vineyards, but analysis in image space can give biased estimates for real applications. In disease phenotyping, for example, it gives more weight to canopy regions that are imaged repeatedly and loses the physical locations of predicted symptoms. In this study, we present a workflow for 3D disease mapping at field scale. Stereo images acquired under active illumination are used for metric reconstruction, while SAM-CLIP models segment canopy, powdery mildew (PM), and downy mildew (DM) in each image. Local reconstructions are registered with GNSS position and heading and voxelized into a global grid, and each voxel is reprojected into the images with visibility checks to collect its labels. This produces a georeferenced 3D disease map from which disease severity is computed for each vineyard panel. Across 480 matched observations with human scouting conducted within two days of each robotic acquisition, the 3D method improved PM agreement from r=0.922 and MAE =5.8% for the 2D image baseline to r=0.960 and MAE =1.9%, and DM agreement from r=0.939 and MAE =4.8% to r=0.969 and MAE =1.9%. The 3D method also reduced the systematic positive bias of the 2D baseline and was stable to grid placement. In addition, pose recovery from images alone was unreliable under active illumination, which motivates the use of GNSS position and heading for registration. These results show the value of 3D spatial normalization and GNSS supported registration for robotic disease phenotyping at field scale. Code is available at \url{https://github.com/YiyuanLinXX/3D_Vineyard_Reconstruction}.

<!-- ### Author’s Note -->

<!-- Citation -->
### Citation
```bibtex
Manuscript has been accepted.
Citation will be available upon publication.
```

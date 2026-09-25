---
title: "A Field-Deployable GNSS-based Navigation Stack for Outdoor Mobile Robots"
collection: publications
category: manuscripts
permalink: /publications/nav
authors: "<strong>Yiyuan Lin</strong>, Cole Regnier, Yu Jiang"
publication: "arXiv"
pub_image: "/images/publications/nav_system.jpg"
date: 2026-09-24
---

<!-- Authors -->
Yiyuan Lin<sup>1</sup>, Cole Regnier<sup>2</sup>, Yu Jiang<sup>2,&#42;</sup>

<!-- Affiliation -->
<sup>1</sup> School of Electrical and Computer Engineering, College of Engineering, Cornell University<br/>
<sup>2</sup> School of Integrative Plant Science, Cornell University<br/>
<sup>&#42;</sup> Corresponding author.


[[**`Paper`**](https://arxiv.org/abs/2609.28933)] [[**`Codebase`**](https://github.com/YiyuanLinXX/PPBv2/tree/main/PPBv2_Navigation)]

<!-- Paper URL -->
### Publication

Please find the manuscript published on arXiv [here](https://arxiv.org/abs/2609.28933).

### Codebase

The codebase for this work is open source and public available at [PPBv2_Navigation](https://github.com/YiyuanLinXX/PPBv2/tree/main/PPBv2_Navigation).

---

<!-- Abstract and Keyword -->
### Abstract

Outdoor robots require more than an accurate receiver and a path-tracking law: the navigation system must preserve geometric consistency from geographic waypoints to actuator commands, expose measurement validity and timing, and respond to invalid or stale state information. This work presents a ROS 2 navigation stack with interchangeable single-GNSS–IMU and dual-antenna-GNSS localization front ends. Both provide a common local East–North–Up state interface for pure pursuit, virtual-point cross-track PID, finite-horizon nonlinear model predictive control (NMPC), and a segment-dependent hybrid dispatcher. The architecture specifies coordinate conventions, datum initialization, asynchronous state construction, waypoint geometry, controller equations, quality gates, command arbitration, and watchdog behavior. Independent physical field runs collected during 2025 and 2026 grape-vineyard deployments support a balanced evaluation of 800 runs, with 100 runs for each of eight controller–localization combinations on an approximately 199.6-m route. The row-hybrid mode yields the lowest run-averaged post-acquisition mean absolute cross-track error (MAE) in the evaluated dataset: 0.00952 m with single GNSS+IMU and 0.00846 m with dual GNSS. These findings characterize deviations of the recorded positions from the reference route under the evaluated conditions. The open-source navigation software and deployment instructions are available in the https://github.com/YiyuanLinXX/PPBv2/tree/main/PPBv2_Navigation.

**Index Terms**: Field robotics, outdoor autonomous navigation, path following, dual GNSS, single GNSS, IMU, ROS 2.

<img src='/images/publications/nav_system.jpg' width="100%">

### Author’s Note

GNSS-based navigation along predefined paths is often considered a relatively mature problem. However, through our field deployments and discussions with other peer researchers, we found that there remains a substantial gap between having a navigation algorithm and having a complete autonomous navigation system that works reliably on a physical robot in the field.

In practice, several issues make deployment difficult. A single GNSS receiver usually requires an additional source of heading information, while IMU-based heading—particularly when relying on a magnetometer—can be affected by drift, calibration errors, and electromagnetic interference from motors, power electronics, and the robot structure (You may find this work interesting: [Resilient odometry via hierarchical adaptation | Science Robotics](https://www.science.org/doi/10.1126/scirobotics.adv1818). Many researchers also rely on navigation systems provided by robot manufacturers, where localization, calibration, and low-level interfaces may not be fully accessible or easily modified. Beyond sensing, practical details such as coordinate-frame conventions, sensor timing, antenna placement, controller tuning, and handling stale or invalid measurements can significantly affect field performance.

To address these challenges, we provide two practical configurations: single GNSS + IMU and dual-antenna GNSS. Both use the same navigation and controller interface. From our deployment experience, I personally recommend dual-antenna GNSS when the operating environment permits. It provides both position and heading without relying on the local magnetic field, which can substantially simplify calibration and troubleshooting. With increasingly accessible GNSS hardware, it can also be a cost-effective solution for researchers who want to deploy autonomous outdoor robots without spending extensive effort on IMU and magnetometer integration.

This is also why we chose to release the complete navigation stack as open source. Our goal is not simply to demonstrate another path-following algorithm, but to provide a practical starting point that others can deploy, understand, modify, and reproduce. We hope this work can help narrow the gap between autonomy described in research publications and autonomy that actually works reliably in the field, allowing researchers to spend more time on the scientific applications that autonomous robots are ultimately intended to support.

<!-- Citation -->
### Citation
```bibtex
@misc{lin2026fielddeployablegnssbasednavigationstack,
      title={A Field-Deployable GNSS-based Navigation Stack for Outdoor Mobile Robots}, 
      author={Yiyuan Lin and Cole Regnier and Yu Jiang},
      year={2026},
      eprint={2609.28933},
      archivePrefix={arXiv},
      primaryClass={cs.RO},
      url={https://arxiv.org/abs/2609.28933}, 
      doi={https://doi.org/10.48550/arXiv.2609.28933},
}
}
```

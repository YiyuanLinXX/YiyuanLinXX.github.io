---
title: 'Python Environment for ROS2 and Anaconda'
date: 2023-10-12
permalink: /posts/2023/10/py-env-ros-conda/
tags:
  - Python
  - Environment
  - Anaconda
  - ROS2
  - ROS
  - Robotics
---

# 

 I prioritize robotics over AI, as I find robotics more engaging. This preference leads me to install ROS/ROS2 before Anaconda whenever setting up a new Ubuntu system. For those working in both robotics and AI, it’s common to have ROS/ROS2 and Anaconda on the same device. However, this setup can lead to a tricky environment issue: ROS 2 Humble supports Python 3.10 by default, whereas Anaconda often defaults to Python 3.11. This mismatch can create compatibility problems.

I personally encountered this issue while running Nav2 scripts and various simulations using Gazebo (classic).


```bash
(base) yl3663@yiyuanlin-Desktop-CU:~$ ros2 launch turtlebot3_gazebo turtlebot3_world.launch.py 
[INFO] [launch]: All log files can be found below /home/yl3663/.ros/log/2024-12-18-11-50-47-007813-yiyuanlin-Desktop-CU-10072
[INFO] [launch]: Default logging verbosity is set to INFO
urdf_file_name : turtlebot3_waffle.urdf
urdf_file_name : turtlebot3_waffle.urdf
[INFO] [gzserver-1]: process started with pid [10073]
[INFO] [gzclient-2]: process started with pid [10075]
[INFO] [robot_state_publisher-3]: process started with pid [10077]
[INFO] [spawn_entity.py-4]: process started with pid [10079]
[robot_state_publisher-3] [INFO] [1734540647.487742309] [robot_state_publisher]: got segment base_footprint
[robot_state_publisher-3] [INFO] [1734540647.487798142] [robot_state_publisher]: got segment base_link
[robot_state_publisher-3] [INFO] [1734540647.487801321] [robot_state_publisher]: got segment base_scan
[robot_state_publisher-3] [INFO] [1734540647.487803222] [robot_state_publisher]: got segment camera_depth_frame
[robot_state_publisher-3] [INFO] [1734540647.487805157] [robot_state_publisher]: got segment camera_depth_optical_frame
[robot_state_publisher-3] [INFO] [1734540647.487807098] [robot_state_publisher]: got segment camera_link
[robot_state_publisher-3] [INFO] [1734540647.487808978] [robot_state_publisher]: got segment camera_rgb_frame
[robot_state_publisher-3] [INFO] [1734540647.487810696] [robot_state_publisher]: got segment camera_rgb_optical_frame
[robot_state_publisher-3] [INFO] [1734540647.487812419] [robot_state_publisher]: got segment caster_back_left_link
[robot_state_publisher-3] [INFO] [1734540647.487814173] [robot_state_publisher]: got segment caster_back_right_link
[robot_state_publisher-3] [INFO] [1734540647.487815923] [robot_state_publisher]: got segment imu_link
[robot_state_publisher-3] [INFO] [1734540647.487817682] [robot_state_publisher]: got segment wheel_left_link
[robot_state_publisher-3] [INFO] [1734540647.487819553] [robot_state_publisher]: got segment wheel_right_link
[spawn_entity.py-4] Traceback (most recent call last):
[spawn_entity.py-4]   File "/opt/ros/humble/lib/gazebo_ros/spawn_entity.py", line 32, in <module>
[spawn_entity.py-4]     import rclpy
[spawn_entity.py-4]   File "/opt/ros/humble/local/lib/python3.10/dist-packages/rclpy/__init__.py", line 49, in <module>
[spawn_entity.py-4]     from rclpy.signals import install_signal_handlers
[spawn_entity.py-4]   File "/opt/ros/humble/local/lib/python3.10/dist-packages/rclpy/signals.py", line 15, in <module>
[spawn_entity.py-4]     from rclpy.exceptions import InvalidHandle
[spawn_entity.py-4]   File "/opt/ros/humble/local/lib/python3.10/dist-packages/rclpy/exceptions.py", line 15, in <module>
[spawn_entity.py-4]     from rclpy.impl.implementation_singleton import rclpy_implementation as _rclpy
[spawn_entity.py-4]   File "/opt/ros/humble/local/lib/python3.10/dist-packages/rclpy/impl/implementation_singleton.py", line 32, in <module>
[spawn_entity.py-4]     rclpy_implementation = import_c_library('._rclpy_pybind11', package)
[spawn_entity.py-4]                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
[spawn_entity.py-4]   File "/opt/ros/humble/lib/python3.10/site-packages/rpyutils/import_c_library.py", line 39, in import_c_library
[spawn_entity.py-4]     return importlib.import_module(name, package=package)
[spawn_entity.py-4]            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
[spawn_entity.py-4]   File "/home/yl3663/anaconda3/lib/python3.11/importlib/__init__.py", line 126, in import_module
[spawn_entity.py-4]     return _bootstrap._gcd_import(name[level:], package, level)
[spawn_entity.py-4]            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
[spawn_entity.py-4] ModuleNotFoundError: No module named 'rclpy._rclpy_pybind11'
[spawn_entity.py-4] The C extension '/opt/ros/humble/lib/python3.10/site-packages/_rclpy_pybind11.cpython-311-x86_64-linux-gnu.so' isn't present on the system. Please refer to 'https://docs.ros.org/en/humble/Guides/Installation-Troubleshooting.html#import-failing-without-library-present-on-the-system' for possible solutions
[ERROR] [spawn_entity.py-4]: process has died [pid 10079, exit code 1, cmd '/opt/ros/humble/lib/gazebo_ros/spawn_entity.py -entity waffle -file /opt/ros/humble/share/turtlebot3_gazebo/models/turtlebot3_waffle/model.sdf -x -2.0 -y -0.5 -z 0.01 --ros-args'].
```

From the error message, we can find that the `spawn_entity.py` script cannot load the `rclpy._rclpy_pybind11` module. This issue is caused by a Python version mismatch or a missing C extension library. Here are some possible solutions:

1. deactivate the conda environment and run ROS2 in the default system python environment
```bash
source ~/.bashrc
conda deactivate
# ros2 run ...
```

2. Install ROS2 in a specific conda environment with Python 3.10 (not recommended)
```bash
conda create -n ros_env python=3.10
conda activate ros_env
# install ROS2 in this conda env
# ros2 run ...
```

Here is the full scenorio of my usage

```bash
(base) yl3663@yiyuanlin-Desktop-CU:~$ ros2 launch turtlebot3_gazebo turtlebot3_world.launch.py 
[INFO] [launch]: All log files can be found below /home/yl3663/.ros/log/2024-12-18-11-50-47-007813-yiyuanlin-Desktop-CU-10072
[INFO] [launch]: Default logging verbosity is set to INFO
urdf_file_name : turtlebot3_waffle.urdf
urdf_file_name : turtlebot3_waffle.urdf
[INFO] [gzserver-1]: process started with pid [10073]
[INFO] [gzclient-2]: process started with pid [10075]
[INFO] [robot_state_publisher-3]: process started with pid [10077]
[INFO] [spawn_entity.py-4]: process started with pid [10079]
[robot_state_publisher-3] [INFO] [1734540647.487742309] [robot_state_publisher]: got segment base_footprint
[robot_state_publisher-3] [INFO] [1734540647.487798142] [robot_state_publisher]: got segment base_link
[robot_state_publisher-3] [INFO] [1734540647.487801321] [robot_state_publisher]: got segment base_scan
[robot_state_publisher-3] [INFO] [1734540647.487803222] [robot_state_publisher]: got segment camera_depth_frame
[robot_state_publisher-3] [INFO] [1734540647.487805157] [robot_state_publisher]: got segment camera_depth_optical_frame
[robot_state_publisher-3] [INFO] [1734540647.487807098] [robot_state_publisher]: got segment camera_link
[robot_state_publisher-3] [INFO] [1734540647.487808978] [robot_state_publisher]: got segment camera_rgb_frame
[robot_state_publisher-3] [INFO] [1734540647.487810696] [robot_state_publisher]: got segment camera_rgb_optical_frame
[robot_state_publisher-3] [INFO] [1734540647.487812419] [robot_state_publisher]: got segment caster_back_left_link
[robot_state_publisher-3] [INFO] [1734540647.487814173] [robot_state_publisher]: got segment caster_back_right_link
[robot_state_publisher-3] [INFO] [1734540647.487815923] [robot_state_publisher]: got segment imu_link
[robot_state_publisher-3] [INFO] [1734540647.487817682] [robot_state_publisher]: got segment wheel_left_link
[robot_state_publisher-3] [INFO] [1734540647.487819553] [robot_state_publisher]: got segment wheel_right_link
[spawn_entity.py-4] Traceback (most recent call last):
[spawn_entity.py-4]   File "/opt/ros/humble/lib/gazebo_ros/spawn_entity.py", line 32, in <module>
[spawn_entity.py-4]     import rclpy
[spawn_entity.py-4]   File "/opt/ros/humble/local/lib/python3.10/dist-packages/rclpy/__init__.py", line 49, in <module>
[spawn_entity.py-4]     from rclpy.signals import install_signal_handlers
[spawn_entity.py-4]   File "/opt/ros/humble/local/lib/python3.10/dist-packages/rclpy/signals.py", line 15, in <module>
[spawn_entity.py-4]     from rclpy.exceptions import InvalidHandle
[spawn_entity.py-4]   File "/opt/ros/humble/local/lib/python3.10/dist-packages/rclpy/exceptions.py", line 15, in <module>
[spawn_entity.py-4]     from rclpy.impl.implementation_singleton import rclpy_implementation as _rclpy
[spawn_entity.py-4]   File "/opt/ros/humble/local/lib/python3.10/dist-packages/rclpy/impl/implementation_singleton.py", line 32, in <module>
[spawn_entity.py-4]     rclpy_implementation = import_c_library('._rclpy_pybind11', package)
[spawn_entity.py-4]                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
[spawn_entity.py-4]   File "/opt/ros/humble/lib/python3.10/site-packages/rpyutils/import_c_library.py", line 39, in import_c_library
[spawn_entity.py-4]     return importlib.import_module(name, package=package)
[spawn_entity.py-4]            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
[spawn_entity.py-4]   File "/home/yl3663/anaconda3/lib/python3.11/importlib/__init__.py", line 126, in import_module
[spawn_entity.py-4]     return _bootstrap._gcd_import(name[level:], package, level)
[spawn_entity.py-4]            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
[spawn_entity.py-4] ModuleNotFoundError: No module named 'rclpy._rclpy_pybind11'
[spawn_entity.py-4] The C extension '/opt/ros/humble/lib/python3.10/site-packages/_rclpy_pybind11.cpython-311-x86_64-linux-gnu.so' isn't present on the system. Please refer to 'https://docs.ros.org/en/humble/Guides/Installation-Troubleshooting.html#import-failing-without-library-present-on-the-system' for possible solutions
[ERROR] [spawn_entity.py-4]: process has died [pid 10079, exit code 1, cmd '/opt/ros/humble/lib/gazebo_ros/spawn_entity.py -entity waffle -file /opt/ros/humble/share/turtlebot3_gazebo/models/turtlebot3_waffle/model.sdf -x -2.0 -y -0.5 -z 0.01 --ros-args'].
(base) yl3663@yiyuanlin-Desktop-CU:~$ conda deactivate
yl3663@yiyuanlin-Desktop-CU:~$ ros2 launch turtlebot3_gazebo turtlebot3_world.launch.py 

# successfully running
```


Remember, if you set auto launch of Anaconda `(base)` environment in `~/.bashrc`, the `(base)` environment will be activated by default in every terminal or everytime you source it.
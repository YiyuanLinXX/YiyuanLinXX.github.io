---
title: 'How to use Nav2 GPS Waypoint Follower with ROS2 Humble'
date: 2025-01-07
permalink: /posts/2025/01/basic-network-communication-and-modes/
tags:
  - Nav2
  - ROS2
  - Humble
  - Jazzy
  - GPS
  - Navigation
  - Waypoint Follower
  - Swarm
---



For those who is interested in using Nav2 for GPS based navigation, this is a good [official tutorial](https://docs.nav2.org/tutorials/docs/navigation2_with_gps.html). However, if you are using ROS2 Humble with Ubuntu 22.04, the GitHub repo for Humble cannot be used for the GPS Waypoint Follower Demo because the logic that the behavior tree is established in Humble is different from the later version. The maintainer of Nav2 had removed the GPS Waypoint Follower workspace in the branch of Humble in the repo, so we cannot use the script provided by the Nav2 team.



You can find more information from the GitHub issues [nav2_gps_waypoint_follower_demo does not work on ros2 humble???!](https://github.com/ros-navigation/navigation2_tutorials/issues/77) and [Robot_localization listener node- ERROR unexpected process noise covariance matrix size (0)](https://github.com/cra-ros-pkg/robot_localization/issues/844).



The newest version of nav2, contains the function `followGpsWaypoints(wps) service` to follow Geoposes, but the version of nav2 for Humble and Foxy don't have this service, unfortunatly. They can only follow `PoseStamped` with the `followWaypoints(wpl) service`. Because this tutorial uses the `followGpsWaypoints(wps) service`, it only works on Rolling and Jazzy. The code below shows part of what is missing in the humble branch of nav2, but what is available in the main branch. Besides this big issue, there is a small issue of plugins changing per nav2 distro version. But this is easy to solve by changing the plugin names in the **`no_map_config_nav2.yaml`** file.

```yaml
std::vector<geometry_msgs::msg::PoseStamped>
WaypointFollower::convertGPSPosesToMapPoses(
  const std::vector<geographic_msgs::msg::GeoPose> & gps_poses)
{
  RCLCPP_INFO(
    this->get_logger(), "Converting GPS waypoints to %s Frame..",
    global_frame_id_.c_str());

  std::vector<geometry_msgs::msg::PoseStamped> poses_in_map_frame_vector;
  int waypoint_index = 0;
  for (auto && curr_geopose : gps_poses) {
    auto request = std::make_shared<robot_localization::srv::FromLL::Request>();
    auto response = std::make_shared<robot_localization::srv::FromLL::Response>();
    request->ll_point.latitude = curr_geopose.position.latitude;
    request->ll_point.longitude = curr_geopose.position.longitude;
    request->ll_point.altitude = curr_geopose.position.altitude;

    from_ll_to_map_client_->wait_for_service((std::chrono::seconds(1)));
    if (!from_ll_to_map_client_->invoke(request, response)) {
      RCLCPP_ERROR(
        this->get_logger(),
        "fromLL service of robot_localization could not convert %i th GPS waypoint to"
        "%s frame, going to skip this point!"
        "Make sure you have run navsat_transform_node of robot_localization",
        waypoint_index, global_frame_id_.c_str());
      if (stop_on_failure_) {
        RCLCPP_ERROR(
          this->get_logger(),
          "Conversion of %i th GPS waypoint to"
          "%s frame failed and stop_on_failure is set to true"
          "Not going to execute any of waypoints, exiting with failure!",
          waypoint_index, global_frame_id_.c_str());
        return std::vector<geometry_msgs::msg::PoseStamped>();
      }
      continue;
    } else {
      geometry_msgs::msg::PoseStamped curr_pose_map_frame;
      curr_pose_map_frame.header.frame_id = global_frame_id_;
      curr_pose_map_frame.header.stamp = this->now();
      curr_pose_map_frame.pose.position = response->map_point;
      curr_pose_map_frame.pose.orientation = curr_geopose.orientation;
      poses_in_map_frame_vector.push_back(curr_pose_map_frame);
    }
    waypoint_index++;
  }
  RCLCPP_INFO(
    this->get_logger(),
    "Converted all %i GPS waypoint to %s frame",
    static_cast<int>(poses_in_map_frame_vector.size()), global_frame_id_.c_str());
  return poses_in_map_frame_vector;
}
```



Do the conversion yourself from Geopose to PoseStamped using robot_localization and then call the `followWaypoints(wpl) service`. Rewrite the  **`logged_waypoint_follower.py`** script for Humble as follow.

```python
import rclpy
from nav2_simple_commander.robot_navigator import BasicNavigator
import yaml
from ament_index_python.packages import get_package_share_directory
import os
import sys
import time
from robot_localization.srv import FromLL
from rclpy.node import Node
from nav2_gps_waypoint_follower_demo.utils.gps_utils import latLonYaw2Geopose
from nav2_msgs.action import FollowWaypoints
from geometry_msgs.msg import PoseStamped


class YamlWaypointParser:
    """
    Parse a set of gps waypoints from a yaml file
    """

    def __init__(self, wps_file_path: str) -> None:
        with open(wps_file_path, 'r') as wps_file:
            self.wps_dict = yaml.safe_load(wps_file)

    def get_wps(self):
        """
        Get an array of geographic_msgs/msg/GeoPose objects from the yaml file
        """
        gepose_wps = []
        for wp in self.wps_dict["waypoints"]:
            latitude, longitude, yaw = wp["latitude"], wp["longitude"], wp["yaw"]
            gepose_wps.append(latLonYaw2Geopose(latitude, longitude, yaw))
        return gepose_wps


class GpsWpCommander(Node):
    """
    Class to use nav2 gps waypoint follower to follow a set of waypoints logged in a yaml file
    """

    def __init__(self, wps_file_path):
        super().__init__('minimal_client_async')
        self.navigator = BasicNavigator("basic_navigator")
        self.wp_parser = YamlWaypointParser(wps_file_path)
        self.localizer = self.create_client(FromLL,  '/fromLL')
        while not self.localizer.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('service not available, waiting again...')

    def start_wpf(self):
        """
        Function to start the waypoint following
        """
        self.navigator.waitUntilNav2Active(localizer='controller_server')
        wps = self.wp_parser.get_wps()

        wpl = []
        for wp in wps:
            self.req = FromLL.Request()
            self.req.ll_point.longitude = wp.position.longitude
            self.req.ll_point.latitude = wp.position.latitude
            self.req.ll_point.altitude = wp.position.altitude

            log = 'long{:f}, lat={:f}, alt={:f}'.format(self.req.ll_point.longitude, self.req.ll_point.latitude, self.req.ll_point.altitude)
            self.get_logger().info(log)

            self.future = self.localizer.call_async(self.req)
            rclpy.spin_until_future_complete(self, self.future)

            self.resp = PoseStamped()
            self.resp.header.frame_id = 'map'
            self.resp.header.stamp = self.get_clock().now().to_msg()
            self.resp.pose.position = self.future.result().map_point

            log = 'x={:f}, y={:f}, z={:f}'.format(self.future.result().map_point.x, self.future.result().map_point.y, self.future.result().map_point.z)
            self.get_logger().info(log)
            
            self.resp.pose.orientation = wp.orientation
            wpl += [self.resp]

        self.navigator.followWaypoints(wpl)
        print("wps completed successfully")

def main():
    rclpy.init()

    # allow to pass the waypoints file as an argument
    default_yaml_file_path = os.path.join(get_package_share_directory(
        "node"), "config", "demo_waypoints.yaml")
    if len(sys.argv) > 1:
        yaml_file_path = sys.argv[1]
    else:
        yaml_file_path = default_yaml_file_path

    gps_wpf = GpsWpCommander(yaml_file_path)
    gps_wpf.start_wpf()


if __name__ == "__main__":
    main()
```



It is recommended to compile robot_localization from source from the ros2 branch at [Robot Localization Github](https://github.com/cra-ros-pkg/robot_localization), instead of installing it using apt. Please install install libgeographic by running `sudo apt-get install libgeographic-dev`. That is a required library for robot_localization. If you install that and make sure you have the `ros-humble-geographic-msgs` installed you should be able to compile robot_localization.



You would also need to modify  `interactive_waypoint_follower.py` for the navigation demo. The code for that file this:

```python
import rclpy
from rclpy.node import Node
from nav2_simple_commander.robot_navigator import BasicNavigator
from geometry_msgs.msg import PointStamped
from nav2_gps_waypoint_follower_demo.utils.gps_utils import latLonYaw2Geopose
from nav2_msgs.action import FollowWaypoints
from geometry_msgs.msg import PoseStamped
from robot_localization.srv import FromLL

class InteractiveGpsWpCommander(Node):
    """
    ROS2 node to send gps waypoints to nav2 received from mapviz's point click publisher
    """

    def __init__(self):
        super().__init__(node_name="gps_wp_commander")
        self.navigator = BasicNavigator("basic_navigator")
        self.mapviz_wp_sub = self.create_subscription(
            PointStamped, "/clicked_point", self.mapviz_wp_cb, 1)
        
        self.localizer = self.create_client(FromLL,  '/fromLL')
        while not self.localizer.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Service not available, waiting again...')
        self.client_futures = []

        self.get_logger().info('Ready for waypoints...')

    def mapviz_wp_cb(self, msg: PointStamped):
        """
        clicked point callback, sends received point to nav2 gps waypoint follower if its a geographic point
        """
        if msg.header.frame_id != "wgs84":
            self.get_logger().warning(
                "Received point from mapviz that ist not in wgs84 frame. This is not a gps point and wont be followed")
            return
    
        wps = [latLonYaw2Geopose(msg.point.y, msg.point.x)]

        for wp in wps:
            self.req = FromLL.Request()
            self.req.ll_point.longitude = wp.position.longitude
            self.req.ll_point.latitude = wp.position.latitude
            self.req.ll_point.altitude = wp.position.altitude

            self.get_logger().info("Waypoint added to conversion queue...")
            self.client_futures.append(self.localizer.call_async(self.req))

    def command_send_cb(self, future):
        self.resp = PoseStamped()
        self.resp.header.frame_id = 'map'
        self.resp.header.stamp = self.get_clock().now().to_msg()
        self.resp.pose.position = future.result().map_point
    
        self.navigator.goToPose(self.resp)

    def spin(self):
        while rclpy.ok():
            rclpy.spin_once(self)
            incomplete_futures = []
            for f in self.client_futures:
                if f.done():
                    self.get_logger().info("Following converted waypoint...")
                    self.command_send_cb(f)
                else:
                    incomplete_futures.append(f)
                    
            self.client_futures = incomplete_futures

def main():
    rclpy.init()
    gps_wpf = InteractiveGpsWpCommander()
    gps_wpf.spin()


if __name__ == "__main__":
    main()

```


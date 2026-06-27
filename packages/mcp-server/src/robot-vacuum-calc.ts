export type RobotVacuum = "lidar_nav" | "camera_nav" | "gyro_basic" | "mopping_hybrid" | "self_emptying";

export function suctionPower(r: RobotVacuum): number {
  const m: Record<RobotVacuum, number> = {
    lidar_nav: 9, camera_nav: 7, gyro_basic: 5, mopping_hybrid: 6, self_emptying: 10,
  };
  return m[r];
}

export function navigationAccuracy(r: RobotVacuum): number {
  const m: Record<RobotVacuum, number> = {
    lidar_nav: 10, camera_nav: 8, gyro_basic: 4, mopping_hybrid: 7, self_emptying: 9,
  };
  return m[r];
}

export function batteryRuntime(r: RobotVacuum): number {
  const m: Record<RobotVacuum, number> = {
    lidar_nav: 8, camera_nav: 7, gyro_basic: 6, mopping_hybrid: 5, self_emptying: 7,
  };
  return m[r];
}

export function noiseLevel(r: RobotVacuum): number {
  const m: Record<RobotVacuum, number> = {
    lidar_nav: 6, camera_nav: 5, gyro_basic: 7, mopping_hybrid: 4, self_emptying: 8,
  };
  return m[r];
}

export function unitPrice(r: RobotVacuum): number {
  const m: Record<RobotVacuum, number> = {
    lidar_nav: 8, camera_nav: 6, gyro_basic: 3, mopping_hybrid: 7, self_emptying: 10,
  };
  return m[r];
}

export function canMop(r: RobotVacuum): boolean {
  const m: Record<RobotVacuum, boolean> = {
    lidar_nav: false, camera_nav: false, gyro_basic: false, mopping_hybrid: true, self_emptying: false,
  };
  return m[r];
}

export function autoEmptyDock(r: RobotVacuum): boolean {
  const m: Record<RobotVacuum, boolean> = {
    lidar_nav: false, camera_nav: false, gyro_basic: false, mopping_hybrid: false, self_emptying: true,
  };
  return m[r];
}

export function mappingTech(r: RobotVacuum): string {
  const m: Record<RobotVacuum, string> = {
    lidar_nav: "rotating_laser_distance_scan", camera_nav: "visual_slam_ceiling_track",
    gyro_basic: "gyroscope_accelerometer_bump", mopping_hybrid: "lidar_with_floor_type_detect",
    self_emptying: "lidar_plus_3d_obstacle_avoid",
  };
  return m[r];
}

export function bestFloorType(r: RobotVacuum): string {
  const m: Record<RobotVacuum, string> = {
    lidar_nav: "large_multi_room_carpet", camera_nav: "medium_mixed_surface",
    gyro_basic: "small_single_room_budget", mopping_hybrid: "hardwood_tile_combo",
    self_emptying: "pet_hair_heavy_shedding",
  };
  return m[r];
}

export function robotVacuums(): RobotVacuum[] {
  return ["lidar_nav", "camera_nav", "gyro_basic", "mopping_hybrid", "self_emptying"];
}

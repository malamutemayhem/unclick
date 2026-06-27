export type HaulTruckType =
  | "rigid_frame"
  | "articulated"
  | "electric_drive"
  | "autonomous"
  | "underground_ejector";

interface HaulTruckData {
  payload: number;
  speed: number;
  fuelEfficiency: number;
  gradeability: number;
  htCost: number;
  electricDrive: boolean;
  forOpenPit: boolean;
  drivetrain: string;
  bestUse: string;
}

const DATA: Record<HaulTruckType, HaulTruckData> = {
  rigid_frame: {
    payload: 10, speed: 7, fuelEfficiency: 5, gradeability: 6, htCost: 9,
    electricDrive: false, forOpenPit: true,
    drivetrain: "mechanical_drive_rigid_chassis_rear_dump_body_diesel",
    bestUse: "large_open_pit_mine_overburden_ore_haulage_long_distance",
  },
  articulated: {
    payload: 6, speed: 8, fuelEfficiency: 6, gradeability: 9, htCost: 6,
    electricDrive: false, forOpenPit: true,
    drivetrain: "articulated_steering_joint_all_wheel_drive_off_road",
    bestUse: "construction_site_quarry_soft_ground_steep_grade_haul",
  },
  electric_drive: {
    payload: 10, speed: 7, fuelEfficiency: 8, gradeability: 8, htCost: 10,
    electricDrive: true, forOpenPit: true,
    drivetrain: "diesel_electric_ac_drive_wheel_motor_regenerative_braking",
    bestUse: "ultra_class_mine_300_plus_ton_payload_deep_pit_long_ramp",
  },
  autonomous: {
    payload: 9, speed: 6, fuelEfficiency: 9, gradeability: 7, htCost: 10,
    electricDrive: true, forOpenPit: true,
    drivetrain: "autonomous_navigation_gps_radar_lidar_no_operator_24_7",
    bestUse: "remote_mine_continuous_operation_labor_scarce_autonomous_fleet",
  },
  underground_ejector: {
    payload: 4, speed: 5, fuelEfficiency: 7, gradeability: 10, htCost: 5,
    electricDrive: false, forOpenPit: false,
    drivetrain: "low_profile_ejector_body_diesel_or_battery_underground",
    bestUse: "underground_mine_decline_haulage_low_profile_restricted",
  },
};

function get(t: HaulTruckType): HaulTruckData {
  return DATA[t];
}

export const payload = (t: HaulTruckType) => get(t).payload;
export const speed = (t: HaulTruckType) => get(t).speed;
export const fuelEfficiency = (t: HaulTruckType) => get(t).fuelEfficiency;
export const gradeability = (t: HaulTruckType) => get(t).gradeability;
export const htCost = (t: HaulTruckType) => get(t).htCost;
export const electricDrive = (t: HaulTruckType) => get(t).electricDrive;
export const forOpenPit = (t: HaulTruckType) => get(t).forOpenPit;
export const drivetrain = (t: HaulTruckType) => get(t).drivetrain;
export const bestUse = (t: HaulTruckType) => get(t).bestUse;
export const haulTruckTypes = (): HaulTruckType[] =>
  Object.keys(DATA) as HaulTruckType[];

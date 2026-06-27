export type DrumBrakeType =
  | "leading_trailing_simplex"
  | "duo_servo_self_energize"
  | "band_brake_external"
  | "electromagnetic_dc_coil"
  | "thruster_hydraulic_shoe";

interface DrumBrakeData {
  torque: number;
  response: number;
  heatDissipation: number;
  selfEnergize: number;
  drCost: number;
  failsafe: boolean;
  forParking: boolean;
  shoe: string;
  bestUse: string;
}

const DATA: Record<DrumBrakeType, DrumBrakeData> = {
  leading_trailing_simplex: {
    torque: 6, response: 7, heatDissipation: 5, selfEnergize: 6, drCost: 3,
    failsafe: false, forParking: true,
    shoe: "bonded_organic_leading_trailing",
    bestUse: "rear_axle_parking_light_vehicle",
  },
  duo_servo_self_energize: {
    torque: 9, response: 7, heatDissipation: 5, selfEnergize: 10, drCost: 4,
    failsafe: false, forParking: true,
    shoe: "riveted_ceramic_duo_servo_pair",
    bestUse: "heavy_truck_trailer_parking_hold",
  },
  band_brake_external: {
    torque: 8, response: 8, heatDissipation: 6, selfEnergize: 7, drCost: 5,
    failsafe: false, forParking: false,
    shoe: "woven_asbestos_free_band_lining",
    bestUse: "winch_hoist_crane_holding_wrap",
  },
  electromagnetic_dc_coil: {
    torque: 7, response: 10, heatDissipation: 7, selfEnergize: 3, drCost: 7,
    failsafe: true, forParking: false,
    shoe: "spring_set_electromagnetic_release",
    bestUse: "motor_shaft_conveyor_failsafe_stop",
  },
  thruster_hydraulic_shoe: {
    torque: 10, response: 6, heatDissipation: 8, selfEnergize: 5, drCost: 8,
    failsafe: true, forParking: false,
    shoe: "hydraulic_thruster_spring_applied",
    bestUse: "mine_hoist_heavy_crane_emergency",
  },
};

function get(t: DrumBrakeType): DrumBrakeData {
  return DATA[t];
}

export const torque = (t: DrumBrakeType) => get(t).torque;
export const response = (t: DrumBrakeType) => get(t).response;
export const heatDissipation = (t: DrumBrakeType) => get(t).heatDissipation;
export const selfEnergize = (t: DrumBrakeType) => get(t).selfEnergize;
export const drCost = (t: DrumBrakeType) => get(t).drCost;
export const failsafe = (t: DrumBrakeType) => get(t).failsafe;
export const forParking = (t: DrumBrakeType) => get(t).forParking;
export const shoe = (t: DrumBrakeType) => get(t).shoe;
export const bestUse = (t: DrumBrakeType) => get(t).bestUse;
export const drumBrakeTypes = (): DrumBrakeType[] =>
  Object.keys(DATA) as DrumBrakeType[];

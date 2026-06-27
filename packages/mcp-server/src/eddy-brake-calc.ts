export type EddyBrakeType =
  | "linear_rail_magnetic"
  | "rotary_disc_permanent"
  | "retarder_truck_driveline"
  | "dynamometer_absorption"
  | "roller_coaster_fin";

interface EddyBrakeData {
  torque: number;
  response: number;
  wearFree: number;
  heatCapacity: number;
  ebCost: number;
  contactless: boolean;
  forVehicle: boolean;
  magnet: string;
  bestUse: string;
}

const DATA: Record<EddyBrakeType, EddyBrakeData> = {
  linear_rail_magnetic: {
    torque: 6, response: 10, wearFree: 10, heatCapacity: 7, ebCost: 8,
    contactless: true, forVehicle: true,
    magnet: "permanent_magnet_array_rail_gap",
    bestUse: "high_speed_train_emergency_stop",
  },
  rotary_disc_permanent: {
    torque: 5, response: 9, wearFree: 10, heatCapacity: 6, ebCost: 6,
    contactless: true, forVehicle: false,
    magnet: "neodymium_disc_array_air_gap",
    bestUse: "exercise_equipment_tensioner_bike",
  },
  retarder_truck_driveline: {
    torque: 9, response: 8, wearFree: 9, heatCapacity: 8, ebCost: 9,
    contactless: true, forVehicle: true,
    magnet: "electromagnetic_coil_rotor_stator",
    bestUse: "heavy_truck_bus_downhill_retarder",
  },
  dynamometer_absorption: {
    torque: 10, response: 7, wearFree: 9, heatCapacity: 10, ebCost: 10,
    contactless: true, forVehicle: false,
    magnet: "water_cooled_electromagnetic_rotor",
    bestUse: "engine_motor_test_bench_absorb",
  },
  roller_coaster_fin: {
    torque: 7, response: 10, wearFree: 10, heatCapacity: 7, ebCost: 7,
    contactless: true, forVehicle: false,
    magnet: "permanent_magnet_fin_brake_array",
    bestUse: "amusement_ride_launch_stop_zone",
  },
};

function get(t: EddyBrakeType): EddyBrakeData {
  return DATA[t];
}

export const torque = (t: EddyBrakeType) => get(t).torque;
export const response = (t: EddyBrakeType) => get(t).response;
export const wearFree = (t: EddyBrakeType) => get(t).wearFree;
export const heatCapacity = (t: EddyBrakeType) => get(t).heatCapacity;
export const ebCost = (t: EddyBrakeType) => get(t).ebCost;
export const contactless = (t: EddyBrakeType) => get(t).contactless;
export const forVehicle = (t: EddyBrakeType) => get(t).forVehicle;
export const magnet = (t: EddyBrakeType) => get(t).magnet;
export const bestUse = (t: EddyBrakeType) => get(t).bestUse;
export const eddyBrakeTypes = (): EddyBrakeType[] =>
  Object.keys(DATA) as EddyBrakeType[];

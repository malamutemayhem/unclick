export type SteeringRackType =
  | "manual_rack_pinion"
  | "hydraulic_power_rack"
  | "electric_power_eps"
  | "recirculating_ball_gear"
  | "steer_by_wire_electronic";

const DATA: Record<SteeringRackType, {
  feel: number; precision: number; efficiency: number;
  assist: number; srCost: number; electric: boolean;
  forSuv: boolean; mechanism: string; bestUse: string;
}> = {
  manual_rack_pinion: {
    feel: 10, precision: 7, efficiency: 10,
    assist: 1, srCost: 1, electric: false,
    forSuv: false, mechanism: "pinion_gear_toothed_rack_bar",
    bestUse: "lightweight_sports_car_go_kart",
  },
  hydraulic_power_rack: {
    feel: 8, precision: 8, efficiency: 4,
    assist: 8, srCost: 3, electric: false,
    forSuv: true, mechanism: "rotary_valve_hydraulic_cylinder",
    bestUse: "truck_suv_heavy_vehicle_legacy",
  },
  electric_power_eps: {
    feel: 6, precision: 8, efficiency: 9,
    assist: 8, srCost: 3, electric: true,
    forSuv: true, mechanism: "brushless_motor_torque_sensor",
    bestUse: "modern_car_fuel_efficient_adas",
  },
  recirculating_ball_gear: {
    feel: 5, precision: 5, efficiency: 5,
    assist: 9, srCost: 2, electric: false,
    forSuv: true, mechanism: "ball_nut_worm_gear_sector",
    bestUse: "heavy_truck_bus_large_vehicle",
  },
  steer_by_wire_electronic: {
    feel: 7, precision: 10, efficiency: 9,
    assist: 10, srCost: 5, electric: true,
    forSuv: false, mechanism: "motor_actuator_no_mechanical_link",
    bestUse: "autonomous_vehicle_variable_ratio",
  },
};

const get = (t: SteeringRackType) => DATA[t];

export const feel = (t: SteeringRackType) => get(t).feel;
export const precision = (t: SteeringRackType) => get(t).precision;
export const efficiency = (t: SteeringRackType) => get(t).efficiency;
export const assist = (t: SteeringRackType) => get(t).assist;
export const srCost = (t: SteeringRackType) => get(t).srCost;
export const electric = (t: SteeringRackType) => get(t).electric;
export const forSuv = (t: SteeringRackType) => get(t).forSuv;
export const mechanism = (t: SteeringRackType) => get(t).mechanism;
export const bestUse = (t: SteeringRackType) => get(t).bestUse;
export const steeringRackTypes = (): SteeringRackType[] => Object.keys(DATA) as SteeringRackType[];

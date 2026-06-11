export type PistonEngineType =
  | "inline_four_petrol"
  | "v8_crossplane_petrol"
  | "flat_boxer_opposed"
  | "inline_six_diesel"
  | "rotary_wankel_epitrochoid";

const DATA: Record<PistonEngineType, {
  power: number; torque: number; smoothness: number;
  efficiency: number; peCost: number; turbo: boolean;
  forTruck: boolean; layout: string; bestUse: string;
}> = {
  inline_four_petrol: {
    power: 5, torque: 5, smoothness: 5,
    efficiency: 7, peCost: 1, turbo: true,
    forTruck: false, layout: "inline_four_cylinder_block",
    bestUse: "compact_sedan_economy_commuter",
  },
  v8_crossplane_petrol: {
    power: 9, torque: 9, smoothness: 9,
    efficiency: 4, peCost: 4, turbo: false,
    forTruck: true, layout: "v_bank_90_degree_crossplane",
    bestUse: "performance_car_truck_muscle",
  },
  flat_boxer_opposed: {
    power: 6, torque: 6, smoothness: 8,
    efficiency: 6, peCost: 3, turbo: true,
    forTruck: false, layout: "horizontally_opposed_flat_crank",
    bestUse: "low_cg_sports_car_aircraft",
  },
  inline_six_diesel: {
    power: 7, torque: 10, smoothness: 10,
    efficiency: 9, peCost: 3, turbo: true,
    forTruck: true, layout: "inline_six_long_stroke_diesel",
    bestUse: "heavy_truck_marine_generator",
  },
  rotary_wankel_epitrochoid: {
    power: 7, torque: 4, smoothness: 10,
    efficiency: 3, peCost: 4, turbo: false,
    forTruck: false, layout: "triangular_rotor_epitrochoid_housing",
    bestUse: "range_extender_compact_high_rpm",
  },
};

const get = (t: PistonEngineType) => DATA[t];

export const power = (t: PistonEngineType) => get(t).power;
export const torque = (t: PistonEngineType) => get(t).torque;
export const smoothness = (t: PistonEngineType) => get(t).smoothness;
export const efficiency = (t: PistonEngineType) => get(t).efficiency;
export const peCost = (t: PistonEngineType) => get(t).peCost;
export const turbo = (t: PistonEngineType) => get(t).turbo;
export const forTruck = (t: PistonEngineType) => get(t).forTruck;
export const layout = (t: PistonEngineType) => get(t).layout;
export const bestUse = (t: PistonEngineType) => get(t).bestUse;
export const pistonEngineTypes = (): PistonEngineType[] => Object.keys(DATA) as PistonEngineType[];

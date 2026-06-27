export type DisplacementVentType =
  | "floor_swirl_diffuser"
  | "wall_displacement_unit"
  | "underfloor_plenum_supply"
  | "fabric_duct_low_velocity"
  | "chilled_beam_displacement";

interface DisplacementVentData {
  iaq: number;
  comfort: number;
  energy: number;
  noise: number;
  dvCost: number;
  stratified: boolean;
  forAtrium: boolean;
  delivery: string;
  bestUse: string;
}

const DATA: Record<DisplacementVentType, DisplacementVentData> = {
  floor_swirl_diffuser: {
    iaq: 9, comfort: 8, energy: 8, noise: 8, dvCost: 6,
    stratified: true, forAtrium: false,
    delivery: "swirl_floor_diffuser_low_vel",
    bestUse: "open_office_raised_floor",
  },
  wall_displacement_unit: {
    iaq: 10, comfort: 9, energy: 9, noise: 9, dvCost: 7,
    stratified: true, forAtrium: true,
    delivery: "wall_unit_low_velocity_laminar",
    bestUse: "theater_auditorium_lecture_hall",
  },
  underfloor_plenum_supply: {
    iaq: 8, comfort: 8, energy: 9, noise: 7, dvCost: 8,
    stratified: true, forAtrium: false,
    delivery: "pressurized_underfloor_plenum",
    bestUse: "data_center_office_combo_floor",
  },
  fabric_duct_low_velocity: {
    iaq: 7, comfort: 7, energy: 7, noise: 10, dvCost: 4,
    stratified: false, forAtrium: true,
    delivery: "porous_fabric_duct_full_length",
    bestUse: "warehouse_gym_large_open_space",
  },
  chilled_beam_displacement: {
    iaq: 9, comfort: 10, energy: 10, noise: 9, dvCost: 10,
    stratified: true, forAtrium: false,
    delivery: "doas_chilled_beam_hybrid_supply",
    bestUse: "high_performance_lab_office",
  },
};

function get(t: DisplacementVentType): DisplacementVentData {
  return DATA[t];
}

export const iaq = (t: DisplacementVentType) => get(t).iaq;
export const comfort = (t: DisplacementVentType) => get(t).comfort;
export const energy = (t: DisplacementVentType) => get(t).energy;
export const noise = (t: DisplacementVentType) => get(t).noise;
export const dvCost = (t: DisplacementVentType) => get(t).dvCost;
export const stratified = (t: DisplacementVentType) => get(t).stratified;
export const forAtrium = (t: DisplacementVentType) => get(t).forAtrium;
export const delivery = (t: DisplacementVentType) => get(t).delivery;
export const bestUse = (t: DisplacementVentType) => get(t).bestUse;
export const displacementVentTypes = (): DisplacementVentType[] =>
  Object.keys(DATA) as DisplacementVentType[];

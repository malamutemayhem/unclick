export type PulverizerType =
  | "ball_mill_tumbling"
  | "hammer_mill_impact"
  | "roller_mill_compression"
  | "jet_mill_fluid_energy"
  | "pin_mill_attrition";

interface PulverizerData {
  fineness: number;
  capacity: number;
  energy: number;
  maintenance: number;
  pvCost: number;
  noHeat: boolean;
  forUltraFine: boolean;
  reduction: string;
  bestUse: string;
}

const DATA: Record<PulverizerType, PulverizerData> = {
  ball_mill_tumbling: {
    fineness: 7, capacity: 9, energy: 5, maintenance: 7, pvCost: 6,
    noHeat: false, forUltraFine: false,
    reduction: "cascading_ball_impact_attrition",
    bestUse: "cement_mineral_ore_grinding",
  },
  hammer_mill_impact: {
    fineness: 6, capacity: 8, energy: 7, maintenance: 6, pvCost: 4,
    noHeat: false, forUltraFine: false,
    reduction: "high_speed_swing_hammer_impact",
    bestUse: "grain_biomass_coarse_grinding",
  },
  roller_mill_compression: {
    fineness: 8, capacity: 10, energy: 8, maintenance: 8, pvCost: 8,
    noHeat: false, forUltraFine: false,
    reduction: "table_roller_compression_shear",
    bestUse: "coal_pulverizing_power_plant",
  },
  jet_mill_fluid_energy: {
    fineness: 10, capacity: 4, energy: 4, maintenance: 9, pvCost: 9,
    noHeat: true, forUltraFine: true,
    reduction: "compressed_air_particle_collision",
    bestUse: "pharma_pigment_ultra_fine_powder",
  },
  pin_mill_attrition: {
    fineness: 7, capacity: 7, energy: 7, maintenance: 6, pvCost: 5,
    noHeat: false, forUltraFine: false,
    reduction: "rotating_pin_disc_impact_shear",
    bestUse: "spice_sugar_chemical_medium_fine",
  },
};

function get(t: PulverizerType): PulverizerData {
  return DATA[t];
}

export const fineness = (t: PulverizerType) => get(t).fineness;
export const capacity = (t: PulverizerType) => get(t).capacity;
export const energy = (t: PulverizerType) => get(t).energy;
export const maintenance = (t: PulverizerType) => get(t).maintenance;
export const pvCost = (t: PulverizerType) => get(t).pvCost;
export const noHeat = (t: PulverizerType) => get(t).noHeat;
export const forUltraFine = (t: PulverizerType) => get(t).forUltraFine;
export const reduction = (t: PulverizerType) => get(t).reduction;
export const bestUse = (t: PulverizerType) => get(t).bestUse;
export const pulverizerTypes = (): PulverizerType[] =>
  Object.keys(DATA) as PulverizerType[];

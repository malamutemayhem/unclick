export type BriquetteType =
  | "roller_press_pillow"
  | "mechanical_punch_tablet"
  | "hydraulic_press_high"
  | "screw_press_biomass"
  | "extrusion_log_biomass";

interface BriquetteData {
  density: number;
  throughput: number;
  pressure: number;
  versatility: number;
  brCost: number;
  binderFree: boolean;
  forBiomass: boolean;
  die: string;
  bestUse: string;
}

const DATA: Record<BriquetteType, BriquetteData> = {
  roller_press_pillow: {
    density: 8, throughput: 10, pressure: 7, versatility: 8, brCost: 6,
    binderFree: false, forBiomass: false,
    die: "double_roll_pocket_pillow_shape",
    bestUse: "metal_chip_ore_fine_flux_compact",
  },
  mechanical_punch_tablet: {
    density: 9, throughput: 8, pressure: 9, versatility: 7, brCost: 7,
    binderFree: false, forBiomass: false,
    die: "punch_die_tablet_press_reciprocate",
    bestUse: "salt_catalyst_chemical_tablet_form",
  },
  hydraulic_press_high: {
    density: 10, throughput: 5, pressure: 10, versatility: 9, brCost: 8,
    binderFree: true, forBiomass: false,
    die: "hydraulic_piston_closed_die_mold",
    bestUse: "metal_powder_ceramic_ultra_dense",
  },
  screw_press_biomass: {
    density: 7, throughput: 8, pressure: 7, versatility: 6, brCost: 5,
    binderFree: true, forBiomass: true,
    die: "heated_screw_die_lignin_bind",
    bestUse: "biomass_sawdust_straw_fuel_log",
  },
  extrusion_log_biomass: {
    density: 7, throughput: 9, pressure: 6, versatility: 5, brCost: 4,
    binderFree: true, forBiomass: true,
    die: "ram_piston_extrusion_heated_die",
    bestUse: "charcoal_briquette_peat_coconut",
  },
};

function get(t: BriquetteType): BriquetteData {
  return DATA[t];
}

export const density = (t: BriquetteType) => get(t).density;
export const throughput = (t: BriquetteType) => get(t).throughput;
export const pressure = (t: BriquetteType) => get(t).pressure;
export const versatility = (t: BriquetteType) => get(t).versatility;
export const brCost = (t: BriquetteType) => get(t).brCost;
export const binderFree = (t: BriquetteType) => get(t).binderFree;
export const forBiomass = (t: BriquetteType) => get(t).forBiomass;
export const die = (t: BriquetteType) => get(t).die;
export const bestUse = (t: BriquetteType) => get(t).bestUse;
export const briquetteTypes = (): BriquetteType[] =>
  Object.keys(DATA) as BriquetteType[];

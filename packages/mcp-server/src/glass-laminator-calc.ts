export type GlassLaminatorType =
  | "autoclave_pvb"
  | "vacuum_bag"
  | "nip_roll"
  | "eva_film"
  | "sgp_ionoplast";

interface GlassLaminatorData {
  bondStrength: number;
  opticalClarity: number;
  throughput: number;
  interlayerRange: number;
  glCost: number;
  autoclave: boolean;
  forSafety: boolean;
  laminatorConfig: string;
  bestUse: string;
}

const DATA: Record<GlassLaminatorType, GlassLaminatorData> = {
  autoclave_pvb: {
    bondStrength: 9, opticalClarity: 9, throughput: 8, interlayerRange: 8, glCost: 9,
    autoclave: true, forSafety: true,
    laminatorConfig: "autoclave_pvb_interlayer_high_pressure_heat_bond_safety_glass",
    bestUse: "automotive_windshield_architectural_safety_autoclave_pvb_laminate",
  },
  vacuum_bag: {
    bondStrength: 7, opticalClarity: 7, throughput: 5, interlayerRange: 9, glCost: 5,
    autoclave: false, forSafety: true,
    laminatorConfig: "vacuum_bag_oven_cure_low_pressure_flexible_interlayer_laminate",
    bestUse: "small_batch_custom_shape_art_glass_vacuum_bag_oven_laminate",
  },
  nip_roll: {
    bondStrength: 8, opticalClarity: 8, throughput: 10, interlayerRange: 7, glCost: 8,
    autoclave: false, forSafety: true,
    laminatorConfig: "nip_roll_pre_press_tack_line_before_autoclave_deair_laminate",
    bestUse: "high_volume_pre_press_nip_roll_deair_before_autoclave_laminate",
  },
  eva_film: {
    bondStrength: 7, opticalClarity: 8, throughput: 8, interlayerRange: 6, glCost: 6,
    autoclave: false, forSafety: false,
    laminatorConfig: "eva_film_vacuum_heat_press_decorative_solar_panel_laminate",
    bestUse: "decorative_glass_solar_panel_eva_film_vacuum_heat_press_bond",
  },
  sgp_ionoplast: {
    bondStrength: 10, opticalClarity: 10, throughput: 7, interlayerRange: 5, glCost: 10,
    autoclave: true, forSafety: true,
    laminatorConfig: "sgp_ionoplast_interlayer_autoclave_structural_glass_high_load",
    bestUse: "structural_glass_floor_balustrade_hurricane_sgp_ionoplast_bond",
  },
};

function get(t: GlassLaminatorType): GlassLaminatorData {
  return DATA[t];
}

export const bondStrength = (t: GlassLaminatorType) => get(t).bondStrength;
export const opticalClarity = (t: GlassLaminatorType) => get(t).opticalClarity;
export const throughput = (t: GlassLaminatorType) => get(t).throughput;
export const interlayerRange = (t: GlassLaminatorType) => get(t).interlayerRange;
export const glCost = (t: GlassLaminatorType) => get(t).glCost;
export const autoclave = (t: GlassLaminatorType) => get(t).autoclave;
export const forSafety = (t: GlassLaminatorType) => get(t).forSafety;
export const laminatorConfig = (t: GlassLaminatorType) => get(t).laminatorConfig;
export const bestUse = (t: GlassLaminatorType) => get(t).bestUse;
export const glassLaminatorTypes = (): GlassLaminatorType[] =>
  Object.keys(DATA) as GlassLaminatorType[];

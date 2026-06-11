export type SepticTypeType =
  | "conventional_gravity_drain"
  | "aerobic_treatment_unit"
  | "mound_elevated_sand"
  | "chamber_leach_plastic"
  | "drip_distribution_pump";

interface SepticTypeData {
  treatment: number;
  siteFlexibility: number;
  maintenance: number;
  longevity: number;
  spCost: number;
  powered: boolean;
  forPoorSoil: boolean;
  distribution: string;
  bestUse: string;
}

const DATA: Record<SepticTypeType, SepticTypeData> = {
  conventional_gravity_drain: {
    treatment: 5, siteFlexibility: 4, maintenance: 9, longevity: 8, spCost: 3,
    powered: false, forPoorSoil: false,
    distribution: "gravity_perforated_pipe_gravel",
    bestUse: "rural_residential_good_soil",
  },
  aerobic_treatment_unit: {
    treatment: 10, siteFlexibility: 8, maintenance: 4, longevity: 7, spCost: 8,
    powered: true, forPoorSoil: true,
    distribution: "spray_drip_surface_discharge",
    bestUse: "small_lot_poor_soil_near_water",
  },
  mound_elevated_sand: {
    treatment: 7, siteFlexibility: 7, maintenance: 6, longevity: 7, spCost: 7,
    powered: true, forPoorSoil: true,
    distribution: "pressure_dose_elevated_sand_bed",
    bestUse: "high_water_table_clay_soil",
  },
  chamber_leach_plastic: {
    treatment: 6, siteFlexibility: 6, maintenance: 8, longevity: 9, spCost: 5,
    powered: false, forPoorSoil: false,
    distribution: "plastic_arch_chamber_no_gravel",
    bestUse: "residential_easy_install_gravel_free",
  },
  drip_distribution_pump: {
    treatment: 9, siteFlexibility: 10, maintenance: 5, longevity: 6, spCost: 9,
    powered: true, forPoorSoil: true,
    distribution: "subsurface_drip_emitter_tubing",
    bestUse: "steep_slope_shallow_soil_flex",
  },
};

function get(t: SepticTypeType): SepticTypeData {
  return DATA[t];
}

export const treatment = (t: SepticTypeType) => get(t).treatment;
export const siteFlexibility = (t: SepticTypeType) => get(t).siteFlexibility;
export const maintenance = (t: SepticTypeType) => get(t).maintenance;
export const longevity = (t: SepticTypeType) => get(t).longevity;
export const spCost = (t: SepticTypeType) => get(t).spCost;
export const powered = (t: SepticTypeType) => get(t).powered;
export const forPoorSoil = (t: SepticTypeType) => get(t).forPoorSoil;
export const distribution = (t: SepticTypeType) => get(t).distribution;
export const bestUse = (t: SepticTypeType) => get(t).bestUse;
export const septicTypeTypes = (): SepticTypeType[] =>
  Object.keys(DATA) as SepticTypeType[];

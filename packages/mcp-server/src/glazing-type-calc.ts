export type GlazingTypeType =
  | "single_pane_annealed"
  | "double_pane_insulated"
  | "triple_pane_argon"
  | "laminated_safety_pvb"
  | "low_e_coated_solar";

interface GlazingTypeData {
  thermal: number;
  safety: number;
  acoustic: number;
  solar: number;
  glCost: number;
  safetyGlass: boolean;
  forExterior: boolean;
  interlayer: string;
  bestUse: string;
}

const DATA: Record<GlazingTypeType, GlazingTypeData> = {
  single_pane_annealed: {
    thermal: 2, safety: 2, acoustic: 2, solar: 2, glCost: 1,
    safetyGlass: false, forExterior: false,
    interlayer: "none_single_lite",
    bestUse: "interior_partition_non_safety",
  },
  double_pane_insulated: {
    thermal: 7, safety: 5, acoustic: 6, solar: 5, glCost: 4,
    safetyGlass: false, forExterior: true,
    interlayer: "air_spacer_desiccant_seal",
    bestUse: "standard_window_commercial",
  },
  triple_pane_argon: {
    thermal: 10, safety: 6, acoustic: 9, solar: 7, glCost: 8,
    safetyGlass: false, forExterior: true,
    interlayer: "argon_krypton_dual_spacer",
    bestUse: "cold_climate_passive_house",
  },
  laminated_safety_pvb: {
    thermal: 5, safety: 10, acoustic: 8, solar: 4, glCost: 6,
    safetyGlass: true, forExterior: true,
    interlayer: "pvb_sgp_interlayer_bonded",
    bestUse: "hurricane_zone_overhead_safety",
  },
  low_e_coated_solar: {
    thermal: 8, safety: 5, acoustic: 5, solar: 10, glCost: 5,
    safetyGlass: false, forExterior: true,
    interlayer: "metallic_oxide_sputter_coat",
    bestUse: "south_facing_solar_control",
  },
};

function get(t: GlazingTypeType): GlazingTypeData {
  return DATA[t];
}

export const thermal = (t: GlazingTypeType) => get(t).thermal;
export const safety = (t: GlazingTypeType) => get(t).safety;
export const acoustic = (t: GlazingTypeType) => get(t).acoustic;
export const solar = (t: GlazingTypeType) => get(t).solar;
export const glCost = (t: GlazingTypeType) => get(t).glCost;
export const safetyGlass = (t: GlazingTypeType) => get(t).safetyGlass;
export const forExterior = (t: GlazingTypeType) => get(t).forExterior;
export const interlayer = (t: GlazingTypeType) => get(t).interlayer;
export const bestUse = (t: GlazingTypeType) => get(t).bestUse;
export const glazingTypeTypes = (): GlazingTypeType[] =>
  Object.keys(DATA) as GlazingTypeType[];

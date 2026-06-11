export type ThermalBreakType =
  | "polyamide_strip_aluminum"
  | "polyurethane_pour_fill"
  | "structural_silicone_glaze"
  | "thermal_spacer_steel_beam"
  | "aerogel_blanket_high_perf";

interface ThermalBreakData {
  resistance: number;
  strength: number;
  durability: number;
  moisture: number;
  tbCost: number;
  structural: boolean;
  forCurtainWall: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<ThermalBreakType, ThermalBreakData> = {
  polyamide_strip_aluminum: {
    resistance: 7, strength: 8, durability: 9, moisture: 8, tbCost: 6,
    structural: true, forCurtainWall: true,
    material: "glass_fiber_reinforced_polyamide",
    bestUse: "aluminum_window_curtain_wall_frame",
  },
  polyurethane_pour_fill: {
    resistance: 8, strength: 7, durability: 8, moisture: 7, tbCost: 5,
    structural: true, forCurtainWall: true,
    material: "rigid_polyurethane_foam_pour",
    bestUse: "storefront_frame_thermal_isolate",
  },
  structural_silicone_glaze: {
    resistance: 5, strength: 6, durability: 7, moisture: 9, tbCost: 7,
    structural: false, forCurtainWall: true,
    material: "silicone_sealant_structural_bond",
    bestUse: "unitized_curtain_wall_edge_seal",
  },
  thermal_spacer_steel_beam: {
    resistance: 6, strength: 9, durability: 10, moisture: 6, tbCost: 4,
    structural: true, forCurtainWall: false,
    material: "proprietary_composite_pad_block",
    bestUse: "steel_beam_penetration_cladding_break",
  },
  aerogel_blanket_high_perf: {
    resistance: 10, strength: 4, durability: 7, moisture: 5, tbCost: 10,
    structural: false, forCurtainWall: false,
    material: "silica_aerogel_fiber_blanket",
    bestUse: "high_performance_passive_house_detail",
  },
};

function get(t: ThermalBreakType): ThermalBreakData {
  return DATA[t];
}

export const resistance = (t: ThermalBreakType) => get(t).resistance;
export const strength = (t: ThermalBreakType) => get(t).strength;
export const durability = (t: ThermalBreakType) => get(t).durability;
export const moisture = (t: ThermalBreakType) => get(t).moisture;
export const tbCost = (t: ThermalBreakType) => get(t).tbCost;
export const structural = (t: ThermalBreakType) => get(t).structural;
export const forCurtainWall = (t: ThermalBreakType) => get(t).forCurtainWall;
export const material = (t: ThermalBreakType) => get(t).material;
export const bestUse = (t: ThermalBreakType) => get(t).bestUse;
export const thermalBreakTypes = (): ThermalBreakType[] =>
  Object.keys(DATA) as ThermalBreakType[];

export type PowderCoatType =
  | "epoxy_functional"
  | "polyester_tgic"
  | "polyurethane_smooth"
  | "hybrid_epoxy_poly"
  | "fluoropolymer_pvdf";

interface PowderCoatData {
  durability: number;
  uvResist: number;
  chemResist: number;
  finish: number;
  pcCost: number;
  outdoor: boolean;
  forArchitectural: boolean;
  resin: string;
  bestUse: string;
}

const DATA: Record<PowderCoatType, PowderCoatData> = {
  epoxy_functional: {
    durability: 8, uvResist: 3, chemResist: 10, finish: 7, pcCost: 4,
    outdoor: false, forArchitectural: false,
    resin: "bisphenol_a_epoxy_thermoset_crosslink",
    bestUse: "pipe_interior_rebar_chemical_tank_indoor",
  },
  polyester_tgic: {
    durability: 8, uvResist: 9, chemResist: 6, finish: 9, pcCost: 5,
    outdoor: true, forArchitectural: true,
    resin: "saturated_polyester_tgic_cure_outdoor",
    bestUse: "aluminum_extrusion_facade_railing_outdoor",
  },
  polyurethane_smooth: {
    durability: 9, uvResist: 8, chemResist: 7, finish: 10, pcCost: 6,
    outdoor: true, forArchitectural: true,
    resin: "polyurethane_isocyanate_cure_smooth",
    bestUse: "automotive_trim_appliance_high_gloss",
  },
  hybrid_epoxy_poly: {
    durability: 7, uvResist: 5, chemResist: 8, finish: 8, pcCost: 4,
    outdoor: false, forArchitectural: false,
    resin: "epoxy_polyester_blend_50_50_hybrid",
    bestUse: "office_furniture_shelving_indoor_general",
  },
  fluoropolymer_pvdf: {
    durability: 10, uvResist: 10, chemResist: 9, finish: 8, pcCost: 9,
    outdoor: true, forArchitectural: true,
    resin: "pvdf_70_pct_kynar_resin_premium_weather",
    bestUse: "curtain_wall_roofing_panel_25yr_warranty",
  },
};

function get(t: PowderCoatType): PowderCoatData {
  return DATA[t];
}

export const durability = (t: PowderCoatType) => get(t).durability;
export const uvResist = (t: PowderCoatType) => get(t).uvResist;
export const chemResist = (t: PowderCoatType) => get(t).chemResist;
export const finish = (t: PowderCoatType) => get(t).finish;
export const pcCost = (t: PowderCoatType) => get(t).pcCost;
export const outdoor = (t: PowderCoatType) => get(t).outdoor;
export const forArchitectural = (t: PowderCoatType) => get(t).forArchitectural;
export const resin = (t: PowderCoatType) => get(t).resin;
export const bestUse = (t: PowderCoatType) => get(t).bestUse;
export const powderCoatTypes = (): PowderCoatType[] =>
  Object.keys(DATA) as PowderCoatType[];

export type CoatingType =
  | "epoxy_two_part_chemical"
  | "polyurethane_aliphatic_uv"
  | "zinc_rich_galvanic_primer"
  | "ceramic_thermal_spray"
  | "fluoropolymer_ptfe_nonstick";

interface CoatingData {
  hardness: number;
  chemResist: number;
  uvStability: number;
  thickness: number;
  coCost: number;
  twoComponent: boolean;
  forSteel: boolean;
  application: string;
  bestUse: string;
}

const DATA: Record<CoatingType, CoatingData> = {
  epoxy_two_part_chemical: {
    hardness: 8, chemResist: 9, uvStability: 3, thickness: 7, coCost: 6,
    twoComponent: true, forSteel: true,
    application: "brush_roll_spray_two_pack_mix",
    bestUse: "tank_lining_floor_pipe_immersion",
  },
  polyurethane_aliphatic_uv: {
    hardness: 7, chemResist: 7, uvStability: 10, thickness: 5, coCost: 7,
    twoComponent: true, forSteel: true,
    application: "spray_applied_topcoat_gloss",
    bestUse: "exterior_topcoat_bridge_structure",
  },
  zinc_rich_galvanic_primer: {
    hardness: 5, chemResist: 6, uvStability: 4, thickness: 4, coCost: 8,
    twoComponent: true, forSteel: true,
    application: "spray_brush_inorganic_silicate",
    bestUse: "structural_steel_primer_galvanic",
  },
  ceramic_thermal_spray: {
    hardness: 10, chemResist: 8, uvStability: 8, thickness: 9, coCost: 10,
    twoComponent: false, forSteel: true,
    application: "plasma_hvof_thermal_gun_spray",
    bestUse: "turbine_blade_wear_surface_heat",
  },
  fluoropolymer_ptfe_nonstick: {
    hardness: 4, chemResist: 10, uvStability: 9, thickness: 3, coCost: 8,
    twoComponent: false, forSteel: false,
    application: "spray_bake_cure_sinter_fuse",
    bestUse: "cookware_mold_release_chemical_tank",
  },
};

function get(t: CoatingType): CoatingData {
  return DATA[t];
}

export const hardness = (t: CoatingType) => get(t).hardness;
export const chemResist = (t: CoatingType) => get(t).chemResist;
export const uvStability = (t: CoatingType) => get(t).uvStability;
export const thickness = (t: CoatingType) => get(t).thickness;
export const coCost = (t: CoatingType) => get(t).coCost;
export const twoComponent = (t: CoatingType) => get(t).twoComponent;
export const forSteel = (t: CoatingType) => get(t).forSteel;
export const application = (t: CoatingType) => get(t).application;
export const bestUse = (t: CoatingType) => get(t).bestUse;
export const coatingTypes = (): CoatingType[] =>
  Object.keys(DATA) as CoatingType[];

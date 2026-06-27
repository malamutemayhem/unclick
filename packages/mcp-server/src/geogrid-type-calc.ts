export type GeogridType =
  | "uniaxial_hdpe_stretch"
  | "biaxial_pp_punch_draw"
  | "triaxial_triangular_rib"
  | "woven_polyester_high_str"
  | "welded_steel_wire_mesh";

interface GeogridData {
  tensile: number;
  interlock: number;
  flexibility: number;
  creep: number;
  ggCost: number;
  multiAxial: boolean;
  forWall: boolean;
  structure: string;
  bestUse: string;
}

const DATA: Record<GeogridType, GeogridData> = {
  uniaxial_hdpe_stretch: {
    tensile: 9, interlock: 6, flexibility: 5, creep: 7, ggCost: 5,
    multiAxial: false, forWall: true,
    structure: "punched_sheet_stretched_one_direction",
    bestUse: "retaining_wall_steep_slope_reinforce",
  },
  biaxial_pp_punch_draw: {
    tensile: 6, interlock: 8, flexibility: 7, creep: 6, ggCost: 4,
    multiAxial: true, forWall: false,
    structure: "punched_sheet_stretched_two_direction",
    bestUse: "base_course_stabilize_road_parking",
  },
  triaxial_triangular_rib: {
    tensile: 7, interlock: 10, flexibility: 7, creep: 7, ggCost: 6,
    multiAxial: true, forWall: false,
    structure: "triangular_aperture_multi_direct",
    bestUse: "soft_subgrade_improve_traffick_area",
  },
  woven_polyester_high_str: {
    tensile: 10, interlock: 5, flexibility: 8, creep: 9, ggCost: 7,
    multiAxial: false, forWall: true,
    structure: "high_tenacity_polyester_woven_coat",
    bestUse: "mse_wall_high_load_long_term",
  },
  welded_steel_wire_mesh: {
    tensile: 10, interlock: 7, flexibility: 3, creep: 10, ggCost: 8,
    multiAxial: true, forWall: true,
    structure: "galvanized_steel_wire_welded_grid",
    bestUse: "mining_support_heavy_surcharge_gabion",
  },
};

function get(t: GeogridType): GeogridData {
  return DATA[t];
}

export const tensile = (t: GeogridType) => get(t).tensile;
export const interlock = (t: GeogridType) => get(t).interlock;
export const flexibility = (t: GeogridType) => get(t).flexibility;
export const creep = (t: GeogridType) => get(t).creep;
export const ggCost = (t: GeogridType) => get(t).ggCost;
export const multiAxial = (t: GeogridType) => get(t).multiAxial;
export const forWall = (t: GeogridType) => get(t).forWall;
export const structure = (t: GeogridType) => get(t).structure;
export const bestUse = (t: GeogridType) => get(t).bestUse;
export const geogridTypes = (): GeogridType[] =>
  Object.keys(DATA) as GeogridType[];

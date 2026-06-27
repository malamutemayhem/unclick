export type ShearWallType =
  | "reinforced_concrete_solid"
  | "reinforced_masonry_cmu"
  | "wood_sheathed_plywood"
  | "steel_plate_infill"
  | "coupled_link_beam";

interface ShearWallData {
  stiffness: number;
  ductility: number;
  drift: number;
  fireRating: number;
  swCost: number;
  ductile: boolean;
  forHighRise: boolean;
  reinforcement: string;
  bestUse: string;
}

const DATA: Record<ShearWallType, ShearWallData> = {
  reinforced_concrete_solid: {
    stiffness: 9, ductility: 7, drift: 9, fireRating: 9, swCost: 7,
    ductile: true, forHighRise: true,
    reinforcement: "horizontal_vertical_rebar_grid",
    bestUse: "high_rise_core_elevator_shaft",
  },
  reinforced_masonry_cmu: {
    stiffness: 7, ductility: 5, drift: 7, fireRating: 8, swCost: 5,
    ductile: false, forHighRise: false,
    reinforcement: "grouted_cell_vertical_bar",
    bestUse: "low_rise_school_warehouse",
  },
  wood_sheathed_plywood: {
    stiffness: 4, ductility: 6, drift: 4, fireRating: 3, swCost: 3,
    ductile: true, forHighRise: false,
    reinforcement: "nailed_plywood_osb_panel",
    bestUse: "residential_light_frame_wood",
  },
  steel_plate_infill: {
    stiffness: 10, ductility: 9, drift: 10, fireRating: 5, swCost: 9,
    ductile: true, forHighRise: true,
    reinforcement: "thin_steel_plate_boundary_frame",
    bestUse: "seismic_high_rise_retrofit",
  },
  coupled_link_beam: {
    stiffness: 8, ductility: 10, drift: 8, fireRating: 8, swCost: 8,
    ductile: true, forHighRise: true,
    reinforcement: "diagonal_rebar_coupling_beam",
    bestUse: "tall_building_core_dual_system",
  },
};

function get(t: ShearWallType): ShearWallData {
  return DATA[t];
}

export const stiffness = (t: ShearWallType) => get(t).stiffness;
export const ductility = (t: ShearWallType) => get(t).ductility;
export const drift = (t: ShearWallType) => get(t).drift;
export const fireRating = (t: ShearWallType) => get(t).fireRating;
export const swCost = (t: ShearWallType) => get(t).swCost;
export const ductile = (t: ShearWallType) => get(t).ductile;
export const forHighRise = (t: ShearWallType) => get(t).forHighRise;
export const reinforcement = (t: ShearWallType) => get(t).reinforcement;
export const bestUse = (t: ShearWallType) => get(t).bestUse;
export const shearWallTypes = (): ShearWallType[] =>
  Object.keys(DATA) as ShearWallType[];

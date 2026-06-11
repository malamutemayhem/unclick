export type GrilleType =
  | "bar_grille_linear_fixed"
  | "egg_crate_lattice_open"
  | "stamped_face_decorative"
  | "double_deflection_supply"
  | "transfer_grille_door_wall";

interface GrilleData {
  freeArea: number;
  directional: number;
  aesthetic: number;
  pressure: number;
  glCost: number;
  adjustable: boolean;
  forReturn: boolean;
  face: string;
  bestUse: string;
}

const DATA: Record<GrilleType, GrilleData> = {
  bar_grille_linear_fixed: {
    freeArea: 7, directional: 3, aesthetic: 6, pressure: 4, glCost: 4,
    adjustable: false, forReturn: true,
    face: "horizontal_bar_fixed_spacing",
    bestUse: "return_exhaust_general_commercial",
  },
  egg_crate_lattice_open: {
    freeArea: 9, directional: 2, aesthetic: 5, pressure: 3, glCost: 3,
    adjustable: false, forReturn: true,
    face: "square_cell_lattice_open_mesh",
    bestUse: "return_air_low_velocity_open_area",
  },
  stamped_face_decorative: {
    freeArea: 5, directional: 2, aesthetic: 9, pressure: 5, glCost: 5,
    adjustable: false, forReturn: true,
    face: "decorative_pattern_stamped_steel",
    bestUse: "residential_return_visible_aesthetic",
  },
  double_deflection_supply: {
    freeArea: 6, directional: 9, aesthetic: 7, pressure: 6, glCost: 7,
    adjustable: true, forReturn: false,
    face: "horizontal_vertical_blade_adjust",
    bestUse: "sidewall_supply_directional_control",
  },
  transfer_grille_door_wall: {
    freeArea: 8, directional: 1, aesthetic: 4, pressure: 2, glCost: 2,
    adjustable: false, forReturn: false,
    face: "chevron_blade_sight_proof_pass",
    bestUse: "door_undercut_partition_transfer_air",
  },
};

function get(t: GrilleType): GrilleData {
  return DATA[t];
}

export const freeArea = (t: GrilleType) => get(t).freeArea;
export const directional = (t: GrilleType) => get(t).directional;
export const aesthetic = (t: GrilleType) => get(t).aesthetic;
export const pressure = (t: GrilleType) => get(t).pressure;
export const glCost = (t: GrilleType) => get(t).glCost;
export const adjustable = (t: GrilleType) => get(t).adjustable;
export const forReturn = (t: GrilleType) => get(t).forReturn;
export const face = (t: GrilleType) => get(t).face;
export const bestUse = (t: GrilleType) => get(t).bestUse;
export const grilleTypes = (): GrilleType[] =>
  Object.keys(DATA) as GrilleType[];

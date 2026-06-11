export type BeltConveyorType =
  | "flat_belt_general"
  | "troughed_belt_bulk"
  | "enclosed_belt_dust"
  | "steep_incline_cleated"
  | "pipe_conveyor_curved";

interface BeltConveyorData {
  capacity: number;
  distance: number;
  flexibility: number;
  dustControl: number;
  bcCost: number;
  enclosed: boolean;
  forBulk: boolean;
  belt: string;
  bestUse: string;
}

const DATA: Record<BeltConveyorType, BeltConveyorData> = {
  flat_belt_general: {
    capacity: 5, distance: 7, flexibility: 8, dustControl: 3, bcCost: 3,
    enclosed: false, forBulk: false,
    belt: "rubber_fabric_ply_flat_surface",
    bestUse: "package_unit_load_warehouse_sort",
  },
  troughed_belt_bulk: {
    capacity: 10, distance: 10, flexibility: 6, dustControl: 4, bcCost: 5,
    enclosed: false, forBulk: true,
    belt: "steel_cord_rubber_troughed_idler",
    bestUse: "mining_aggregate_long_distance_overland",
  },
  enclosed_belt_dust: {
    capacity: 7, distance: 6, flexibility: 5, dustControl: 10, bcCost: 7,
    enclosed: true, forBulk: true,
    belt: "rubber_belt_tubular_enclosed_casing",
    bestUse: "cement_chemical_dust_emission_control",
  },
  steep_incline_cleated: {
    capacity: 6, distance: 4, flexibility: 4, dustControl: 5, bcCost: 6,
    enclosed: false, forBulk: true,
    belt: "cleated_sidewall_corrugated_pocket",
    bestUse: "vertical_lift_steep_angle_limited_space",
  },
  pipe_conveyor_curved: {
    capacity: 8, distance: 8, flexibility: 9, dustControl: 9, bcCost: 8,
    enclosed: true, forBulk: true,
    belt: "rolled_pipe_form_belt_circular_section",
    bestUse: "complex_route_curve_overpass_environ",
  },
};

function get(t: BeltConveyorType): BeltConveyorData {
  return DATA[t];
}

export const capacity = (t: BeltConveyorType) => get(t).capacity;
export const distance = (t: BeltConveyorType) => get(t).distance;
export const flexibility = (t: BeltConveyorType) => get(t).flexibility;
export const dustControl = (t: BeltConveyorType) => get(t).dustControl;
export const bcCost = (t: BeltConveyorType) => get(t).bcCost;
export const enclosed = (t: BeltConveyorType) => get(t).enclosed;
export const forBulk = (t: BeltConveyorType) => get(t).forBulk;
export const belt = (t: BeltConveyorType) => get(t).belt;
export const bestUse = (t: BeltConveyorType) => get(t).bestUse;
export const beltConveyorTypes = (): BeltConveyorType[] =>
  Object.keys(DATA) as BeltConveyorType[];

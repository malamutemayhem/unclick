export type DockLeveler =
  | "mechanical_spring_pull"
  | "hydraulic_push_button"
  | "air_powered_bag_lift"
  | "vertical_stored_recessed"
  | "edge_of_dock_bumper";

const DATA: Record<DockLeveler, {
  capacity: number; range: number; speed: number;
  safety: number; dlCost: number; pitless: boolean;
  forColdStorage: boolean; operation: string; bestUse: string;
}> = {
  mechanical_spring_pull: {
    capacity: 6, range: 6, speed: 5,
    safety: 5, dlCost: 1, pitless: false,
    forColdStorage: false, operation: "spring_hold_open_walk_down",
    bestUse: "low_volume_dock_basic_load",
  },
  hydraulic_push_button: {
    capacity: 9, range: 8, speed: 8,
    safety: 8, dlCost: 3, pitless: false,
    forColdStorage: false, operation: "hydraulic_cylinder_auto_return",
    bestUse: "distribution_center_high_traffic",
  },
  air_powered_bag_lift: {
    capacity: 7, range: 7, speed: 7,
    safety: 7, dlCost: 2, pitless: false,
    forColdStorage: false, operation: "airbag_inflate_lift_deck",
    bestUse: "medium_volume_energy_efficient",
  },
  vertical_stored_recessed: {
    capacity: 8, range: 9, speed: 6,
    safety: 10, dlCost: 5, pitless: false,
    forColdStorage: true, operation: "vertical_store_flush_seal",
    bestUse: "cold_storage_sealed_dock_face",
  },
  edge_of_dock_bumper: {
    capacity: 4, range: 3, speed: 9,
    safety: 6, dlCost: 1, pitless: true,
    forColdStorage: false, operation: "fixed_lip_mount_on_face",
    bestUse: "small_facility_no_pit_retrofit",
  },
};

const get = (t: DockLeveler) => DATA[t];

export const capacity = (t: DockLeveler) => get(t).capacity;
export const range = (t: DockLeveler) => get(t).range;
export const speed = (t: DockLeveler) => get(t).speed;
export const safety = (t: DockLeveler) => get(t).safety;
export const dlCost = (t: DockLeveler) => get(t).dlCost;
export const pitless = (t: DockLeveler) => get(t).pitless;
export const forColdStorage = (t: DockLeveler) => get(t).forColdStorage;
export const operation = (t: DockLeveler) => get(t).operation;
export const bestUse = (t: DockLeveler) => get(t).bestUse;
export const dockLevelers = (): DockLeveler[] => Object.keys(DATA) as DockLeveler[];

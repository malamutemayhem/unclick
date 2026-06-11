// breadboard-calc - breadboard types for prototyping

export type Breadboard =
  | "full_size_standard"
  | "half_size_compact"
  | "mini_breadboard_tiny"
  | "power_rail_integrated"
  | "transparent_clear_base";

const DATA: Record<Breadboard, {
  tiePoints: number; contactQuality: number; durability: number; portability: number;
  cost: number; hasPowerRail: boolean; transparent: boolean; baseType: string; bestUse: string;
}> = {
  full_size_standard:      { tiePoints: 10, contactQuality: 7, durability: 7, portability: 5, cost: 4, hasPowerRail: true, transparent: false, baseType: "abs_plastic_white", bestUse: "general_circuit_proto" },
  half_size_compact:       { tiePoints: 6, contactQuality: 7, durability: 7, portability: 8, cost: 3, hasPowerRail: true, transparent: false, baseType: "abs_plastic_white", bestUse: "small_project_proto" },
  mini_breadboard_tiny:    { tiePoints: 3, contactQuality: 6, durability: 6, portability: 10, cost: 1, hasPowerRail: false, transparent: false, baseType: "abs_adhesive_back", bestUse: "module_test_quick" },
  power_rail_integrated:   { tiePoints: 9, contactQuality: 8, durability: 8, portability: 4, cost: 6, hasPowerRail: true, transparent: false, baseType: "metal_plate_mount", bestUse: "regulated_power_proto" },
  transparent_clear_base:  { tiePoints: 8, contactQuality: 9, durability: 8, portability: 6, cost: 5, hasPowerRail: true, transparent: true, baseType: "clear_acrylic_base", bestUse: "teaching_demo_proto" },
};

const get = (b: Breadboard) => DATA[b];
export const tiePoints = (b: Breadboard) => get(b).tiePoints;
export const contactQuality = (b: Breadboard) => get(b).contactQuality;
export const durability = (b: Breadboard) => get(b).durability;
export const portability = (b: Breadboard) => get(b).portability;
export const boardCost = (b: Breadboard) => get(b).cost;
export const hasPowerRail = (b: Breadboard) => get(b).hasPowerRail;
export const transparent = (b: Breadboard) => get(b).transparent;
export const baseType = (b: Breadboard) => get(b).baseType;
export const bestUse = (b: Breadboard) => get(b).bestUse;
export const breadboards = (): Breadboard[] => Object.keys(DATA) as Breadboard[];

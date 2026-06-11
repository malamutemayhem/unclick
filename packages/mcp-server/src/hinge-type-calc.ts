export type HingeTypeType =
  | "butt_hinge_mortise_standard"
  | "continuous_piano_full_length"
  | "pivot_hinge_floor_top"
  | "spring_hinge_self_closing"
  | "concealed_invisible_european";

interface HingeTypeData {
  loadCapacity: number;
  durability: number;
  aesthetic: number;
  adjustability: number;
  htCost: number;
  selfClosing: boolean;
  forHeavy: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<HingeTypeType, HingeTypeData> = {
  butt_hinge_mortise_standard: {
    loadCapacity: 7, durability: 8, aesthetic: 6, adjustability: 5, htCost: 3,
    selfClosing: false, forHeavy: false,
    material: "stainless_steel_five_knuckle",
    bestUse: "standard_interior_exterior_door",
  },
  continuous_piano_full_length: {
    loadCapacity: 10, durability: 10, aesthetic: 5, adjustability: 3, htCost: 7,
    selfClosing: false, forHeavy: true,
    material: "aluminum_steel_full_length_bar",
    bestUse: "heavy_institutional_high_abuse_door",
  },
  pivot_hinge_floor_top: {
    loadCapacity: 9, durability: 9, aesthetic: 9, adjustability: 7, htCost: 9,
    selfClosing: false, forHeavy: true,
    material: "steel_floor_plate_top_pivot_arm",
    bestUse: "large_glass_entry_door_frameless",
  },
  spring_hinge_self_closing: {
    loadCapacity: 6, durability: 7, aesthetic: 5, adjustability: 8, htCost: 4,
    selfClosing: true, forHeavy: false,
    material: "steel_internal_spring_tension",
    bestUse: "fire_rated_door_self_close_code",
  },
  concealed_invisible_european: {
    loadCapacity: 5, durability: 7, aesthetic: 10, adjustability: 10, htCost: 8,
    selfClosing: false, forHeavy: false,
    material: "zinc_alloy_three_way_adjust",
    bestUse: "modern_flush_door_clean_line_hidden",
  },
};

function get(t: HingeTypeType): HingeTypeData {
  return DATA[t];
}

export const loadCapacity = (t: HingeTypeType) => get(t).loadCapacity;
export const durability = (t: HingeTypeType) => get(t).durability;
export const aesthetic = (t: HingeTypeType) => get(t).aesthetic;
export const adjustability = (t: HingeTypeType) => get(t).adjustability;
export const htCost = (t: HingeTypeType) => get(t).htCost;
export const selfClosing = (t: HingeTypeType) => get(t).selfClosing;
export const forHeavy = (t: HingeTypeType) => get(t).forHeavy;
export const material = (t: HingeTypeType) => get(t).material;
export const bestUse = (t: HingeTypeType) => get(t).bestUse;
export const hingeTypeTypes = (): HingeTypeType[] =>
  Object.keys(DATA) as HingeTypeType[];

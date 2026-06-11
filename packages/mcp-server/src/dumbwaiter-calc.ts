export type DumbwaiterType =
  | "manual_rope_pulley"
  | "electric_residential"
  | "commercial_food_service"
  | "library_book_lift"
  | "industrial_heavy_duty";

interface DumbwaiterData {
  capacity: number;
  speed: number;
  reliability: number;
  noise: number;
  dwCost: number;
  motorized: boolean;
  forCommercial: boolean;
  drive: string;
  bestUse: string;
}

const DATA: Record<DumbwaiterType, DumbwaiterData> = {
  manual_rope_pulley: {
    capacity: 3, speed: 2, reliability: 8, noise: 9, dwCost: 2,
    motorized: false, forCommercial: false,
    drive: "manual_rope_pulley_counter_wt",
    bestUse: "home_laundry_firewood_lift",
  },
  electric_residential: {
    capacity: 4, speed: 5, reliability: 8, noise: 7, dwCost: 5,
    motorized: true, forCommercial: false,
    drive: "electric_drum_winch_120v",
    bestUse: "multi_story_home_grocery_lift",
  },
  commercial_food_service: {
    capacity: 6, speed: 7, reliability: 9, noise: 6, dwCost: 7,
    motorized: true, forCommercial: true,
    drive: "traction_geared_stainless_cab",
    bestUse: "restaurant_kitchen_floor_svc",
  },
  library_book_lift: {
    capacity: 5, speed: 6, reliability: 9, noise: 8, dwCost: 6,
    motorized: true, forCommercial: true,
    drive: "electric_screw_drive_quiet",
    bestUse: "library_office_document_move",
  },
  industrial_heavy_duty: {
    capacity: 10, speed: 8, reliability: 9, noise: 4, dwCost: 9,
    motorized: true, forCommercial: true,
    drive: "hydraulic_ram_heavy_platform",
    bestUse: "warehouse_factory_parts_lift",
  },
};

function get(t: DumbwaiterType): DumbwaiterData {
  return DATA[t];
}

export const capacity = (t: DumbwaiterType) => get(t).capacity;
export const speed = (t: DumbwaiterType) => get(t).speed;
export const reliability = (t: DumbwaiterType) => get(t).reliability;
export const noise = (t: DumbwaiterType) => get(t).noise;
export const dwCost = (t: DumbwaiterType) => get(t).dwCost;
export const motorized = (t: DumbwaiterType) => get(t).motorized;
export const forCommercial = (t: DumbwaiterType) => get(t).forCommercial;
export const drive = (t: DumbwaiterType) => get(t).drive;
export const bestUse = (t: DumbwaiterType) => get(t).bestUse;
export const dumbwaiterTypes = (): DumbwaiterType[] =>
  Object.keys(DATA) as DumbwaiterType[];

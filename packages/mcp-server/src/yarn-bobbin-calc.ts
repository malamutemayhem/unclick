// yarn-bobbin-calc - yarn bobbin types for colorwork

export type YarnBobbin =
  | "plastic_bobbin_clip"
  | "wood_bobbin_peg"
  | "butterfly_wrap_hand"
  | "spring_bobbin_tension"
  | "cardboard_bobbin_flat";

const DATA: Record<YarnBobbin, {
  tensionControl: number; yarnCapacity: number; tangeFree: number; setupSpeed: number;
  cost: number; reusable: boolean; adjustable: boolean; bobbinStyle: string; bestUse: string;
}> = {
  plastic_bobbin_clip:    { tensionControl: 7, yarnCapacity: 6, tangeFree: 8, setupSpeed: 8, cost: 3, reusable: true, adjustable: false, bobbinStyle: "notched_clip_wrap", bestUse: "general_intarsia_color" },
  wood_bobbin_peg:        { tensionControl: 8, yarnCapacity: 7, tangeFree: 7, setupSpeed: 7, cost: 5, reusable: true, adjustable: false, bobbinStyle: "turned_wood_spool", bestUse: "traditional_bobbin_work" },
  butterfly_wrap_hand:    { tensionControl: 5, yarnCapacity: 4, tangeFree: 5, setupSpeed: 10, cost: 0, reusable: false, adjustable: false, bobbinStyle: "finger_wrapped_skein", bestUse: "quick_small_section" },
  spring_bobbin_tension:  { tensionControl: 10, yarnCapacity: 5, tangeFree: 9, setupSpeed: 6, cost: 6, reusable: true, adjustable: true, bobbinStyle: "spring_loaded_clip", bestUse: "controlled_tension_color" },
  cardboard_bobbin_flat:  { tensionControl: 6, yarnCapacity: 8, tangeFree: 6, setupSpeed: 9, cost: 1, reusable: false, adjustable: false, bobbinStyle: "flat_card_notch", bestUse: "economy_bulk_color" },
};

const get = (b: YarnBobbin) => DATA[b];
export const tensionControl = (b: YarnBobbin) => get(b).tensionControl;
export const yarnCapacity = (b: YarnBobbin) => get(b).yarnCapacity;
export const tangeFree = (b: YarnBobbin) => get(b).tangeFree;
export const setupSpeed = (b: YarnBobbin) => get(b).setupSpeed;
export const bobbinCost = (b: YarnBobbin) => get(b).cost;
export const reusable = (b: YarnBobbin) => get(b).reusable;
export const adjustable = (b: YarnBobbin) => get(b).adjustable;
export const bobbinStyle = (b: YarnBobbin) => get(b).bobbinStyle;
export const bestUse = (b: YarnBobbin) => get(b).bestUse;
export const yarnBobbins = (): YarnBobbin[] => Object.keys(DATA) as YarnBobbin[];

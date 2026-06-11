// silk-frame-calc - silk painting stretcher frame types

export type SilkFrame =
  | "adjustable_frame_flex"
  | "fixed_frame_standard"
  | "pin_frame_tension"
  | "clip_frame_quick"
  | "hoop_frame_round";

const DATA: Record<SilkFrame, {
  tensionEven: number; setupSpeed: number; sizeRange: number; portability: number;
  cost: number; adjustable: boolean; reusable: boolean; mountMethod: string; bestUse: string;
}> = {
  adjustable_frame_flex:  { tensionEven: 8, setupSpeed: 6, sizeRange: 10, portability: 5, cost: 7, adjustable: true, reusable: true, mountMethod: "sliding_bar_adjust", bestUse: "variable_size_silk" },
  fixed_frame_standard:   { tensionEven: 9, setupSpeed: 7, sizeRange: 5, portability: 6, cost: 4, adjustable: false, reusable: true, mountMethod: "fixed_corner_joint", bestUse: "standard_panel_paint" },
  pin_frame_tension:      { tensionEven: 10, setupSpeed: 4, sizeRange: 7, portability: 4, cost: 6, adjustable: false, reusable: true, mountMethod: "stainless_pin_stretch", bestUse: "high_tension_precision" },
  clip_frame_quick:       { tensionEven: 6, setupSpeed: 10, sizeRange: 8, portability: 8, cost: 5, adjustable: true, reusable: true, mountMethod: "spring_clip_grip", bestUse: "quick_setup_paint" },
  hoop_frame_round:       { tensionEven: 7, setupSpeed: 9, sizeRange: 4, portability: 9, cost: 3, adjustable: false, reusable: true, mountMethod: "nested_hoop_clamp", bestUse: "small_round_design" },
};

const get = (f: SilkFrame) => DATA[f];
export const tensionEven = (f: SilkFrame) => get(f).tensionEven;
export const setupSpeed = (f: SilkFrame) => get(f).setupSpeed;
export const sizeRange = (f: SilkFrame) => get(f).sizeRange;
export const portability = (f: SilkFrame) => get(f).portability;
export const frameCost = (f: SilkFrame) => get(f).cost;
export const adjustable = (f: SilkFrame) => get(f).adjustable;
export const reusable = (f: SilkFrame) => get(f).reusable;
export const mountMethod = (f: SilkFrame) => get(f).mountMethod;
export const bestUse = (f: SilkFrame) => get(f).bestUse;
export const silkFrames = (): SilkFrame[] => Object.keys(DATA) as SilkFrame[];

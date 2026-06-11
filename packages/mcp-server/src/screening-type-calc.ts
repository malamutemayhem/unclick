export type ScreeningType =
  | "vibrating_inclined_wire"
  | "trommel_rotary_drum"
  | "grizzly_bar_static"
  | "banana_multi_slope"
  | "dewatering_linear_motion";

const DATA: Record<ScreeningType, {
  capacity: number; accuracy: number; wearLife: number;
  moisture: number; scCost: number; moving: boolean;
  forWet: boolean; motion: string; bestUse: string;
}> = {
  vibrating_inclined_wire: {
    capacity: 8, accuracy: 7, wearLife: 6,
    moisture: 5, scCost: 2, moving: true,
    forWet: false, motion: "circular_throw_inclined_deck",
    bestUse: "aggregate_quarry_sizing_classify",
  },
  trommel_rotary_drum: {
    capacity: 7, accuracy: 5, wearLife: 8,
    moisture: 4, scCost: 2, moving: true,
    forWet: true, motion: "rotating_drum_tumble_screen",
    bestUse: "compost_topsoil_gold_wash_plant",
  },
  grizzly_bar_static: {
    capacity: 10, accuracy: 3, wearLife: 10,
    moisture: 3, scCost: 1, moving: false,
    forWet: false, motion: "static_gravity_scalp_bars",
    bestUse: "primary_scalping_rom_oversize",
  },
  banana_multi_slope: {
    capacity: 10, accuracy: 8, wearLife: 6,
    moisture: 6, scCost: 4, moving: true,
    forWet: true, motion: "linear_multi_incline_slope",
    bestUse: "high_tonnage_iron_ore_wet_screen",
  },
  dewatering_linear_motion: {
    capacity: 6, accuracy: 6, wearLife: 7,
    moisture: 10, scCost: 3, moving: true,
    forWet: true, motion: "linear_high_g_dewater_stroke",
    bestUse: "tailings_dewater_sand_recovery",
  },
};

const get = (t: ScreeningType) => DATA[t];

export const capacity = (t: ScreeningType) => get(t).capacity;
export const accuracy = (t: ScreeningType) => get(t).accuracy;
export const wearLife = (t: ScreeningType) => get(t).wearLife;
export const moisture = (t: ScreeningType) => get(t).moisture;
export const scCost = (t: ScreeningType) => get(t).scCost;
export const moving = (t: ScreeningType) => get(t).moving;
export const forWet = (t: ScreeningType) => get(t).forWet;
export const motion = (t: ScreeningType) => get(t).motion;
export const bestUse = (t: ScreeningType) => get(t).bestUse;
export const screeningTypes = (): ScreeningType[] => Object.keys(DATA) as ScreeningType[];

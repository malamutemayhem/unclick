export type ProjectBoxType =
  | "abs_plastic_desktop"
  | "aluminum_extruded"
  | "die_cast_ip67"
  | "clear_acrylic_display"
  | "handheld_ergonomic";

const DATA: Record<ProjectBoxType, {
  durability: number; shieldingEff: number; machinability: number;
  weatherResist: number; boxCost: number; metalBody: boolean;
  forOutdoor: boolean; material: string; bestUse: string;
}> = {
  abs_plastic_desktop: { durability: 6, shieldingEff: 2, machinability: 9, weatherResist: 5, boxCost: 2, metalBody: false, forOutdoor: false, material: "abs_injection_mold", bestUse: "bench_prototype_house" },
  aluminum_extruded: { durability: 8, shieldingEff: 9, machinability: 7, weatherResist: 7, boxCost: 5, metalBody: true, forOutdoor: false, material: "anodized_aluminum_6063", bestUse: "rf_shielded_enclosure" },
  die_cast_ip67: { durability: 10, shieldingEff: 8, machinability: 4, weatherResist: 10, boxCost: 8, metalBody: true, forOutdoor: true, material: "die_cast_aluminum_a380", bestUse: "outdoor_weather_station" },
  clear_acrylic_display: { durability: 4, shieldingEff: 1, machinability: 8, weatherResist: 3, boxCost: 4, metalBody: false, forOutdoor: false, material: "cast_acrylic_clear", bestUse: "led_display_showcase" },
  handheld_ergonomic: { durability: 7, shieldingEff: 2, machinability: 6, weatherResist: 4, boxCost: 6, metalBody: false, forOutdoor: false, material: "abs_pc_blend_grip", bestUse: "portable_meter_case" },
};

const get = (t: ProjectBoxType) => DATA[t];

export const durability = (t: ProjectBoxType) => get(t).durability;
export const shieldingEff = (t: ProjectBoxType) => get(t).shieldingEff;
export const machinability = (t: ProjectBoxType) => get(t).machinability;
export const weatherResist = (t: ProjectBoxType) => get(t).weatherResist;
export const boxCost = (t: ProjectBoxType) => get(t).boxCost;
export const metalBody = (t: ProjectBoxType) => get(t).metalBody;
export const forOutdoor = (t: ProjectBoxType) => get(t).forOutdoor;
export const material = (t: ProjectBoxType) => get(t).material;
export const bestUse = (t: ProjectBoxType) => get(t).bestUse;
export const projectBoxes = (): ProjectBoxType[] => Object.keys(DATA) as ProjectBoxType[];

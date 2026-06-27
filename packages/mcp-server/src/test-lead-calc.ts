export type TestLeadType =
  | "silicone_cat_iii"
  | "banana_stacking"
  | "alligator_clip_set"
  | "hook_clip_grabber"
  | "kelvin_4wire";

const DATA: Record<TestLeadType, {
  safetyRating: number; flexibility: number; contactQuality: number;
  durability: number; leadCost: number; retractable: boolean;
  forHighVoltage: boolean; tipStyle: string; bestUse: string;
}> = {
  silicone_cat_iii: { safetyRating: 9, flexibility: 9, contactQuality: 7, durability: 8, leadCost: 5, retractable: false, forHighVoltage: true, tipStyle: "shrouded_probe_tip", bestUse: "industrial_cat_iii_test" },
  banana_stacking: { safetyRating: 7, flexibility: 7, contactQuality: 8, durability: 7, leadCost: 3, retractable: false, forHighVoltage: false, tipStyle: "stackable_banana_4mm", bestUse: "lab_bench_instrument" },
  alligator_clip_set: { safetyRating: 5, flexibility: 8, contactQuality: 6, durability: 6, leadCost: 2, retractable: false, forHighVoltage: false, tipStyle: "spring_jaw_alligator", bestUse: "hands_free_clip_hold" },
  hook_clip_grabber: { safetyRating: 4, flexibility: 6, contactQuality: 9, durability: 5, leadCost: 4, retractable: true, forHighVoltage: false, tipStyle: "micro_hook_ic_grab", bestUse: "ic_pin_signal_probe" },
  kelvin_4wire: { safetyRating: 6, flexibility: 5, contactQuality: 10, durability: 7, leadCost: 7, retractable: false, forHighVoltage: false, tipStyle: "kelvin_clip_pair", bestUse: "precision_resistance_measure" },
};

const get = (t: TestLeadType) => DATA[t];

export const safetyRating = (t: TestLeadType) => get(t).safetyRating;
export const flexibility = (t: TestLeadType) => get(t).flexibility;
export const contactQuality = (t: TestLeadType) => get(t).contactQuality;
export const durability = (t: TestLeadType) => get(t).durability;
export const leadCost = (t: TestLeadType) => get(t).leadCost;
export const retractable = (t: TestLeadType) => get(t).retractable;
export const forHighVoltage = (t: TestLeadType) => get(t).forHighVoltage;
export const tipStyle = (t: TestLeadType) => get(t).tipStyle;
export const bestUse = (t: TestLeadType) => get(t).bestUse;
export const testLeads = (): TestLeadType[] => Object.keys(DATA) as TestLeadType[];

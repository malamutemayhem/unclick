export type EpoxyAdhesiveType =
  | "two_part_general"
  | "five_minute_rapid"
  | "structural_metal_bond"
  | "thermal_conductive"
  | "optical_clear_uv";

const DATA: Record<EpoxyAdhesiveType, {
  bondStrength: number; cureSpeed: number; gapFill: number;
  tempResist: number; epoxyCost: number; flexible: boolean;
  forMetal: boolean; cureMethod: string; bestUse: string;
}> = {
  two_part_general: { bondStrength: 7, cureSpeed: 4, gapFill: 8, tempResist: 6, epoxyCost: 3, flexible: false, forMetal: true, cureMethod: "amine_hardener_mix", bestUse: "general_repair_bond" },
  five_minute_rapid: { bondStrength: 5, cureSpeed: 10, gapFill: 5, tempResist: 4, epoxyCost: 4, flexible: false, forMetal: false, cureMethod: "mercaptan_fast_cure", bestUse: "quick_prototype_fix" },
  structural_metal_bond: { bondStrength: 10, cureSpeed: 2, gapFill: 6, tempResist: 9, epoxyCost: 8, flexible: false, forMetal: true, cureMethod: "heat_cure_crosslink", bestUse: "aircraft_panel_bond" },
  thermal_conductive: { bondStrength: 6, cureSpeed: 5, gapFill: 7, tempResist: 8, epoxyCost: 7, flexible: false, forMetal: true, cureMethod: "aluminum_filled_cure", bestUse: "heatsink_component_attach" },
  optical_clear_uv: { bondStrength: 6, cureSpeed: 9, gapFill: 3, tempResist: 5, epoxyCost: 9, flexible: true, forMetal: false, cureMethod: "uv_light_photocure", bestUse: "lens_glass_bond_clear" },
};

const get = (t: EpoxyAdhesiveType) => DATA[t];

export const bondStrength = (t: EpoxyAdhesiveType) => get(t).bondStrength;
export const cureSpeed = (t: EpoxyAdhesiveType) => get(t).cureSpeed;
export const gapFill = (t: EpoxyAdhesiveType) => get(t).gapFill;
export const tempResist = (t: EpoxyAdhesiveType) => get(t).tempResist;
export const epoxyCost = (t: EpoxyAdhesiveType) => get(t).epoxyCost;
export const flexible = (t: EpoxyAdhesiveType) => get(t).flexible;
export const forMetal = (t: EpoxyAdhesiveType) => get(t).forMetal;
export const cureMethod = (t: EpoxyAdhesiveType) => get(t).cureMethod;
export const bestUse = (t: EpoxyAdhesiveType) => get(t).bestUse;
export const epoxyAdhesives = (): EpoxyAdhesiveType[] => Object.keys(DATA) as EpoxyAdhesiveType[];

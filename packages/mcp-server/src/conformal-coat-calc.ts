export type ConformalCoatType =
  | "acrylic_ar_spray"
  | "silicone_sr_flex"
  | "urethane_ur_tough"
  | "epoxy_er_hard"
  | "parylene_xr_vapor";

const DATA: Record<ConformalCoatType, {
  moistureProtect: number; tempRange: number; flexibility: number;
  reworkability: number; coatCost: number; removable: boolean;
  forHighTemp: boolean; applyMethod: string; bestUse: string;
}> = {
  acrylic_ar_spray: { moistureProtect: 6, tempRange: 5, flexibility: 7, reworkability: 10, coatCost: 2, removable: true, forHighTemp: false, applyMethod: "spray_brush_dip", bestUse: "general_pcb_protect" },
  silicone_sr_flex: { moistureProtect: 8, tempRange: 9, flexibility: 10, reworkability: 7, coatCost: 5, removable: true, forHighTemp: true, applyMethod: "spray_selective_coat", bestUse: "automotive_vibration_env" },
  urethane_ur_tough: { moistureProtect: 9, tempRange: 7, flexibility: 5, reworkability: 3, coatCost: 5, removable: false, forHighTemp: false, applyMethod: "dip_selective_spray", bestUse: "chemical_harsh_exposure" },
  epoxy_er_hard: { moistureProtect: 10, tempRange: 7, flexibility: 2, reworkability: 1, coatCost: 4, removable: false, forHighTemp: false, applyMethod: "two_part_brush_pot", bestUse: "permanent_seal_encapsulate" },
  parylene_xr_vapor: { moistureProtect: 10, tempRange: 8, flexibility: 8, reworkability: 2, coatCost: 10, removable: false, forHighTemp: true, applyMethod: "vacuum_vapor_deposit", bestUse: "medical_implant_coat" },
};

const get = (t: ConformalCoatType) => DATA[t];

export const moistureProtect = (t: ConformalCoatType) => get(t).moistureProtect;
export const tempRange = (t: ConformalCoatType) => get(t).tempRange;
export const flexibility = (t: ConformalCoatType) => get(t).flexibility;
export const reworkability = (t: ConformalCoatType) => get(t).reworkability;
export const coatCost = (t: ConformalCoatType) => get(t).coatCost;
export const removable = (t: ConformalCoatType) => get(t).removable;
export const forHighTemp = (t: ConformalCoatType) => get(t).forHighTemp;
export const applyMethod = (t: ConformalCoatType) => get(t).applyMethod;
export const bestUse = (t: ConformalCoatType) => get(t).bestUse;
export const conformalCoats = (): ConformalCoatType[] => Object.keys(DATA) as ConformalCoatType[];

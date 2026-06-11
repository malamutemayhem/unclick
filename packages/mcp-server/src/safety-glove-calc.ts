export type SafetyGloveType =
  | "leather_work_general"
  | "nitrile_chemical_resist"
  | "cut_resistant_hppe_steel"
  | "arc_flash_electrical_rated"
  | "heat_resistant_kevlar_alum";

interface SafetyGloveData {
  dexterity: number;
  protection: number;
  grip: number;
  durability: number;
  sgCost: number;
  disposable: boolean;
  forCut: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<SafetyGloveType, SafetyGloveData> = {
  leather_work_general: {
    dexterity: 6, protection: 6, grip: 7, durability: 8, sgCost: 4,
    disposable: false, forCut: false,
    material: "cowhide_split_grain_leather",
    bestUse: "general_handling_abrasion_heat",
  },
  nitrile_chemical_resist: {
    dexterity: 5, protection: 8, grip: 6, durability: 4, sgCost: 2,
    disposable: true, forCut: false,
    material: "nitrile_rubber_synthetic_thin",
    bestUse: "chemical_splash_lab_fuel_solvent",
  },
  cut_resistant_hppe_steel: {
    dexterity: 7, protection: 9, grip: 8, durability: 7, sgCost: 6,
    disposable: false, forCut: true,
    material: "hppe_fiber_steel_core_knit",
    bestUse: "glass_handling_sheet_metal_blade",
  },
  arc_flash_electrical_rated: {
    dexterity: 3, protection: 10, grip: 4, durability: 7, sgCost: 9,
    disposable: false, forCut: false,
    material: "rubber_insulated_leather_protector",
    bestUse: "electrical_panel_live_bus_switchgear",
  },
  heat_resistant_kevlar_alum: {
    dexterity: 4, protection: 9, grip: 5, durability: 8, sgCost: 7,
    disposable: false, forCut: true,
    material: "kevlar_aramid_aluminized_back",
    bestUse: "furnace_welding_foundry_hot_handle",
  },
};

function get(t: SafetyGloveType): SafetyGloveData {
  return DATA[t];
}

export const dexterity = (t: SafetyGloveType) => get(t).dexterity;
export const protection = (t: SafetyGloveType) => get(t).protection;
export const grip = (t: SafetyGloveType) => get(t).grip;
export const durability = (t: SafetyGloveType) => get(t).durability;
export const sgCost = (t: SafetyGloveType) => get(t).sgCost;
export const disposable = (t: SafetyGloveType) => get(t).disposable;
export const forCut = (t: SafetyGloveType) => get(t).forCut;
export const material = (t: SafetyGloveType) => get(t).material;
export const bestUse = (t: SafetyGloveType) => get(t).bestUse;
export const safetyGloveTypes = (): SafetyGloveType[] =>
  Object.keys(DATA) as SafetyGloveType[];

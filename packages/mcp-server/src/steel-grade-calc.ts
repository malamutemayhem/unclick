export type SteelGrade =
  | "mild_a36_structural"
  | "high_strength_a572_gr50"
  | "stainless_304_austenitic"
  | "weathering_a588_corten"
  | "quenched_tempered_a514";

const DATA: Record<SteelGrade, {
  tensile: number; weldability: number; corrosionResist: number;
  ductility: number; sgCost: number; paintFree: boolean;
  forBridge: boolean; composition: string; bestUse: string;
}> = {
  mild_a36_structural: {
    tensile: 4, weldability: 10, corrosionResist: 3,
    ductility: 9, sgCost: 1, paintFree: false,
    forBridge: false, composition: "low_carbon_0_26_max",
    bestUse: "building_frame_general_structure",
  },
  high_strength_a572_gr50: {
    tensile: 7, weldability: 8, corrosionResist: 3,
    ductility: 7, sgCost: 2, paintFree: false,
    forBridge: true, composition: "hsla_columbium_vanadium",
    bestUse: "bridge_girder_high_strength",
  },
  stainless_304_austenitic: {
    tensile: 6, weldability: 7, corrosionResist: 10,
    ductility: 8, sgCost: 5, paintFree: true,
    forBridge: false, composition: "18_cr_8_ni_austenitic",
    bestUse: "food_plant_chemical_tank",
  },
  weathering_a588_corten: {
    tensile: 7, weldability: 6, corrosionResist: 8,
    ductility: 6, sgCost: 3, paintFree: true,
    forBridge: true, composition: "copper_chromium_nickel_alloy",
    bestUse: "exposed_bridge_unpainted_facade",
  },
  quenched_tempered_a514: {
    tensile: 10, weldability: 4, corrosionResist: 3,
    ductility: 4, sgCost: 4, paintFree: false,
    forBridge: true, composition: "alloy_quench_temper_high_c",
    bestUse: "heavy_plate_pressure_vessel",
  },
};

const get = (t: SteelGrade) => DATA[t];

export const tensile = (t: SteelGrade) => get(t).tensile;
export const weldability = (t: SteelGrade) => get(t).weldability;
export const corrosionResist = (t: SteelGrade) => get(t).corrosionResist;
export const ductility = (t: SteelGrade) => get(t).ductility;
export const sgCost = (t: SteelGrade) => get(t).sgCost;
export const paintFree = (t: SteelGrade) => get(t).paintFree;
export const forBridge = (t: SteelGrade) => get(t).forBridge;
export const composition = (t: SteelGrade) => get(t).composition;
export const bestUse = (t: SteelGrade) => get(t).bestUse;
export const steelGrades = (): SteelGrade[] => Object.keys(DATA) as SteelGrade[];

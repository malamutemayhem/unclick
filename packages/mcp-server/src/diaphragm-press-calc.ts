export type DiaphragmPressType =
  | "flat_diaphragm_flush"
  | "corrugated_diaphragm_range"
  | "capsule_low_pressure"
  | "sealed_system_remote"
  | "chemical_seal_isolate";

interface DiaphragmPressData {
  accuracy: number;
  lowPressRange: number;
  overloadProtect: number;
  corrosionResist: number;
  dpCost_: number;
  flushMount: boolean;
  forCorrosive: boolean;
  diaphragm: string;
  bestUse: string;
}

const DATA: Record<DiaphragmPressType, DiaphragmPressData> = {
  flat_diaphragm_flush: {
    accuracy: 7, lowPressRange: 6, overloadProtect: 8, corrosionResist: 8, dpCost_: 5,
    flushMount: true, forCorrosive: true,
    diaphragm: "flat_stainless_flush_no_cavity_crevice",
    bestUse: "sanitary_food_pharma_flush_cip_clean",
  },
  corrugated_diaphragm_range: {
    accuracy: 8, lowPressRange: 8, overloadProtect: 7, corrosionResist: 6, dpCost_: 4,
    flushMount: false, forCorrosive: false,
    diaphragm: "corrugated_metal_disc_spring_deflect",
    bestUse: "low_pressure_gas_draft_hvac_measure",
  },
  capsule_low_pressure: {
    accuracy: 9, lowPressRange: 10, overloadProtect: 6, corrosionResist: 5, dpCost_: 5,
    flushMount: false, forCorrosive: false,
    diaphragm: "dual_welded_capsule_very_low_pressure",
    bestUse: "very_low_pressure_inches_water_column",
  },
  sealed_system_remote: {
    accuracy: 6, lowPressRange: 5, overloadProtect: 8, corrosionResist: 9, dpCost_: 7,
    flushMount: true, forCorrosive: true,
    diaphragm: "remote_seal_capillary_fill_fluid_link",
    bestUse: "hot_corrosive_remote_mount_capillary",
  },
  chemical_seal_isolate: {
    accuracy: 5, lowPressRange: 4, overloadProtect: 9, corrosionResist: 10, dpCost_: 6,
    flushMount: true, forCorrosive: true,
    diaphragm: "tantalum_hastelloy_ptfe_lined_isolate",
    bestUse: "aggressive_chemical_acid_slurry_isolate",
  },
};

function get(t: DiaphragmPressType): DiaphragmPressData {
  return DATA[t];
}

export const accuracy = (t: DiaphragmPressType) => get(t).accuracy;
export const lowPressRange = (t: DiaphragmPressType) => get(t).lowPressRange;
export const overloadProtect = (t: DiaphragmPressType) => get(t).overloadProtect;
export const corrosionResist = (t: DiaphragmPressType) => get(t).corrosionResist;
export const dpCost_ = (t: DiaphragmPressType) => get(t).dpCost_;
export const flushMount = (t: DiaphragmPressType) => get(t).flushMount;
export const forCorrosive = (t: DiaphragmPressType) => get(t).forCorrosive;
export const diaphragm = (t: DiaphragmPressType) => get(t).diaphragm;
export const bestUse = (t: DiaphragmPressType) => get(t).bestUse;
export const diaphragmPressTypes = (): DiaphragmPressType[] =>
  Object.keys(DATA) as DiaphragmPressType[];

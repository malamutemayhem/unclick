export type DiaphragmValveControlType =
  | "weir_type_standard"
  | "straight_through_full"
  | "zero_dead_leg_tee"
  | "multiport_block_body"
  | "aseptic_steam_barrier";

interface DiaphragmValveControlData {
  controlRange: number;
  cleanability: number;
  corrosionResist: number;
  leakIntegrity: number;
  dvCost: number;
  zeroDead: boolean;
  forBioprocess: boolean;
  diaphragm: string;
  bestUse: string;
}

const DATA: Record<DiaphragmValveControlType, DiaphragmValveControlData> = {
  weir_type_standard: {
    controlRange: 8, cleanability: 9, corrosionResist: 9, leakIntegrity: 9, dvCost: 5,
    zeroDead: false, forBioprocess: true,
    diaphragm: "ptfe_faced_rubber_diaphragm_weir_body_seal",
    bestUse: "pharma_biotech_chemical_corrosive_clean_fluid",
  },
  straight_through_full: {
    controlRange: 6, cleanability: 10, corrosionResist: 9, leakIntegrity: 8, dvCost: 6,
    zeroDead: false, forBioprocess: true,
    diaphragm: "full_bore_straight_through_drainable_body",
    bestUse: "food_dairy_slurry_viscous_full_bore_drain",
  },
  zero_dead_leg_tee: {
    controlRange: 7, cleanability: 10, corrosionResist: 9, leakIntegrity: 10, dvCost: 8,
    zeroDead: true, forBioprocess: true,
    diaphragm: "tee_body_zero_dead_leg_steam_through_design",
    bestUse: "bioreactor_sampling_zero_dead_leg_sterile",
  },
  multiport_block_body: {
    controlRange: 7, cleanability: 8, corrosionResist: 9, leakIntegrity: 9, dvCost: 9,
    zeroDead: false, forBioprocess: true,
    diaphragm: "multi_port_block_body_integrated_manifold",
    bestUse: "chromatography_skid_manifold_compact_valve",
  },
  aseptic_steam_barrier: {
    controlRange: 8, cleanability: 9, corrosionResist: 9, leakIntegrity: 10, dvCost: 10,
    zeroDead: true, forBioprocess: true,
    diaphragm: "double_diaphragm_steam_barrier_aseptic_seal",
    bestUse: "aseptic_fill_finish_sterile_barrier_critical",
  },
};

function get(t: DiaphragmValveControlType): DiaphragmValveControlData {
  return DATA[t];
}

export const controlRange = (t: DiaphragmValveControlType) => get(t).controlRange;
export const cleanability = (t: DiaphragmValveControlType) => get(t).cleanability;
export const corrosionResist = (t: DiaphragmValveControlType) => get(t).corrosionResist;
export const leakIntegrity = (t: DiaphragmValveControlType) => get(t).leakIntegrity;
export const dvCost = (t: DiaphragmValveControlType) => get(t).dvCost;
export const zeroDead = (t: DiaphragmValveControlType) => get(t).zeroDead;
export const forBioprocess = (t: DiaphragmValveControlType) => get(t).forBioprocess;
export const diaphragm = (t: DiaphragmValveControlType) => get(t).diaphragm;
export const bestUse = (t: DiaphragmValveControlType) => get(t).bestUse;
export const diaphragmValveControlTypes = (): DiaphragmValveControlType[] =>
  Object.keys(DATA) as DiaphragmValveControlType[];

export type DiaphragmValveType =
  | "weir_type_standard"
  | "straight_through_full"
  | "zero_dead_leg_aseptic"
  | "lined_corrosive_chem"
  | "multi_port_block_body";

interface DiaphragmValveData {
  containment: number;
  cleanability: number;
  throttling: number;
  pressureLimit: number;
  dvCost: number;
  zeroDeadLeg: boolean;
  forPharma: boolean;
  diaphragm: string;
  bestUse: string;
}

const DATA: Record<DiaphragmValveType, DiaphragmValveData> = {
  weir_type_standard: {
    containment: 9, cleanability: 8, throttling: 7, pressureLimit: 6, dvCost: 5,
    zeroDeadLeg: false, forPharma: true,
    diaphragm: "ptfe_faced_elastomer_weir_saddle_seat",
    bestUse: "biotech_ferment_sterile_media_control",
  },
  straight_through_full: {
    containment: 8, cleanability: 9, throttling: 5, pressureLimit: 5, dvCost: 6,
    zeroDeadLeg: false, forPharma: true,
    diaphragm: "full_bore_elastomer_straight_path",
    bestUse: "slurry_viscous_drain_full_bore_clean",
  },
  zero_dead_leg_aseptic: {
    containment: 10, cleanability: 10, throttling: 6, pressureLimit: 5, dvCost: 9,
    zeroDeadLeg: true, forPharma: true,
    diaphragm: "radial_diaphragm_zero_dead_leg_weld",
    bestUse: "pharma_wfi_pure_steam_aseptic_point",
  },
  lined_corrosive_chem: {
    containment: 10, cleanability: 7, throttling: 6, pressureLimit: 7, dvCost: 7,
    zeroDeadLeg: false, forPharma: false,
    diaphragm: "ptfe_pfa_lined_body_corrosion_barrier",
    bestUse: "acid_caustic_corrosive_chemical_handle",
  },
  multi_port_block_body: {
    containment: 9, cleanability: 8, throttling: 5, pressureLimit: 5, dvCost: 8,
    zeroDeadLeg: true, forPharma: true,
    diaphragm: "multi_port_manifold_block_reduce_weld",
    bestUse: "chromatography_sampling_multi_line_mfold",
  },
};

function get(t: DiaphragmValveType): DiaphragmValveData {
  return DATA[t];
}

export const containment = (t: DiaphragmValveType) => get(t).containment;
export const cleanability = (t: DiaphragmValveType) => get(t).cleanability;
export const throttling = (t: DiaphragmValveType) => get(t).throttling;
export const pressureLimit = (t: DiaphragmValveType) => get(t).pressureLimit;
export const dvCost = (t: DiaphragmValveType) => get(t).dvCost;
export const zeroDeadLeg = (t: DiaphragmValveType) => get(t).zeroDeadLeg;
export const forPharma = (t: DiaphragmValveType) => get(t).forPharma;
export const diaphragm = (t: DiaphragmValveType) => get(t).diaphragm;
export const bestUse = (t: DiaphragmValveType) => get(t).bestUse;
export const diaphragmValveTypes = (): DiaphragmValveType[] =>
  Object.keys(DATA) as DiaphragmValveType[];

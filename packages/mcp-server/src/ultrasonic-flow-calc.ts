export type UltrasonicFlowType =
  | "transit_time_inline"
  | "transit_time_clamp_on"
  | "doppler_suspended"
  | "cross_correlation"
  | "open_channel_level";

interface UltrasonicFlowData {
  accuracy: number;
  turndown: number;
  noObstruction: number;
  dirtHandle: number;
  ufCost: number;
  clampOn: boolean;
  forDirty: boolean;
  transducer: string;
  bestUse: string;
}

const DATA: Record<UltrasonicFlowType, UltrasonicFlowData> = {
  transit_time_inline: {
    accuracy: 9, turndown: 9, noObstruction: 10, dirtHandle: 4, ufCost: 6,
    clampOn: false, forDirty: false,
    transducer: "wetted_piezo_inline_spool_piece",
    bestUse: "clean_liquid_custody_transfer_accurate",
  },
  transit_time_clamp_on: {
    accuracy: 7, turndown: 8, noObstruction: 10, dirtHandle: 3, ufCost: 5,
    clampOn: true, forDirty: false,
    transducer: "external_clamp_on_no_process_intrusion",
    bestUse: "retrofit_audit_temporary_non_invasive",
  },
  doppler_suspended: {
    accuracy: 5, turndown: 6, noObstruction: 10, dirtHandle: 9, ufCost: 4,
    clampOn: true, forDirty: true,
    transducer: "doppler_shift_reflected_particle_bubble",
    bestUse: "slurry_wastewater_aerated_dirty_liquid",
  },
  cross_correlation: {
    accuracy: 6, turndown: 7, noObstruction: 10, dirtHandle: 8, ufCost: 7,
    clampOn: false, forDirty: true,
    transducer: "multi_path_cross_correlation_turbulent",
    bestUse: "large_pipe_river_intake_raw_water_flow",
  },
  open_channel_level: {
    accuracy: 7, turndown: 7, noObstruction: 8, dirtHandle: 7, ufCost: 4,
    clampOn: false, forDirty: true,
    transducer: "air_gap_ultrasonic_level_over_weir",
    bestUse: "open_channel_weir_flume_stormwater_flow",
  },
};

function get(t: UltrasonicFlowType): UltrasonicFlowData {
  return DATA[t];
}

export const accuracy = (t: UltrasonicFlowType) => get(t).accuracy;
export const turndown = (t: UltrasonicFlowType) => get(t).turndown;
export const noObstruction = (t: UltrasonicFlowType) => get(t).noObstruction;
export const dirtHandle = (t: UltrasonicFlowType) => get(t).dirtHandle;
export const ufCost = (t: UltrasonicFlowType) => get(t).ufCost;
export const clampOn = (t: UltrasonicFlowType) => get(t).clampOn;
export const forDirty = (t: UltrasonicFlowType) => get(t).forDirty;
export const transducer = (t: UltrasonicFlowType) => get(t).transducer;
export const bestUse = (t: UltrasonicFlowType) => get(t).bestUse;
export const ultrasonicFlowTypes = (): UltrasonicFlowType[] =>
  Object.keys(DATA) as UltrasonicFlowType[];

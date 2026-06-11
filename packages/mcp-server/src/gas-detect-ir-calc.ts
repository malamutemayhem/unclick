export type GasDetectIrType =
  | "ndir_point_single"
  | "ndir_dual_beam"
  | "open_path_line"
  | "photoacoustic_multi"
  | "tunable_diode_laser";

interface GasDetectIrData {
  sensitivity: number;
  selectivity: number;
  pathLength: number;
  stability: number;
  giCost: number;
  failSafe: boolean;
  forMultiGas: boolean;
  optic: string;
  bestUse: string;
}

const DATA: Record<GasDetectIrType, GasDetectIrData> = {
  ndir_point_single: {
    sensitivity: 7, selectivity: 8, pathLength: 3, stability: 8, giCost: 4,
    failSafe: true, forMultiGas: false,
    optic: "single_channel_narrow_band_filter_cell",
    bestUse: "co2_methane_single_gas_point_monitor",
  },
  ndir_dual_beam: {
    sensitivity: 8, selectivity: 9, pathLength: 3, stability: 9, giCost: 5,
    failSafe: true, forMultiGas: false,
    optic: "reference_measure_beam_drift_compensate",
    bestUse: "process_gas_analyzer_stable_long_term",
  },
  open_path_line: {
    sensitivity: 6, selectivity: 7, pathLength: 10, stability: 7, giCost: 7,
    failSafe: true, forMultiGas: false,
    optic: "transmitter_receiver_open_air_long_path",
    bestUse: "fence_line_perimeter_gas_cloud_detect",
  },
  photoacoustic_multi: {
    sensitivity: 9, selectivity: 10, pathLength: 3, stability: 8, giCost: 8,
    failSafe: true, forMultiGas: true,
    optic: "modulated_ir_acoustic_cell_microphone",
    bestUse: "multi_gas_sf6_refrigerant_ppb_level",
  },
  tunable_diode_laser: {
    sensitivity: 10, selectivity: 10, pathLength: 8, stability: 9, giCost: 9,
    failSafe: true, forMultiGas: false,
    optic: "tunable_laser_absorption_spectroscopy",
    bestUse: "process_gas_moisture_o2_hf_ppm_precise",
  },
};

function get(t: GasDetectIrType): GasDetectIrData {
  return DATA[t];
}

export const sensitivity = (t: GasDetectIrType) => get(t).sensitivity;
export const selectivity = (t: GasDetectIrType) => get(t).selectivity;
export const pathLength = (t: GasDetectIrType) => get(t).pathLength;
export const stability = (t: GasDetectIrType) => get(t).stability;
export const giCost = (t: GasDetectIrType) => get(t).giCost;
export const failSafe = (t: GasDetectIrType) => get(t).failSafe;
export const forMultiGas = (t: GasDetectIrType) => get(t).forMultiGas;
export const optic = (t: GasDetectIrType) => get(t).optic;
export const bestUse = (t: GasDetectIrType) => get(t).bestUse;
export const gasDetectIrTypes = (): GasDetectIrType[] =>
  Object.keys(DATA) as GasDetectIrType[];

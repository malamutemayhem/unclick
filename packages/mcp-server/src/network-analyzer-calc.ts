export type NetworkAnalyzer =
  | "scalar_sna"
  | "vector_vna_2port"
  | "multiport_vna_4"
  | "time_domain_tdr"
  | "pxi_modular_vna";

const DATA: Record<NetworkAnalyzer, {
  dynamicRange: number; freqRange: number; portCount: number;
  traceNoise: number; vnaCost: number; calibrated: boolean;
  forSignalInteg: boolean; measurement: string; bestUse: string;
}> = {
  scalar_sna: {
    dynamicRange: 4, freqRange: 6, portCount: 3,
    traceNoise: 5, vnaCost: 3, calibrated: false,
    forSignalInteg: false, measurement: "amplitude_only_scalar",
    bestUse: "antenna_return_loss",
  },
  vector_vna_2port: {
    dynamicRange: 8, freqRange: 8, portCount: 5,
    traceNoise: 8, vnaCost: 7, calibrated: true,
    forSignalInteg: true, measurement: "s_param_mag_phase",
    bestUse: "filter_matching_design",
  },
  multiport_vna_4: {
    dynamicRange: 8, freqRange: 8, portCount: 9,
    traceNoise: 8, vnaCost: 9, calibrated: true,
    forSignalInteg: true, measurement: "mixed_mode_balanced",
    bestUse: "differential_serdes_char",
  },
  time_domain_tdr: {
    dynamicRange: 6, freqRange: 7, portCount: 4,
    traceNoise: 7, vnaCost: 6, calibrated: true,
    forSignalInteg: true, measurement: "impedance_vs_distance",
    bestUse: "pcb_via_discontinuity",
  },
  pxi_modular_vna: {
    dynamicRange: 7, freqRange: 7, portCount: 8,
    traceNoise: 7, vnaCost: 5, calibrated: true,
    forSignalInteg: false, measurement: "automated_s_param",
    bestUse: "production_rf_test",
  },
};

const get = (t: NetworkAnalyzer) => DATA[t];

export const dynamicRange = (t: NetworkAnalyzer) => get(t).dynamicRange;
export const freqRange = (t: NetworkAnalyzer) => get(t).freqRange;
export const portCount = (t: NetworkAnalyzer) => get(t).portCount;
export const traceNoise = (t: NetworkAnalyzer) => get(t).traceNoise;
export const vnaCost = (t: NetworkAnalyzer) => get(t).vnaCost;
export const calibrated = (t: NetworkAnalyzer) => get(t).calibrated;
export const forSignalInteg = (t: NetworkAnalyzer) => get(t).forSignalInteg;
export const measurement = (t: NetworkAnalyzer) => get(t).measurement;
export const bestUse = (t: NetworkAnalyzer) => get(t).bestUse;
export const networkAnalyzers = (): NetworkAnalyzer[] => Object.keys(DATA) as NetworkAnalyzer[];

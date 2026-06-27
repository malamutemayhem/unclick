export type ImpedanceAnalyzerType =
  | "lcr_meter"
  | "impedance_bridge"
  | "gain_phase"
  | "dielectric_analyzer"
  | "electrochemical_imp";

interface ImpedanceAnalyzerData {
  freqRange: number;
  throughput: number;
  accuracy: number;
  measureSpeed: number;
  iaCost: number;
  autoBalance: boolean;
  forMaterial: boolean;
  analyzerConfig: string;
  bestUse: string;
}

const DATA: Record<ImpedanceAnalyzerType, ImpedanceAnalyzerData> = {
  lcr_meter: {
    freqRange: 7, throughput: 9, accuracy: 8, measureSpeed: 9, iaCost: 5,
    autoBalance: true, forMaterial: false,
    analyzerConfig: "lcr_meter_auto_balance_bridge_inductance_capacitance_resistance",
    bestUse: "component_test_lcr_meter_auto_balance_production_sort_bin",
  },
  impedance_bridge: {
    freqRange: 5, throughput: 5, accuracy: 10, measureSpeed: 4, iaCost: 7,
    autoBalance: false, forMaterial: false,
    analyzerConfig: "impedance_bridge_precision_standard_calibration_traceable",
    bestUse: "calibration_impedance_bridge_precision_standard_traceable_nist",
  },
  gain_phase: {
    freqRange: 10, throughput: 7, accuracy: 7, measureSpeed: 7, iaCost: 8,
    autoBalance: true, forMaterial: false,
    analyzerConfig: "gain_phase_impedance_analyzer_swept_frequency_bode_plot_loop",
    bestUse: "control_loop_gain_phase_analyzer_bode_plot_stability_margin",
  },
  dielectric_analyzer: {
    freqRange: 9, throughput: 5, accuracy: 9, measureSpeed: 5, iaCost: 9,
    autoBalance: true, forMaterial: true,
    analyzerConfig: "dielectric_impedance_analyzer_permittivity_loss_tangent_cure",
    bestUse: "material_char_dielectric_analyzer_permittivity_loss_tangent",
  },
  electrochemical_imp: {
    freqRange: 8, throughput: 6, accuracy: 8, measureSpeed: 6, iaCost: 7,
    autoBalance: true, forMaterial: true,
    analyzerConfig: "electrochemical_impedance_spectroscopy_eis_nyquist_corrosion",
    bestUse: "battery_corrosion_electrochemical_impedance_eis_nyquist_bode",
  },
};

function get(t: ImpedanceAnalyzerType): ImpedanceAnalyzerData {
  return DATA[t];
}

export const freqRange = (t: ImpedanceAnalyzerType) => get(t).freqRange;
export const throughput = (t: ImpedanceAnalyzerType) => get(t).throughput;
export const accuracy = (t: ImpedanceAnalyzerType) => get(t).accuracy;
export const measureSpeed = (t: ImpedanceAnalyzerType) => get(t).measureSpeed;
export const iaCost = (t: ImpedanceAnalyzerType) => get(t).iaCost;
export const autoBalance = (t: ImpedanceAnalyzerType) => get(t).autoBalance;
export const forMaterial = (t: ImpedanceAnalyzerType) => get(t).forMaterial;
export const analyzerConfig = (t: ImpedanceAnalyzerType) => get(t).analyzerConfig;
export const bestUse = (t: ImpedanceAnalyzerType) => get(t).bestUse;
export const impedanceAnalyzerTypes = (): ImpedanceAnalyzerType[] =>
  Object.keys(DATA) as ImpedanceAnalyzerType[];

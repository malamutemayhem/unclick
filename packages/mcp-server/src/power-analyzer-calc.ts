export type PowerAnalyzerType =
  | "portable_meter"
  | "panel_mount"
  | "network_analyzer"
  | "power_quality"
  | "energy_logger";

interface PowerAnalyzerData {
  accuracy: number;
  throughput: number;
  harmonicRange: number;
  channelCount: number;
  paCost: number;
  networkComm: boolean;
  forAudit: boolean;
  analyzerConfig: string;
  bestUse: string;
}

const DATA: Record<PowerAnalyzerType, PowerAnalyzerData> = {
  portable_meter: {
    accuracy: 6, throughput: 5, harmonicRange: 4, channelCount: 3, paCost: 3,
    networkComm: false, forAudit: true,
    analyzerConfig: "portable_meter_power_analyzer_clamp_on_ct_handheld_spot_check",
    bestUse: "field_check_portable_meter_power_analyzer_clamp_on_quick_measure",
  },
  panel_mount: {
    accuracy: 7, throughput: 8, harmonicRange: 6, channelCount: 5, paCost: 5,
    networkComm: true, forAudit: false,
    analyzerConfig: "panel_mount_power_analyzer_din_rail_fixed_install_monitor_display",
    bestUse: "switchboard_panel_mount_power_analyzer_permanent_monitor_display",
  },
  network_analyzer: {
    accuracy: 8, throughput: 9, harmonicRange: 8, channelCount: 8, paCost: 7,
    networkComm: true, forAudit: false,
    analyzerConfig: "network_analyzer_power_analyzer_multi_circuit_scada_gateway_log",
    bestUse: "plant_wide_network_analyzer_power_analyzer_multi_circuit_scada",
  },
  power_quality: {
    accuracy: 9, throughput: 7, harmonicRange: 10, channelCount: 6, paCost: 9,
    networkComm: true, forAudit: true,
    analyzerConfig: "power_quality_analyzer_transient_capture_flicker_sag_swell_log",
    bestUse: "utility_comply_power_quality_analyzer_transient_flicker_standard",
  },
  energy_logger: {
    accuracy: 7, throughput: 8, harmonicRange: 5, channelCount: 7, paCost: 5,
    networkComm: true, forAudit: true,
    analyzerConfig: "energy_logger_power_analyzer_long_term_record_trend_demand_peak",
    bestUse: "energy_audit_energy_logger_power_analyzer_long_term_trend_peak",
  },
};

function get(t: PowerAnalyzerType): PowerAnalyzerData {
  return DATA[t];
}

export const accuracy = (t: PowerAnalyzerType) => get(t).accuracy;
export const throughput = (t: PowerAnalyzerType) => get(t).throughput;
export const harmonicRange = (t: PowerAnalyzerType) => get(t).harmonicRange;
export const channelCount = (t: PowerAnalyzerType) => get(t).channelCount;
export const paCost = (t: PowerAnalyzerType) => get(t).paCost;
export const networkComm = (t: PowerAnalyzerType) => get(t).networkComm;
export const forAudit = (t: PowerAnalyzerType) => get(t).forAudit;
export const analyzerConfig = (t: PowerAnalyzerType) => get(t).analyzerConfig;
export const bestUse = (t: PowerAnalyzerType) => get(t).bestUse;
export const powerAnalyzerTypes = (): PowerAnalyzerType[] =>
  Object.keys(DATA) as PowerAnalyzerType[];

export type TvsDiodeType =
  | "unidirectional_smd"
  | "bidirectional_thru"
  | "tvs_array_multi_line"
  | "automotive_grade_high"
  | "low_cap_data_line";

const DATA: Record<TvsDiodeType, {
  clampVoltage: number; peakPower: number; responseSpeed: number;
  capacitance: number; tvsCost: number; bidirectional: boolean;
  forData: boolean; packageType: string; bestUse: string;
}> = {
  unidirectional_smd: { clampVoltage: 7, peakPower: 6, responseSpeed: 8, capacitance: 5, tvsCost: 2, bidirectional: false, forData: false, packageType: "sma_surface_mount", bestUse: "dc_power_esd_protect" },
  bidirectional_thru: { clampVoltage: 6, peakPower: 8, responseSpeed: 7, capacitance: 4, tvsCost: 3, bidirectional: true, forData: false, packageType: "do214_through_hole", bestUse: "ac_signal_line_clamp" },
  tvs_array_multi_line: { clampVoltage: 7, peakPower: 5, responseSpeed: 9, capacitance: 7, tvsCost: 5, bidirectional: true, forData: true, packageType: "soic_multi_channel", bestUse: "usb_hdmi_port_protect" },
  automotive_grade_high: { clampVoltage: 8, peakPower: 10, responseSpeed: 6, capacitance: 3, tvsCost: 7, bidirectional: false, forData: false, packageType: "smc_high_power", bestUse: "load_dump_auto_protect" },
  low_cap_data_line: { clampVoltage: 6, peakPower: 4, responseSpeed: 10, capacitance: 10, tvsCost: 4, bidirectional: true, forData: true, packageType: "sot23_low_profile", bestUse: "high_speed_data_guard" },
};

const get = (t: TvsDiodeType) => DATA[t];

export const clampVoltage = (t: TvsDiodeType) => get(t).clampVoltage;
export const peakPower = (t: TvsDiodeType) => get(t).peakPower;
export const responseSpeed = (t: TvsDiodeType) => get(t).responseSpeed;
export const capacitance = (t: TvsDiodeType) => get(t).capacitance;
export const tvsCost = (t: TvsDiodeType) => get(t).tvsCost;
export const bidirectional = (t: TvsDiodeType) => get(t).bidirectional;
export const forData = (t: TvsDiodeType) => get(t).forData;
export const packageType = (t: TvsDiodeType) => get(t).packageType;
export const bestUse = (t: TvsDiodeType) => get(t).bestUse;
export const tvsDiodes = (): TvsDiodeType[] => Object.keys(DATA) as TvsDiodeType[];

export type WinePumpType =
  | "peristaltic_hose"
  | "progressive_cavity"
  | "centrifugal_sanitary"
  | "diaphragm_air"
  | "lobe_rotary";

interface WinePumpData {
  gentleness: number;
  flowRate: number;
  selfPriming: number;
  cleanability: number;
  wpCost_: number;
  canRunDry: boolean;
  forMust: boolean;
  pumpConfig: string;
  bestUse: string;
}

const DATA: Record<WinePumpType, WinePumpData> = {
  peristaltic_hose: {
    gentleness: 10, flowRate: 5, selfPriming: 10, cleanability: 9, wpCost_: 7,
    canRunDry: true, forMust: true,
    pumpConfig: "peristaltic_hose_wine_pump_squeeze_tube_no_contact_gentle_transfer",
    bestUse: "premium_winery_peristaltic_pump_gentle_must_lees_transfer_no_shear",
  },
  progressive_cavity: {
    gentleness: 8, flowRate: 8, selfPriming: 9, cleanability: 6, wpCost_: 6,
    canRunDry: false, forMust: true,
    pumpConfig: "progressive_cavity_wine_pump_helical_rotor_stator_thick_must_handle",
    bestUse: "must_transfer_winery_progressive_cavity_pump_thick_slurry_solids",
  },
  centrifugal_sanitary: {
    gentleness: 4, flowRate: 10, selfPriming: 3, cleanability: 10, wpCost_: 5,
    canRunDry: false, forMust: false,
    pumpConfig: "centrifugal_sanitary_wine_pump_impeller_high_flow_cip_clean_place",
    bestUse: "large_winery_centrifugal_pump_high_volume_juice_wine_transfer_cip",
  },
  diaphragm_air: {
    gentleness: 9, flowRate: 6, selfPriming: 10, cleanability: 8, wpCost_: 4,
    canRunDry: true, forMust: true,
    pumpConfig: "diaphragm_air_operated_wine_pump_double_membrane_pulse_flow_safe",
    bestUse: "versatile_winery_diaphragm_pump_air_operated_safe_any_liquid_type",
  },
  lobe_rotary: {
    gentleness: 7, flowRate: 9, selfPriming: 7, cleanability: 9, wpCost_: 8,
    canRunDry: false, forMust: false,
    pumpConfig: "lobe_rotary_wine_pump_positive_displacement_precise_flow_control",
    bestUse: "automated_winery_lobe_rotary_pump_precise_flow_metering_dosing",
  },
};

function get(t: WinePumpType): WinePumpData {
  return DATA[t];
}

export const gentleness = (t: WinePumpType) => get(t).gentleness;
export const flowRate = (t: WinePumpType) => get(t).flowRate;
export const selfPriming = (t: WinePumpType) => get(t).selfPriming;
export const cleanability = (t: WinePumpType) => get(t).cleanability;
export const wpCost_ = (t: WinePumpType) => get(t).wpCost_;
export const canRunDry = (t: WinePumpType) => get(t).canRunDry;
export const forMust = (t: WinePumpType) => get(t).forMust;
export const pumpConfig = (t: WinePumpType) => get(t).pumpConfig;
export const bestUse = (t: WinePumpType) => get(t).bestUse;
export const winePumpTypes = (): WinePumpType[] =>
  Object.keys(DATA) as WinePumpType[];

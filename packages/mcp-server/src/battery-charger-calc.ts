export type BatteryCharger =
  | "linear_cc_cv"
  | "switching_buck_charge"
  | "usbc_pd_pps"
  | "wireless_qi2"
  | "solar_mppt";

const DATA: Record<BatteryCharger, {
  chargeCurrent: number; efficiency: number; accuracy: number;
  thermalPerf: number; chargerCost: number; pathManagement: boolean;
  forWearable: boolean; protocol: string; bestUse: string;
}> = {
  linear_cc_cv: {
    chargeCurrent: 3, efficiency: 3, accuracy: 7,
    thermalPerf: 3, chargerCost: 2, pathManagement: false,
    forWearable: true, protocol: "cc_cv_4v2_linear",
    bestUse: "tws_earbud_case",
  },
  switching_buck_charge: {
    chargeCurrent: 8, efficiency: 9, accuracy: 8,
    thermalPerf: 8, chargerCost: 5, pathManagement: true,
    forWearable: false, protocol: "buck_nvdc_otg",
    bestUse: "tablet_fast_charge",
  },
  usbc_pd_pps: {
    chargeCurrent: 10, efficiency: 8, accuracy: 9,
    thermalPerf: 7, chargerCost: 7, pathManagement: true,
    forWearable: false, protocol: "pd3_1_pps_avs",
    bestUse: "laptop_usbc_charger",
  },
  wireless_qi2: {
    chargeCurrent: 5, efficiency: 5, accuracy: 6,
    thermalPerf: 5, chargerCost: 8, pathManagement: false,
    forWearable: true, protocol: "qi2_mpp_15w",
    bestUse: "phone_wireless_pad",
  },
  solar_mppt: {
    chargeCurrent: 4, efficiency: 7, accuracy: 6,
    thermalPerf: 6, chargerCost: 6, pathManagement: false,
    forWearable: false, protocol: "perturb_observe_mppt",
    bestUse: "iot_solar_node",
  },
};

const get = (t: BatteryCharger) => DATA[t];

export const chargeCurrent = (t: BatteryCharger) => get(t).chargeCurrent;
export const efficiency = (t: BatteryCharger) => get(t).efficiency;
export const accuracy = (t: BatteryCharger) => get(t).accuracy;
export const thermalPerf = (t: BatteryCharger) => get(t).thermalPerf;
export const chargerCost = (t: BatteryCharger) => get(t).chargerCost;
export const pathManagement = (t: BatteryCharger) => get(t).pathManagement;
export const forWearable = (t: BatteryCharger) => get(t).forWearable;
export const protocol = (t: BatteryCharger) => get(t).protocol;
export const bestUse = (t: BatteryCharger) => get(t).bestUse;
export const batteryChargers = (): BatteryCharger[] => Object.keys(DATA) as BatteryCharger[];

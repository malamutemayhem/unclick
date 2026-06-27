export type PowerConverter =
  | "buck_sync"
  | "boost_pfc"
  | "flyback_isolated"
  | "llc_resonant"
  | "dab_bidirectional";

const DATA: Record<PowerConverter, {
  efficiency: number; powerDensity: number; regulation: number;
  emi: number; convCost: number; isolated: boolean;
  forRenewable: boolean; topology: string; bestUse: string;
}> = {
  buck_sync: {
    efficiency: 9, powerDensity: 9, regulation: 8,
    emi: 5, convCost: 3, isolated: false,
    forRenewable: false, topology: "step_down_half_bridge",
    bestUse: "cpu_vr_point_of_load",
  },
  boost_pfc: {
    efficiency: 8, powerDensity: 6, regulation: 7,
    emi: 6, convCost: 4, isolated: false,
    forRenewable: true, topology: "step_up_ccm_totem",
    bestUse: "ac_dc_front_end_pfc",
  },
  flyback_isolated: {
    efficiency: 6, powerDensity: 7, regulation: 6,
    emi: 4, convCost: 2, isolated: true,
    forRenewable: false, topology: "single_switch_transformer",
    bestUse: "phone_charger_adapter",
  },
  llc_resonant: {
    efficiency: 10, powerDensity: 8, regulation: 9,
    emi: 9, convCost: 6, isolated: true,
    forRenewable: true, topology: "half_bridge_resonant_tank",
    bestUse: "server_psu_dc_stage",
  },
  dab_bidirectional: {
    efficiency: 9, powerDensity: 7, regulation: 9,
    emi: 8, convCost: 8, isolated: true,
    forRenewable: true, topology: "dual_active_bridge_zvs",
    bestUse: "ev_v2g_battery_charger",
  },
};

const get = (t: PowerConverter) => DATA[t];

export const efficiency = (t: PowerConverter) => get(t).efficiency;
export const powerDensity = (t: PowerConverter) => get(t).powerDensity;
export const regulation = (t: PowerConverter) => get(t).regulation;
export const emi = (t: PowerConverter) => get(t).emi;
export const convCost = (t: PowerConverter) => get(t).convCost;
export const isolated = (t: PowerConverter) => get(t).isolated;
export const forRenewable = (t: PowerConverter) => get(t).forRenewable;
export const topology = (t: PowerConverter) => get(t).topology;
export const bestUse = (t: PowerConverter) => get(t).bestUse;
export const powerConverters = (): PowerConverter[] => Object.keys(DATA) as PowerConverter[];

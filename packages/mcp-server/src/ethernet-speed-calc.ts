export type EthernetSpeed =
  | "gbe_1g_copper"
  | "sfp28_25g"
  | "qsfp56_100g"
  | "qsfp_dd_400g"
  | "osfp_800g";

const DATA: Record<EthernetSpeed, {
  bandwidth: number; reach: number; portDensity: number;
  powerPerPort: number; ethCost: number; breakout: boolean;
  forSpine: boolean; optics: string; bestUse: string;
}> = {
  gbe_1g_copper: {
    bandwidth: 1, reach: 9, portDensity: 8,
    powerPerPort: 9, ethCost: 1, breakout: false,
    forSpine: false, optics: "rj45_cat6_100m",
    bestUse: "access_switch_endpoint",
  },
  sfp28_25g: {
    bandwidth: 4, reach: 7, portDensity: 8,
    powerPerPort: 8, ethCost: 3, breakout: false,
    forSpine: false, optics: "sfp28_sr_100m",
    bestUse: "server_tor_connect",
  },
  qsfp56_100g: {
    bandwidth: 6, reach: 6, portDensity: 7,
    powerPerPort: 6, ethCost: 5, breakout: true,
    forSpine: true, optics: "qsfp56_dr_500m",
    bestUse: "leaf_spine_fabric",
  },
  qsfp_dd_400g: {
    bandwidth: 8, reach: 5, portDensity: 5,
    powerPerPort: 4, ethCost: 8, breakout: true,
    forSpine: true, optics: "qsfp_dd_dr4_500m",
    bestUse: "spine_core_uplink",
  },
  osfp_800g: {
    bandwidth: 10, reach: 4, portDensity: 4,
    powerPerPort: 3, ethCost: 10, breakout: true,
    forSpine: true, optics: "osfp_2x400g_lr",
    bestUse: "ai_backend_network",
  },
};

const get = (t: EthernetSpeed) => DATA[t];

export const bandwidth = (t: EthernetSpeed) => get(t).bandwidth;
export const reach = (t: EthernetSpeed) => get(t).reach;
export const portDensity = (t: EthernetSpeed) => get(t).portDensity;
export const powerPerPort = (t: EthernetSpeed) => get(t).powerPerPort;
export const ethCost = (t: EthernetSpeed) => get(t).ethCost;
export const breakout = (t: EthernetSpeed) => get(t).breakout;
export const forSpine = (t: EthernetSpeed) => get(t).forSpine;
export const optics = (t: EthernetSpeed) => get(t).optics;
export const bestUse = (t: EthernetSpeed) => get(t).bestUse;
export const ethernetSpeeds = (): EthernetSpeed[] => Object.keys(DATA) as EthernetSpeed[];

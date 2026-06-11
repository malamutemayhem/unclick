export type SerdesStandard =
  | "pcie_gen5_32g"
  | "usb4_40g"
  | "ethernet_112g_pam4"
  | "hdmi_21_48g"
  | "displayport_20_80g";

const DATA: Record<SerdesStandard, {
  lineRate: number; laneCount: number; reachDistance: number;
  powerPerLane: number; serdesCost: number; pam4: boolean;
  forCompute: boolean; encoding: string; bestUse: string;
}> = {
  pcie_gen5_32g: {
    lineRate: 6, laneCount: 8, reachDistance: 4,
    powerPerLane: 5, serdesCost: 5, pam4: false,
    forCompute: true, encoding: "128b_130b_nrz",
    bestUse: "gpu_cpu_interconnect",
  },
  usb4_40g: {
    lineRate: 5, laneCount: 4, reachDistance: 3,
    powerPerLane: 4, serdesCost: 4, pam4: false,
    forCompute: true, encoding: "128b_132b_gen3x2",
    bestUse: "thunderbolt_peripheral",
  },
  ethernet_112g_pam4: {
    lineRate: 10, laneCount: 10, reachDistance: 8,
    powerPerLane: 8, serdesCost: 9, pam4: true,
    forCompute: false, encoding: "rs_fec_544_514",
    bestUse: "800g_switch_asic",
  },
  hdmi_21_48g: {
    lineRate: 7, laneCount: 5, reachDistance: 5,
    powerPerLane: 6, serdesCost: 6, pam4: false,
    forCompute: false, encoding: "16b_18b_frl",
    bestUse: "8k_display_output",
  },
  displayport_20_80g: {
    lineRate: 9, laneCount: 6, reachDistance: 4,
    powerPerLane: 7, serdesCost: 7, pam4: true,
    forCompute: false, encoding: "128b_132b_uhbr",
    bestUse: "16k_video_wall_link",
  },
};

const get = (t: SerdesStandard) => DATA[t];

export const lineRate = (t: SerdesStandard) => get(t).lineRate;
export const laneCount = (t: SerdesStandard) => get(t).laneCount;
export const reachDistance = (t: SerdesStandard) => get(t).reachDistance;
export const powerPerLane = (t: SerdesStandard) => get(t).powerPerLane;
export const serdesCost = (t: SerdesStandard) => get(t).serdesCost;
export const pam4 = (t: SerdesStandard) => get(t).pam4;
export const forCompute = (t: SerdesStandard) => get(t).forCompute;
export const encoding = (t: SerdesStandard) => get(t).encoding;
export const bestUse = (t: SerdesStandard) => get(t).bestUse;
export const serdesStandards = (): SerdesStandard[] => Object.keys(DATA) as SerdesStandard[];

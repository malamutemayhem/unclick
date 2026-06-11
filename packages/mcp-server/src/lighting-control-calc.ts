export type LightingControlType =
  | "0_10v_analog_dimmer"
  | "dali_digital_addressable"
  | "dmx_512_architectural"
  | "wireless_mesh_bluetooth"
  | "poe_ethernet_luminaire";

interface LightingControlData {
  precision: number;
  scalability: number;
  flexibility: number;
  installEase: number;
  lcCost: number;
  addressable: boolean;
  forRetrofit: boolean;
  signal: string;
  bestUse: string;
}

const DATA: Record<LightingControlType, LightingControlData> = {
  "0_10v_analog_dimmer": {
    precision: 5, scalability: 4, flexibility: 3, installEase: 8, lcCost: 2,
    addressable: false, forRetrofit: true,
    signal: "analog_0_10v_dc_sink_source",
    bestUse: "simple_dimming_single_zone",
  },
  dali_digital_addressable: {
    precision: 9, scalability: 8, flexibility: 9, installEase: 6, lcCost: 6,
    addressable: true, forRetrofit: false,
    signal: "dali_2_digital_bus_64_addr",
    bestUse: "office_school_zone_daylight",
  },
  dmx_512_architectural: {
    precision: 10, scalability: 7, flexibility: 10, installEase: 4, lcCost: 8,
    addressable: true, forRetrofit: false,
    signal: "dmx_512a_rs485_universe",
    bestUse: "theater_facade_color_scene",
  },
  wireless_mesh_bluetooth: {
    precision: 7, scalability: 9, flexibility: 8, installEase: 9, lcCost: 5,
    addressable: true, forRetrofit: true,
    signal: "ble_mesh_casambi_silvair",
    bestUse: "retrofit_tenant_space_flex",
  },
  poe_ethernet_luminaire: {
    precision: 9, scalability: 10, flexibility: 9, installEase: 5, lcCost: 9,
    addressable: true, forRetrofit: false,
    signal: "poe_ethernet_ip_luminaire",
    bestUse: "smart_building_iot_analytics",
  },
};

function get(t: LightingControlType): LightingControlData {
  return DATA[t];
}

export const precision = (t: LightingControlType) => get(t).precision;
export const scalability = (t: LightingControlType) => get(t).scalability;
export const flexibility = (t: LightingControlType) => get(t).flexibility;
export const installEase = (t: LightingControlType) => get(t).installEase;
export const lcCost = (t: LightingControlType) => get(t).lcCost;
export const addressable = (t: LightingControlType) => get(t).addressable;
export const forRetrofit = (t: LightingControlType) => get(t).forRetrofit;
export const signal = (t: LightingControlType) => get(t).signal;
export const bestUse = (t: LightingControlType) => get(t).bestUse;
export const lightingControlTypes = (): LightingControlType[] =>
  Object.keys(DATA) as LightingControlType[];

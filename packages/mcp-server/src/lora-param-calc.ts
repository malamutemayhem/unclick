export type LoraParam =
  | "lora_wan_class_a"
  | "lora_wan_class_b"
  | "lora_wan_class_c"
  | "lora_mesh_p2p"
  | "lr_fhss_satellite";

const DATA: Record<LoraParam, {
  range: number; powerEff: number; throughput: number;
  latency: number; loraCost: number; alwaysOn: boolean;
  forMeter: boolean; access: string; bestUse: string;
}> = {
  lora_wan_class_a: {
    range: 9, powerEff: 10, throughput: 2,
    latency: 3, loraCost: 2, alwaysOn: false,
    forMeter: true, access: "aloha_uplink_then_rx",
    bestUse: "remote_sensor_battery",
  },
  lora_wan_class_b: {
    range: 9, powerEff: 7, throughput: 3,
    latency: 6, loraCost: 3, alwaysOn: false,
    forMeter: true, access: "beacon_slotted_downlink",
    bestUse: "utility_meter_scheduled",
  },
  lora_wan_class_c: {
    range: 9, powerEff: 3, throughput: 4,
    latency: 9, loraCost: 3, alwaysOn: true,
    forMeter: false, access: "continuous_rx_window",
    bestUse: "street_light_actuator",
  },
  lora_mesh_p2p: {
    range: 7, powerEff: 6, throughput: 3,
    latency: 5, loraCost: 2, alwaysOn: false,
    forMeter: false, access: "peer_relay_multi_hop",
    bestUse: "off_grid_ranch_network",
  },
  lr_fhss_satellite: {
    range: 10, powerEff: 5, throughput: 2,
    latency: 4, loraCost: 5, alwaysOn: false,
    forMeter: false, access: "freq_hopping_leo_uplink",
    bestUse: "global_asset_tracking",
  },
};

const get = (t: LoraParam) => DATA[t];

export const range = (t: LoraParam) => get(t).range;
export const powerEff = (t: LoraParam) => get(t).powerEff;
export const throughput = (t: LoraParam) => get(t).throughput;
export const latency = (t: LoraParam) => get(t).latency;
export const loraCost = (t: LoraParam) => get(t).loraCost;
export const alwaysOn = (t: LoraParam) => get(t).alwaysOn;
export const forMeter = (t: LoraParam) => get(t).forMeter;
export const access = (t: LoraParam) => get(t).access;
export const bestUse = (t: LoraParam) => get(t).bestUse;
export const loraParams = (): LoraParam[] => Object.keys(DATA) as LoraParam[];

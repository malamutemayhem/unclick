export type LoraModuleType =
  | "lora_sx127x_sub"
  | "lora_sx126x_low"
  | "lorawan_gateway"
  | "lora_mesh_peer"
  | "lora_2g4_high_band";

const DATA: Record<LoraModuleType, {
  range: number; dataRate: number; powerDraw: number;
  networkSize: number; moduleCost: number; lorawan: boolean;
  forRemote: boolean; freqBand: string; bestUse: string;
}> = {
  lora_sx127x_sub: { range: 8, dataRate: 3, powerDraw: 7, networkSize: 5, moduleCost: 2, lorawan: false, forRemote: true, freqBand: "sub_ghz_868_915", bestUse: "point_to_point_sensor" },
  lora_sx126x_low: { range: 9, dataRate: 3, powerDraw: 9, networkSize: 5, moduleCost: 3, lorawan: false, forRemote: true, freqBand: "sub_ghz_long_range", bestUse: "battery_10yr_field_node" },
  lorawan_gateway: { range: 10, dataRate: 4, powerDraw: 2, networkSize: 10, moduleCost: 8, lorawan: true, forRemote: true, freqBand: "sub_ghz_lorawan_class", bestUse: "city_wide_iot_network" },
  lora_mesh_peer: { range: 7, dataRate: 3, powerDraw: 6, networkSize: 8, moduleCost: 4, lorawan: false, forRemote: true, freqBand: "sub_ghz_mesh_relay", bestUse: "off_grid_mesh_comms" },
  lora_2g4_high_band: { range: 5, dataRate: 6, powerDraw: 7, networkSize: 4, moduleCost: 3, lorawan: false, forRemote: false, freqBand: "ism_2g4_worldwide", bestUse: "global_ism_no_license" },
};

const get = (t: LoraModuleType) => DATA[t];

export const range = (t: LoraModuleType) => get(t).range;
export const dataRate = (t: LoraModuleType) => get(t).dataRate;
export const powerDraw = (t: LoraModuleType) => get(t).powerDraw;
export const networkSize = (t: LoraModuleType) => get(t).networkSize;
export const moduleCost = (t: LoraModuleType) => get(t).moduleCost;
export const lorawan = (t: LoraModuleType) => get(t).lorawan;
export const forRemote = (t: LoraModuleType) => get(t).forRemote;
export const freqBand = (t: LoraModuleType) => get(t).freqBand;
export const bestUse = (t: LoraModuleType) => get(t).bestUse;
export const loraModules = (): LoraModuleType[] => Object.keys(DATA) as LoraModuleType[];

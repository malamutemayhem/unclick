export type BluetoothProfile =
  | "classic_spp"
  | "ble_gatt"
  | "ble_audio_lc3"
  | "mesh_flood"
  | "direction_aoa_aod";

const DATA: Record<BluetoothProfile, {
  throughput: number; powerDraw: number; range: number;
  latency: number; btCost: number; lowEnergy: boolean;
  forAudio: boolean; transport: string; bestUse: string;
}> = {
  classic_spp: {
    throughput: 7, powerDraw: 3, range: 5,
    latency: 4, btCost: 3, lowEnergy: false,
    forAudio: false, transport: "acl_rfcomm_serial",
    bestUse: "legacy_serial_bridge",
  },
  ble_gatt: {
    throughput: 4, powerDraw: 9, range: 4,
    latency: 6, btCost: 2, lowEnergy: true,
    forAudio: false, transport: "att_gatt_notify",
    bestUse: "fitness_band_sensor",
  },
  ble_audio_lc3: {
    throughput: 6, powerDraw: 8, range: 5,
    latency: 9, btCost: 5, lowEnergy: true,
    forAudio: true, transport: "iso_cis_bis_lc3",
    bestUse: "auracast_broadcast",
  },
  mesh_flood: {
    throughput: 3, powerDraw: 5, range: 8,
    latency: 3, btCost: 4, lowEnergy: true,
    forAudio: false, transport: "adv_bearer_relay",
    bestUse: "building_light_ctrl",
  },
  direction_aoa_aod: {
    throughput: 2, powerDraw: 7, range: 6,
    latency: 7, btCost: 6, lowEnergy: true,
    forAudio: false, transport: "cte_iq_sample",
    bestUse: "indoor_asset_tracking",
  },
};

const get = (t: BluetoothProfile) => DATA[t];

export const throughput = (t: BluetoothProfile) => get(t).throughput;
export const powerDraw = (t: BluetoothProfile) => get(t).powerDraw;
export const range = (t: BluetoothProfile) => get(t).range;
export const latency = (t: BluetoothProfile) => get(t).latency;
export const btCost = (t: BluetoothProfile) => get(t).btCost;
export const lowEnergy = (t: BluetoothProfile) => get(t).lowEnergy;
export const forAudio = (t: BluetoothProfile) => get(t).forAudio;
export const transport = (t: BluetoothProfile) => get(t).transport;
export const bestUse = (t: BluetoothProfile) => get(t).bestUse;
export const bluetoothProfiles = (): BluetoothProfile[] => Object.keys(DATA) as BluetoothProfile[];

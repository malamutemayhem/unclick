export type BluetoothVersion =
  | "classic_br_edr"
  | "ble_4_2"
  | "ble_5_0_long_range"
  | "ble_5_3_enhanced"
  | "le_audio_lc3";

const DATA: Record<BluetoothVersion, {
  throughput: number; range: number; powerEff: number;
  latency: number; btCost: number; meshCapable: boolean;
  forAudio: boolean; modulation: string; bestUse: string;
}> = {
  classic_br_edr: {
    throughput: 7, range: 6, powerEff: 3,
    latency: 5, btCost: 4, meshCapable: false,
    forAudio: true, modulation: "gfsk_edr_dpsk",
    bestUse: "headset_spp_streaming",
  },
  ble_4_2: {
    throughput: 3, range: 4, powerEff: 8,
    latency: 7, btCost: 2, meshCapable: true,
    forAudio: false, modulation: "gfsk_1mbps_le",
    bestUse: "fitness_band_beacon",
  },
  ble_5_0_long_range: {
    throughput: 4, range: 9, powerEff: 7,
    latency: 6, btCost: 3, meshCapable: true,
    forAudio: false, modulation: "coded_phy_125kbps",
    bestUse: "asset_tracker_warehouse",
  },
  ble_5_3_enhanced: {
    throughput: 5, range: 8, powerEff: 9,
    latency: 9, btCost: 4, meshCapable: true,
    forAudio: false, modulation: "iso_channels_periodic",
    bestUse: "smart_home_sensor_mesh",
  },
  le_audio_lc3: {
    throughput: 6, range: 7, powerEff: 8,
    latency: 8, btCost: 5, meshCapable: true,
    forAudio: true, modulation: "isochronous_lc3_codec",
    bestUse: "hearing_aid_multistream",
  },
};

const get = (t: BluetoothVersion) => DATA[t];

export const throughput = (t: BluetoothVersion) => get(t).throughput;
export const range = (t: BluetoothVersion) => get(t).range;
export const powerEff = (t: BluetoothVersion) => get(t).powerEff;
export const latency = (t: BluetoothVersion) => get(t).latency;
export const btCost = (t: BluetoothVersion) => get(t).btCost;
export const meshCapable = (t: BluetoothVersion) => get(t).meshCapable;
export const forAudio = (t: BluetoothVersion) => get(t).forAudio;
export const modulation = (t: BluetoothVersion) => get(t).modulation;
export const bestUse = (t: BluetoothVersion) => get(t).bestUse;
export const bluetoothVersions = (): BluetoothVersion[] => Object.keys(DATA) as BluetoothVersion[];

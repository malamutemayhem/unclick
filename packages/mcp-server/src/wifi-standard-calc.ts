export type WifiStandard =
  | "wifi_4_n_mimo"
  | "wifi_5_ac_wave2"
  | "wifi_6_ax_ofdma"
  | "wifi_6e_6ghz"
  | "wifi_7_be_mlo";

const DATA: Record<WifiStandard, {
  throughput: number; latency: number; range: number;
  density: number; wifiCost: number; multiLink: boolean;
  forEnterprise: boolean; modulation: string; bestUse: string;
}> = {
  wifi_4_n_mimo: {
    throughput: 3, latency: 4, range: 7,
    density: 3, wifiCost: 2, multiLink: false,
    forEnterprise: false, modulation: "ofdm_64qam_40mhz",
    bestUse: "legacy_iot_devices",
  },
  wifi_5_ac_wave2: {
    throughput: 6, latency: 5, range: 5,
    density: 5, wifiCost: 3, multiLink: false,
    forEnterprise: false, modulation: "ofdm_256qam_80mhz",
    bestUse: "home_media_streaming",
  },
  wifi_6_ax_ofdma: {
    throughput: 8, latency: 8, range: 7,
    density: 9, wifiCost: 5, multiLink: false,
    forEnterprise: true, modulation: "ofdma_1024qam_160mhz",
    bestUse: "stadium_high_density",
  },
  wifi_6e_6ghz: {
    throughput: 9, latency: 9, range: 4,
    density: 10, wifiCost: 7, multiLink: false,
    forEnterprise: true, modulation: "ofdma_1024qam_320mhz",
    bestUse: "ar_vr_low_latency",
  },
  wifi_7_be_mlo: {
    throughput: 10, latency: 10, range: 6,
    density: 10, wifiCost: 9, multiLink: true,
    forEnterprise: true, modulation: "ofdma_4096qam_320mhz",
    bestUse: "industrial_realtime_tsn",
  },
};

const get = (t: WifiStandard) => DATA[t];

export const throughput = (t: WifiStandard) => get(t).throughput;
export const latency = (t: WifiStandard) => get(t).latency;
export const range = (t: WifiStandard) => get(t).range;
export const density = (t: WifiStandard) => get(t).density;
export const wifiCost = (t: WifiStandard) => get(t).wifiCost;
export const multiLink = (t: WifiStandard) => get(t).multiLink;
export const forEnterprise = (t: WifiStandard) => get(t).forEnterprise;
export const modulation = (t: WifiStandard) => get(t).modulation;
export const bestUse = (t: WifiStandard) => get(t).bestUse;
export const wifiStandards = (): WifiStandard[] => Object.keys(DATA) as WifiStandard[];

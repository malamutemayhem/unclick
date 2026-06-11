export type SatelliteLink =
  | "l_band_mobile"
  | "c_band_vsat"
  | "ku_band_broadcast"
  | "ka_band_hts"
  | "v_band_ngso";

const DATA: Record<SatelliteLink, {
  bandwidth: number; rainFade: number; antennaSize: number;
  throughput: number; slkCost: number; mobile: boolean;
  forBroadband: boolean; frequency: string; bestUse: string;
}> = {
  l_band_mobile: {
    bandwidth: 2, rainFade: 10, antennaSize: 10,
    throughput: 2, slkCost: 4, mobile: true,
    forBroadband: false, frequency: "1_to_2_ghz_band",
    bestUse: "maritime_voice_low_rate_data",
  },
  c_band_vsat: {
    bandwidth: 5, rainFade: 9, antennaSize: 4,
    throughput: 5, slkCost: 3, mobile: false,
    forBroadband: false, frequency: "4_to_8_ghz_band",
    bestUse: "tropical_region_reliable_link",
  },
  ku_band_broadcast: {
    bandwidth: 7, rainFade: 6, antennaSize: 7,
    throughput: 7, slkCost: 2, mobile: false,
    forBroadband: true, frequency: "12_to_18_ghz_band",
    bestUse: "direct_to_home_tv_broadcast",
  },
  ka_band_hts: {
    bandwidth: 9, rainFade: 4, antennaSize: 8,
    throughput: 10, slkCost: 3, mobile: false,
    forBroadband: true, frequency: "26_to_40_ghz_band",
    bestUse: "high_throughput_internet_access",
  },
  v_band_ngso: {
    bandwidth: 10, rainFade: 2, antennaSize: 9,
    throughput: 9, slkCost: 5, mobile: false,
    forBroadband: true, frequency: "40_to_75_ghz_band",
    bestUse: "leo_constellation_feeder_link",
  },
};

const get = (t: SatelliteLink) => DATA[t];

export const bandwidth = (t: SatelliteLink) => get(t).bandwidth;
export const rainFade = (t: SatelliteLink) => get(t).rainFade;
export const antennaSize = (t: SatelliteLink) => get(t).antennaSize;
export const throughput = (t: SatelliteLink) => get(t).throughput;
export const slkCost = (t: SatelliteLink) => get(t).slkCost;
export const mobile = (t: SatelliteLink) => get(t).mobile;
export const forBroadband = (t: SatelliteLink) => get(t).forBroadband;
export const frequency = (t: SatelliteLink) => get(t).frequency;
export const bestUse = (t: SatelliteLink) => get(t).bestUse;
export const satelliteLinks = (): SatelliteLink[] => Object.keys(DATA) as SatelliteLink[];

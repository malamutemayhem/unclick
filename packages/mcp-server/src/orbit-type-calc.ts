export type OrbitType =
  | "leo_circular_low"
  | "meo_medium_nav"
  | "geo_geostationary"
  | "heo_molniya_elliptic"
  | "sso_sun_synchronous";

const DATA: Record<OrbitType, {
  altitude: number; coverage: number; latency: number;
  stationKeeping: number; otCost: number; polar: boolean;
  forComm: boolean; period: string; bestUse: string;
}> = {
  leo_circular_low: {
    altitude: 2, coverage: 4, latency: 10,
    stationKeeping: 3, otCost: 1, polar: false,
    forComm: true, period: "90_min_circular_orbit",
    bestUse: "broadband_mega_constellation",
  },
  meo_medium_nav: {
    altitude: 5, coverage: 7, latency: 7,
    stationKeeping: 5, otCost: 3, polar: false,
    forComm: true, period: "12_hr_semi_synchronous",
    bestUse: "navigation_gnss_constellation",
  },
  geo_geostationary: {
    altitude: 10, coverage: 10, latency: 3,
    stationKeeping: 7, otCost: 5, polar: false,
    forComm: true, period: "24_hr_equatorial_fixed",
    bestUse: "broadcast_television_relay",
  },
  heo_molniya_elliptic: {
    altitude: 8, coverage: 8, latency: 5,
    stationKeeping: 8, otCost: 4, polar: true,
    forComm: true, period: "12_hr_high_inclination",
    bestUse: "arctic_coverage_comm_relay",
  },
  sso_sun_synchronous: {
    altitude: 3, coverage: 6, latency: 9,
    stationKeeping: 4, otCost: 2, polar: true,
    forComm: false, period: "98_min_polar_precessing",
    bestUse: "earth_observation_imaging",
  },
};

const get = (t: OrbitType) => DATA[t];

export const altitude = (t: OrbitType) => get(t).altitude;
export const coverage = (t: OrbitType) => get(t).coverage;
export const latency = (t: OrbitType) => get(t).latency;
export const stationKeeping = (t: OrbitType) => get(t).stationKeeping;
export const otCost = (t: OrbitType) => get(t).otCost;
export const polar = (t: OrbitType) => get(t).polar;
export const forComm = (t: OrbitType) => get(t).forComm;
export const period = (t: OrbitType) => get(t).period;
export const bestUse = (t: OrbitType) => get(t).bestUse;
export const orbitTypes = (): OrbitType[] => Object.keys(DATA) as OrbitType[];

export type FiberMode =
  | "smf_single_mode"
  | "mmf_om3_multimode"
  | "mmf_om5_wideband"
  | "pmf_polarization"
  | "hollow_core_photonic";

const DATA: Record<FiberMode, {
  bandwidth: number; reach: number; cost: number;
  alignment: number; fmCost: number; bendInsensitive: boolean;
  forDatacenter: boolean; coreType: string; bestUse: string;
}> = {
  smf_single_mode: {
    bandwidth: 10, reach: 10, cost: 6,
    alignment: 4, fmCost: 5, bendInsensitive: false,
    forDatacenter: true, coreType: "9um_glass_step_index",
    bestUse: "long_haul_telecom",
  },
  mmf_om3_multimode: {
    bandwidth: 6, reach: 4, cost: 8,
    alignment: 8, fmCost: 3, bendInsensitive: true,
    forDatacenter: true, coreType: "50um_graded_index",
    bestUse: "short_reach_ethernet",
  },
  mmf_om5_wideband: {
    bandwidth: 8, reach: 5, cost: 7,
    alignment: 7, fmCost: 4, bendInsensitive: true,
    forDatacenter: true, coreType: "50um_swdm_optimized",
    bestUse: "400g_parallel_swdm",
  },
  pmf_polarization: {
    bandwidth: 9, reach: 8, cost: 4,
    alignment: 3, fmCost: 8, bendInsensitive: false,
    forDatacenter: false, coreType: "elliptical_stress_rod",
    bestUse: "coherent_sensing_gyro",
  },
  hollow_core_photonic: {
    bandwidth: 10, reach: 6, cost: 3,
    alignment: 5, fmCost: 9, bendInsensitive: false,
    forDatacenter: false, coreType: "air_core_photonic_bandgap",
    bestUse: "ultralow_latency_trading",
  },
};

const get = (t: FiberMode) => DATA[t];

export const bandwidth = (t: FiberMode) => get(t).bandwidth;
export const reach = (t: FiberMode) => get(t).reach;
export const cost = (t: FiberMode) => get(t).cost;
export const alignment = (t: FiberMode) => get(t).alignment;
export const fmCost = (t: FiberMode) => get(t).fmCost;
export const bendInsensitive = (t: FiberMode) => get(t).bendInsensitive;
export const forDatacenter = (t: FiberMode) => get(t).forDatacenter;
export const coreType = (t: FiberMode) => get(t).coreType;
export const bestUse = (t: FiberMode) => get(t).bestUse;
export const fiberModes = (): FiberMode[] => Object.keys(DATA) as FiberMode[];

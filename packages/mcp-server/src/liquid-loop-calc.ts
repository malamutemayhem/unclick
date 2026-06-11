export type LiquidLoop =
  | "cpu_aio_closed"
  | "custom_open_loop"
  | "micro_channel_direct"
  | "jet_impingement"
  | "dielectric_spray";

const DATA: Record<LiquidLoop, {
  thermalRes: number; flowRate: number; maintenance: number;
  noise: number; loopCost: number; leakProof: boolean;
  forDatacenter: boolean; medium: string; bestUse: string;
}> = {
  cpu_aio_closed: {
    thermalRes: 6, flowRate: 5, maintenance: 10,
    noise: 7, loopCost: 3, leakProof: true,
    forDatacenter: false, medium: "propylene_glycol_sealed",
    bestUse: "desktop_enthusiast_cpu",
  },
  custom_open_loop: {
    thermalRes: 8, flowRate: 8, maintenance: 3,
    noise: 8, loopCost: 7, leakProof: false,
    forDatacenter: false, medium: "distilled_water_biocide",
    bestUse: "overclocked_multi_gpu_rig",
  },
  micro_channel_direct: {
    thermalRes: 10, flowRate: 6, maintenance: 7,
    noise: 6, loopCost: 8, leakProof: true,
    forDatacenter: true, medium: "deionized_water_direct_die",
    bestUse: "gpu_hpc_rack_direct_cool",
  },
  jet_impingement: {
    thermalRes: 10, flowRate: 9, maintenance: 5,
    noise: 4, loopCost: 9, leakProof: true,
    forDatacenter: true, medium: "high_velocity_nozzle_array",
    bestUse: "extreme_tdp_ai_accelerator",
  },
  dielectric_spray: {
    thermalRes: 9, flowRate: 7, maintenance: 6,
    noise: 9, loopCost: 10, leakProof: true,
    forDatacenter: true, medium: "fluorocarbon_two_phase",
    bestUse: "immersion_server_tray",
  },
};

const get = (t: LiquidLoop) => DATA[t];

export const thermalRes = (t: LiquidLoop) => get(t).thermalRes;
export const flowRate = (t: LiquidLoop) => get(t).flowRate;
export const maintenance = (t: LiquidLoop) => get(t).maintenance;
export const noise = (t: LiquidLoop) => get(t).noise;
export const loopCost = (t: LiquidLoop) => get(t).loopCost;
export const leakProof = (t: LiquidLoop) => get(t).leakProof;
export const forDatacenter = (t: LiquidLoop) => get(t).forDatacenter;
export const medium = (t: LiquidLoop) => get(t).medium;
export const bestUse = (t: LiquidLoop) => get(t).bestUse;
export const liquidLoops = (): LiquidLoop[] => Object.keys(DATA) as LiquidLoop[];

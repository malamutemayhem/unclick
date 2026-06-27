export type MramType =
  | "stt_mram"
  | "sot_mram"
  | "vcma_mram"
  | "toggle_mram"
  | "embedded_emram";

const DATA: Record<MramType, {
  endurance: number; speed: number; retention: number;
  density: number; mramCost: number; nonVolatile: boolean;
  forCache: boolean; switching: string; bestUse: string;
}> = {
  stt_mram: {
    endurance: 8, speed: 8, retention: 9,
    density: 8, mramCost: 6, nonVolatile: true,
    forCache: true, switching: "spin_transfer_torque",
    bestUse: "l2_cache_replacement",
  },
  sot_mram: {
    endurance: 9, speed: 9, retention: 8,
    density: 7, mramCost: 8, nonVolatile: true,
    forCache: true, switching: "spin_orbit_torque",
    bestUse: "ultra_fast_sram_alt",
  },
  vcma_mram: {
    endurance: 7, speed: 7, retention: 7,
    density: 9, mramCost: 7, nonVolatile: true,
    forCache: false, switching: "voltage_anisotropy",
    bestUse: "low_power_iot_nvm",
  },
  toggle_mram: {
    endurance: 10, speed: 6, retention: 10,
    density: 5, mramCost: 5, nonVolatile: true,
    forCache: false, switching: "field_toggle_savtchenko",
    bestUse: "industrial_nvram_log",
  },
  embedded_emram: {
    endurance: 8, speed: 8, retention: 9,
    density: 8, mramCost: 7, nonVolatile: true,
    forCache: true, switching: "perpendicular_stt_cmos",
    bestUse: "mcu_code_flash_replace",
  },
};

const get = (t: MramType) => DATA[t];

export const endurance = (t: MramType) => get(t).endurance;
export const speed = (t: MramType) => get(t).speed;
export const retention = (t: MramType) => get(t).retention;
export const density = (t: MramType) => get(t).density;
export const mramCost = (t: MramType) => get(t).mramCost;
export const nonVolatile = (t: MramType) => get(t).nonVolatile;
export const forCache = (t: MramType) => get(t).forCache;
export const switching = (t: MramType) => get(t).switching;
export const bestUse = (t: MramType) => get(t).bestUse;
export const mramTypes = (): MramType[] => Object.keys(DATA) as MramType[];

export type Thermoelectric =
  | "bismuth_telluride"
  | "lead_telluride"
  | "silicon_germanium"
  | "half_heusler"
  | "skutterudite";

const DATA: Record<Thermoelectric, {
  zt: number; tempRange: number; efficiency: number;
  durability: number; teCost: number; toxicFree: boolean;
  forWaste: boolean; material: string; bestUse: string;
}> = {
  bismuth_telluride: {
    zt: 8, tempRange: 4, efficiency: 8,
    durability: 7, teCost: 5, toxicFree: false,
    forWaste: false, material: "bi2te3_p_n_couple",
    bestUse: "peltier_cpu_cooler",
  },
  lead_telluride: {
    zt: 7, tempRange: 7, efficiency: 7,
    durability: 6, teCost: 6, toxicFree: false,
    forWaste: true, material: "pbte_mid_temp",
    bestUse: "exhaust_waste_heat",
  },
  silicon_germanium: {
    zt: 5, tempRange: 10, efficiency: 5,
    durability: 9, teCost: 8, toxicFree: true,
    forWaste: false, material: "sige_high_temp",
    bestUse: "rtg_space_probe",
  },
  half_heusler: {
    zt: 6, tempRange: 8, efficiency: 6,
    durability: 8, teCost: 7, toxicFree: true,
    forWaste: true, material: "tinisn_alloy",
    bestUse: "industrial_furnace_gen",
  },
  skutterudite: {
    zt: 9, tempRange: 6, efficiency: 9,
    durability: 5, teCost: 9, toxicFree: false,
    forWaste: true, material: "cosb3_filled_cage",
    bestUse: "automotive_teg_exhaust",
  },
};

const get = (t: Thermoelectric) => DATA[t];

export const zt = (t: Thermoelectric) => get(t).zt;
export const tempRange = (t: Thermoelectric) => get(t).tempRange;
export const efficiency = (t: Thermoelectric) => get(t).efficiency;
export const durability = (t: Thermoelectric) => get(t).durability;
export const teCost = (t: Thermoelectric) => get(t).teCost;
export const toxicFree = (t: Thermoelectric) => get(t).toxicFree;
export const forWaste = (t: Thermoelectric) => get(t).forWaste;
export const material = (t: Thermoelectric) => get(t).material;
export const bestUse = (t: Thermoelectric) => get(t).bestUse;
export const thermoelectrics = (): Thermoelectric[] => Object.keys(DATA) as Thermoelectric[];

export type Supercap =
  | "edlc_carbon"
  | "pseudo_cap_metal_oxide"
  | "hybrid_lithium_ion"
  | "graphene_ultrathin"
  | "polymer_conducting";

const DATA: Record<Supercap, {
  energyDensity: number; powerDensity: number; cycleLife: number;
  leakage: number; capCost: number; highTemp: boolean;
  forBackup: boolean; electrode: string; bestUse: string;
}> = {
  edlc_carbon: {
    energyDensity: 5, powerDensity: 8, cycleLife: 10,
    leakage: 5, capCost: 4, highTemp: false,
    forBackup: true, electrode: "activated_carbon_symm",
    bestUse: "ups_bridge_power",
  },
  pseudo_cap_metal_oxide: {
    energyDensity: 7, powerDensity: 7, cycleLife: 7,
    leakage: 6, capCost: 6, highTemp: true,
    forBackup: false, electrode: "ruo2_mno2_redox",
    bestUse: "regenerative_braking",
  },
  hybrid_lithium_ion: {
    energyDensity: 9, powerDensity: 6, cycleLife: 6,
    leakage: 8, capCost: 8, highTemp: false,
    forBackup: true, electrode: "li_ion_intercalation",
    bestUse: "smart_meter_backup",
  },
  graphene_ultrathin: {
    energyDensity: 8, powerDensity: 10, cycleLife: 9,
    leakage: 7, capCost: 9, highTemp: false,
    forBackup: false, electrode: "graphene_nanosheet",
    bestUse: "wearable_pulse_power",
  },
  polymer_conducting: {
    energyDensity: 6, powerDensity: 7, cycleLife: 5,
    leakage: 4, capCost: 5, highTemp: false,
    forBackup: false, electrode: "pani_pedot_film",
    bestUse: "flexible_sensor_patch",
  },
};

const get = (t: Supercap) => DATA[t];

export const energyDensity = (t: Supercap) => get(t).energyDensity;
export const powerDensity = (t: Supercap) => get(t).powerDensity;
export const cycleLife = (t: Supercap) => get(t).cycleLife;
export const leakage = (t: Supercap) => get(t).leakage;
export const capCost = (t: Supercap) => get(t).capCost;
export const highTemp = (t: Supercap) => get(t).highTemp;
export const forBackup = (t: Supercap) => get(t).forBackup;
export const electrode = (t: Supercap) => get(t).electrode;
export const bestUse = (t: Supercap) => get(t).bestUse;
export const supercaps = (): Supercap[] => Object.keys(DATA) as Supercap[];

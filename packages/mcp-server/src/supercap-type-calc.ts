export type SupercapType =
  | "edlc_carbon"
  | "pseudocap_metal_oxide"
  | "hybrid_lithium_ion"
  | "graphene_aerogel"
  | "polymer_conducting";

const DATA: Record<SupercapType, {
  energyDensity: number; powerDensity: number; cycleLife: number;
  selfDischarge: number; scCost: number; aqueous: boolean;
  forBackup: boolean; electrode: string; bestUse: string;
}> = {
  edlc_carbon: {
    energyDensity: 5, powerDensity: 9, cycleLife: 10,
    selfDischarge: 5, scCost: 3, aqueous: false,
    forBackup: true, electrode: "activated_carbon_pair",
    bestUse: "regenerative_brake_buffer",
  },
  pseudocap_metal_oxide: {
    energyDensity: 7, powerDensity: 7, cycleLife: 7,
    selfDischarge: 6, scCost: 5, aqueous: true,
    forBackup: false, electrode: "ruthenium_oxide_film",
    bestUse: "micro_energy_storage",
  },
  hybrid_lithium_ion: {
    energyDensity: 9, powerDensity: 6, cycleLife: 6,
    selfDischarge: 8, scCost: 7, aqueous: false,
    forBackup: true, electrode: "graphite_plus_ac_asym",
    bestUse: "ups_holdup_power",
  },
  graphene_aerogel: {
    energyDensity: 8, powerDensity: 10, cycleLife: 9,
    selfDischarge: 7, scCost: 9, aqueous: false,
    forBackup: false, electrode: "3d_graphene_foam",
    bestUse: "fast_charge_wearable",
  },
  polymer_conducting: {
    energyDensity: 6, powerDensity: 8, cycleLife: 5,
    selfDischarge: 4, scCost: 4, aqueous: true,
    forBackup: false, electrode: "polyaniline_ppy_layer",
    bestUse: "flexible_printed_storage",
  },
};

const get = (t: SupercapType) => DATA[t];

export const energyDensity = (t: SupercapType) => get(t).energyDensity;
export const powerDensity = (t: SupercapType) => get(t).powerDensity;
export const cycleLife = (t: SupercapType) => get(t).cycleLife;
export const selfDischarge = (t: SupercapType) => get(t).selfDischarge;
export const scCost = (t: SupercapType) => get(t).scCost;
export const aqueous = (t: SupercapType) => get(t).aqueous;
export const forBackup = (t: SupercapType) => get(t).forBackup;
export const electrode = (t: SupercapType) => get(t).electrode;
export const bestUse = (t: SupercapType) => get(t).bestUse;
export const supercapTypes = (): SupercapType[] => Object.keys(DATA) as SupercapType[];

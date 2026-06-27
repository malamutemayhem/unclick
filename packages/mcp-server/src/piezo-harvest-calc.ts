export type PiezoHarvest =
  | "pzt_cantilever"
  | "pvdf_film_flex"
  | "aln_thin_film"
  | "stack_actuator_d33"
  | "cymbal_amplified";

const DATA: Record<PiezoHarvest, {
  powerDensity: number; bandwidth: number; efficiency: number;
  durability: number; phCost: number; leadFree: boolean;
  forWearable: boolean; material: string; bestUse: string;
}> = {
  pzt_cantilever: {
    powerDensity: 8, bandwidth: 5, efficiency: 7,
    durability: 7, phCost: 4, leadFree: false,
    forWearable: false, material: "lead_zirconate_titanate",
    bestUse: "industrial_vibration_monitor",
  },
  pvdf_film_flex: {
    powerDensity: 4, bandwidth: 9, efficiency: 4,
    durability: 9, phCost: 3, leadFree: true,
    forWearable: true, material: "polyvinylidene_fluoride",
    bestUse: "shoe_insert_step_power",
  },
  aln_thin_film: {
    powerDensity: 5, bandwidth: 8, efficiency: 6,
    durability: 8, phCost: 6, leadFree: true,
    forWearable: true, material: "aluminum_nitride_sputter",
    bestUse: "mems_integrated_harvest",
  },
  stack_actuator_d33: {
    powerDensity: 10, bandwidth: 3, efficiency: 8,
    durability: 6, phCost: 7, leadFree: false,
    forWearable: false, material: "multilayer_pzt_stack",
    bestUse: "high_force_press_scavenge",
  },
  cymbal_amplified: {
    powerDensity: 9, bandwidth: 4, efficiency: 7,
    durability: 5, phCost: 5, leadFree: false,
    forWearable: false, material: "pzt_metal_endcap_pair",
    bestUse: "underwater_acoustic_power",
  },
};

const get = (t: PiezoHarvest) => DATA[t];

export const powerDensity = (t: PiezoHarvest) => get(t).powerDensity;
export const bandwidth = (t: PiezoHarvest) => get(t).bandwidth;
export const efficiency = (t: PiezoHarvest) => get(t).efficiency;
export const durability = (t: PiezoHarvest) => get(t).durability;
export const phCost = (t: PiezoHarvest) => get(t).phCost;
export const leadFree = (t: PiezoHarvest) => get(t).leadFree;
export const forWearable = (t: PiezoHarvest) => get(t).forWearable;
export const material = (t: PiezoHarvest) => get(t).material;
export const bestUse = (t: PiezoHarvest) => get(t).bestUse;
export const piezoHarvests = (): PiezoHarvest[] => Object.keys(DATA) as PiezoHarvest[];

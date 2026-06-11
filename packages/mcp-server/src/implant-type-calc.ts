export type ImplantType =
  | "high_energy_deep"
  | "medium_current_well"
  | "high_current_sd"
  | "ultra_low_energy"
  | "cluster_molecular";

const DATA: Record<ImplantType, {
  energy: number; dose: number; uniformity: number;
  throughput: number; impCost: number; channelFree: boolean;
  forHalo: boolean; species: string; bestUse: string;
}> = {
  high_energy_deep: {
    energy: 10, dose: 5, uniformity: 7,
    throughput: 5, impCost: 7, channelFree: false,
    forHalo: false, species: "phosphorus_boron_mev",
    bestUse: "retrograde_deep_well",
  },
  medium_current_well: {
    energy: 6, dose: 6, uniformity: 8,
    throughput: 7, impCost: 4, channelFree: false,
    forHalo: true, species: "boron_bf2_arsenic",
    bestUse: "twin_well_threshold_adj",
  },
  high_current_sd: {
    energy: 4, dose: 10, uniformity: 8,
    throughput: 8, impCost: 5, channelFree: false,
    forHalo: false, species: "arsenic_phosphorus_high",
    bestUse: "source_drain_extension",
  },
  ultra_low_energy: {
    energy: 2, dose: 7, uniformity: 7,
    throughput: 6, impCost: 6, channelFree: true,
    forHalo: false, species: "boron_germanium_preamoph",
    bestUse: "usj_finfet_junction",
  },
  cluster_molecular: {
    energy: 3, dose: 9, uniformity: 6,
    throughput: 4, impCost: 8, channelFree: true,
    forHalo: false, species: "decaborane_octadecaborane",
    bestUse: "shallow_conformal_3d",
  },
};

const get = (t: ImplantType) => DATA[t];

export const energy = (t: ImplantType) => get(t).energy;
export const dose = (t: ImplantType) => get(t).dose;
export const uniformity = (t: ImplantType) => get(t).uniformity;
export const throughput = (t: ImplantType) => get(t).throughput;
export const impCost = (t: ImplantType) => get(t).impCost;
export const channelFree = (t: ImplantType) => get(t).channelFree;
export const forHalo = (t: ImplantType) => get(t).forHalo;
export const species = (t: ImplantType) => get(t).species;
export const bestUse = (t: ImplantType) => get(t).bestUse;
export const implantTypes = (): ImplantType[] => Object.keys(DATA) as ImplantType[];

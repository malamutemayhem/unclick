export type PlasmaAsherType =
  | "barrel_asher"
  | "downstream_asher"
  | "rie_asher"
  | "microwave_asher"
  | "uv_ozone_asher";

interface PlasmaAsherData {
  ashRate: number;
  throughput: number;
  selectivity: number;
  residueFree: number;
  paCost: number;
  isotropic: boolean;
  forLowK: boolean;
  asherConfig: string;
  bestUse: string;
}

const DATA: Record<PlasmaAsherType, PlasmaAsherData> = {
  barrel_asher: {
    ashRate: 7, throughput: 8, selectivity: 6, residueFree: 6, paCost: 4,
    isotropic: true, forLowK: false,
    asherConfig: "barrel_plasma_asher_batch_rf_oxygen_resist_strip_isotropic",
    bestUse: "batch_resist_strip_barrel_plasma_asher_simple_rf_oxygen",
  },
  downstream_asher: {
    ashRate: 9, throughput: 7, selectivity: 9, residueFree: 9, paCost: 8,
    isotropic: true, forLowK: true,
    asherConfig: "downstream_plasma_asher_remote_source_gentle_strip_low_damage",
    bestUse: "advanced_node_downstream_asher_low_damage_resist_strip_gentle",
  },
  rie_asher: {
    ashRate: 8, throughput: 6, selectivity: 7, residueFree: 7, paCost: 7,
    isotropic: false, forLowK: false,
    asherConfig: "rie_plasma_asher_reactive_ion_etch_directional_strip_clean",
    bestUse: "directional_strip_rie_plasma_asher_anisotropic_clean_surface",
  },
  microwave_asher: {
    ashRate: 10, throughput: 8, selectivity: 10, residueFree: 10, paCost: 10,
    isotropic: true, forLowK: true,
    asherConfig: "microwave_plasma_asher_ecr_high_density_fast_strip_uniform",
    bestUse: "high_volume_microwave_plasma_asher_fast_uniform_gentle_strip",
  },
  uv_ozone_asher: {
    ashRate: 5, throughput: 4, selectivity: 8, residueFree: 8, paCost: 3,
    isotropic: true, forLowK: false,
    asherConfig: "uv_ozone_asher_photochemical_clean_organic_residue_surface",
    bestUse: "surface_clean_uv_ozone_asher_organic_residue_photochemical",
  },
};

function get(t: PlasmaAsherType): PlasmaAsherData {
  return DATA[t];
}

export const ashRate = (t: PlasmaAsherType) => get(t).ashRate;
export const throughput = (t: PlasmaAsherType) => get(t).throughput;
export const selectivity = (t: PlasmaAsherType) => get(t).selectivity;
export const residueFree = (t: PlasmaAsherType) => get(t).residueFree;
export const paCost = (t: PlasmaAsherType) => get(t).paCost;
export const isotropic = (t: PlasmaAsherType) => get(t).isotropic;
export const forLowK = (t: PlasmaAsherType) => get(t).forLowK;
export const asherConfig = (t: PlasmaAsherType) => get(t).asherConfig;
export const bestUse = (t: PlasmaAsherType) => get(t).bestUse;
export const plasmaAsherTypes = (): PlasmaAsherType[] =>
  Object.keys(DATA) as PlasmaAsherType[];

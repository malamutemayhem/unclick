export type PlasmaEtchType =
  | "rie_etch"
  | "icp_etch"
  | "barrel_ash"
  | "downstream_etch"
  | "ecr_etch";

interface PlasmaEtchData {
  etchRate: number;
  throughput: number;
  selectivity: number;
  anisotropy: number;
  peCost: number;
  lowDamage: boolean;
  forDeep: boolean;
  etchConfig: string;
  bestUse: string;
}

const DATA: Record<PlasmaEtchType, PlasmaEtchData> = {
  rie_etch: {
    etchRate: 7, throughput: 7, selectivity: 7, anisotropy: 8, peCost: 5,
    lowDamage: false, forDeep: false,
    etchConfig: "rie_reactive_ion_etch_parallel_plate_capacitive_anisotropic",
    bestUse: "pattern_transfer_rie_parallel_plate_anisotropic_dielectric_etch",
  },
  icp_etch: {
    etchRate: 9, throughput: 8, selectivity: 9, anisotropy: 10, peCost: 8,
    lowDamage: false, forDeep: true,
    etchConfig: "icp_inductively_coupled_plasma_high_density_deep_silicon_etch",
    bestUse: "deep_si_etch_icp_bosch_process_high_aspect_ratio_mems_via",
  },
  barrel_ash: {
    etchRate: 6, throughput: 9, selectivity: 5, anisotropy: 3, peCost: 3,
    lowDamage: true, forDeep: false,
    etchConfig: "barrel_asher_isotropic_resist_strip_batch_process_low_damage",
    bestUse: "photoresist_strip_barrel_asher_batch_isotropic_low_cost_clean",
  },
  downstream_etch: {
    etchRate: 8, throughput: 8, selectivity: 8, anisotropy: 4, peCost: 6,
    lowDamage: true, forDeep: false,
    etchConfig: "downstream_plasma_etch_remote_source_chemical_no_ion_bombard",
    bestUse: "damage_free_etch_downstream_remote_plasma_sensitive_device_clean",
  },
  ecr_etch: {
    etchRate: 10, throughput: 6, selectivity: 9, anisotropy: 9, peCost: 9,
    lowDamage: false, forDeep: true,
    etchConfig: "ecr_electron_cyclotron_resonance_etch_microwave_high_density",
    bestUse: "compound_semi_ecr_etch_high_density_low_pressure_gaas_inp_etch",
  },
};

function get(t: PlasmaEtchType): PlasmaEtchData {
  return DATA[t];
}

export const etchRate = (t: PlasmaEtchType) => get(t).etchRate;
export const throughput = (t: PlasmaEtchType) => get(t).throughput;
export const selectivity = (t: PlasmaEtchType) => get(t).selectivity;
export const anisotropy = (t: PlasmaEtchType) => get(t).anisotropy;
export const peCost = (t: PlasmaEtchType) => get(t).peCost;
export const lowDamage = (t: PlasmaEtchType) => get(t).lowDamage;
export const forDeep = (t: PlasmaEtchType) => get(t).forDeep;
export const etchConfig = (t: PlasmaEtchType) => get(t).etchConfig;
export const bestUse = (t: PlasmaEtchType) => get(t).bestUse;
export const plasmaEtchTypes = (): PlasmaEtchType[] =>
  Object.keys(DATA) as PlasmaEtchType[];

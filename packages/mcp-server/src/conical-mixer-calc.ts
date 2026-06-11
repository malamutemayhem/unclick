export type ConicalMixerType =
  | "nauta_orbit"
  | "vertical_ribbon"
  | "planetary_cone"
  | "vacuum_cone_dry"
  | "heated_cone_react";

interface ConicalMixerData {
  blendQuality: number;
  throughput: number;
  deadZoneFree: number;
  scalability: number;
  cnCost: number;
  orbitScrew: boolean;
  forFragile: boolean;
  mixerConfig: string;
  bestUse: string;
}

const DATA: Record<ConicalMixerType, ConicalMixerData> = {
  nauta_orbit: {
    blendQuality: 9, throughput: 7, deadZoneFree: 9, scalability: 8, cnCost: 7,
    orbitScrew: true, forFragile: true,
    mixerConfig: "nauta_orbit_conical_mixer_screw_orbit_wall_gentle_top_bottom_mix",
    bestUse: "pharma_blend_nauta_orbit_conical_mixer_gentle_screw_no_dead_zone",
  },
  vertical_ribbon: {
    blendQuality: 8, throughput: 8, deadZoneFree: 7, scalability: 7, cnCost: 6,
    orbitScrew: false, forFragile: false,
    mixerConfig: "vertical_ribbon_conical_mixer_helical_ribbon_sweep_wall_upward",
    bestUse: "chemical_powder_vertical_ribbon_conical_mixer_sweep_wall_blend",
  },
  planetary_cone: {
    blendQuality: 9, throughput: 6, deadZoneFree: 10, scalability: 6, cnCost: 9,
    orbitScrew: true, forFragile: true,
    mixerConfig: "planetary_cone_conical_mixer_dual_screw_orbit_independent_drive",
    bestUse: "high_value_planetary_cone_conical_mixer_dual_orbit_total_blend",
  },
  vacuum_cone_dry: {
    blendQuality: 8, throughput: 5, deadZoneFree: 8, scalability: 7, cnCost: 8,
    orbitScrew: true, forFragile: true,
    mixerConfig: "vacuum_cone_dry_conical_mixer_sealed_low_pressure_gentle_evap",
    bestUse: "api_dry_vacuum_cone_dry_conical_mixer_gentle_solvent_remove_blend",
  },
  heated_cone_react: {
    blendQuality: 7, throughput: 5, deadZoneFree: 8, scalability: 6, cnCost: 8,
    orbitScrew: true, forFragile: false,
    mixerConfig: "heated_cone_react_conical_mixer_jacket_heat_react_blend_process",
    bestUse: "polymer_react_heated_cone_react_conical_mixer_jacket_thermal_mix",
  },
};

function get(t: ConicalMixerType): ConicalMixerData {
  return DATA[t];
}

export const blendQuality = (t: ConicalMixerType) => get(t).blendQuality;
export const throughput = (t: ConicalMixerType) => get(t).throughput;
export const deadZoneFree = (t: ConicalMixerType) => get(t).deadZoneFree;
export const scalability = (t: ConicalMixerType) => get(t).scalability;
export const cnCost = (t: ConicalMixerType) => get(t).cnCost;
export const orbitScrew = (t: ConicalMixerType) => get(t).orbitScrew;
export const forFragile = (t: ConicalMixerType) => get(t).forFragile;
export const mixerConfig = (t: ConicalMixerType) => get(t).mixerConfig;
export const bestUse = (t: ConicalMixerType) => get(t).bestUse;
export const conicalMixerTypes = (): ConicalMixerType[] =>
  Object.keys(DATA) as ConicalMixerType[];

export type AirSamplerType =
  | "high_volume_tsp_filter"
  | "impinger_bubbler_liquid"
  | "passive_diffusion_badge"
  | "cascade_impactor_size"
  | "canister_whole_air_grab";

const DATA: Record<AirSamplerType, {
  flowRate: number; sensitivity: number; selectivity: number;
  portability: number; asCost: number; powered: boolean;
  forParticulate: boolean; collection: string; bestUse: string;
}> = {
  high_volume_tsp_filter: {
    flowRate: 10, sensitivity: 7, selectivity: 4,
    portability: 3, asCost: 3, powered: true,
    forParticulate: true, collection: "glass_fiber_filter_high_flow",
    bestUse: "ambient_pm10_tsp_regulatory",
  },
  impinger_bubbler_liquid: {
    flowRate: 5, sensitivity: 8, selectivity: 8,
    portability: 5, asCost: 2, powered: true,
    forParticulate: false, collection: "liquid_absorb_midget_impinger",
    bestUse: "workplace_acid_gas_aldehyde",
  },
  passive_diffusion_badge: {
    flowRate: 1, sensitivity: 5, selectivity: 6,
    portability: 10, asCost: 1, powered: false,
    forParticulate: false, collection: "sorbent_badge_diffusion",
    bestUse: "personal_exposure_voc_twa_8hr",
  },
  cascade_impactor_size: {
    flowRate: 6, sensitivity: 9, selectivity: 10,
    portability: 4, asCost: 4, powered: true,
    forParticulate: true, collection: "multi_stage_inertial_plate",
    bestUse: "pharma_cleanroom_particle_dist",
  },
  canister_whole_air_grab: {
    flowRate: 3, sensitivity: 10, selectivity: 3,
    portability: 7, asCost: 4, powered: false,
    forParticulate: false, collection: "summa_canister_passivated",
    bestUse: "epa_to15_voc_ambient_survey",
  },
};

const get = (t: AirSamplerType) => DATA[t];

export const flowRate = (t: AirSamplerType) => get(t).flowRate;
export const sensitivity = (t: AirSamplerType) => get(t).sensitivity;
export const selectivity = (t: AirSamplerType) => get(t).selectivity;
export const portability = (t: AirSamplerType) => get(t).portability;
export const asCost = (t: AirSamplerType) => get(t).asCost;
export const powered = (t: AirSamplerType) => get(t).powered;
export const forParticulate = (t: AirSamplerType) => get(t).forParticulate;
export const collection = (t: AirSamplerType) => get(t).collection;
export const bestUse = (t: AirSamplerType) => get(t).bestUse;
export const airSamplerTypes = (): AirSamplerType[] => Object.keys(DATA) as AirSamplerType[];

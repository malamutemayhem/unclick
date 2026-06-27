export type RfPropagationType =
  | "line_of_sight_direct"
  | "ground_wave_surface"
  | "skywave_ionospheric_hop"
  | "troposcatter_diffusion"
  | "ducting_atmospheric_layer";

const DATA: Record<RfPropagationType, {
  range: number; reliability: number; bandwidth: number;
  latency: number; rpCost: number; beyondHorizon: boolean;
  forMobile: boolean; mechanism: string; bestUse: string;
}> = {
  line_of_sight_direct: {
    range: 4, reliability: 10, bandwidth: 10,
    latency: 10, rpCost: 2, beyondHorizon: false,
    forMobile: true, mechanism: "direct_ray_fresnel_clearance",
    bestUse: "microwave_link_cell_tower_wifi",
  },
  ground_wave_surface: {
    range: 6, reliability: 8, bandwidth: 3,
    latency: 8, rpCost: 3, beyondHorizon: true,
    forMobile: false, mechanism: "surface_diffraction_earth_curve",
    bestUse: "am_broadcast_maritime_navigation",
  },
  skywave_ionospheric_hop: {
    range: 10, reliability: 4, bandwidth: 2,
    latency: 5, rpCost: 2, beyondHorizon: true,
    forMobile: false, mechanism: "ionosphere_f_layer_refraction",
    bestUse: "hf_radio_shortwave_amateur_comms",
  },
  troposcatter_diffusion: {
    range: 8, reliability: 6, bandwidth: 5,
    latency: 7, rpCost: 5, beyondHorizon: true,
    forMobile: false, mechanism: "troposphere_turbulence_scatter",
    bestUse: "military_beyond_horizon_backbone",
  },
  ducting_atmospheric_layer: {
    range: 7, reliability: 3, bandwidth: 7,
    latency: 8, rpCost: 1, beyondHorizon: true,
    forMobile: false, mechanism: "temperature_inversion_waveguide",
    bestUse: "anomalous_propagation_vhf_uhf",
  },
};

const get = (t: RfPropagationType) => DATA[t];

export const range = (t: RfPropagationType) => get(t).range;
export const reliability = (t: RfPropagationType) => get(t).reliability;
export const bandwidth = (t: RfPropagationType) => get(t).bandwidth;
export const latency = (t: RfPropagationType) => get(t).latency;
export const rpCost = (t: RfPropagationType) => get(t).rpCost;
export const beyondHorizon = (t: RfPropagationType) => get(t).beyondHorizon;
export const forMobile = (t: RfPropagationType) => get(t).forMobile;
export const mechanism = (t: RfPropagationType) => get(t).mechanism;
export const bestUse = (t: RfPropagationType) => get(t).bestUse;
export const rfPropagationTypes = (): RfPropagationType[] => Object.keys(DATA) as RfPropagationType[];

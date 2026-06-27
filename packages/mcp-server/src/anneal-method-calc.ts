export type AnnealMethod =
  | "rtp_spike_anneal"
  | "flash_lamp_msec"
  | "laser_spike_usec"
  | "furnace_soak"
  | "microwave_selective";

const DATA: Record<AnnealMethod, {
  activation: number; diffusion: number; throughput: number;
  uniformity: number; annCost: number; selective: boolean;
  forUsj: boolean; heating: string; bestUse: string;
}> = {
  rtp_spike_anneal: {
    activation: 7, diffusion: 6, throughput: 8,
    uniformity: 8, annCost: 4, selective: false,
    forUsj: false, heating: "halogen_lamp_ramp_spike",
    bestUse: "standard_implant_activate",
  },
  flash_lamp_msec: {
    activation: 9, diffusion: 9, throughput: 7,
    uniformity: 7, annCost: 6, selective: false,
    forUsj: true, heating: "xenon_flash_millisecond",
    bestUse: "usj_activation_minimal_diff",
  },
  laser_spike_usec: {
    activation: 10, diffusion: 10, throughput: 5,
    uniformity: 6, annCost: 8, selective: true,
    forUsj: true, heating: "co2_laser_surface_melt",
    bestUse: "advanced_node_sd_activate",
  },
  furnace_soak: {
    activation: 5, diffusion: 3, throughput: 10,
    uniformity: 10, annCost: 2, selective: false,
    forUsj: false, heating: "resistance_batch_isothermal",
    bestUse: "oxidation_densification",
  },
  microwave_selective: {
    activation: 8, diffusion: 8, throughput: 6,
    uniformity: 7, annCost: 7, selective: true,
    forUsj: true, heating: "ghz_volumetric_dopant_only",
    bestUse: "3d_stacked_low_thermal",
  },
};

const get = (t: AnnealMethod) => DATA[t];

export const activation = (t: AnnealMethod) => get(t).activation;
export const diffusion = (t: AnnealMethod) => get(t).diffusion;
export const throughput = (t: AnnealMethod) => get(t).throughput;
export const uniformity = (t: AnnealMethod) => get(t).uniformity;
export const annCost = (t: AnnealMethod) => get(t).annCost;
export const selective = (t: AnnealMethod) => get(t).selective;
export const forUsj = (t: AnnealMethod) => get(t).forUsj;
export const heating = (t: AnnealMethod) => get(t).heating;
export const bestUse = (t: AnnealMethod) => get(t).bestUse;
export const annealMethods = (): AnnealMethod[] => Object.keys(DATA) as AnnealMethod[];

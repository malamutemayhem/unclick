export type FluidizedBedReactType =
  | "bubbling_bed_classic"
  | "circulating_bed_riser"
  | "turbulent_bed_fast"
  | "spouted_bed_cone"
  | "vibro_fluidized_fine";

interface FluidizedBedReactData {
  heatTransfer: number;
  gasContact: number;
  scalability: number;
  attrition: number;
  frCost: number;
  continuous: boolean;
  forCatalytic: boolean;
  distributor: string;
  bestUse: string;
}

const DATA: Record<FluidizedBedReactType, FluidizedBedReactData> = {
  bubbling_bed_classic: {
    heatTransfer: 9, gasContact: 7, scalability: 9, attrition: 5, frCost: 6,
    continuous: true, forCatalytic: true,
    distributor: "perforated_plate_bubble_cap_grid",
    bestUse: "fcc_catalyst_regen_coal_combust",
  },
  circulating_bed_riser: {
    heatTransfer: 10, gasContact: 9, scalability: 10, attrition: 4, frCost: 8,
    continuous: true, forCatalytic: true,
    distributor: "riser_tube_cyclone_return_standpipe",
    bestUse: "fcc_cracking_cfb_boiler_large_scale",
  },
  turbulent_bed_fast: {
    heatTransfer: 9, gasContact: 8, scalability: 8, attrition: 5, frCost: 7,
    continuous: true, forCatalytic: true,
    distributor: "high_velocity_grid_expanded_bed_zone",
    bestUse: "propylene_acrylonitrile_partial_oxidize",
  },
  spouted_bed_cone: {
    heatTransfer: 7, gasContact: 8, scalability: 5, attrition: 7, frCost: 5,
    continuous: true, forCatalytic: false,
    distributor: "conical_base_central_spout_annulus",
    bestUse: "grain_dry_coat_large_particle_process",
  },
  vibro_fluidized_fine: {
    heatTransfer: 8, gasContact: 7, scalability: 4, attrition: 8, frCost: 7,
    continuous: true, forCatalytic: false,
    distributor: "vibrate_plate_assist_fine_cohesive",
    bestUse: "fine_powder_dry_agglomerate_cohesive",
  },
};

function get(t: FluidizedBedReactType): FluidizedBedReactData {
  return DATA[t];
}

export const heatTransfer = (t: FluidizedBedReactType) => get(t).heatTransfer;
export const gasContact = (t: FluidizedBedReactType) => get(t).gasContact;
export const scalability = (t: FluidizedBedReactType) => get(t).scalability;
export const attrition = (t: FluidizedBedReactType) => get(t).attrition;
export const frCost = (t: FluidizedBedReactType) => get(t).frCost;
export const continuous = (t: FluidizedBedReactType) => get(t).continuous;
export const forCatalytic = (t: FluidizedBedReactType) => get(t).forCatalytic;
export const distributor = (t: FluidizedBedReactType) => get(t).distributor;
export const bestUse = (t: FluidizedBedReactType) => get(t).bestUse;
export const fluidizedBedReactTypes = (): FluidizedBedReactType[] =>
  Object.keys(DATA) as FluidizedBedReactType[];

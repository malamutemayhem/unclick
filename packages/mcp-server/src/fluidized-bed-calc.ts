export type FluidizedBedType =
  | "bubbling_bed"
  | "circulating_bed"
  | "vibrating_bed"
  | "spouted_bed"
  | "pulsed_bed";

interface FluidizedBedData {
  heatTransfer: number;
  throughput: number;
  mixingQuality: number;
  particleRange: number;
  fbCost: number;
  forFine: boolean;
  forCoating: boolean;
  bedConfig: string;
  bestUse: string;
}

const DATA: Record<FluidizedBedType, FluidizedBedData> = {
  bubbling_bed: {
    heatTransfer: 8, throughput: 8, mixingQuality: 7, particleRange: 7, fbCost: 5,
    forFine: false, forCoating: false,
    bedConfig: "bubbling_fluidized_bed_gas_bubble_rise_solid_mix_dry_react",
    bestUse: "drying_react_bubbling_fluidized_bed_gas_solid_contact_uniform",
  },
  circulating_bed: {
    heatTransfer: 9, throughput: 10, mixingQuality: 9, particleRange: 6, fbCost: 8,
    forFine: true, forCoating: false,
    bedConfig: "circulating_fluidized_bed_riser_cyclone_recirculate_fast_fluid",
    bestUse: "combustion_circulating_fluidized_bed_high_throughput_fuel_flex",
  },
  vibrating_bed: {
    heatTransfer: 7, throughput: 7, mixingQuality: 8, particleRange: 9, fbCost: 6,
    forFine: true, forCoating: false,
    bedConfig: "vibrating_fluidized_bed_mechanical_vibration_reduce_gas_flow",
    bestUse: "fine_powder_vibrating_fluidized_bed_low_velocity_gentle_dry",
  },
  spouted_bed: {
    heatTransfer: 8, throughput: 6, mixingQuality: 8, particleRange: 8, fbCost: 5,
    forFine: false, forCoating: true,
    bedConfig: "spouted_bed_central_jet_fountain_coat_large_particle_draft",
    bestUse: "tablet_coat_spouted_bed_central_jet_fountain_large_particle",
  },
  pulsed_bed: {
    heatTransfer: 7, throughput: 6, mixingQuality: 9, particleRange: 10, fbCost: 7,
    forFine: true, forCoating: false,
    bedConfig: "pulsed_fluidized_bed_intermittent_gas_flow_cohesive_powder",
    bestUse: "cohesive_powder_pulsed_fluidized_bed_intermittent_flow_agglom",
  },
};

function get(t: FluidizedBedType): FluidizedBedData {
  return DATA[t];
}

export const heatTransfer = (t: FluidizedBedType) => get(t).heatTransfer;
export const throughput = (t: FluidizedBedType) => get(t).throughput;
export const mixingQuality = (t: FluidizedBedType) => get(t).mixingQuality;
export const particleRange = (t: FluidizedBedType) => get(t).particleRange;
export const fbCost = (t: FluidizedBedType) => get(t).fbCost;
export const forFine = (t: FluidizedBedType) => get(t).forFine;
export const forCoating = (t: FluidizedBedType) => get(t).forCoating;
export const bedConfig = (t: FluidizedBedType) => get(t).bedConfig;
export const bestUse = (t: FluidizedBedType) => get(t).bestUse;
export const fluidizedBedTypes = (): FluidizedBedType[] =>
  Object.keys(DATA) as FluidizedBedType[];

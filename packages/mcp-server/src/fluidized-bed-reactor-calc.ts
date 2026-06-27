export type FluidizedBedReactorType =
  | "bubbling_bed_catalyst"
  | "circulating_bed_riser"
  | "turbulent_bed_mixed"
  | "spouted_bed_coarse"
  | "entrained_flow_gasify";

interface FluidizedBedReactorData {
  heatTransfer: number;
  gasContact: number;
  catalystAttrition: number;
  scaleUp: number;
  fbCost: number;
  circulating: boolean;
  forExothermic: boolean;
  regime: string;
  bestUse: string;
}

const DATA: Record<FluidizedBedReactorType, FluidizedBedReactorData> = {
  bubbling_bed_catalyst: {
    heatTransfer: 9, gasContact: 7, catalystAttrition: 7, scaleUp: 8, fbCost: 6,
    circulating: false, forExothermic: true,
    regime: "bubbling_fluidization_gas_bubble_emulsion",
    bestUse: "fcc_catalytic_cracking_polyethylene_gas_phase",
  },
  circulating_bed_riser: {
    heatTransfer: 9, gasContact: 9, catalystAttrition: 5, scaleUp: 8, fbCost: 8,
    circulating: true, forExothermic: true,
    regime: "fast_fluidization_riser_cyclone_return_leg",
    bestUse: "fcc_riser_cfb_combustion_alumina_calcination",
  },
  turbulent_bed_mixed: {
    heatTransfer: 10, gasContact: 8, catalystAttrition: 6, scaleUp: 7, fbCost: 7,
    circulating: false, forExothermic: true,
    regime: "turbulent_regime_dense_phase_high_gas_velocity",
    bestUse: "acrylonitrile_maleic_anhydride_partial_oxidation",
  },
  spouted_bed_coarse: {
    heatTransfer: 8, gasContact: 7, catalystAttrition: 8, scaleUp: 6, fbCost: 5,
    circulating: false, forExothermic: false,
    regime: "central_spout_fountain_annulus_coarse_particle",
    bestUse: "grain_drying_coating_granulation_coarse_solids",
  },
  entrained_flow_gasify: {
    heatTransfer: 8, gasContact: 10, catalystAttrition: 3, scaleUp: 7, fbCost: 9,
    circulating: true, forExothermic: true,
    regime: "entrained_flow_co_current_high_temp_gasify",
    bestUse: "coal_gasification_igcc_syngas_production",
  },
};

function get(t: FluidizedBedReactorType): FluidizedBedReactorData {
  return DATA[t];
}

export const heatTransfer = (t: FluidizedBedReactorType) => get(t).heatTransfer;
export const gasContact = (t: FluidizedBedReactorType) => get(t).gasContact;
export const catalystAttrition = (t: FluidizedBedReactorType) => get(t).catalystAttrition;
export const scaleUp = (t: FluidizedBedReactorType) => get(t).scaleUp;
export const fbCost = (t: FluidizedBedReactorType) => get(t).fbCost;
export const circulating = (t: FluidizedBedReactorType) => get(t).circulating;
export const forExothermic = (t: FluidizedBedReactorType) => get(t).forExothermic;
export const regime = (t: FluidizedBedReactorType) => get(t).regime;
export const bestUse = (t: FluidizedBedReactorType) => get(t).bestUse;
export const fluidizedBedReactorTypes = (): FluidizedBedReactorType[] =>
  Object.keys(DATA) as FluidizedBedReactorType[];

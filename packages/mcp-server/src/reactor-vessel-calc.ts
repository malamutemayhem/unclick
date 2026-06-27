export type ReactorVesselType =
  | "batch_stirred_tank_cstr"
  | "plug_flow_tubular_pfr"
  | "packed_bed_catalytic"
  | "fluidized_bed_suspended"
  | "membrane_reactor_selective";

interface ReactorVesselData {
  conversion: number;
  selectivity: number;
  heatTransfer: number;
  scaleUp: number;
  rvCost: number;
  continuous: boolean;
  forCatalytic: boolean;
  flow: string;
  bestUse: string;
}

const DATA: Record<ReactorVesselType, ReactorVesselData> = {
  batch_stirred_tank_cstr: {
    conversion: 6, selectivity: 7, heatTransfer: 8, scaleUp: 9, rvCost: 5,
    continuous: false, forCatalytic: false,
    flow: "well_mixed_uniform_composition",
    bestUse: "pharma_specialty_chem_batch",
  },
  plug_flow_tubular_pfr: {
    conversion: 9, selectivity: 8, heatTransfer: 6, scaleUp: 7, rvCost: 6,
    continuous: true, forCatalytic: false,
    flow: "laminar_or_turbulent_no_backmix",
    bestUse: "polymerization_high_conversion",
  },
  packed_bed_catalytic: {
    conversion: 9, selectivity: 9, heatTransfer: 5, scaleUp: 6, rvCost: 7,
    continuous: true, forCatalytic: true,
    flow: "gas_through_fixed_catalyst_pellet",
    bestUse: "ammonia_synthesis_reforming_hydro",
  },
  fluidized_bed_suspended: {
    conversion: 8, selectivity: 7, heatTransfer: 10, scaleUp: 5, rvCost: 8,
    continuous: true, forCatalytic: true,
    flow: "gas_suspends_solid_catalyst_mix",
    bestUse: "fcc_cracking_combustion_drying",
  },
  membrane_reactor_selective: {
    conversion: 10, selectivity: 10, heatTransfer: 6, scaleUp: 4, rvCost: 10,
    continuous: true, forCatalytic: true,
    flow: "selective_permeation_shift_equil",
    bestUse: "hydrogen_production_dehydrogenation",
  },
};

function get(t: ReactorVesselType): ReactorVesselData {
  return DATA[t];
}

export const conversion = (t: ReactorVesselType) => get(t).conversion;
export const selectivity = (t: ReactorVesselType) => get(t).selectivity;
export const heatTransfer = (t: ReactorVesselType) => get(t).heatTransfer;
export const scaleUp = (t: ReactorVesselType) => get(t).scaleUp;
export const rvCost = (t: ReactorVesselType) => get(t).rvCost;
export const continuous = (t: ReactorVesselType) => get(t).continuous;
export const forCatalytic = (t: ReactorVesselType) => get(t).forCatalytic;
export const flow = (t: ReactorVesselType) => get(t).flow;
export const bestUse = (t: ReactorVesselType) => get(t).bestUse;
export const reactorVesselTypes = (): ReactorVesselType[] =>
  Object.keys(DATA) as ReactorVesselType[];

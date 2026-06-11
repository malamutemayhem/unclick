export type ScrewPumpType =
  | "single_screw_progressing"
  | "twin_screw_external_bearing"
  | "triple_screw_hydraulic"
  | "archimedean_open_trough"
  | "twin_screw_multiphase";

interface ScrewPumpData {
  flow: number;
  pressure: number;
  viscosity: number;
  pulsation: number;
  spCost: number;
  selfPrime: boolean;
  forMultiphase: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<ScrewPumpType, ScrewPumpData> = {
  single_screw_progressing: {
    flow: 7, pressure: 8, viscosity: 10, pulsation: 9, spCost: 5,
    selfPrime: true, forMultiphase: false,
    element: "rotor_stator_elastomer_cavity",
    bestUse: "wastewater_sludge_high_viscosity",
  },
  twin_screw_external_bearing: {
    flow: 9, pressure: 8, viscosity: 9, pulsation: 9, spCost: 8,
    selfPrime: true, forMultiphase: false,
    element: "external_bearing_non_contact_screw",
    bestUse: "crude_oil_loading_cargo_transfer",
  },
  triple_screw_hydraulic: {
    flow: 8, pressure: 10, viscosity: 8, pulsation: 10, spCost: 7,
    selfPrime: false, forMultiphase: false,
    element: "three_screw_idler_power_driven",
    bestUse: "hydraulic_lube_oil_high_pressure",
  },
  archimedean_open_trough: {
    flow: 10, pressure: 2, viscosity: 6, pulsation: 7, spCost: 6,
    selfPrime: false, forMultiphase: false,
    element: "open_helix_inclined_trough",
    bestUse: "wastewater_inlet_low_head_lift",
  },
  twin_screw_multiphase: {
    flow: 8, pressure: 7, viscosity: 7, pulsation: 8, spCost: 10,
    selfPrime: true, forMultiphase: true,
    element: "gas_tolerant_twin_screw_sealed",
    bestUse: "oil_gas_wellhead_multiphase",
  },
};

function get(t: ScrewPumpType): ScrewPumpData {
  return DATA[t];
}

export const flow = (t: ScrewPumpType) => get(t).flow;
export const pressure = (t: ScrewPumpType) => get(t).pressure;
export const viscosity = (t: ScrewPumpType) => get(t).viscosity;
export const pulsation = (t: ScrewPumpType) => get(t).pulsation;
export const spCost = (t: ScrewPumpType) => get(t).spCost;
export const selfPrime = (t: ScrewPumpType) => get(t).selfPrime;
export const forMultiphase = (t: ScrewPumpType) => get(t).forMultiphase;
export const element = (t: ScrewPumpType) => get(t).element;
export const bestUse = (t: ScrewPumpType) => get(t).bestUse;
export const screwPumpTypes = (): ScrewPumpType[] =>
  Object.keys(DATA) as ScrewPumpType[];

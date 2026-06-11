export type ChemicalDosingType =
  | "diaphragm_metering"
  | "peristaltic_tube"
  | "plunger_piston"
  | "solenoid_driven"
  | "gravity_drip_feed";

interface ChemicalDosingData {
  accuracy: number;
  flowRange: number;
  pressure: number;
  chemResistance: number;
  cdCost: number;
  pulseFree: boolean;
  forCorrosive: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<ChemicalDosingType, ChemicalDosingData> = {
  diaphragm_metering: {
    accuracy: 9, flowRange: 7, pressure: 8, chemResistance: 9, cdCost: 6,
    pulseFree: false, forCorrosive: true,
    mechanism: "hydraulic_or_mechanical_diaphragm_stroke_adjust",
    bestUse: "chlorine_acid_caustic_dosing_water_treatment_plant",
  },
  peristaltic_tube: {
    accuracy: 7, flowRange: 8, pressure: 4, chemResistance: 10, cdCost: 5,
    pulseFree: true, forCorrosive: true,
    mechanism: "roller_squeeze_tube_no_seal_no_valve_self_priming",
    bestUse: "polymer_flocculation_lime_slurry_abrasive_chemical",
  },
  plunger_piston: {
    accuracy: 10, flowRange: 6, pressure: 10, chemResistance: 6, cdCost: 8,
    pulseFree: false, forCorrosive: false,
    mechanism: "ceramic_or_steel_plunger_high_pressure_precise_vol",
    bestUse: "high_pressure_boiler_feed_chemical_injection_oilgas",
  },
  solenoid_driven: {
    accuracy: 8, flowRange: 4, pressure: 5, chemResistance: 7, cdCost: 3,
    pulseFree: false, forCorrosive: true,
    mechanism: "electromagnetic_solenoid_diaphragm_pulse_low_flow",
    bestUse: "swimming_pool_dosing_cooling_tower_small_system",
  },
  gravity_drip_feed: {
    accuracy: 3, flowRange: 3, pressure: 1, chemResistance: 8, cdCost: 1,
    pulseFree: true, forCorrosive: true,
    mechanism: "gravity_head_float_valve_drip_rate_simple_tank",
    bestUse: "remote_site_chlorination_fish_pond_simple_ph_adjust",
  },
};

function get(t: ChemicalDosingType): ChemicalDosingData {
  return DATA[t];
}

export const accuracy = (t: ChemicalDosingType) => get(t).accuracy;
export const flowRange = (t: ChemicalDosingType) => get(t).flowRange;
export const pressure = (t: ChemicalDosingType) => get(t).pressure;
export const chemResistance = (t: ChemicalDosingType) => get(t).chemResistance;
export const cdCost = (t: ChemicalDosingType) => get(t).cdCost;
export const pulseFree = (t: ChemicalDosingType) => get(t).pulseFree;
export const forCorrosive = (t: ChemicalDosingType) => get(t).forCorrosive;
export const mechanism = (t: ChemicalDosingType) => get(t).mechanism;
export const bestUse = (t: ChemicalDosingType) => get(t).bestUse;
export const chemicalDosingTypes = (): ChemicalDosingType[] =>
  Object.keys(DATA) as ChemicalDosingType[];

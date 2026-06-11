export type YeastPropagatorType =
  | "flask_stir_plate"
  | "conical_aerated"
  | "continuous_chemostat"
  | "fed_batch"
  | "immobilized_cell";

interface YeastPropagatorData {
  cellViability: number;
  scaleCapacity: number;
  contamRisk: number;
  automation: number;
  ypCost: number;
  continuous: boolean;
  forAle: boolean;
  propagatorConfig: string;
  bestUse: string;
}

const DATA: Record<YeastPropagatorType, YeastPropagatorData> = {
  flask_stir_plate: {
    cellViability: 7, scaleCapacity: 3, contamRisk: 6, automation: 2, ypCost: 2,
    continuous: false, forAle: true,
    propagatorConfig: "flask_stir_plate_yeast_propagator_erlenmeyer_magnetic_bar_starter",
    bestUse: "homebrew_pilot_yeast_starter_flask_stir_plate_small_batch_ale",
  },
  conical_aerated: {
    cellViability: 9, scaleCapacity: 7, contamRisk: 8, automation: 6, ypCost: 6,
    continuous: false, forAle: true,
    propagatorConfig: "conical_aerated_yeast_propagator_sterile_air_sparge_temp_control",
    bestUse: "craft_brewery_conical_aerated_propagator_pure_culture_pitch_rate",
  },
  continuous_chemostat: {
    cellViability: 8, scaleCapacity: 10, contamRisk: 9, automation: 9, ypCost: 9,
    continuous: true, forAle: false,
    propagatorConfig: "continuous_chemostat_yeast_propagator_steady_state_dilution_rate",
    bestUse: "large_brewery_continuous_chemostat_steady_state_yeast_production",
  },
  fed_batch: {
    cellViability: 10, scaleCapacity: 9, contamRisk: 9, automation: 8, ypCost: 8,
    continuous: false, forAle: true,
    propagatorConfig: "fed_batch_yeast_propagator_nutrient_pulse_feed_high_cell_density",
    bestUse: "industrial_brewery_fed_batch_propagator_high_cell_density_pitch",
  },
  immobilized_cell: {
    cellViability: 7, scaleCapacity: 8, contamRisk: 10, automation: 10, ypCost: 10,
    continuous: true, forAle: false,
    propagatorConfig: "immobilized_cell_yeast_reactor_alginate_bead_continuous_ferment",
    bestUse: "specialty_fermentation_immobilized_yeast_continuous_bio_reactor",
  },
};

function get(t: YeastPropagatorType): YeastPropagatorData {
  return DATA[t];
}

export const cellViability = (t: YeastPropagatorType) => get(t).cellViability;
export const scaleCapacity = (t: YeastPropagatorType) => get(t).scaleCapacity;
export const contamRisk = (t: YeastPropagatorType) => get(t).contamRisk;
export const automation = (t: YeastPropagatorType) => get(t).automation;
export const ypCost = (t: YeastPropagatorType) => get(t).ypCost;
export const continuous = (t: YeastPropagatorType) => get(t).continuous;
export const forAle = (t: YeastPropagatorType) => get(t).forAle;
export const propagatorConfig = (t: YeastPropagatorType) => get(t).propagatorConfig;
export const bestUse = (t: YeastPropagatorType) => get(t).bestUse;
export const yeastPropagatorTypes = (): YeastPropagatorType[] =>
  Object.keys(DATA) as YeastPropagatorType[];

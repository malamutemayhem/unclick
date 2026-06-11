export type PoultryIncubatorType =
  | "single_stage_setter"
  | "multi_stage_setter"
  | "hatcher_cabinet"
  | "combined_setter_hatcher"
  | "benchtop_research";

interface PoultryIncubatorData {
  capacity: number;
  hatchRate: number;
  uniformity: number;
  energyEfficiency: number;
  piCost: number;
  automated: boolean;
  forCommercial: boolean;
  control: string;
  bestUse: string;
}

const DATA: Record<PoultryIncubatorType, PoultryIncubatorData> = {
  single_stage_setter: {
    capacity: 10, hatchRate: 10, uniformity: 10, energyEfficiency: 8, piCost: 9,
    automated: true, forCommercial: true,
    control: "single_stage_all_in_all_out_precise_temp_humidity_co2_turn",
    bestUse: "large_hatchery_broiler_layer_all_in_all_out_biosecurity",
  },
  multi_stage_setter: {
    capacity: 10, hatchRate: 8, uniformity: 7, energyEfficiency: 9, piCost: 7,
    automated: true, forCommercial: true,
    control: "multi_stage_continuous_load_mixed_age_embryo_heat_recovery",
    bestUse: "continuous_production_hatchery_multiple_set_days_per_week",
  },
  hatcher_cabinet: {
    capacity: 7, hatchRate: 9, uniformity: 9, energyEfficiency: 7, piCost: 6,
    automated: true, forCommercial: true,
    control: "hatcher_high_humidity_ventilation_chick_takeoff_separate",
    bestUse: "transfer_from_setter_last_3_days_hatch_chick_processing",
  },
  combined_setter_hatcher: {
    capacity: 6, hatchRate: 7, uniformity: 7, energyEfficiency: 8, piCost: 5,
    automated: true, forCommercial: false,
    control: "combined_unit_setter_hatcher_phase_switch_small_batch",
    bestUse: "small_farm_specialty_breed_game_bird_waterfowl_mixed_hatch",
  },
  benchtop_research: {
    capacity: 2, hatchRate: 8, uniformity: 8, energyEfficiency: 5, piCost: 3,
    automated: false, forCommercial: false,
    control: "benchtop_digital_thermostat_manual_turn_viewing_window",
    bestUse: "research_lab_genetics_study_school_education_small_batch",
  },
};

function get(t: PoultryIncubatorType): PoultryIncubatorData {
  return DATA[t];
}

export const capacity = (t: PoultryIncubatorType) => get(t).capacity;
export const hatchRate = (t: PoultryIncubatorType) => get(t).hatchRate;
export const uniformity = (t: PoultryIncubatorType) => get(t).uniformity;
export const energyEfficiency = (t: PoultryIncubatorType) => get(t).energyEfficiency;
export const piCost = (t: PoultryIncubatorType) => get(t).piCost;
export const automated = (t: PoultryIncubatorType) => get(t).automated;
export const forCommercial = (t: PoultryIncubatorType) => get(t).forCommercial;
export const control = (t: PoultryIncubatorType) => get(t).control;
export const bestUse = (t: PoultryIncubatorType) => get(t).bestUse;
export const poultryIncubatorTypes = (): PoultryIncubatorType[] =>
  Object.keys(DATA) as PoultryIncubatorType[];

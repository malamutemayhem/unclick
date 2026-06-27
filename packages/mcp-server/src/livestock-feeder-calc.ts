export type LivestockFeederType =
  | "tmr_mixer_wagon"
  | "automatic_rail"
  | "belt_feeder"
  | "robotic_pusher"
  | "creep_feeder";

interface LivestockFeederData {
  capacity: number;
  accuracy: number;
  laborSaving: number;
  animalCount: number;
  lfCost: number;
  automated: boolean;
  forDairy: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<LivestockFeederType, LivestockFeederData> = {
  tmr_mixer_wagon: {
    capacity: 9, accuracy: 8, laborSaving: 7, animalCount: 9, lfCost: 6,
    automated: false, forDairy: true,
    mechanism: "vertical_auger_mixer_wagon_weigh_cell_ration_blend_deliver",
    bestUse: "dairy_feedlot_total_mixed_ration_blend_deliver_feed_bunk",
  },
  automatic_rail: {
    capacity: 8, accuracy: 9, laborSaving: 10, animalCount: 10, lfCost: 9,
    automated: true, forDairy: true,
    mechanism: "overhead_rail_suspended_mixer_auto_fill_route_dispense",
    bestUse: "large_dairy_barn_automatic_scheduled_feeding_multiple_pen",
  },
  belt_feeder: {
    capacity: 10, accuracy: 7, laborSaving: 8, animalCount: 10, lfCost: 7,
    automated: true, forDairy: true,
    mechanism: "flat_belt_conveyor_feed_delivery_continuous_bunk_fill",
    bestUse: "feedlot_beef_cattle_continuous_bunk_delivery_high_volume",
  },
  robotic_pusher: {
    capacity: 5, accuracy: 6, laborSaving: 9, animalCount: 8, lfCost: 5,
    automated: true, forDairy: true,
    mechanism: "autonomous_robot_feed_pusher_programmed_route_bunk_sweep",
    bestUse: "dairy_barn_feed_push_up_increase_intake_reduce_waste_auto",
  },
  creep_feeder: {
    capacity: 4, accuracy: 6, laborSaving: 5, animalCount: 5, lfCost: 3,
    automated: false, forDairy: false,
    mechanism: "restricted_access_gate_young_animal_only_supplement_feed",
    bestUse: "calf_lamb_piglet_creep_feed_supplement_growth_before_wean",
  },
};

function get(t: LivestockFeederType): LivestockFeederData {
  return DATA[t];
}

export const capacity = (t: LivestockFeederType) => get(t).capacity;
export const accuracy = (t: LivestockFeederType) => get(t).accuracy;
export const laborSaving = (t: LivestockFeederType) => get(t).laborSaving;
export const animalCount = (t: LivestockFeederType) => get(t).animalCount;
export const lfCost = (t: LivestockFeederType) => get(t).lfCost;
export const automated = (t: LivestockFeederType) => get(t).automated;
export const forDairy = (t: LivestockFeederType) => get(t).forDairy;
export const mechanism = (t: LivestockFeederType) => get(t).mechanism;
export const bestUse = (t: LivestockFeederType) => get(t).bestUse;
export const livestockFeederTypes = (): LivestockFeederType[] =>
  Object.keys(DATA) as LivestockFeederType[];

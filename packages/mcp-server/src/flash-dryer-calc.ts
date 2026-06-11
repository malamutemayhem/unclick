export type FlashDryerType =
  | "pneumatic_straight_tube"
  | "ring_dryer_recirculate"
  | "spin_flash_agitated"
  | "cascade_flash_multi_stage"
  | "superheated_steam_flash";

interface FlashDryerData {
  drySpeed: number;
  particleControl: number;
  heatEfficiency: number;
  throughput: number;
  flCost: number;
  singlePass: boolean;
  forWetCake: boolean;
  airflow: string;
  bestUse: string;
}

const DATA: Record<FlashDryerType, FlashDryerData> = {
  pneumatic_straight_tube: {
    drySpeed: 9, particleControl: 5, heatEfficiency: 6, throughput: 8, flCost: 4,
    singlePass: true, forWetCake: true,
    airflow: "hot_air_duct_entrain_cyclone_collect",
    bestUse: "starch_calcium_carb_free_flow_powder",
  },
  ring_dryer_recirculate: {
    drySpeed: 8, particleControl: 8, heatEfficiency: 8, throughput: 9, flCost: 7,
    singlePass: false, forWetCake: true,
    airflow: "classifier_ring_return_oversize_loop",
    bestUse: "kaolin_clay_fine_particle_uniform",
  },
  spin_flash_agitated: {
    drySpeed: 10, particleControl: 9, heatEfficiency: 7, throughput: 7, flCost: 8,
    singlePass: true, forWetCake: true,
    airflow: "swirl_agitator_disperse_hot_gas",
    bestUse: "pigment_dye_paste_fine_disperse_dry",
  },
  cascade_flash_multi_stage: {
    drySpeed: 7, particleControl: 7, heatEfficiency: 9, throughput: 10, flCost: 9,
    singlePass: false, forWetCake: false,
    airflow: "multi_duct_stage_heat_recovery_loop",
    bestUse: "sludge_biomass_high_moisture_reduce",
  },
  superheated_steam_flash: {
    drySpeed: 8, particleControl: 6, heatEfficiency: 10, throughput: 8, flCost: 10,
    singlePass: true, forWetCake: false,
    airflow: "closed_loop_steam_inert_no_exhaust",
    bestUse: "solvent_wet_explosive_inert_safe_dry",
  },
};

function get(t: FlashDryerType): FlashDryerData {
  return DATA[t];
}

export const drySpeed = (t: FlashDryerType) => get(t).drySpeed;
export const particleControl = (t: FlashDryerType) => get(t).particleControl;
export const heatEfficiency = (t: FlashDryerType) => get(t).heatEfficiency;
export const throughput = (t: FlashDryerType) => get(t).throughput;
export const flCost = (t: FlashDryerType) => get(t).flCost;
export const singlePass = (t: FlashDryerType) => get(t).singlePass;
export const forWetCake = (t: FlashDryerType) => get(t).forWetCake;
export const airflow = (t: FlashDryerType) => get(t).airflow;
export const bestUse = (t: FlashDryerType) => get(t).bestUse;
export const flashDryerTypes = (): FlashDryerType[] =>
  Object.keys(DATA) as FlashDryerType[];

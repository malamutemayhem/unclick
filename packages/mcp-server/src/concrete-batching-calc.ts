export type ConcreteBatchingType =
  | "stationary_central"
  | "mobile_transit"
  | "dry_batch"
  | "wet_batch"
  | "precast_automated";

interface ConcreteBatchingData {
  batchSpeed: number;
  mixConsistency: number;
  capacity: number;
  automation: number;
  cbCost: number;
  mobile: boolean;
  forReadyMix: boolean;
  plantConfig: string;
  bestUse: string;
}

const DATA: Record<ConcreteBatchingType, ConcreteBatchingData> = {
  stationary_central: {
    batchSpeed: 9, mixConsistency: 9, capacity: 10, automation: 9, cbCost: 9,
    mobile: false, forReadyMix: true,
    plantConfig: "stationary_central_mix_twin_shaft_silo_conveyor_weigh_batch_auto",
    bestUse: "large_ready_mix_operation_stationary_central_mix_plant_high_vol",
  },
  mobile_transit: {
    batchSpeed: 7, mixConsistency: 6, capacity: 6, automation: 5, cbCost: 5,
    mobile: true, forReadyMix: true,
    plantConfig: "mobile_transit_mix_truck_drum_batch_on_site_remote_location",
    bestUse: "remote_site_small_project_mobile_transit_mix_truck_on_demand",
  },
  dry_batch: {
    batchSpeed: 8, mixConsistency: 7, capacity: 8, automation: 7, cbCost: 6,
    mobile: false, forReadyMix: true,
    plantConfig: "dry_batch_plant_weigh_aggregate_cement_load_truck_mix_transit",
    bestUse: "ready_mix_delivery_dry_batch_plant_truck_mix_in_transit_flex",
  },
  wet_batch: {
    batchSpeed: 10, mixConsistency: 10, capacity: 9, automation: 9, cbCost: 8,
    mobile: false, forReadyMix: true,
    plantConfig: "wet_batch_central_mix_drum_pan_mixer_complete_mix_before_load",
    bestUse: "high_quality_concrete_wet_batch_central_mix_complete_before_load",
  },
  precast_automated: {
    batchSpeed: 9, mixConsistency: 10, capacity: 8, automation: 10, cbCost: 10,
    mobile: false, forReadyMix: false,
    plantConfig: "precast_automated_batch_precise_mix_mold_pour_cure_chamber_auto",
    bestUse: "precast_panel_beam_pipe_automated_batch_precise_mix_mold_cure",
  },
};

function get(t: ConcreteBatchingType): ConcreteBatchingData {
  return DATA[t];
}

export const batchSpeed = (t: ConcreteBatchingType) => get(t).batchSpeed;
export const mixConsistency = (t: ConcreteBatchingType) => get(t).mixConsistency;
export const capacity = (t: ConcreteBatchingType) => get(t).capacity;
export const automation = (t: ConcreteBatchingType) => get(t).automation;
export const cbCost = (t: ConcreteBatchingType) => get(t).cbCost;
export const mobile = (t: ConcreteBatchingType) => get(t).mobile;
export const forReadyMix = (t: ConcreteBatchingType) => get(t).forReadyMix;
export const plantConfig = (t: ConcreteBatchingType) => get(t).plantConfig;
export const bestUse = (t: ConcreteBatchingType) => get(t).bestUse;
export const concreteBatchingTypes = (): ConcreteBatchingType[] =>
  Object.keys(DATA) as ConcreteBatchingType[];

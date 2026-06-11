export type PickPlaceSmdType =
  | "chip_shooter"
  | "flexible_placer"
  | "multi_gantry"
  | "turret_head"
  | "collect_and_place";

interface PickPlaceSmdData {
  placementSpeed: number;
  accuracy: number;
  componentRange: number;
  feederCapacity: number;
  ppCost: number;
  visionAligned: boolean;
  forFinePitch: boolean;
  headType: string;
  bestUse: string;
}

const DATA: Record<PickPlaceSmdType, PickPlaceSmdData> = {
  chip_shooter: {
    placementSpeed: 10, accuracy: 7, componentRange: 5, feederCapacity: 9, ppCost: 8,
    visionAligned: true, forFinePitch: false,
    headType: "rotary_turret_multi_nozzle_high_speed_passive_chip_resistor",
    bestUse: "high_volume_passive_component_0402_0603_0805_resistor_cap",
  },
  flexible_placer: {
    placementSpeed: 6, accuracy: 9, componentRange: 10, feederCapacity: 7, ppCost: 6,
    visionAligned: true, forFinePitch: true,
    headType: "single_gantry_multi_nozzle_vision_center_flexible_component",
    bestUse: "prototype_low_volume_mixed_board_odd_form_connector_ic",
  },
  multi_gantry: {
    placementSpeed: 9, accuracy: 9, componentRange: 9, feederCapacity: 10, ppCost: 10,
    visionAligned: true, forFinePitch: true,
    headType: "dual_independent_gantry_simultaneous_place_high_throughput",
    bestUse: "high_mix_high_volume_automotive_server_board_full_line",
  },
  turret_head: {
    placementSpeed: 10, accuracy: 7, componentRange: 6, feederCapacity: 9, ppCost: 7,
    visionAligned: true, forFinePitch: false,
    headType: "continuous_rotation_turret_12_24_nozzle_fly_pick_place",
    bestUse: "mass_production_led_strip_simple_board_passive_heavy_line",
  },
  collect_and_place: {
    placementSpeed: 8, accuracy: 10, componentRange: 8, feederCapacity: 8, ppCost: 9,
    visionAligned: true, forFinePitch: true,
    headType: "collect_multiple_then_place_sequential_high_accuracy_bga",
    bestUse: "bga_qfn_csp_fine_pitch_ic_placement_high_accuracy_required",
  },
};

function get(t: PickPlaceSmdType): PickPlaceSmdData {
  return DATA[t];
}

export const placementSpeed = (t: PickPlaceSmdType) => get(t).placementSpeed;
export const accuracy = (t: PickPlaceSmdType) => get(t).accuracy;
export const componentRange = (t: PickPlaceSmdType) => get(t).componentRange;
export const feederCapacity = (t: PickPlaceSmdType) => get(t).feederCapacity;
export const ppCost = (t: PickPlaceSmdType) => get(t).ppCost;
export const visionAligned = (t: PickPlaceSmdType) => get(t).visionAligned;
export const forFinePitch = (t: PickPlaceSmdType) => get(t).forFinePitch;
export const headType = (t: PickPlaceSmdType) => get(t).headType;
export const bestUse = (t: PickPlaceSmdType) => get(t).bestUse;
export const pickPlaceSmdTypes = (): PickPlaceSmdType[] =>
  Object.keys(DATA) as PickPlaceSmdType[];

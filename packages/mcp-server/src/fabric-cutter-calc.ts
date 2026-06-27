export type FabricCutterType =
  | "straight_knife"
  | "round_knife"
  | "band_knife"
  | "die_press"
  | "cnc_auto_cutter";

interface FabricCutterData {
  cuttingSpeed: number;
  layerCapacity: number;
  cutAccuracy: number;
  materialRange: number;
  fcCost: number;
  automated: boolean;
  forPattern: boolean;
  bladeType: string;
  bestUse: string;
}

const DATA: Record<FabricCutterType, FabricCutterData> = {
  straight_knife: {
    cuttingSpeed: 7, layerCapacity: 9, cutAccuracy: 6, materialRange: 8, fcCost: 3,
    automated: false, forPattern: false,
    bladeType: "vertical_reciprocating_blade_6_to_13_inch_hand_guided",
    bestUse: "garment_factory_high_ply_spread_straight_cut_bulk_cutting",
  },
  round_knife: {
    cuttingSpeed: 8, layerCapacity: 5, cutAccuracy: 5, materialRange: 7, fcCost: 2,
    automated: false, forPattern: false,
    bladeType: "circular_rotating_blade_hand_held_lightweight_curve_cut",
    bestUse: "single_ply_sample_room_small_run_curved_cut_lightweight",
  },
  band_knife: {
    cuttingSpeed: 6, layerCapacity: 7, cutAccuracy: 8, materialRange: 8, fcCost: 4,
    automated: false, forPattern: true,
    bladeType: "continuous_loop_blade_fixed_table_guide_fabric_to_blade",
    bestUse: "intricate_notch_curve_collar_cuff_detail_cut_precision",
  },
  die_press: {
    cuttingSpeed: 9, layerCapacity: 8, cutAccuracy: 9, materialRange: 6, fcCost: 7,
    automated: true, forPattern: true,
    bladeType: "steel_rule_die_hydraulic_press_stamp_cut_repeat_shape",
    bestUse: "shoe_component_leather_goods_repeat_shape_high_volume_stamp",
  },
  cnc_auto_cutter: {
    cuttingSpeed: 10, layerCapacity: 6, cutAccuracy: 10, materialRange: 10, fcCost: 10,
    automated: true, forPattern: true,
    bladeType: "oscillating_knife_laser_ultrasonic_cnc_gantry_vacuum_table",
    bestUse: "automotive_interior_aerospace_composite_cad_cam_nesting",
  },
};

function get(t: FabricCutterType): FabricCutterData {
  return DATA[t];
}

export const cuttingSpeed = (t: FabricCutterType) => get(t).cuttingSpeed;
export const layerCapacity = (t: FabricCutterType) => get(t).layerCapacity;
export const cutAccuracy = (t: FabricCutterType) => get(t).cutAccuracy;
export const materialRange = (t: FabricCutterType) => get(t).materialRange;
export const fcCost = (t: FabricCutterType) => get(t).fcCost;
export const automated = (t: FabricCutterType) => get(t).automated;
export const forPattern = (t: FabricCutterType) => get(t).forPattern;
export const bladeType = (t: FabricCutterType) => get(t).bladeType;
export const bestUse = (t: FabricCutterType) => get(t).bestUse;
export const fabricCutterTypes = (): FabricCutterType[] =>
  Object.keys(DATA) as FabricCutterType[];

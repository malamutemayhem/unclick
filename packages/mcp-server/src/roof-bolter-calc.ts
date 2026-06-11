export type RoofBolterType =
  | "single_boom_manual"
  | "dual_boom_auto"
  | "continuous_bolter"
  | "cable_bolt_rig"
  | "resin_cartridge";

interface RoofBolterData {
  boltSpeed: number;
  drillAccuracy: number;
  reachHeight: number;
  safetyRating: number;
  rbCost_: number;
  automated: boolean;
  forLonghole: boolean;
  bolterConfig: string;
  bestUse: string;
}

const DATA: Record<RoofBolterType, RoofBolterData> = {
  single_boom_manual: {
    boltSpeed: 5, drillAccuracy: 7, reachHeight: 6, safetyRating: 5, rbCost_: 3,
    automated: false, forLonghole: false,
    bolterConfig: "single_drill_boom_manual_position_hand_feed_bolt_plate_torque",
    bestUse: "small_mine_development_heading_manual_single_bolt_installation",
  },
  dual_boom_auto: {
    boltSpeed: 9, drillAccuracy: 9, reachHeight: 8, safetyRating: 9, rbCost_: 8,
    automated: true, forLonghole: false,
    bolterConfig: "dual_boom_auto_drill_feed_bolt_insert_torque_canopy_protected",
    bestUse: "production_longwall_gate_road_fast_dual_bolt_canopy_protected",
  },
  continuous_bolter: {
    boltSpeed: 10, drillAccuracy: 8, reachHeight: 7, safetyRating: 10, rbCost_: 10,
    automated: true, forLonghole: false,
    bolterConfig: "miner_bolter_combo_continuous_mine_bolt_simultaneous_advance",
    bestUse: "continuous_miner_bolter_combo_mine_and_bolt_without_stopping",
  },
  cable_bolt_rig: {
    boltSpeed: 4, drillAccuracy: 8, reachHeight: 10, safetyRating: 7, rbCost_: 7,
    automated: false, forLonghole: true,
    bolterConfig: "long_hole_cable_bolt_grouted_strand_deep_anchor_high_stress",
    bestUse: "high_stress_ground_cable_bolt_deep_anchor_intersection_support",
  },
  resin_cartridge: {
    boltSpeed: 7, drillAccuracy: 7, reachHeight: 7, safetyRating: 8, rbCost_: 5,
    automated: false, forLonghole: false,
    bolterConfig: "resin_cartridge_spin_to_mix_fast_set_full_column_anchor_bolt",
    bestUse: "standard_coal_mine_resin_bolt_fast_set_full_column_anchorage",
  },
};

function get(t: RoofBolterType): RoofBolterData {
  return DATA[t];
}

export const boltSpeed = (t: RoofBolterType) => get(t).boltSpeed;
export const drillAccuracy = (t: RoofBolterType) => get(t).drillAccuracy;
export const reachHeight = (t: RoofBolterType) => get(t).reachHeight;
export const safetyRating = (t: RoofBolterType) => get(t).safetyRating;
export const rbCost_ = (t: RoofBolterType) => get(t).rbCost_;
export const automated = (t: RoofBolterType) => get(t).automated;
export const forLonghole = (t: RoofBolterType) => get(t).forLonghole;
export const bolterConfig = (t: RoofBolterType) => get(t).bolterConfig;
export const bestUse = (t: RoofBolterType) => get(t).bestUse;
export const roofBolterTypes = (): RoofBolterType[] =>
  Object.keys(DATA) as RoofBolterType[];

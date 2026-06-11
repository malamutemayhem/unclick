export type AnchorWindlassType =
  | "hydraulic_vertical"
  | "hydraulic_horizontal"
  | "electric_vertical"
  | "electric_horizontal"
  | "combined_mooring";

interface AnchorWindlassData {
  pullForce: number;
  speed: number;
  reliability: number;
  noiseLevel: number;
  awCost: number;
  hydraulic: boolean;
  forDeepWater: boolean;
  drive: string;
  bestUse: string;
}

const DATA: Record<AnchorWindlassType, AnchorWindlassData> = {
  hydraulic_vertical: {
    pullForce: 9, speed: 7, reliability: 9, noiseLevel: 6, awCost: 8,
    hydraulic: true, forDeepWater: true,
    drive: "hydraulic_motor_vertical_shaft_wildcat_gypsy_chain_cable",
    bestUse: "large_vessel_tanker_bulk_carrier_deep_anchor_heavy_chain",
  },
  hydraulic_horizontal: {
    pullForce: 10, speed: 7, reliability: 9, noiseLevel: 5, awCost: 9,
    hydraulic: true, forDeepWater: true,
    drive: "hydraulic_motor_horizontal_shaft_warping_drum_integrated",
    bestUse: "vlcc_container_ship_combined_anchor_mooring_deck_layout",
  },
  electric_vertical: {
    pullForce: 7, speed: 8, reliability: 7, noiseLevel: 8, awCost: 6,
    hydraulic: false, forDeepWater: false,
    drive: "electric_motor_vertical_shaft_brake_band_chain_stopper",
    bestUse: "medium_vessel_ferry_yacht_quiet_operation_low_maintenance",
  },
  electric_horizontal: {
    pullForce: 6, speed: 9, reliability: 7, noiseLevel: 7, awCost: 5,
    hydraulic: false, forDeepWater: false,
    drive: "electric_motor_horizontal_shaft_worm_gear_compact_design",
    bestUse: "small_vessel_patrol_boat_workboat_simple_install_compact",
  },
  combined_mooring: {
    pullForce: 8, speed: 6, reliability: 8, noiseLevel: 6, awCost: 10,
    hydraulic: true, forDeepWater: true,
    drive: "hydraulic_combined_windlass_mooring_winch_split_drum_unit",
    bestUse: "offshore_supply_vessel_dual_function_anchor_mooring_combo",
  },
};

function get(t: AnchorWindlassType): AnchorWindlassData {
  return DATA[t];
}

export const pullForce = (t: AnchorWindlassType) => get(t).pullForce;
export const speed = (t: AnchorWindlassType) => get(t).speed;
export const reliability = (t: AnchorWindlassType) => get(t).reliability;
export const noiseLevel = (t: AnchorWindlassType) => get(t).noiseLevel;
export const awCost = (t: AnchorWindlassType) => get(t).awCost;
export const hydraulic = (t: AnchorWindlassType) => get(t).hydraulic;
export const forDeepWater = (t: AnchorWindlassType) => get(t).forDeepWater;
export const drive = (t: AnchorWindlassType) => get(t).drive;
export const bestUse = (t: AnchorWindlassType) => get(t).bestUse;
export const anchorWindlassTypes = (): AnchorWindlassType[] =>
  Object.keys(DATA) as AnchorWindlassType[];

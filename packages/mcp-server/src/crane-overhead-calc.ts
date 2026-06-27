export type CraneOverheadType =
  | "single_girder_under"
  | "double_girder_top"
  | "gantry_full_portal"
  | "semi_gantry_wall"
  | "jib_pillar_mount";

interface CraneOverheadData {
  capacity: number;
  span: number;
  hookHeight: number;
  precision: number;
  coCost: number;
  motorized: boolean;
  forHeavyDuty: boolean;
  config: string;
  bestUse: string;
}

const DATA: Record<CraneOverheadType, CraneOverheadData> = {
  single_girder_under: {
    capacity: 5, span: 7, hookHeight: 6, precision: 7, coCost: 4,
    motorized: true, forHeavyDuty: false,
    config: "single_i_beam_girder_underslung_hoist_trolley",
    bestUse: "light_manufacturing_warehouse_general_lifting",
  },
  double_girder_top: {
    capacity: 10, span: 9, hookHeight: 9, precision: 8, coCost: 8,
    motorized: true, forHeavyDuty: true,
    config: "dual_box_girder_top_running_crab_hoist",
    bestUse: "steel_mill_heavy_machine_shop_foundry_duty",
  },
  gantry_full_portal: {
    capacity: 10, span: 10, hookHeight: 8, precision: 6, coCost: 9,
    motorized: true, forHeavyDuty: true,
    config: "self_supporting_portal_frame_rail_mounted_legs",
    bestUse: "shipyard_container_yard_outdoor_heavy_lift",
  },
  semi_gantry_wall: {
    capacity: 7, span: 8, hookHeight: 7, precision: 7, coCost: 6,
    motorized: true, forHeavyDuty: false,
    config: "one_leg_one_runway_wall_or_column_supported",
    bestUse: "building_side_loading_dock_partial_coverage",
  },
  jib_pillar_mount: {
    capacity: 3, span: 4, hookHeight: 5, precision: 9, coCost: 3,
    motorized: false, forHeavyDuty: false,
    config: "pillar_or_wall_mounted_swing_arm_jib_boom",
    bestUse: "workstation_machine_tool_loading_local_lift",
  },
};

function get(t: CraneOverheadType): CraneOverheadData {
  return DATA[t];
}

export const capacity = (t: CraneOverheadType) => get(t).capacity;
export const span = (t: CraneOverheadType) => get(t).span;
export const hookHeight = (t: CraneOverheadType) => get(t).hookHeight;
export const precision = (t: CraneOverheadType) => get(t).precision;
export const coCost = (t: CraneOverheadType) => get(t).coCost;
export const motorized = (t: CraneOverheadType) => get(t).motorized;
export const forHeavyDuty = (t: CraneOverheadType) => get(t).forHeavyDuty;
export const config = (t: CraneOverheadType) => get(t).config;
export const bestUse = (t: CraneOverheadType) => get(t).bestUse;
export const craneOverheadTypes = (): CraneOverheadType[] =>
  Object.keys(DATA) as CraneOverheadType[];

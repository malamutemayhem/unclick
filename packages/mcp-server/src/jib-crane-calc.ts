export type JibCraneType =
  | "wall_mounted"
  | "floor_mounted_pillar"
  | "mast_type"
  | "articulating"
  | "portable_gantry";

interface JibCraneData {
  liftCapacity: number;
  reach: number;
  rotation: number;
  installation: number;
  jcCost: number;
  freestanding: boolean;
  forWorkstation: boolean;
  boom: string;
  bestUse: string;
}

const DATA: Record<JibCraneType, JibCraneData> = {
  wall_mounted: {
    liftCapacity: 5, reach: 6, rotation: 5, installation: 7, jcCost: 4,
    freestanding: false, forWorkstation: true,
    boom: "wall_bracket_cantilever_arm_200_degree_sweep_chain_hoist",
    bestUse: "workstation_machine_tool_loading_wall_support_limited_area",
  },
  floor_mounted_pillar: {
    liftCapacity: 7, reach: 8, rotation: 8, installation: 6, jcCost: 6,
    freestanding: true, forWorkstation: true,
    boom: "steel_pillar_base_plate_bolt_down_360_rotation_wire_hoist",
    bestUse: "loading_dock_machine_center_floor_mounted_full_rotation",
  },
  mast_type: {
    liftCapacity: 8, reach: 9, rotation: 9, installation: 5, jcCost: 7,
    freestanding: true, forWorkstation: false,
    boom: "mast_column_tie_rod_supported_heavy_duty_full_rotation",
    bestUse: "outdoor_yard_heavy_workshop_large_reach_column_supported",
  },
  articulating: {
    liftCapacity: 3, reach: 7, rotation: 7, installation: 8, jcCost: 5,
    freestanding: false, forWorkstation: true,
    boom: "multi_joint_arm_knuckle_fold_reach_around_obstacle_manual",
    bestUse: "ergonomic_assist_assembly_task_reach_around_machine_guard",
  },
  portable_gantry: {
    liftCapacity: 6, reach: 6, rotation: 3, installation: 10, jcCost: 4,
    freestanding: true, forWorkstation: false,
    boom: "aluminum_frame_caster_wheel_adjustable_height_knock_down",
    bestUse: "maintenance_shop_field_service_portable_temporary_lift",
  },
};

function get(t: JibCraneType): JibCraneData {
  return DATA[t];
}

export const liftCapacity = (t: JibCraneType) => get(t).liftCapacity;
export const reach = (t: JibCraneType) => get(t).reach;
export const rotation = (t: JibCraneType) => get(t).rotation;
export const installation = (t: JibCraneType) => get(t).installation;
export const jcCost = (t: JibCraneType) => get(t).jcCost;
export const freestanding = (t: JibCraneType) => get(t).freestanding;
export const forWorkstation = (t: JibCraneType) => get(t).forWorkstation;
export const boom = (t: JibCraneType) => get(t).boom;
export const bestUse = (t: JibCraneType) => get(t).bestUse;
export const jibCraneTypes = (): JibCraneType[] =>
  Object.keys(DATA) as JibCraneType[];

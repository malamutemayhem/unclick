export type GantryCraneType =
  | "full_gantry_rail"
  | "semi_gantry"
  | "rubber_tired_rtg"
  | "ship_to_shore"
  | "portable_aluminum";

interface GantryCraneData {
  liftCapacity: number;
  span: number;
  liftSpeed: number;
  mobility: number;
  gcCost: number;
  selfPropelled: boolean;
  forContainer: boolean;
  structure: string;
  bestUse: string;
}

const DATA: Record<GantryCraneType, GantryCraneData> = {
  full_gantry_rail: {
    liftCapacity: 9, span: 9, liftSpeed: 8, mobility: 4, gcCost: 8,
    selfPropelled: true, forContainer: false,
    structure: "a_frame_legs_both_sides_rail_mounted_travel_full_span_bridge",
    bestUse: "shipyard_steel_yard_precast_yard_heavy_lift_outdoor_rail",
  },
  semi_gantry: {
    liftCapacity: 7, span: 7, liftSpeed: 7, mobility: 5, gcCost: 6,
    selfPropelled: true, forContainer: false,
    structure: "one_leg_floor_rail_one_side_wall_bracket_runway_hybrid",
    bestUse: "factory_bay_loading_dock_one_wall_mount_one_floor_rail",
  },
  rubber_tired_rtg: {
    liftCapacity: 8, span: 8, liftSpeed: 8, mobility: 9, gcCost: 9,
    selfPropelled: true, forContainer: true,
    structure: "rubber_tire_wheel_straddle_container_stack_diesel_electric",
    bestUse: "container_terminal_yard_stacking_intermodal_port_handling",
  },
  ship_to_shore: {
    liftCapacity: 10, span: 10, liftSpeed: 9, mobility: 3, gcCost: 10,
    selfPropelled: true, forContainer: true,
    structure: "quay_crane_cantilever_boom_reach_over_vessel_trolley_hoist",
    bestUse: "deep_water_port_container_vessel_loading_unloading_quayside",
  },
  portable_aluminum: {
    liftCapacity: 4, span: 4, liftSpeed: 5, mobility: 10, gcCost: 3,
    selfPropelled: false, forContainer: false,
    structure: "lightweight_aluminum_a_frame_caster_wheel_knockdown_portable",
    bestUse: "workshop_maintenance_bay_temporary_lift_engine_hoist_light",
  },
};

function get(t: GantryCraneType): GantryCraneData {
  return DATA[t];
}

export const liftCapacity = (t: GantryCraneType) => get(t).liftCapacity;
export const span = (t: GantryCraneType) => get(t).span;
export const liftSpeed = (t: GantryCraneType) => get(t).liftSpeed;
export const mobility = (t: GantryCraneType) => get(t).mobility;
export const gcCost = (t: GantryCraneType) => get(t).gcCost;
export const selfPropelled = (t: GantryCraneType) => get(t).selfPropelled;
export const forContainer = (t: GantryCraneType) => get(t).forContainer;
export const structure = (t: GantryCraneType) => get(t).structure;
export const bestUse = (t: GantryCraneType) => get(t).bestUse;
export const gantryCraneTypes = (): GantryCraneType[] =>
  Object.keys(DATA) as GantryCraneType[];

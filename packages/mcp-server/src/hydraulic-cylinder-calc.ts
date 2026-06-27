export type HydraulicCylinderType =
  | "double_acting_tie_rod"
  | "single_acting_plunger"
  | "telescopic_multi_stage"
  | "mill_duty_heavy_forge"
  | "servo_hydraulic_closed";

interface HydraulicCylinderData {
  force: number;
  speed: number;
  precision: number;
  durability: number;
  hcCost: number;
  singleActing: boolean;
  forPress: boolean;
  seal: string;
  bestUse: string;
}

const DATA: Record<HydraulicCylinderType, HydraulicCylinderData> = {
  double_acting_tie_rod: {
    force: 8, speed: 8, precision: 7, durability: 8, hcCost: 5,
    singleActing: false, forPress: false,
    seal: "nitrile_piston_rod_wiper_set",
    bestUse: "general_clamp_lift_tilt_mobile",
  },
  single_acting_plunger: {
    force: 9, speed: 6, precision: 5, durability: 9, hcCost: 4,
    singleActing: true, forPress: true,
    seal: "vee_packing_gravity_spring_ret",
    bestUse: "hydraulic_press_jack_lift_table",
  },
  telescopic_multi_stage: {
    force: 7, speed: 5, precision: 4, durability: 7, hcCost: 8,
    singleActing: true, forPress: false,
    seal: "polyurethane_multi_stage_wiper",
    bestUse: "dump_truck_crane_boom_compact",
  },
  mill_duty_heavy_forge: {
    force: 10, speed: 7, precision: 6, durability: 10, hcCost: 9,
    singleActing: false, forPress: true,
    seal: "bronze_filled_ptfe_heavy_duty",
    bestUse: "steel_mill_forge_press_continuous",
  },
  servo_hydraulic_closed: {
    force: 9, speed: 9, precision: 10, durability: 8, hcCost: 10,
    singleActing: false, forPress: false,
    seal: "low_friction_ptfe_servo_grade",
    bestUse: "test_rig_fatigue_motion_simulate",
  },
};

function get(t: HydraulicCylinderType): HydraulicCylinderData {
  return DATA[t];
}

export const force = (t: HydraulicCylinderType) => get(t).force;
export const speed = (t: HydraulicCylinderType) => get(t).speed;
export const precision = (t: HydraulicCylinderType) => get(t).precision;
export const durability = (t: HydraulicCylinderType) => get(t).durability;
export const hcCost = (t: HydraulicCylinderType) => get(t).hcCost;
export const singleActing = (t: HydraulicCylinderType) => get(t).singleActing;
export const forPress = (t: HydraulicCylinderType) => get(t).forPress;
export const seal = (t: HydraulicCylinderType) => get(t).seal;
export const bestUse = (t: HydraulicCylinderType) => get(t).bestUse;
export const hydraulicCylinderTypes = (): HydraulicCylinderType[] =>
  Object.keys(DATA) as HydraulicCylinderType[];

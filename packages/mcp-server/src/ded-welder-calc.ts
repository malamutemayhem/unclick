export type DedWelderType =
  | "laser_powder_ded"
  | "laser_wire_ded"
  | "arc_wire_ded"
  | "plasma_arc_ded"
  | "hybrid_ded_mill";

interface DedWelderData {
  depositionRate: number;
  throughput: number;
  surfaceFinish: number;
  materialEfficiency: number;
  ddCost: number;
  nearNetShape: boolean;
  forRepair: boolean;
  welderConfig: string;
  bestUse: string;
}

const DATA: Record<DedWelderType, DedWelderData> = {
  laser_powder_ded: {
    depositionRate: 6, throughput: 6, surfaceFinish: 7, materialEfficiency: 5, ddCost: 8,
    nearNetShape: true, forRepair: true,
    welderConfig: "laser_powder_ded_welder_coaxial_nozzle_powder_stream_laser_melt",
    bestUse: "turbine_tip_repair_laser_powder_ded_welder_clad_restore_blade",
  },
  laser_wire_ded: {
    depositionRate: 7, throughput: 7, surfaceFinish: 7, materialEfficiency: 9, ddCost: 8,
    nearNetShape: true, forRepair: true,
    welderConfig: "laser_wire_ded_welder_wire_feed_laser_spot_high_capture_rate",
    bestUse: "feature_add_laser_wire_ded_welder_boss_flange_on_existing_part",
  },
  arc_wire_ded: {
    depositionRate: 9, throughput: 9, surfaceFinish: 4, materialEfficiency: 9, ddCost: 5,
    nearNetShape: false, forRepair: false,
    welderConfig: "arc_wire_ded_welder_gmaw_torch_robot_arm_large_deposit_fast",
    bestUse: "large_preform_arc_wire_ded_welder_steel_wall_near_net_machine",
  },
  plasma_arc_ded: {
    depositionRate: 8, throughput: 8, surfaceFinish: 5, materialEfficiency: 7, ddCost: 6,
    nearNetShape: false, forRepair: true,
    welderConfig: "plasma_arc_ded_welder_transferred_arc_powder_feed_high_energy",
    bestUse: "hardfacing_overlay_plasma_arc_ded_welder_stellite_wear_surface",
  },
  hybrid_ded_mill: {
    depositionRate: 5, throughput: 5, surfaceFinish: 9, materialEfficiency: 7, ddCost: 9,
    nearNetShape: true, forRepair: true,
    welderConfig: "hybrid_ded_mill_welder_laser_deposit_then_cnc_mill_same_setup",
    bestUse: "mold_repair_hybrid_ded_mill_welder_deposit_machine_one_setup",
  },
};

function get(t: DedWelderType): DedWelderData {
  return DATA[t];
}

export const depositionRate = (t: DedWelderType) => get(t).depositionRate;
export const throughput = (t: DedWelderType) => get(t).throughput;
export const surfaceFinish = (t: DedWelderType) => get(t).surfaceFinish;
export const materialEfficiency = (t: DedWelderType) => get(t).materialEfficiency;
export const ddCost = (t: DedWelderType) => get(t).ddCost;
export const nearNetShape = (t: DedWelderType) => get(t).nearNetShape;
export const forRepair = (t: DedWelderType) => get(t).forRepair;
export const welderConfig = (t: DedWelderType) => get(t).welderConfig;
export const bestUse = (t: DedWelderType) => get(t).bestUse;
export const dedWelderTypes = (): DedWelderType[] =>
  Object.keys(DATA) as DedWelderType[];

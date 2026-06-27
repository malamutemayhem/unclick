export type IndustrialRobotType =
  | "articulated_6_axis"
  | "palletizing_4_axis"
  | "painting_explosion_proof"
  | "welding_arc_spot"
  | "heavy_payload_foundry";

interface IndustrialRobotData {
  payload: number;
  reach: number;
  speed: number;
  repeatability: number;
  irCost: number;
  sixAxis: boolean;
  forHazardous: boolean;
  kinematics: string;
  bestUse: string;
}

const DATA: Record<IndustrialRobotType, IndustrialRobotData> = {
  articulated_6_axis: {
    payload: 7, reach: 8, speed: 8, repeatability: 9, irCost: 7,
    sixAxis: true, forHazardous: false,
    kinematics: "six_revolute_joints_serial_chain_spherical_wrist",
    bestUse: "general_assembly_machine_tending_material_handling",
  },
  palletizing_4_axis: {
    payload: 9, reach: 9, speed: 9, repeatability: 7, irCost: 6,
    sixAxis: false, forHazardous: false,
    kinematics: "four_axis_parallelogram_linkage_end_of_line_pack",
    bestUse: "end_of_line_case_packing_bag_palletizing_depal",
  },
  painting_explosion_proof: {
    payload: 4, reach: 8, speed: 7, repeatability: 8, irCost: 9,
    sixAxis: true, forHazardous: true,
    kinematics: "hollow_wrist_intrinsically_safe_atex_certified",
    bestUse: "automotive_paint_booth_spray_coating_hazardous_atmo",
  },
  welding_arc_spot: {
    payload: 5, reach: 7, speed: 7, repeatability: 10, irCost: 7,
    sixAxis: true, forHazardous: false,
    kinematics: "hollow_upper_arm_torch_cable_through_arm_routing",
    bestUse: "automotive_body_shop_arc_welding_spot_welding_cell",
  },
  heavy_payload_foundry: {
    payload: 10, reach: 10, speed: 5, repeatability: 7, irCost: 10,
    sixAxis: true, forHazardous: true,
    kinematics: "heavy_duty_gear_high_ip_rating_foundry_washdown",
    bestUse: "foundry_forging_heavy_part_handling_harsh_environment",
  },
};

function get(t: IndustrialRobotType): IndustrialRobotData {
  return DATA[t];
}

export const payload = (t: IndustrialRobotType) => get(t).payload;
export const reach = (t: IndustrialRobotType) => get(t).reach;
export const speed = (t: IndustrialRobotType) => get(t).speed;
export const repeatability = (t: IndustrialRobotType) => get(t).repeatability;
export const irCost = (t: IndustrialRobotType) => get(t).irCost;
export const sixAxis = (t: IndustrialRobotType) => get(t).sixAxis;
export const forHazardous = (t: IndustrialRobotType) => get(t).forHazardous;
export const kinematics = (t: IndustrialRobotType) => get(t).kinematics;
export const bestUse = (t: IndustrialRobotType) => get(t).bestUse;
export const industrialRobotTypes = (): IndustrialRobotType[] =>
  Object.keys(DATA) as IndustrialRobotType[];

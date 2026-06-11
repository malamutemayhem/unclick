export type MotionControllerType =
  | "standalone_multi_axis"
  | "plc_integrated_motion"
  | "pc_based_soft_motion"
  | "robot_controller_teach"
  | "cnc_controller_gcode";

interface MotionControllerData {
  axisCount: number;
  interpolation: number;
  programmability: number;
  realTime: number;
  mcCost: number;
  pcBased: boolean;
  forCnc: boolean;
  architecture: string;
  bestUse: string;
}

const DATA: Record<MotionControllerType, MotionControllerData> = {
  standalone_multi_axis: {
    axisCount: 8, interpolation: 8, programmability: 7, realTime: 9, mcCost: 7,
    pcBased: false, forCnc: false,
    architecture: "dedicated_dsp_processor_ethercat_or_sercos_bus",
    bestUse: "packaging_machine_web_converting_coordinated_axes",
  },
  plc_integrated_motion: {
    axisCount: 6, interpolation: 7, programmability: 8, realTime: 8, mcCost: 6,
    pcBased: false, forCnc: false,
    architecture: "plc_cpu_with_motion_function_blocks_plcopen_std",
    bestUse: "assembly_line_pick_place_conveyor_synchronization",
  },
  pc_based_soft_motion: {
    axisCount: 10, interpolation: 9, programmability: 10, realTime: 7, mcCost: 8,
    pcBased: true, forCnc: true,
    architecture: "industrial_pc_real_time_os_ethercat_master_soft",
    bestUse: "complex_machine_vision_integrated_flexible_custom",
  },
  robot_controller_teach: {
    axisCount: 6, interpolation: 9, programmability: 6, realTime: 9, mcCost: 9,
    pcBased: false, forCnc: false,
    architecture: "proprietary_teach_pendant_point_to_point_path",
    bestUse: "robotic_welding_painting_assembly_teach_and_play",
  },
  cnc_controller_gcode: {
    axisCount: 5, interpolation: 10, programmability: 7, realTime: 10, mcCost: 8,
    pcBased: false, forCnc: true,
    architecture: "dedicated_cnc_cpu_g_m_code_interpreter_look_ahead",
    bestUse: "milling_turning_grinding_machine_tool_path_control",
  },
};

function get(t: MotionControllerType): MotionControllerData {
  return DATA[t];
}

export const axisCount = (t: MotionControllerType) => get(t).axisCount;
export const interpolation = (t: MotionControllerType) => get(t).interpolation;
export const programmability = (t: MotionControllerType) => get(t).programmability;
export const realTime = (t: MotionControllerType) => get(t).realTime;
export const mcCost = (t: MotionControllerType) => get(t).mcCost;
export const pcBased = (t: MotionControllerType) => get(t).pcBased;
export const forCnc = (t: MotionControllerType) => get(t).forCnc;
export const architecture = (t: MotionControllerType) => get(t).architecture;
export const bestUse = (t: MotionControllerType) => get(t).bestUse;
export const motionControllerTypes = (): MotionControllerType[] =>
  Object.keys(DATA) as MotionControllerType[];

export type PlcSystemType =
  | "compact_micro_plc"
  | "modular_rack_mount"
  | "safety_plc_sil3"
  | "pac_programmable_auto"
  | "soft_plc_pc_based";

interface PlcSystemData {
  ioCapacity: number;
  processingSpeed: number;
  reliability: number;
  expandability: number;
  plCost_: number;
  safetyRated: boolean;
  forLargeSystem: boolean;
  architecture: string;
  bestUse: string;
}

const DATA: Record<PlcSystemType, PlcSystemData> = {
  compact_micro_plc: {
    ioCapacity: 3, processingSpeed: 6, reliability: 7, expandability: 3, plCost_: 2,
    safetyRated: false, forLargeSystem: false,
    architecture: "integrated_cpu_io_fixed_point_small_footprint",
    bestUse: "small_machine_packaging_simple_conveyor_control",
  },
  modular_rack_mount: {
    ioCapacity: 9, processingSpeed: 9, reliability: 9, expandability: 10, plCost_: 7,
    safetyRated: false, forLargeSystem: true,
    architecture: "backplane_rack_cpu_io_modules_remote_io_network",
    bestUse: "process_plant_large_factory_distributed_io_control",
  },
  safety_plc_sil3: {
    ioCapacity: 7, processingSpeed: 8, reliability: 10, expandability: 7, plCost_: 9,
    safetyRated: true, forLargeSystem: true,
    architecture: "redundant_cpu_voted_logic_certified_sil3_iec61508",
    bestUse: "emergency_shutdown_burner_management_safety_critical",
  },
  pac_programmable_auto: {
    ioCapacity: 8, processingSpeed: 10, reliability: 8, expandability: 9, plCost_: 8,
    safetyRated: false, forLargeSystem: true,
    architecture: "multi_domain_controller_plc_motion_process_hmi",
    bestUse: "hybrid_manufacturing_motion_and_process_combined",
  },
  soft_plc_pc_based: {
    ioCapacity: 8, processingSpeed: 10, reliability: 6, expandability: 8, plCost_: 5,
    safetyRated: false, forLargeSystem: false,
    architecture: "industrial_pc_real_time_os_ethercat_fieldbus_io",
    bestUse: "cnc_machine_high_speed_motion_data_logging_vision",
  },
};

function get(t: PlcSystemType): PlcSystemData {
  return DATA[t];
}

export const ioCapacity = (t: PlcSystemType) => get(t).ioCapacity;
export const processingSpeed = (t: PlcSystemType) => get(t).processingSpeed;
export const reliability = (t: PlcSystemType) => get(t).reliability;
export const expandability = (t: PlcSystemType) => get(t).expandability;
export const plCost_ = (t: PlcSystemType) => get(t).plCost_;
export const safetyRated = (t: PlcSystemType) => get(t).safetyRated;
export const forLargeSystem = (t: PlcSystemType) => get(t).forLargeSystem;
export const architecture = (t: PlcSystemType) => get(t).architecture;
export const bestUse = (t: PlcSystemType) => get(t).bestUse;
export const plcSystemTypes = (): PlcSystemType[] =>
  Object.keys(DATA) as PlcSystemType[];

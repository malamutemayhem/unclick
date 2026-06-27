export type PlcType =
  | "compact_micro_plc"
  | "modular_rack_plc"
  | "safety_sil3_plc"
  | "soft_plc_ipc"
  | "nano_relay_plc";

const DATA: Record<PlcType, {
  ioCapacity: number; scanSpeed: number; reliability: number;
  expansion: number; plcCost: number; safetyRated: boolean;
  forMotion: boolean; programming: string; bestUse: string;
}> = {
  compact_micro_plc: {
    ioCapacity: 4, scanSpeed: 6, reliability: 7,
    expansion: 4, plcCost: 3, safetyRated: false,
    forMotion: false, programming: "ladder_function_block",
    bestUse: "small_machine_oem",
  },
  modular_rack_plc: {
    ioCapacity: 9, scanSpeed: 8, reliability: 9,
    expansion: 9, plcCost: 7, safetyRated: false,
    forMotion: true, programming: "iec_61131_all_five",
    bestUse: "factory_line_control",
  },
  safety_sil3_plc: {
    ioCapacity: 7, scanSpeed: 7, reliability: 10,
    expansion: 7, plcCost: 9, safetyRated: true,
    forMotion: false, programming: "safe_ladder_certified",
    bestUse: "emergency_shutdown_system",
  },
  soft_plc_ipc: {
    ioCapacity: 8, scanSpeed: 9, reliability: 6,
    expansion: 8, plcCost: 6, safetyRated: false,
    forMotion: true, programming: "c_cpp_codesys",
    bestUse: "high_speed_cnc_robot",
  },
  nano_relay_plc: {
    ioCapacity: 2, scanSpeed: 4, reliability: 7,
    expansion: 2, plcCost: 1, safetyRated: false,
    forMotion: false, programming: "simple_relay_logic",
    bestUse: "hvac_lighting_basic",
  },
};

const get = (t: PlcType) => DATA[t];

export const ioCapacity = (t: PlcType) => get(t).ioCapacity;
export const scanSpeed = (t: PlcType) => get(t).scanSpeed;
export const reliability = (t: PlcType) => get(t).reliability;
export const expansion = (t: PlcType) => get(t).expansion;
export const plcCost = (t: PlcType) => get(t).plcCost;
export const safetyRated = (t: PlcType) => get(t).safetyRated;
export const forMotion = (t: PlcType) => get(t).forMotion;
export const programming = (t: PlcType) => get(t).programming;
export const bestUse = (t: PlcType) => get(t).bestUse;
export const plcTypes = (): PlcType[] => Object.keys(DATA) as PlcType[];

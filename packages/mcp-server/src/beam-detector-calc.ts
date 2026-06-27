export type BeamDetectorType =
  | "conventional_reflective"
  | "addressable_motorized"
  | "linear_heat_fiber"
  | "projected_beam_long_range"
  | "open_path_ir_gas";

interface BeamDetectorData {
  range: number;
  sensitivity: number;
  maintenance: number;
  falseAlarm: number;
  bdCost: number;
  selfAligning: boolean;
  forHighCeiling: boolean;
  optics: string;
  bestUse: string;
}

const DATA: Record<BeamDetectorType, BeamDetectorData> = {
  conventional_reflective: {
    range: 6, sensitivity: 7, maintenance: 7, falseAlarm: 6, bdCost: 4,
    selfAligning: false, forHighCeiling: true,
    optics: "ir_led_reflector_single_beam",
    bestUse: "warehouse_open_span_basic",
  },
  addressable_motorized: {
    range: 8, sensitivity: 9, maintenance: 9, falseAlarm: 8, bdCost: 8,
    selfAligning: true, forHighCeiling: true,
    optics: "motorized_ir_auto_align_dual",
    bestUse: "atrium_convention_center_smart",
  },
  linear_heat_fiber: {
    range: 10, sensitivity: 8, maintenance: 8, falseAlarm: 9, bdCost: 7,
    selfAligning: false, forHighCeiling: false,
    optics: "fiber_optic_raman_dts_cable",
    bestUse: "tunnel_conveyor_cable_tray",
  },
  projected_beam_long_range: {
    range: 10, sensitivity: 7, maintenance: 6, falseAlarm: 6, bdCost: 5,
    selfAligning: false, forHighCeiling: true,
    optics: "ir_transmitter_receiver_pair",
    bestUse: "large_warehouse_long_distance",
  },
  open_path_ir_gas: {
    range: 7, sensitivity: 10, maintenance: 7, falseAlarm: 8, bdCost: 10,
    selfAligning: true, forHighCeiling: false,
    optics: "tunable_ir_laser_gas_specific",
    bestUse: "petrochemical_gas_leak_detect",
  },
};

function get(t: BeamDetectorType): BeamDetectorData {
  return DATA[t];
}

export const range = (t: BeamDetectorType) => get(t).range;
export const sensitivity = (t: BeamDetectorType) => get(t).sensitivity;
export const maintenance = (t: BeamDetectorType) => get(t).maintenance;
export const falseAlarm = (t: BeamDetectorType) => get(t).falseAlarm;
export const bdCost = (t: BeamDetectorType) => get(t).bdCost;
export const selfAligning = (t: BeamDetectorType) => get(t).selfAligning;
export const forHighCeiling = (t: BeamDetectorType) => get(t).forHighCeiling;
export const optics = (t: BeamDetectorType) => get(t).optics;
export const bestUse = (t: BeamDetectorType) => get(t).bestUse;
export const beamDetectorTypes = (): BeamDetectorType[] =>
  Object.keys(DATA) as BeamDetectorType[];

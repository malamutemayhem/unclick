export type DiodeLaserType =
  | "single_emitter"
  | "diode_bar"
  | "diode_stack"
  | "fiber_coupled_diode"
  | "vcsel_array";

interface DiodeLaserData {
  efficiency: number;
  throughput: number;
  brightness: number;
  lifetime: number;
  dlCost_: number;
  directDiode: boolean;
  forPumping: boolean;
  laserConfig: string;
  bestUse: string;
}

const DATA: Record<DiodeLaserType, DiodeLaserData> = {
  single_emitter: {
    efficiency: 9, throughput: 5, brightness: 9, lifetime: 9, dlCost_: 4,
    directDiode: true, forPumping: true,
    laserConfig: "single_emitter_diode_laser_edge_emit_diffraction_limited_seed",
    bestUse: "seed_source_single_emitter_diode_laser_master_oscillator_telecom",
  },
  diode_bar: {
    efficiency: 8, throughput: 8, brightness: 6, lifetime: 7, dlCost_: 6,
    directDiode: false, forPumping: true,
    laserConfig: "diode_bar_laser_linear_array_multi_emitter_high_power_pump_source",
    bestUse: "solid_state_pump_diode_bar_laser_high_power_side_pump_nd_yag",
  },
  diode_stack: {
    efficiency: 7, throughput: 9, brightness: 5, lifetime: 6, dlCost_: 8,
    directDiode: false, forPumping: true,
    laserConfig: "diode_stack_laser_vertical_bar_array_very_high_power_cw_or_qcw",
    bestUse: "surface_hardening_diode_stack_laser_very_high_power_area_heat",
  },
  fiber_coupled_diode: {
    efficiency: 8, throughput: 8, brightness: 8, lifetime: 8, dlCost_: 7,
    directDiode: true, forPumping: true,
    laserConfig: "fiber_coupled_diode_laser_pigtail_delivery_flexible_remote_head",
    bestUse: "plastic_weld_fiber_coupled_diode_laser_flexible_delivery_remote",
  },
  vcsel_array: {
    efficiency: 10, throughput: 7, brightness: 7, lifetime: 10, dlCost_: 5,
    directDiode: true, forPumping: false,
    laserConfig: "vcsel_array_diode_laser_surface_emit_circular_beam_test_on_wafer",
    bestUse: "3d_sensing_vcsel_array_diode_laser_lidar_face_id_structured_light",
  },
};

function get(t: DiodeLaserType): DiodeLaserData {
  return DATA[t];
}

export const efficiency = (t: DiodeLaserType) => get(t).efficiency;
export const throughput = (t: DiodeLaserType) => get(t).throughput;
export const brightness = (t: DiodeLaserType) => get(t).brightness;
export const lifetime = (t: DiodeLaserType) => get(t).lifetime;
export const dlCost_ = (t: DiodeLaserType) => get(t).dlCost_;
export const directDiode = (t: DiodeLaserType) => get(t).directDiode;
export const forPumping = (t: DiodeLaserType) => get(t).forPumping;
export const laserConfig = (t: DiodeLaserType) => get(t).laserConfig;
export const bestUse = (t: DiodeLaserType) => get(t).bestUse;
export const diodeLaserTypes = (): DiodeLaserType[] =>
  Object.keys(DATA) as DiodeLaserType[];

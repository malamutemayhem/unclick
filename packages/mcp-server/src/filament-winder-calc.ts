export type FilamentWinderType =
  | "helical_wind"
  | "polar_wind"
  | "hoop_wind"
  | "multi_axis_wind"
  | "towpreg_wind";

interface FilamentWinderData {
  fiberPlacement: number;
  throughput: number;
  angleControl: number;
  tensionControl: number;
  fwCost_: number;
  multiAxis: boolean;
  forPressureVessel: boolean;
  winderConfig: string;
  bestUse: string;
}

const DATA: Record<FilamentWinderType, FilamentWinderData> = {
  helical_wind: {
    fiberPlacement: 8, throughput: 8, angleControl: 8, tensionControl: 8, fwCost_: 6,
    multiAxis: false, forPressureVessel: true,
    winderConfig: "helical_filament_winder_carriage_traverse_mandrel_rotate_angle",
    bestUse: "rocket_motor_helical_filament_winder_carriage_traverse_angle",
  },
  polar_wind: {
    fiberPlacement: 7, throughput: 7, angleControl: 7, tensionControl: 7, fwCost_: 5,
    multiAxis: false, forPressureVessel: true,
    winderConfig: "polar_filament_winder_arm_rotate_over_pole_dome_end_closure",
    bestUse: "pressure_bottle_polar_filament_winder_arm_rotate_dome_closure",
  },
  hoop_wind: {
    fiberPlacement: 7, throughput: 9, angleControl: 6, tensionControl: 8, fwCost_: 4,
    multiAxis: false, forPressureVessel: false,
    winderConfig: "hoop_filament_winder_90_degree_circumferential_pipe_tube_ring",
    bestUse: "pipe_ring_hoop_filament_winder_90_degree_circumferential_wrap",
  },
  multi_axis_wind: {
    fiberPlacement: 10, throughput: 5, angleControl: 10, tensionControl: 10, fwCost_: 10,
    multiAxis: true, forPressureVessel: true,
    winderConfig: "multi_axis_filament_winder_6_axis_robot_complex_non_geodesic",
    bestUse: "aerospace_duct_multi_axis_filament_winder_robot_non_geodesic",
  },
  towpreg_wind: {
    fiberPlacement: 9, throughput: 7, angleControl: 9, tensionControl: 9, fwCost_: 8,
    multiAxis: false, forPressureVessel: true,
    winderConfig: "towpreg_filament_winder_pre_impregnate_tape_slit_lay_no_bath",
    bestUse: "hydrogen_tank_towpreg_filament_winder_pre_impregnate_tape_lay",
  },
};

function get(t: FilamentWinderType): FilamentWinderData {
  return DATA[t];
}

export const fiberPlacement = (t: FilamentWinderType) => get(t).fiberPlacement;
export const throughput = (t: FilamentWinderType) => get(t).throughput;
export const angleControl = (t: FilamentWinderType) => get(t).angleControl;
export const tensionControl = (t: FilamentWinderType) => get(t).tensionControl;
export const fwCost_ = (t: FilamentWinderType) => get(t).fwCost_;
export const multiAxis = (t: FilamentWinderType) => get(t).multiAxis;
export const forPressureVessel = (t: FilamentWinderType) => get(t).forPressureVessel;
export const winderConfig = (t: FilamentWinderType) => get(t).winderConfig;
export const bestUse = (t: FilamentWinderType) => get(t).bestUse;
export const filamentWinderTypes = (): FilamentWinderType[] =>
  Object.keys(DATA) as FilamentWinderType[];

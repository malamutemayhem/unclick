export type GasDetectType =
  | "catalytic_bead_lel"
  | "infrared_point_ndir"
  | "electrochemical_toxic"
  | "photoionization_voc"
  | "open_path_laser";

interface GasDetectData {
  sensitivity: number;
  range: number;
  selectivity: number;
  durability: number;
  gdCost: number;
  continuous: boolean;
  forExplosive: boolean;
  sensor: string;
  bestUse: string;
}

const DATA: Record<GasDetectType, GasDetectData> = {
  catalytic_bead_lel: {
    sensitivity: 7, range: 5, selectivity: 5, durability: 6, gdCost: 4,
    continuous: true, forExplosive: true,
    sensor: "catalytic_bead_wheatstone_bridge",
    bestUse: "boiler_room_gas_utility_space",
  },
  infrared_point_ndir: {
    sensitivity: 9, range: 6, selectivity: 8, durability: 9, gdCost: 7,
    continuous: true, forExplosive: true,
    sensor: "ndir_dual_wavelength_fail_safe",
    bestUse: "refinery_petrochemical_plant",
  },
  electrochemical_toxic: {
    sensitivity: 9, range: 7, selectivity: 9, durability: 5, gdCost: 5,
    continuous: true, forExplosive: false,
    sensor: "electrochemical_cell_ppm_toxic",
    bestUse: "parking_garage_co_no2_monitor",
  },
  photoionization_voc: {
    sensitivity: 10, range: 8, selectivity: 6, durability: 6, gdCost: 6,
    continuous: false, forExplosive: false,
    sensor: "uv_lamp_pid_broad_spectrum_voc",
    bestUse: "cleanroom_lab_solvent_monitor",
  },
  open_path_laser: {
    sensitivity: 8, range: 10, selectivity: 10, durability: 8, gdCost: 10,
    continuous: true, forExplosive: true,
    sensor: "tunable_diode_laser_open_path",
    bestUse: "lng_terminal_fence_line_perimeter",
  },
};

function get(t: GasDetectType): GasDetectData {
  return DATA[t];
}

export const sensitivity = (t: GasDetectType) => get(t).sensitivity;
export const range = (t: GasDetectType) => get(t).range;
export const selectivity = (t: GasDetectType) => get(t).selectivity;
export const durability = (t: GasDetectType) => get(t).durability;
export const gdCost = (t: GasDetectType) => get(t).gdCost;
export const continuous = (t: GasDetectType) => get(t).continuous;
export const forExplosive = (t: GasDetectType) => get(t).forExplosive;
export const sensor = (t: GasDetectType) => get(t).sensor;
export const bestUse = (t: GasDetectType) => get(t).bestUse;
export const gasDetectTypes = (): GasDetectType[] =>
  Object.keys(DATA) as GasDetectType[];

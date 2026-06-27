export type MachineVisionType =
  | "area_scan_ccd"
  | "line_scan_continuous"
  | "stereo_vision_3d"
  | "hyperspectral_nir"
  | "thermal_ir_defect";

interface MachineVisionData {
  resolution: number;
  speed: number;
  depth: number;
  flexibility: number;
  mvCost: number;
  color: boolean;
  for3d: boolean;
  sensor: string;
  bestUse: string;
}

const DATA: Record<MachineVisionType, MachineVisionData> = {
  area_scan_ccd: {
    resolution: 9, speed: 8, depth: 5, flexibility: 9, mvCost: 6,
    color: true, for3d: false,
    sensor: "ccd_global_shutter_matrix",
    bestUse: "label_presence_print_verify_lot",
  },
  line_scan_continuous: {
    resolution: 10, speed: 10, depth: 5, flexibility: 6, mvCost: 7,
    color: true, for3d: false,
    sensor: "linear_ccd_cmos_tdi_array",
    bestUse: "web_inspection_film_paper_fabric",
  },
  stereo_vision_3d: {
    resolution: 8, speed: 7, depth: 10, flexibility: 8, mvCost: 8,
    color: false, for3d: true,
    sensor: "dual_camera_structured_light",
    bestUse: "bin_pick_robot_guide_assembly",
  },
  hyperspectral_nir: {
    resolution: 7, speed: 6, depth: 4, flexibility: 5, mvCost: 10,
    color: false, for3d: false,
    sensor: "pushbroom_nir_swir_spectrograph",
    bestUse: "food_sort_pharma_contaminant_detect",
  },
  thermal_ir_defect: {
    resolution: 6, speed: 9, depth: 4, flexibility: 7, mvCost: 8,
    color: false, for3d: false,
    sensor: "microbolometer_lwir_uncooled",
    bestUse: "pcb_solder_joint_thermal_check",
  },
};

function get(t: MachineVisionType): MachineVisionData {
  return DATA[t];
}

export const resolution = (t: MachineVisionType) => get(t).resolution;
export const speed = (t: MachineVisionType) => get(t).speed;
export const depth = (t: MachineVisionType) => get(t).depth;
export const flexibility = (t: MachineVisionType) => get(t).flexibility;
export const mvCost = (t: MachineVisionType) => get(t).mvCost;
export const color = (t: MachineVisionType) => get(t).color;
export const for3d = (t: MachineVisionType) => get(t).for3d;
export const sensor = (t: MachineVisionType) => get(t).sensor;
export const bestUse = (t: MachineVisionType) => get(t).bestUse;
export const machineVisionTypes = (): MachineVisionType[] =>
  Object.keys(DATA) as MachineVisionType[];

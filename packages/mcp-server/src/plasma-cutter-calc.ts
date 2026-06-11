export type PlasmaCutterType =
  | "conventional_air"
  | "high_definition"
  | "fine_plasma"
  | "underwater"
  | "cnc_gantry";

interface PlasmaCutterData {
  cutSpeed: number;
  edgeQuality: number;
  thicknessRange: number;
  operatingCost: number;
  pcCost: number;
  cnc: boolean;
  forThickPlate: boolean;
  process: string;
  bestUse: string;
}

const DATA: Record<PlasmaCutterType, PlasmaCutterData> = {
  conventional_air: {
    cutSpeed: 7, edgeQuality: 5, thicknessRange: 7, operatingCost: 8, pcCost: 3,
    cnc: false, forThickPlate: false,
    process: "compressed_air_plasma_arc_handheld_torch_drag_cut_pilot",
    bestUse: "fabrication_shop_general_cutting_field_work_portable_use",
  },
  high_definition: {
    cutSpeed: 9, edgeQuality: 9, thicknessRange: 8, operatingCost: 6, pcCost: 8,
    cnc: true, forThickPlate: true,
    process: "high_current_density_small_nozzle_oxygen_plasma_hd_arc",
    bestUse: "structural_steel_plate_cutting_precision_part_production",
  },
  fine_plasma: {
    cutSpeed: 8, edgeQuality: 10, thicknessRange: 5, operatingCost: 5, pcCost: 9,
    cnc: true, forThickPlate: false,
    process: "fine_bore_nozzle_magnetic_constriction_laser_like_edge",
    bestUse: "thin_sheet_metal_precision_cut_near_laser_quality_edge",
  },
  underwater: {
    cutSpeed: 6, edgeQuality: 7, thicknessRange: 9, operatingCost: 7, pcCost: 7,
    cnc: true, forThickPlate: true,
    process: "submerged_water_table_plasma_cut_fume_noise_reduction",
    bestUse: "shipyard_heavy_plate_cutting_noise_sensitive_environment",
  },
  cnc_gantry: {
    cutSpeed: 10, edgeQuality: 8, thicknessRange: 10, operatingCost: 6, pcCost: 10,
    cnc: true, forThickPlate: true,
    process: "multi_torch_gantry_rail_bevel_head_marking_drilling_combo",
    bestUse: "heavy_fabrication_bridge_pressure_vessel_multi_torch_nest",
  },
};

function get(t: PlasmaCutterType): PlasmaCutterData {
  return DATA[t];
}

export const cutSpeed = (t: PlasmaCutterType) => get(t).cutSpeed;
export const edgeQuality = (t: PlasmaCutterType) => get(t).edgeQuality;
export const thicknessRange = (t: PlasmaCutterType) => get(t).thicknessRange;
export const operatingCost = (t: PlasmaCutterType) => get(t).operatingCost;
export const pcCost = (t: PlasmaCutterType) => get(t).pcCost;
export const cnc = (t: PlasmaCutterType) => get(t).cnc;
export const forThickPlate = (t: PlasmaCutterType) => get(t).forThickPlate;
export const process = (t: PlasmaCutterType) => get(t).process;
export const bestUse = (t: PlasmaCutterType) => get(t).bestUse;
export const plasmaCutterTypes = (): PlasmaCutterType[] =>
  Object.keys(DATA) as PlasmaCutterType[];

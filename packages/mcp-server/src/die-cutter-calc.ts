export type DieCutterType =
  | "flatbed_platen"
  | "rotary_die"
  | "laser_die"
  | "steel_rule"
  | "digital_die";

interface DieCutterData {
  cutPrecision: number;
  throughput: number;
  materialRange: number;
  setupTime: number;
  dcCost: number;
  contactFree: boolean;
  forThick: boolean;
  cutterConfig: string;
  bestUse: string;
}

const DATA: Record<DieCutterType, DieCutterData> = {
  flatbed_platen: {
    cutPrecision: 9, throughput: 6, materialRange: 9, setupTime: 5, dcCost: 7,
    contactFree: false, forThick: true,
    cutterConfig: "flatbed_platen_die_cutter_press_plate_steel_die_sheet_cut",
    bestUse: "packaging_flatbed_platen_die_cutter_carton_box_thick_board",
  },
  rotary_die: {
    cutPrecision: 9, throughput: 10, materialRange: 7, setupTime: 4, dcCost: 9,
    contactFree: false, forThick: false,
    cutterConfig: "rotary_die_cutter_cylinder_die_anvil_roll_continuous_web_cut",
    bestUse: "label_tape_rotary_die_cutter_continuous_web_high_speed_convert",
  },
  laser_die: {
    cutPrecision: 10, throughput: 5, materialRange: 8, setupTime: 10, dcCost: 10,
    contactFree: true, forThick: false,
    cutterConfig: "laser_die_cutter_co2_fiber_beam_digital_path_no_tooling_cut",
    bestUse: "prototype_specialty_laser_die_cutter_no_tooling_complex_shape",
  },
  steel_rule: {
    cutPrecision: 7, throughput: 7, materialRange: 10, setupTime: 6, dcCost: 5,
    contactFree: false, forThick: true,
    cutterConfig: "steel_rule_die_cutter_plywood_base_bent_steel_blade_press_cut",
    bestUse: "corrugated_foam_steel_rule_die_cutter_custom_shape_gasket_box",
  },
  digital_die: {
    cutPrecision: 9, throughput: 6, materialRange: 7, setupTime: 10, dcCost: 8,
    contactFree: true, forThick: false,
    cutterConfig: "digital_die_cutter_plotter_blade_servo_path_short_run_no_die",
    bestUse: "short_run_digital_die_cutter_plotter_vinyl_label_prototype",
  },
};

function get(t: DieCutterType): DieCutterData {
  return DATA[t];
}

export const cutPrecision = (t: DieCutterType) => get(t).cutPrecision;
export const throughput = (t: DieCutterType) => get(t).throughput;
export const materialRange = (t: DieCutterType) => get(t).materialRange;
export const setupTime = (t: DieCutterType) => get(t).setupTime;
export const dcCost = (t: DieCutterType) => get(t).dcCost;
export const contactFree = (t: DieCutterType) => get(t).contactFree;
export const forThick = (t: DieCutterType) => get(t).forThick;
export const cutterConfig = (t: DieCutterType) => get(t).cutterConfig;
export const bestUse = (t: DieCutterType) => get(t).bestUse;
export const dieCutterTypes = (): DieCutterType[] =>
  Object.keys(DATA) as DieCutterType[];

export type RoundnessTesterType =
  | "rotary_table"
  | "rotating_spindle"
  | "multi_axis_form"
  | "portable_vee_block"
  | "air_bearing_ultra";

interface RoundnessTesterData {
  formAccuracy: number;
  spinSpeed: number;
  partSizeRange: number;
  surfaceFinishCapable: number;
  rtCost: number;
  automated: boolean;
  forBearing: boolean;
  rotationMethod: string;
  bestUse: string;
}

const DATA: Record<RoundnessTesterType, RoundnessTesterData> = {
  rotary_table: {
    formAccuracy: 7, spinSpeed: 7, partSizeRange: 8, surfaceFinishCapable: 6, rtCost: 5,
    automated: false, forBearing: false,
    rotationMethod: "part_on_turntable_fixed_probe_contact_radial_deviation",
    bestUse: "production_floor_shaft_bore_roundness_cylindricity_check",
  },
  rotating_spindle: {
    formAccuracy: 9, spinSpeed: 8, partSizeRange: 7, surfaceFinishCapable: 8, rtCost: 7,
    automated: true, forBearing: true,
    rotationMethod: "precision_spindle_rotate_part_centering_table_auto_align",
    bestUse: "bearing_race_piston_pin_valve_stem_high_precision_roundness",
  },
  multi_axis_form: {
    formAccuracy: 10, spinSpeed: 7, partSizeRange: 9, surfaceFinishCapable: 9, rtCost: 10,
    automated: true, forBearing: true,
    rotationMethod: "c_axis_spindle_z_axis_column_x_probe_full_3d_form_measure",
    bestUse: "complex_form_taper_thread_cam_gear_tooth_profile_total_form",
  },
  portable_vee_block: {
    formAccuracy: 4, spinSpeed: 5, partSizeRange: 6, surfaceFinishCapable: 3, rtCost: 2,
    automated: false, forBearing: false,
    rotationMethod: "manual_vee_block_rotate_part_by_hand_dial_indicator_read",
    bestUse: "quick_shop_floor_check_shaft_runout_go_no_go_screening",
  },
  air_bearing_ultra: {
    formAccuracy: 10, spinSpeed: 9, partSizeRange: 5, surfaceFinishCapable: 10, rtCost: 9,
    automated: true, forBearing: true,
    rotationMethod: "air_bearing_spindle_sub_nanometer_error_motion_reference",
    bestUse: "optical_lens_master_gauge_calibration_artifact_nano_form",
  },
};

function get(t: RoundnessTesterType): RoundnessTesterData {
  return DATA[t];
}

export const formAccuracy = (t: RoundnessTesterType) => get(t).formAccuracy;
export const spinSpeed = (t: RoundnessTesterType) => get(t).spinSpeed;
export const partSizeRange = (t: RoundnessTesterType) => get(t).partSizeRange;
export const surfaceFinishCapable = (t: RoundnessTesterType) => get(t).surfaceFinishCapable;
export const rtCost = (t: RoundnessTesterType) => get(t).rtCost;
export const automated = (t: RoundnessTesterType) => get(t).automated;
export const forBearing = (t: RoundnessTesterType) => get(t).forBearing;
export const rotationMethod = (t: RoundnessTesterType) => get(t).rotationMethod;
export const bestUse = (t: RoundnessTesterType) => get(t).bestUse;
export const roundnessTesterTypes = (): RoundnessTesterType[] =>
  Object.keys(DATA) as RoundnessTesterType[];

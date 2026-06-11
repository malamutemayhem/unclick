export type UltrasonicWeldType =
  | "lateral_drive"
  | "wedge_reed"
  | "torsional"
  | "ultrasonic_spot"
  | "continuous_seam";

interface UltrasonicWeldData {
  bondStrength: number;
  speed: number;
  precision: number;
  materialRange: number;
  uwCost: number;
  solidState: boolean;
  forThermoplastic: boolean;
  horn: string;
  bestUse: string;
}

const DATA: Record<UltrasonicWeldType, UltrasonicWeldData> = {
  lateral_drive: {
    bondStrength: 8, speed: 9, precision: 8, materialRange: 7, uwCost: 6,
    solidState: true, forThermoplastic: true,
    horn: "rectangular_lateral_vibration_titanium_horn_20khz_standard",
    bestUse: "automotive_interior_panel_dashboard_trim_clip_snap_fit_weld",
  },
  wedge_reed: {
    bondStrength: 9, speed: 8, precision: 9, materialRange: 6, uwCost: 7,
    solidState: true, forThermoplastic: true,
    horn: "wedge_reed_booster_high_amplitude_gain_large_part_weld",
    bestUse: "large_rigid_housing_appliance_enclosure_complex_geometry",
  },
  torsional: {
    bondStrength: 9, speed: 8, precision: 10, materialRange: 5, uwCost: 8,
    solidState: true, forThermoplastic: true,
    horn: "circular_torsional_disc_horn_rotary_motion_round_part",
    bestUse: "round_container_filter_cap_medical_device_hermetic_seal",
  },
  ultrasonic_spot: {
    bondStrength: 7, speed: 10, precision: 7, materialRange: 8, uwCost: 5,
    solidState: true, forThermoplastic: true,
    horn: "handheld_spot_tip_portable_point_weld_fabric_film_join",
    bestUse: "nonwoven_fabric_film_packaging_textile_point_tack_weld",
  },
  continuous_seam: {
    bondStrength: 8, speed: 10, precision: 8, materialRange: 7, uwCost: 7,
    solidState: true, forThermoplastic: true,
    horn: "rotary_wheel_horn_continuous_seam_roll_weld_film_foil",
    bestUse: "packaging_pouch_tube_foil_laminate_continuous_seal_line",
  },
};

function get(t: UltrasonicWeldType): UltrasonicWeldData {
  return DATA[t];
}

export const bondStrength = (t: UltrasonicWeldType) => get(t).bondStrength;
export const speed = (t: UltrasonicWeldType) => get(t).speed;
export const precision = (t: UltrasonicWeldType) => get(t).precision;
export const materialRange = (t: UltrasonicWeldType) => get(t).materialRange;
export const uwCost = (t: UltrasonicWeldType) => get(t).uwCost;
export const solidState = (t: UltrasonicWeldType) => get(t).solidState;
export const forThermoplastic = (t: UltrasonicWeldType) => get(t).forThermoplastic;
export const horn = (t: UltrasonicWeldType) => get(t).horn;
export const bestUse = (t: UltrasonicWeldType) => get(t).bestUse;
export const ultrasonicWeldTypes = (): UltrasonicWeldType[] =>
  Object.keys(DATA) as UltrasonicWeldType[];

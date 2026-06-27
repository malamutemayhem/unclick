export type CoordinateMeasuringType =
  | "bridge_cmm_fixed"
  | "gantry_cmm_large"
  | "horizontal_arm_cmm"
  | "portable_arm_cmm"
  | "optical_cmm_scanner";

interface CoordinateMeasuringData {
  accuracy: number;
  volume: number;
  speed: number;
  portability: number;
  cmCost: number;
  portable: boolean;
  forLargeParts: boolean;
  probe: string;
  bestUse: string;
}

const DATA: Record<CoordinateMeasuringType, CoordinateMeasuringData> = {
  bridge_cmm_fixed: {
    accuracy: 10, volume: 7, speed: 7, portability: 1, cmCost: 8,
    portable: false, forLargeParts: false,
    probe: "touch_trigger_or_scanning_probe_granite_base_air",
    bestUse: "precision_machined_part_first_article_inspection",
  },
  gantry_cmm_large: {
    accuracy: 9, volume: 10, speed: 6, portability: 1, cmCost: 10,
    portable: false, forLargeParts: true,
    probe: "motorized_probe_overhead_gantry_floor_mounted_rail",
    bestUse: "car_body_aircraft_panel_large_casting_measurement",
  },
  horizontal_arm_cmm: {
    accuracy: 7, volume: 8, speed: 8, portability: 2, cmCost: 7,
    portable: false, forLargeParts: true,
    probe: "horizontal_arm_touch_probe_side_access_shop_floor",
    bestUse: "sheet_metal_stamping_body_in_white_shop_floor_check",
  },
  portable_arm_cmm: {
    accuracy: 6, volume: 5, speed: 9, portability: 10, cmCost: 5,
    portable: true, forLargeParts: false,
    probe: "articulated_arm_7_axis_touch_or_laser_line_scan",
    bestUse: "field_inspection_reverse_engineering_fixture_verify",
  },
  optical_cmm_scanner: {
    accuracy: 8, volume: 6, speed: 10, portability: 7, cmCost: 7,
    portable: true, forLargeParts: false,
    probe: "structured_light_or_laser_line_non_contact_3d_scan",
    bestUse: "soft_part_scan_freeform_surface_full_field_compare",
  },
};

function get(t: CoordinateMeasuringType): CoordinateMeasuringData {
  return DATA[t];
}

export const accuracy = (t: CoordinateMeasuringType) => get(t).accuracy;
export const volume = (t: CoordinateMeasuringType) => get(t).volume;
export const speed = (t: CoordinateMeasuringType) => get(t).speed;
export const portability = (t: CoordinateMeasuringType) => get(t).portability;
export const cmCost = (t: CoordinateMeasuringType) => get(t).cmCost;
export const portable = (t: CoordinateMeasuringType) => get(t).portable;
export const forLargeParts = (t: CoordinateMeasuringType) => get(t).forLargeParts;
export const probe = (t: CoordinateMeasuringType) => get(t).probe;
export const bestUse = (t: CoordinateMeasuringType) => get(t).bestUse;
export const coordinateMeasuringTypes = (): CoordinateMeasuringType[] =>
  Object.keys(DATA) as CoordinateMeasuringType[];

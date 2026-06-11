export type TurretPunchType =
  | "thick_turret_hydraulic"
  | "thin_turret_servo"
  | "combo_punch_laser"
  | "combo_punch_shear"
  | "nibble_form_louver";

interface TurretPunchData {
  hitRate: number;
  precision: number;
  versatility: number;
  forming: number;
  tpCost: number;
  laserCombo: boolean;
  forPrototype: boolean;
  tooling: string;
  bestUse: string;
}

const DATA: Record<TurretPunchType, TurretPunchData> = {
  thick_turret_hydraulic: {
    hitRate: 8, precision: 8, versatility: 8, forming: 7, tpCost: 6,
    laserCombo: false, forPrototype: false,
    tooling: "thick_turret_station_a_b_c_d",
    bestUse: "panel_bracket_chassis_hole_pattern",
  },
  thin_turret_servo: {
    hitRate: 10, precision: 9, versatility: 8, forming: 7, tpCost: 7,
    laserCombo: false, forPrototype: false,
    tooling: "thin_turret_auto_index_station",
    bestUse: "electrical_enclosure_high_speed",
  },
  combo_punch_laser: {
    hitRate: 7, precision: 10, versatility: 10, forming: 6, tpCost: 10,
    laserCombo: true, forPrototype: true,
    tooling: "punch_turret_plus_fiber_laser",
    bestUse: "complex_contour_mixed_feature",
  },
  combo_punch_shear: {
    hitRate: 9, precision: 8, versatility: 7, forming: 5, tpCost: 8,
    laserCombo: false, forPrototype: false,
    tooling: "punch_turret_right_angle_shear",
    bestUse: "rectangular_part_minimal_scrap",
  },
  nibble_form_louver: {
    hitRate: 6, precision: 7, versatility: 9, forming: 10, tpCost: 5,
    laserCombo: false, forPrototype: true,
    tooling: "forming_tool_louver_lance_emboss",
    bestUse: "ventilation_panel_louver_rib_form",
  },
};

function get(t: TurretPunchType): TurretPunchData {
  return DATA[t];
}

export const hitRate = (t: TurretPunchType) => get(t).hitRate;
export const precision = (t: TurretPunchType) => get(t).precision;
export const versatility = (t: TurretPunchType) => get(t).versatility;
export const forming = (t: TurretPunchType) => get(t).forming;
export const tpCost = (t: TurretPunchType) => get(t).tpCost;
export const laserCombo = (t: TurretPunchType) => get(t).laserCombo;
export const forPrototype = (t: TurretPunchType) => get(t).forPrototype;
export const tooling = (t: TurretPunchType) => get(t).tooling;
export const bestUse = (t: TurretPunchType) => get(t).bestUse;
export const turretPunchTypes = (): TurretPunchType[] =>
  Object.keys(DATA) as TurretPunchType[];

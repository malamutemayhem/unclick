export type PressBrakeType =
  | "mechanical_flywheel"
  | "hydraulic_sync_cnc"
  | "servo_electric_drive"
  | "pneumatic_light_duty"
  | "tandem_long_bed";

interface PressBrakeData {
  tonnage: number;
  speed: number;
  precision: number;
  flexibility: number;
  pbCost: number;
  cnc: boolean;
  forHeavy: boolean;
  drive: string;
  bestUse: string;
}

const DATA: Record<PressBrakeType, PressBrakeData> = {
  mechanical_flywheel: {
    tonnage: 7, speed: 10, precision: 6, flexibility: 5, pbCost: 5,
    cnc: false, forHeavy: false,
    drive: "flywheel_clutch_eccentric_crank",
    bestUse: "simple_bend_high_speed_repeat",
  },
  hydraulic_sync_cnc: {
    tonnage: 10, speed: 7, precision: 9, flexibility: 9, pbCost: 8,
    cnc: true, forHeavy: true,
    drive: "dual_cylinder_sync_proportional",
    bestUse: "thick_plate_complex_profile_bend",
  },
  servo_electric_drive: {
    tonnage: 7, speed: 9, precision: 10, flexibility: 8, pbCost: 9,
    cnc: true, forHeavy: false,
    drive: "servo_motor_ball_screw_direct",
    bestUse: "precision_thin_sheet_clean_quiet",
  },
  pneumatic_light_duty: {
    tonnage: 3, speed: 8, precision: 5, flexibility: 4, pbCost: 3,
    cnc: false, forHeavy: false,
    drive: "air_cylinder_toggle_clamp_press",
    bestUse: "light_gauge_duct_flashing_simple",
  },
  tandem_long_bed: {
    tonnage: 10, speed: 6, precision: 8, flexibility: 7, pbCost: 10,
    cnc: true, forHeavy: true,
    drive: "multi_cylinder_long_bed_sync_cnc",
    bestUse: "long_panel_pole_tower_section_bend",
  },
};

function get(t: PressBrakeType): PressBrakeData {
  return DATA[t];
}

export const tonnage = (t: PressBrakeType) => get(t).tonnage;
export const speed = (t: PressBrakeType) => get(t).speed;
export const precision = (t: PressBrakeType) => get(t).precision;
export const flexibility = (t: PressBrakeType) => get(t).flexibility;
export const pbCost = (t: PressBrakeType) => get(t).pbCost;
export const cnc = (t: PressBrakeType) => get(t).cnc;
export const forHeavy = (t: PressBrakeType) => get(t).forHeavy;
export const drive = (t: PressBrakeType) => get(t).drive;
export const bestUse = (t: PressBrakeType) => get(t).bestUse;
export const pressBrakeTypes = (): PressBrakeType[] =>
  Object.keys(DATA) as PressBrakeType[];

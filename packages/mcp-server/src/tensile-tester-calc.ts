export type TensileTesterType =
  | "electromechanical_screw"
  | "servohydraulic_fatigue"
  | "universal_dual_column"
  | "micro_tensile_thin_film"
  | "horizontal_wire_cable";

interface TensileTesterData {
  forceCapacity: number;
  accuracy: number;
  speedRange: number;
  versatility: number;
  ttCost: number;
  fatigueTesting: boolean;
  forMetals: boolean;
  drive: string;
  bestUse: string;
}

const DATA: Record<TensileTesterType, TensileTesterData> = {
  electromechanical_screw: {
    forceCapacity: 7, accuracy: 9, speedRange: 7, versatility: 8, ttCost: 6,
    fatigueTesting: false, forMetals: true,
    drive: "ac_servo_motor_ball_screw_crosshead_precise_speed",
    bestUse: "polymer_rubber_textile_adhesive_peel_static_test",
  },
  servohydraulic_fatigue: {
    forceCapacity: 10, accuracy: 8, speedRange: 10, versatility: 9, ttCost: 10,
    fatigueTesting: true, forMetals: true,
    drive: "hydraulic_actuator_servo_valve_dynamic_cycling",
    bestUse: "metal_fatigue_fracture_toughness_high_cycle_dynamic",
  },
  universal_dual_column: {
    forceCapacity: 8, accuracy: 9, speedRange: 6, versatility: 10, ttCost: 7,
    fatigueTesting: false, forMetals: true,
    drive: "dual_column_frame_electromechanical_high_stiffness",
    bestUse: "qc_lab_general_tension_compression_bend_shear_test",
  },
  micro_tensile_thin_film: {
    forceCapacity: 2, accuracy: 10, speedRange: 4, versatility: 4, ttCost: 8,
    fatigueTesting: false, forMetals: false,
    drive: "piezo_or_voice_coil_sub_newton_micro_specimen_grip",
    bestUse: "mems_thin_film_fiber_bio_tissue_micro_scale_test",
  },
  horizontal_wire_cable: {
    forceCapacity: 6, accuracy: 7, speedRange: 5, versatility: 5, ttCost: 5,
    fatigueTesting: false, forMetals: true,
    drive: "horizontal_bed_hydraulic_long_specimen_wire_rope",
    bestUse: "wire_rope_chain_sling_cable_long_specimen_pull_test",
  },
};

function get(t: TensileTesterType): TensileTesterData {
  return DATA[t];
}

export const forceCapacity = (t: TensileTesterType) => get(t).forceCapacity;
export const accuracy = (t: TensileTesterType) => get(t).accuracy;
export const speedRange = (t: TensileTesterType) => get(t).speedRange;
export const versatility = (t: TensileTesterType) => get(t).versatility;
export const ttCost = (t: TensileTesterType) => get(t).ttCost;
export const fatigueTesting = (t: TensileTesterType) => get(t).fatigueTesting;
export const forMetals = (t: TensileTesterType) => get(t).forMetals;
export const drive = (t: TensileTesterType) => get(t).drive;
export const bestUse = (t: TensileTesterType) => get(t).bestUse;
export const tensileTesterTypes = (): TensileTesterType[] =>
  Object.keys(DATA) as TensileTesterType[];

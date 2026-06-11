export type PatientLiftType =
  | "ceiling_track_fixed"
  | "ceiling_track_portable"
  | "floor_hydraulic_manual"
  | "floor_electric_battery"
  | "sit_to_stand_assist";

interface PatientLiftData {
  capacity: number;
  safety: number;
  ergonomics: number;
  speed: number;
  plCost: number;
  motorized: boolean;
  forBariatric: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<PatientLiftType, PatientLiftData> = {
  ceiling_track_fixed: {
    capacity: 9, safety: 10, ergonomics: 10, speed: 9, plCost: 9,
    motorized: true, forBariatric: true,
    mechanism: "overhead_track_motor_sling",
    bestUse: "icu_long_term_care_room",
  },
  ceiling_track_portable: {
    capacity: 7, safety: 9, ergonomics: 9, speed: 8, plCost: 7,
    motorized: true, forBariatric: false,
    mechanism: "portable_rail_motor_traverse",
    bestUse: "multi_room_rehab_facility",
  },
  floor_hydraulic_manual: {
    capacity: 8, safety: 7, ergonomics: 5, speed: 4, plCost: 3,
    motorized: false, forBariatric: true,
    mechanism: "hydraulic_pump_manual_crank",
    bestUse: "home_care_budget_basic",
  },
  floor_electric_battery: {
    capacity: 9, safety: 8, ergonomics: 8, speed: 7, plCost: 6,
    motorized: true, forBariatric: true,
    mechanism: "electric_actuator_rechargeable",
    bestUse: "hospital_ward_general_use",
  },
  sit_to_stand_assist: {
    capacity: 6, safety: 8, ergonomics: 9, speed: 8, plCost: 5,
    motorized: true, forBariatric: false,
    mechanism: "knee_pad_strap_powered_rise",
    bestUse: "rehab_mobility_training_ward",
  },
};

function get(t: PatientLiftType): PatientLiftData {
  return DATA[t];
}

export const capacity = (t: PatientLiftType) => get(t).capacity;
export const safety = (t: PatientLiftType) => get(t).safety;
export const ergonomics = (t: PatientLiftType) => get(t).ergonomics;
export const speed = (t: PatientLiftType) => get(t).speed;
export const plCost = (t: PatientLiftType) => get(t).plCost;
export const motorized = (t: PatientLiftType) => get(t).motorized;
export const forBariatric = (t: PatientLiftType) => get(t).forBariatric;
export const mechanism = (t: PatientLiftType) => get(t).mechanism;
export const bestUse = (t: PatientLiftType) => get(t).bestUse;
export const patientLiftTypes = (): PatientLiftType[] =>
  Object.keys(DATA) as PatientLiftType[];

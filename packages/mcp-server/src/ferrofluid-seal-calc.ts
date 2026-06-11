export type FerrofluidSealType =
  | "single_stage_standard"
  | "multi_stage_high_press"
  | "rotary_feedthrough"
  | "oscillating_shaft"
  | "hermetic_vacuum";

interface FerrofluidSealData {
  pressureCapacity: number;
  speedLimit: number;
  lifetime: number;
  leakage: number;
  ffCost: number;
  contactFree: boolean;
  forVacuum: boolean;
  design: string;
  bestUse: string;
}

const DATA: Record<FerrofluidSealType, FerrofluidSealData> = {
  single_stage_standard: {
    pressureCapacity: 4, speedLimit: 9, lifetime: 8, leakage: 9, ffCost: 6,
    contactFree: true, forVacuum: false,
    design: "single_magnet_stage_ferrofluid_ring_seal",
    bestUse: "hard_disk_drive_clean_room_spindle_dust_free",
  },
  multi_stage_high_press: {
    pressureCapacity: 8, speedLimit: 8, lifetime: 7, leakage: 10, ffCost: 8,
    contactFree: true, forVacuum: true,
    design: "multiple_pole_piece_stages_cascaded_pressure",
    bestUse: "vacuum_chamber_rotary_seal_semiconductor_fab",
  },
  rotary_feedthrough: {
    pressureCapacity: 7, speedLimit: 9, lifetime: 9, leakage: 10, ffCost: 9,
    contactFree: true, forVacuum: true,
    design: "flanged_feedthrough_unit_shaft_pass_through",
    bestUse: "uhv_system_rotary_motion_feedthrough_research",
  },
  oscillating_shaft: {
    pressureCapacity: 5, speedLimit: 7, lifetime: 8, leakage: 9, ffCost: 7,
    contactFree: true, forVacuum: false,
    design: "ferrofluid_seal_for_oscillating_reciprocating",
    bestUse: "speaker_voice_coil_precision_actuator_seal",
  },
  hermetic_vacuum: {
    pressureCapacity: 9, speedLimit: 7, lifetime: 10, leakage: 10, ffCost: 10,
    contactFree: true, forVacuum: true,
    design: "hermetic_multi_stage_ultra_high_vacuum_grade",
    bestUse: "particle_accelerator_space_sim_zero_leak_uhv",
  },
};

function get(t: FerrofluidSealType): FerrofluidSealData {
  return DATA[t];
}

export const pressureCapacity = (t: FerrofluidSealType) => get(t).pressureCapacity;
export const speedLimit = (t: FerrofluidSealType) => get(t).speedLimit;
export const lifetime = (t: FerrofluidSealType) => get(t).lifetime;
export const leakage = (t: FerrofluidSealType) => get(t).leakage;
export const ffCost = (t: FerrofluidSealType) => get(t).ffCost;
export const contactFree = (t: FerrofluidSealType) => get(t).contactFree;
export const forVacuum = (t: FerrofluidSealType) => get(t).forVacuum;
export const design = (t: FerrofluidSealType) => get(t).design;
export const bestUse = (t: FerrofluidSealType) => get(t).bestUse;
export const ferrofluidSealTypes = (): FerrofluidSealType[] =>
  Object.keys(DATA) as FerrofluidSealType[];

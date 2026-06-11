export type UltrasonicCleanerType =
  | "standard_sonic"
  | "megasonic_clean"
  | "multi_freq"
  | "vapor_degrease"
  | "spray_rinse";

interface UltrasonicCleanerData {
  particleRemoval: number;
  throughput: number;
  surfaceSafety: number;
  chemicalCompat: number;
  ucCost: number;
  gentle: boolean;
  forPrecision: boolean;
  cleanerConfig: string;
  bestUse: string;
}

const DATA: Record<UltrasonicCleanerType, UltrasonicCleanerData> = {
  standard_sonic: {
    particleRemoval: 7, throughput: 8, surfaceSafety: 6, chemicalCompat: 8, ucCost: 4,
    gentle: false, forPrecision: false,
    cleanerConfig: "standard_ultrasonic_cleaner_40khz_cavitation_tank_degas_rinse",
    bestUse: "general_parts_standard_ultrasonic_cleaner_cavitation_degas",
  },
  megasonic_clean: {
    particleRemoval: 10, throughput: 6, surfaceSafety: 10, chemicalCompat: 9, ucCost: 9,
    gentle: true, forPrecision: true,
    cleanerConfig: "megasonic_cleaner_1mhz_acoustic_stream_gentle_wafer_particle",
    bestUse: "wafer_clean_megasonic_cleaner_1mhz_gentle_sub_micron_particle",
  },
  multi_freq: {
    particleRemoval: 9, throughput: 7, surfaceSafety: 8, chemicalCompat: 9, ucCost: 7,
    gentle: false, forPrecision: true,
    cleanerConfig: "multi_freq_ultrasonic_cleaner_sweep_dual_40_80_120khz_select",
    bestUse: "medical_device_multi_freq_ultrasonic_cleaner_sweep_thorough",
  },
  vapor_degrease: {
    particleRemoval: 6, throughput: 7, surfaceSafety: 9, chemicalCompat: 6, ucCost: 6,
    gentle: true, forPrecision: false,
    cleanerConfig: "vapor_degrease_cleaner_solvent_boil_condense_film_free_rinse",
    bestUse: "aerospace_vapor_degrease_cleaner_solvent_film_free_no_residue",
  },
  spray_rinse: {
    particleRemoval: 5, throughput: 9, surfaceSafety: 7, chemicalCompat: 7, ucCost: 3,
    gentle: false, forPrecision: false,
    cleanerConfig: "spray_rinse_cleaner_high_pressure_nozzle_cascade_di_water",
    bestUse: "inline_pcb_spray_rinse_cleaner_high_pressure_cascade_flux",
  },
};

function get(t: UltrasonicCleanerType): UltrasonicCleanerData {
  return DATA[t];
}

export const particleRemoval = (t: UltrasonicCleanerType) => get(t).particleRemoval;
export const throughput = (t: UltrasonicCleanerType) => get(t).throughput;
export const surfaceSafety = (t: UltrasonicCleanerType) => get(t).surfaceSafety;
export const chemicalCompat = (t: UltrasonicCleanerType) => get(t).chemicalCompat;
export const ucCost = (t: UltrasonicCleanerType) => get(t).ucCost;
export const gentle = (t: UltrasonicCleanerType) => get(t).gentle;
export const forPrecision = (t: UltrasonicCleanerType) => get(t).forPrecision;
export const cleanerConfig = (t: UltrasonicCleanerType) => get(t).cleanerConfig;
export const bestUse = (t: UltrasonicCleanerType) => get(t).bestUse;
export const ultrasonicCleanerTypes = (): UltrasonicCleanerType[] =>
  Object.keys(DATA) as UltrasonicCleanerType[];

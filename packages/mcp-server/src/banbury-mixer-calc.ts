export type BanburyMixerType =
  | "tangential_rotor"
  | "intermeshing_rotor"
  | "variable_speed"
  | "ram_pressurized"
  | "lab_scale";

interface BanburyMixerData {
  mixSpeed: number;
  dispersionQuality: number;
  batchSize: number;
  temperatureControl: number;
  bmxCost: number;
  pressurized: boolean;
  forRubber: boolean;
  mixerConfig: string;
  bestUse: string;
}

const DATA: Record<BanburyMixerType, BanburyMixerData> = {
  tangential_rotor: {
    mixSpeed: 9, dispersionQuality: 7, batchSize: 9, temperatureControl: 7, bmxCost: 8,
    pressurized: true, forRubber: true,
    mixerConfig: "tangential_two_wing_rotor_high_shear_ram_press_rubber_compound",
    bestUse: "tire_rubber_compound_high_volume_tangential_rotor_batch_mixing",
  },
  intermeshing_rotor: {
    mixSpeed: 7, dispersionQuality: 10, batchSize: 8, temperatureControl: 9, bmxCost: 9,
    pressurized: true, forRubber: true,
    mixerConfig: "intermeshing_rotor_self_cleaning_precise_dispersion_compound",
    bestUse: "precision_rubber_compound_silicone_filler_intermesh_dispersion",
  },
  variable_speed: {
    mixSpeed: 8, dispersionQuality: 8, batchSize: 8, temperatureControl: 8, bmxCost: 7,
    pressurized: true, forRubber: true,
    mixerConfig: "variable_speed_drive_adjustable_rotor_rpm_multi_compound_flex",
    bestUse: "multi_compound_flexible_mixing_variable_speed_different_batch",
  },
  ram_pressurized: {
    mixSpeed: 10, dispersionQuality: 8, batchSize: 10, temperatureControl: 7, bmxCost: 10,
    pressurized: true, forRubber: true,
    mixerConfig: "heavy_ram_high_pressure_large_batch_intensive_rubber_compound",
    bestUse: "large_batch_heavy_duty_ram_press_high_filler_loading_compound",
  },
  lab_scale: {
    mixSpeed: 6, dispersionQuality: 9, batchSize: 3, temperatureControl: 10, bmxCost: 4,
    pressurized: true, forRubber: true,
    mixerConfig: "lab_scale_small_batch_precise_temp_control_r_and_d_formulation",
    bestUse: "research_development_small_batch_formulation_lab_scale_testing",
  },
};

function get(t: BanburyMixerType): BanburyMixerData {
  return DATA[t];
}

export const mixSpeed = (t: BanburyMixerType) => get(t).mixSpeed;
export const dispersionQuality = (t: BanburyMixerType) => get(t).dispersionQuality;
export const batchSize = (t: BanburyMixerType) => get(t).batchSize;
export const temperatureControl = (t: BanburyMixerType) => get(t).temperatureControl;
export const bmxCost = (t: BanburyMixerType) => get(t).bmxCost;
export const pressurized = (t: BanburyMixerType) => get(t).pressurized;
export const forRubber = (t: BanburyMixerType) => get(t).forRubber;
export const mixerConfig = (t: BanburyMixerType) => get(t).mixerConfig;
export const bestUse = (t: BanburyMixerType) => get(t).bestUse;
export const banburyMixerTypes = (): BanburyMixerType[] =>
  Object.keys(DATA) as BanburyMixerType[];

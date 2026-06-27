export type FireAlarmType =
  | "ionization_smoke_particle"
  | "photoelectric_smoke_scatter"
  | "heat_fixed_temp_rate_rise"
  | "beam_detector_reflected_ir"
  | "aspirating_vesda_sample";

interface FireAlarmData {
  sensitivity: number;
  falseAlarm: number;
  coverage: number;
  response: number;
  faCost: number;
  addressable: boolean;
  forSmoke: boolean;
  sensing: string;
  bestUse: string;
}

const DATA: Record<FireAlarmType, FireAlarmData> = {
  ionization_smoke_particle: {
    sensitivity: 8, falseAlarm: 4, coverage: 6, response: 9, faCost: 3,
    addressable: false, forSmoke: true,
    sensing: "ionization_chamber_alpha_particle",
    bestUse: "fast_flaming_fire_general_residential",
  },
  photoelectric_smoke_scatter: {
    sensitivity: 7, falseAlarm: 7, coverage: 6, response: 7, faCost: 4,
    addressable: false, forSmoke: true,
    sensing: "light_scatter_led_photodiode",
    bestUse: "smoldering_fire_bedroom_hallway",
  },
  heat_fixed_temp_rate_rise: {
    sensitivity: 4, falseAlarm: 9, coverage: 5, response: 5, faCost: 3,
    addressable: false, forSmoke: false,
    sensing: "bimetallic_rate_of_rise_thermal",
    bestUse: "kitchen_garage_dusty_no_false_alarm",
  },
  beam_detector_reflected_ir: {
    sensitivity: 6, falseAlarm: 7, coverage: 10, response: 6, faCost: 7,
    addressable: true, forSmoke: true,
    sensing: "infrared_beam_reflector_obscuration",
    bestUse: "warehouse_atrium_high_ceiling_open",
  },
  aspirating_vesda_sample: {
    sensitivity: 10, falseAlarm: 8, coverage: 9, response: 10, faCost: 10,
    addressable: true, forSmoke: true,
    sensing: "pipe_network_laser_nephelometer",
    bestUse: "data_center_clean_room_early_warning",
  },
};

function get(t: FireAlarmType): FireAlarmData {
  return DATA[t];
}

export const sensitivity = (t: FireAlarmType) => get(t).sensitivity;
export const falseAlarm = (t: FireAlarmType) => get(t).falseAlarm;
export const coverage = (t: FireAlarmType) => get(t).coverage;
export const response = (t: FireAlarmType) => get(t).response;
export const faCost = (t: FireAlarmType) => get(t).faCost;
export const addressable = (t: FireAlarmType) => get(t).addressable;
export const forSmoke = (t: FireAlarmType) => get(t).forSmoke;
export const sensing = (t: FireAlarmType) => get(t).sensing;
export const bestUse = (t: FireAlarmType) => get(t).bestUse;
export const fireAlarmTypes = (): FireAlarmType[] =>
  Object.keys(DATA) as FireAlarmType[];

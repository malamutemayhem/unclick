export type FireDetectorType =
  | "ionization_smoke"
  | "photoelectric_smoke"
  | "heat_fixed_temp"
  | "aspirating_vesda"
  | "flame_ir_uv";

interface FireDetectorData {
  sensitivity: number;
  responseTime: number;
  falseAlarmResist: number;
  coverage: number;
  fdCost: number;
  addressable: boolean;
  forCleanRoom: boolean;
  sensor: string;
  bestUse: string;
}

const DATA: Record<FireDetectorType, FireDetectorData> = {
  ionization_smoke: {
    sensitivity: 9, responseTime: 9, falseAlarmResist: 5, coverage: 7, fdCost: 3,
    addressable: false, forCleanRoom: false,
    sensor: "americium_241_ionization_chamber_smoke_particle",
    bestUse: "fast_flaming_fire_office_hotel_residential",
  },
  photoelectric_smoke: {
    sensitivity: 8, responseTime: 7, falseAlarmResist: 7, coverage: 7, fdCost: 4,
    addressable: true, forCleanRoom: false,
    sensor: "led_light_scatter_photodiode_smoke_chamber",
    bestUse: "smoldering_fire_corridor_sleeping_area",
  },
  heat_fixed_temp: {
    sensitivity: 4, responseTime: 5, falseAlarmResist: 10, coverage: 5, fdCost: 2,
    addressable: false, forCleanRoom: false,
    sensor: "bimetallic_eutectic_fixed_temp_rate_of_rise",
    bestUse: "kitchen_garage_dusty_area_heat_only_detection",
  },
  aspirating_vesda: {
    sensitivity: 10, responseTime: 10, falseAlarmResist: 9, coverage: 10, fdCost: 9,
    addressable: true, forCleanRoom: true,
    sensor: "laser_nephelometer_aspirating_pipe_network",
    bestUse: "data_center_cleanroom_heritage_early_warning",
  },
  flame_ir_uv: {
    sensitivity: 8, responseTime: 10, falseAlarmResist: 8, coverage: 6, fdCost: 8,
    addressable: true, forCleanRoom: false,
    sensor: "multi_spectrum_ir_uv_flame_signature_detect",
    bestUse: "outdoor_flammable_liquid_storage_jet_fire_area",
  },
};

function get(t: FireDetectorType): FireDetectorData {
  return DATA[t];
}

export const sensitivity = (t: FireDetectorType) => get(t).sensitivity;
export const responseTime = (t: FireDetectorType) => get(t).responseTime;
export const falseAlarmResist = (t: FireDetectorType) => get(t).falseAlarmResist;
export const coverage = (t: FireDetectorType) => get(t).coverage;
export const fdCost = (t: FireDetectorType) => get(t).fdCost;
export const addressable = (t: FireDetectorType) => get(t).addressable;
export const forCleanRoom = (t: FireDetectorType) => get(t).forCleanRoom;
export const sensor = (t: FireDetectorType) => get(t).sensor;
export const bestUse = (t: FireDetectorType) => get(t).bestUse;
export const fireDetectorTypes = (): FireDetectorType[] =>
  Object.keys(DATA) as FireDetectorType[];

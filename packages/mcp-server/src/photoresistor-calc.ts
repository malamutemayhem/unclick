// photoresistor-calc - photoresistor/LDR types

export type Photoresistor =
  | "cds_cell_standard"
  | "phototransistor_fast"
  | "photodiode_precision"
  | "ambient_light_ic"
  | "uv_sensor_broadband";

const DATA: Record<Photoresistor, {
  sensitivity: number; responseSpeed: number; spectralRange: number; linearity: number;
  cost: number; analog: boolean; forLowLight: boolean; sensingElement: string; bestUse: string;
}> = {
  cds_cell_standard:      { sensitivity: 7, responseSpeed: 4, spectralRange: 6, linearity: 5, cost: 1, analog: true, forLowLight: true, sensingElement: "cadmium_sulfide_cell", bestUse: "basic_light_dark_detect" },
  phototransistor_fast:   { sensitivity: 8, responseSpeed: 8, spectralRange: 5, linearity: 6, cost: 2, analog: true, forLowLight: false, sensingElement: "npn_phototransistor", bestUse: "fast_light_switch" },
  photodiode_precision:   { sensitivity: 9, responseSpeed: 10, spectralRange: 7, linearity: 9, cost: 4, analog: true, forLowLight: false, sensingElement: "silicon_pin_diode", bestUse: "precision_light_measure" },
  ambient_light_ic:       { sensitivity: 7, responseSpeed: 7, spectralRange: 8, linearity: 10, cost: 5, analog: false, forLowLight: true, sensingElement: "integrated_als_chip", bestUse: "display_brightness_auto" },
  uv_sensor_broadband:    { sensitivity: 6, responseSpeed: 6, spectralRange: 10, linearity: 8, cost: 6, analog: false, forLowLight: false, sensingElement: "uv_photodiode_filter", bestUse: "uv_index_monitor" },
};

const get = (p: Photoresistor) => DATA[p];
export const sensitivity = (p: Photoresistor) => get(p).sensitivity;
export const responseSpeed = (p: Photoresistor) => get(p).responseSpeed;
export const spectralRange = (p: Photoresistor) => get(p).spectralRange;
export const linearity = (p: Photoresistor) => get(p).linearity;
export const sensorCost = (p: Photoresistor) => get(p).cost;
export const analog = (p: Photoresistor) => get(p).analog;
export const forLowLight = (p: Photoresistor) => get(p).forLowLight;
export const sensingElement = (p: Photoresistor) => get(p).sensingElement;
export const bestUse = (p: Photoresistor) => get(p).bestUse;
export const photoresistors = (): Photoresistor[] => Object.keys(DATA) as Photoresistor[];

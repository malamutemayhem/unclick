export type WaterQualityType =
  | "multiprobe_sonde_insitu"
  | "spectrophotometer_lab_uv"
  | "ion_selective_electrode"
  | "turbidimeter_nephelometric"
  | "bod_dissolved_oxygen";

const DATA: Record<WaterQualityType, {
  parameters: number; accuracy: number; fieldUse: number;
  speed: number; wqCost: number; realtime: boolean;
  forDrinking: boolean; method: string; bestUse: string;
}> = {
  multiprobe_sonde_insitu: {
    parameters: 10, accuracy: 7, fieldUse: 10,
    speed: 9, wqCost: 4, realtime: true,
    forDrinking: false, method: "multi_sensor_submersible",
    bestUse: "river_lake_continuous_profile",
  },
  spectrophotometer_lab_uv: {
    parameters: 8, accuracy: 10, fieldUse: 3,
    speed: 6, wqCost: 4, realtime: false,
    forDrinking: true, method: "uv_vis_absorbance_cuvette",
    bestUse: "wastewater_lab_nutrient_test",
  },
  ion_selective_electrode: {
    parameters: 3, accuracy: 8, fieldUse: 7,
    speed: 8, wqCost: 2, realtime: true,
    forDrinking: true, method: "potentiometric_membrane_ion",
    bestUse: "drinking_water_fluoride_nitrate",
  },
  turbidimeter_nephelometric: {
    parameters: 1, accuracy: 9, fieldUse: 8,
    speed: 10, wqCost: 2, realtime: true,
    forDrinking: true, method: "90_degree_scatter_ntu",
    bestUse: "filter_plant_turbidity_alarm",
  },
  bod_dissolved_oxygen: {
    parameters: 2, accuracy: 7, fieldUse: 4,
    speed: 2, wqCost: 3, realtime: false,
    forDrinking: false, method: "winkler_titration_5day_incub",
    bestUse: "effluent_permit_bod_compliance",
  },
};

const get = (t: WaterQualityType) => DATA[t];

export const parameters = (t: WaterQualityType) => get(t).parameters;
export const accuracy = (t: WaterQualityType) => get(t).accuracy;
export const fieldUse = (t: WaterQualityType) => get(t).fieldUse;
export const speed = (t: WaterQualityType) => get(t).speed;
export const wqCost = (t: WaterQualityType) => get(t).wqCost;
export const realtime = (t: WaterQualityType) => get(t).realtime;
export const forDrinking = (t: WaterQualityType) => get(t).forDrinking;
export const method = (t: WaterQualityType) => get(t).method;
export const bestUse = (t: WaterQualityType) => get(t).bestUse;
export const waterQualityTypes = (): WaterQualityType[] => Object.keys(DATA) as WaterQualityType[];

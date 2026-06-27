export type RacewayType =
  | "surface_metal_wiremold"
  | "floor_duct_underfloor"
  | "cable_trough_ladder"
  | "modular_power_pole"
  | "ceiling_raceway_pendant";

interface RacewayData {
  capacity: number;
  flexibility: number;
  aesthetic: number;
  accessibility: number;
  rwCost: number;
  concealed: boolean;
  forRetrofit: boolean;
  mounting: string;
  bestUse: string;
}

const DATA: Record<RacewayType, RacewayData> = {
  surface_metal_wiremold: {
    capacity: 5, flexibility: 8, aesthetic: 6, accessibility: 9, rwCost: 3,
    concealed: false, forRetrofit: true,
    mounting: "surface_wall_snap_on_cover",
    bestUse: "office_retrofit_add_outlet",
  },
  floor_duct_underfloor: {
    capacity: 8, flexibility: 6, aesthetic: 9, accessibility: 5, rwCost: 7,
    concealed: true, forRetrofit: false,
    mounting: "embedded_concrete_floor_duct",
    bestUse: "open_office_floor_power_data",
  },
  cable_trough_ladder: {
    capacity: 10, flexibility: 7, aesthetic: 3, accessibility: 9, rwCost: 5,
    concealed: false, forRetrofit: false,
    mounting: "overhead_trough_open_top",
    bestUse: "industrial_plant_heavy_cable",
  },
  modular_power_pole: {
    capacity: 6, flexibility: 10, aesthetic: 7, accessibility: 10, rwCost: 4,
    concealed: false, forRetrofit: true,
    mounting: "floor_to_ceiling_power_pole",
    bestUse: "open_plan_workstation_power",
  },
  ceiling_raceway_pendant: {
    capacity: 5, flexibility: 7, aesthetic: 8, accessibility: 7, rwCost: 5,
    concealed: true, forRetrofit: false,
    mounting: "above_ceiling_pendant_drop",
    bestUse: "lab_healthcare_pendant_equip",
  },
};

function get(t: RacewayType): RacewayData {
  return DATA[t];
}

export const capacity = (t: RacewayType) => get(t).capacity;
export const flexibility = (t: RacewayType) => get(t).flexibility;
export const aesthetic = (t: RacewayType) => get(t).aesthetic;
export const accessibility = (t: RacewayType) => get(t).accessibility;
export const rwCost = (t: RacewayType) => get(t).rwCost;
export const concealed = (t: RacewayType) => get(t).concealed;
export const forRetrofit = (t: RacewayType) => get(t).forRetrofit;
export const mounting = (t: RacewayType) => get(t).mounting;
export const bestUse = (t: RacewayType) => get(t).bestUse;
export const racewayTypes = (): RacewayType[] =>
  Object.keys(DATA) as RacewayType[];

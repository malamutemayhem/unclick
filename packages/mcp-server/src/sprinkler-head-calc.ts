export type SprinklerHeadType =
  | "pendant_standard_drop"
  | "upright_exposed_pipe"
  | "sidewall_horizontal"
  | "concealed_flush_cover"
  | "esfr_early_suppression";

interface SprinklerHeadData {
  coverage: number;
  response: number;
  aesthetic: number;
  flow: number;
  shCost: number;
  concealed: boolean;
  forWarehouse: boolean;
  activation: string;
  bestUse: string;
}

const DATA: Record<SprinklerHeadType, SprinklerHeadData> = {
  pendant_standard_drop: {
    coverage: 7, response: 7, aesthetic: 6, flow: 7, shCost: 3,
    concealed: false, forWarehouse: false,
    activation: "glass_bulb_fusible_link",
    bestUse: "office_retail_standard_hazard",
  },
  upright_exposed_pipe: {
    coverage: 7, response: 7, aesthetic: 3, flow: 7, shCost: 3,
    concealed: false, forWarehouse: false,
    activation: "glass_bulb_upright_deflector",
    bestUse: "industrial_exposed_ceiling",
  },
  sidewall_horizontal: {
    coverage: 5, response: 7, aesthetic: 7, flow: 5, shCost: 5,
    concealed: false, forWarehouse: false,
    activation: "glass_bulb_horizontal_throw",
    bestUse: "hotel_corridor_small_room",
  },
  concealed_flush_cover: {
    coverage: 6, response: 6, aesthetic: 10, flow: 6, shCost: 7,
    concealed: true, forWarehouse: false,
    activation: "solder_plate_cover_drop",
    bestUse: "luxury_hotel_finished_ceiling",
  },
  esfr_early_suppression: {
    coverage: 10, response: 10, aesthetic: 2, flow: 10, shCost: 8,
    concealed: false, forWarehouse: true,
    activation: "large_orifice_fast_response",
    bestUse: "high_rack_warehouse_storage",
  },
};

function get(t: SprinklerHeadType): SprinklerHeadData {
  return DATA[t];
}

export const coverage = (t: SprinklerHeadType) => get(t).coverage;
export const response = (t: SprinklerHeadType) => get(t).response;
export const aesthetic = (t: SprinklerHeadType) => get(t).aesthetic;
export const flow = (t: SprinklerHeadType) => get(t).flow;
export const shCost = (t: SprinklerHeadType) => get(t).shCost;
export const concealed = (t: SprinklerHeadType) => get(t).concealed;
export const forWarehouse = (t: SprinklerHeadType) => get(t).forWarehouse;
export const activation = (t: SprinklerHeadType) => get(t).activation;
export const bestUse = (t: SprinklerHeadType) => get(t).bestUse;
export const sprinklerHeadTypes = (): SprinklerHeadType[] =>
  Object.keys(DATA) as SprinklerHeadType[];

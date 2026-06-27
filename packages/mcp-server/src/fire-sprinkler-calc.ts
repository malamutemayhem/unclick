export type FireSprinklerType =
  | "pendant_standard_ceiling"
  | "upright_exposed_pipe"
  | "sidewall_horizontal_wall"
  | "concealed_flush_decorative"
  | "esfr_early_suppression";

interface FireSprinklerData {
  coverage: number;
  response: number;
  aesthetic: number;
  flowRate: number;
  fsCost: number;
  concealed: boolean;
  forWarehouse: boolean;
  activation: string;
  bestUse: string;
}

const DATA: Record<FireSprinklerType, FireSprinklerData> = {
  pendant_standard_ceiling: {
    coverage: 8, response: 7, aesthetic: 5, flowRate: 7, fsCost: 3,
    concealed: false, forWarehouse: false,
    activation: "glass_bulb_fusible_element_down",
    bestUse: "office_retail_standard_ceiling_mount",
  },
  upright_exposed_pipe: {
    coverage: 8, response: 7, aesthetic: 3, flowRate: 7, fsCost: 3,
    concealed: false, forWarehouse: false,
    activation: "glass_bulb_fusible_element_up",
    bestUse: "industrial_basement_exposed_pipe_grid",
  },
  sidewall_horizontal_wall: {
    coverage: 5, response: 7, aesthetic: 6, flowRate: 5, fsCost: 5,
    concealed: false, forWarehouse: false,
    activation: "deflector_horizontal_wall_mount",
    bestUse: "corridor_small_room_wall_mount_only",
  },
  concealed_flush_decorative: {
    coverage: 7, response: 6, aesthetic: 10, flowRate: 6, fsCost: 7,
    concealed: true, forWarehouse: false,
    activation: "cover_plate_drop_down_solder_link",
    bestUse: "hotel_lobby_restaurant_flush_ceiling",
  },
  esfr_early_suppression: {
    coverage: 10, response: 9, aesthetic: 2, flowRate: 10, fsCost: 9,
    concealed: false, forWarehouse: true,
    activation: "large_orifice_k_factor_high_pressure",
    bestUse: "high_rack_warehouse_pallet_storage",
  },
};

function get(t: FireSprinklerType): FireSprinklerData {
  return DATA[t];
}

export const coverage = (t: FireSprinklerType) => get(t).coverage;
export const response = (t: FireSprinklerType) => get(t).response;
export const aesthetic = (t: FireSprinklerType) => get(t).aesthetic;
export const flowRate = (t: FireSprinklerType) => get(t).flowRate;
export const fsCost = (t: FireSprinklerType) => get(t).fsCost;
export const concealed = (t: FireSprinklerType) => get(t).concealed;
export const forWarehouse = (t: FireSprinklerType) => get(t).forWarehouse;
export const activation = (t: FireSprinklerType) => get(t).activation;
export const bestUse = (t: FireSprinklerType) => get(t).bestUse;
export const fireSprinklerTypes = (): FireSprinklerType[] =>
  Object.keys(DATA) as FireSprinklerType[];

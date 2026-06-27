export type HvacType =
  | "split_system_ducted"
  | "vrf_variable_refrigerant"
  | "chilled_water_ahu"
  | "packaged_rooftop_unit"
  | "radiant_floor_hydronic";

const DATA: Record<HvacType, {
  efficiency: number; capacity: number; zoning: number;
  noise: number; hvCost: number; heatPump: boolean;
  forCommercial: boolean; medium: string; bestUse: string;
}> = {
  split_system_ducted: {
    efficiency: 6, capacity: 5, zoning: 4,
    noise: 6, hvCost: 2, heatPump: true,
    forCommercial: false, medium: "refrigerant_direct_expansion",
    bestUse: "residential_whole_house_comfort",
  },
  vrf_variable_refrigerant: {
    efficiency: 9, capacity: 8, zoning: 10,
    noise: 8, hvCost: 4, heatPump: true,
    forCommercial: true, medium: "refrigerant_variable_flow",
    bestUse: "multi_zone_office_hotel_floor",
  },
  chilled_water_ahu: {
    efficiency: 8, capacity: 10, zoning: 7,
    noise: 5, hvCost: 5, heatPump: false,
    forCommercial: true, medium: "chilled_water_pipe_coil",
    bestUse: "large_campus_central_plant",
  },
  packaged_rooftop_unit: {
    efficiency: 5, capacity: 7, zoning: 3,
    noise: 4, hvCost: 2, heatPump: true,
    forCommercial: true, medium: "refrigerant_self_contained",
    bestUse: "retail_store_single_zone",
  },
  radiant_floor_hydronic: {
    efficiency: 10, capacity: 4, zoning: 6,
    noise: 10, hvCost: 3, heatPump: false,
    forCommercial: false, medium: "hot_water_pex_tubing",
    bestUse: "luxury_home_silent_heating",
  },
};

const get = (t: HvacType) => DATA[t];

export const efficiency = (t: HvacType) => get(t).efficiency;
export const capacity = (t: HvacType) => get(t).capacity;
export const zoning = (t: HvacType) => get(t).zoning;
export const noise = (t: HvacType) => get(t).noise;
export const hvCost = (t: HvacType) => get(t).hvCost;
export const heatPump = (t: HvacType) => get(t).heatPump;
export const forCommercial = (t: HvacType) => get(t).forCommercial;
export const medium = (t: HvacType) => get(t).medium;
export const bestUse = (t: HvacType) => get(t).bestUse;
export const hvacTypes = (): HvacType[] => Object.keys(DATA) as HvacType[];

export type GeothermalLoopType =
  | "horizontal_trench_slinky"
  | "vertical_borehole_closed"
  | "pond_lake_submerged"
  | "open_well_standing_column"
  | "direct_exchange_copper";

interface GeothermalLoopData {
  efficiency: number;
  landUse: number;
  installCost: number;
  reliability: number;
  glCost: number;
  closedLoop: boolean;
  forSmallLot: boolean;
  fluid: string;
  bestUse: string;
}

const DATA: Record<GeothermalLoopType, GeothermalLoopData> = {
  horizontal_trench_slinky: {
    efficiency: 7, landUse: 4, installCost: 8, reliability: 9, glCost: 5,
    closedLoop: true, forSmallLot: false,
    fluid: "water_propylene_glycol_antifreeze",
    bestUse: "residential_rural_large_yard",
  },
  vertical_borehole_closed: {
    efficiency: 9, landUse: 10, installCost: 5, reliability: 10, glCost: 8,
    closedLoop: true, forSmallLot: true,
    fluid: "water_glycol_grouted_borehole",
    bestUse: "commercial_urban_limited_land",
  },
  pond_lake_submerged: {
    efficiency: 8, landUse: 9, installCost: 9, reliability: 8, glCost: 4,
    closedLoop: true, forSmallLot: false,
    fluid: "water_glycol_submerged_coil",
    bestUse: "lakeside_property_campus_cooling",
  },
  open_well_standing_column: {
    efficiency: 10, landUse: 9, installCost: 6, reliability: 7, glCost: 6,
    closedLoop: false, forSmallLot: true,
    fluid: "groundwater_direct_reinjection",
    bestUse: "high_capacity_aquifer_available",
  },
  direct_exchange_copper: {
    efficiency: 10, landUse: 8, installCost: 7, reliability: 8, glCost: 7,
    closedLoop: true, forSmallLot: true,
    fluid: "refrigerant_direct_copper_tube",
    bestUse: "residential_compact_high_perf",
  },
};

function get(t: GeothermalLoopType): GeothermalLoopData {
  return DATA[t];
}

export const efficiency = (t: GeothermalLoopType) => get(t).efficiency;
export const landUse = (t: GeothermalLoopType) => get(t).landUse;
export const installCost = (t: GeothermalLoopType) => get(t).installCost;
export const reliability = (t: GeothermalLoopType) => get(t).reliability;
export const glCost = (t: GeothermalLoopType) => get(t).glCost;
export const closedLoop = (t: GeothermalLoopType) => get(t).closedLoop;
export const forSmallLot = (t: GeothermalLoopType) => get(t).forSmallLot;
export const fluid = (t: GeothermalLoopType) => get(t).fluid;
export const bestUse = (t: GeothermalLoopType) => get(t).bestUse;
export const geothermalLoopTypes = (): GeothermalLoopType[] =>
  Object.keys(DATA) as GeothermalLoopType[];

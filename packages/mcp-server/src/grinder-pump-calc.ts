export type GrinderPumpType =
  | "residential_simplex"
  | "commercial_duplex"
  | "outdoor_basin_package"
  | "high_head_pressure"
  | "marine_rv_compact";

interface GrinderPumpData {
  flow: number;
  head: number;
  reliability: number;
  maintenance: number;
  gpCost: number;
  duplex: boolean;
  forCommercial: boolean;
  impeller: string;
  bestUse: string;
}

const DATA: Record<GrinderPumpType, GrinderPumpData> = {
  residential_simplex: {
    flow: 5, head: 7, reliability: 7, maintenance: 6, gpCost: 4,
    duplex: false, forCommercial: false,
    impeller: "single_cutter_hardened_steel",
    bestUse: "basement_bathroom_below_sewer",
  },
  commercial_duplex: {
    flow: 8, head: 8, reliability: 10, maintenance: 7, gpCost: 8,
    duplex: true, forCommercial: true,
    impeller: "duplex_cutter_alternating",
    bestUse: "restaurant_commercial_kitchen",
  },
  outdoor_basin_package: {
    flow: 6, head: 8, reliability: 8, maintenance: 7, gpCost: 6,
    duplex: false, forCommercial: false,
    impeller: "submersible_cutter_basin_pkg",
    bestUse: "rural_pressure_sewer_system",
  },
  high_head_pressure: {
    flow: 7, head: 10, reliability: 8, maintenance: 8, gpCost: 9,
    duplex: false, forCommercial: true,
    impeller: "high_head_progressive_cavity",
    bestUse: "long_distance_pressure_main",
  },
  marine_rv_compact: {
    flow: 3, head: 5, reliability: 6, maintenance: 5, gpCost: 3,
    duplex: false, forCommercial: false,
    impeller: "compact_macerator_12v_24v",
    bestUse: "boat_rv_mobile_waste_pump",
  },
};

function get(t: GrinderPumpType): GrinderPumpData {
  return DATA[t];
}

export const flow = (t: GrinderPumpType) => get(t).flow;
export const head = (t: GrinderPumpType) => get(t).head;
export const reliability = (t: GrinderPumpType) => get(t).reliability;
export const maintenance = (t: GrinderPumpType) => get(t).maintenance;
export const gpCost = (t: GrinderPumpType) => get(t).gpCost;
export const duplex = (t: GrinderPumpType) => get(t).duplex;
export const forCommercial = (t: GrinderPumpType) => get(t).forCommercial;
export const impeller = (t: GrinderPumpType) => get(t).impeller;
export const bestUse = (t: GrinderPumpType) => get(t).bestUse;
export const grinderPumpTypes = (): GrinderPumpType[] =>
  Object.keys(DATA) as GrinderPumpType[];

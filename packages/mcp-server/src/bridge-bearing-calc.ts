export type BridgeBearingType =
  | "fixed_pin_steel_rocker"
  | "guided_sliding_ptfe_rail"
  | "free_sliding_stainless_ptfe"
  | "seismic_isolation_lead_rubber"
  | "rocker_roller_steel_nest";

interface BridgeBearingData {
  loadCapacity: number;
  movement: number;
  seismic: number;
  maintenance: number;
  bbCost: number;
  allowsMovement: boolean;
  forSeismic: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<BridgeBearingType, BridgeBearingData> = {
  fixed_pin_steel_rocker: {
    loadCapacity: 8, movement: 1, seismic: 3, maintenance: 5, bbCost: 4,
    allowsMovement: false, forSeismic: false,
    element: "steel_pin_anchor_bolt_fixed",
    bestUse: "short_span_fixed_pier_anchor",
  },
  guided_sliding_ptfe_rail: {
    loadCapacity: 7, movement: 7, seismic: 5, maintenance: 7, bbCost: 6,
    allowsMovement: true, forSeismic: false,
    element: "stainless_ptfe_guide_bar_rail",
    bestUse: "thermal_expansion_single_direction",
  },
  free_sliding_stainless_ptfe: {
    loadCapacity: 7, movement: 9, seismic: 4, maintenance: 6, bbCost: 5,
    allowsMovement: true, forSeismic: false,
    element: "stainless_ptfe_flat_plate_free",
    bestUse: "multi_direction_thermal_movement",
  },
  seismic_isolation_lead_rubber: {
    loadCapacity: 9, movement: 6, seismic: 10, maintenance: 8, bbCost: 10,
    allowsMovement: true, forSeismic: true,
    element: "lead_core_rubber_laminate_isolator",
    bestUse: "earthquake_zone_bridge_isolation",
  },
  rocker_roller_steel_nest: {
    loadCapacity: 8, movement: 5, seismic: 2, maintenance: 4, bbCost: 5,
    allowsMovement: true, forSeismic: false,
    element: "steel_roller_nest_curved_plate",
    bestUse: "legacy_steel_truss_bridge_rehab",
  },
};

function get(t: BridgeBearingType): BridgeBearingData {
  return DATA[t];
}

export const loadCapacity = (t: BridgeBearingType) => get(t).loadCapacity;
export const movement = (t: BridgeBearingType) => get(t).movement;
export const seismic = (t: BridgeBearingType) => get(t).seismic;
export const maintenance = (t: BridgeBearingType) => get(t).maintenance;
export const bbCost = (t: BridgeBearingType) => get(t).bbCost;
export const allowsMovement = (t: BridgeBearingType) => get(t).allowsMovement;
export const forSeismic = (t: BridgeBearingType) => get(t).forSeismic;
export const element = (t: BridgeBearingType) => get(t).element;
export const bestUse = (t: BridgeBearingType) => get(t).bestUse;
export const bridgeBearingTypes = (): BridgeBearingType[] =>
  Object.keys(DATA) as BridgeBearingType[];

export type SmokeExhaustType =
  | "natural_ventilator"
  | "mechanical_axial"
  | "jet_fan_impulse"
  | "smoke_curtain_barrier"
  | "pressurization_stairwell";

interface SmokeExhaustData {
  extractionRate: number;
  coverage: number;
  reliability: number;
  noiseLevel: number;
  seCost: number;
  powered: boolean;
  forHighRise: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<SmokeExhaustType, SmokeExhaustData> = {
  natural_ventilator: {
    extractionRate: 5, coverage: 6, reliability: 9, noiseLevel: 10, seCost: 3,
    powered: false, forHighRise: false,
    mechanism: "roof_louvre_auto_open_thermal_buoyancy_stack_effect_exhaust",
    bestUse: "warehouse_factory_atrium_single_storey_natural_smoke_vent",
  },
  mechanical_axial: {
    extractionRate: 9, coverage: 8, reliability: 8, noiseLevel: 5, seCost: 6,
    powered: true, forHighRise: true,
    mechanism: "high_temperature_rated_axial_fan_duct_network_zone_extract",
    bestUse: "shopping_mall_underground_car_park_tunnel_zone_smoke_clear",
  },
  jet_fan_impulse: {
    extractionRate: 8, coverage: 9, reliability: 8, noiseLevel: 4, seCost: 7,
    powered: true, forHighRise: false,
    mechanism: "ceiling_jet_fan_impulse_air_movement_ductless_push_to_exit",
    bestUse: "car_park_basement_tunnel_ductless_smoke_management_impulse",
  },
  smoke_curtain_barrier: {
    extractionRate: 3, coverage: 7, reliability: 9, noiseLevel: 10, seCost: 4,
    powered: true, forHighRise: true,
    mechanism: "fabric_curtain_auto_deploy_ceiling_channel_smoke_reservoir",
    bestUse: "atrium_escalator_void_large_open_plan_smoke_compartment",
  },
  pressurization_stairwell: {
    extractionRate: 7, coverage: 6, reliability: 9, noiseLevel: 6, seCost: 8,
    powered: true, forHighRise: true,
    mechanism: "positive_pressure_fan_inject_air_stairwell_prevent_ingress",
    bestUse: "high_rise_building_stairwell_lobby_elevator_shaft_protect",
  },
};

function get(t: SmokeExhaustType): SmokeExhaustData {
  return DATA[t];
}

export const extractionRate = (t: SmokeExhaustType) => get(t).extractionRate;
export const coverage = (t: SmokeExhaustType) => get(t).coverage;
export const reliability = (t: SmokeExhaustType) => get(t).reliability;
export const noiseLevel = (t: SmokeExhaustType) => get(t).noiseLevel;
export const seCost = (t: SmokeExhaustType) => get(t).seCost;
export const powered = (t: SmokeExhaustType) => get(t).powered;
export const forHighRise = (t: SmokeExhaustType) => get(t).forHighRise;
export const mechanism = (t: SmokeExhaustType) => get(t).mechanism;
export const bestUse = (t: SmokeExhaustType) => get(t).bestUse;
export const smokeExhaustTypes = (): SmokeExhaustType[] =>
  Object.keys(DATA) as SmokeExhaustType[];

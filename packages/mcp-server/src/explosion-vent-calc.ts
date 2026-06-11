export type ExplosionVentType =
  | "flat_panel_hinged"
  | "domed_composite_burst"
  | "flameless_quench_filter"
  | "indoor_recoilless"
  | "explosion_isolation_valve";

interface ExplosionVentData {
  ventArea: number;
  response: number;
  reusability: number;
  safety: number;
  evCost: number;
  flameless: boolean;
  forIndoor: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<ExplosionVentType, ExplosionVentData> = {
  flat_panel_hinged: {
    ventArea: 9, response: 8, reusability: 8, safety: 6, evCost: 4,
    flameless: false, forIndoor: false,
    mechanism: "scored_panel_hinge_open_release",
    bestUse: "silo_bin_outdoor_dust_explosion",
  },
  domed_composite_burst: {
    ventArea: 10, response: 10, reusability: 3, safety: 6, evCost: 5,
    flameless: false, forIndoor: false,
    mechanism: "domed_membrane_burst_low_inertia",
    bestUse: "vessel_duct_fast_response_outdoor",
  },
  flameless_quench_filter: {
    ventArea: 7, response: 9, reusability: 7, safety: 10, evCost: 8,
    flameless: true, forIndoor: true,
    mechanism: "mesh_screen_quench_flame_contain",
    bestUse: "indoor_dust_collector_filter_safe",
  },
  indoor_recoilless: {
    ventArea: 6, response: 8, reusability: 9, safety: 9, evCost: 7,
    flameless: true, forIndoor: true,
    mechanism: "baffle_absorb_recoil_no_thrust",
    bestUse: "indoor_bin_hopper_near_personnel",
  },
  explosion_isolation_valve: {
    ventArea: 5, response: 10, reusability: 8, safety: 10, evCost: 9,
    flameless: true, forIndoor: true,
    mechanism: "fast_acting_gate_pinch_isolate",
    bestUse: "duct_pipe_propagation_stop_isolate",
  },
};

function get(t: ExplosionVentType): ExplosionVentData {
  return DATA[t];
}

export const ventArea = (t: ExplosionVentType) => get(t).ventArea;
export const response = (t: ExplosionVentType) => get(t).response;
export const reusability = (t: ExplosionVentType) => get(t).reusability;
export const safety = (t: ExplosionVentType) => get(t).safety;
export const evCost = (t: ExplosionVentType) => get(t).evCost;
export const flameless = (t: ExplosionVentType) => get(t).flameless;
export const forIndoor = (t: ExplosionVentType) => get(t).forIndoor;
export const mechanism = (t: ExplosionVentType) => get(t).mechanism;
export const bestUse = (t: ExplosionVentType) => get(t).bestUse;
export const explosionVentTypes = (): ExplosionVentType[] =>
  Object.keys(DATA) as ExplosionVentType[];

export type RegenBrakeType =
  | "series_dc_motor"
  | "ac_induction_vfd"
  | "permanent_magnet_bldc"
  | "switched_reluctance"
  | "supercap_kinetic";

interface RegenBrakeData {
  recovery: number;
  response: number;
  efficiency: number;
  smoothness: number;
  rbCost: number;
  gridFeed: boolean;
  forEv: boolean;
  storage: string;
  bestUse: string;
}

const DATA: Record<RegenBrakeType, RegenBrakeData> = {
  series_dc_motor: {
    recovery: 5, response: 6, efficiency: 5, smoothness: 5, rbCost: 3,
    gridFeed: false, forEv: false,
    storage: "resistor_bank_dissipation_heat",
    bestUse: "legacy_tram_trolley_dc_transit",
  },
  ac_induction_vfd: {
    recovery: 7, response: 8, efficiency: 7, smoothness: 8, rbCost: 6,
    gridFeed: true, forEv: false,
    storage: "vfd_dc_bus_grid_feedback_inverter",
    bestUse: "elevator_crane_hoist_industrial",
  },
  permanent_magnet_bldc: {
    recovery: 9, response: 10, efficiency: 9, smoothness: 9, rbCost: 8,
    gridFeed: false, forEv: true,
    storage: "battery_pack_lithium_ion_bms",
    bestUse: "electric_vehicle_hybrid_bicycle",
  },
  switched_reluctance: {
    recovery: 8, response: 9, efficiency: 8, smoothness: 6, rbCost: 5,
    gridFeed: false, forEv: true,
    storage: "dc_bus_capacitor_chopper_battery",
    bestUse: "low_cost_ev_industrial_drive",
  },
  supercap_kinetic: {
    recovery: 10, response: 10, efficiency: 10, smoothness: 9, rbCost: 10,
    gridFeed: false, forEv: true,
    storage: "ultracapacitor_flywheel_hybrid",
    bestUse: "f1_kers_bus_rapid_transit_stop",
  },
};

function get(t: RegenBrakeType): RegenBrakeData {
  return DATA[t];
}

export const recovery = (t: RegenBrakeType) => get(t).recovery;
export const response = (t: RegenBrakeType) => get(t).response;
export const efficiency = (t: RegenBrakeType) => get(t).efficiency;
export const smoothness = (t: RegenBrakeType) => get(t).smoothness;
export const rbCost = (t: RegenBrakeType) => get(t).rbCost;
export const gridFeed = (t: RegenBrakeType) => get(t).gridFeed;
export const forEv = (t: RegenBrakeType) => get(t).forEv;
export const storage = (t: RegenBrakeType) => get(t).storage;
export const bestUse = (t: RegenBrakeType) => get(t).bestUse;
export const regenBrakeTypes = (): RegenBrakeType[] =>
  Object.keys(DATA) as RegenBrakeType[];

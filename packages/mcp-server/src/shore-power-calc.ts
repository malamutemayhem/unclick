export type ShorePowerType =
  | "low_voltage_single_phase"
  | "low_voltage_three_phase"
  | "medium_voltage_6_6kv"
  | "high_voltage_11kv"
  | "frequency_converter_50_60";

interface ShorePowerData {
  capacity: number;
  efficiency: number;
  safety: number;
  flexibility: number;
  spCost: number;
  autoConnect: boolean;
  forCruise: boolean;
  connection: string;
  bestUse: string;
}

const DATA: Record<ShorePowerType, ShorePowerData> = {
  low_voltage_single_phase: {
    capacity: 3, efficiency: 8, safety: 8, flexibility: 9, spCost: 3,
    autoConnect: false, forCruise: false,
    connection: "single_phase_240v_30a_shore_inlet",
    bestUse: "recreational_marina_small_vessel",
  },
  low_voltage_three_phase: {
    capacity: 5, efficiency: 8, safety: 8, flexibility: 7, spCost: 5,
    autoConnect: false, forCruise: false,
    connection: "three_phase_440v_100a_pin_sleeve",
    bestUse: "commercial_fishing_vessel_berth",
  },
  medium_voltage_6_6kv: {
    capacity: 8, efficiency: 9, safety: 9, flexibility: 6, spCost: 8,
    autoConnect: true, forCruise: true,
    connection: "mv_6600v_plug_cable_management",
    bestUse: "container_ship_bulk_carrier",
  },
  high_voltage_11kv: {
    capacity: 10, efficiency: 9, safety: 9, flexibility: 5, spCost: 10,
    autoConnect: true, forCruise: true,
    connection: "hv_11kv_iec_80005_standard",
    bestUse: "cruise_ship_cold_ironing",
  },
  frequency_converter_50_60: {
    capacity: 7, efficiency: 7, safety: 9, flexibility: 10, spCost: 9,
    autoConnect: true, forCruise: false,
    connection: "sfc_50_60hz_universal_converter",
    bestUse: "international_port_mixed_frequency",
  },
};

function get(t: ShorePowerType): ShorePowerData {
  return DATA[t];
}

export const capacity = (t: ShorePowerType) => get(t).capacity;
export const efficiency = (t: ShorePowerType) => get(t).efficiency;
export const safety = (t: ShorePowerType) => get(t).safety;
export const flexibility = (t: ShorePowerType) => get(t).flexibility;
export const spCost = (t: ShorePowerType) => get(t).spCost;
export const autoConnect = (t: ShorePowerType) => get(t).autoConnect;
export const forCruise = (t: ShorePowerType) => get(t).forCruise;
export const connection = (t: ShorePowerType) => get(t).connection;
export const bestUse = (t: ShorePowerType) => get(t).bestUse;
export const shorePowerTypes = (): ShorePowerType[] =>
  Object.keys(DATA) as ShorePowerType[];

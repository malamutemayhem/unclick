// capacitor-bank-calc - capacitor bank configurations

export type CapacitorBank =
  | "series_string_high_v"
  | "parallel_bank_high_c"
  | "series_parallel_combo"
  | "switched_cap_array"
  | "pfc_correction_bank";

const DATA: Record<CapacitorBank, {
  energyStore: number; voltageHandle: number; dischargeSafe: number; sizeCompact: number;
  cost: number; switched: boolean; forPowerFactor: boolean; topology: string; bestUse: string;
}> = {
  series_string_high_v:    { energyStore: 6, voltageHandle: 10, dischargeSafe: 5, sizeCompact: 4, cost: 5, switched: false, forPowerFactor: false, topology: "series_string_equal", bestUse: "high_voltage_hold" },
  parallel_bank_high_c:    { energyStore: 10, voltageHandle: 5, dischargeSafe: 6, sizeCompact: 3, cost: 6, switched: false, forPowerFactor: false, topology: "parallel_bus_bar", bestUse: "bulk_energy_reserve" },
  series_parallel_combo:   { energyStore: 8, voltageHandle: 8, dischargeSafe: 7, sizeCompact: 4, cost: 7, switched: false, forPowerFactor: false, topology: "matrix_series_parallel", bestUse: "balanced_power_bank" },
  switched_cap_array:      { energyStore: 7, voltageHandle: 7, dischargeSafe: 9, sizeCompact: 6, cost: 8, switched: true, forPowerFactor: false, topology: "relay_switched_stages", bestUse: "variable_capacitance" },
  pfc_correction_bank:     { energyStore: 7, voltageHandle: 8, dischargeSafe: 8, sizeCompact: 5, cost: 9, switched: true, forPowerFactor: true, topology: "auto_step_pfc", bestUse: "power_factor_correct" },
};

const get = (b: CapacitorBank) => DATA[b];
export const energyStore = (b: CapacitorBank) => get(b).energyStore;
export const voltageHandle = (b: CapacitorBank) => get(b).voltageHandle;
export const dischargeSafe = (b: CapacitorBank) => get(b).dischargeSafe;
export const sizeCompact = (b: CapacitorBank) => get(b).sizeCompact;
export const bankCost = (b: CapacitorBank) => get(b).cost;
export const switched = (b: CapacitorBank) => get(b).switched;
export const forPowerFactor = (b: CapacitorBank) => get(b).forPowerFactor;
export const topology = (b: CapacitorBank) => get(b).topology;
export const bestUse = (b: CapacitorBank) => get(b).bestUse;
export const capacitorBanks = (): CapacitorBank[] => Object.keys(DATA) as CapacitorBank[];

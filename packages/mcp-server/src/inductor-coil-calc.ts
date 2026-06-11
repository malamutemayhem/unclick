// inductor-coil-calc - inductor coil types for electronics

export type InductorCoil =
  | "ferrite_core_axial"
  | "air_core_wound"
  | "toroid_ring_core"
  | "smd_chip_inductor"
  | "iron_powder_shielded";

const DATA: Record<InductorCoil, {
  inductance: number; qFactor: number; currentHandle: number; sizeCompact: number;
  cost: number; shielded: boolean; forRf: boolean; coreType: string; bestUse: string;
}> = {
  ferrite_core_axial:     { inductance: 8, qFactor: 6, currentHandle: 7, sizeCompact: 5, cost: 3, shielded: false, forRf: false, coreType: "ferrite_rod_axial", bestUse: "general_filter_choke" },
  air_core_wound:         { inductance: 5, qFactor: 10, currentHandle: 5, sizeCompact: 3, cost: 4, shielded: false, forRf: true, coreType: "air_core_solenoid", bestUse: "high_freq_rf_tune" },
  toroid_ring_core:       { inductance: 9, qFactor: 8, currentHandle: 8, sizeCompact: 6, cost: 5, shielded: true, forRf: false, coreType: "ferrite_toroid_ring", bestUse: "power_supply_filter" },
  smd_chip_inductor:      { inductance: 4, qFactor: 7, currentHandle: 4, sizeCompact: 10, cost: 3, shielded: true, forRf: true, coreType: "multilayer_ceramic", bestUse: "compact_smd_filter" },
  iron_powder_shielded:   { inductance: 7, qFactor: 5, currentHandle: 10, sizeCompact: 4, cost: 6, shielded: true, forRf: false, coreType: "iron_powder_molded", bestUse: "high_current_power" },
};

const get = (i: InductorCoil) => DATA[i];
export const inductance = (i: InductorCoil) => get(i).inductance;
export const qFactor = (i: InductorCoil) => get(i).qFactor;
export const currentHandle = (i: InductorCoil) => get(i).currentHandle;
export const sizeCompact = (i: InductorCoil) => get(i).sizeCompact;
export const coilCost = (i: InductorCoil) => get(i).cost;
export const shielded = (i: InductorCoil) => get(i).shielded;
export const forRf = (i: InductorCoil) => get(i).forRf;
export const coreType = (i: InductorCoil) => get(i).coreType;
export const bestUse = (i: InductorCoil) => get(i).bestUse;
export const inductorCoils = (): InductorCoil[] => Object.keys(DATA) as InductorCoil[];

export type FailureMode =
  | "electromigration_wire"
  | "hot_carrier_injection"
  | "nbti_gate_degrade"
  | "tddb_oxide_break"
  | "solder_fatigue_crack";

const DATA: Record<FailureMode, {
  severity: number; detectability: number; occurrence: number;
  acceleration: number; fmCost: number; wearout: boolean;
  forReliability: boolean; mechanism: string; bestUse: string;
}> = {
  electromigration_wire: {
    severity: 9, detectability: 4, occurrence: 7,
    acceleration: 8, fmCost: 7, wearout: true,
    forReliability: true, mechanism: "current_density_void",
    bestUse: "interconnect_lifetime_pred",
  },
  hot_carrier_injection: {
    severity: 7, detectability: 6, occurrence: 6,
    acceleration: 7, fmCost: 5, wearout: true,
    forReliability: true, mechanism: "channel_electron_trap",
    bestUse: "transistor_vth_shift_model",
  },
  nbti_gate_degrade: {
    severity: 8, detectability: 5, occurrence: 8,
    acceleration: 9, fmCost: 6, wearout: true,
    forReliability: true, mechanism: "interface_trap_stress",
    bestUse: "pmos_aging_margin_guard",
  },
  tddb_oxide_break: {
    severity: 10, detectability: 3, occurrence: 5,
    acceleration: 10, fmCost: 8, wearout: true,
    forReliability: true, mechanism: "dielectric_field_rupture",
    bestUse: "gate_oxide_qual_screen",
  },
  solder_fatigue_crack: {
    severity: 8, detectability: 7, occurrence: 9,
    acceleration: 6, fmCost: 4, wearout: false,
    forReliability: false, mechanism: "thermal_cycle_strain",
    bestUse: "board_level_thermal_cycle",
  },
};

const get = (t: FailureMode) => DATA[t];

export const severity = (t: FailureMode) => get(t).severity;
export const detectability = (t: FailureMode) => get(t).detectability;
export const occurrence = (t: FailureMode) => get(t).occurrence;
export const acceleration = (t: FailureMode) => get(t).acceleration;
export const fmCost = (t: FailureMode) => get(t).fmCost;
export const wearout = (t: FailureMode) => get(t).wearout;
export const forReliability = (t: FailureMode) => get(t).forReliability;
export const mechanism = (t: FailureMode) => get(t).mechanism;
export const bestUse = (t: FailureMode) => get(t).bestUse;
export const failureModes = (): FailureMode[] => Object.keys(DATA) as FailureMode[];

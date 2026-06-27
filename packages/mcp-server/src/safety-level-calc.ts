export type SafetyLevel =
  | "sil_1_basic"
  | "sil_2_standard"
  | "sil_3_high"
  | "sil_4_critical"
  | "performance_level_e";

const DATA: Record<SafetyLevel, {
  riskReduction: number; diagnosticCoverage: number; redundancy: number;
  proofTestInterval: number; slCost: number; faultTolerant: boolean;
  forProcess: boolean; architecture: string; bestUse: string;
}> = {
  sil_1_basic: {
    riskReduction: 3, diagnosticCoverage: 3, redundancy: 1,
    proofTestInterval: 8, slCost: 2, faultTolerant: false,
    forProcess: false, architecture: "single_channel_1oo1",
    bestUse: "conveyor_guard_door_interlock",
  },
  sil_2_standard: {
    riskReduction: 5, diagnosticCoverage: 6, redundancy: 4,
    proofTestInterval: 6, slCost: 4, faultTolerant: false,
    forProcess: true, architecture: "single_channel_1oo1d",
    bestUse: "burner_management_system",
  },
  sil_3_high: {
    riskReduction: 8, diagnosticCoverage: 8, redundancy: 8,
    proofTestInterval: 4, slCost: 7, faultTolerant: true,
    forProcess: true, architecture: "dual_channel_1oo2",
    bestUse: "emergency_shutdown_esd",
  },
  sil_4_critical: {
    riskReduction: 10, diagnosticCoverage: 10, redundancy: 10,
    proofTestInterval: 2, slCost: 10, faultTolerant: true,
    forProcess: false, architecture: "triple_modular_2oo3",
    bestUse: "nuclear_reactor_scram",
  },
  performance_level_e: {
    riskReduction: 9, diagnosticCoverage: 9, redundancy: 9,
    proofTestInterval: 3, slCost: 8, faultTolerant: true,
    forProcess: false, architecture: "category_4_dual_monitored",
    bestUse: "robot_cell_safety_plc",
  },
};

const get = (t: SafetyLevel) => DATA[t];

export const riskReduction = (t: SafetyLevel) => get(t).riskReduction;
export const diagnosticCoverage = (t: SafetyLevel) => get(t).diagnosticCoverage;
export const redundancy = (t: SafetyLevel) => get(t).redundancy;
export const proofTestInterval = (t: SafetyLevel) => get(t).proofTestInterval;
export const slCost = (t: SafetyLevel) => get(t).slCost;
export const faultTolerant = (t: SafetyLevel) => get(t).faultTolerant;
export const forProcess = (t: SafetyLevel) => get(t).forProcess;
export const architecture = (t: SafetyLevel) => get(t).architecture;
export const bestUse = (t: SafetyLevel) => get(t).bestUse;
export const safetyLevels = (): SafetyLevel[] => Object.keys(DATA) as SafetyLevel[];

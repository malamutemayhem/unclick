export type KilnSitterType =
  | "cone_sitter_standard"
  | "bar_sitter_flat"
  | "timer_backup_dual"
  | "limit_timer_safety"
  | "digital_sitter_auto";

const specs: Record<KilnSitterType, {
  shutoffAccuracy: number; reliability: number; setupEase: number;
  tempRange: number; cost: number; digital: boolean; hasTimer: boolean;
  triggerMethod: string; use: string;
}> = {
  cone_sitter_standard: {
    shutoffAccuracy: 85, reliability: 88, setupEase: 82,
    tempRange: 85, cost: 40, digital: false, hasTimer: false,
    triggerMethod: "cone_bend_trigger", use: "general_shutoff_cone",
  },
  bar_sitter_flat: {
    shutoffAccuracy: 82, reliability: 85, setupEase: 85,
    tempRange: 82, cost: 35, digital: false, hasTimer: false,
    triggerMethod: "bar_sag_trigger", use: "flat_bar_shutoff",
  },
  timer_backup_dual: {
    shutoffAccuracy: 88, reliability: 92, setupEase: 80,
    tempRange: 85, cost: 60, digital: false, hasTimer: true,
    triggerMethod: "cone_plus_timer", use: "dual_safety_shutoff",
  },
  limit_timer_safety: {
    shutoffAccuracy: 78, reliability: 90, setupEase: 88,
    tempRange: 80, cost: 25, digital: false, hasTimer: true,
    triggerMethod: "max_time_cutoff", use: "backup_time_limit",
  },
  digital_sitter_auto: {
    shutoffAccuracy: 92, reliability: 85, setupEase: 78,
    tempRange: 92, cost: 120, digital: true, hasTimer: true,
    triggerMethod: "thermocouple_auto", use: "precise_digital_shutoff",
  },
};

export function shutoffAccuracy(t: KilnSitterType): number { return specs[t].shutoffAccuracy; }
export function reliability(t: KilnSitterType): number { return specs[t].reliability; }
export function setupEase(t: KilnSitterType): number { return specs[t].setupEase; }
export function tempRange(t: KilnSitterType): number { return specs[t].tempRange; }
export function sitterCost(t: KilnSitterType): number { return specs[t].cost; }
export function digital(t: KilnSitterType): boolean { return specs[t].digital; }
export function hasTimer(t: KilnSitterType): boolean { return specs[t].hasTimer; }
export function triggerMethod(t: KilnSitterType): string { return specs[t].triggerMethod; }
export function bestUse(t: KilnSitterType): string { return specs[t].use; }
export function kilnSitters(): KilnSitterType[] { return Object.keys(specs) as KilnSitterType[]; }

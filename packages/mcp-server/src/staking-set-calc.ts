export type StakingSetType =
  | "basic_set_standard"
  | "professional_set_full"
  | "micro_set_small"
  | "universal_set_adapt"
  | "heavy_duty_clock";

const specs: Record<StakingSetType, {
  punchCount: number; stumpCount: number; accuracy: number;
  taskRange: number; cost: number; forClock: boolean; microSize: boolean;
  baseStyle: string; use: string;
}> = {
  basic_set_standard: {
    punchCount: 50, stumpCount: 25, accuracy: 75,
    taskRange: 70, cost: 80, forClock: false, microSize: false,
    baseStyle: "steel_block_base", use: "general_watch_stake",
  },
  professional_set_full: {
    punchCount: 150, stumpCount: 75, accuracy: 90,
    taskRange: 95, cost: 400, forClock: false, microSize: false,
    baseStyle: "heavy_anvil_base", use: "full_service_stake",
  },
  micro_set_small: {
    punchCount: 30, stumpCount: 15, accuracy: 92,
    taskRange: 55, cost: 120, forClock: false, microSize: true,
    baseStyle: "precision_micro_base", use: "small_caliber_stake",
  },
  universal_set_adapt: {
    punchCount: 80, stumpCount: 40, accuracy: 82,
    taskRange: 88, cost: 250, forClock: false, microSize: false,
    baseStyle: "modular_adapt_base", use: "versatile_stake_work",
  },
  heavy_duty_clock: {
    punchCount: 60, stumpCount: 30, accuracy: 78,
    taskRange: 75, cost: 200, forClock: true, microSize: false,
    baseStyle: "large_anvil_base", use: "clock_pivot_stake",
  },
};

export function punchCount(t: StakingSetType): number { return specs[t].punchCount; }
export function stumpCount(t: StakingSetType): number { return specs[t].stumpCount; }
export function accuracy(t: StakingSetType): number { return specs[t].accuracy; }
export function taskRange(t: StakingSetType): number { return specs[t].taskRange; }
export function setCost(t: StakingSetType): number { return specs[t].cost; }
export function forClock(t: StakingSetType): boolean { return specs[t].forClock; }
export function microSize(t: StakingSetType): boolean { return specs[t].microSize; }
export function baseStyle(t: StakingSetType): string { return specs[t].baseStyle; }
export function bestUse(t: StakingSetType): string { return specs[t].use; }
export function stakingSets(): StakingSetType[] { return Object.keys(specs) as StakingSetType[]; }

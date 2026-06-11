export type BalanceWheelWatchType =
  | "plain_brass_standard"
  | "bimetallic_comp_temp"
  | "glucydur_alloy_modern"
  | "free_sprung_precision"
  | "gyromax_variable_inertia";

const specs: Record<BalanceWheelWatchType, {
  timekeep: number; tempStable: number; adjustEase: number;
  durability: number; cost: number; compensated: boolean; freeSpring: boolean;
  material: string; use: string;
}> = {
  plain_brass_standard: {
    timekeep: 65, tempStable: 50, adjustEase: 85,
    durability: 75, cost: 20, compensated: false, freeSpring: false,
    material: "solid_brass_disc", use: "basic_time_regulate",
  },
  bimetallic_comp_temp: {
    timekeep: 78, tempStable: 88, adjustEase: 70,
    durability: 72, cost: 60, compensated: true, freeSpring: false,
    material: "brass_steel_laminate", use: "temp_compensate",
  },
  glucydur_alloy_modern: {
    timekeep: 88, tempStable: 92, adjustEase: 75,
    durability: 90, cost: 120, compensated: true, freeSpring: false,
    material: "beryllium_copper_alloy", use: "modern_precision_time",
  },
  free_sprung_precision: {
    timekeep: 92, tempStable: 85, adjustEase: 55,
    durability: 82, cost: 200, compensated: false, freeSpring: true,
    material: "nickel_alloy_disc", use: "chronometer_regulate",
  },
  gyromax_variable_inertia: {
    timekeep: 95, tempStable: 90, adjustEase: 60,
    durability: 88, cost: 500, compensated: true, freeSpring: true,
    material: "silinvar_composite", use: "high_precision_adjust",
  },
};

export function timekeep(t: BalanceWheelWatchType): number { return specs[t].timekeep; }
export function tempStable(t: BalanceWheelWatchType): number { return specs[t].tempStable; }
export function adjustEase(t: BalanceWheelWatchType): number { return specs[t].adjustEase; }
export function durability(t: BalanceWheelWatchType): number { return specs[t].durability; }
export function wheelCost(t: BalanceWheelWatchType): number { return specs[t].cost; }
export function compensated(t: BalanceWheelWatchType): boolean { return specs[t].compensated; }
export function freeSpring(t: BalanceWheelWatchType): boolean { return specs[t].freeSpring; }
export function material(t: BalanceWheelWatchType): string { return specs[t].material; }
export function bestUse(t: BalanceWheelWatchType): string { return specs[t].use; }
export function balanceWheelWatches(): BalanceWheelWatchType[] { return Object.keys(specs) as BalanceWheelWatchType[]; }

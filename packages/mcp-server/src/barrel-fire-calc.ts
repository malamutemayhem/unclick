export type BarrelFireType =
  | "metal_drum_standard"
  | "brick_barrel_heavy"
  | "fiber_drum_light"
  | "stacked_brick_open"
  | "insulated_barrel_hot";

const specs: Record<BarrelFireType, {
  heatRetain: number; loadCapacity: number; tempRange: number;
  setupEase: number; cost: number; insulated: boolean; portable: boolean;
  wallType: string; use: string;
}> = {
  metal_drum_standard: {
    heatRetain: 78, loadCapacity: 85, tempRange: 82,
    setupEase: 88, cost: 25, insulated: false, portable: true,
    wallType: "steel_drum_wall", use: "general_barrel_fire",
  },
  brick_barrel_heavy: {
    heatRetain: 92, loadCapacity: 90, tempRange: 88,
    setupEase: 60, cost: 80, insulated: true, portable: false,
    wallType: "firebrick_stack", use: "high_temp_barrel",
  },
  fiber_drum_light: {
    heatRetain: 70, loadCapacity: 75, tempRange: 72,
    setupEase: 92, cost: 10, insulated: false, portable: true,
    wallType: "ceramic_fiber_wrap", use: "portable_light_fire",
  },
  stacked_brick_open: {
    heatRetain: 85, loadCapacity: 88, tempRange: 85,
    setupEase: 75, cost: 40, insulated: false, portable: false,
    wallType: "loose_brick_ring", use: "open_air_stack_fire",
  },
  insulated_barrel_hot: {
    heatRetain: 95, loadCapacity: 82, tempRange: 92,
    setupEase: 70, cost: 60, insulated: true, portable: false,
    wallType: "blanket_lined_drum", use: "high_temp_insulated",
  },
};

export function heatRetain(t: BarrelFireType): number { return specs[t].heatRetain; }
export function loadCapacity(t: BarrelFireType): number { return specs[t].loadCapacity; }
export function tempRange(t: BarrelFireType): number { return specs[t].tempRange; }
export function setupEase(t: BarrelFireType): number { return specs[t].setupEase; }
export function barrelCost(t: BarrelFireType): number { return specs[t].cost; }
export function insulated(t: BarrelFireType): boolean { return specs[t].insulated; }
export function portable(t: BarrelFireType): boolean { return specs[t].portable; }
export function wallType(t: BarrelFireType): string { return specs[t].wallType; }
export function bestUse(t: BarrelFireType): string { return specs[t].use; }
export function barrelFires(): BarrelFireType[] { return Object.keys(specs) as BarrelFireType[]; }

export type HardyHoleType =
  | "square_hardy_standard"
  | "round_hardy_insert"
  | "stepped_hardy_multi"
  | "tapered_hardy_wedge"
  | "quick_change_lock";

const specs: Record<HardyHoleType, {
  toolFit: number; swapSpeed: number; loadCapacity: number;
  sizeRange: number; cost: number; quickChange: boolean; stepped: boolean;
  holeProfile: string; use: string;
}> = {
  square_hardy_standard: {
    toolFit: 85, swapSpeed: 78, loadCapacity: 88,
    sizeRange: 82, cost: 0, quickChange: false, stepped: false,
    holeProfile: "square_one_inch", use: "general_hardy_mount",
  },
  round_hardy_insert: {
    toolFit: 78, swapSpeed: 82, loadCapacity: 80,
    sizeRange: 75, cost: 15, quickChange: false, stepped: false,
    holeProfile: "round_adapter_sleeve", use: "round_tool_adapt",
  },
  stepped_hardy_multi: {
    toolFit: 82, swapSpeed: 75, loadCapacity: 85,
    sizeRange: 92, cost: 25, quickChange: false, stepped: true,
    holeProfile: "multi_step_square", use: "multi_size_tool_fit",
  },
  tapered_hardy_wedge: {
    toolFit: 90, swapSpeed: 70, loadCapacity: 90,
    sizeRange: 78, cost: 20, quickChange: false, stepped: false,
    holeProfile: "tapered_wedge_lock", use: "tight_lock_heavy_work",
  },
  quick_change_lock: {
    toolFit: 88, swapSpeed: 95, loadCapacity: 82,
    sizeRange: 85, cost: 40, quickChange: true, stepped: false,
    holeProfile: "spring_lock_release", use: "rapid_tool_swap",
  },
};

export function toolFit(t: HardyHoleType): number { return specs[t].toolFit; }
export function swapSpeed(t: HardyHoleType): number { return specs[t].swapSpeed; }
export function loadCapacity(t: HardyHoleType): number { return specs[t].loadCapacity; }
export function sizeRange(t: HardyHoleType): number { return specs[t].sizeRange; }
export function holeCost(t: HardyHoleType): number { return specs[t].cost; }
export function quickChange(t: HardyHoleType): boolean { return specs[t].quickChange; }
export function stepped(t: HardyHoleType): boolean { return specs[t].stepped; }
export function holeProfile(t: HardyHoleType): string { return specs[t].holeProfile; }
export function bestUse(t: HardyHoleType): string { return specs[t].use; }
export function hardyHoles(): HardyHoleType[] { return Object.keys(specs) as HardyHoleType[]; }

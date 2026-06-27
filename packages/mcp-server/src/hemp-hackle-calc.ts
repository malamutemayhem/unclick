export type HempHackleType =
  | "fine_pin_standard"
  | "coarse_pin_rough"
  | "double_row_fast"
  | "adjustable_pin_set"
  | "powered_hackle_drum";

const specs: Record<HempHackleType, {
  fiberSplit: number; cleanSeparate: number; speedHackle: number;
  fiberRange: number; cost: number; powered: boolean; adjustable: boolean;
  pinDensity: string; use: string;
}> = {
  fine_pin_standard: {
    fiberSplit: 85, cleanSeparate: 92, speedHackle: 55,
    fiberRange: 65, cost: 40, powered: false, adjustable: false,
    pinDensity: "fine_close_set", use: "fine_fiber_dress",
  },
  coarse_pin_rough: {
    fiberSplit: 90, cleanSeparate: 65, speedHackle: 80,
    fiberRange: 85, cost: 30, powered: false, adjustable: false,
    pinDensity: "coarse_wide_set", use: "rough_fiber_break",
  },
  double_row_fast: {
    fiberSplit: 82, cleanSeparate: 78, speedHackle: 90,
    fiberRange: 75, cost: 55, powered: false, adjustable: false,
    pinDensity: "double_row_stagger", use: "fast_fiber_process",
  },
  adjustable_pin_set: {
    fiberSplit: 78, cleanSeparate: 80, speedHackle: 65,
    fiberRange: 95, cost: 80, powered: false, adjustable: true,
    pinDensity: "variable_pin_space", use: "multi_fiber_type",
  },
  powered_hackle_drum: {
    fiberSplit: 80, cleanSeparate: 75, speedHackle: 95,
    fiberRange: 88, cost: 350, powered: true, adjustable: false,
    pinDensity: "drum_pin_array", use: "production_hackle",
  },
};

export function fiberSplit(t: HempHackleType): number { return specs[t].fiberSplit; }
export function cleanSeparate(t: HempHackleType): number { return specs[t].cleanSeparate; }
export function speedHackle(t: HempHackleType): number { return specs[t].speedHackle; }
export function fiberRange(t: HempHackleType): number { return specs[t].fiberRange; }
export function hackleCost(t: HempHackleType): number { return specs[t].cost; }
export function powered(t: HempHackleType): boolean { return specs[t].powered; }
export function adjustable(t: HempHackleType): boolean { return specs[t].adjustable; }
export function pinDensity(t: HempHackleType): string { return specs[t].pinDensity; }
export function bestUse(t: HempHackleType): string { return specs[t].use; }
export function hempHackles(): HempHackleType[] { return Object.keys(specs) as HempHackleType[]; }

export type ResinDrillType =
  | "pin_vise_hand"
  | "rotary_tool_speed"
  | "drill_press_precision"
  | "step_bit_graduated"
  | "diamond_bit_fine";

const specs: Record<ResinDrillType, {
  holePrecision: number; speedDrill: number; chipFree: number;
  sizeRange: number; cost: number; powered: boolean; forFine: boolean;
  bitStyle: string; use: string;
}> = {
  pin_vise_hand: {
    holePrecision: 88, speedDrill: 60, chipFree: 90,
    sizeRange: 75, cost: 4, powered: false, forFine: true,
    bitStyle: "twist_drill_micro", use: "small_hole_hand_drill",
  },
  rotary_tool_speed: {
    holePrecision: 82, speedDrill: 90, chipFree: 78,
    sizeRange: 88, cost: 8, powered: true, forFine: false,
    bitStyle: "collet_chuck_variable", use: "general_fast_drill",
  },
  drill_press_precision: {
    holePrecision: 95, speedDrill: 85, chipFree: 85,
    sizeRange: 92, cost: 12, powered: true, forFine: false,
    bitStyle: "bench_press_chuck", use: "precise_repeat_drill",
  },
  step_bit_graduated: {
    holePrecision: 78, speedDrill: 82, chipFree: 80,
    sizeRange: 95, cost: 6, powered: false, forFine: false,
    bitStyle: "conical_step_flute", use: "multi_size_hole_enlarge",
  },
  diamond_bit_fine: {
    holePrecision: 92, speedDrill: 72, chipFree: 92,
    sizeRange: 70, cost: 9, powered: false, forFine: true,
    bitStyle: "diamond_coated_point", use: "chip_free_fine_hole",
  },
};

export function holePrecision(t: ResinDrillType): number { return specs[t].holePrecision; }
export function speedDrill(t: ResinDrillType): number { return specs[t].speedDrill; }
export function chipFree(t: ResinDrillType): number { return specs[t].chipFree; }
export function sizeRange(t: ResinDrillType): number { return specs[t].sizeRange; }
export function drillCost(t: ResinDrillType): number { return specs[t].cost; }
export function powered(t: ResinDrillType): boolean { return specs[t].powered; }
export function forFine(t: ResinDrillType): boolean { return specs[t].forFine; }
export function bitStyle(t: ResinDrillType): string { return specs[t].bitStyle; }
export function bestUse(t: ResinDrillType): string { return specs[t].use; }
export function resinDrills(): ResinDrillType[] { return Object.keys(specs) as ResinDrillType[]; }

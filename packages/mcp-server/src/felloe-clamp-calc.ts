export type FelloeClampType =
  | "screw_clamp_standard"
  | "wedge_clamp_fast"
  | "chain_clamp_large"
  | "bar_clamp_adjustable"
  | "hydraulic_clamp_power";

const specs: Record<FelloeClampType, {
  holdForce: number; alignAccuracy: number; speedSet: number;
  sizeRange: number; cost: number; powered: boolean; forLarge: boolean;
  jawStyle: string; use: string;
}> = {
  screw_clamp_standard: {
    holdForce: 80, alignAccuracy: 85, speedSet: 65,
    sizeRange: 70, cost: 45, powered: false, forLarge: false,
    jawStyle: "curved_jaw_pair", use: "general_felloe_glue",
  },
  wedge_clamp_fast: {
    holdForce: 72, alignAccuracy: 78, speedSet: 92,
    sizeRange: 65, cost: 35, powered: false, forLarge: false,
    jawStyle: "tapered_wedge_jaw", use: "quick_felloe_set",
  },
  chain_clamp_large: {
    holdForce: 90, alignAccuracy: 68, speedSet: 70,
    sizeRange: 95, cost: 60, powered: false, forLarge: true,
    jawStyle: "chain_wrap_band", use: "large_wheel_felloe",
  },
  bar_clamp_adjustable: {
    holdForce: 78, alignAccuracy: 88, speedSet: 75,
    sizeRange: 85, cost: 55, powered: false, forLarge: false,
    jawStyle: "sliding_bar_jaw", use: "adjustable_felloe_fit",
  },
  hydraulic_clamp_power: {
    holdForce: 95, alignAccuracy: 72, speedSet: 80,
    sizeRange: 90, cost: 350, powered: true, forLarge: true,
    jawStyle: "hydraulic_pad_jaw", use: "production_felloe_press",
  },
};

export function holdForce(t: FelloeClampType): number { return specs[t].holdForce; }
export function alignAccuracy(t: FelloeClampType): number { return specs[t].alignAccuracy; }
export function speedSet(t: FelloeClampType): number { return specs[t].speedSet; }
export function sizeRange(t: FelloeClampType): number { return specs[t].sizeRange; }
export function clampCost(t: FelloeClampType): number { return specs[t].cost; }
export function powered(t: FelloeClampType): boolean { return specs[t].powered; }
export function forLarge(t: FelloeClampType): boolean { return specs[t].forLarge; }
export function jawStyle(t: FelloeClampType): string { return specs[t].jawStyle; }
export function bestUse(t: FelloeClampType): string { return specs[t].use; }
export function felloeClamps(): FelloeClampType[] { return Object.keys(specs) as FelloeClampType[]; }

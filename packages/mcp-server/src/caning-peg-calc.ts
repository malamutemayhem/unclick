export type CaningPegType =
  | "wooden_peg_standard"
  | "brass_peg_durable"
  | "plastic_peg_budget"
  | "tapered_peg_tight"
  | "golf_tee_quick";

const specs: Record<CaningPegType, {
  holdSecure: number; removEase: number; durability: number;
  fitRange: number; cost: number; reusable: boolean; tapered: boolean;
  material: string; use: string;
}> = {
  wooden_peg_standard: {
    holdSecure: 85, removEase: 82, durability: 75,
    fitRange: 80, cost: 3, reusable: true, tapered: false,
    material: "hardwood_dowel_round", use: "general_cane_hold",
  },
  brass_peg_durable: {
    holdSecure: 88, removEase: 85, durability: 95,
    fitRange: 78, cost: 12, reusable: true, tapered: false,
    material: "solid_brass_pin", use: "permanent_hold_display",
  },
  plastic_peg_budget: {
    holdSecure: 75, removEase: 88, durability: 70,
    fitRange: 85, cost: 1, reusable: false, tapered: false,
    material: "nylon_dowel_round", use: "temporary_budget_hold",
  },
  tapered_peg_tight: {
    holdSecure: 92, removEase: 72, durability: 80,
    fitRange: 90, cost: 5, reusable: true, tapered: true,
    material: "tapered_hardwood_cone", use: "tight_fit_various_hole",
  },
  golf_tee_quick: {
    holdSecure: 70, removEase: 95, durability: 65,
    fitRange: 72, cost: 1, reusable: false, tapered: true,
    material: "shaped_wood_tee", use: "quick_temporary_hold",
  },
};

export function holdSecure(t: CaningPegType): number { return specs[t].holdSecure; }
export function removEase(t: CaningPegType): number { return specs[t].removEase; }
export function durability(t: CaningPegType): number { return specs[t].durability; }
export function fitRange(t: CaningPegType): number { return specs[t].fitRange; }
export function pegCost(t: CaningPegType): number { return specs[t].cost; }
export function reusable(t: CaningPegType): boolean { return specs[t].reusable; }
export function tapered(t: CaningPegType): boolean { return specs[t].tapered; }
export function material(t: CaningPegType): string { return specs[t].material; }
export function bestUse(t: CaningPegType): string { return specs[t].use; }
export function caningPegs(): CaningPegType[] { return Object.keys(specs) as CaningPegType[]; }

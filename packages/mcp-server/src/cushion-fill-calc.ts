export type CushionFillType =
  | "foam_block_standard"
  | "down_feather_luxury"
  | "polyester_fiber_budget"
  | "spring_down_combo"
  | "latex_foam_firm";

const specs: Record<CushionFillType, {
  comfort: number; support: number; durability: number;
  recovery: number; cost: number; natural: boolean; hypoallergenic: boolean;
  fillDensity: string; use: string;
}> = {
  foam_block_standard: {
    comfort: 75, support: 85, durability: 80,
    recovery: 82, cost: 30, natural: false, hypoallergenic: true,
    fillDensity: "medium_density_foam", use: "general_seat_cushion",
  },
  down_feather_luxury: {
    comfort: 95, support: 55, durability: 65,
    recovery: 70, cost: 120, natural: true, hypoallergenic: false,
    fillDensity: "light_loft_cluster", use: "luxury_back_cushion",
  },
  polyester_fiber_budget: {
    comfort: 68, support: 60, durability: 70,
    recovery: 55, cost: 12, natural: false, hypoallergenic: true,
    fillDensity: "loose_fiber_fill", use: "budget_scatter_cushion",
  },
  spring_down_combo: {
    comfort: 88, support: 90, durability: 85,
    recovery: 88, cost: 80, natural: false, hypoallergenic: false,
    fillDensity: "spring_core_down_wrap", use: "premium_seat_cushion",
  },
  latex_foam_firm: {
    comfort: 78, support: 92, durability: 90,
    recovery: 95, cost: 60, natural: true, hypoallergenic: true,
    fillDensity: "dense_latex_core", use: "firm_support_cushion",
  },
};

export function comfort(t: CushionFillType): number { return specs[t].comfort; }
export function support(t: CushionFillType): number { return specs[t].support; }
export function durability(t: CushionFillType): number { return specs[t].durability; }
export function recovery(t: CushionFillType): number { return specs[t].recovery; }
export function fillCost(t: CushionFillType): number { return specs[t].cost; }
export function natural(t: CushionFillType): boolean { return specs[t].natural; }
export function hypoallergenic(t: CushionFillType): boolean { return specs[t].hypoallergenic; }
export function fillDensity(t: CushionFillType): string { return specs[t].fillDensity; }
export function bestUse(t: CushionFillType): string { return specs[t].use; }
export function cushionFills(): CushionFillType[] { return Object.keys(specs) as CushionFillType[]; }

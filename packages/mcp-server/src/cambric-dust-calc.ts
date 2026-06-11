export type CambricDustType =
  | "black_cambric_standard"
  | "white_cambric_light"
  | "nonwoven_fabric_budget"
  | "mesh_cambric_breathe"
  | "adhesive_back_easy";

const specs: Record<CambricDustType, {
  dustBlock: number; breathable: number; durability: number;
  attachEase: number; cost: number; adhesive: boolean; mesh: boolean;
  weaveType: string; use: string;
}> = {
  black_cambric_standard: {
    dustBlock: 88, breathable: 72, durability: 85,
    attachEase: 80, cost: 8, adhesive: false, mesh: false,
    weaveType: "tight_plain_weave", use: "general_bottom_cover",
  },
  white_cambric_light: {
    dustBlock: 85, breathable: 75, durability: 80,
    attachEase: 80, cost: 7, adhesive: false, mesh: false,
    weaveType: "light_plain_weave", use: "visible_clean_cover",
  },
  nonwoven_fabric_budget: {
    dustBlock: 78, breathable: 82, durability: 70,
    attachEase: 85, cost: 4, adhesive: false, mesh: false,
    weaveType: "bonded_fiber_sheet", use: "budget_dust_cover",
  },
  mesh_cambric_breathe: {
    dustBlock: 70, breathable: 95, durability: 75,
    attachEase: 82, cost: 6, adhesive: false, mesh: true,
    weaveType: "open_mesh_weave", use: "ventilated_bottom_cover",
  },
  adhesive_back_easy: {
    dustBlock: 85, breathable: 70, durability: 82,
    attachEase: 95, cost: 12, adhesive: true, mesh: false,
    weaveType: "peel_stick_cambric", use: "quick_repair_cover",
  },
};

export function dustBlock(t: CambricDustType): number { return specs[t].dustBlock; }
export function breathable(t: CambricDustType): number { return specs[t].breathable; }
export function durability(t: CambricDustType): number { return specs[t].durability; }
export function attachEase(t: CambricDustType): number { return specs[t].attachEase; }
export function cambricCost(t: CambricDustType): number { return specs[t].cost; }
export function adhesive(t: CambricDustType): boolean { return specs[t].adhesive; }
export function mesh(t: CambricDustType): boolean { return specs[t].mesh; }
export function weaveType(t: CambricDustType): string { return specs[t].weaveType; }
export function bestUse(t: CambricDustType): string { return specs[t].use; }
export function cambricDusts(): CambricDustType[] { return Object.keys(specs) as CambricDustType[]; }

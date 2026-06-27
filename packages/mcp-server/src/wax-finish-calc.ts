export type WaxFinishType =
  | "beeswax_paste_natural"
  | "carnauba_wax_hard"
  | "microcrystal_wax_fine"
  | "paraffin_wax_budget"
  | "dark_wax_antique";

const specs: Record<WaxFinishType, {
  sheenLevel: number; protectDepth: number; buffEase: number;
  durability: number; cost: number; natural: boolean; darkening: boolean;
  waxSource: string; use: string;
}> = {
  beeswax_paste_natural: {
    sheenLevel: 82, protectDepth: 80, buffEase: 90,
    durability: 78, cost: 7, natural: true, darkening: false,
    waxSource: "honeybee_comb_render", use: "gentle_natural_sheen",
  },
  carnauba_wax_hard: {
    sheenLevel: 92, protectDepth: 88, buffEase: 78,
    durability: 90, cost: 9, natural: true, darkening: false,
    waxSource: "palm_leaf_extract", use: "high_gloss_hard_finish",
  },
  microcrystal_wax_fine: {
    sheenLevel: 88, protectDepth: 85, buffEase: 85,
    durability: 85, cost: 8, natural: false, darkening: false,
    waxSource: "refined_petroleum_micro", use: "smooth_satin_finish",
  },
  paraffin_wax_budget: {
    sheenLevel: 75, protectDepth: 72, buffEase: 92,
    durability: 70, cost: 4, natural: false, darkening: false,
    waxSource: "petroleum_refined_block", use: "basic_surface_seal",
  },
  dark_wax_antique: {
    sheenLevel: 78, protectDepth: 82, buffEase: 80,
    durability: 80, cost: 8, natural: false, darkening: true,
    waxSource: "pigmented_wax_blend", use: "antique_distress_effect",
  },
};

export function sheenLevel(t: WaxFinishType): number { return specs[t].sheenLevel; }
export function protectDepth(t: WaxFinishType): number { return specs[t].protectDepth; }
export function buffEase(t: WaxFinishType): number { return specs[t].buffEase; }
export function durability(t: WaxFinishType): number { return specs[t].durability; }
export function waxCost(t: WaxFinishType): number { return specs[t].cost; }
export function natural(t: WaxFinishType): boolean { return specs[t].natural; }
export function darkening(t: WaxFinishType): boolean { return specs[t].darkening; }
export function waxSource(t: WaxFinishType): string { return specs[t].waxSource; }
export function bestUse(t: WaxFinishType): string { return specs[t].use; }
export function waxFinishs(): WaxFinishType[] { return Object.keys(specs) as WaxFinishType[]; }

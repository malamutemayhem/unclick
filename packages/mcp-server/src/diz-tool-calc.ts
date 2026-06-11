export type DizToolType =
  | "wooden_diz_standard"
  | "ceramic_diz_smooth"
  | "bone_diz_traditional"
  | "shell_diz_natural"
  | "adjustable_diz_set";

const specs: Record<DizToolType, {
  fiberDraft: number; sizingEven: number; durability: number;
  holeRange: number; cost: number; natural: boolean; adjustable: boolean;
  holeMaterial: string; use: string;
}> = {
  wooden_diz_standard: {
    fiberDraft: 85, sizingEven: 82, durability: 80,
    holeRange: 78, cost: 8, natural: true, adjustable: false,
    holeMaterial: "hardwood_drilled", use: "general_fiber_diz",
  },
  ceramic_diz_smooth: {
    fiberDraft: 88, sizingEven: 90, durability: 75,
    holeRange: 82, cost: 15, natural: false, adjustable: false,
    holeMaterial: "glazed_ceramic_hole", use: "smooth_even_draft",
  },
  bone_diz_traditional: {
    fiberDraft: 82, sizingEven: 85, durability: 88,
    holeRange: 75, cost: 12, natural: true, adjustable: false,
    holeMaterial: "polished_bone_hole", use: "traditional_hand_diz",
  },
  shell_diz_natural: {
    fiberDraft: 80, sizingEven: 78, durability: 70,
    holeRange: 72, cost: 5, natural: true, adjustable: false,
    holeMaterial: "natural_shell_hole", use: "natural_found_diz",
  },
  adjustable_diz_set: {
    fiberDraft: 85, sizingEven: 88, durability: 85,
    holeRange: 95, cost: 20, natural: false, adjustable: true,
    holeMaterial: "disc_insert_set", use: "variable_size_draft",
  },
};

export function fiberDraft(t: DizToolType): number { return specs[t].fiberDraft; }
export function sizingEven(t: DizToolType): number { return specs[t].sizingEven; }
export function durability(t: DizToolType): number { return specs[t].durability; }
export function holeRange(t: DizToolType): number { return specs[t].holeRange; }
export function dizCost(t: DizToolType): number { return specs[t].cost; }
export function natural(t: DizToolType): boolean { return specs[t].natural; }
export function adjustable(t: DizToolType): boolean { return specs[t].adjustable; }
export function holeMaterial(t: DizToolType): string { return specs[t].holeMaterial; }
export function bestUse(t: DizToolType): string { return specs[t].use; }
export function dizTools(): DizToolType[] { return Object.keys(specs) as DizToolType[]; }

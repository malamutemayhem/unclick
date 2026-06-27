export type LathekinToolType =
  | "wooden_lathekin_standard"
  | "plastic_lathekin_smooth"
  | "bone_lathekin_traditional"
  | "metal_lathekin_durable"
  | "teflon_lathekin_nonstick";

const specs: Record<LathekinToolType, {
  openEase: number; scratchResist: number; durability: number;
  gripComfort: number; cost: number; nonMarring: boolean; traditional: boolean;
  tipMaterial: string; use: string;
}> = {
  wooden_lathekin_standard: {
    openEase: 82, scratchResist: 85, durability: 70,
    gripComfort: 88, cost: 8, nonMarring: true, traditional: true,
    tipMaterial: "hardwood_polished_tip", use: "general_came_open",
  },
  plastic_lathekin_smooth: {
    openEase: 78, scratchResist: 90, durability: 75,
    gripComfort: 82, cost: 5, nonMarring: true, traditional: false,
    tipMaterial: "nylon_molded_tip", use: "student_came_work",
  },
  bone_lathekin_traditional: {
    openEase: 85, scratchResist: 88, durability: 65,
    gripComfort: 90, cost: 15, nonMarring: true, traditional: true,
    tipMaterial: "polished_bone_tip", use: "traditional_lead_work",
  },
  metal_lathekin_durable: {
    openEase: 90, scratchResist: 70, durability: 95,
    gripComfort: 75, cost: 12, nonMarring: false, traditional: false,
    tipMaterial: "stainless_steel_tip", use: "heavy_zinc_came",
  },
  teflon_lathekin_nonstick: {
    openEase: 88, scratchResist: 95, durability: 80,
    gripComfort: 85, cost: 18, nonMarring: true, traditional: false,
    tipMaterial: "teflon_coated_tip", use: "delicate_glass_came",
  },
};

export function openEase(t: LathekinToolType): number { return specs[t].openEase; }
export function scratchResist(t: LathekinToolType): number { return specs[t].scratchResist; }
export function durability(t: LathekinToolType): number { return specs[t].durability; }
export function gripComfort(t: LathekinToolType): number { return specs[t].gripComfort; }
export function toolCost(t: LathekinToolType): number { return specs[t].cost; }
export function nonMarring(t: LathekinToolType): boolean { return specs[t].nonMarring; }
export function traditional(t: LathekinToolType): boolean { return specs[t].traditional; }
export function tipMaterial(t: LathekinToolType): string { return specs[t].tipMaterial; }
export function bestUse(t: LathekinToolType): string { return specs[t].use; }
export function lathekinTools(): LathekinToolType[] { return Object.keys(specs) as LathekinToolType[]; }

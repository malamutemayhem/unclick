export type LayingTopType =
  | "wooden_cone_standard"
  | "brass_cone_smooth"
  | "adjustable_cone_set"
  | "grooved_cone_guide"
  | "hardened_steel_heavy";

const specs: Record<LayingTopType, {
  guideSmooth: number; wearResist: number; sizeRange: number;
  twistControl: number; cost: number; adjustable: boolean; grooved: boolean;
  coneMaterial: string; use: string;
}> = {
  wooden_cone_standard: {
    guideSmooth: 75, wearResist: 60, sizeRange: 70,
    twistControl: 78, cost: 25, adjustable: false, grooved: false,
    coneMaterial: "lignum_vitae_wood", use: "general_strand_lay",
  },
  brass_cone_smooth: {
    guideSmooth: 92, wearResist: 82, sizeRange: 65,
    twistControl: 85, cost: 80, adjustable: false, grooved: false,
    coneMaterial: "polished_brass", use: "fine_cord_lay",
  },
  adjustable_cone_set: {
    guideSmooth: 80, wearResist: 75, sizeRange: 95,
    twistControl: 82, cost: 120, adjustable: true, grooved: false,
    coneMaterial: "steel_insert_set", use: "variable_size_lay",
  },
  grooved_cone_guide: {
    guideSmooth: 85, wearResist: 78, sizeRange: 72,
    twistControl: 90, cost: 65, adjustable: false, grooved: true,
    coneMaterial: "bronze_grooved", use: "guided_strand_control",
  },
  hardened_steel_heavy: {
    guideSmooth: 82, wearResist: 95, sizeRange: 80,
    twistControl: 80, cost: 100, adjustable: false, grooved: false,
    coneMaterial: "hardened_tool_steel", use: "heavy_hawser_lay",
  },
};

export function guideSmooth(t: LayingTopType): number { return specs[t].guideSmooth; }
export function wearResist(t: LayingTopType): number { return specs[t].wearResist; }
export function sizeRange(t: LayingTopType): number { return specs[t].sizeRange; }
export function twistControl(t: LayingTopType): number { return specs[t].twistControl; }
export function topCost(t: LayingTopType): number { return specs[t].cost; }
export function adjustable(t: LayingTopType): boolean { return specs[t].adjustable; }
export function grooved(t: LayingTopType): boolean { return specs[t].grooved; }
export function coneMaterial(t: LayingTopType): string { return specs[t].coneMaterial; }
export function bestUse(t: LayingTopType): string { return specs[t].use; }
export function layingTops(): LayingTopType[] { return Object.keys(specs) as LayingTopType[]; }

export type CameKnifeType =
  | "straight_blade_standard"
  | "curved_blade_lead"
  | "heated_blade_clean"
  | "serrated_blade_zinc"
  | "utility_blade_swap";

const specs: Record<CameKnifeType, {
  cutClean: number; controlGuide: number; speedCut: number;
  bladeLife: number; cost: number; heated: boolean; replaceable: boolean;
  bladeStyle: string; use: string;
}> = {
  straight_blade_standard: {
    cutClean: 85, controlGuide: 82, speedCut: 80,
    bladeLife: 78, cost: 15, heated: false, replaceable: false,
    bladeStyle: "fixed_straight_edge", use: "general_came_cut",
  },
  curved_blade_lead: {
    cutClean: 88, controlGuide: 85, speedCut: 75,
    bladeLife: 80, cost: 20, heated: false, replaceable: false,
    bladeStyle: "curved_rocker_edge", use: "lead_came_trim",
  },
  heated_blade_clean: {
    cutClean: 92, controlGuide: 78, speedCut: 85,
    bladeLife: 70, cost: 35, heated: true, replaceable: false,
    bladeStyle: "heated_straight_edge", use: "clean_melt_cut",
  },
  serrated_blade_zinc: {
    cutClean: 78, controlGuide: 80, speedCut: 88,
    bladeLife: 72, cost: 18, heated: false, replaceable: false,
    bladeStyle: "serrated_saw_edge", use: "zinc_came_saw",
  },
  utility_blade_swap: {
    cutClean: 80, controlGuide: 75, speedCut: 82,
    bladeLife: 90, cost: 12, heated: false, replaceable: true,
    bladeStyle: "snap_off_utility", use: "quick_swap_cut",
  },
};

export function cutClean(t: CameKnifeType): number { return specs[t].cutClean; }
export function controlGuide(t: CameKnifeType): number { return specs[t].controlGuide; }
export function speedCut(t: CameKnifeType): number { return specs[t].speedCut; }
export function bladeLife(t: CameKnifeType): number { return specs[t].bladeLife; }
export function knifeCost(t: CameKnifeType): number { return specs[t].cost; }
export function heated(t: CameKnifeType): boolean { return specs[t].heated; }
export function replaceable(t: CameKnifeType): boolean { return specs[t].replaceable; }
export function bladeStyle(t: CameKnifeType): string { return specs[t].bladeStyle; }
export function bestUse(t: CameKnifeType): string { return specs[t].use; }
export function cameKnives(): CameKnifeType[] { return Object.keys(specs) as CameKnifeType[]; }

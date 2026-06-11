export type InkStoneType =
  | "duan_stone_fine"
  | "she_stone_sharp"
  | "tao_stone_smooth"
  | "chengni_clay_soft"
  | "practice_stone_budget";

const specs: Record<InkStoneType, {
  grindSmooth: number; inkQuality: number; durability: number;
  waterRetain: number; cost: number; natural: boolean; forPractice: boolean;
  stoneOrigin: string; use: string;
}> = {
  duan_stone_fine: {
    grindSmooth: 95, inkQuality: 92, durability: 90,
    waterRetain: 88, cost: 14, natural: true, forPractice: false,
    stoneOrigin: "guangdong_duan_quarry", use: "premium_sumi_grind",
  },
  she_stone_sharp: {
    grindSmooth: 88, inkQuality: 90, durability: 88,
    waterRetain: 85, cost: 12, natural: true, forPractice: false,
    stoneOrigin: "anhui_she_mountain", use: "fine_calligraphy_grind",
  },
  tao_stone_smooth: {
    grindSmooth: 90, inkQuality: 85, durability: 85,
    waterRetain: 90, cost: 10, natural: true, forPractice: false,
    stoneOrigin: "gansu_tao_river", use: "smooth_ink_preparation",
  },
  chengni_clay_soft: {
    grindSmooth: 82, inkQuality: 80, durability: 78,
    waterRetain: 82, cost: 8, natural: true, forPractice: false,
    stoneOrigin: "shanxi_fired_clay", use: "gentle_soft_grind",
  },
  practice_stone_budget: {
    grindSmooth: 72, inkQuality: 70, durability: 82,
    waterRetain: 75, cost: 4, natural: false, forPractice: true,
    stoneOrigin: "synthetic_composite_slab", use: "student_daily_practice",
  },
};

export function grindSmooth(t: InkStoneType): number { return specs[t].grindSmooth; }
export function inkQuality(t: InkStoneType): number { return specs[t].inkQuality; }
export function durability(t: InkStoneType): number { return specs[t].durability; }
export function waterRetain(t: InkStoneType): number { return specs[t].waterRetain; }
export function stoneCost(t: InkStoneType): number { return specs[t].cost; }
export function natural(t: InkStoneType): boolean { return specs[t].natural; }
export function forPractice(t: InkStoneType): boolean { return specs[t].forPractice; }
export function stoneOrigin(t: InkStoneType): string { return specs[t].stoneOrigin; }
export function bestUse(t: InkStoneType): string { return specs[t].use; }
export function inkStones(): InkStoneType[] { return Object.keys(specs) as InkStoneType[]; }

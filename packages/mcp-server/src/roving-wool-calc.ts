export type RovingWoolType =
  | "merino_fine_soft"
  | "corriedale_medium_general"
  | "romney_coarse_sturdy"
  | "alpaca_silky_warm"
  | "silk_blend_luxury";

const specs: Record<RovingWoolType, {
  feltEase: number; colorVivid: number; softTouch: number;
  durability: number; cost: number; natural: boolean; blended: boolean;
  fiberSource: string; use: string;
}> = {
  merino_fine_soft: {
    feltEase: 92, colorVivid: 88, softTouch: 95,
    durability: 75, cost: 18, natural: true, blended: false,
    fiberSource: "merino_sheep_wool", use: "fine_soft_felt",
  },
  corriedale_medium_general: {
    feltEase: 85, colorVivid: 82, softTouch: 82,
    durability: 85, cost: 12, natural: true, blended: false,
    fiberSource: "corriedale_sheep_wool", use: "general_purpose_felt",
  },
  romney_coarse_sturdy: {
    feltEase: 78, colorVivid: 75, softTouch: 70,
    durability: 92, cost: 10, natural: true, blended: false,
    fiberSource: "romney_sheep_wool", use: "sturdy_durable_felt",
  },
  alpaca_silky_warm: {
    feltEase: 72, colorVivid: 85, softTouch: 90,
    durability: 80, cost: 22, natural: true, blended: false,
    fiberSource: "alpaca_fiber_hair", use: "warm_silky_felt",
  },
  silk_blend_luxury: {
    feltEase: 68, colorVivid: 95, softTouch: 88,
    durability: 78, cost: 30, natural: true, blended: true,
    fiberSource: "silk_wool_blend", use: "luxury_sheen_felt",
  },
};

export function feltEase(t: RovingWoolType): number { return specs[t].feltEase; }
export function colorVivid(t: RovingWoolType): number { return specs[t].colorVivid; }
export function softTouch(t: RovingWoolType): number { return specs[t].softTouch; }
export function durability(t: RovingWoolType): number { return specs[t].durability; }
export function woolCost(t: RovingWoolType): number { return specs[t].cost; }
export function natural(t: RovingWoolType): boolean { return specs[t].natural; }
export function blended(t: RovingWoolType): boolean { return specs[t].blended; }
export function fiberSource(t: RovingWoolType): string { return specs[t].fiberSource; }
export function bestUse(t: RovingWoolType): string { return specs[t].use; }
export function rovingWools(): RovingWoolType[] { return Object.keys(specs) as RovingWoolType[]; }

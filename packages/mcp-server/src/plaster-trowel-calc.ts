export type PlasterTrowelType =
  | "venetian_trowel_flex"
  | "margin_trowel_small"
  | "finishing_trowel_flat"
  | "pool_trowel_round"
  | "japanese_trowel_thin";

const specs: Record<PlasterTrowelType, {
  smoothFinish: number; controlFine: number; flexibility: number;
  sizeRange: number; cost: number; flexible: boolean; rounded: boolean;
  bladeStyle: string; use: string;
}> = {
  venetian_trowel_flex: {
    smoothFinish: 95, controlFine: 88, flexibility: 92,
    sizeRange: 82, cost: 12, flexible: true, rounded: false,
    bladeStyle: "flexible_spring_steel", use: "venetian_plaster_polish",
  },
  margin_trowel_small: {
    smoothFinish: 80, controlFine: 90, flexibility: 78,
    sizeRange: 72, cost: 5, flexible: false, rounded: false,
    bladeStyle: "narrow_straight_blade", use: "tight_corner_detail",
  },
  finishing_trowel_flat: {
    smoothFinish: 88, controlFine: 85, flexibility: 80,
    sizeRange: 90, cost: 8, flexible: false, rounded: false,
    bladeStyle: "flat_wide_blade", use: "general_smooth_finish",
  },
  pool_trowel_round: {
    smoothFinish: 85, controlFine: 82, flexibility: 82,
    sizeRange: 85, cost: 7, flexible: false, rounded: true,
    bladeStyle: "rounded_end_blade", use: "curved_edge_plaster",
  },
  japanese_trowel_thin: {
    smoothFinish: 92, controlFine: 92, flexibility: 88,
    sizeRange: 78, cost: 14, flexible: true, rounded: false,
    bladeStyle: "ultra_thin_blade", use: "fine_art_plaster_finish",
  },
};

export function smoothFinish(t: PlasterTrowelType): number { return specs[t].smoothFinish; }
export function controlFine(t: PlasterTrowelType): number { return specs[t].controlFine; }
export function flexibility(t: PlasterTrowelType): number { return specs[t].flexibility; }
export function sizeRange(t: PlasterTrowelType): number { return specs[t].sizeRange; }
export function trowelCost(t: PlasterTrowelType): number { return specs[t].cost; }
export function flexible(t: PlasterTrowelType): boolean { return specs[t].flexible; }
export function rounded(t: PlasterTrowelType): boolean { return specs[t].rounded; }
export function bladeStyle(t: PlasterTrowelType): string { return specs[t].bladeStyle; }
export function bestUse(t: PlasterTrowelType): string { return specs[t].use; }
export function plasterTrowels(): PlasterTrowelType[] { return Object.keys(specs) as PlasterTrowelType[]; }

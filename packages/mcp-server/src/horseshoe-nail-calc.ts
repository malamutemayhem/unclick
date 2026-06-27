export type HorseshoeNailType =
  | "city_head_standard"
  | "slim_blade_light"
  | "regular_head_general"
  | "race_plate_thin"
  | "draft_heavy_large";

const specs: Record<HorseshoeNailType, {
  holdSecure: number; driveEase: number; clinchClean: number;
  sizeRange: number; cost: number; forRacing: boolean; forDraft: boolean;
  headStyle: string; use: string;
}> = {
  city_head_standard: {
    holdSecure: 85, driveEase: 82, clinchClean: 88,
    sizeRange: 80, cost: 8, forRacing: false, forDraft: false,
    headStyle: "city_countersink_head", use: "general_shoe_nail",
  },
  slim_blade_light: {
    holdSecure: 75, driveEase: 90, clinchClean: 85,
    sizeRange: 70, cost: 10, forRacing: false, forDraft: false,
    headStyle: "slim_flush_head", use: "thin_wall_hoof",
  },
  regular_head_general: {
    holdSecure: 88, driveEase: 85, clinchClean: 82,
    sizeRange: 92, cost: 6, forRacing: false, forDraft: false,
    headStyle: "regular_flat_head", use: "all_purpose_nail",
  },
  race_plate_thin: {
    holdSecure: 72, driveEase: 92, clinchClean: 90,
    sizeRange: 60, cost: 15, forRacing: true, forDraft: false,
    headStyle: "low_profile_race", use: "race_plate_attach",
  },
  draft_heavy_large: {
    holdSecure: 95, driveEase: 70, clinchClean: 75,
    sizeRange: 85, cost: 12, forRacing: false, forDraft: true,
    headStyle: "heavy_oversize_head", use: "draft_horse_shoe",
  },
};

export function holdSecure(t: HorseshoeNailType): number { return specs[t].holdSecure; }
export function driveEase(t: HorseshoeNailType): number { return specs[t].driveEase; }
export function clinchClean(t: HorseshoeNailType): number { return specs[t].clinchClean; }
export function sizeRange(t: HorseshoeNailType): number { return specs[t].sizeRange; }
export function nailCost(t: HorseshoeNailType): number { return specs[t].cost; }
export function forRacing(t: HorseshoeNailType): boolean { return specs[t].forRacing; }
export function forDraft(t: HorseshoeNailType): boolean { return specs[t].forDraft; }
export function headStyle(t: HorseshoeNailType): string { return specs[t].headStyle; }
export function bestUse(t: HorseshoeNailType): string { return specs[t].use; }
export function horseshoeNails(): HorseshoeNailType[] { return Object.keys(specs) as HorseshoeNailType[]; }

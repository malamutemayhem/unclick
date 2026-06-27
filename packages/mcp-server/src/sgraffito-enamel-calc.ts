export type SgraffitoEnamelType =
  | "needle_scribe_fine"
  | "carbide_point_hard"
  | "dental_pick_curve"
  | "riffler_file_texture"
  | "scratch_brush_broad";

const specs: Record<SgraffitoEnamelType, {
  lineClean: number; detailFine: number; controlSteady: number;
  textureRange: number; cost: number; curved: boolean; forBroad: boolean;
  tipProfile: string; use: string;
}> = {
  needle_scribe_fine: {
    lineClean: 92, detailFine: 95, controlSteady: 88,
    textureRange: 75, cost: 5, curved: false, forBroad: false,
    tipProfile: "sharp_steel_point", use: "fine_line_scratch",
  },
  carbide_point_hard: {
    lineClean: 90, detailFine: 90, controlSteady: 85,
    textureRange: 78, cost: 8, curved: false, forBroad: false,
    tipProfile: "tungsten_carbide_tip", use: "hard_enamel_engrave",
  },
  dental_pick_curve: {
    lineClean: 85, detailFine: 88, controlSteady: 90,
    textureRange: 82, cost: 4, curved: true, forBroad: false,
    tipProfile: "curved_hook_point", use: "curved_detail_scrape",
  },
  riffler_file_texture: {
    lineClean: 78, detailFine: 80, controlSteady: 82,
    textureRange: 92, cost: 7, curved: true, forBroad: false,
    tipProfile: "shaped_rasp_end", use: "texture_pattern_scratch",
  },
  scratch_brush_broad: {
    lineClean: 75, detailFine: 70, controlSteady: 80,
    textureRange: 90, cost: 6, curved: false, forBroad: true,
    tipProfile: "wire_bristle_bundle", use: "broad_area_scratch",
  },
};

export function lineClean(t: SgraffitoEnamelType): number { return specs[t].lineClean; }
export function detailFine(t: SgraffitoEnamelType): number { return specs[t].detailFine; }
export function controlSteady(t: SgraffitoEnamelType): number { return specs[t].controlSteady; }
export function textureRange(t: SgraffitoEnamelType): number { return specs[t].textureRange; }
export function sgrafCost(t: SgraffitoEnamelType): number { return specs[t].cost; }
export function curved(t: SgraffitoEnamelType): boolean { return specs[t].curved; }
export function forBroad(t: SgraffitoEnamelType): boolean { return specs[t].forBroad; }
export function tipProfile(t: SgraffitoEnamelType): string { return specs[t].tipProfile; }
export function bestUse(t: SgraffitoEnamelType): string { return specs[t].use; }
export function sgraffitoEnamels(): SgraffitoEnamelType[] { return Object.keys(specs) as SgraffitoEnamelType[]; }

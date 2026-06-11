export type UnderglazeType =
  | "liquid_brush_standard"
  | "pencil_crayon_detail"
  | "chalk_pastel_blend"
  | "transfer_decal_print"
  | "spray_airbrush_even";

const specs: Record<UnderglazeType, {
  colorIntense: number; detailFine: number; coverageEven: number;
  blendSmooth: number; cost: number; forDetail: boolean; sprayable: boolean;
  applyMethod: string; use: string;
}> = {
  liquid_brush_standard: {
    colorIntense: 88, detailFine: 82, coverageEven: 85,
    blendSmooth: 80, cost: 10, forDetail: false, sprayable: false,
    applyMethod: "brush_on_liquid", use: "general_underglaze_coat",
  },
  pencil_crayon_detail: {
    colorIntense: 75, detailFine: 95, coverageEven: 60,
    blendSmooth: 70, cost: 8, forDetail: true, sprayable: false,
    applyMethod: "dry_pencil_draw", use: "line_detail_drawing",
  },
  chalk_pastel_blend: {
    colorIntense: 72, detailFine: 78, coverageEven: 75,
    blendSmooth: 92, cost: 12, forDetail: false, sprayable: false,
    applyMethod: "dry_chalk_rub", use: "soft_blend_shading",
  },
  transfer_decal_print: {
    colorIntense: 85, detailFine: 90, coverageEven: 88,
    blendSmooth: 65, cost: 20, forDetail: true, sprayable: false,
    applyMethod: "water_slide_transfer", use: "repeat_pattern_apply",
  },
  spray_airbrush_even: {
    colorIntense: 82, detailFine: 70, coverageEven: 95,
    blendSmooth: 85, cost: 15, forDetail: false, sprayable: true,
    applyMethod: "airbrush_mist_spray", use: "even_gradient_coat",
  },
};

export function colorIntense(t: UnderglazeType): number { return specs[t].colorIntense; }
export function detailFine(t: UnderglazeType): number { return specs[t].detailFine; }
export function coverageEven(t: UnderglazeType): number { return specs[t].coverageEven; }
export function blendSmooth(t: UnderglazeType): number { return specs[t].blendSmooth; }
export function glazeCost(t: UnderglazeType): number { return specs[t].cost; }
export function forDetail(t: UnderglazeType): boolean { return specs[t].forDetail; }
export function sprayable(t: UnderglazeType): boolean { return specs[t].sprayable; }
export function applyMethod(t: UnderglazeType): string { return specs[t].applyMethod; }
export function bestUse(t: UnderglazeType): string { return specs[t].use; }
export function underglazes(): UnderglazeType[] { return Object.keys(specs) as UnderglazeType[]; }

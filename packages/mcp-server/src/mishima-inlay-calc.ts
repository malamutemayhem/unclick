// Mishima inlay calculator - pottery slip inlay decoration tools

export type MishimaInlayType =
  | "carve_fill_classic"
  | "stamp_press_repeat"
  | "scratch_line_fine"
  | "stencil_mask_apply"
  | "chatoyant_color_shift";

const MISHIMA_DATA: Record<
  MishimaInlayType,
  {
    lineDetail: number;
    repeatConsist: number;
    colorContrast: number;
    setupSpeed: number;
    cost: number;
    needsCarving: boolean;
    forRepeat: boolean;
    slipMethod: string;
    bestUse: string;
  }
> = {
  carve_fill_classic: {
    lineDetail: 9,
    repeatConsist: 5,
    colorContrast: 8,
    setupSpeed: 4,
    cost: 3,
    needsCarving: true,
    forRepeat: false,
    slipMethod: "hand_carve_fill",
    bestUse: "unique_line_design",
  },
  stamp_press_repeat: {
    lineDetail: 6,
    repeatConsist: 10,
    colorContrast: 7,
    setupSpeed: 8,
    cost: 5,
    needsCarving: false,
    forRepeat: true,
    slipMethod: "bisque_stamp_press",
    bestUse: "pattern_repeat_band",
  },
  scratch_line_fine: {
    lineDetail: 10,
    repeatConsist: 4,
    colorContrast: 7,
    setupSpeed: 5,
    cost: 2,
    needsCarving: true,
    forRepeat: false,
    slipMethod: "needle_scratch_fill",
    bestUse: "fine_detail_draw",
  },
  stencil_mask_apply: {
    lineDetail: 5,
    repeatConsist: 9,
    colorContrast: 9,
    setupSpeed: 7,
    cost: 6,
    needsCarving: false,
    forRepeat: true,
    slipMethod: "paper_stencil_coat",
    bestUse: "bold_area_contrast",
  },
  chatoyant_color_shift: {
    lineDetail: 7,
    repeatConsist: 6,
    colorContrast: 10,
    setupSpeed: 3,
    cost: 8,
    needsCarving: true,
    forRepeat: false,
    slipMethod: "layered_slip_blend",
    bestUse: "multi_color_effect",
  },
};

export function lineDetail(type: MishimaInlayType): number {
  return MISHIMA_DATA[type].lineDetail;
}
export function repeatConsist(type: MishimaInlayType): number {
  return MISHIMA_DATA[type].repeatConsist;
}
export function colorContrast(type: MishimaInlayType): number {
  return MISHIMA_DATA[type].colorContrast;
}
export function setupSpeed(type: MishimaInlayType): number {
  return MISHIMA_DATA[type].setupSpeed;
}
export function inlayCost(type: MishimaInlayType): number {
  return MISHIMA_DATA[type].cost;
}
export function needsCarving(type: MishimaInlayType): boolean {
  return MISHIMA_DATA[type].needsCarving;
}
export function forRepeat(type: MishimaInlayType): boolean {
  return MISHIMA_DATA[type].forRepeat;
}
export function slipMethod(type: MishimaInlayType): string {
  return MISHIMA_DATA[type].slipMethod;
}
export function bestUse(type: MishimaInlayType): string {
  return MISHIMA_DATA[type].bestUse;
}
export function mishimaInlays(): MishimaInlayType[] {
  return Object.keys(MISHIMA_DATA) as MishimaInlayType[];
}

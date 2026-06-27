export type InkPadType = "dye_ink_quick" | "pigment_ink_opaque" | "chalk_ink_matte" | "distress_ink_blend" | "emboss_ink_clear";

export function drySpeed(t: InkPadType): number {
  const m: Record<InkPadType, number> = {
    dye_ink_quick: 10, pigment_ink_opaque: 4, chalk_ink_matte: 6, distress_ink_blend: 8, emboss_ink_clear: 2,
  };
  return m[t];
}

export function colorVibrancy(t: InkPadType): number {
  const m: Record<InkPadType, number> = {
    dye_ink_quick: 8, pigment_ink_opaque: 10, chalk_ink_matte: 6, distress_ink_blend: 7, emboss_ink_clear: 3,
  };
  return m[t];
}

export function blendAbility(t: InkPadType): number {
  const m: Record<InkPadType, number> = {
    dye_ink_quick: 5, pigment_ink_opaque: 4, chalk_ink_matte: 7, distress_ink_blend: 10, emboss_ink_clear: 3,
  };
  return m[t];
}

export function archivalSafe(t: InkPadType): number {
  const m: Record<InkPadType, number> = {
    dye_ink_quick: 6, pigment_ink_opaque: 10, chalk_ink_matte: 7, distress_ink_blend: 8, emboss_ink_clear: 9,
  };
  return m[t];
}

export function padCost(t: InkPadType): number {
  const m: Record<InkPadType, number> = {
    dye_ink_quick: 2, pigment_ink_opaque: 2, chalk_ink_matte: 2, distress_ink_blend: 3, emboss_ink_clear: 2,
  };
  return m[t];
}

export function waterproof(t: InkPadType): boolean {
  const m: Record<InkPadType, boolean> = {
    dye_ink_quick: false, pigment_ink_opaque: true, chalk_ink_matte: false, distress_ink_blend: false, emboss_ink_clear: false,
  };
  return m[t];
}

export function forEmbossing(t: InkPadType): boolean {
  const m: Record<InkPadType, boolean> = {
    dye_ink_quick: false, pigment_ink_opaque: true, chalk_ink_matte: false, distress_ink_blend: false, emboss_ink_clear: true,
  };
  return m[t];
}

export function inkBase(t: InkPadType): string {
  const m: Record<InkPadType, string> = {
    dye_ink_quick: "water_based_dye",
    pigment_ink_opaque: "pigment_suspension_thick",
    chalk_ink_matte: "chalk_finish_matte",
    distress_ink_blend: "water_reactive_fade",
    emboss_ink_clear: "glycerin_sticky_clear",
  };
  return m[t];
}

export function bestProject(t: InkPadType): string {
  const m: Record<InkPadType, string> = {
    dye_ink_quick: "rubber_stamp_card",
    pigment_ink_opaque: "heat_emboss_detail",
    chalk_ink_matte: "vintage_soft_tone",
    distress_ink_blend: "background_blend_wash",
    emboss_ink_clear: "clear_emboss_resist",
  };
  return m[t];
}

export function inkPads(): InkPadType[] {
  return ["dye_ink_quick", "pigment_ink_opaque", "chalk_ink_matte", "distress_ink_blend", "emboss_ink_clear"];
}

export type CornerRounderType = "quarter_inch_small" | "half_inch_medium" | "three_eighth_classic" | "multi_size_dial" | "corner_chomper_heavy";

export function cutClean(t: CornerRounderType): number {
  const m: Record<CornerRounderType, number> = {
    quarter_inch_small: 8, half_inch_medium: 9, three_eighth_classic: 8, multi_size_dial: 7, corner_chomper_heavy: 10,
  };
  return m[t];
}

export function easeOfUse(t: CornerRounderType): number {
  const m: Record<CornerRounderType, number> = {
    quarter_inch_small: 9, half_inch_medium: 9, three_eighth_classic: 9, multi_size_dial: 7, corner_chomper_heavy: 8,
  };
  return m[t];
}

export function sizeOptions(t: CornerRounderType): number {
  const m: Record<CornerRounderType, number> = {
    quarter_inch_small: 3, half_inch_medium: 3, three_eighth_classic: 3, multi_size_dial: 10, corner_chomper_heavy: 5,
  };
  return m[t];
}

export function paperWeight(t: CornerRounderType): number {
  const m: Record<CornerRounderType, number> = {
    quarter_inch_small: 6, half_inch_medium: 7, three_eighth_classic: 7, multi_size_dial: 8, corner_chomper_heavy: 10,
  };
  return m[t];
}

export function punchCost(t: CornerRounderType): number {
  const m: Record<CornerRounderType, number> = {
    quarter_inch_small: 1, half_inch_medium: 1, three_eighth_classic: 1, multi_size_dial: 3, corner_chomper_heavy: 4,
  };
  return m[t];
}

export function multiRadius(t: CornerRounderType): boolean {
  const m: Record<CornerRounderType, boolean> = {
    quarter_inch_small: false, half_inch_medium: false, three_eighth_classic: false, multi_size_dial: true, corner_chomper_heavy: false,
  };
  return m[t];
}

export function heavyDuty(t: CornerRounderType): boolean {
  const m: Record<CornerRounderType, boolean> = {
    quarter_inch_small: false, half_inch_medium: false, three_eighth_classic: false, multi_size_dial: false, corner_chomper_heavy: true,
  };
  return m[t];
}

export function punchMech(t: CornerRounderType): string {
  const m: Record<CornerRounderType, string> = {
    quarter_inch_small: "lever_squeeze_punch",
    half_inch_medium: "lever_squeeze_punch",
    three_eighth_classic: "lever_squeeze_punch",
    multi_size_dial: "rotary_dial_select",
    corner_chomper_heavy: "heavy_lever_press",
  };
  return m[t];
}

export function bestUse(t: CornerRounderType): string {
  const m: Record<CornerRounderType, string> = {
    quarter_inch_small: "business_card_subtle",
    half_inch_medium: "photo_mat_round",
    three_eighth_classic: "card_making_standard",
    multi_size_dial: "mixed_project_variety",
    corner_chomper_heavy: "thick_chipboard_round",
  };
  return m[t];
}

export function cornerRounders(): CornerRounderType[] {
  return ["quarter_inch_small", "half_inch_medium", "three_eighth_classic", "multi_size_dial", "corner_chomper_heavy"];
}

export type CalligraphyStyle = "chinese" | "arabic" | "japanese" | "western_italic" | "korean";

export function brushStrokes(style: CalligraphyStyle): number {
  const m: Record<CalligraphyStyle, number> = {
    chinese: 10, arabic: 7, japanese: 9, western_italic: 4, korean: 6,
  };
  return m[style];
}

export function learningYears(style: CalligraphyStyle): number {
  const m: Record<CalligraphyStyle, number> = {
    chinese: 10, arabic: 6, japanese: 8, western_italic: 3, korean: 5,
  };
  return m[style];
}

export function toolVariety(style: CalligraphyStyle): number {
  const m: Record<CalligraphyStyle, number> = {
    chinese: 9, arabic: 7, japanese: 8, western_italic: 5, korean: 6,
  };
  return m[style];
}

export function expressiveness(style: CalligraphyStyle): number {
  const m: Record<CalligraphyStyle, number> = {
    chinese: 10, arabic: 9, japanese: 10, western_italic: 6, korean: 7,
  };
  return m[style];
}

export function meditativeValue(style: CalligraphyStyle): number {
  const m: Record<CalligraphyStyle, number> = {
    chinese: 10, arabic: 8, japanese: 10, western_italic: 5, korean: 7,
  };
  return m[style];
}

export function rightToLeft(style: CalligraphyStyle): boolean {
  const m: Record<CalligraphyStyle, boolean> = {
    chinese: false, arabic: true, japanese: false, western_italic: false, korean: false,
  };
  return m[style];
}

export function usesBrush(style: CalligraphyStyle): boolean {
  const m: Record<CalligraphyStyle, boolean> = {
    chinese: true, arabic: false, japanese: true, western_italic: false, korean: true,
  };
  return m[style];
}

export function primaryInk(style: CalligraphyStyle): string {
  const m: Record<CalligraphyStyle, string> = {
    chinese: "sumi_ink", arabic: "carbon_ink", japanese: "sumi_ink",
    western_italic: "iron_gall", korean: "sumi_ink",
  };
  return m[style];
}

export function culturalSignificance(style: CalligraphyStyle): number {
  const m: Record<CalligraphyStyle, number> = {
    chinese: 10, arabic: 10, japanese: 9, western_italic: 6, korean: 8,
  };
  return m[style];
}

export function calligraphyStyles(): CalligraphyStyle[] {
  return ["chinese", "arabic", "japanese", "western_italic", "korean"];
}

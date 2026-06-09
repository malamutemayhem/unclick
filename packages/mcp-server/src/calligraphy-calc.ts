export type Script = "italic" | "copperplate" | "uncial" | "gothic" | "roman" | "brush";
export type NibType = "broad" | "pointed" | "brush" | "marker";

export interface CalligraphySpec {
  script: Script;
  nibWidthMm: number;
  xHeightNibs: number;
  ascenderNibs: number;
  descenderNibs: number;
  penAngleDeg: number;
}

const SCRIPT_SPECS: Record<Script, CalligraphySpec> = {
  italic: { script: "italic", nibWidthMm: 2, xHeightNibs: 5, ascenderNibs: 4, descenderNibs: 4, penAngleDeg: 45 },
  copperplate: { script: "copperplate", nibWidthMm: 0.5, xHeightNibs: 4, ascenderNibs: 4, descenderNibs: 4, penAngleDeg: 55 },
  uncial: { script: "uncial", nibWidthMm: 3, xHeightNibs: 4, ascenderNibs: 2, descenderNibs: 2, penAngleDeg: 20 },
  gothic: { script: "gothic", nibWidthMm: 2, xHeightNibs: 5, ascenderNibs: 3, descenderNibs: 3, penAngleDeg: 45 },
  roman: { script: "roman", nibWidthMm: 2.5, xHeightNibs: 7, ascenderNibs: 3, descenderNibs: 3, penAngleDeg: 30 },
  brush: { script: "brush", nibWidthMm: 4, xHeightNibs: 3, ascenderNibs: 3, descenderNibs: 2, penAngleDeg: 0 },
};

export function scriptSpec(script: Script): CalligraphySpec {
  return { ...SCRIPT_SPECS[script] };
}

export function xHeight(nibWidthMm: number, nibWidths: number): number {
  return parseFloat((nibWidthMm * nibWidths).toFixed(1));
}

export function ascenderHeight(nibWidthMm: number, nibWidths: number): number {
  return parseFloat((nibWidthMm * nibWidths).toFixed(1));
}

export function descenderDepth(nibWidthMm: number, nibWidths: number): number {
  return parseFloat((nibWidthMm * nibWidths).toFixed(1));
}

export function totalLineHeight(spec: CalligraphySpec): number {
  return parseFloat((spec.nibWidthMm * (spec.xHeightNibs + spec.ascenderNibs + spec.descenderNibs)).toFixed(1));
}

export function lineSpacing(totalHeight: number, multiplier: number = 1.5): number {
  return parseFloat((totalHeight * multiplier).toFixed(1));
}

export function linesPerPage(pageHeightMm: number, lineSpacingMm: number, marginMm: number = 25): number {
  const usableHeight = pageHeightMm - marginMm * 2;
  return Math.floor(usableHeight / lineSpacingMm);
}

export function charsPerLine(pageWidthMm: number, charWidthMm: number, marginMm: number = 25): number {
  const usableWidth = pageWidthMm - marginMm * 2;
  return Math.floor(usableWidth / charWidthMm);
}

export function guidelineSpacing(spec: CalligraphySpec): { waistline: number; baseline: number; ascender: number; descender: number } {
  const x = spec.nibWidthMm * spec.xHeightNibs;
  const a = spec.nibWidthMm * spec.ascenderNibs;
  const d = spec.nibWidthMm * spec.descenderNibs;
  return {
    ascender: parseFloat(a.toFixed(1)),
    waistline: parseFloat(x.toFixed(1)),
    baseline: 0,
    descender: parseFloat((-d).toFixed(1)),
  };
}

export function inkUsageMl(charsWritten: number, avgStrokesPerChar: number = 4, nibWidthMm: number = 2): number {
  const mlPerStroke = nibWidthMm * 0.001;
  return parseFloat((charsWritten * avgStrokesPerChar * mlPerStroke).toFixed(2));
}

export function practicePages(script: Script): number {
  const pages: Record<Script, number> = {
    italic: 20,
    copperplate: 40,
    uncial: 15,
    gothic: 30,
    roman: 25,
    brush: 10,
  };
  return pages[script];
}

export function nibRecommendation(script: Script): NibType {
  const nibs: Record<Script, NibType> = {
    italic: "broad",
    copperplate: "pointed",
    uncial: "broad",
    gothic: "broad",
    roman: "broad",
    brush: "brush",
  };
  return nibs[script];
}

export function envelopeAddresses(count: number, minutesPerEnvelope: number = 3): number {
  return parseFloat((count * minutesPerEnvelope / 60).toFixed(1));
}

export function slantAngle(script: Script): number {
  const angles: Record<Script, number> = {
    italic: 7,
    copperplate: 55,
    uncial: 0,
    gothic: 0,
    roman: 0,
    brush: 0,
  };
  return angles[script];
}

export function scripts(): Script[] {
  return ["italic", "copperplate", "uncial", "gothic", "roman", "brush"];
}

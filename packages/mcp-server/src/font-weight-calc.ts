export type FontWeight = "thin" | "light" | "regular" | "bold" | "black";

export function visualImpact(w: FontWeight): number {
  const m: Record<FontWeight, number> = {
    thin: 2, light: 4, regular: 6, bold: 8, black: 10,
  };
  return m[w];
}

export function readabilityBodyText(w: FontWeight): number {
  const m: Record<FontWeight, number> = {
    thin: 4, light: 7, regular: 10, bold: 6, black: 3,
  };
  return m[w];
}

export function headingEffectiveness(w: FontWeight): number {
  const m: Record<FontWeight, number> = {
    thin: 3, light: 5, regular: 7, bold: 9, black: 10,
  };
  return m[w];
}

export function inkConsumption(w: FontWeight): number {
  const m: Record<FontWeight, number> = {
    thin: 2, light: 4, regular: 6, bold: 8, black: 10,
  };
  return m[w];
}

export function fileSize(w: FontWeight): number {
  const m: Record<FontWeight, number> = {
    thin: 3, light: 5, regular: 6, bold: 7, black: 9,
  };
  return m[w];
}

export function suitableForSmallSizes(w: FontWeight): boolean {
  const m: Record<FontWeight, boolean> = {
    thin: false, light: true, regular: true, bold: false, black: false,
  };
  return m[w];
}

export function commonInBranding(w: FontWeight): boolean {
  const m: Record<FontWeight, boolean> = {
    thin: true, light: false, regular: false, bold: true, black: true,
  };
  return m[w];
}

export function cssNumericValue(w: FontWeight): string {
  const m: Record<FontWeight, string> = {
    thin: "100", light: "300", regular: "400", bold: "700", black: "900",
  };
  return m[w];
}

export function bestUseCase(w: FontWeight): string {
  const m: Record<FontWeight, string> = {
    thin: "elegant_display", light: "body_secondary", regular: "body_primary",
    bold: "headings_emphasis", black: "display_impact",
  };
  return m[w];
}

export function fontWeights(): FontWeight[] {
  return ["thin", "light", "regular", "bold", "black"];
}

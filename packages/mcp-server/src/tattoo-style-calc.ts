export type TattooStyle = "traditional" | "realism" | "watercolor" | "blackwork" | "japanese";

export function detailLevel(s: TattooStyle): number {
  const m: Record<TattooStyle, number> = {
    traditional: 5, realism: 10, watercolor: 6, blackwork: 7, japanese: 8,
  };
  return m[s];
}

export function colorRange(s: TattooStyle): number {
  const m: Record<TattooStyle, number> = {
    traditional: 6, realism: 10, watercolor: 9, blackwork: 1, japanese: 7,
  };
  return m[s];
}

export function longevity(s: TattooStyle): number {
  const m: Record<TattooStyle, number> = {
    traditional: 10, realism: 5, watercolor: 3, blackwork: 9, japanese: 8,
  };
  return m[s];
}

export function executionDifficulty(s: TattooStyle): number {
  const m: Record<TattooStyle, number> = {
    traditional: 4, realism: 10, watercolor: 8, blackwork: 6, japanese: 9,
  };
  return m[s];
}

export function sessionTime(s: TattooStyle): number {
  const m: Record<TattooStyle, number> = {
    traditional: 4, realism: 9, watercolor: 6, blackwork: 7, japanese: 10,
  };
  return m[s];
}

export function usesOutline(s: TattooStyle): boolean {
  const m: Record<TattooStyle, boolean> = {
    traditional: true, realism: false, watercolor: false, blackwork: true, japanese: true,
  };
  return m[s];
}

export function agesTouchUpNeeded(s: TattooStyle): boolean {
  const m: Record<TattooStyle, boolean> = {
    traditional: false, realism: true, watercolor: true, blackwork: false, japanese: false,
  };
  return m[s];
}

export function signatureElement(s: TattooStyle): string {
  const m: Record<TattooStyle, string> = {
    traditional: "bold_outlines_flat_color", realism: "photographic_detail",
    watercolor: "splashes_drips_no_outline", blackwork: "solid_black_geometric",
    japanese: "full_body_mythology",
  };
  return m[s];
}

export function originRegion(s: TattooStyle): string {
  const m: Record<TattooStyle, string> = {
    traditional: "western_sailor", realism: "european_portrait",
    watercolor: "modern_fine_art", blackwork: "tribal_polynesian",
    japanese: "irezumi_edo_period",
  };
  return m[s];
}

export function tattooStyles(): TattooStyle[] {
  return ["traditional", "realism", "watercolor", "blackwork", "japanese"];
}

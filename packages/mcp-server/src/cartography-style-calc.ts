export type CartographyStyle = "topographic" | "thematic" | "nautical" | "cadastral" | "relief";

export function detailLevel(style: CartographyStyle): number {
  const m: Record<CartographyStyle, number> = {
    topographic: 9, thematic: 5, nautical: 8, cadastral: 7, relief: 6,
  };
  return m[style];
}

export function colorComplexity(style: CartographyStyle): number {
  const m: Record<CartographyStyle, number> = {
    topographic: 7, thematic: 10, nautical: 5, cadastral: 3, relief: 8,
  };
  return m[style];
}

export function updateFrequency(style: CartographyStyle): number {
  const m: Record<CartographyStyle, number> = {
    topographic: 5, thematic: 8, nautical: 7, cadastral: 9, relief: 3,
  };
  return m[style];
}

export function productionCost(style: CartographyStyle): number {
  const m: Record<CartographyStyle, number> = {
    topographic: 8, thematic: 5, nautical: 9, cadastral: 6, relief: 7,
  };
  return m[style];
}

export function publicAccessibility(style: CartographyStyle): number {
  const m: Record<CartographyStyle, number> = {
    topographic: 8, thematic: 9, nautical: 6, cadastral: 5, relief: 7,
  };
  return m[style];
}

export function showsElevation(style: CartographyStyle): boolean {
  const m: Record<CartographyStyle, boolean> = {
    topographic: true, thematic: false, nautical: false, cadastral: false, relief: true,
  };
  return m[style];
}

export function legalDocument(style: CartographyStyle): boolean {
  const m: Record<CartographyStyle, boolean> = {
    topographic: false, thematic: false, nautical: true, cadastral: true, relief: false,
  };
  return m[style];
}

export function bestApplication(style: CartographyStyle): string {
  const m: Record<CartographyStyle, string> = {
    topographic: "hiking", thematic: "data_visualization", nautical: "marine_navigation",
    cadastral: "land_ownership", relief: "education",
  };
  return m[style];
}

export function primaryAudience(style: CartographyStyle): string {
  const m: Record<CartographyStyle, string> = {
    topographic: "outdoors", thematic: "analysts", nautical: "mariners",
    cadastral: "surveyors", relief: "students",
  };
  return m[style];
}

export function cartographyStyles(): CartographyStyle[] {
  return ["topographic", "thematic", "nautical", "cadastral", "relief"];
}

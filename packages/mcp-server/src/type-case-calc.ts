export type TypeSize = "6pt" | "8pt" | "10pt" | "12pt" | "18pt";

export function heightMm(size: TypeSize): number {
  const h: Record<TypeSize, number> = {
    "6pt": 2.12, "8pt": 2.82, "10pt": 3.53, "12pt": 4.23, "18pt": 6.35,
  };
  return h[size];
}

export function charactersPerKg(size: TypeSize): number {
  const c: Record<TypeSize, number> = {
    "6pt": 1200, "8pt": 800, "10pt": 500, "12pt": 350, "18pt": 150,
  };
  return c[size];
}

export function sortBinsNeeded(size: TypeSize): number {
  const b: Record<TypeSize, number> = {
    "6pt": 89, "8pt": 89, "10pt": 89, "12pt": 89, "18pt": 89,
  };
  return b[size];
}

export function linesPerPage(size: TypeSize, pageHeightCm: number): number {
  const heightCm = heightMm(size) / 10;
  const leading = heightCm * 1.2;
  return Math.floor(pageHeightCm / leading);
}

export function setWidthMultiplier(size: TypeSize): number {
  const m: Record<TypeSize, number> = {
    "6pt": 0.5, "8pt": 0.55, "10pt": 0.6, "12pt": 0.65, "18pt": 0.7,
  };
  return m[size];
}

export function readabilityRating(size: TypeSize): number {
  const r: Record<TypeSize, number> = {
    "6pt": 3, "8pt": 5, "10pt": 8, "12pt": 9, "18pt": 7,
  };
  return r[size];
}

export function bestUseCase(size: TypeSize): string {
  const u: Record<TypeSize, string> = {
    "6pt": "footnotes", "8pt": "captions", "10pt": "body_text",
    "12pt": "subheadings", "18pt": "headings",
  };
  return u[size];
}

export function composingStickFits(size: TypeSize): boolean {
  return true;
}

export function costPerFont(size: TypeSize): number {
  const c: Record<TypeSize, number> = {
    "6pt": 80, "8pt": 90, "10pt": 100, "12pt": 120, "18pt": 150,
  };
  return c[size];
}

export function typeSizes(): TypeSize[] {
  return ["6pt", "8pt", "10pt", "12pt", "18pt"];
}

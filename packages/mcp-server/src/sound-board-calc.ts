export type ToneWood = "spruce" | "cedar" | "redwood" | "paulownia" | "koa";

export function thicknessMm(wood: ToneWood): number {
  const thickness: Record<ToneWood, number> = {
    spruce: 2.8, cedar: 2.5, redwood: 2.6, paulownia: 3.0, koa: 2.7,
  };
  return thickness[wood];
}

export function stiffnessGpa(wood: ToneWood): number {
  const stiffness: Record<ToneWood, number> = {
    spruce: 12, cedar: 8, redwood: 9, paulownia: 6, koa: 10,
  };
  return stiffness[wood];
}

export function densityKgPerM3(wood: ToneWood): number {
  const density: Record<ToneWood, number> = {
    spruce: 400, cedar: 370, redwood: 350, paulownia: 280, koa: 550,
  };
  return density[wood];
}

export function soundVelocityMPerSec(stiffnessGpa: number, densityKgPerM3: number): number {
  if (densityKgPerM3 <= 0) return 0;
  return Math.round(Math.sqrt(stiffnessGpa * 1e9 / densityKgPerM3));
}

export function bracingPattern(style: "fan" | "x" | "ladder" | "lattice"): number {
  const braces: Record<string, number> = { fan: 7, x: 2, ladder: 5, lattice: 12 };
  return braces[style];
}

export function tapToneFrequencyHz(thicknessMm: number, areaM2: number): number {
  if (areaM2 <= 0) return 0;
  return Math.round(1000 / (thicknessMm * Math.sqrt(areaM2)));
}

export function moistureContentPercent(seasoning: "kiln" | "air_dried"): number {
  return seasoning === "kiln" ? 6 : 10;
}

export function grainLinesPer10mm(quality: "standard" | "master"): number {
  return quality === "master" ? 20 : 12;
}

export function projectionRating(wood: ToneWood): number {
  const ratings: Record<ToneWood, number> = {
    spruce: 9, cedar: 7, redwood: 6, paulownia: 5, koa: 8,
  };
  return ratings[wood];
}

export function toneWoods(): ToneWood[] {
  return ["spruce", "cedar", "redwood", "paulownia", "koa"];
}

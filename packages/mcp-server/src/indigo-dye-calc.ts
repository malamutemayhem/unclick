export type IndigoSource = "indigofera" | "woad_plant" | "polygonum" | "synthetic" | "sukumo";

export function extractionDays(source: IndigoSource): number {
  const d: Record<IndigoSource, number> = {
    indigofera: 5, woad_plant: 7, polygonum: 4, synthetic: 0, sukumo: 120,
  };
  return d[source];
}

export function colorDepth(source: IndigoSource): number {
  const c: Record<IndigoSource, number> = {
    indigofera: 9, woad_plant: 6, polygonum: 7, synthetic: 10, sukumo: 8,
  };
  return c[source];
}

export function lighfastnessRating(source: IndigoSource): number {
  const l: Record<IndigoSource, number> = {
    indigofera: 7, woad_plant: 5, polygonum: 6, synthetic: 9, sukumo: 8,
  };
  return l[source];
}

export function vatTempCelsius(source: IndigoSource): number {
  const t: Record<IndigoSource, number> = {
    indigofera: 30, woad_plant: 50, polygonum: 25, synthetic: 20, sukumo: 35,
  };
  return t[source];
}

export function dipsRequired(source: IndigoSource): number {
  const d: Record<IndigoSource, number> = {
    indigofera: 8, woad_plant: 12, polygonum: 6, synthetic: 4, sukumo: 10,
  };
  return d[source];
}

export function fermentationRequired(source: IndigoSource): boolean {
  return source !== "synthetic";
}

export function yieldGramsPerKg(source: IndigoSource): number {
  const y: Record<IndigoSource, number> = {
    indigofera: 25, woad_plant: 5, polygonum: 15, synthetic: 1000, sukumo: 20,
  };
  return y[source];
}

export function culturalRegion(source: IndigoSource): string {
  const r: Record<IndigoSource, string> = {
    indigofera: "india", woad_plant: "europe", polygonum: "china",
    synthetic: "global", sukumo: "japan",
  };
  return r[source];
}

export function costPerKg(source: IndigoSource): number {
  const c: Record<IndigoSource, number> = {
    indigofera: 80, woad_plant: 120, polygonum: 60, synthetic: 15, sukumo: 200,
  };
  return c[source];
}

export function indigoSources(): IndigoSource[] {
  return ["indigofera", "woad_plant", "polygonum", "synthetic", "sukumo"];
}

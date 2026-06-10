export type SinewSource = "deer" | "elk" | "moose" | "bison" | "caribou";

export function tensileStrengthKg(source: SinewSource): number {
  const t: Record<SinewSource, number> = {
    deer: 15, elk: 25, moose: 30, bison: 35, caribou: 20,
  };
  return t[source];
}

export function fiberLengthCm(source: SinewSource): number {
  const l: Record<SinewSource, number> = {
    deer: 15, elk: 25, moose: 30, bison: 20, caribou: 18,
  };
  return l[source];
}

export function splittability(source: SinewSource): number {
  const s: Record<SinewSource, number> = {
    deer: 8, elk: 7, moose: 6, bison: 5, caribou: 9,
  };
  return s[source];
}

export function dryingHours(source: SinewSource): number {
  const h: Record<SinewSource, number> = {
    deer: 24, elk: 36, moose: 48, bison: 40, caribou: 30,
  };
  return h[source];
}

export function elasticity(source: SinewSource): number {
  const e: Record<SinewSource, number> = {
    deer: 7, elk: 6, moose: 5, bison: 4, caribou: 8,
  };
  return e[source];
}

export function bestUse(source: SinewSource): string {
  const u: Record<SinewSource, string> = {
    deer: "bow_string", elk: "drum_lacing", moose: "snowshoe_webbing",
    bison: "bow_backing", caribou: "sewing_thread",
  };
  return u[source];
}

export function waterResistance(source: SinewSource): number {
  const w: Record<SinewSource, number> = {
    deer: 3, elk: 4, moose: 5, bison: 6, caribou: 4,
  };
  return w[source];
}

export function availabilityRating(source: SinewSource): number {
  const a: Record<SinewSource, number> = {
    deer: 9, elk: 6, moose: 4, bison: 5, caribou: 3,
  };
  return a[source];
}

export function costPerBundle(source: SinewSource): number {
  const c: Record<SinewSource, number> = {
    deer: 10, elk: 15, moose: 20, bison: 18, caribou: 25,
  };
  return c[source];
}

export function sinewSources(): SinewSource[] {
  return ["deer", "elk", "moose", "bison", "caribou"];
}

export type NaturalDyeSource = "madder" | "weld" | "walnut" | "pomegranate" | "marigold";

export function colorProduced(source: NaturalDyeSource): string {
  const c: Record<NaturalDyeSource, string> = {
    madder: "red", weld: "yellow", walnut: "brown",
    pomegranate: "gold", marigold: "yellow_orange",
  };
  return c[source];
}

export function mordantRequired(source: NaturalDyeSource): boolean {
  return source !== "walnut";
}

export function dyeRatioPercent(source: NaturalDyeSource): number {
  const r: Record<NaturalDyeSource, number> = {
    madder: 50, weld: 100, walnut: 200, pomegranate: 100, marigold: 300,
  };
  return r[source];
}

export function simmertimMinutes(source: NaturalDyeSource): number {
  const t: Record<NaturalDyeSource, number> = {
    madder: 60, weld: 45, walnut: 90, pomegranate: 60, marigold: 30,
  };
  return t[source];
}

export function maxTempCelsius(source: NaturalDyeSource): number {
  const t: Record<NaturalDyeSource, number> = {
    madder: 70, weld: 85, walnut: 100, pomegranate: 90, marigold: 85,
  };
  return t[source];
}

export function lightfastness(source: NaturalDyeSource): number {
  const l: Record<NaturalDyeSource, number> = {
    madder: 7, weld: 6, walnut: 8, pomegranate: 5, marigold: 4,
  };
  return l[source];
}

export function washfastness(source: NaturalDyeSource): number {
  const w: Record<NaturalDyeSource, number> = {
    madder: 7, weld: 5, walnut: 8, pomegranate: 6, marigold: 4,
  };
  return w[source];
}

export function exhaustsCompletely(source: NaturalDyeSource): boolean {
  return source === "madder" || source === "walnut";
}

export function costPerKg(source: NaturalDyeSource): number {
  const c: Record<NaturalDyeSource, number> = {
    madder: 30, weld: 25, walnut: 10, pomegranate: 20, marigold: 15,
  };
  return c[source];
}

export function naturalDyeSources(): NaturalDyeSource[] {
  return ["madder", "weld", "walnut", "pomegranate", "marigold"];
}

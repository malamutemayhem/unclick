export type EstuaryType = "coastal_plain" | "tectonic" | "bar_built" | "fjord" | "delta";

export function salinityPpt(estuary: EstuaryType): number {
  const m: Record<EstuaryType, number> = {
    coastal_plain: 15, tectonic: 20, bar_built: 10, fjord: 25, delta: 5,
  };
  return m[estuary];
}

export function tidalRangeMeters(estuary: EstuaryType): number {
  const m: Record<EstuaryType, number> = {
    coastal_plain: 3, tectonic: 2, bar_built: 1, fjord: 4, delta: 1.5,
  };
  return m[estuary];
}

export function nurseryProductivity(estuary: EstuaryType): number {
  const m: Record<EstuaryType, number> = {
    coastal_plain: 9, tectonic: 5, bar_built: 8, fjord: 4, delta: 10,
  };
  return m[estuary];
}

export function sedimentLoad(estuary: EstuaryType): number {
  const m: Record<EstuaryType, number> = {
    coastal_plain: 7, tectonic: 3, bar_built: 5, fjord: 2, delta: 10,
  };
  return m[estuary];
}

export function biodiversity(estuary: EstuaryType): number {
  const m: Record<EstuaryType, number> = {
    coastal_plain: 8, tectonic: 5, bar_built: 7, fjord: 4, delta: 10,
  };
  return m[estuary];
}

export function hasSandBar(estuary: EstuaryType): boolean {
  const m: Record<EstuaryType, boolean> = {
    coastal_plain: false, tectonic: false, bar_built: true, fjord: false, delta: false,
  };
  return m[estuary];
}

export function glacialOrigin(estuary: EstuaryType): boolean {
  const m: Record<EstuaryType, boolean> = {
    coastal_plain: false, tectonic: false, bar_built: false, fjord: true, delta: false,
  };
  return m[estuary];
}

export function exampleLocation(estuary: EstuaryType): string {
  const m: Record<EstuaryType, string> = {
    coastal_plain: "chesapeake_bay", tectonic: "san_francisco_bay",
    bar_built: "pamlico_sound", fjord: "puget_sound", delta: "nile_delta",
  };
  return m[estuary];
}

export function floodRisk(estuary: EstuaryType): number {
  const m: Record<EstuaryType, number> = {
    coastal_plain: 6, tectonic: 4, bar_built: 7, fjord: 3, delta: 10,
  };
  return m[estuary];
}

export function estuaryTypes(): EstuaryType[] {
  return ["coastal_plain", "tectonic", "bar_built", "fjord", "delta"];
}

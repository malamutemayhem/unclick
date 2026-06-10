export type PurpleSource = "murex_brandaris" | "murex_trunculus" | "thais_haemastoma" | "purpura_lapillus" | "plicopurpura";

export function snailsPerGram(source: PurpleSource): number {
  const s: Record<PurpleSource, number> = {
    murex_brandaris: 12000, murex_trunculus: 8000, thais_haemastoma: 15000,
    purpura_lapillus: 10000, plicopurpura: 20000,
  };
  return s[source];
}

export function colorShade(source: PurpleSource): string {
  const c: Record<PurpleSource, string> = {
    murex_brandaris: "royal_purple", murex_trunculus: "blue_violet",
    thais_haemastoma: "reddish_purple", purpura_lapillus: "dark_violet",
    plicopurpura: "mauve",
  };
  return c[source];
}

export function lightfastness(source: PurpleSource): number {
  const l: Record<PurpleSource, number> = {
    murex_brandaris: 10, murex_trunculus: 9, thais_haemastoma: 7,
    purpura_lapillus: 8, plicopurpura: 6,
  };
  return l[source];
}

export function processingDays(source: PurpleSource): number {
  const d: Record<PurpleSource, number> = {
    murex_brandaris: 10, murex_trunculus: 7, thais_haemastoma: 5,
    purpura_lapillus: 6, plicopurpura: 4,
  };
  return d[source];
}

export function sunExposureRequired(source: PurpleSource): boolean {
  return source === "murex_trunculus" || source === "plicopurpura";
}

export function odorIntensity(source: PurpleSource): number {
  const o: Record<PurpleSource, number> = {
    murex_brandaris: 10, murex_trunculus: 8, thais_haemastoma: 7,
    purpura_lapillus: 6, plicopurpura: 5,
  };
  return o[source];
}

export function washFastness(source: PurpleSource): number {
  const w: Record<PurpleSource, number> = {
    murex_brandaris: 10, murex_trunculus: 9, thais_haemastoma: 7,
    purpura_lapillus: 8, plicopurpura: 6,
  };
  return w[source];
}

export function historicalRegion(source: PurpleSource): string {
  const r: Record<PurpleSource, string> = {
    murex_brandaris: "phoenicia", murex_trunculus: "mediterranean",
    thais_haemastoma: "atlantic_europe", purpura_lapillus: "britain",
    plicopurpura: "mesoamerica",
  };
  return r[source];
}

export function costPerGram(source: PurpleSource): number {
  const c: Record<PurpleSource, number> = {
    murex_brandaris: 2500, murex_trunculus: 1800, thais_haemastoma: 1200,
    purpura_lapillus: 1500, plicopurpura: 3000,
  };
  return c[source];
}

export function purpleSources(): PurpleSource[] {
  return ["murex_brandaris", "murex_trunculus", "thais_haemastoma", "purpura_lapillus", "plicopurpura"];
}

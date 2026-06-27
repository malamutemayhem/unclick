export type YeastType = "ale" | "lager" | "wild" | "wine" | "bread";

export function optimalTempC(y: YeastType): number {
  const m: Record<YeastType, number> = {
    ale: 20, lager: 10, wild: 22, wine: 18, bread: 30,
  };
  return m[y];
}

export function fermentationSpeed(y: YeastType): number {
  const m: Record<YeastType, number> = {
    ale: 8, lager: 4, wild: 3, wine: 5, bread: 9,
  };
  return m[y];
}

export function flavorComplexity(y: YeastType): number {
  const m: Record<YeastType, number> = {
    ale: 7, lager: 4, wild: 10, wine: 8, bread: 3,
  };
  return m[y];
}

export function alcoholTolerance(y: YeastType): number {
  const m: Record<YeastType, number> = {
    ale: 7, lager: 6, wild: 5, wine: 10, bread: 3,
  };
  return m[y];
}

export function flocculationRate(y: YeastType): number {
  const m: Record<YeastType, number> = {
    ale: 8, lager: 9, wild: 3, wine: 6, bread: 2,
  };
  return m[y];
}

export function topFermenting(y: YeastType): boolean {
  const m: Record<YeastType, boolean> = {
    ale: true, lager: false, wild: true, wine: false, bread: true,
  };
  return m[y];
}

export function requiresStarter(y: YeastType): boolean {
  const m: Record<YeastType, boolean> = {
    ale: false, lager: true, wild: false, wine: true, bread: false,
  };
  return m[y];
}

export function primaryProduct(y: YeastType): string {
  const m: Record<YeastType, string> = {
    ale: "ales_stouts_ipas", lager: "pilsners_lagers",
    wild: "sours_lambics", wine: "wine_mead",
    bread: "baked_goods",
  };
  return m[y];
}

export function speciesName(y: YeastType): string {
  const m: Record<YeastType, string> = {
    ale: "saccharomyces_cerevisiae", lager: "saccharomyces_pastorianus",
    wild: "brettanomyces", wine: "saccharomyces_bayanus",
    bread: "saccharomyces_cerevisiae",
  };
  return m[y];
}

export function yeastTypes(): YeastType[] {
  return ["ale", "lager", "wild", "wine", "bread"];
}

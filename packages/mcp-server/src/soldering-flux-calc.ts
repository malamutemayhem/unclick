export type SolderingFlux = "borax" | "fluoride" | "boric_acid" | "paste" | "liquid";

export function meltingTempCelsius(flux: SolderingFlux): number {
  const m: Record<SolderingFlux, number> = {
    borax: 741, fluoride: 620, boric_acid: 171, paste: 300, liquid: 250,
  };
  return m[flux];
}

export function flowAbility(flux: SolderingFlux): number {
  const f: Record<SolderingFlux, number> = {
    borax: 7, fluoride: 9, boric_acid: 5, paste: 6, liquid: 8,
  };
  return f[flux];
}

export function oxideRemoval(flux: SolderingFlux): number {
  const o: Record<SolderingFlux, number> = {
    borax: 8, fluoride: 10, boric_acid: 6, paste: 7, liquid: 5,
  };
  return o[flux];
}

export function residueCleanup(flux: SolderingFlux): number {
  const r: Record<SolderingFlux, number> = {
    borax: 6, fluoride: 4, boric_acid: 8, paste: 5, liquid: 9,
  };
  return r[flux];
}

export function toxicFumes(flux: SolderingFlux): number {
  const t: Record<SolderingFlux, number> = {
    borax: 3, fluoride: 8, boric_acid: 2, paste: 5, liquid: 4,
  };
  return t[flux];
}

export function preciousMetalSafe(flux: SolderingFlux): boolean {
  const p: Record<SolderingFlux, boolean> = {
    borax: true, fluoride: true, boric_acid: true, paste: false, liquid: false,
  };
  return p[flux];
}

export function bestMetal(flux: SolderingFlux): string {
  const b: Record<SolderingFlux, string> = {
    borax: "gold", fluoride: "platinum", boric_acid: "silver",
    paste: "copper", liquid: "brass",
  };
  return b[flux];
}

export function shelfLifeMonths(flux: SolderingFlux): number {
  const s: Record<SolderingFlux, number> = {
    borax: 60, fluoride: 36, boric_acid: 48, paste: 12, liquid: 6,
  };
  return s[flux];
}

export function costPerKg(flux: SolderingFlux): number {
  const c: Record<SolderingFlux, number> = {
    borax: 8, fluoride: 25, boric_acid: 10, paste: 15, liquid: 12,
  };
  return c[flux];
}

export function solderingFluxes(): SolderingFlux[] {
  return ["borax", "fluoride", "boric_acid", "paste", "liquid"];
}

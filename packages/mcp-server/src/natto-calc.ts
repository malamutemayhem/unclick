export type NattoVariety = "kotsubu" | "hikiwari" | "ootsubu" | "kuromame" | "dried_natto";

export function fermentationHours(variety: NattoVariety): number {
  const h: Record<NattoVariety, number> = {
    kotsubu: 22, hikiwari: 18, ootsubu: 26, kuromame: 24, dried_natto: 20,
  };
  return h[variety];
}

export function fermentationTempCelsius(variety: NattoVariety): number {
  const t: Record<NattoVariety, number> = {
    kotsubu: 40, hikiwari: 42, ootsubu: 38, kuromame: 40, dried_natto: 40,
  };
  return t[variety];
}

export function stringiness(variety: NattoVariety): number {
  const s: Record<NattoVariety, number> = {
    kotsubu: 8, hikiwari: 5, ootsubu: 9, kuromame: 7, dried_natto: 1,
  };
  return s[variety];
}

export function nattokinaseActivity(variety: NattoVariety): number {
  const n: Record<NattoVariety, number> = {
    kotsubu: 8, hikiwari: 9, ootsubu: 7, kuromame: 6, dried_natto: 5,
  };
  return n[variety];
}

export function vitaminK2Content(variety: NattoVariety): number {
  const k: Record<NattoVariety, number> = {
    kotsubu: 9, hikiwari: 10, ootsubu: 8, kuromame: 7, dried_natto: 6,
  };
  return k[variety];
}

export function textureCoarseness(variety: NattoVariety): number {
  const t: Record<NattoVariety, number> = {
    kotsubu: 4, hikiwari: 2, ootsubu: 8, kuromame: 6, dried_natto: 7,
  };
  return t[variety];
}

export function crunchFactor(variety: NattoVariety): number {
  const c: Record<NattoVariety, number> = {
    kotsubu: 2, hikiwari: 1, ootsubu: 3, kuromame: 3, dried_natto: 9,
  };
  return c[variety];
}

export function refrigerationRequired(variety: NattoVariety): boolean {
  return variety !== "dried_natto";
}

export function costPerPack(variety: NattoVariety): number {
  const c: Record<NattoVariety, number> = {
    kotsubu: 2, hikiwari: 2, ootsubu: 3, kuromame: 4, dried_natto: 5,
  };
  return c[variety];
}

export function nattoVarieties(): NattoVariety[] {
  return ["kotsubu", "hikiwari", "ootsubu", "kuromame", "dried_natto"];
}

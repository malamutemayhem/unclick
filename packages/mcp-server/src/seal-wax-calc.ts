export type SealWax = "traditional" | "flexible" | "glue_gun" | "shellac" | "beeswax_blend";

export function meltingTempCelsius(wax: SealWax): number {
  const m: Record<SealWax, number> = {
    traditional: 120, flexible: 80, glue_gun: 160, shellac: 110, beeswax_blend: 65,
  };
  return m[wax];
}

export function impressionDetail(wax: SealWax): number {
  const m: Record<SealWax, number> = {
    traditional: 9, flexible: 7, glue_gun: 5, shellac: 8, beeswax_blend: 6,
  };
  return m[wax];
}

export function brittleness(wax: SealWax): number {
  const m: Record<SealWax, number> = {
    traditional: 8, flexible: 2, glue_gun: 4, shellac: 7, beeswax_blend: 3,
  };
  return m[wax];
}

export function colorRange(wax: SealWax): number {
  const m: Record<SealWax, number> = {
    traditional: 5, flexible: 8, glue_gun: 9, shellac: 4, beeswax_blend: 3,
  };
  return m[wax];
}

export function adhesion(wax: SealWax): number {
  const m: Record<SealWax, number> = {
    traditional: 7, flexible: 8, glue_gun: 6, shellac: 9, beeswax_blend: 5,
  };
  return m[wax];
}

export function mailSafe(wax: SealWax): boolean {
  const m: Record<SealWax, boolean> = {
    traditional: false, flexible: true, glue_gun: true, shellac: false, beeswax_blend: true,
  };
  return m[wax];
}

export function wickRequired(wax: SealWax): boolean {
  const m: Record<SealWax, boolean> = {
    traditional: true, flexible: true, glue_gun: false, shellac: true, beeswax_blend: true,
  };
  return m[wax];
}

export function bestUse(wax: SealWax): string {
  const m: Record<SealWax, string> = {
    traditional: "formal_correspondence", flexible: "invitation",
    glue_gun: "craft_project", shellac: "legal_document", beeswax_blend: "decorative",
  };
  return m[wax];
}

export function costPerStick(wax: SealWax): number {
  const m: Record<SealWax, number> = {
    traditional: 5, flexible: 3, glue_gun: 1, shellac: 8, beeswax_blend: 4,
  };
  return m[wax];
}

export function sealWaxes(): SealWax[] {
  return ["traditional", "flexible", "glue_gun", "shellac", "beeswax_blend"];
}

export type GlazeBase = "feldspar" | "ash" | "lead" | "boron" | "lithium";

export function meltingTempCelsius(base: GlazeBase): number {
  const m: Record<GlazeBase, number> = {
    feldspar: 1260, ash: 1200, lead: 900, boron: 1050, lithium: 1150,
  };
  return m[base];
}

export function surfaceTexture(base: GlazeBase): string {
  const s: Record<GlazeBase, string> = {
    feldspar: "smooth", ash: "textured", lead: "glossy",
    boron: "satin", lithium: "matte",
  };
  return s[base];
}

export function foodSafe(base: GlazeBase): boolean {
  const f: Record<GlazeBase, boolean> = {
    feldspar: true, ash: true, lead: false, boron: true, lithium: false,
  };
  return f[base];
}

export function colorRange(base: GlazeBase): number {
  const c: Record<GlazeBase, number> = {
    feldspar: 7, ash: 5, lead: 9, boron: 8, lithium: 6,
  };
  return c[base];
}

export function thermalExpansion(base: GlazeBase): number {
  const t: Record<GlazeBase, number> = {
    feldspar: 6.5, ash: 7.0, lead: 8.5, boron: 5.0, lithium: 3.5,
  };
  return t[base];
}

export function crazingRisk(base: GlazeBase): number {
  const c: Record<GlazeBase, number> = {
    feldspar: 4, ash: 6, lead: 7, boron: 3, lithium: 2,
  };
  return c[base];
}

export function historicalUse(base: GlazeBase): boolean {
  const h: Record<GlazeBase, boolean> = {
    feldspar: true, ash: true, lead: true, boron: false, lithium: false,
  };
  return h[base];
}

export function toxicity(base: GlazeBase): number {
  const t: Record<GlazeBase, number> = {
    feldspar: 1, ash: 1, lead: 9, boron: 2, lithium: 5,
  };
  return t[base];
}

export function costPerKg(base: GlazeBase): number {
  const c: Record<GlazeBase, number> = {
    feldspar: 3, ash: 1, lead: 5, boron: 8, lithium: 12,
  };
  return c[base];
}

export function glazeBases(): GlazeBase[] {
  return ["feldspar", "ash", "lead", "boron", "lithium"];
}

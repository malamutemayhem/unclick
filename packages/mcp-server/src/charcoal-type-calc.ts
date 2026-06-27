export type CharcoalType = "lump_hardwood" | "binchotan" | "briquette" | "coconut_shell" | "bamboo";

export function burnTempCelsius(type: CharcoalType): number {
  const t: Record<CharcoalType, number> = {
    lump_hardwood: 700, binchotan: 900, briquette: 600, coconut_shell: 750, bamboo: 650,
  };
  return t[type];
}

export function burnTimeHours(type: CharcoalType): number {
  const h: Record<CharcoalType, number> = {
    lump_hardwood: 2, binchotan: 5, briquette: 3, coconut_shell: 4, bamboo: 1.5,
  };
  return h[type];
}

export function ashPercent(type: CharcoalType): number {
  const a: Record<CharcoalType, number> = {
    lump_hardwood: 3, binchotan: 1, briquette: 8, coconut_shell: 2, bamboo: 5,
  };
  return a[type];
}

export function smokeLevel(type: CharcoalType): number {
  const s: Record<CharcoalType, number> = {
    lump_hardwood: 4, binchotan: 1, briquette: 6, coconut_shell: 2, bamboo: 5,
  };
  return s[type];
}

export function sparkLevel(type: CharcoalType): number {
  const s: Record<CharcoalType, number> = {
    lump_hardwood: 5, binchotan: 1, briquette: 2, coconut_shell: 3, bamboo: 7,
  };
  return s[type];
}

export function reusable(type: CharcoalType): boolean {
  return type === "binchotan";
}

export function carbonPercent(type: CharcoalType): number {
  const c: Record<CharcoalType, number> = {
    lump_hardwood: 80, binchotan: 95, briquette: 55, coconut_shell: 85, bamboo: 70,
  };
  return c[type];
}

export function bestUse(type: CharcoalType): string {
  const u: Record<CharcoalType, string> = {
    lump_hardwood: "grilling", binchotan: "yakitori", briquette: "low_slow",
    coconut_shell: "hookah", bamboo: "quick_grill",
  };
  return u[type];
}

export function costPerKg(type: CharcoalType): number {
  const c: Record<CharcoalType, number> = {
    lump_hardwood: 5, binchotan: 30, briquette: 2, coconut_shell: 8, bamboo: 4,
  };
  return c[type];
}

export function charcoalTypes(): CharcoalType[] {
  return ["lump_hardwood", "binchotan", "briquette", "coconut_shell", "bamboo"];
}

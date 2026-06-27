export type BloomOre = "bog_iron" | "magnetite" | "hematite" | "limonite" | "siderite";

export function smeltingTempCelsius(ore: BloomOre): number {
  const t: Record<BloomOre, number> = {
    bog_iron: 1100, magnetite: 1300, hematite: 1250, limonite: 1150, siderite: 1200,
  };
  return t[ore];
}

export function yieldPercent(ore: BloomOre): number {
  const y: Record<BloomOre, number> = {
    bog_iron: 30, magnetite: 50, hematite: 45, limonite: 25, siderite: 35,
  };
  return y[ore];
}

export function charcoalKgPerKgIron(ore: BloomOre): number {
  const c: Record<BloomOre, number> = {
    bog_iron: 8, magnetite: 5, hematite: 6, limonite: 10, siderite: 7,
  };
  return c[ore];
}

export function slagVolume(ore: BloomOre): number {
  const s: Record<BloomOre, number> = {
    bog_iron: 8, magnetite: 4, hematite: 5, limonite: 9, siderite: 6,
  };
  return s[ore];
}

export function bloomQuality(ore: BloomOre): number {
  const q: Record<BloomOre, number> = {
    bog_iron: 5, magnetite: 9, hematite: 8, limonite: 4, siderite: 6,
  };
  return q[ore];
}

export function crushingRequired(ore: BloomOre): boolean {
  return ore === "magnetite" || ore === "hematite" || ore === "siderite";
}

export function smeltHours(ore: BloomOre): number {
  const h: Record<BloomOre, number> = {
    bog_iron: 6, magnetite: 10, hematite: 8, limonite: 5, siderite: 7,
  };
  return h[ore];
}

export function phosphorusContent(ore: BloomOre): number {
  const p: Record<BloomOre, number> = {
    bog_iron: 7, magnetite: 2, hematite: 3, limonite: 6, siderite: 4,
  };
  return p[ore];
}

export function costPerKgOre(ore: BloomOre): number {
  const c: Record<BloomOre, number> = {
    bog_iron: 1, magnetite: 5, hematite: 4, limonite: 1, siderite: 3,
  };
  return c[ore];
}

export function bloomOres(): BloomOre[] {
  return ["bog_iron", "magnetite", "hematite", "limonite", "siderite"];
}

export type GemstoneType = "diamond" | "ruby" | "emerald" | "sapphire" | "opal";

export function hardnessMohs(gem: GemstoneType): number {
  const m: Record<GemstoneType, number> = {
    diamond: 10, ruby: 9, emerald: 7.5, sapphire: 9, opal: 6,
  };
  return m[gem];
}

export function refractiveIndex(gem: GemstoneType): number {
  const m: Record<GemstoneType, number> = {
    diamond: 2.42, ruby: 1.77, emerald: 1.58, sapphire: 1.77, opal: 1.45,
  };
  return m[gem];
}

export function rarityScore(gem: GemstoneType): number {
  const m: Record<GemstoneType, number> = {
    diamond: 7, ruby: 9, emerald: 8, sapphire: 6, opal: 5,
  };
  return m[gem];
}

export function brilliance(gem: GemstoneType): number {
  const m: Record<GemstoneType, number> = {
    diamond: 10, ruby: 7, emerald: 5, sapphire: 7, opal: 8,
  };
  return m[gem];
}

export function durability(gem: GemstoneType): number {
  const m: Record<GemstoneType, number> = {
    diamond: 10, ruby: 9, emerald: 6, sapphire: 9, opal: 4,
  };
  return m[gem];
}

export function pleochroic(gem: GemstoneType): boolean {
  const m: Record<GemstoneType, boolean> = {
    diamond: false, ruby: true, emerald: true, sapphire: true, opal: false,
  };
  return m[gem];
}

export function playOfColor(gem: GemstoneType): boolean {
  const m: Record<GemstoneType, boolean> = {
    diamond: false, ruby: false, emerald: false, sapphire: false, opal: true,
  };
  return m[gem];
}

export function primaryColor(gem: GemstoneType): string {
  const m: Record<GemstoneType, string> = {
    diamond: "colorless", ruby: "red", emerald: "green",
    sapphire: "blue", opal: "multicolor",
  };
  return m[gem];
}

export function pricePerCarat(gem: GemstoneType): number {
  const m: Record<GemstoneType, number> = {
    diamond: 8000, ruby: 12000, emerald: 5000, sapphire: 4000, opal: 1000,
  };
  return m[gem];
}

export function gemstoneTypes(): GemstoneType[] {
  return ["diamond", "ruby", "emerald", "sapphire", "opal"];
}

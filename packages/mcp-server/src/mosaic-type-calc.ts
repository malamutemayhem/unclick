export type MosaicType = "roman_tesserae" | "byzantine_gold" | "islamic_geometric" | "venetian_smalti" | "pebble";

export function tileSizeMm(mosaic: MosaicType): number {
  const m: Record<MosaicType, number> = {
    roman_tesserae: 10, byzantine_gold: 8, islamic_geometric: 15, venetian_smalti: 12, pebble: 30,
  };
  return m[mosaic];
}

export function colorRange(mosaic: MosaicType): number {
  const m: Record<MosaicType, number> = {
    roman_tesserae: 7, byzantine_gold: 9, islamic_geometric: 6, venetian_smalti: 10, pebble: 3,
  };
  return m[mosaic];
}

export function detailResolution(mosaic: MosaicType): number {
  const m: Record<MosaicType, number> = {
    roman_tesserae: 8, byzantine_gold: 9, islamic_geometric: 7, venetian_smalti: 10, pebble: 4,
  };
  return m[mosaic];
}

export function durabilityYears(mosaic: MosaicType): number {
  const m: Record<MosaicType, number> = {
    roman_tesserae: 2000, byzantine_gold: 1500, islamic_geometric: 1200, venetian_smalti: 800, pebble: 3000,
  };
  return m[mosaic];
}

export function installComplexity(mosaic: MosaicType): number {
  const m: Record<MosaicType, number> = {
    roman_tesserae: 7, byzantine_gold: 9, islamic_geometric: 10, venetian_smalti: 8, pebble: 4,
  };
  return m[mosaic];
}

export function usesGold(mosaic: MosaicType): boolean {
  const m: Record<MosaicType, boolean> = {
    roman_tesserae: false, byzantine_gold: true, islamic_geometric: false, venetian_smalti: false, pebble: false,
  };
  return m[mosaic];
}

export function figurative(mosaic: MosaicType): boolean {
  const m: Record<MosaicType, boolean> = {
    roman_tesserae: true, byzantine_gold: true, islamic_geometric: false, venetian_smalti: true, pebble: true,
  };
  return m[mosaic];
}

export function bestApplication(mosaic: MosaicType): string {
  const m: Record<MosaicType, string> = {
    roman_tesserae: "floor", byzantine_gold: "dome", islamic_geometric: "wall",
    venetian_smalti: "mural", pebble: "pathway",
  };
  return m[mosaic];
}

export function costPerM2(mosaic: MosaicType): number {
  const m: Record<MosaicType, number> = {
    roman_tesserae: 500, byzantine_gold: 2000, islamic_geometric: 800, venetian_smalti: 1500, pebble: 200,
  };
  return m[mosaic];
}

export function mosaicTypes(): MosaicType[] {
  return ["roman_tesserae", "byzantine_gold", "islamic_geometric", "venetian_smalti", "pebble"];
}

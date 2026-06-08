type ConversionTable = Record<string, Record<string, number>>;

const LENGTH: ConversionTable = {
  m: { m: 1, km: 0.001, cm: 100, mm: 1000, mi: 0.000621371, ft: 3.28084, in: 39.3701, yd: 1.09361 },
  km: { m: 1000, km: 1, cm: 100000, mm: 1000000, mi: 0.621371, ft: 3280.84, in: 39370.1, yd: 1093.61 },
  cm: { m: 0.01, km: 0.00001, cm: 1, mm: 10, mi: 6.2137e-6, ft: 0.0328084, in: 0.393701, yd: 0.0109361 },
  mm: { m: 0.001, km: 0.000001, cm: 0.1, mm: 1, mi: 6.2137e-7, ft: 0.00328084, in: 0.0393701, yd: 0.00109361 },
  mi: { m: 1609.34, km: 1.60934, cm: 160934, mm: 1609340, mi: 1, ft: 5280, in: 63360, yd: 1760 },
  ft: { m: 0.3048, km: 0.0003048, cm: 30.48, mm: 304.8, mi: 0.000189394, ft: 1, in: 12, yd: 0.333333 },
  in: { m: 0.0254, km: 0.0000254, cm: 2.54, mm: 25.4, mi: 1.5783e-5, ft: 0.0833333, in: 1, yd: 0.0277778 },
  yd: { m: 0.9144, km: 0.0009144, cm: 91.44, mm: 914.4, mi: 0.000568182, ft: 3, in: 36, yd: 1 },
};

const WEIGHT: ConversionTable = {
  kg: { kg: 1, g: 1000, mg: 1000000, lb: 2.20462, oz: 35.274 },
  g: { kg: 0.001, g: 1, mg: 1000, lb: 0.00220462, oz: 0.035274 },
  mg: { kg: 0.000001, g: 0.001, mg: 1, lb: 2.20462e-6, oz: 3.5274e-5 },
  lb: { kg: 0.453592, g: 453.592, mg: 453592, lb: 1, oz: 16 },
  oz: { kg: 0.0283495, g: 28.3495, mg: 28349.5, lb: 0.0625, oz: 1 },
};

const TEMPERATURE_CONVERTERS: Record<string, Record<string, (v: number) => number>> = {
  c: { f: (v) => v * 9 / 5 + 32, k: (v) => v + 273.15, c: (v) => v },
  f: { c: (v) => (v - 32) * 5 / 9, k: (v) => (v - 32) * 5 / 9 + 273.15, f: (v) => v },
  k: { c: (v) => v - 273.15, f: (v) => (v - 273.15) * 9 / 5 + 32, k: (v) => v },
};

const TABLES: Record<string, ConversionTable> = { length: LENGTH, weight: WEIGHT };

export function convert(value: number, from: string, to: string, category?: string): number {
  const fromLower = from.toLowerCase();
  const toLower = to.toLowerCase();

  if (category === "temperature" || fromLower in TEMPERATURE_CONVERTERS) {
    const converter = TEMPERATURE_CONVERTERS[fromLower]?.[toLower];
    if (!converter) throw new Error(`Cannot convert ${from} to ${to}`);
    return converter(value);
  }

  if (category) {
    const table = TABLES[category];
    if (!table) throw new Error(`Unknown category: ${category}`);
    const factor = table[fromLower]?.[toLower];
    if (factor === undefined) throw new Error(`Cannot convert ${from} to ${to}`);
    return value * factor;
  }

  for (const table of Object.values(TABLES)) {
    const factor = table[fromLower]?.[toLower];
    if (factor !== undefined) return value * factor;
  }

  throw new Error(`Cannot convert ${from} to ${to}`);
}

export function listUnits(category: string): string[] {
  if (category === "temperature") return ["c", "f", "k"];
  const table = TABLES[category];
  if (!table) return [];
  return Object.keys(table);
}

export function listCategories(): string[] {
  return [...Object.keys(TABLES), "temperature"];
}

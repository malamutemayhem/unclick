export interface ConversionFactor {
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

type UnitDef = Record<string, ConversionFactor>;

const linear = (factor: number): ConversionFactor => ({
  toBase: v => v * factor,
  fromBase: v => v / factor,
});

const LENGTH_UNITS: UnitDef = {
  meter: linear(1),
  kilometer: linear(1000),
  centimeter: linear(0.01),
  millimeter: linear(0.001),
  mile: linear(1609.344),
  yard: linear(0.9144),
  foot: linear(0.3048),
  inch: linear(0.0254),
  nautical_mile: linear(1852),
};

const MASS_UNITS: UnitDef = {
  kilogram: linear(1),
  gram: linear(0.001),
  milligram: linear(0.000001),
  pound: linear(0.453592),
  ounce: linear(0.0283495),
  ton: linear(1000),
  stone: linear(6.35029),
};

const TEMP_UNITS: UnitDef = {
  celsius: { toBase: v => v, fromBase: v => v },
  fahrenheit: { toBase: v => (v - 32) * 5 / 9, fromBase: v => v * 9 / 5 + 32 },
  kelvin: { toBase: v => v - 273.15, fromBase: v => v + 273.15 },
};

const VOLUME_UNITS: UnitDef = {
  liter: linear(1),
  milliliter: linear(0.001),
  gallon_us: linear(3.78541),
  gallon_uk: linear(4.54609),
  cup: linear(0.236588),
  tablespoon: linear(0.0147868),
  teaspoon: linear(0.00492892),
  fluid_ounce: linear(0.0295735),
};

const SPEED_UNITS: UnitDef = {
  mps: linear(1),
  kph: linear(1 / 3.6),
  mph: linear(0.44704),
  knot: linear(0.514444),
  fps: linear(0.3048),
};

const AREA_UNITS: UnitDef = {
  sqm: linear(1),
  sqkm: linear(1e6),
  sqft: linear(0.092903),
  sqmi: linear(2.59e6),
  acre: linear(4046.86),
  hectare: linear(10000),
};

const TIME_UNITS: UnitDef = {
  second: linear(1),
  minute: linear(60),
  hour: linear(3600),
  day: linear(86400),
  week: linear(604800),
  month: linear(2629746),
  year: linear(31556952),
};

const CATEGORIES: Record<string, UnitDef> = {
  length: LENGTH_UNITS,
  mass: MASS_UNITS,
  temperature: TEMP_UNITS,
  volume: VOLUME_UNITS,
  speed: SPEED_UNITS,
  area: AREA_UNITS,
  time: TIME_UNITS,
};

export function convert(value: number, fromUnit: string, toUnit: string, category?: string): number {
  if (category) {
    const units = CATEGORIES[category];
    if (!units) throw new Error(`Unknown category: ${category}`);
    if (!units[fromUnit]) throw new Error(`Unknown unit: ${fromUnit}`);
    if (!units[toUnit]) throw new Error(`Unknown unit: ${toUnit}`);
    const base = units[fromUnit].toBase(value);
    return units[toUnit].fromBase(base);
  }

  for (const units of Object.values(CATEGORIES)) {
    if (units[fromUnit] && units[toUnit]) {
      const base = units[fromUnit].toBase(value);
      return units[toUnit].fromBase(base);
    }
  }
  throw new Error(`Cannot find matching category for ${fromUnit} and ${toUnit}`);
}

export function listCategories(): string[] {
  return Object.keys(CATEGORIES);
}

export function listUnits(category: string): string[] {
  const units = CATEGORIES[category];
  if (!units) return [];
  return Object.keys(units);
}

export function findCategory(unit: string): string | null {
  for (const [cat, units] of Object.entries(CATEGORIES)) {
    if (units[unit]) return cat;
  }
  return null;
}

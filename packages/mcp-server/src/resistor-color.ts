export type BandColor = "black" | "brown" | "red" | "orange" | "yellow" |
  "green" | "blue" | "violet" | "grey" | "white" | "gold" | "silver" | "none";

export interface ResistorResult {
  resistance: number;
  tolerance: number;
  formatted: string;
  min: number;
  max: number;
}

const DIGIT_COLORS: Record<string, number> = {
  black: 0, brown: 1, red: 2, orange: 3, yellow: 4,
  green: 5, blue: 6, violet: 7, grey: 8, white: 9,
};

const MULTIPLIER_COLORS: Record<string, number> = {
  black: 1, brown: 10, red: 100, orange: 1000, yellow: 10000,
  green: 100000, blue: 1000000, violet: 10000000, grey: 100000000,
  white: 1000000000, gold: 0.1, silver: 0.01,
};

const TOLERANCE_COLORS: Record<string, number> = {
  brown: 1, red: 2, green: 0.5, blue: 0.25, violet: 0.1,
  grey: 0.05, gold: 5, silver: 10, none: 20,
};

export function colorToDigit(color: BandColor): number {
  return DIGIT_COLORS[color] ?? -1;
}

export function digitToColor(digit: number): BandColor {
  for (const [color, val] of Object.entries(DIGIT_COLORS)) {
    if (val === digit) return color as BandColor;
  }
  return "black";
}

export function colorToMultiplier(color: BandColor): number {
  return MULTIPLIER_COLORS[color] ?? 1;
}

export function colorToTolerance(color: BandColor): number {
  return TOLERANCE_COLORS[color] ?? 20;
}

export function decode4Band(band1: BandColor, band2: BandColor, multiplier: BandColor, tolerance: BandColor = "gold"): ResistorResult {
  const d1 = colorToDigit(band1);
  const d2 = colorToDigit(band2);
  const mult = colorToMultiplier(multiplier);
  const tol = colorToTolerance(tolerance);
  const resistance = (d1 * 10 + d2) * mult;
  return {
    resistance,
    tolerance: tol,
    formatted: formatResistance(resistance),
    min: resistance * (1 - tol / 100),
    max: resistance * (1 + tol / 100),
  };
}

export function decode5Band(band1: BandColor, band2: BandColor, band3: BandColor, multiplier: BandColor, tolerance: BandColor = "gold"): ResistorResult {
  const d1 = colorToDigit(band1);
  const d2 = colorToDigit(band2);
  const d3 = colorToDigit(band3);
  const mult = colorToMultiplier(multiplier);
  const tol = colorToTolerance(tolerance);
  const resistance = (d1 * 100 + d2 * 10 + d3) * mult;
  return {
    resistance,
    tolerance: tol,
    formatted: formatResistance(resistance),
    min: resistance * (1 - tol / 100),
    max: resistance * (1 + tol / 100),
  };
}

export function formatResistance(ohms: number): string {
  if (ohms >= 1e9) return `${(ohms / 1e9).toFixed(ohms % 1e9 === 0 ? 0 : 1)} G ohm`;
  if (ohms >= 1e6) return `${(ohms / 1e6).toFixed(ohms % 1e6 === 0 ? 0 : 1)} M ohm`;
  if (ohms >= 1e3) return `${(ohms / 1e3).toFixed(ohms % 1e3 === 0 ? 0 : 1)} k ohm`;
  if (ohms < 1) return `${(ohms * 1000).toFixed(0)} m ohm`;
  return `${ohms} ohm`;
}

export function encode4Band(ohms: number, tolerance: number = 5): BandColor[] {
  const tol = toleranceToColor(tolerance);
  let value = ohms;
  let multiplierExp = 0;

  if (value >= 100) {
    while (value >= 100) {
      value /= 10;
      multiplierExp++;
    }
  } else if (value < 10 && value >= 1) {
    value *= 10;
    multiplierExp = -1;
  } else if (value < 1) {
    value *= 100;
    multiplierExp = -2;
  }

  const d1 = Math.floor(value / 10);
  const d2 = Math.round(value % 10);

  let multColor: BandColor = "black";
  if (multiplierExp === -2) multColor = "silver";
  else if (multiplierExp === -1) multColor = "gold";
  else multColor = digitToColor(multiplierExp);

  return [digitToColor(d1), digitToColor(d2), multColor, tol];
}

function toleranceToColor(tol: number): BandColor {
  const entries = Object.entries(TOLERANCE_COLORS);
  let closest: BandColor = "gold";
  let minDiff = Infinity;
  for (const [color, val] of entries) {
    const diff = Math.abs(val - tol);
    if (diff < minDiff) {
      minDiff = diff;
      closest = color as BandColor;
    }
  }
  return closest;
}

export function parallelResistance(...resistances: number[]): number {
  if (resistances.length === 0) return 0;
  let sum = 0;
  for (const r of resistances) {
    if (r === 0) return 0;
    sum += 1 / r;
  }
  return 1 / sum;
}

export function seriesResistance(...resistances: number[]): number {
  return resistances.reduce((a, b) => a + b, 0);
}

export function voltageDivider(r1: number, r2: number, vin: number): number {
  return vin * r2 / (r1 + r2);
}

export function currentThrough(resistance: number, voltage: number): number {
  if (resistance === 0) return Infinity;
  return voltage / resistance;
}

export function powerDissipated(resistance: number, voltage: number): number {
  if (resistance === 0) return Infinity;
  return (voltage * voltage) / resistance;
}

export function nearestStandard(ohms: number, series: "E12" | "E24" | "E96" = "E24"): number {
  const E12 = [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2];
  const E24 = [1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0,
    3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1];
  const E96 = [1.00, 1.02, 1.05, 1.07, 1.10, 1.13, 1.15, 1.18, 1.21, 1.24,
    1.27, 1.30, 1.33, 1.37, 1.40, 1.43, 1.47, 1.50, 1.54, 1.58,
    1.62, 1.65, 1.69, 1.74, 1.78, 1.82, 1.87, 1.91, 1.96, 2.00,
    2.05, 2.10, 2.15, 2.21, 2.26, 2.32, 2.37, 2.43, 2.49, 2.55,
    2.61, 2.67, 2.74, 2.80, 2.87, 2.94, 3.01, 3.09, 3.16, 3.24,
    3.32, 3.40, 3.48, 3.57, 3.65, 3.74, 3.83, 3.92, 4.02, 4.12,
    4.22, 4.32, 4.42, 4.53, 4.64, 4.75, 4.87, 4.99, 5.11, 5.23,
    5.36, 5.49, 5.62, 5.76, 5.90, 6.04, 6.19, 6.34, 6.49, 6.65,
    6.81, 6.98, 7.15, 7.32, 7.50, 7.68, 7.87, 8.06, 8.25, 8.45,
    8.66, 8.87, 9.09, 9.31, 9.53, 9.76];

  const values = series === "E12" ? E12 : series === "E24" ? E24 : E96;
  const exp = Math.floor(Math.log10(ohms));
  const normalized = ohms / Math.pow(10, exp);

  let closest = values[0];
  let minDiff = Math.abs(normalized - closest);
  for (const v of values) {
    const diff = Math.abs(normalized - v);
    if (diff < minDiff) {
      minDiff = diff;
      closest = v;
    }
  }
  return parseFloat((closest * Math.pow(10, exp)).toPrecision(3));
}

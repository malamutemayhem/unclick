export type AbacusType = "suanpan" | "soroban" | "schoty" | "roman" | "cranmer";

export function rodCount(type: AbacusType): number {
  const rods: Record<AbacusType, number> = {
    suanpan: 13, soroban: 13, schoty: 10, roman: 8, cranmer: 13,
  };
  return rods[type];
}

export function beadsPerRod(type: AbacusType): { upper: number; lower: number } {
  const beads: Record<AbacusType, { upper: number; lower: number }> = {
    suanpan: { upper: 2, lower: 5 }, soroban: { upper: 1, lower: 4 },
    schoty: { upper: 0, lower: 10 }, roman: { upper: 1, lower: 4 },
    cranmer: { upper: 1, lower: 4 },
  };
  return beads[type];
}

export function maxValue(rods: number): number {
  return Math.pow(10, rods) - 1;
}

export function totalBeads(type: AbacusType): number {
  const rods = rodCount(type);
  const b = beadsPerRod(type);
  return rods * (b.upper + b.lower);
}

export function placeValue(rod: number): number {
  return Math.pow(10, rod);
}

export function additionSteps(a: number, b: number): number {
  const digits = Math.max(String(a).length, String(b).length);
  return digits + 1;
}

export function multiplicationSteps(a: number, b: number): number {
  return String(a).length * String(b).length;
}

export function complementOf5(n: number): number {
  return 5 - (n % 5);
}

export function complementOf10(n: number): number {
  return 10 - (n % 10);
}

export function frameDimensions(rods: number, beadDiameterMm: number): { widthCm: number; heightCm: number } {
  return {
    widthCm: parseFloat((rods * beadDiameterMm * 1.5 / 10).toFixed(1)),
    heightCm: parseFloat((beadDiameterMm * 12 / 10).toFixed(1)),
  };
}

export function proficiencyLevel(operationsPerMinute: number): string {
  if (operationsPerMinute >= 20) return "master";
  if (operationsPerMinute >= 10) return "advanced";
  if (operationsPerMinute >= 5) return "intermediate";
  return "beginner";
}

export function learningHours(type: AbacusType): number {
  const hours: Record<AbacusType, number> = {
    suanpan: 50, soroban: 40, schoty: 20, roman: 30, cranmer: 40,
  };
  return hours[type];
}

export function abacusTypes(): AbacusType[] {
  return ["suanpan", "soroban", "schoty", "roman", "cranmer"];
}

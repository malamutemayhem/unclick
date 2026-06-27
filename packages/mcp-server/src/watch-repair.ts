export type MovementType = "mechanical" | "automatic" | "quartz" | "solar" | "spring_drive";
export type CaseMaterial = "steel" | "titanium" | "gold" | "ceramic" | "plastic";

export function serviceInterval(movement: MovementType): number {
  const years: Record<MovementType, number> = {
    mechanical: 5, automatic: 5, quartz: 10, solar: 10, spring_drive: 5,
  };
  return years[movement];
}

export function accuracyPerDay(movement: MovementType): number {
  const secPerDay: Record<MovementType, number> = {
    mechanical: 10, automatic: 8, quartz: 0.5, solar: 0.5, spring_drive: 1,
  };
  return secPerDay[movement];
}

export function powerReserve(movement: MovementType): number {
  const hours: Record<MovementType, number> = {
    mechanical: 42, automatic: 48, quartz: 17520, solar: 4380, spring_drive: 72,
  };
  return hours[movement];
}

export function batteryLife(movement: MovementType): number {
  if (movement === "quartz") return 2;
  if (movement === "solar") return 10;
  return 0;
}

export function waterResistance(atm: number): number {
  return atm * 10;
}

export function crystalType(priceRange: "budget" | "mid" | "luxury"): string {
  if (priceRange === "budget") return "mineral";
  if (priceRange === "mid") return "hardlex or sapphire";
  return "sapphire";
}

export function beatsPerHour(frequency: number): number {
  return Math.round(frequency * 7200);
}

export function frequencyFromBph(bph: number): number {
  return parseFloat((bph / 7200).toFixed(1));
}

export function timegrapherReading(rateSecPerDay: number, beatError: number, amplitudeDeg: number): string {
  const rateOk = Math.abs(rateSecPerDay) < 15;
  const beatOk = beatError < 1;
  const ampOk = amplitudeDeg > 250 && amplitudeDeg < 310;
  if (rateOk && beatOk && ampOk) return "healthy";
  if (!ampOk) return "needs service (low amplitude)";
  if (!beatOk) return "needs regulation (beat error)";
  return "needs regulation (rate)";
}

export function bandSizeMm(wristCircumferenceMm: number): number {
  return Math.round(wristCircumferenceMm - 10);
}

export function springBarSize(lugWidthMm: number): number {
  return lugWidthMm;
}

export function gasketLife(): number {
  return 3;
}

export function lubricantReapply(movement: MovementType): number {
  return serviceInterval(movement);
}

export function movementTypes(): MovementType[] {
  return ["mechanical", "automatic", "quartz", "solar", "spring_drive"];
}

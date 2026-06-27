export type JerkyMeat = "beef" | "venison" | "turkey" | "pork" | "bison";

export function sliceThicknessMm(meat: JerkyMeat): number {
  const thickness: Record<JerkyMeat, number> = {
    beef: 5, venison: 4, turkey: 3, pork: 4, bison: 5,
  };
  return thickness[meat];
}

export function marinadeTimeHours(meat: JerkyMeat): number {
  const hours: Record<JerkyMeat, number> = {
    beef: 12, venison: 24, turkey: 8, pork: 16, bison: 12,
  };
  return hours[meat];
}

export function dryingTempCelsius(meat: JerkyMeat): number {
  const temps: Record<JerkyMeat, number> = {
    beef: 70, venison: 68, turkey: 74, pork: 72, bison: 70,
  };
  return temps[meat];
}

export function dryingTimeHours(meat: JerkyMeat): number {
  const hours: Record<JerkyMeat, number> = {
    beef: 8, venison: 7, turkey: 6, pork: 9, bison: 8,
  };
  return hours[meat];
}

export function yieldPercent(meat: JerkyMeat): number {
  const yields: Record<JerkyMeat, number> = {
    beef: 35, venison: 30, turkey: 40, pork: 33, bison: 32,
  };
  return yields[meat];
}

export function saltGPerKg(meat: JerkyMeat): number {
  const salt: Record<JerkyMeat, number> = {
    beef: 20, venison: 22, turkey: 18, pork: 25, bison: 20,
  };
  return salt[meat];
}

export function shelfLifeWeeks(meat: JerkyMeat): number {
  const weeks: Record<JerkyMeat, number> = {
    beef: 8, venison: 6, turkey: 4, pork: 5, bison: 8,
  };
  return weeks[meat];
}

export function proteinPercentDry(meat: JerkyMeat): number {
  const protein: Record<JerkyMeat, number> = {
    beef: 50, venison: 55, turkey: 45, pork: 40, bison: 52,
  };
  return protein[meat];
}

export function costPerKgRaw(meat: JerkyMeat): number {
  const costs: Record<JerkyMeat, number> = {
    beef: 18, venison: 30, turkey: 12, pork: 10, bison: 35,
  };
  return costs[meat];
}

export function jerkyMeats(): JerkyMeat[] {
  return ["beef", "venison", "turkey", "pork", "bison"];
}

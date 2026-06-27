export type ShellType = "peony" | "chrysanthemum" | "willow" | "palm" | "ring" | "crossette";
export type CaliberInch = 3 | 4 | 5 | 6 | 8 | 10 | 12;

export function burstDiameterM(caliberInch: CaliberInch): number {
  return parseFloat((caliberInch * 10).toFixed(0));
}

export function launchHeight(caliberInch: CaliberInch): number {
  return parseFloat((caliberInch * 25).toFixed(0));
}

export function safetyRadiusM(caliberInch: CaliberInch): number {
  return parseFloat((caliberInch * 21).toFixed(0));
}

export function fuseDelay(heightM: number): number {
  return parseFloat(Math.sqrt(2 * heightM / 9.81).toFixed(1));
}

export function starCount(caliberInch: CaliberInch, shellType: ShellType): number {
  const base = caliberInch * caliberInch;
  const factor: Record<ShellType, number> = {
    peony: 1, chrysanthemum: 1.5, willow: 0.8, palm: 0.6, ring: 1.2, crossette: 0.5,
  };
  return Math.round(base * factor[shellType]);
}

export function burnTime(caliberInch: CaliberInch): number {
  return parseFloat((caliberInch * 0.5 + 1).toFixed(1));
}

export function colorTemp(color: "red" | "green" | "blue" | "white" | "gold"): number {
  const temps: Record<string, number> = { red: 700, green: 900, blue: 1200, white: 2000, gold: 1500 };
  return temps[color];
}

export function soundDelay(distanceM: number): number {
  return parseFloat((distanceM / 343).toFixed(2));
}

export function showDuration(shells: number, intervalS: number = 3): number {
  return parseFloat(((shells * intervalS) / 60).toFixed(1));
}

export function costPerShell(caliberInch: CaliberInch): number {
  return parseFloat((caliberInch * caliberInch * 2).toFixed(0));
}

export function showCost(shells: number, avgCaliberInch: CaliberInch): number {
  return shells * costPerShell(avgCaliberInch);
}

export function windLimit(caliberInch: CaliberInch): number {
  if (caliberInch <= 4) return 40;
  if (caliberInch <= 6) return 30;
  return 25;
}

export function shellTypes(): ShellType[] {
  return ["peony", "chrysanthemum", "willow", "palm", "ring", "crossette"];
}

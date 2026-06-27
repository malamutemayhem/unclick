export type LimeSource = "chalk" | "limestone" | "marble" | "shell" | "coral";

export function calciningTemp(source: LimeSource): number {
  const temps: Record<LimeSource, number> = { chalk: 850, limestone: 900, marble: 950, shell: 800, coral: 820 };
  return temps[source];
}

export function burnTimeHours(massKg: number, kilnSizeM3: number): number {
  if (kilnSizeM3 <= 0) return 0;
  return parseFloat((massKg / kilnSizeM3 * 2 + 12).toFixed(0));
}

export function yieldPercent(source: LimeSource): number {
  const yields: Record<LimeSource, number> = { chalk: 52, limestone: 56, marble: 54, shell: 48, coral: 45 };
  return yields[source];
}

export function quicklimeKg(rawKg: number, source: LimeSource): number {
  return parseFloat((rawKg * yieldPercent(source) / 100).toFixed(1));
}

export function waterForSlaking(quicklimeKg: number): number {
  return parseFloat((quicklimeKg * 0.32).toFixed(1));
}

export function slakingTemp(): number {
  return 300;
}

export function mortarRatio(purpose: string): string {
  const ratios: Record<string, string> = {
    bricklaying: "1:3", plastering: "1:4", rendering: "1:5", pointing: "1:2",
  };
  return ratios[purpose] || "1:3";
}

export function settingTimeHours(thicknessMm: number, humidity: number): number {
  return parseFloat((thicknessMm * 0.5 * (2 - humidity / 100)).toFixed(0));
}

export function fuelKg(limestoneKg: number, fuelType: string): number {
  const ratios: Record<string, number> = { wood: 0.5, coal: 0.3, coke: 0.25, charcoal: 0.4 };
  return parseFloat((limestoneKg * (ratios[fuelType] || 0.4)).toFixed(1));
}

export function co2EmissionsKg(limestoneKg: number): number {
  return parseFloat((limestoneKg * 0.44).toFixed(1));
}

export function limeSources(): LimeSource[] {
  return ["chalk", "limestone", "marble", "shell", "coral"];
}

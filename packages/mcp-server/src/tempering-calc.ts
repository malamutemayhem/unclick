export type TemperColor = "pale_yellow" | "straw" | "brown" | "purple" | "blue";

export function temperatureCelsius(color: TemperColor): number {
  const temps: Record<TemperColor, number> = {
    pale_yellow: 220, straw: 240, brown: 260, purple: 280, blue: 300,
  };
  return temps[color];
}

export function holdTimeMinutes(thicknessMm: number): number {
  return parseFloat((thicknessMm * 1.5 + 15).toFixed(1));
}

export function hardnessReductionHrc(color: TemperColor): number {
  const reductions: Record<TemperColor, number> = {
    pale_yellow: 2, straw: 5, brown: 8, purple: 12, blue: 16,
  };
  return reductions[color];
}

export function toughnessGain(color: TemperColor): number {
  const gains: Record<TemperColor, number> = {
    pale_yellow: 2, straw: 4, brown: 6, purple: 8, blue: 10,
  };
  return gains[color];
}

export function applicationSuitability(color: TemperColor): string {
  const apps: Record<TemperColor, string> = {
    pale_yellow: "razors", straw: "chisels", brown: "axes", purple: "swords", blue: "springs",
  };
  return apps[color];
}

export function cycleCount(application: "cutting" | "striking" | "flexing"): number {
  const cycles: Record<string, number> = {
    cutting: 1, striking: 2, flexing: 3,
  };
  return cycles[application];
}

export function coolingMethod(color: TemperColor): string {
  return color === "blue" || color === "purple" ? "oil" : "air";
}

export function heatingRateCPerMin(thicknessMm: number): number {
  return parseFloat((500 / thicknessMm).toFixed(1));
}

export function energyCostPerCycle(holdTimeMinutes: number, furnacePowerKw: number): number {
  return parseFloat((holdTimeMinutes / 60 * furnacePowerKw).toFixed(2));
}

export function qualityCheckMethod(color: TemperColor): string {
  return color === "pale_yellow" || color === "straw" ? "file_test" : "bend_test";
}

export function temperColors(): TemperColor[] {
  return ["pale_yellow", "straw", "brown", "purple", "blue"];
}

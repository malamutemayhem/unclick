export type HardyTool = "hot_cut" | "cold_cut" | "fuller" | "flatter" | "swage";

export function shankSizeMm(anvilHardyHoleMm: number): number {
  return parseFloat((anvilHardyHoleMm - 0.5).toFixed(1));
}

export function shankLengthMm(anvilHardyHoleMm: number): number {
  return parseFloat((anvilHardyHoleMm * 1.5).toFixed(0));
}

export function cuttingEdgeAngleDeg(tool: HardyTool): number {
  const angles: Record<HardyTool, number> = {
    hot_cut: 30, cold_cut: 60, fuller: 0, flatter: 0, swage: 0,
  };
  return angles[tool];
}

export function toolSteelGrade(tool: HardyTool): string {
  const grades: Record<HardyTool, string> = {
    hot_cut: "H13", cold_cut: "S7", fuller: "4140", flatter: "4140", swage: "4140",
  };
  return grades[tool];
}

export function hardeningTemperatureCelsius(tool: HardyTool): number {
  const temps: Record<HardyTool, number> = {
    hot_cut: 1010, cold_cut: 930, fuller: 830, flatter: 830, swage: 830,
  };
  return temps[tool];
}

export function temperingTemperatureCelsius(tool: HardyTool): number {
  const temps: Record<HardyTool, number> = {
    hot_cut: 540, cold_cut: 260, fuller: 370, flatter: 370, swage: 370,
  };
  return temps[tool];
}

export function expectedLifeCuts(tool: HardyTool): number {
  const cuts: Record<HardyTool, number> = {
    hot_cut: 5000, cold_cut: 2000, fuller: 10000, flatter: 10000, swage: 8000,
  };
  return cuts[tool];
}

export function forgingTimeMinutes(tool: HardyTool): number {
  const mins: Record<HardyTool, number> = {
    hot_cut: 30, cold_cut: 45, fuller: 25, flatter: 20, swage: 35,
  };
  return mins[tool];
}

export function weightG(tool: HardyTool): number {
  const weights: Record<HardyTool, number> = {
    hot_cut: 400, cold_cut: 500, fuller: 350, flatter: 600, swage: 450,
  };
  return weights[tool];
}

export function hardyTools(): HardyTool[] {
  return ["hot_cut", "cold_cut", "fuller", "flatter", "swage"];
}

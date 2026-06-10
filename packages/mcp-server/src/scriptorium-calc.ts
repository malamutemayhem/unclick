export type ScriptoriumLight = "north_window" | "clerestory" | "lantern" | "candle_rack" | "skylight";

export function deskCount(monkCount: number): number {
  return Math.ceil(monkCount * 0.3);
}

export function deskWidthCm(vellumWidthCm: number): number {
  return parseFloat((vellumWidthCm * 1.5).toFixed(1));
}

export function deskAngleDeg(taskType: "writing" | "illuminating"): number {
  return taskType === "writing" ? 45 : 30;
}

export function floorAreaM2(deskCount: number): number {
  return parseFloat((deskCount * 3.5 + 8).toFixed(1));
}

export function windowAreaM2(floorAreaM2: number): number {
  return parseFloat((floorAreaM2 * 0.2).toFixed(2));
}

export function lightLevelLux(lightSource: ScriptoriumLight): number {
  const lux: Record<ScriptoriumLight, number> = {
    north_window: 400, clerestory: 350, lantern: 500, candle_rack: 200, skylight: 600,
  };
  return lux[lightSource];
}

export function inkWellCount(deskCount: number): number {
  return deskCount * 2;
}

export function vellumStorageM3(deskCount: number): number {
  return parseFloat((deskCount * 0.15).toFixed(2));
}

export function heatingAllowed(): boolean {
  return false;
}

export function annualVellumSheetsConsumed(deskCount: number, workingDays: number): number {
  return Math.ceil(deskCount * workingDays * 0.5);
}

export function scriptoriumLightSources(): ScriptoriumLight[] {
  return ["north_window", "clerestory", "lantern", "candle_rack", "skylight"];
}

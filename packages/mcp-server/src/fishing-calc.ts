export type FishingType = "fly" | "spinning" | "baitcasting" | "trolling" | "surf" | "ice";
export type LineType = "monofilament" | "fluorocarbon" | "braided";

export function lineStrength(fishWeightLbs: number, safetyFactor: number = 1.5): number {
  return parseFloat((fishWeightLbs * safetyFactor).toFixed(1));
}

export function lineDiameter(testLbs: number, type: LineType): number {
  const base: Record<LineType, number> = {
    monofilament: 0.012, fluorocarbon: 0.011, braided: 0.006,
  };
  return parseFloat((Math.sqrt(testLbs) * base[type]).toFixed(3));
}

export function leaderLength(fishType: string, waterClarity: "clear" | "stained" | "murky"): number {
  const base = waterClarity === "clear" ? 9 : waterClarity === "stained" ? 7 : 4;
  return base;
}

export function hookSize(fishWeightLbs: number): number {
  if (fishWeightLbs < 1) return 12;
  if (fishWeightLbs < 5) return 6;
  if (fishWeightLbs < 15) return 2;
  if (fishWeightLbs < 40) return 1;
  return 0;
}

export function rodLength(fishingType: FishingType): number {
  const lengths: Record<FishingType, number> = {
    fly: 9, spinning: 7, baitcasting: 7, trolling: 8, surf: 10, ice: 3,
  };
  return lengths[fishingType];
}

export function rodPower(targetWeightLbs: number): string {
  if (targetWeightLbs < 2) return "ultralight";
  if (targetWeightLbs < 8) return "light";
  if (targetWeightLbs < 20) return "medium";
  if (targetWeightLbs < 50) return "heavy";
  return "extra-heavy";
}

export function castDistance(rodLengthFt: number, lureWeightOz: number, skill: number = 0.7): number {
  return parseFloat((rodLengthFt * 8 * Math.sqrt(lureWeightOz) * skill).toFixed(0));
}

export function sinkRate(lureWeightOz: number, lureVolumeCc: number): number {
  const weightG = lureWeightOz * 28.35;
  const buoyancy = lureVolumeCc;
  const netForce = weightG - buoyancy;
  if (netForce <= 0) return 0;
  return parseFloat((netForce * 0.1).toFixed(1));
}

export function dragSetting(lineTestLbs: number, fraction: number = 0.33): number {
  return parseFloat((lineTestLbs * fraction).toFixed(1));
}

export function flyWeight(hookSize: number): number {
  if (hookSize >= 10) return 1;
  if (hookSize >= 6) return 2;
  if (hookSize >= 2) return 4;
  return 6;
}

export function tidalWindow(highTideHour: number): { start: number; end: number } {
  return {
    start: (highTideHour - 2 + 24) % 24,
    end: (highTideHour + 2) % 24,
  };
}

export function baitAmount(hoursOfFishing: number, hookCount: number): number {
  return Math.ceil(hoursOfFishing * hookCount * 3);
}

export function keeperSize(speciesMinInch: number, caughtInch: number): boolean {
  return caughtInch >= speciesMinInch;
}

export function bagLimit(speciesLimit: number, caught: number): number {
  return Math.max(0, speciesLimit - caught);
}

export function fishingTypes(): FishingType[] {
  return ["fly", "spinning", "baitcasting", "trolling", "surf", "ice"];
}

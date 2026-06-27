export type IrrigationType = "drip" | "sprinkler" | "flood" | "furrow" | "olla";

export function waterEfficiencyPercent(type: IrrigationType): number {
  const m: Record<IrrigationType, number> = {
    drip: 95, sprinkler: 75, flood: 50, furrow: 60, olla: 90,
  };
  return m[type];
}

export function setupCostPerHectare(type: IrrigationType): number {
  const m: Record<IrrigationType, number> = {
    drip: 3000, sprinkler: 2500, flood: 500, furrow: 300, olla: 1500,
  };
  return m[type];
}

export function maintenanceLevel(type: IrrigationType): number {
  const m: Record<IrrigationType, number> = {
    drip: 7, sprinkler: 6, flood: 3, furrow: 4, olla: 2,
  };
  return m[type];
}

export function uniformity(type: IrrigationType): number {
  const m: Record<IrrigationType, number> = {
    drip: 9, sprinkler: 7, flood: 4, furrow: 5, olla: 8,
  };
  return m[type];
}

export function evaporationLoss(type: IrrigationType): number {
  const m: Record<IrrigationType, number> = {
    drip: 1, sprinkler: 6, flood: 8, furrow: 5, olla: 1,
  };
  return m[type];
}

export function pressureRequired(type: IrrigationType): boolean {
  const m: Record<IrrigationType, boolean> = {
    drip: true, sprinkler: true, flood: false, furrow: false, olla: false,
  };
  return m[type];
}

export function slopeCompatible(type: IrrigationType): boolean {
  const m: Record<IrrigationType, boolean> = {
    drip: true, sprinkler: true, flood: false, furrow: false, olla: true,
  };
  return m[type];
}

export function bestCropType(type: IrrigationType): string {
  const m: Record<IrrigationType, string> = {
    drip: "vegetables", sprinkler: "grain", flood: "rice",
    furrow: "row_crops", olla: "garden_beds",
  };
  return m[type];
}

export function lifespanYears(type: IrrigationType): number {
  const m: Record<IrrigationType, number> = {
    drip: 10, sprinkler: 15, flood: 50, furrow: 30, olla: 5,
  };
  return m[type];
}

export function irrigationTypes(): IrrigationType[] {
  return ["drip", "sprinkler", "flood", "furrow", "olla"];
}

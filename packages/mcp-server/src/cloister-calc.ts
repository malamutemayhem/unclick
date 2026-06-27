export type CloisterVault = "barrel" | "groin" | "ribbed" | "fan" | "lierne";

export function walkwayWidthM(garthSideM: number): number {
  return parseFloat((garthSideM * 0.2).toFixed(2));
}

export function totalPerimeterM(garthSideM: number): number {
  return parseFloat((garthSideM * 4).toFixed(1));
}

export function arcadeCount(garthSideM: number, arcadeSpacingCm: number): number {
  if (arcadeSpacingCm <= 0) return 0;
  return Math.floor(garthSideM * 100 / arcadeSpacingCm) * 4;
}

export function columnCount(arcadeCount: number): number {
  return arcadeCount;
}

export function floorAreaM2(garthSideM: number, walkwayWidthM: number): number {
  const outerSide = garthSideM + 2 * walkwayWidthM;
  return parseFloat((outerSide ** 2 - garthSideM ** 2).toFixed(1));
}

export function vaultBayCount(totalPerimeterM: number, bayLengthCm: number): number {
  if (bayLengthCm <= 0) return 0;
  return Math.ceil(totalPerimeterM * 100 / bayLengthCm);
}

export function lavatoriumLengthM(garthSideM: number): number {
  return parseFloat((garthSideM * 0.3).toFixed(2));
}

export function garthAreaM2(garthSideM: number): number {
  return parseFloat((garthSideM ** 2).toFixed(1));
}

export function carvingHoursPerBay(vault: CloisterVault): number {
  const hours: Record<CloisterVault, number> = {
    barrel: 8, groin: 14, ribbed: 20, fan: 35, lierne: 45,
  };
  return hours[vault];
}

export function restorationCostPerM(vault: CloisterVault, baseCost: number): number {
  const multipliers: Record<CloisterVault, number> = {
    barrel: 1.0, groin: 1.5, ribbed: 2.0, fan: 3.0, lierne: 4.0,
  };
  return parseFloat((baseCost * multipliers[vault]).toFixed(2));
}

export function cloisterVaults(): CloisterVault[] {
  return ["barrel", "groin", "ribbed", "fan", "lierne"];
}

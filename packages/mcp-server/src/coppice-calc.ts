export type CoppiceTree = "hazel" | "willow" | "chestnut" | "ash" | "oak";

export function rotationYears(tree: CoppiceTree): number {
  const years: Record<CoppiceTree, number> = { hazel: 7, willow: 3, chestnut: 12, ash: 15, oak: 25 };
  return years[tree];
}

export function stemsPerStool(tree: CoppiceTree, age: number): number {
  const base: Record<CoppiceTree, number> = { hazel: 8, willow: 12, chestnut: 5, ash: 4, oak: 3 };
  return Math.ceil(base[tree] * (1 + age * 0.05));
}

export function yieldM3PerHa(tree: CoppiceTree): number {
  const yields: Record<CoppiceTree, number> = { hazel: 4, willow: 8, chestnut: 6, ash: 5, oak: 3 };
  return yields[tree];
}

export function stoolSpacingM(tree: CoppiceTree): number {
  const spacing: Record<CoppiceTree, number> = { hazel: 3, willow: 1.5, chestnut: 4, ash: 5, oak: 6 };
  return spacing[tree];
}

export function stoolsPerHa(spacingM: number): number {
  if (spacingM <= 0) return 0;
  return Math.floor(10000 / (spacingM * spacingM));
}

export function cuttingSeason(tree: CoppiceTree): string {
  return tree === "willow" ? "winter_spring" : "winter";
}

export function regenerationMonths(tree: CoppiceTree): number {
  const months: Record<CoppiceTree, number> = { hazel: 4, willow: 2, chestnut: 5, ash: 6, oak: 8 };
  return months[tree];
}

export function biodiversityScore(ageVariety: number, speciesCount: number): number {
  return parseFloat((ageVariety * speciesCount * 1.5).toFixed(0));
}

export function charcoalYieldKg(woodKg: number): number {
  return parseFloat((woodKg * 0.25).toFixed(1));
}

export function carbonSequestrationKg(areaHa: number, ageYears: number): number {
  return parseFloat((areaHa * ageYears * 3.5).toFixed(0));
}

export function coppiceTrees(): CoppiceTree[] {
  return ["hazel", "willow", "chestnut", "ash", "oak"];
}

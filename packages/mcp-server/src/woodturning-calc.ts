export type WoodType = "oak" | "maple" | "walnut" | "cherry" | "pine" | "birch" | "ash" | "mahogany";
export type ProjectType = "bowl" | "spindle" | "platter" | "box" | "pen" | "vase";

const WOOD_DENSITY: Record<WoodType, number> = {
  oak: 0.75, maple: 0.71, walnut: 0.64, cherry: 0.56,
  pine: 0.51, birch: 0.67, ash: 0.68, mahogany: 0.54,
};

const JANKA_HARDNESS: Record<WoodType, number> = {
  oak: 1290, maple: 1450, walnut: 1010, cherry: 950,
  pine: 380, birch: 1260, ash: 1320, mahogany: 800,
};

export function blankDiameter(finishedDiameter: number): number {
  return parseFloat((finishedDiameter * 1.15).toFixed(1));
}

export function blankLength(finishedLength: number): number {
  return parseFloat((finishedLength + 5).toFixed(1));
}

export function blankVolumeCm3(diameterCm: number, lengthCm: number): number {
  const radius = diameterCm / 2;
  return parseFloat((Math.PI * radius * radius * lengthCm).toFixed(1));
}

export function blankWeight(volumeCm3: number, wood: WoodType): number {
  return parseFloat((volumeCm3 * WOOD_DENSITY[wood] / 1000).toFixed(2));
}

export function jankaHardness(wood: WoodType): number {
  return JANKA_HARDNESS[wood];
}

export function spindleSpeed(diameterCm: number): { min: number; max: number } {
  const diameterInch = diameterCm / 2.54;
  const maxRpm = Math.round(6000 / diameterInch);
  const minRpm = Math.round(maxRpm * 0.5);
  return { min: minRpm, max: maxRpm };
}

export function faceplateSize(blankDiameterCm: number): number {
  const sizes = [7.5, 10, 12.5, 15, 20, 25];
  const target = blankDiameterCm * 0.33;
  for (const s of sizes) {
    if (s >= target) return s;
  }
  return sizes[sizes.length - 1];
}

export function gougeSize(diameterCm: number): number {
  if (diameterCm <= 10) return 10;
  if (diameterCm <= 20) return 13;
  if (diameterCm <= 30) return 16;
  return 19;
}

export function sandingGrits(): number[] {
  return [80, 120, 180, 240, 320, 400];
}

export function sandingTime(surfaceAreaCm2: number, grits: number = 6): number {
  const minutesPerGrit = surfaceAreaCm2 / 100 * 3;
  return parseFloat((minutesPerGrit * grits).toFixed(0));
}

export function finishCoats(type: "oil" | "lacquer" | "wax" | "shellac"): number {
  const coats: Record<string, number> = { oil: 3, lacquer: 4, wax: 2, shellac: 3 };
  return coats[type] ?? 3;
}

export function dryingTimeHours(type: "oil" | "lacquer" | "wax" | "shellac"): number {
  const hours: Record<string, number> = { oil: 24, lacquer: 2, wax: 1, shellac: 4 };
  return hours[type] ?? 12;
}

export function bowlWallThickness(diameterCm: number): number {
  if (diameterCm <= 15) return 0.6;
  if (diameterCm <= 25) return 0.8;
  return 1.0;
}

export function wastePercent(project: ProjectType): number {
  const waste: Record<ProjectType, number> = {
    bowl: 65, spindle: 40, platter: 70, box: 55, pen: 30, vase: 60,
  };
  return waste[project];
}

export function projectTime(project: ProjectType, diameterCm: number): number {
  const baseHours: Record<ProjectType, number> = {
    bowl: 2, spindle: 1, platter: 2.5, box: 3, pen: 0.5, vase: 3,
  };
  const scaleFactor = diameterCm / 15;
  return parseFloat((baseHours[project] * scaleFactor).toFixed(1));
}

export function toolSharpening(turningHours: number): number {
  return Math.ceil(turningHours / 0.5);
}

export function woodTypes(): WoodType[] {
  return ["oak", "maple", "walnut", "cherry", "pine", "birch", "ash", "mahogany"];
}

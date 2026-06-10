export type WoodHardness = "soft" | "medium" | "hard" | "very_hard";

export function bladeAngle(hardness: WoodHardness): number {
  const angles: Record<WoodHardness, number> = {
    soft: 20, medium: 25, hard: 30, very_hard: 35,
  };
  return angles[hardness];
}

export function bladeBevel(primaryAngle: number): number {
  return parseFloat((primaryAngle / 2).toFixed(1));
}

export function shavingThickness(angle: number, pressure: number): number {
  if (angle <= 0) return 0;
  return parseFloat((pressure / angle * 0.5).toFixed(2));
}

export function handleLength(bladeWidth: number): number {
  return parseFloat((bladeWidth * 0.4 + 10).toFixed(0));
}

export function materialRemovalRate(depth: number, width: number, strokesPerMin: number): number {
  return parseFloat((depth * width * strokesPerMin * 0.001).toFixed(3));
}

export function sharpeningInterval(hardness: WoodHardness, hoursUsed: number): boolean {
  const maxHours: Record<WoodHardness, number> = {
    soft: 4, medium: 3, hard: 2, very_hard: 1,
  };
  return hoursUsed >= maxHours[hardness];
}

export function grindstoneGrit(stage: string): number {
  const grits: Record<string, number> = {
    reshape: 120, sharpen: 400, hone: 1000, strop: 3000,
  };
  return grits[stage] || 400;
}

export function pullForceN(hardness: WoodHardness, bladeWidth: number): number {
  const factors: Record<WoodHardness, number> = {
    soft: 5, medium: 10, hard: 18, very_hard: 25,
  };
  return parseFloat((factors[hardness] * bladeWidth / 10).toFixed(1));
}

export function wastePercent(technique: string): number {
  const waste: Record<string, number> = {
    roughing: 30, shaping: 15, finishing: 5,
  };
  return waste[technique] || 15;
}

export function woodHardnessLevels(): WoodHardness[] {
  return ["soft", "medium", "hard", "very_hard"];
}

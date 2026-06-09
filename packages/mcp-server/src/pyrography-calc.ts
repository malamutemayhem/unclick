export type WoodSurface = "basswood" | "birch" | "poplar" | "maple" | "pine" | "cherry";
export type TipType = "universal" | "shading" | "calligraphy" | "ball" | "knife" | "flow_point";

export function burnTemp(surface: WoodSurface): { minC: number; maxC: number; idealC: number } {
  const temps: Record<WoodSurface, { minC: number; maxC: number; idealC: number }> = {
    basswood: { minC: 300, maxC: 450, idealC: 370 },
    birch: { minC: 350, maxC: 500, idealC: 420 },
    poplar: { minC: 300, maxC: 450, idealC: 360 },
    maple: { minC: 400, maxC: 550, idealC: 470 },
    pine: { minC: 250, maxC: 400, idealC: 320 },
    cherry: { minC: 380, maxC: 520, idealC: 440 },
  };
  return temps[surface];
}

export function burnSpeed(surface: WoodSurface): string {
  const hardness: Record<WoodSurface, string> = {
    basswood: "fast",
    birch: "medium",
    poplar: "fast",
    maple: "slow",
    pine: "fast",
    cherry: "slow",
  };
  return hardness[surface];
}

export function tipSelection(technique: "outlining" | "shading" | "filling" | "lettering" | "detail"): TipType {
  const tips: Record<string, TipType> = {
    outlining: "universal",
    shading: "shading",
    filling: "flow_point",
    lettering: "calligraphy",
    detail: "knife",
  };
  return tips[technique];
}

export function projectTime(areaCm2: number, detail: "low" | "medium" | "high"): number {
  const minutesPerCm2: Record<string, number> = { low: 1, medium: 3, high: 6 };
  return parseFloat((areaCm2 * minutesPerCm2[detail] / 60).toFixed(1));
}

export function sandingPrep(surface: WoodSurface): number[] {
  if (surface === "pine") return [120, 220, 320];
  return [220, 320, 400];
}

export function sealerCoats(surface: WoodSurface): number {
  if (surface === "pine" || surface === "poplar") return 2;
  return 1;
}

export function carbonTransferTime(areaCm2: number): number {
  return parseFloat((areaCm2 * 0.3 / 60).toFixed(1));
}

export function finishType(surface: WoodSurface): string {
  if (surface === "pine") return "polyurethane";
  return "tung oil";
}

export function contrastLevel(tempC: number, surface: WoodSurface): string {
  const ideal = burnTemp(surface).idealC;
  const diff = tempC - ideal;
  if (diff < -50) return "light";
  if (diff < 20) return "medium";
  return "dark";
}

export function ventilationNeeded(areaCm2: number): boolean {
  return areaCm2 > 50;
}

export function sessionLength(): number {
  return 45;
}

export function cooldownMinutes(): number {
  return 5;
}

export function woodSurfaces(): WoodSurface[] {
  return ["basswood", "birch", "poplar", "maple", "pine", "cherry"];
}

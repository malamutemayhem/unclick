export type Medium = "bone" | "antler" | "ivory_nut" | "shell" | "synthetic";
export type Tool = "needle" | "burin" | "dremel" | "scribe" | "pin_vise";

export function surfaceArea(lengthCm: number, widthCm: number): number {
  return parseFloat((lengthCm * widthCm).toFixed(1));
}

export function curvatureCorrection(radiusCm: number, flatAreaCm2: number): number {
  if (radiusCm <= 0) return flatAreaCm2;
  const arc = 2 * Math.PI * radiusCm;
  const correction = arc / (2 * radiusCm);
  return parseFloat((flatAreaCm2 * correction).toFixed(1));
}

export function inkPenetration(medium: Medium): number {
  const mm: Record<Medium, number> = {
    bone: 0.3, antler: 0.5, ivory_nut: 0.2, shell: 0.1, synthetic: 0.4,
  };
  return mm[medium];
}

export function lineWidth(tool: Tool): number {
  const mm: Record<Tool, number> = {
    needle: 0.1, burin: 0.3, dremel: 0.5, scribe: 0.2, pin_vise: 0.15,
  };
  return mm[tool];
}

export function engravingDepth(medium: Medium): number {
  const mm: Record<Medium, number> = {
    bone: 0.2, antler: 0.3, ivory_nut: 0.15, shell: 0.1, synthetic: 0.25,
  };
  return mm[medium];
}

export function hardness(medium: Medium): number {
  const mohs: Record<Medium, number> = {
    bone: 3, antler: 2.5, ivory_nut: 2.5, shell: 3.5, synthetic: 2,
  };
  return mohs[medium];
}

export function workTime(areaCm2: number, detail: string): number {
  const factor = detail === "high" ? 3 : detail === "medium" ? 2 : 1;
  return parseFloat((areaCm2 * factor * 0.5).toFixed(1));
}

export function sandingGrit(stage: string): number {
  if (stage === "rough") return 220;
  if (stage === "medium") return 400;
  if (stage === "fine") return 600;
  return 1000;
}

export function sealerCoats(medium: Medium): number {
  const coats: Record<Medium, number> = {
    bone: 2, antler: 2, ivory_nut: 3, shell: 1, synthetic: 1,
  };
  return coats[medium];
}

export function collectibleValue(ageDays: number, quality: string): number {
  const base = quality === "high" ? 200 : quality === "medium" ? 80 : 30;
  return parseFloat((base * (1 + ageDays / 3650)).toFixed(0));
}

export function scrimshawMedia(): Medium[] {
  return ["bone", "antler", "ivory_nut", "shell", "synthetic"];
}

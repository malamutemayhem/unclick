export type SgraffitoStage = "slip_coat" | "leather_hard" | "incising" | "cleanup" | "bisque_fire";

export function timingHoursAfterThrow(stage: SgraffitoStage): number {
  const h: Record<SgraffitoStage, number> = {
    slip_coat: 2, leather_hard: 12, incising: 14, cleanup: 16, bisque_fire: 48,
  };
  return h[stage];
}

export function toolSharpness(stage: SgraffitoStage): number {
  const s: Record<SgraffitoStage, number> = {
    slip_coat: 1, leather_hard: 3, incising: 9, cleanup: 5, bisque_fire: 0,
  };
  return s[stage];
}

export function moisturePercent(stage: SgraffitoStage): number {
  const m: Record<SgraffitoStage, number> = {
    slip_coat: 25, leather_hard: 18, incising: 16, cleanup: 14, bisque_fire: 0,
  };
  return m[stage];
}

export function slipLayerCount(stage: SgraffitoStage): number {
  const l: Record<SgraffitoStage, number> = {
    slip_coat: 3, leather_hard: 0, incising: 0, cleanup: 0, bisque_fire: 0,
  };
  return l[stage];
}

export function detailPrecision(stage: SgraffitoStage): number {
  const d: Record<SgraffitoStage, number> = {
    slip_coat: 2, leather_hard: 5, incising: 10, cleanup: 7, bisque_fire: 0,
  };
  return d[stage];
}

export function reversible(stage: SgraffitoStage): boolean {
  return stage === "slip_coat" || stage === "leather_hard";
}

export function dustGeneration(stage: SgraffitoStage): number {
  const d: Record<SgraffitoStage, number> = {
    slip_coat: 0, leather_hard: 2, incising: 7, cleanup: 8, bisque_fire: 1,
  };
  return d[stage];
}

export function skillLevel(stage: SgraffitoStage): number {
  const s: Record<SgraffitoStage, number> = {
    slip_coat: 3, leather_hard: 4, incising: 9, cleanup: 5, bisque_fire: 2,
  };
  return s[stage];
}

export function timePerStageMinutes(stage: SgraffitoStage): number {
  const t: Record<SgraffitoStage, number> = {
    slip_coat: 15, leather_hard: 5, incising: 60, cleanup: 20, bisque_fire: 480,
  };
  return t[stage];
}

export function sgraffitoStages(): SgraffitoStage[] {
  return ["slip_coat", "leather_hard", "incising", "cleanup", "bisque_fire"];
}

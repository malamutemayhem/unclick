export type PotteryForm = "vase" | "bowl" | "plate" | "teapot" | "sculpture";

export function functionalScore(p: PotteryForm): number {
  const m: Record<PotteryForm, number> = {
    vase: 7, bowl: 9, plate: 10, teapot: 8, sculpture: 2,
  };
  return m[p];
}

export function formDifficulty(p: PotteryForm): number {
  const m: Record<PotteryForm, number> = {
    vase: 6, bowl: 4, plate: 5, teapot: 9, sculpture: 10,
  };
  return m[p];
}

export function marketDemand(p: PotteryForm): number {
  const m: Record<PotteryForm, number> = {
    vase: 7, bowl: 9, plate: 8, teapot: 6, sculpture: 5,
  };
  return m[p];
}

export function glazeConsumption(p: PotteryForm): number {
  const m: Record<PotteryForm, number> = {
    vase: 7, bowl: 6, plate: 5, teapot: 8, sculpture: 9,
  };
  return m[p];
}

export function dryingSensitivity(p: PotteryForm): number {
  const m: Record<PotteryForm, number> = {
    vase: 5, bowl: 4, plate: 8, teapot: 9, sculpture: 7,
  };
  return m[p];
}

export function dailyUse(p: PotteryForm): boolean {
  const m: Record<PotteryForm, boolean> = {
    vase: true, bowl: true, plate: true, teapot: true, sculpture: false,
  };
  return m[p];
}

export function requiresLid(p: PotteryForm): boolean {
  const m: Record<PotteryForm, boolean> = {
    vase: false, bowl: false, plate: false, teapot: true, sculpture: false,
  };
  return m[p];
}

export function bestTechnique(p: PotteryForm): string {
  const m: Record<PotteryForm, string> = {
    vase: "wheel_throwing", bowl: "wheel_throwing",
    plate: "slab_or_wheel", teapot: "multi_part_assembly",
    sculpture: "hand_building",
  };
  return m[p];
}

export function historicalOrigin(p: PotteryForm): string {
  const m: Record<PotteryForm, string> = {
    vase: "ancient_greece_china", bowl: "prehistoric_universal",
    plate: "medieval_europe", teapot: "ming_dynasty_china",
    sculpture: "prehistoric_figurines",
  };
  return m[p];
}

export function potteryForms(): PotteryForm[] {
  return ["vase", "bowl", "plate", "teapot", "sculpture"];
}

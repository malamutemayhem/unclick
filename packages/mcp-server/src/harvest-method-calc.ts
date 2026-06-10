export type HarvestMethod = "combine" | "hand_picking" | "mechanical_shaker" | "stripper_header" | "swathing";

export function speedHectaresPerHour(h: HarvestMethod): number {
  const m: Record<HarvestMethod, number> = {
    combine: 10, hand_picking: 0.1, mechanical_shaker: 5, stripper_header: 12, swathing: 8,
  };
  return m[h];
}

export function cropDamage(h: HarvestMethod): number {
  const m: Record<HarvestMethod, number> = {
    combine: 4, hand_picking: 1, mechanical_shaker: 6, stripper_header: 3, swathing: 2,
  };
  return m[h];
}

export function laborIntensity(h: HarvestMethod): number {
  const m: Record<HarvestMethod, number> = {
    combine: 2, hand_picking: 10, mechanical_shaker: 3, stripper_header: 2, swathing: 4,
  };
  return m[h];
}

export function fuelConsumption(h: HarvestMethod): number {
  const m: Record<HarvestMethod, number> = {
    combine: 8, hand_picking: 0, mechanical_shaker: 6, stripper_header: 7, swathing: 5,
  };
  return m[h];
}

export function grainLossPercent(h: HarvestMethod): number {
  const m: Record<HarvestMethod, number> = {
    combine: 3, hand_picking: 1, mechanical_shaker: 5, stripper_header: 2, swathing: 4,
  };
  return m[h];
}

export function selectiveHarvest(h: HarvestMethod): boolean {
  const m: Record<HarvestMethod, boolean> = {
    combine: false, hand_picking: true, mechanical_shaker: false, stripper_header: false, swathing: false,
  };
  return m[h];
}

export function requiresTractor(h: HarvestMethod): boolean {
  const m: Record<HarvestMethod, boolean> = {
    combine: false, hand_picking: false, mechanical_shaker: true, stripper_header: true, swathing: true,
  };
  return m[h];
}

export function bestCrop(h: HarvestMethod): string {
  const m: Record<HarvestMethod, string> = {
    combine: "wheat", hand_picking: "fruit", mechanical_shaker: "nuts",
    stripper_header: "canola", swathing: "barley",
  };
  return m[h];
}

export function capitalCost(h: HarvestMethod): number {
  const m: Record<HarvestMethod, number> = {
    combine: 10, hand_picking: 1, mechanical_shaker: 6, stripper_header: 4, swathing: 5,
  };
  return m[h];
}

export function harvestMethods(): HarvestMethod[] {
  return ["combine", "hand_picking", "mechanical_shaker", "stripper_header", "swathing"];
}

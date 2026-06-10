export type PressType = "basket" | "rack_cloth" | "bladder" | "screw" | "hydraulic";

export function juiceYieldPercent(press: PressType): number {
  const j: Record<PressType, number> = {
    basket: 60, rack_cloth: 75, bladder: 80, screw: 65, hydraulic: 85,
  };
  return j[press];
}

export function pressureCapacity(press: PressType): number {
  const p: Record<PressType, number> = {
    basket: 4, rack_cloth: 7, bladder: 8, screw: 6, hydraulic: 10,
  };
  return p[press];
}

export function batchSizeLiters(press: PressType): number {
  const b: Record<PressType, number> = {
    basket: 20, rack_cloth: 50, bladder: 40, screw: 30, hydraulic: 100,
  };
  return b[press];
}

export function operatorStrength(press: PressType): number {
  const o: Record<PressType, number> = {
    basket: 6, rack_cloth: 5, bladder: 3, screw: 7, hydraulic: 2,
  };
  return o[press];
}

export function cleanupMinutes(press: PressType): number {
  const c: Record<PressType, number> = {
    basket: 15, rack_cloth: 30, bladder: 20, screw: 10, hydraulic: 25,
  };
  return c[press];
}

export function portability(press: PressType): number {
  const p: Record<PressType, number> = {
    basket: 7, rack_cloth: 3, bladder: 5, screw: 6, hydraulic: 1,
  };
  return p[press];
}

export function clarityResult(press: PressType): number {
  const c: Record<PressType, number> = {
    basket: 5, rack_cloth: 8, bladder: 7, screw: 4, hydraulic: 9,
  };
  return c[press];
}

export function bestFruit(press: PressType): string {
  const b: Record<PressType, string> = {
    basket: "small_batch_apples", rack_cloth: "cider_apples", bladder: "grapes",
    screw: "berries", hydraulic: "commercial_apples",
  };
  return b[press];
}

export function costEstimate(press: PressType): number {
  const c: Record<PressType, number> = {
    basket: 150, rack_cloth: 500, bladder: 400, screw: 200, hydraulic: 2000,
  };
  return c[press];
}

export function pressTypes(): PressType[] {
  return ["basket", "rack_cloth", "bladder", "screw", "hydraulic"];
}

export type BeeType = "honeybee" | "bumblebee" | "mason" | "carpenter" | "sweat";

export function colonySize(bee: BeeType): number {
  const m: Record<BeeType, number> = {
    honeybee: 60000, bumblebee: 200, mason: 1, carpenter: 1, sweat: 1,
  };
  return m[bee];
}

export function pollinationEfficiency(bee: BeeType): number {
  const m: Record<BeeType, number> = {
    honeybee: 7, bumblebee: 9, mason: 10, carpenter: 5, sweat: 4,
  };
  return m[bee];
}

export function flightRangeKm(bee: BeeType): number {
  const m: Record<BeeType, number> = {
    honeybee: 5, bumblebee: 2, mason: 0.1, carpenter: 3, sweat: 0.5,
  };
  return m[bee];
}

export function coldTolerance(bee: BeeType): number {
  const m: Record<BeeType, number> = {
    honeybee: 5, bumblebee: 9, mason: 6, carpenter: 4, sweat: 3,
  };
  return m[bee];
}

export function honeyProduction(bee: BeeType): number {
  const m: Record<BeeType, number> = {
    honeybee: 10, bumblebee: 2, mason: 0, carpenter: 0, sweat: 0,
  };
  return m[bee];
}

export function social(bee: BeeType): boolean {
  const m: Record<BeeType, boolean> = {
    honeybee: true, bumblebee: true, mason: false, carpenter: false, sweat: false,
  };
  return m[bee];
}

export function stings(bee: BeeType): boolean {
  const m: Record<BeeType, boolean> = {
    honeybee: true, bumblebee: true, mason: false, carpenter: false, sweat: true,
  };
  return m[bee];
}

export function nestLocation(bee: BeeType): string {
  const m: Record<BeeType, string> = {
    honeybee: "hive", bumblebee: "underground", mason: "hollow_stem",
    carpenter: "wood_tunnel", sweat: "soil_burrow",
  };
  return m[bee];
}

export function economicValue(bee: BeeType): number {
  const m: Record<BeeType, number> = {
    honeybee: 10, bumblebee: 7, mason: 8, carpenter: 2, sweat: 3,
  };
  return m[bee];
}

export function beeTypes(): BeeType[] {
  return ["honeybee", "bumblebee", "mason", "carpenter", "sweat"];
}

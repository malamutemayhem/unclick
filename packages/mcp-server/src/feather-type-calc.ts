export type FeatherType = "contour" | "down" | "flight" | "filoplume" | "semiplume";

export function insulationValue(feather: FeatherType): number {
  const m: Record<FeatherType, number> = {
    contour: 5, down: 10, flight: 2, filoplume: 1, semiplume: 8,
  };
  return m[feather];
}

export function aerodynamicFunction(feather: FeatherType): number {
  const m: Record<FeatherType, number> = {
    contour: 7, down: 1, flight: 10, filoplume: 0, semiplume: 2,
  };
  return m[feather];
}

export function waterproofing(feather: FeatherType): number {
  const m: Record<FeatherType, number> = {
    contour: 9, down: 3, flight: 7, filoplume: 1, semiplume: 4,
  };
  return m[feather];
}

export function sensoryFunction(feather: FeatherType): number {
  const m: Record<FeatherType, number> = {
    contour: 3, down: 1, flight: 2, filoplume: 10, semiplume: 4,
  };
  return m[feather];
}

export function barbuleDensity(feather: FeatherType): number {
  const m: Record<FeatherType, number> = {
    contour: 8, down: 5, flight: 9, filoplume: 0, semiplume: 4,
  };
  return m[feather];
}

export function visibleExternally(feather: FeatherType): boolean {
  const m: Record<FeatherType, boolean> = {
    contour: true, down: false, flight: true, filoplume: false, semiplume: false,
  };
  return m[feather];
}

export function hasRachis(feather: FeatherType): boolean {
  const m: Record<FeatherType, boolean> = {
    contour: true, down: false, flight: true, filoplume: true, semiplume: true,
  };
  return m[feather];
}

export function primaryLocation(feather: FeatherType): string {
  const m: Record<FeatherType, string> = {
    contour: "body_surface", down: "under_contour", flight: "wings_tail",
    filoplume: "near_contour", semiplume: "under_contour",
  };
  return m[feather];
}

export function moltFrequency(feather: FeatherType): number {
  const m: Record<FeatherType, number> = {
    contour: 7, down: 5, flight: 3, filoplume: 6, semiplume: 5,
  };
  return m[feather];
}

export function featherTypes(): FeatherType[] {
  return ["contour", "down", "flight", "filoplume", "semiplume"];
}

export type HideCuringMethod = "salt_cure" | "air_dry" | "smoke_cure" | "brain_tan" | "alum_taw";

export function processingDays(method: HideCuringMethod): number {
  const m: Record<HideCuringMethod, number> = {
    salt_cure: 14, air_dry: 7, smoke_cure: 3, brain_tan: 5, alum_taw: 10,
  };
  return m[method];
}

export function flexibilityResult(method: HideCuringMethod): number {
  const m: Record<HideCuringMethod, number> = {
    salt_cure: 5, air_dry: 3, smoke_cure: 7, brain_tan: 9, alum_taw: 6,
  };
  return m[method];
}

export function waterResistance(method: HideCuringMethod): number {
  const m: Record<HideCuringMethod, number> = {
    salt_cure: 4, air_dry: 3, smoke_cure: 8, brain_tan: 6, alum_taw: 5,
  };
  return m[method];
}

export function durabilityRating(method: HideCuringMethod): number {
  const m: Record<HideCuringMethod, number> = {
    salt_cure: 7, air_dry: 5, smoke_cure: 6, brain_tan: 7, alum_taw: 8,
  };
  return m[method];
}

export function odorLevel(method: HideCuringMethod): number {
  const m: Record<HideCuringMethod, number> = {
    salt_cure: 4, air_dry: 6, smoke_cure: 7, brain_tan: 8, alum_taw: 3,
  };
  return m[method];
}

export function chemicalFree(method: HideCuringMethod): boolean {
  const m: Record<HideCuringMethod, boolean> = {
    salt_cure: true, air_dry: true, smoke_cure: true, brain_tan: true, alum_taw: false,
  };
  return m[method];
}

export function washable(method: HideCuringMethod): boolean {
  const m: Record<HideCuringMethod, boolean> = {
    salt_cure: false, air_dry: false, smoke_cure: true, brain_tan: true, alum_taw: false,
  };
  return m[method];
}

export function bestHideType(method: HideCuringMethod): string {
  const m: Record<HideCuringMethod, string> = {
    salt_cure: "cowhide", air_dry: "rawhide", smoke_cure: "deerskin",
    brain_tan: "buckskin", alum_taw: "goatskin",
  };
  return m[method];
}

export function costPerHide(method: HideCuringMethod): number {
  const m: Record<HideCuringMethod, number> = {
    salt_cure: 15, air_dry: 5, smoke_cure: 20, brain_tan: 10, alum_taw: 25,
  };
  return m[method];
}

export function hideCuringMethods(): HideCuringMethod[] {
  return ["salt_cure", "air_dry", "smoke_cure", "brain_tan", "alum_taw"];
}

export type HoneyVariety = "manuka" | "acacia" | "wildflower" | "buckwheat" | "clover";

export function flavorIntensity(h: HoneyVariety): number {
  const m: Record<HoneyVariety, number> = {
    manuka: 8, acacia: 4, wildflower: 6, buckwheat: 10, clover: 5,
  };
  return m[h];
}

export function medicinalValue(h: HoneyVariety): number {
  const m: Record<HoneyVariety, number> = {
    manuka: 10, acacia: 5, wildflower: 6, buckwheat: 7, clover: 4,
  };
  return m[h];
}

export function marketPrice(h: HoneyVariety): number {
  const m: Record<HoneyVariety, number> = {
    manuka: 10, acacia: 7, wildflower: 4, buckwheat: 6, clover: 3,
  };
  return m[h];
}

export function crystallizationSpeed(h: HoneyVariety): number {
  const m: Record<HoneyVariety, number> = {
    manuka: 7, acacia: 2, wildflower: 6, buckwheat: 5, clover: 8,
  };
  return m[h];
}

export function antioxidantLevel(h: HoneyVariety): number {
  const m: Record<HoneyVariety, number> = {
    manuka: 9, acacia: 4, wildflower: 6, buckwheat: 10, clover: 3,
  };
  return m[h];
}

export function lightColored(h: HoneyVariety): boolean {
  const m: Record<HoneyVariety, boolean> = {
    manuka: false, acacia: true, wildflower: false, buckwheat: false, clover: true,
  };
  return m[h];
}

export function singleOrigin(h: HoneyVariety): boolean {
  const m: Record<HoneyVariety, boolean> = {
    manuka: true, acacia: true, wildflower: false, buckwheat: true, clover: true,
  };
  return m[h];
}

export function flavorProfile(h: HoneyVariety): string {
  const m: Record<HoneyVariety, string> = {
    manuka: "earthy_herbal_medicinal", acacia: "mild_floral_vanilla",
    wildflower: "complex_seasonal_varied", buckwheat: "dark_molasses_malty",
    clover: "mild_sweet_classic",
  };
  return m[h];
}

export function primaryRegion(h: HoneyVariety): string {
  const m: Record<HoneyVariety, string> = {
    manuka: "new_zealand_australia", acacia: "hungary_italy_eastern_europe",
    wildflower: "worldwide_varied", buckwheat: "north_america_eastern_europe",
    clover: "north_america_new_zealand",
  };
  return m[h];
}

export function honeyVarieties(): HoneyVariety[] {
  return ["manuka", "acacia", "wildflower", "buckwheat", "clover"];
}

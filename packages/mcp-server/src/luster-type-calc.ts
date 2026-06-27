export type LusterType = "metallic" | "vitreous" | "adamantine" | "pearly" | "silky";

export function reflectivity(l: LusterType): number {
  const m: Record<LusterType, number> = {
    metallic: 10, vitreous: 7, adamantine: 9, pearly: 5, silky: 4,
  };
  return m[l];
}

export function refractiveIndex(l: LusterType): number {
  const m: Record<LusterType, number> = {
    metallic: 3, vitreous: 6, adamantine: 10, pearly: 5, silky: 4,
  };
  return m[l];
}

export function gemUseFrequency(l: LusterType): number {
  const m: Record<LusterType, number> = {
    metallic: 3, vitreous: 10, adamantine: 9, pearly: 6, silky: 4,
  };
  return m[l];
}

export function identificationEase(l: LusterType): number {
  const m: Record<LusterType, number> = {
    metallic: 9, vitreous: 5, adamantine: 8, pearly: 7, silky: 6,
  };
  return m[l];
}

export function commonness(l: LusterType): number {
  const m: Record<LusterType, number> = {
    metallic: 6, vitreous: 10, adamantine: 3, pearly: 5, silky: 4,
  };
  return m[l];
}

export function isOpaque(l: LusterType): boolean {
  const m: Record<LusterType, boolean> = {
    metallic: true, vitreous: false, adamantine: false, pearly: false, silky: false,
  };
  return m[l];
}

export function associatedWithGems(l: LusterType): boolean {
  const m: Record<LusterType, boolean> = {
    metallic: false, vitreous: true, adamantine: true, pearly: true, silky: false,
  };
  return m[l];
}

export function exampleMineral(l: LusterType): string {
  const m: Record<LusterType, string> = {
    metallic: "pyrite_galena", vitreous: "quartz_feldspar",
    adamantine: "diamond_zircon", pearly: "talc_muscovite",
    silky: "gypsum_chrysotile",
  };
  return m[l];
}

export function surfaceAppearance(l: LusterType): string {
  const m: Record<LusterType, string> = {
    metallic: "mirror_like_metal", vitreous: "glass_like",
    adamantine: "brilliant_diamond", pearly: "iridescent_shell",
    silky: "fibrous_sheen",
  };
  return m[l];
}

export function lusterTypes(): LusterType[] {
  return ["metallic", "vitreous", "adamantine", "pearly", "silky"];
}

export type FilamentType = "pla" | "abs" | "petg" | "tpu_flexible" | "nylon";

export function printEase(f: FilamentType): number {
  const m: Record<FilamentType, number> = {
    pla: 10, abs: 5, petg: 7, tpu_flexible: 3, nylon: 4,
  };
  return m[f];
}

export function strength(f: FilamentType): number {
  const m: Record<FilamentType, number> = {
    pla: 5, abs: 7, petg: 8, tpu_flexible: 6, nylon: 10,
  };
  return m[f];
}

export function heatResistance(f: FilamentType): number {
  const m: Record<FilamentType, number> = {
    pla: 3, abs: 8, petg: 6, tpu_flexible: 5, nylon: 9,
  };
  return m[f];
}

export function layerAdhesion(f: FilamentType): number {
  const m: Record<FilamentType, number> = {
    pla: 8, abs: 6, petg: 9, tpu_flexible: 7, nylon: 5,
  };
  return m[f];
}

export function spoolCost(f: FilamentType): number {
  const m: Record<FilamentType, number> = {
    pla: 3, abs: 4, petg: 5, tpu_flexible: 7, nylon: 8,
  };
  return m[f];
}

export function requiresEnclosure(f: FilamentType): boolean {
  const m: Record<FilamentType, boolean> = {
    pla: false, abs: true, petg: false, tpu_flexible: false, nylon: true,
  };
  return m[f];
}

export function biodegradable(f: FilamentType): boolean {
  const m: Record<FilamentType, boolean> = {
    pla: true, abs: false, petg: false, tpu_flexible: false, nylon: false,
  };
  return m[f];
}

export function basePolymer(f: FilamentType): string {
  const m: Record<FilamentType, string> = {
    pla: "polylactic_acid_corn_starch", abs: "acrylonitrile_butadiene_styrene",
    petg: "polyethylene_terephthalate_glycol", tpu_flexible: "thermoplastic_polyurethane",
    nylon: "polyamide_pa6_pa12",
  };
  return m[f];
}

export function bestUseCase(f: FilamentType): string {
  const m: Record<FilamentType, string> = {
    pla: "prototyping_decorative_model", abs: "functional_mechanical_part",
    petg: "outdoor_food_safe_container", tpu_flexible: "phone_case_gasket_wearable",
    nylon: "gear_hinge_load_bearing",
  };
  return m[f];
}

export function filamentTypes(): FilamentType[] {
  return ["pla", "abs", "petg", "tpu_flexible", "nylon"];
}

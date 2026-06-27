export type CapacitorType = "ceramic" | "electrolytic" | "film" | "tantalum" | "supercapacitor";

export function capacitanceRange(c: CapacitorType): number {
  const m: Record<CapacitorType, number> = {
    ceramic: 4, electrolytic: 8, film: 5, tantalum: 6, supercapacitor: 10,
  };
  return m[c];
}

export function voltageRating(c: CapacitorType): number {
  const m: Record<CapacitorType, number> = {
    ceramic: 7, electrolytic: 8, film: 10, tantalum: 4, supercapacitor: 2,
  };
  return m[c];
}

export function esrScore(c: CapacitorType): number {
  const m: Record<CapacitorType, number> = {
    ceramic: 9, electrolytic: 3, film: 8, tantalum: 5, supercapacitor: 2,
  };
  return m[c];
}

export function temperatureStability(c: CapacitorType): number {
  const m: Record<CapacitorType, number> = {
    ceramic: 6, electrolytic: 3, film: 9, tantalum: 7, supercapacitor: 4,
  };
  return m[c];
}

export function lifespan(c: CapacitorType): number {
  const m: Record<CapacitorType, number> = {
    ceramic: 10, electrolytic: 4, film: 9, tantalum: 6, supercapacitor: 5,
  };
  return m[c];
}

export function polarized(c: CapacitorType): boolean {
  const m: Record<CapacitorType, boolean> = {
    ceramic: false, electrolytic: true, film: false, tantalum: true, supercapacitor: true,
  };
  return m[c];
}

export function energyStorage(c: CapacitorType): boolean {
  const m: Record<CapacitorType, boolean> = {
    ceramic: false, electrolytic: false, film: false, tantalum: false, supercapacitor: true,
  };
  return m[c];
}

export function commonUse(c: CapacitorType): string {
  const m: Record<CapacitorType, string> = {
    ceramic: "decoupling_filtering", electrolytic: "power_supply_smoothing",
    film: "audio_precision", tantalum: "compact_electronics",
    supercapacitor: "energy_recovery_backup",
  };
  return m[c];
}

export function dielectricMaterial(c: CapacitorType): string {
  const m: Record<CapacitorType, string> = {
    ceramic: "barium_titanate", electrolytic: "aluminum_oxide",
    film: "polypropylene", tantalum: "tantalum_pentoxide",
    supercapacitor: "activated_carbon",
  };
  return m[c];
}

export function capacitorTypes(): CapacitorType[] {
  return ["ceramic", "electrolytic", "film", "tantalum", "supercapacitor"];
}

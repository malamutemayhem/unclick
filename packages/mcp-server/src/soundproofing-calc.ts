export type SoundproofingMethod = "mass_loaded_vinyl" | "acoustic_foam" | "fiberglass" | "decoupling" | "green_glue";

export function noiseReduction(s: SoundproofingMethod): number {
  const m: Record<SoundproofingMethod, number> = {
    mass_loaded_vinyl: 8, acoustic_foam: 4, fiberglass: 7, decoupling: 10, green_glue: 7,
  };
  return m[s];
}

export function lowFrequencyEffectiveness(s: SoundproofingMethod): number {
  const m: Record<SoundproofingMethod, number> = {
    mass_loaded_vinyl: 7, acoustic_foam: 2, fiberglass: 6, decoupling: 10, green_glue: 8,
  };
  return m[s];
}

export function installDifficulty(s: SoundproofingMethod): number {
  const m: Record<SoundproofingMethod, number> = {
    mass_loaded_vinyl: 6, acoustic_foam: 2, fiberglass: 5, decoupling: 9, green_glue: 4,
  };
  return m[s];
}

export function costPerSqFt(s: SoundproofingMethod): number {
  const m: Record<SoundproofingMethod, number> = {
    mass_loaded_vinyl: 7, acoustic_foam: 3, fiberglass: 4, decoupling: 9, green_glue: 6,
  };
  return m[s];
}

export function spaceRequired(s: SoundproofingMethod): number {
  const m: Record<SoundproofingMethod, number> = {
    mass_loaded_vinyl: 3, acoustic_foam: 4, fiberglass: 6, decoupling: 8, green_glue: 2,
  };
  return m[s];
}

export function fireRated(s: SoundproofingMethod): boolean {
  const m: Record<SoundproofingMethod, boolean> = {
    mass_loaded_vinyl: true, acoustic_foam: false, fiberglass: true, decoupling: true, green_glue: true,
  };
  return m[s];
}

export function diyFriendly(s: SoundproofingMethod): boolean {
  const m: Record<SoundproofingMethod, boolean> = {
    mass_loaded_vinyl: true, acoustic_foam: true, fiberglass: true, decoupling: false, green_glue: true,
  };
  return m[s];
}

export function application(s: SoundproofingMethod): string {
  const m: Record<SoundproofingMethod, string> = {
    mass_loaded_vinyl: "walls_floors_ceilings", acoustic_foam: "echo_absorption_studios",
    fiberglass: "wall_cavity_insulation", decoupling: "floating_floors_isolated_walls",
    green_glue: "between_drywall_layers",
  };
  return m[s];
}

export function stcRating(s: SoundproofingMethod): string {
  const m: Record<SoundproofingMethod, string> = {
    mass_loaded_vinyl: "stc_25_to_32", acoustic_foam: "stc_5_to_10",
    fiberglass: "stc_15_to_20", decoupling: "stc_50_plus",
    green_glue: "stc_10_to_15_added",
  };
  return m[s];
}

export function soundproofingMethods(): SoundproofingMethod[] {
  return ["mass_loaded_vinyl", "acoustic_foam", "fiberglass", "decoupling", "green_glue"];
}

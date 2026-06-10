export type AcousticPanelType = "foam_wedge_budget" | "fiberglass_wrapped_pro" | "wood_slat_diffuser" | "polyester_felt_eco" | "bass_trap_corner";

export function soundAbsorb(t: AcousticPanelType): number {
  const m: Record<AcousticPanelType, number> = {
    foam_wedge_budget: 6, fiberglass_wrapped_pro: 10, wood_slat_diffuser: 5, polyester_felt_eco: 7, bass_trap_corner: 9,
  };
  return m[t];
}

export function aesthetics(t: AcousticPanelType): number {
  const m: Record<AcousticPanelType, number> = {
    foam_wedge_budget: 4, fiberglass_wrapped_pro: 8, wood_slat_diffuser: 10, polyester_felt_eco: 7, bass_trap_corner: 5,
  };
  return m[t];
}

export function installEase(t: AcousticPanelType): number {
  const m: Record<AcousticPanelType, number> = {
    foam_wedge_budget: 10, fiberglass_wrapped_pro: 6, wood_slat_diffuser: 5, polyester_felt_eco: 8, bass_trap_corner: 4,
  };
  return m[t];
}

export function frequencyRange(t: AcousticPanelType): number {
  const m: Record<AcousticPanelType, number> = {
    foam_wedge_budget: 5, fiberglass_wrapped_pro: 9, wood_slat_diffuser: 7, polyester_felt_eco: 6, bass_trap_corner: 10,
  };
  return m[t];
}

export function panelCost(t: AcousticPanelType): number {
  const m: Record<AcousticPanelType, number> = {
    foam_wedge_budget: 1, fiberglass_wrapped_pro: 3, wood_slat_diffuser: 3, polyester_felt_eco: 2, bass_trap_corner: 2,
  };
  return m[t];
}

export function fireRetardant(t: AcousticPanelType): boolean {
  const m: Record<AcousticPanelType, boolean> = {
    foam_wedge_budget: false, fiberglass_wrapped_pro: true, wood_slat_diffuser: false, polyester_felt_eco: true, bass_trap_corner: true,
  };
  return m[t];
}

export function ecoFriendly(t: AcousticPanelType): boolean {
  const m: Record<AcousticPanelType, boolean> = {
    foam_wedge_budget: false, fiberglass_wrapped_pro: false, wood_slat_diffuser: true, polyester_felt_eco: true, bass_trap_corner: false,
  };
  return m[t];
}

export function coreMaterial(t: AcousticPanelType): string {
  const m: Record<AcousticPanelType, string> = {
    foam_wedge_budget: "open_cell_polyurethane",
    fiberglass_wrapped_pro: "rigid_fiberglass_board",
    wood_slat_diffuser: "mdf_slat_felt_backing",
    polyester_felt_eco: "recycled_pet_fiber",
    bass_trap_corner: "mineral_wool_rockwool",
  };
  return m[t];
}

export function bestRoom(t: AcousticPanelType): string {
  const m: Record<AcousticPanelType, string> = {
    foam_wedge_budget: "podcast_vocal_booth",
    fiberglass_wrapped_pro: "recording_studio_mix",
    wood_slat_diffuser: "living_room_hifi",
    polyester_felt_eco: "office_conference_room",
    bass_trap_corner: "bass_heavy_mix_room",
  };
  return m[t];
}

export function acousticPanels(): AcousticPanelType[] {
  return ["foam_wedge_budget", "fiberglass_wrapped_pro", "wood_slat_diffuser", "polyester_felt_eco", "bass_trap_corner"];
}

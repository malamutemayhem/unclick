export type MusicStandType = "wire_folding" | "solid_orchestral" | "tabletop_desk" | "conductor_heavy" | "clip_on_portable";

export function sheetCapacity(t: MusicStandType): number {
  const m: Record<MusicStandType, number> = {
    wire_folding: 5, solid_orchestral: 9, tabletop_desk: 6, conductor_heavy: 10, clip_on_portable: 3,
  };
  return m[t];
}

export function standStability(t: MusicStandType): number {
  const m: Record<MusicStandType, number> = {
    wire_folding: 5, solid_orchestral: 9, tabletop_desk: 7, conductor_heavy: 10, clip_on_portable: 4,
  };
  return m[t];
}

export function portabilityScore(t: MusicStandType): number {
  const m: Record<MusicStandType, number> = {
    wire_folding: 9, solid_orchestral: 4, tabletop_desk: 7, conductor_heavy: 2, clip_on_portable: 10,
  };
  return m[t];
}

export function heightRange(t: MusicStandType): number {
  const m: Record<MusicStandType, number> = {
    wire_folding: 7, solid_orchestral: 9, tabletop_desk: 3, conductor_heavy: 10, clip_on_portable: 2,
  };
  return m[t];
}

export function standCost(t: MusicStandType): number {
  const m: Record<MusicStandType, number> = {
    wire_folding: 1, solid_orchestral: 6, tabletop_desk: 3, conductor_heavy: 8, clip_on_portable: 2,
  };
  return m[t];
}

export function foldFlat(t: MusicStandType): boolean {
  const m: Record<MusicStandType, boolean> = {
    wire_folding: true, solid_orchestral: false, tabletop_desk: true, conductor_heavy: false, clip_on_portable: true,
  };
  return m[t];
}

export function heavyBase(t: MusicStandType): boolean {
  const m: Record<MusicStandType, boolean> = {
    wire_folding: false, solid_orchestral: true, tabletop_desk: false, conductor_heavy: true, clip_on_portable: false,
  };
  return m[t];
}

export function deskMaterial(t: MusicStandType): string {
  const m: Record<MusicStandType, string> = {
    wire_folding: "powder_coated_wire_frame", solid_orchestral: "perforated_steel_plate",
    tabletop_desk: "lightweight_aluminum_tray", conductor_heavy: "solid_wood_large_desk",
    clip_on_portable: "plastic_clamp_mini_tray",
  };
  return m[t];
}

export function bestVenue(t: MusicStandType): string {
  const m: Record<MusicStandType, string> = {
    wire_folding: "rehearsal_practice_room", solid_orchestral: "orchestra_pit_concert_hall",
    tabletop_desk: "home_desk_study_session", conductor_heavy: "podium_stage_conducting",
    clip_on_portable: "busking_outdoor_gig",
  };
  return m[t];
}

export function musicStands(): MusicStandType[] {
  return ["wire_folding", "solid_orchestral", "tabletop_desk", "conductor_heavy", "clip_on_portable"];
}

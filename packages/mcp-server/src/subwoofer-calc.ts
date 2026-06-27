export type Subwoofer = "sealed_compact" | "ported_bass_reflex" | "passive_radiator" | "horn_loaded" | "servo_controlled";

export function bassExtension(s: Subwoofer): number {
  const m: Record<Subwoofer, number> = {
    sealed_compact: 6, ported_bass_reflex: 9, passive_radiator: 8, horn_loaded: 10, servo_controlled: 7,
  };
  return m[s];
}

export function bassAccuracy(s: Subwoofer): number {
  const m: Record<Subwoofer, number> = {
    sealed_compact: 9, ported_bass_reflex: 6, passive_radiator: 7, horn_loaded: 5, servo_controlled: 10,
  };
  return m[s];
}

export function outputVolume(s: Subwoofer): number {
  const m: Record<Subwoofer, number> = {
    sealed_compact: 5, ported_bass_reflex: 9, passive_radiator: 7, horn_loaded: 10, servo_controlled: 6,
  };
  return m[s];
}

export function cabinetSize(s: Subwoofer): number {
  const m: Record<Subwoofer, number> = {
    sealed_compact: 3, ported_bass_reflex: 7, passive_radiator: 5, horn_loaded: 10, servo_controlled: 4,
  };
  return m[s];
}

export function subCost(s: Subwoofer): number {
  const m: Record<Subwoofer, number> = {
    sealed_compact: 4, ported_bass_reflex: 5, passive_radiator: 6, horn_loaded: 9, servo_controlled: 10,
  };
  return m[s];
}

export function roomFriendly(s: Subwoofer): boolean {
  const m: Record<Subwoofer, boolean> = {
    sealed_compact: true, ported_bass_reflex: false, passive_radiator: true, horn_loaded: false, servo_controlled: true,
  };
  return m[s];
}

export function selfPowered(s: Subwoofer): boolean {
  const m: Record<Subwoofer, boolean> = {
    sealed_compact: true, ported_bass_reflex: true, passive_radiator: true, horn_loaded: false, servo_controlled: true,
  };
  return m[s];
}

export function designPrinciple(s: Subwoofer): string {
  const m: Record<Subwoofer, string> = {
    sealed_compact: "airtight_box_controlled_roll", ported_bass_reflex: "tuned_port_resonance_boost",
    passive_radiator: "drone_cone_sealed_hybrid", horn_loaded: "folded_horn_acoustic_gain",
    servo_controlled: "feedback_loop_cone_correct",
  };
  return m[s];
}

export function bestContent(s: Subwoofer): string {
  const m: Record<Subwoofer, string> = {
    sealed_compact: "music_tight_accurate_bass", ported_bass_reflex: "movies_deep_rumble_impact",
    passive_radiator: "apartment_balanced_compact", horn_loaded: "live_venue_maximum_spl",
    servo_controlled: "audiophile_reference_flat",
  };
  return m[s];
}

export function subwoofers(): Subwoofer[] {
  return ["sealed_compact", "ported_bass_reflex", "passive_radiator", "horn_loaded", "servo_controlled"];
}

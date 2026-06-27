export type SpeakerWireType = "copper_16awg_basic" | "copper_12awg_thick" | "oxygen_free_ofc" | "flat_adhesive_wall" | "banana_plug_terminated";

export function signalQuality(t: SpeakerWireType): number {
  const m: Record<SpeakerWireType, number> = {
    copper_16awg_basic: 6, copper_12awg_thick: 8, oxygen_free_ofc: 10, flat_adhesive_wall: 5, banana_plug_terminated: 9,
  };
  return m[t];
}

export function powerHandling(t: SpeakerWireType): number {
  const m: Record<SpeakerWireType, number> = {
    copper_16awg_basic: 5, copper_12awg_thick: 9, oxygen_free_ofc: 10, flat_adhesive_wall: 4, banana_plug_terminated: 8,
  };
  return m[t];
}

export function flexibility(t: SpeakerWireType): number {
  const m: Record<SpeakerWireType, number> = {
    copper_16awg_basic: 8, copper_12awg_thick: 5, oxygen_free_ofc: 6, flat_adhesive_wall: 10, banana_plug_terminated: 6,
  };
  return m[t];
}

export function installEase(t: SpeakerWireType): number {
  const m: Record<SpeakerWireType, number> = {
    copper_16awg_basic: 7, copper_12awg_thick: 5, oxygen_free_ofc: 6, flat_adhesive_wall: 9, banana_plug_terminated: 10,
  };
  return m[t];
}

export function wireCost(t: SpeakerWireType): number {
  const m: Record<SpeakerWireType, number> = {
    copper_16awg_basic: 1, copper_12awg_thick: 3, oxygen_free_ofc: 6, flat_adhesive_wall: 4, banana_plug_terminated: 5,
  };
  return m[t];
}

export function preterminated(t: SpeakerWireType): boolean {
  const m: Record<SpeakerWireType, boolean> = {
    copper_16awg_basic: false, copper_12awg_thick: false, oxygen_free_ofc: false, flat_adhesive_wall: false, banana_plug_terminated: true,
  };
  return m[t];
}

export function hideable(t: SpeakerWireType): boolean {
  const m: Record<SpeakerWireType, boolean> = {
    copper_16awg_basic: false, copper_12awg_thick: false, oxygen_free_ofc: false, flat_adhesive_wall: true, banana_plug_terminated: false,
  };
  return m[t];
}

export function conductorType(t: SpeakerWireType): string {
  const m: Record<SpeakerWireType, string> = {
    copper_16awg_basic: "cca_stranded_16awg",
    copper_12awg_thick: "pure_copper_12awg",
    oxygen_free_ofc: "ofc_4n_purity_strand",
    flat_adhesive_wall: "flat_copper_ribbon",
    banana_plug_terminated: "ofc_gold_banana_tip",
  };
  return m[t];
}

export function bestSetup(t: SpeakerWireType): string {
  const m: Record<SpeakerWireType, string> = {
    copper_16awg_basic: "bookshelf_short_run",
    copper_12awg_thick: "floor_speaker_long_run",
    oxygen_free_ofc: "audiophile_reference",
    flat_adhesive_wall: "wall_ceiling_hidden",
    banana_plug_terminated: "quick_connect_swap",
  };
  return m[t];
}

export function speakerWires(): SpeakerWireType[] {
  return ["copper_16awg_basic", "copper_12awg_thick", "oxygen_free_ofc", "flat_adhesive_wall", "banana_plug_terminated"];
}

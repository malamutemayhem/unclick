export type MelodicaType = "soprano_short_range" | "alto_standard_32key" | "bass_low_register" | "piano_style_wooden" | "accordion_button_layout";

export function keyRange(t: MelodicaType): number {
  const m: Record<MelodicaType, number> = {
    soprano_short_range: 4, alto_standard_32key: 7, bass_low_register: 8, piano_style_wooden: 10, accordion_button_layout: 9,
  };
  return m[t];
}

export function toneWarmth(t: MelodicaType): number {
  const m: Record<MelodicaType, number> = {
    soprano_short_range: 5, alto_standard_32key: 7, bass_low_register: 9, piano_style_wooden: 10, accordion_button_layout: 8,
  };
  return m[t];
}

export function portability(t: MelodicaType): number {
  const m: Record<MelodicaType, number> = {
    soprano_short_range: 10, alto_standard_32key: 8, bass_low_register: 4, piano_style_wooden: 3, accordion_button_layout: 5,
  };
  return m[t];
}

export function expressiveness(t: MelodicaType): number {
  const m: Record<MelodicaType, number> = {
    soprano_short_range: 4, alto_standard_32key: 6, bass_low_register: 8, piano_style_wooden: 10, accordion_button_layout: 9,
  };
  return m[t];
}

export function melodicaCost(t: MelodicaType): number {
  const m: Record<MelodicaType, number> = {
    soprano_short_range: 1, alto_standard_32key: 2, bass_low_register: 5, piano_style_wooden: 8, accordion_button_layout: 6,
  };
  return m[t];
}

export function hasCarryCase(t: MelodicaType): boolean {
  const m: Record<MelodicaType, boolean> = {
    soprano_short_range: true, alto_standard_32key: true, bass_low_register: true, piano_style_wooden: false, accordion_button_layout: false,
  };
  return m[t];
}

export function usesFlexTube(t: MelodicaType): boolean {
  const m: Record<MelodicaType, boolean> = {
    soprano_short_range: false, alto_standard_32key: true, bass_low_register: true, piano_style_wooden: true, accordion_button_layout: false,
  };
  return m[t];
}

export function reedType(t: MelodicaType): string {
  const m: Record<MelodicaType, string> = {
    soprano_short_range: "steel_reed_plastic_body",
    alto_standard_32key: "steel_reed_abs_body",
    bass_low_register: "phosphor_bronze_reed",
    piano_style_wooden: "hand_tuned_brass_reed",
    accordion_button_layout: "accordion_style_reed_block",
  };
  return m[t];
}

export function bestGenre(t: MelodicaType): string {
  const m: Record<MelodicaType, string> = {
    soprano_short_range: "classroom_beginner_kids",
    alto_standard_32key: "reggae_ska_pop",
    bass_low_register: "dub_experimental_ambient",
    piano_style_wooden: "jazz_chamber_recording",
    accordion_button_layout: "folk_trad_european",
  };
  return m[t];
}

export function melodicas(): MelodicaType[] {
  return ["soprano_short_range", "alto_standard_32key", "bass_low_register", "piano_style_wooden", "accordion_button_layout"];
}

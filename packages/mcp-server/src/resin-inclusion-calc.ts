export type ResinInclusionType = "dried_flower_press" | "glitter_flake_mix" | "photo_print_seal" | "clock_part_gear" | "insect_specimen_embed";

export function visualImpact(t: ResinInclusionType): number {
  const m: Record<ResinInclusionType, number> = {
    dried_flower_press: 9, glitter_flake_mix: 7, photo_print_seal: 8, clock_part_gear: 10, insect_specimen_embed: 9,
  };
  return m[t];
}

export function prepDifficulty(t: ResinInclusionType): number {
  const m: Record<ResinInclusionType, number> = {
    dried_flower_press: 7, glitter_flake_mix: 2, photo_print_seal: 5, clock_part_gear: 3, insect_specimen_embed: 9,
  };
  return m[t];
}

export function bubbleRisk(t: ResinInclusionType): number {
  const m: Record<ResinInclusionType, number> = {
    dried_flower_press: 8, glitter_flake_mix: 3, photo_print_seal: 6, clock_part_gear: 4, insect_specimen_embed: 9,
  };
  return m[t];
}

export function colorStability(t: ResinInclusionType): number {
  const m: Record<ResinInclusionType, number> = {
    dried_flower_press: 5, glitter_flake_mix: 10, photo_print_seal: 6, clock_part_gear: 10, insect_specimen_embed: 7,
  };
  return m[t];
}

export function inclusionCost(t: ResinInclusionType): number {
  const m: Record<ResinInclusionType, number> = {
    dried_flower_press: 1, glitter_flake_mix: 1, photo_print_seal: 1, clock_part_gear: 2, insect_specimen_embed: 3,
  };
  return m[t];
}

export function needsSealing(t: ResinInclusionType): boolean {
  const m: Record<ResinInclusionType, boolean> = {
    dried_flower_press: true, glitter_flake_mix: false, photo_print_seal: true, clock_part_gear: false, insect_specimen_embed: true,
  };
  return m[t];
}

export function organic(t: ResinInclusionType): boolean {
  const m: Record<ResinInclusionType, boolean> = {
    dried_flower_press: true, glitter_flake_mix: false, photo_print_seal: false, clock_part_gear: false, insect_specimen_embed: true,
  };
  return m[t];
}

export function prepMethod(t: ResinInclusionType): string {
  const m: Record<ResinInclusionType, string> = {
    dried_flower_press: "press_dry_seal_coat",
    glitter_flake_mix: "stir_into_resin",
    photo_print_seal: "laser_print_seal_spray",
    clock_part_gear: "clean_degrease_place",
    insect_specimen_embed: "preserve_dehydrate_pin",
  };
  return m[t];
}

export function bestProject(t: ResinInclusionType): string {
  const m: Record<ResinInclusionType, string> = {
    dried_flower_press: "botanical_pendant_gift",
    glitter_flake_mix: "sparkle_tumbler_cup",
    photo_print_seal: "memorial_keepsake_cube",
    clock_part_gear: "steampunk_statement_ring",
    insect_specimen_embed: "entomology_display_block",
  };
  return m[t];
}

export function resinInclusions(): ResinInclusionType[] {
  return ["dried_flower_press", "glitter_flake_mix", "photo_print_seal", "clock_part_gear", "insect_specimen_embed"];
}

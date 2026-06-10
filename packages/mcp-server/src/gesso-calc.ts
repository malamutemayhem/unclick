export type GessoType = "white_acrylic_standard" | "clear_transparent_coat" | "black_opaque_primer" | "colored_tinted_base" | "absorbent_watercolor_ground";

export function coveragePower(t: GessoType): number {
  const m: Record<GessoType, number> = {
    white_acrylic_standard: 9, clear_transparent_coat: 3, black_opaque_primer: 10, colored_tinted_base: 8, absorbent_watercolor_ground: 7,
  };
  return m[t];
}

export function toothTexture(t: GessoType): number {
  const m: Record<GessoType, number> = {
    white_acrylic_standard: 7, clear_transparent_coat: 5, black_opaque_primer: 7, colored_tinted_base: 6, absorbent_watercolor_ground: 9,
  };
  return m[t];
}

export function dryTime(t: GessoType): number {
  const m: Record<GessoType, number> = {
    white_acrylic_standard: 7, clear_transparent_coat: 8, black_opaque_primer: 6, colored_tinted_base: 7, absorbent_watercolor_ground: 5,
  };
  return m[t];
}

export function surfaceRange(t: GessoType): number {
  const m: Record<GessoType, number> = {
    white_acrylic_standard: 9, clear_transparent_coat: 10, black_opaque_primer: 8, colored_tinted_base: 7, absorbent_watercolor_ground: 6,
  };
  return m[t];
}

export function gessoCost(t: GessoType): number {
  const m: Record<GessoType, number> = {
    white_acrylic_standard: 2, clear_transparent_coat: 3, black_opaque_primer: 3, colored_tinted_base: 3, absorbent_watercolor_ground: 4,
  };
  return m[t];
}

export function sandable(t: GessoType): boolean {
  const m: Record<GessoType, boolean> = {
    white_acrylic_standard: true, clear_transparent_coat: true, black_opaque_primer: true, colored_tinted_base: true, absorbent_watercolor_ground: false,
  };
  return m[t];
}

export function transparent(t: GessoType): boolean {
  const m: Record<GessoType, boolean> = {
    white_acrylic_standard: false, clear_transparent_coat: true, black_opaque_primer: false, colored_tinted_base: false, absorbent_watercolor_ground: false,
  };
  return m[t];
}

export function baseComposition(t: GessoType): string {
  const m: Record<GessoType, string> = {
    white_acrylic_standard: "calcium_carbonate_acrylic",
    clear_transparent_coat: "acrylic_polymer_clear",
    black_opaque_primer: "carbon_black_acrylic",
    colored_tinted_base: "pigmented_acrylic_tint",
    absorbent_watercolor_ground: "calcium_chalk_absorbent",
  };
  return m[t];
}

export function bestMedium(t: GessoType): string {
  const m: Record<GessoType, string> = {
    white_acrylic_standard: "acrylic_oil_general",
    clear_transparent_coat: "mixed_media_collage",
    black_opaque_primer: "dramatic_contrast_work",
    colored_tinted_base: "toned_ground_portrait",
    absorbent_watercolor_ground: "watercolor_on_canvas",
  };
  return m[t];
}

export function gessos(): GessoType[] {
  return ["white_acrylic_standard", "clear_transparent_coat", "black_opaque_primer", "colored_tinted_base", "absorbent_watercolor_ground"];
}

export type RulingPenType = "folded_nib_parallel" | "cola_pen_diy" | "ruling_pen_classic" | "automatic_lettering_wide" | "pilot_parallel_cartridge";

export function lineWidth(t: RulingPenType): number {
  const m: Record<RulingPenType, number> = {
    folded_nib_parallel: 8, cola_pen_diy: 10, ruling_pen_classic: 6, automatic_lettering_wide: 10, pilot_parallel_cartridge: 7,
  };
  return m[t];
}

export function lineConsistency(t: RulingPenType): number {
  const m: Record<RulingPenType, number> = {
    folded_nib_parallel: 7, cola_pen_diy: 4, ruling_pen_classic: 10, automatic_lettering_wide: 8, pilot_parallel_cartridge: 9,
  };
  return m[t];
}

export function expressiveness(t: RulingPenType): number {
  const m: Record<RulingPenType, number> = {
    folded_nib_parallel: 9, cola_pen_diy: 10, ruling_pen_classic: 6, automatic_lettering_wide: 8, pilot_parallel_cartridge: 7,
  };
  return m[t];
}

export function easeOfUse(t: RulingPenType): number {
  const m: Record<RulingPenType, number> = {
    folded_nib_parallel: 7, cola_pen_diy: 8, ruling_pen_classic: 5, automatic_lettering_wide: 7, pilot_parallel_cartridge: 10,
  };
  return m[t];
}

export function penCost(t: RulingPenType): number {
  const m: Record<RulingPenType, number> = {
    folded_nib_parallel: 2, cola_pen_diy: 0, ruling_pen_classic: 2, automatic_lettering_wide: 3, pilot_parallel_cartridge: 2,
  };
  return m[t];
}

export function diyMake(t: RulingPenType): boolean {
  const m: Record<RulingPenType, boolean> = {
    folded_nib_parallel: true, cola_pen_diy: true, ruling_pen_classic: false, automatic_lettering_wide: false, pilot_parallel_cartridge: false,
  };
  return m[t];
}

export function usesCartridge(t: RulingPenType): boolean {
  const m: Record<RulingPenType, boolean> = {
    folded_nib_parallel: false, cola_pen_diy: false, ruling_pen_classic: false, automatic_lettering_wide: false, pilot_parallel_cartridge: true,
  };
  return m[t];
}

export function feedSystem(t: RulingPenType): string {
  const m: Record<RulingPenType, string> = {
    folded_nib_parallel: "folded_metal_channel",
    cola_pen_diy: "bent_can_reservoir",
    ruling_pen_classic: "screw_adjust_blades",
    automatic_lettering_wide: "gravity_feed_channel",
    pilot_parallel_cartridge: "capillary_plate_feed",
  };
  return m[t];
}

export function bestLettering(t: RulingPenType): string {
  const m: Record<RulingPenType, string> = {
    folded_nib_parallel: "experimental_texture",
    cola_pen_diy: "gestural_large_scale",
    ruling_pen_classic: "technical_line_border",
    automatic_lettering_wide: "poster_headline_bold",
    pilot_parallel_cartridge: "gothic_blackletter",
  };
  return m[t];
}

export function rulingPens(): RulingPenType[] {
  return ["folded_nib_parallel", "cola_pen_diy", "ruling_pen_classic", "automatic_lettering_wide", "pilot_parallel_cartridge"];
}

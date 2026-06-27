export type AquatintType = "rosin_dust_box" | "spray_paint_quick" | "airbrush_fine_mist" | "sandpaper_texture_lift" | "sugar_lift_paint";

export function toneRange(t: AquatintType): number {
  const m: Record<AquatintType, number> = {
    rosin_dust_box: 10, spray_paint_quick: 6, airbrush_fine_mist: 9, sandpaper_texture_lift: 5, sugar_lift_paint: 8,
  };
  return m[t];
}

export function grainControl(t: AquatintType): number {
  const m: Record<AquatintType, number> = {
    rosin_dust_box: 9, spray_paint_quick: 4, airbrush_fine_mist: 10, sandpaper_texture_lift: 3, sugar_lift_paint: 7,
  };
  return m[t];
}

export function setupSpeed(t: AquatintType): number {
  const m: Record<AquatintType, number> = {
    rosin_dust_box: 4, spray_paint_quick: 10, airbrush_fine_mist: 5, sandpaper_texture_lift: 8, sugar_lift_paint: 3,
  };
  return m[t];
}

export function repeatability(t: AquatintType): number {
  const m: Record<AquatintType, number> = {
    rosin_dust_box: 7, spray_paint_quick: 8, airbrush_fine_mist: 9, sandpaper_texture_lift: 4, sugar_lift_paint: 5,
  };
  return m[t];
}

export function aquatintCost(t: AquatintType): number {
  const m: Record<AquatintType, number> = {
    rosin_dust_box: 2, spray_paint_quick: 1, airbrush_fine_mist: 3, sandpaper_texture_lift: 1, sugar_lift_paint: 1,
  };
  return m[t];
}

export function needsHeat(t: AquatintType): boolean {
  const m: Record<AquatintType, boolean> = {
    rosin_dust_box: true, spray_paint_quick: false, airbrush_fine_mist: false, sandpaper_texture_lift: false, sugar_lift_paint: true,
  };
  return m[t];
}

export function paintable(t: AquatintType): boolean {
  const m: Record<AquatintType, boolean> = {
    rosin_dust_box: false, spray_paint_quick: false, airbrush_fine_mist: false, sandpaper_texture_lift: false, sugar_lift_paint: true,
  };
  return m[t];
}

export function groundType(t: AquatintType): string {
  const m: Record<AquatintType, string> = {
    rosin_dust_box: "rosin_powder_fused",
    spray_paint_quick: "enamel_spray_resist",
    airbrush_fine_mist: "acrylic_fine_dot",
    sandpaper_texture_lift: "abrasive_texture_press",
    sugar_lift_paint: "sugar_syrup_brush",
  };
  return m[t];
}

export function bestUse(t: AquatintType): string {
  const m: Record<AquatintType, string> = {
    rosin_dust_box: "traditional_tone_etch",
    spray_paint_quick: "fast_even_ground",
    airbrush_fine_mist: "precise_gradient_tone",
    sandpaper_texture_lift: "rough_texture_effect",
    sugar_lift_paint: "painterly_mark_etch",
  };
  return m[t];
}

export function aquatints(): AquatintType[] {
  return ["rosin_dust_box", "spray_paint_quick", "airbrush_fine_mist", "sandpaper_texture_lift", "sugar_lift_paint"];
}

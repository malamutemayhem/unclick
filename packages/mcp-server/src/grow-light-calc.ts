export type GrowLight = "fluorescent_t5" | "hps" | "led_full_spectrum" | "cmh" | "plasma";

export function parOutput(g: GrowLight): number {
  const m: Record<GrowLight, number> = {
    fluorescent_t5: 4, hps: 8, led_full_spectrum: 10, cmh: 7, plasma: 6,
  };
  return m[g];
}

export function energyEfficiency(g: GrowLight): number {
  const m: Record<GrowLight, number> = {
    fluorescent_t5: 5, hps: 4, led_full_spectrum: 10, cmh: 7, plasma: 6,
  };
  return m[g];
}

export function heatGeneration(g: GrowLight): number {
  const m: Record<GrowLight, number> = {
    fluorescent_t5: 3, hps: 10, led_full_spectrum: 4, cmh: 7, plasma: 8,
  };
  return m[g];
}

export function lifespanHours(g: GrowLight): number {
  const m: Record<GrowLight, number> = {
    fluorescent_t5: 5, hps: 4, led_full_spectrum: 10, cmh: 6, plasma: 7,
  };
  return m[g];
}

export function purchasePrice(g: GrowLight): number {
  const m: Record<GrowLight, number> = {
    fluorescent_t5: 2, hps: 4, led_full_spectrum: 9, cmh: 6, plasma: 10,
  };
  return m[g];
}

export function spectrumTunable(g: GrowLight): boolean {
  const m: Record<GrowLight, boolean> = {
    fluorescent_t5: false, hps: false, led_full_spectrum: true, cmh: false, plasma: false,
  };
  return m[g];
}

export function requiresBallast(g: GrowLight): boolean {
  const m: Record<GrowLight, boolean> = {
    fluorescent_t5: true, hps: true, led_full_spectrum: false, cmh: true, plasma: true,
  };
  return m[g];
}

export function spectrumProfile(g: GrowLight): string {
  const m: Record<GrowLight, string> = {
    fluorescent_t5: "blue_heavy_6500k", hps: "red_orange_2100k",
    led_full_spectrum: "custom_red_blue_white", cmh: "broad_natural_4200k",
    plasma: "full_sun_like_5600k",
  };
  return m[g];
}

export function bestGrowPhase(g: GrowLight): string {
  const m: Record<GrowLight, string> = {
    fluorescent_t5: "seedling_clone_veg", hps: "flowering_fruiting",
    led_full_spectrum: "all_stages_commercial", cmh: "veg_flower_versatile",
    plasma: "supplemental_greenhouse",
  };
  return m[g];
}

export function growLights(): GrowLight[] {
  return ["fluorescent_t5", "hps", "led_full_spectrum", "cmh", "plasma"];
}

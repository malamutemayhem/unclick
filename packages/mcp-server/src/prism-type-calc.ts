export type PrismType = "dispersive" | "reflective" | "polarizing" | "beam_splitting" | "retroreflector";

export function dispersionPower(p: PrismType): number {
  const m: Record<PrismType, number> = {
    dispersive: 10, reflective: 2, polarizing: 3, beam_splitting: 4, retroreflector: 1,
  };
  return m[p];
}

export function reflectionEfficiency(p: PrismType): number {
  const m: Record<PrismType, number> = {
    dispersive: 3, reflective: 10, polarizing: 6, beam_splitting: 7, retroreflector: 10,
  };
  return m[p];
}

export function opticalPrecision(p: PrismType): number {
  const m: Record<PrismType, number> = {
    dispersive: 8, reflective: 7, polarizing: 9, beam_splitting: 8, retroreflector: 6,
  };
  return m[p];
}

export function costFactor(p: PrismType): number {
  const m: Record<PrismType, number> = {
    dispersive: 4, reflective: 5, polarizing: 8, beam_splitting: 7, retroreflector: 3,
  };
  return m[p];
}

export function wavelengthSensitivity(p: PrismType): number {
  const m: Record<PrismType, number> = {
    dispersive: 10, reflective: 3, polarizing: 7, beam_splitting: 6, retroreflector: 2,
  };
  return m[p];
}

export function coatingRequired(p: PrismType): boolean {
  const m: Record<PrismType, boolean> = {
    dispersive: false, reflective: true, polarizing: true, beam_splitting: true, retroreflector: false,
  };
  return m[p];
}

export function usedInSpectroscopy(p: PrismType): boolean {
  const m: Record<PrismType, boolean> = {
    dispersive: true, reflective: false, polarizing: false, beam_splitting: false, retroreflector: false,
  };
  return m[p];
}

export function commonApplication(p: PrismType): string {
  const m: Record<PrismType, string> = {
    dispersive: "spectrometers_rainbow_optics", reflective: "binoculars_periscopes",
    polarizing: "lcd_displays_microscopy", beam_splitting: "interferometers_cameras",
    retroreflector: "road_signs_surveying",
  };
  return m[p];
}

export function glassMaterial(p: PrismType): string {
  const m: Record<PrismType, string> = {
    dispersive: "flint_glass_bk7", reflective: "bak4_bk7",
    polarizing: "calcite_wollaston", beam_splitting: "coated_bk7",
    retroreflector: "corner_cube_glass",
  };
  return m[p];
}

export function prismTypes(): PrismType[] {
  return ["dispersive", "reflective", "polarizing", "beam_splitting", "retroreflector"];
}

export type SeismicWave = "p_wave" | "s_wave" | "love_wave" | "rayleigh_wave" | "stoneley_wave";

export function velocityKmPerS(wave: SeismicWave): number {
  const m: Record<SeismicWave, number> = {
    p_wave: 6, s_wave: 3.5, love_wave: 3, rayleigh_wave: 2.8, stoneley_wave: 2,
  };
  return m[wave];
}

export function damageCapacity(wave: SeismicWave): number {
  const m: Record<SeismicWave, number> = {
    p_wave: 3, s_wave: 6, love_wave: 9, rayleigh_wave: 10, stoneley_wave: 4,
  };
  return m[wave];
}

export function penetrationDepth(wave: SeismicWave): number {
  const m: Record<SeismicWave, number> = {
    p_wave: 10, s_wave: 8, love_wave: 3, rayleigh_wave: 4, stoneley_wave: 2,
  };
  return m[wave];
}

export function detectionRange(wave: SeismicWave): number {
  const m: Record<SeismicWave, number> = {
    p_wave: 10, s_wave: 7, love_wave: 5, rayleigh_wave: 6, stoneley_wave: 3,
  };
  return m[wave];
}

export function frequency(wave: SeismicWave): number {
  const m: Record<SeismicWave, number> = {
    p_wave: 8, s_wave: 6, love_wave: 3, rayleigh_wave: 2, stoneley_wave: 4,
  };
  return m[wave];
}

export function travelsFluid(wave: SeismicWave): boolean {
  const m: Record<SeismicWave, boolean> = {
    p_wave: true, s_wave: false, love_wave: false, rayleigh_wave: false, stoneley_wave: true,
  };
  return m[wave];
}

export function surfaceWave(wave: SeismicWave): boolean {
  const m: Record<SeismicWave, boolean> = {
    p_wave: false, s_wave: false, love_wave: true, rayleigh_wave: true, stoneley_wave: false,
  };
  return m[wave];
}

export function motionType(wave: SeismicWave): string {
  const m: Record<SeismicWave, string> = {
    p_wave: "compression", s_wave: "shear", love_wave: "horizontal_shear",
    rayleigh_wave: "elliptical", stoneley_wave: "interface",
  };
  return m[wave];
}

export function earlyWarningUse(wave: SeismicWave): number {
  const m: Record<SeismicWave, number> = {
    p_wave: 10, s_wave: 5, love_wave: 2, rayleigh_wave: 2, stoneley_wave: 3,
  };
  return m[wave];
}

export function seismicWaves(): SeismicWave[] {
  return ["p_wave", "s_wave", "love_wave", "rayleigh_wave", "stoneley_wave"];
}

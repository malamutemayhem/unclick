export type WaveType = "wind_wave" | "swell" | "tsunami" | "seiche" | "rogue";

export function heightMeters(wave: WaveType): number {
  const m: Record<WaveType, number> = {
    wind_wave: 3, swell: 5, tsunami: 30, seiche: 2, rogue: 25,
  };
  return m[wave];
}

export function wavelengthMeters(wave: WaveType): number {
  const m: Record<WaveType, number> = {
    wind_wave: 100, swell: 300, tsunami: 200000, seiche: 50000, rogue: 200,
  };
  return m[wave];
}

export function speedKmh(wave: WaveType): number {
  const m: Record<WaveType, number> = {
    wind_wave: 30, swell: 50, tsunami: 800, seiche: 100, rogue: 40,
  };
  return m[wave];
}

export function predictability(wave: WaveType): number {
  const m: Record<WaveType, number> = {
    wind_wave: 7, swell: 8, tsunami: 3, seiche: 5, rogue: 1,
  };
  return m[wave];
}

export function destructivePower(wave: WaveType): number {
  const m: Record<WaveType, number> = {
    wind_wave: 3, swell: 4, tsunami: 10, seiche: 2, rogue: 9,
  };
  return m[wave];
}

export function deepWater(wave: WaveType): boolean {
  const m: Record<WaveType, boolean> = {
    wind_wave: true, swell: true, tsunami: false, seiche: false, rogue: true,
  };
  return m[wave];
}

export function periodicOccurrence(wave: WaveType): boolean {
  const m: Record<WaveType, boolean> = {
    wind_wave: true, swell: true, tsunami: false, seiche: true, rogue: false,
  };
  return m[wave];
}

export function primaryCause(wave: WaveType): string {
  const m: Record<WaveType, string> = {
    wind_wave: "local_wind", swell: "distant_storm", tsunami: "earthquake",
    seiche: "atmospheric_pressure", rogue: "wave_interference",
  };
  return m[wave];
}

export function surfingQuality(wave: WaveType): number {
  const m: Record<WaveType, number> = {
    wind_wave: 5, swell: 10, tsunami: 0, seiche: 0, rogue: 0,
  };
  return m[wave];
}

export function waveTypes(): WaveType[] {
  return ["wind_wave", "swell", "tsunami", "seiche", "rogue"];
}

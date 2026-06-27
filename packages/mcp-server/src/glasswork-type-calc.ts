export type GlassworkType = "blown" | "stained" | "fused" | "lampwork" | "cast";

export function temperatureCelsius(glass: GlassworkType): number {
  const m: Record<GlassworkType, number> = {
    blown: 1100, stained: 700, fused: 800, lampwork: 1000, cast: 850,
  };
  return m[glass];
}

export function skillLevel(glass: GlassworkType): number {
  const m: Record<GlassworkType, number> = {
    blown: 9, stained: 7, fused: 5, lampwork: 8, cast: 6,
  };
  return m[glass];
}

export function colorControl(glass: GlassworkType): number {
  const m: Record<GlassworkType, number> = {
    blown: 7, stained: 10, fused: 8, lampwork: 9, cast: 5,
  };
  return m[glass];
}

export function shapeVersatility(glass: GlassworkType): number {
  const m: Record<GlassworkType, number> = {
    blown: 10, stained: 3, fused: 6, lampwork: 8, cast: 9,
  };
  return m[glass];
}

export function productionTime(glass: GlassworkType): number {
  const m: Record<GlassworkType, number> = {
    blown: 6, stained: 9, fused: 4, lampwork: 7, cast: 5,
  };
  return m[glass];
}

export function hollow(glass: GlassworkType): boolean {
  const m: Record<GlassworkType, boolean> = {
    blown: true, stained: false, fused: false, lampwork: true, cast: false,
  };
  return m[glass];
}

export function flatForm(glass: GlassworkType): boolean {
  const m: Record<GlassworkType, boolean> = {
    blown: false, stained: true, fused: true, lampwork: false, cast: false,
  };
  return m[glass];
}

export function bestApplication(glass: GlassworkType): string {
  const m: Record<GlassworkType, string> = {
    blown: "vessels", stained: "windows", fused: "jewelry",
    lampwork: "beads", cast: "sculpture",
  };
  return m[glass];
}

export function collectorsValue(glass: GlassworkType): number {
  const m: Record<GlassworkType, number> = {
    blown: 8, stained: 9, fused: 5, lampwork: 6, cast: 7,
  };
  return m[glass];
}

export function glassworkTypes(): GlassworkType[] {
  return ["blown", "stained", "fused", "lampwork", "cast"];
}

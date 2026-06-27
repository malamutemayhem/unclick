export type CameraSensor = "full_frame" | "aps_c" | "micro_four_thirds" | "medium_format" | "one_inch";

export function sensorAreaMm2(s: CameraSensor): number {
  const m: Record<CameraSensor, number> = {
    full_frame: 864, aps_c: 370, micro_four_thirds: 225, medium_format: 1452, one_inch: 116,
  };
  return m[s];
}

export function dynamicRangeStops(s: CameraSensor): number {
  const m: Record<CameraSensor, number> = {
    full_frame: 14, aps_c: 12, micro_four_thirds: 11, medium_format: 15, one_inch: 10,
  };
  return m[s];
}

export function lowLightScore(s: CameraSensor): number {
  const m: Record<CameraSensor, number> = {
    full_frame: 9, aps_c: 7, micro_four_thirds: 6, medium_format: 10, one_inch: 4,
  };
  return m[s];
}

export function depthOfFieldControl(s: CameraSensor): number {
  const m: Record<CameraSensor, number> = {
    full_frame: 9, aps_c: 7, micro_four_thirds: 5, medium_format: 10, one_inch: 3,
  };
  return m[s];
}

export function portability(s: CameraSensor): number {
  const m: Record<CameraSensor, number> = {
    full_frame: 5, aps_c: 7, micro_four_thirds: 8, medium_format: 2, one_inch: 10,
  };
  return m[s];
}

export function cropFactor(s: CameraSensor): number {
  const m: Record<CameraSensor, number> = {
    full_frame: 1.0, aps_c: 1.5, micro_four_thirds: 2.0, medium_format: 0.79, one_inch: 2.7,
  };
  return m[s];
}

export function mirrorless(s: CameraSensor): boolean {
  const m: Record<CameraSensor, boolean> = {
    full_frame: true, aps_c: true, micro_four_thirds: true, medium_format: true, one_inch: true,
  };
  return m[s];
}

export function bestGenre(s: CameraSensor): string {
  const m: Record<CameraSensor, string> = {
    full_frame: "portrait", aps_c: "wildlife", micro_four_thirds: "travel",
    medium_format: "landscape", one_inch: "vlogging",
  };
  return m[s];
}

export function priceRange(s: CameraSensor): string {
  const m: Record<CameraSensor, string> = {
    full_frame: "high", aps_c: "mid", micro_four_thirds: "mid",
    medium_format: "very_high", one_inch: "mid_low",
  };
  return m[s];
}

export function cameraSensors(): CameraSensor[] {
  return ["full_frame", "aps_c", "micro_four_thirds", "medium_format", "one_inch"];
}

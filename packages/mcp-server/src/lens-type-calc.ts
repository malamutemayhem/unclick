export type LensType = "wide_angle" | "standard" | "telephoto" | "macro" | "fisheye";

export function focalLengthMm(lens: LensType): number {
  const m: Record<LensType, number> = {
    wide_angle: 24, standard: 50, telephoto: 200, macro: 100, fisheye: 8,
  };
  return m[lens];
}

export function fieldOfViewDegrees(lens: LensType): number {
  const m: Record<LensType, number> = {
    wide_angle: 84, standard: 46, telephoto: 12, macro: 24, fisheye: 180,
  };
  return m[lens];
}

export function minFocusDistanceCm(lens: LensType): number {
  const m: Record<LensType, number> = {
    wide_angle: 25, standard: 45, telephoto: 150, macro: 10, fisheye: 15,
  };
  return m[lens];
}

export function distortionLevel(lens: LensType): number {
  const m: Record<LensType, number> = {
    wide_angle: 6, standard: 2, telephoto: 1, macro: 1, fisheye: 10,
  };
  return m[lens];
}

export function bokehQuality(lens: LensType): number {
  const m: Record<LensType, number> = {
    wide_angle: 4, standard: 8, telephoto: 10, macro: 9, fisheye: 2,
  };
  return m[lens];
}

export function zoomCapable(lens: LensType): boolean {
  const m: Record<LensType, boolean> = {
    wide_angle: true, standard: false, telephoto: true, macro: false, fisheye: false,
  };
  return m[lens];
}

export function weatherSealed(lens: LensType): boolean {
  const m: Record<LensType, boolean> = {
    wide_angle: true, standard: false, telephoto: true, macro: true, fisheye: false,
  };
  return m[lens];
}

export function bestSubject(lens: LensType): string {
  const m: Record<LensType, string> = {
    wide_angle: "landscape", standard: "portrait", telephoto: "wildlife",
    macro: "insects", fisheye: "architecture",
  };
  return m[lens];
}

export function averagePriceUsd(lens: LensType): number {
  const m: Record<LensType, number> = {
    wide_angle: 800, standard: 400, telephoto: 2000, macro: 900, fisheye: 600,
  };
  return m[lens];
}

export function lensTypes(): LensType[] {
  return ["wide_angle", "standard", "telephoto", "macro", "fisheye"];
}

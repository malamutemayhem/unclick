export type ExposureMode = "manual" | "aperture_priority" | "shutter_priority" | "program" | "bulb";

export function creativeControl(e: ExposureMode): number {
  const m: Record<ExposureMode, number> = {
    manual: 10, aperture_priority: 8, shutter_priority: 7, program: 3, bulb: 10,
  };
  return m[e];
}

export function shootingSpeed(e: ExposureMode): number {
  const m: Record<ExposureMode, number> = {
    manual: 3, aperture_priority: 8, shutter_priority: 8, program: 10, bulb: 1,
  };
  return m[e];
}

export function consistencyScore(e: ExposureMode): number {
  const m: Record<ExposureMode, number> = {
    manual: 10, aperture_priority: 7, shutter_priority: 7, program: 5, bulb: 10,
  };
  return m[e];
}

export function learningCurve(e: ExposureMode): number {
  const m: Record<ExposureMode, number> = {
    manual: 9, aperture_priority: 5, shutter_priority: 5, program: 1, bulb: 8,
  };
  return m[e];
}

export function exposureLatitude(e: ExposureMode): number {
  const m: Record<ExposureMode, number> = {
    manual: 10, aperture_priority: 7, shutter_priority: 7, program: 5, bulb: 10,
  };
  return m[e];
}

export function controlsAperture(e: ExposureMode): boolean {
  const m: Record<ExposureMode, boolean> = {
    manual: true, aperture_priority: true, shutter_priority: false, program: false, bulb: true,
  };
  return m[e];
}

export function controlsShutter(e: ExposureMode): boolean {
  const m: Record<ExposureMode, boolean> = {
    manual: true, aperture_priority: false, shutter_priority: true, program: false, bulb: true,
  };
  return m[e];
}

export function bestScenario(e: ExposureMode): string {
  const m: Record<ExposureMode, string> = {
    manual: "studio_lighting", aperture_priority: "portrait",
    shutter_priority: "sports", program: "snapshots", bulb: "astrophotography",
  };
  return m[e];
}

export function meterDependence(e: ExposureMode): number {
  const m: Record<ExposureMode, number> = {
    manual: 2, aperture_priority: 8, shutter_priority: 8, program: 10, bulb: 1,
  };
  return m[e];
}

export function exposureModes(): ExposureMode[] {
  return ["manual", "aperture_priority", "shutter_priority", "program", "bulb"];
}

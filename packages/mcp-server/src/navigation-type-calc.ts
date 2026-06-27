export type NavigationType = "celestial" | "dead_reckoning" | "gps" | "inertial" | "radio";

export function accuracyMeters(nav: NavigationType): number {
  const m: Record<NavigationType, number> = {
    celestial: 1000, dead_reckoning: 5000, gps: 3, inertial: 100, radio: 50,
  };
  return m[nav];
}

export function weatherDependence(nav: NavigationType): number {
  const m: Record<NavigationType, number> = {
    celestial: 10, dead_reckoning: 2, gps: 1, inertial: 0, radio: 3,
  };
  return m[nav];
}

export function powerRequired(nav: NavigationType): number {
  const m: Record<NavigationType, number> = {
    celestial: 0, dead_reckoning: 1, gps: 3, inertial: 5, radio: 4,
  };
  return m[nav];
}

export function skillRequired(nav: NavigationType): number {
  const m: Record<NavigationType, number> = {
    celestial: 10, dead_reckoning: 8, gps: 2, inertial: 3, radio: 4,
  };
  return m[nav];
}

export function updateRateHz(nav: NavigationType): number {
  const m: Record<NavigationType, number> = {
    celestial: 0, dead_reckoning: 1, gps: 10, inertial: 100, radio: 5,
  };
  return m[nav];
}

export function passive(nav: NavigationType): boolean {
  const m: Record<NavigationType, boolean> = {
    celestial: true, dead_reckoning: true, gps: true, inertial: true, radio: false,
  };
  return m[nav];
}

export function worksIndoors(nav: NavigationType): boolean {
  const m: Record<NavigationType, boolean> = {
    celestial: false, dead_reckoning: true, gps: false, inertial: true, radio: true,
  };
  return m[nav];
}

export function bestApplication(nav: NavigationType): string {
  const m: Record<NavigationType, string> = {
    celestial: "ocean_sailing", dead_reckoning: "submarine", gps: "car_navigation",
    inertial: "aircraft", radio: "aviation",
  };
  return m[nav];
}

export function historicalEra(nav: NavigationType): string {
  const m: Record<NavigationType, string> = {
    celestial: "ancient", dead_reckoning: "medieval", gps: "modern",
    inertial: "cold_war", radio: "ww2",
  };
  return m[nav];
}

export function navigationTypes(): NavigationType[] {
  return ["celestial", "dead_reckoning", "gps", "inertial", "radio"];
}

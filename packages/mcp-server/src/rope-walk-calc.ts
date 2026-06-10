export type RopeLayMethod = "hand_twist" | "rope_walk" | "wheel_driven" | "frame_twist" | "continuous_lay";

export function outputMetersPerHour(method: RopeLayMethod): number {
  const o: Record<RopeLayMethod, number> = {
    hand_twist: 5, rope_walk: 30, wheel_driven: 50, frame_twist: 15, continuous_lay: 100,
  };
  return o[method];
}

export function maxDiameterMm(method: RopeLayMethod): number {
  const d: Record<RopeLayMethod, number> = {
    hand_twist: 10, rope_walk: 50, wheel_driven: 30, frame_twist: 20, continuous_lay: 40,
  };
  return d[method];
}

export function twistConsistency(method: RopeLayMethod): number {
  const t: Record<RopeLayMethod, number> = {
    hand_twist: 4, rope_walk: 7, wheel_driven: 9, frame_twist: 6, continuous_lay: 10,
  };
  return t[method];
}

export function spaceLengthMeters(method: RopeLayMethod): number {
  const s: Record<RopeLayMethod, number> = {
    hand_twist: 3, rope_walk: 300, wheel_driven: 20, frame_twist: 5, continuous_lay: 10,
  };
  return s[method];
}

export function operatorsRequired(method: RopeLayMethod): number {
  const o: Record<RopeLayMethod, number> = {
    hand_twist: 1, rope_walk: 4, wheel_driven: 2, frame_twist: 1, continuous_lay: 1,
  };
  return o[method];
}

export function portableSetup(method: RopeLayMethod): boolean {
  return method === "hand_twist" || method === "frame_twist";
}

export function strengthRating(method: RopeLayMethod): number {
  const s: Record<RopeLayMethod, number> = {
    hand_twist: 5, rope_walk: 9, wheel_driven: 8, frame_twist: 6, continuous_lay: 7,
  };
  return s[method];
}

export function historicalPeriod(method: RopeLayMethod): string {
  const h: Record<RopeLayMethod, string> = {
    hand_twist: "prehistoric", rope_walk: "medieval", wheel_driven: "18th_century",
    frame_twist: "ancient", continuous_lay: "industrial",
  };
  return h[method];
}

export function costPerMeter(method: RopeLayMethod): number {
  const c: Record<RopeLayMethod, number> = {
    hand_twist: 5, rope_walk: 2, wheel_driven: 1.5, frame_twist: 3, continuous_lay: 0.5,
  };
  return c[method];
}

export function ropeLayMethods(): RopeLayMethod[] {
  return ["hand_twist", "rope_walk", "wheel_driven", "frame_twist", "continuous_lay"];
}

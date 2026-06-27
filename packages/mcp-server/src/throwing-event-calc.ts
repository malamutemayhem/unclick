export type ThrowingEvent = "shot_put" | "discus" | "javelin" | "hammer_throw" | "weight_throw";

export function implementWeightKg(t: ThrowingEvent): number {
  const m: Record<ThrowingEvent, number> = {
    shot_put: 7.26, discus: 2.0, javelin: 0.8, hammer_throw: 7.26, weight_throw: 15.88,
  };
  return m[t];
}

export function worldRecordMeters(t: ThrowingEvent): number {
  const m: Record<ThrowingEvent, number> = {
    shot_put: 23.37, discus: 74.08, javelin: 98.48, hammer_throw: 86.74, weight_throw: 25.86,
  };
  return m[t];
}

export function technicalComplexity(t: ThrowingEvent): number {
  const m: Record<ThrowingEvent, number> = {
    shot_put: 5, discus: 7, javelin: 8, hammer_throw: 9, weight_throw: 6,
  };
  return m[t];
}

export function strengthRequirement(t: ThrowingEvent): number {
  const m: Record<ThrowingEvent, number> = {
    shot_put: 9, discus: 7, javelin: 6, hammer_throw: 8, weight_throw: 10,
  };
  return m[t];
}

export function speedRequirement(t: ThrowingEvent): number {
  const m: Record<ThrowingEvent, number> = {
    shot_put: 5, discus: 7, javelin: 9, hammer_throw: 8, weight_throw: 4,
  };
  return m[t];
}

export function rotationalTechnique(t: ThrowingEvent): boolean {
  const m: Record<ThrowingEvent, boolean> = {
    shot_put: true, discus: true, javelin: false, hammer_throw: true, weight_throw: true,
  };
  return m[t];
}

export function olympicEvent(t: ThrowingEvent): boolean {
  const m: Record<ThrowingEvent, boolean> = {
    shot_put: true, discus: true, javelin: true, hammer_throw: true, weight_throw: false,
  };
  return m[t];
}

export function releaseAngleDeg(t: ThrowingEvent): string {
  const m: Record<ThrowingEvent, string> = {
    shot_put: "37_to_42", discus: "35_to_37", javelin: "30_to_36",
    hammer_throw: "42_to_44", weight_throw: "40_to_45",
  };
  return m[t];
}

export function ringDiameterM(t: ThrowingEvent): string {
  const m: Record<ThrowingEvent, string> = {
    shot_put: "2.135", discus: "2.5", javelin: "runway",
    hammer_throw: "2.135", weight_throw: "2.135",
  };
  return m[t];
}

export function throwingEvents(): ThrowingEvent[] {
  return ["shot_put", "discus", "javelin", "hammer_throw", "weight_throw"];
}

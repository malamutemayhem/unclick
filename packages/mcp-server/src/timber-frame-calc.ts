export type JointType = "mortise_tenon" | "lap" | "dovetail" | "scarf" | "birdsmouth";

export function postSizeCm(storeys: number): number {
  return Math.round(15 + storeys * 5);
}

export function beamSpanM(loadKnPerM: number): number {
  if (loadKnPerM <= 0) return 0;
  return parseFloat((12 / Math.sqrt(loadKnPerM)).toFixed(1));
}

export function braceAngleDeg(): number {
  return 45;
}

export function pegDiameterMm(timberSizeCm: number): number {
  return Math.round(timberSizeCm * 2.5);
}

export function raisingCrewSize(frameWeightKg: number): number {
  return Math.max(4, Math.ceil(frameWeightKg / 200));
}

export function jointCutTimeMinutes(type: JointType): number {
  const times: Record<JointType, number> = {
    mortise_tenon: 90, lap: 30, dovetail: 120, scarf: 60, birdsmouth: 20,
  };
  return times[type];
}

export function timberVolumeM3(lengthM: number, widthCm: number, depthCm: number): number {
  return parseFloat((lengthM * widthCm / 100 * depthCm / 100).toFixed(3));
}

export function shrinkagePercent(greenMoisturePercent: number): number {
  return parseFloat((greenMoisturePercent * 0.15).toFixed(1));
}

export function frameCostPerM2(quality: "standard" | "premium"): number {
  return quality === "premium" ? 450 : 280;
}

export function jointTypes(): JointType[] {
  return ["mortise_tenon", "lap", "dovetail", "scarf", "birdsmouth"];
}

export type CentrifugeType = "benchtop" | "floor_standing" | "ultracentrifuge" | "microcentrifuge" | "refrigerated";

export function maxRpm(c: CentrifugeType): number {
  const m: Record<CentrifugeType, number> = {
    benchtop: 5, floor_standing: 7, ultracentrifuge: 10, microcentrifuge: 6, refrigerated: 8,
  };
  return m[c];
}

export function sampleCapacity(c: CentrifugeType): number {
  const m: Record<CentrifugeType, number> = {
    benchtop: 5, floor_standing: 10, ultracentrifuge: 3, microcentrifuge: 2, refrigerated: 8,
  };
  return m[c];
}

export function temperatureControl(c: CentrifugeType): number {
  const m: Record<CentrifugeType, number> = {
    benchtop: 3, floor_standing: 6, ultracentrifuge: 9, microcentrifuge: 2, refrigerated: 10,
  };
  return m[c];
}

export function purchaseCost(c: CentrifugeType): number {
  const m: Record<CentrifugeType, number> = {
    benchtop: 4, floor_standing: 7, ultracentrifuge: 10, microcentrifuge: 2, refrigerated: 8,
  };
  return m[c];
}

export function footprint(c: CentrifugeType): number {
  const m: Record<CentrifugeType, number> = {
    benchtop: 4, floor_standing: 9, ultracentrifuge: 8, microcentrifuge: 1, refrigerated: 7,
  };
  return m[c];
}

export function vacuumSealed(c: CentrifugeType): boolean {
  const m: Record<CentrifugeType, boolean> = {
    benchtop: false, floor_standing: false, ultracentrifuge: true, microcentrifuge: false, refrigerated: false,
  };
  return m[c];
}

export function portableUnit(c: CentrifugeType): boolean {
  const m: Record<CentrifugeType, boolean> = {
    benchtop: true, floor_standing: false, ultracentrifuge: false, microcentrifuge: true, refrigerated: false,
  };
  return m[c];
}

export function rotorType(c: CentrifugeType): string {
  const m: Record<CentrifugeType, string> = {
    benchtop: "fixed_angle_swing_bucket", floor_standing: "continuous_flow",
    ultracentrifuge: "titanium_fixed_angle", microcentrifuge: "fixed_angle_mini",
    refrigerated: "swing_bucket_sealed",
  };
  return m[c];
}

export function bestApplication(c: CentrifugeType): string {
  const m: Record<CentrifugeType, string> = {
    benchtop: "routine_blood_separation", floor_standing: "large_volume_harvest",
    ultracentrifuge: "subcellular_fractionation", microcentrifuge: "pcr_tube_quick_spin",
    refrigerated: "protein_enzyme_isolation",
  };
  return m[c];
}

export function centrifugeTypes(): CentrifugeType[] {
  return ["benchtop", "floor_standing", "ultracentrifuge", "microcentrifuge", "refrigerated"];
}

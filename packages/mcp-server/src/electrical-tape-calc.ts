export type ElectricalTapeType = "vinyl_general_purpose" | "rubber_splicing_self" | "mastic_moisture_seal" | "kapton_high_temp" | "cloth_friction_harness";

export function insulationRating(t: ElectricalTapeType): number {
  const m: Record<ElectricalTapeType, number> = {
    vinyl_general_purpose: 7, rubber_splicing_self: 9, mastic_moisture_seal: 6, kapton_high_temp: 10, cloth_friction_harness: 5,
  };
  return m[t];
}

export function stretchAbility(t: ElectricalTapeType): number {
  const m: Record<ElectricalTapeType, number> = {
    vinyl_general_purpose: 7, rubber_splicing_self: 10, mastic_moisture_seal: 3, kapton_high_temp: 2, cloth_friction_harness: 5,
  };
  return m[t];
}

export function adhesionStrength(t: ElectricalTapeType): number {
  const m: Record<ElectricalTapeType, number> = {
    vinyl_general_purpose: 7, rubber_splicing_self: 9, mastic_moisture_seal: 10, kapton_high_temp: 6, cloth_friction_harness: 8,
  };
  return m[t];
}

export function temperatureRange(t: ElectricalTapeType): number {
  const m: Record<ElectricalTapeType, number> = {
    vinyl_general_purpose: 5, rubber_splicing_self: 7, mastic_moisture_seal: 4, kapton_high_temp: 10, cloth_friction_harness: 6,
  };
  return m[t];
}

export function tapeCost(t: ElectricalTapeType): number {
  const m: Record<ElectricalTapeType, number> = {
    vinyl_general_purpose: 2, rubber_splicing_self: 6, mastic_moisture_seal: 5, kapton_high_temp: 9, cloth_friction_harness: 4,
  };
  return m[t];
}

export function selfFusing(t: ElectricalTapeType): boolean {
  const m: Record<ElectricalTapeType, boolean> = {
    vinyl_general_purpose: false, rubber_splicing_self: true, mastic_moisture_seal: false, kapton_high_temp: false, cloth_friction_harness: false,
  };
  return m[t];
}

export function moistureBarrier(t: ElectricalTapeType): boolean {
  const m: Record<ElectricalTapeType, boolean> = {
    vinyl_general_purpose: false, rubber_splicing_self: true, mastic_moisture_seal: true, kapton_high_temp: false, cloth_friction_harness: false,
  };
  return m[t];
}

export function backingMaterial(t: ElectricalTapeType): string {
  const m: Record<ElectricalTapeType, string> = {
    vinyl_general_purpose: "pvc_vinyl_flexible",
    rubber_splicing_self: "epr_rubber_self_fuse",
    mastic_moisture_seal: "butyl_rubber_mastic",
    kapton_high_temp: "polyimide_film_amber",
    cloth_friction_harness: "cotton_poly_cloth",
  };
  return m[t];
}

export function bestApplication(t: ElectricalTapeType): string {
  const m: Record<ElectricalTapeType, string> = {
    vinyl_general_purpose: "wire_marking_insulate",
    rubber_splicing_self: "cable_splice_repair",
    mastic_moisture_seal: "underground_conduit_seal",
    kapton_high_temp: "solder_mask_circuit_board",
    cloth_friction_harness: "wire_harness_loom_wrap",
  };
  return m[t];
}

export function electricalTapes(): ElectricalTapeType[] {
  return ["vinyl_general_purpose", "rubber_splicing_self", "mastic_moisture_seal", "kapton_high_temp", "cloth_friction_harness"];
}

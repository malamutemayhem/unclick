export type MeasuringTapeType = "retractable_steel_blade" | "fabric_fiberglass_sewing" | "laser_digital_measure" | "long_reel_surveyor" | "tailor_vinyl_flexible";

export function accuracy(t: MeasuringTapeType): number {
  const m: Record<MeasuringTapeType, number> = {
    retractable_steel_blade: 8, fabric_fiberglass_sewing: 7, laser_digital_measure: 10, long_reel_surveyor: 8, tailor_vinyl_flexible: 6,
  };
  return m[t];
}

export function maxLength(t: MeasuringTapeType): number {
  const m: Record<MeasuringTapeType, number> = {
    retractable_steel_blade: 6, fabric_fiberglass_sewing: 4, laser_digital_measure: 10, long_reel_surveyor: 10, tailor_vinyl_flexible: 3,
  };
  return m[t];
}

export function portability(t: MeasuringTapeType): number {
  const m: Record<MeasuringTapeType, number> = {
    retractable_steel_blade: 8, fabric_fiberglass_sewing: 9, laser_digital_measure: 7, long_reel_surveyor: 3, tailor_vinyl_flexible: 10,
  };
  return m[t];
}

export function durability(t: MeasuringTapeType): number {
  const m: Record<MeasuringTapeType, number> = {
    retractable_steel_blade: 7, fabric_fiberglass_sewing: 8, laser_digital_measure: 6, long_reel_surveyor: 9, tailor_vinyl_flexible: 5,
  };
  return m[t];
}

export function tapeCost(t: MeasuringTapeType): number {
  const m: Record<MeasuringTapeType, number> = {
    retractable_steel_blade: 4, fabric_fiberglass_sewing: 3, laser_digital_measure: 9, long_reel_surveyor: 7, tailor_vinyl_flexible: 2,
  };
  return m[t];
}

export function needsBattery(t: MeasuringTapeType): boolean {
  const m: Record<MeasuringTapeType, boolean> = {
    retractable_steel_blade: false, fabric_fiberglass_sewing: false, laser_digital_measure: true, long_reel_surveyor: false, tailor_vinyl_flexible: false,
  };
  return m[t];
}

export function selfRetract(t: MeasuringTapeType): boolean {
  const m: Record<MeasuringTapeType, boolean> = {
    retractable_steel_blade: true, fabric_fiberglass_sewing: false, laser_digital_measure: false, long_reel_surveyor: false, tailor_vinyl_flexible: false,
  };
  return m[t];
}

export function bladeMaterial(t: MeasuringTapeType): string {
  const m: Record<MeasuringTapeType, string> = {
    retractable_steel_blade: "carbon_steel_coated",
    fabric_fiberglass_sewing: "fiberglass_reinforced_cloth",
    laser_digital_measure: "infrared_laser_diode",
    long_reel_surveyor: "fiberglass_open_reel",
    tailor_vinyl_flexible: "pvc_vinyl_printed",
  };
  return m[t];
}

export function bestUse(t: MeasuringTapeType): string {
  const m: Record<MeasuringTapeType, string> = {
    retractable_steel_blade: "construction_carpentry_diy",
    fabric_fiberglass_sewing: "sewing_quilting_craft",
    laser_digital_measure: "real_estate_interior_design",
    long_reel_surveyor: "surveying_landscaping_outdoor",
    tailor_vinyl_flexible: "body_measurement_tailoring",
  };
  return m[t];
}

export function measuringTapes(): MeasuringTapeType[] {
  return ["retractable_steel_blade", "fabric_fiberglass_sewing", "laser_digital_measure", "long_reel_surveyor", "tailor_vinyl_flexible"];
}

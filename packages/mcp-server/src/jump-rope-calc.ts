export type JumpRopeType = "speed_wire" | "weighted_heavy" | "beaded_segment" | "leather_classic" | "smart_digital";

export function rotationSpeed(t: JumpRopeType): number {
  const m: Record<JumpRopeType, number> = {
    speed_wire: 10, weighted_heavy: 4, beaded_segment: 6, leather_classic: 7, smart_digital: 8,
  };
  return m[t];
}

export function calorieBurn(t: JumpRopeType): number {
  const m: Record<JumpRopeType, number> = {
    speed_wire: 8, weighted_heavy: 10, beaded_segment: 6, leather_classic: 7, smart_digital: 8,
  };
  return m[t];
}

export function feedbackArc(t: JumpRopeType): number {
  const m: Record<JumpRopeType, number> = {
    speed_wire: 3, weighted_heavy: 7, beaded_segment: 10, leather_classic: 8, smart_digital: 5,
  };
  return m[t];
}

export function durability(t: JumpRopeType): number {
  const m: Record<JumpRopeType, number> = {
    speed_wire: 6, weighted_heavy: 8, beaded_segment: 9, leather_classic: 7, smart_digital: 5,
  };
  return m[t];
}

export function ropeCost(t: JumpRopeType): number {
  const m: Record<JumpRopeType, number> = {
    speed_wire: 4, weighted_heavy: 5, beaded_segment: 2, leather_classic: 6, smart_digital: 9,
  };
  return m[t];
}

export function adjustableLength(t: JumpRopeType): boolean {
  const m: Record<JumpRopeType, boolean> = {
    speed_wire: true, weighted_heavy: true, beaded_segment: true, leather_classic: false, smart_digital: true,
  };
  return m[t];
}

export function tracksReps(t: JumpRopeType): boolean {
  const m: Record<JumpRopeType, boolean> = {
    speed_wire: false, weighted_heavy: false, beaded_segment: false, leather_classic: false, smart_digital: true,
  };
  return m[t];
}

export function cordMaterial(t: JumpRopeType): string {
  const m: Record<JumpRopeType, string> = {
    speed_wire: "pvc_coated_steel_cable",
    weighted_heavy: "thick_pvc_weighted_rope",
    beaded_segment: "nylon_bead_segment_link",
    leather_classic: "genuine_leather_cord",
    smart_digital: "pvc_sensor_embedded",
  };
  return m[t];
}

export function bestWorkout(t: JumpRopeType): string {
  const m: Record<JumpRopeType, string> = {
    speed_wire: "double_under_crossfit",
    weighted_heavy: "arm_shoulder_strength",
    beaded_segment: "outdoor_concrete_learn",
    leather_classic: "boxing_mma_training",
    smart_digital: "app_tracked_hiit",
  };
  return m[t];
}

export function jumpRopes(): JumpRopeType[] {
  return ["speed_wire", "weighted_heavy", "beaded_segment", "leather_classic", "smart_digital"];
}

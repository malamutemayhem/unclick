export type RobotType = "articulated" | "scara" | "delta" | "cartesian" | "collaborative";

export function degreesOfFreedom(r: RobotType): number {
  const m: Record<RobotType, number> = {
    articulated: 6, scara: 4, delta: 3, cartesian: 3, collaborative: 7,
  };
  return m[r];
}

export function payloadKg(r: RobotType): number {
  const m: Record<RobotType, number> = {
    articulated: 500, scara: 20, delta: 5, cartesian: 100, collaborative: 15,
  };
  return m[r];
}

export function speedScore(r: RobotType): number {
  const m: Record<RobotType, number> = {
    articulated: 7, scara: 8, delta: 10, cartesian: 4, collaborative: 3,
  };
  return m[r];
}

export function precisionMm(r: RobotType): number {
  const m: Record<RobotType, number> = {
    articulated: 5, scara: 8, delta: 9, cartesian: 7, collaborative: 6,
  };
  return m[r];
}

export function costScore(r: RobotType): number {
  const m: Record<RobotType, number> = {
    articulated: 8, scara: 5, delta: 6, cartesian: 3, collaborative: 7,
  };
  return m[r];
}

export function requiresSafetyCage(r: RobotType): boolean {
  const m: Record<RobotType, boolean> = {
    articulated: true, scara: true, delta: true, cartesian: true, collaborative: false,
  };
  return m[r];
}

export function fixedBase(r: RobotType): boolean {
  const m: Record<RobotType, boolean> = {
    articulated: true, scara: true, delta: true, cartesian: true, collaborative: false,
  };
  return m[r];
}

export function primaryApplication(r: RobotType): string {
  const m: Record<RobotType, string> = {
    articulated: "welding_painting", scara: "assembly", delta: "pick_and_place",
    cartesian: "cnc_3d_printing", collaborative: "human_assistance",
  };
  return m[r];
}

export function kinematics(r: RobotType): string {
  const m: Record<RobotType, string> = {
    articulated: "revolute_joints", scara: "selective_compliance",
    delta: "parallel_linkage", cartesian: "linear_axes",
    collaborative: "force_limited",
  };
  return m[r];
}

export function robotTypes(): RobotType[] {
  return ["articulated", "scara", "delta", "cartesian", "collaborative"];
}

export type JointType = "ball_socket" | "hinge" | "pivot" | "saddle" | "gliding";

export function rangeOfMotion(j: JointType): number {
  const m: Record<JointType, number> = {
    ball_socket: 10, hinge: 5, pivot: 4, saddle: 7, gliding: 3,
  };
  return m[j];
}

export function stabilityScore(j: JointType): number {
  const m: Record<JointType, number> = {
    ball_socket: 4, hinge: 8, pivot: 7, saddle: 6, gliding: 9,
  };
  return m[j];
}

export function injuryRisk(j: JointType): number {
  const m: Record<JointType, number> = {
    ball_socket: 8, hinge: 6, pivot: 4, saddle: 5, gliding: 3,
  };
  return m[j];
}

export function axesOfMovement(j: JointType): number {
  const m: Record<JointType, number> = {
    ball_socket: 3, hinge: 1, pivot: 1, saddle: 2, gliding: 2,
  };
  return m[j];
}

export function loadCapacity(j: JointType): number {
  const m: Record<JointType, number> = {
    ball_socket: 9, hinge: 8, pivot: 5, saddle: 6, gliding: 4,
  };
  return m[j];
}

export function allowsRotation(j: JointType): boolean {
  const m: Record<JointType, boolean> = {
    ball_socket: true, hinge: false, pivot: true, saddle: false, gliding: false,
  };
  return m[j];
}

export function synovial(j: JointType): boolean {
  const m: Record<JointType, boolean> = {
    ball_socket: true, hinge: true, pivot: true, saddle: true, gliding: true,
  };
  return m[j];
}

export function exampleJoint(j: JointType): string {
  const m: Record<JointType, string> = {
    ball_socket: "hip", hinge: "elbow", pivot: "atlas_axis",
    saddle: "thumb", gliding: "wrist",
  };
  return m[j];
}

export function replacementFrequency(j: JointType): number {
  const m: Record<JointType, number> = {
    ball_socket: 10, hinge: 8, pivot: 2, saddle: 3, gliding: 1,
  };
  return m[j];
}

export function jointTypes(): JointType[] {
  return ["ball_socket", "hinge", "pivot", "saddle", "gliding"];
}

export type WoodJoint = "dovetail" | "mortise_tenon" | "box_joint" | "biscuit" | "pocket_screw";

export function strengthRating(joint: WoodJoint): number {
  const s: Record<WoodJoint, number> = {
    dovetail: 9, mortise_tenon: 10, box_joint: 7, biscuit: 5, pocket_screw: 6,
  };
  return s[joint];
}

export function difficultyLevel(joint: WoodJoint): number {
  const d: Record<WoodJoint, number> = {
    dovetail: 9, mortise_tenon: 8, box_joint: 6, biscuit: 3, pocket_screw: 2,
  };
  return d[joint];
}

export function toolsRequired(joint: WoodJoint): number {
  const t: Record<WoodJoint, number> = {
    dovetail: 4, mortise_tenon: 5, box_joint: 3, biscuit: 2, pocket_screw: 2,
  };
  return t[joint];
}

export function assemblyTimeMinutes(joint: WoodJoint): number {
  const a: Record<WoodJoint, number> = {
    dovetail: 45, mortise_tenon: 60, box_joint: 30, biscuit: 10, pocket_screw: 5,
  };
  return a[joint];
}

export function glueRequired(joint: WoodJoint): boolean {
  const g: Record<WoodJoint, boolean> = {
    dovetail: true, mortise_tenon: true, box_joint: true, biscuit: true, pocket_screw: false,
  };
  return g[joint];
}

export function visibleFromOutside(joint: WoodJoint): boolean {
  const v: Record<WoodJoint, boolean> = {
    dovetail: true, mortise_tenon: false, box_joint: true, biscuit: false, pocket_screw: false,
  };
  return v[joint];
}

export function bestApplication(joint: WoodJoint): string {
  const b: Record<WoodJoint, string> = {
    dovetail: "drawers", mortise_tenon: "frames", box_joint: "boxes",
    biscuit: "panels", pocket_screw: "face_frames",
  };
  return b[joint];
}

export function disassemblyPossible(joint: WoodJoint): boolean {
  const d: Record<WoodJoint, boolean> = {
    dovetail: false, mortise_tenon: true, box_joint: false, biscuit: false, pocket_screw: true,
  };
  return d[joint];
}

export function costRating(joint: WoodJoint): number {
  const c: Record<WoodJoint, number> = {
    dovetail: 2, mortise_tenon: 3, box_joint: 4, biscuit: 5, pocket_screw: 6,
  };
  return c[joint];
}

export function woodJoints(): WoodJoint[] {
  return ["dovetail", "mortise_tenon", "box_joint", "biscuit", "pocket_screw"];
}

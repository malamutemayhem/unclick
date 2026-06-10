export type MedicineBallType = "rubber_bounce" | "leather_no_bounce" | "slam_ball_dead" | "wall_ball_soft" | "tornado_rope_handle";

export function versatility(t: MedicineBallType): number {
  const m: Record<MedicineBallType, number> = {
    rubber_bounce: 9, leather_no_bounce: 7, slam_ball_dead: 5, wall_ball_soft: 6, tornado_rope_handle: 8,
  };
  return m[t];
}

export function impactAbsorb(t: MedicineBallType): number {
  const m: Record<MedicineBallType, number> = {
    rubber_bounce: 4, leather_no_bounce: 7, slam_ball_dead: 10, wall_ball_soft: 8, tornado_rope_handle: 5,
  };
  return m[t];
}

export function gripQuality(t: MedicineBallType): number {
  const m: Record<MedicineBallType, number> = {
    rubber_bounce: 7, leather_no_bounce: 9, slam_ball_dead: 6, wall_ball_soft: 5, tornado_rope_handle: 10,
  };
  return m[t];
}

export function durability(t: MedicineBallType): number {
  const m: Record<MedicineBallType, number> = {
    rubber_bounce: 8, leather_no_bounce: 6, slam_ball_dead: 10, wall_ball_soft: 7, tornado_rope_handle: 7,
  };
  return m[t];
}

export function ballCost(t: MedicineBallType): number {
  const m: Record<MedicineBallType, number> = {
    rubber_bounce: 3, leather_no_bounce: 6, slam_ball_dead: 4, wall_ball_soft: 5, tornado_rope_handle: 7,
  };
  return m[t];
}

export function bounces(t: MedicineBallType): boolean {
  const m: Record<MedicineBallType, boolean> = {
    rubber_bounce: true, leather_no_bounce: false, slam_ball_dead: false, wall_ball_soft: false, tornado_rope_handle: false,
  };
  return m[t];
}

export function hasHandle(t: MedicineBallType): boolean {
  const m: Record<MedicineBallType, boolean> = {
    rubber_bounce: false, leather_no_bounce: false, slam_ball_dead: false, wall_ball_soft: false, tornado_rope_handle: true,
  };
  return m[t];
}

export function shellMaterial(t: MedicineBallType): string {
  const m: Record<MedicineBallType, string> = {
    rubber_bounce: "textured_rubber_air_fill",
    leather_no_bounce: "stitched_leather_sand_fill",
    slam_ball_dead: "thick_rubber_gel_core",
    wall_ball_soft: "vinyl_padded_fiber_fill",
    tornado_rope_handle: "rubber_shell_rope_loop",
  };
  return m[t];
}

export function bestExercise(t: MedicineBallType): string {
  const m: Record<MedicineBallType, string> = {
    rubber_bounce: "partner_toss_plyometric",
    leather_no_bounce: "russian_twist_core",
    slam_ball_dead: "overhead_slam_power",
    wall_ball_soft: "crossfit_wall_ball_shot",
    tornado_rope_handle: "rotational_throw_torso",
  };
  return m[t];
}

export function medicineBalls(): MedicineBallType[] {
  return ["rubber_bounce", "leather_no_bounce", "slam_ball_dead", "wall_ball_soft", "tornado_rope_handle"];
}

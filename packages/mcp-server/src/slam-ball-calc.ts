export type SlamBallType = "dead_bounce_sand_fill" | "air_filled_rubber_bounce" | "gel_core_soft_shell" | "tire_tread_textured" | "d_ball_oversized_atlas";

export function impactAbsorb(t: SlamBallType): number {
  const m: Record<SlamBallType, number> = {
    dead_bounce_sand_fill: 10, air_filled_rubber_bounce: 4, gel_core_soft_shell: 8, tire_tread_textured: 9, d_ball_oversized_atlas: 10,
  };
  return m[t];
}

export function gripSurface(t: SlamBallType): number {
  const m: Record<SlamBallType, number> = {
    dead_bounce_sand_fill: 7, air_filled_rubber_bounce: 6, gel_core_soft_shell: 8, tire_tread_textured: 10, d_ball_oversized_atlas: 6,
  };
  return m[t];
}

export function durability(t: SlamBallType): number {
  const m: Record<SlamBallType, number> = {
    dead_bounce_sand_fill: 9, air_filled_rubber_bounce: 6, gel_core_soft_shell: 7, tire_tread_textured: 10, d_ball_oversized_atlas: 8,
  };
  return m[t];
}

export function versatility(t: SlamBallType): number {
  const m: Record<SlamBallType, number> = {
    dead_bounce_sand_fill: 7, air_filled_rubber_bounce: 8, gel_core_soft_shell: 7, tire_tread_textured: 7, d_ball_oversized_atlas: 6,
  };
  return m[t];
}

export function slamCost(t: SlamBallType): number {
  const m: Record<SlamBallType, number> = {
    dead_bounce_sand_fill: 2, air_filled_rubber_bounce: 1, gel_core_soft_shell: 2, tire_tread_textured: 2, d_ball_oversized_atlas: 3,
  };
  return m[t];
}

export function bounces(t: SlamBallType): boolean {
  const m: Record<SlamBallType, boolean> = {
    dead_bounce_sand_fill: false, air_filled_rubber_bounce: true, gel_core_soft_shell: false, tire_tread_textured: false, d_ball_oversized_atlas: false,
  };
  return m[t];
}

export function floorSafe(t: SlamBallType): boolean {
  const m: Record<SlamBallType, boolean> = {
    dead_bounce_sand_fill: true, air_filled_rubber_bounce: false, gel_core_soft_shell: true, tire_tread_textured: true, d_ball_oversized_atlas: true,
  };
  return m[t];
}

export function shellMaterial(t: SlamBallType): string {
  const m: Record<SlamBallType, string> = {
    dead_bounce_sand_fill: "thick_rubber_smooth",
    air_filled_rubber_bounce: "vulcanized_rubber_skin",
    gel_core_soft_shell: "pvc_gel_compound",
    tire_tread_textured: "recycled_tire_rubber",
    d_ball_oversized_atlas: "cordura_nylon_shell",
  };
  return m[t];
}

export function bestExercise(t: SlamBallType): string {
  const m: Record<SlamBallType, string> = {
    dead_bounce_sand_fill: "overhead_slam_power",
    air_filled_rubber_bounce: "wall_ball_shot_throw",
    gel_core_soft_shell: "rotational_slam_twist",
    tire_tread_textured: "ground_slam_outdoor",
    d_ball_oversized_atlas: "atlas_stone_strongman",
  };
  return m[t];
}

export function slamBalls(): SlamBallType[] {
  return ["dead_bounce_sand_fill", "air_filled_rubber_bounce", "gel_core_soft_shell", "tire_tread_textured", "d_ball_oversized_atlas"];
}

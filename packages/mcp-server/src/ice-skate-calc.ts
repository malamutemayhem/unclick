export type IceSkateType = "figure_classic" | "hockey_aggressive" | "speed_long_blade" | "recreational_comfort" | "goalie_wide_blade";

export function bladeSharpness(t: IceSkateType): number {
  const m: Record<IceSkateType, number> = {
    figure_classic: 9, hockey_aggressive: 8, speed_long_blade: 10, recreational_comfort: 5, goalie_wide_blade: 6,
  };
  return m[t];
}

export function ankleSupport(t: IceSkateType): number {
  const m: Record<IceSkateType, number> = {
    figure_classic: 9, hockey_aggressive: 8, speed_long_blade: 4, recreational_comfort: 7, goalie_wide_blade: 10,
  };
  return m[t];
}

export function speedPotential(t: IceSkateType): number {
  const m: Record<IceSkateType, number> = {
    figure_classic: 6, hockey_aggressive: 8, speed_long_blade: 10, recreational_comfort: 4, goalie_wide_blade: 5,
  };
  return m[t];
}

export function maneuverability(t: IceSkateType): number {
  const m: Record<IceSkateType, number> = {
    figure_classic: 8, hockey_aggressive: 10, speed_long_blade: 4, recreational_comfort: 6, goalie_wide_blade: 9,
  };
  return m[t];
}

export function skateCost(t: IceSkateType): number {
  const m: Record<IceSkateType, number> = {
    figure_classic: 7, hockey_aggressive: 8, speed_long_blade: 10, recreational_comfort: 3, goalie_wide_blade: 9,
  };
  return m[t];
}

export function toePick(t: IceSkateType): boolean {
  const m: Record<IceSkateType, boolean> = {
    figure_classic: true, hockey_aggressive: false, speed_long_blade: false, recreational_comfort: true, goalie_wide_blade: false,
  };
  return m[t];
}

export function replaceBlade(t: IceSkateType): boolean {
  const m: Record<IceSkateType, boolean> = {
    figure_classic: true, hockey_aggressive: true, speed_long_blade: true, recreational_comfort: false, goalie_wide_blade: true,
  };
  return m[t];
}

export function bladeProfile(t: IceSkateType): string {
  const m: Record<IceSkateType, string> = {
    figure_classic: "curved_toe_pick_rocker",
    hockey_aggressive: "flat_rockered_hollow",
    speed_long_blade: "long_flat_minimal_curve",
    recreational_comfort: "gentle_radius_stable",
    goalie_wide_blade: "flat_wide_cowling",
  };
  return m[t];
}

export function bestSkater(t: IceSkateType): string {
  const m: Record<IceSkateType, string> = {
    figure_classic: "jump_spin_artistic",
    hockey_aggressive: "game_contact_sprint",
    speed_long_blade: "race_track_endurance",
    recreational_comfort: "casual_rink_beginner",
    goalie_wide_blade: "crease_lateral_butterfly",
  };
  return m[t];
}

export function iceSkates(): IceSkateType[] {
  return ["figure_classic", "hockey_aggressive", "speed_long_blade", "recreational_comfort", "goalie_wide_blade"];
}

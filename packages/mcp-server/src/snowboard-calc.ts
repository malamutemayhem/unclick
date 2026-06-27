export type SnowboardType = "all_mountain_directional" | "freestyle_twin" | "freeride_powder" | "splitboard_touring" | "carving_alpine";

export function versatility(t: SnowboardType): number {
  const m: Record<SnowboardType, number> = {
    all_mountain_directional: 10, freestyle_twin: 6, freeride_powder: 5, splitboard_touring: 4, carving_alpine: 3,
  };
  return m[t];
}

export function parkPerformance(t: SnowboardType): number {
  const m: Record<SnowboardType, number> = {
    all_mountain_directional: 5, freestyle_twin: 10, freeride_powder: 2, splitboard_touring: 1, carving_alpine: 2,
  };
  return m[t];
}

export function powderFloat(t: SnowboardType): number {
  const m: Record<SnowboardType, number> = {
    all_mountain_directional: 6, freestyle_twin: 3, freeride_powder: 10, splitboard_touring: 8, carving_alpine: 2,
  };
  return m[t];
}

export function edgeHold(t: SnowboardType): number {
  const m: Record<SnowboardType, number> = {
    all_mountain_directional: 7, freestyle_twin: 4, freeride_powder: 6, splitboard_touring: 7, carving_alpine: 10,
  };
  return m[t];
}

export function boardCost(t: SnowboardType): number {
  const m: Record<SnowboardType, number> = {
    all_mountain_directional: 5, freestyle_twin: 4, freeride_powder: 7, splitboard_touring: 10, carving_alpine: 8,
  };
  return m[t];
}

export function twinTip(t: SnowboardType): boolean {
  const m: Record<SnowboardType, boolean> = {
    all_mountain_directional: false, freestyle_twin: true, freeride_powder: false, splitboard_touring: false, carving_alpine: false,
  };
  return m[t];
}

export function splitCapable(t: SnowboardType): boolean {
  const m: Record<SnowboardType, boolean> = {
    all_mountain_directional: false, freestyle_twin: false, freeride_powder: false, splitboard_touring: true, carving_alpine: false,
  };
  return m[t];
}

export function profile(t: SnowboardType): string {
  const m: Record<SnowboardType, string> = {
    all_mountain_directional: "directional_camber_rocker", freestyle_twin: "true_twin_flat_camber",
    freeride_powder: "tapered_rocker_setback", splitboard_touring: "directional_camber_split",
    carving_alpine: "full_camber_narrow_waist",
  };
  return m[t];
}

export function bestRider(t: SnowboardType): string {
  const m: Record<SnowboardType, string> = {
    all_mountain_directional: "one_board_quiver_resort", freestyle_twin: "park_pipe_jibbing",
    freeride_powder: "deep_snow_big_mountain", splitboard_touring: "backcountry_earn_turns",
    carving_alpine: "hardpack_groomer_speed",
  };
  return m[t];
}

export function snowboards(): SnowboardType[] {
  return ["all_mountain_directional", "freestyle_twin", "freeride_powder", "splitboard_touring", "carving_alpine"];
}

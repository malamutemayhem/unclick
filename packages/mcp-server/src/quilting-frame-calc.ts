export type QuiltingFrameType = "hoop_round_handheld" | "scroll_bar_roller" | "floor_standing_tilt" | "machine_longarm_rail" | "snap_pvc_lightweight";

export function quilterControl(t: QuiltingFrameType): number {
  const m: Record<QuiltingFrameType, number> = {
    hoop_round_handheld: 8, scroll_bar_roller: 7, floor_standing_tilt: 6, machine_longarm_rail: 5, snap_pvc_lightweight: 7,
  };
  return m[t];
}

export function quiltSizeCapacity(t: QuiltingFrameType): number {
  const m: Record<QuiltingFrameType, number> = {
    hoop_round_handheld: 2, scroll_bar_roller: 7, floor_standing_tilt: 8, machine_longarm_rail: 10, snap_pvc_lightweight: 6,
  };
  return m[t];
}

export function portability(t: QuiltingFrameType): number {
  const m: Record<QuiltingFrameType, number> = {
    hoop_round_handheld: 10, scroll_bar_roller: 5, floor_standing_tilt: 2, machine_longarm_rail: 1, snap_pvc_lightweight: 8,
  };
  return m[t];
}

export function fabricTension(t: QuiltingFrameType): number {
  const m: Record<QuiltingFrameType, number> = {
    hoop_round_handheld: 6, scroll_bar_roller: 8, floor_standing_tilt: 9, machine_longarm_rail: 10, snap_pvc_lightweight: 7,
  };
  return m[t];
}

export function frameCost(t: QuiltingFrameType): number {
  const m: Record<QuiltingFrameType, number> = {
    hoop_round_handheld: 1, scroll_bar_roller: 4, floor_standing_tilt: 6, machine_longarm_rail: 10, snap_pvc_lightweight: 3,
  };
  return m[t];
}

export function freestanding(t: QuiltingFrameType): boolean {
  const m: Record<QuiltingFrameType, boolean> = {
    hoop_round_handheld: false, scroll_bar_roller: false, floor_standing_tilt: true, machine_longarm_rail: true, snap_pvc_lightweight: false,
  };
  return m[t];
}

export function worksWithMachine(t: QuiltingFrameType): boolean {
  const m: Record<QuiltingFrameType, boolean> = {
    hoop_round_handheld: false, scroll_bar_roller: false, floor_standing_tilt: false, machine_longarm_rail: true, snap_pvc_lightweight: false,
  };
  return m[t];
}

export function frameConstruction(t: QuiltingFrameType): string {
  const m: Record<QuiltingFrameType, string> = {
    hoop_round_handheld: "wood_spring_clip_ring",
    scroll_bar_roller: "hardwood_dowel_scroll",
    floor_standing_tilt: "oak_frame_tilt_adjust",
    machine_longarm_rail: "steel_rail_carriage",
    snap_pvc_lightweight: "pvc_pipe_snap_clamp",
  };
  return m[t];
}

export function bestProject(t: QuiltingFrameType): string {
  const m: Record<QuiltingFrameType, string> = {
    hoop_round_handheld: "small_block_applique",
    scroll_bar_roller: "lap_quilt_medium",
    floor_standing_tilt: "full_size_hand_quilt",
    machine_longarm_rail: "king_queen_production",
    snap_pvc_lightweight: "travel_guild_meetup",
  };
  return m[t];
}

export function quiltingFrames(): QuiltingFrameType[] {
  return ["hoop_round_handheld", "scroll_bar_roller", "floor_standing_tilt", "machine_longarm_rail", "snap_pvc_lightweight"];
}

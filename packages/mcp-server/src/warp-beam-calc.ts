export type WarpBeamType = "sectional_beam_peg" | "plain_beam_smooth" | "cloth_beam_front" | "warp_chain_board" | "warping_mill_reel";

export function warpCapacity(t: WarpBeamType): number {
  const m: Record<WarpBeamType, number> = {
    sectional_beam_peg: 10, plain_beam_smooth: 7, cloth_beam_front: 6, warp_chain_board: 4, warping_mill_reel: 8,
  };
  return m[t];
}

export function tensionEven(t: WarpBeamType): number {
  const m: Record<WarpBeamType, number> = {
    sectional_beam_peg: 10, plain_beam_smooth: 7, cloth_beam_front: 8, warp_chain_board: 5, warping_mill_reel: 6,
  };
  return m[t];
}

export function setupSpeed(t: WarpBeamType): number {
  const m: Record<WarpBeamType, number> = {
    sectional_beam_peg: 9, plain_beam_smooth: 6, cloth_beam_front: 5, warp_chain_board: 8, warping_mill_reel: 7,
  };
  return m[t];
}

export function spaceNeeded(t: WarpBeamType): number {
  const m: Record<WarpBeamType, number> = {
    sectional_beam_peg: 3, plain_beam_smooth: 4, cloth_beam_front: 5, warp_chain_board: 8, warping_mill_reel: 2,
  };
  return m[t];
}

export function beamCost(t: WarpBeamType): number {
  const m: Record<WarpBeamType, number> = {
    sectional_beam_peg: 4, plain_beam_smooth: 2, cloth_beam_front: 2, warp_chain_board: 1, warping_mill_reel: 3,
  };
  return m[t];
}

export function partOfLoom(t: WarpBeamType): boolean {
  const m: Record<WarpBeamType, boolean> = {
    sectional_beam_peg: true, plain_beam_smooth: true, cloth_beam_front: true, warp_chain_board: false, warping_mill_reel: false,
  };
  return m[t];
}

export function sectioned(t: WarpBeamType): boolean {
  const m: Record<WarpBeamType, boolean> = {
    sectional_beam_peg: true, plain_beam_smooth: false, cloth_beam_front: false, warp_chain_board: false, warping_mill_reel: false,
  };
  return m[t];
}

export function beamShape(t: WarpBeamType): string {
  const m: Record<WarpBeamType, string> = {
    sectional_beam_peg: "pegged_section_cylinder",
    plain_beam_smooth: "smooth_round_cylinder",
    cloth_beam_front: "ratchet_brake_cylinder",
    warp_chain_board: "flat_peg_board",
    warping_mill_reel: "vertical_rotating_reel",
  };
  return m[t];
}

export function bestSetup(t: WarpBeamType): string {
  const m: Record<WarpBeamType, string> = {
    sectional_beam_peg: "long_warp_production",
    plain_beam_smooth: "general_warp_wind",
    cloth_beam_front: "woven_fabric_takeup",
    warp_chain_board: "short_warp_measure",
    warping_mill_reel: "counted_warp_chain",
  };
  return m[t];
}

export function warpBeams(): WarpBeamType[] {
  return ["sectional_beam_peg", "plain_beam_smooth", "cloth_beam_front", "warp_chain_board", "warping_mill_reel"];
}

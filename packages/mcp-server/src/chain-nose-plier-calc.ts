export type ChainNosePlierType = "standard_taper_smooth" | "bent_nose_angle" | "flat_nose_parallel" | "round_nose_loop" | "nylon_jaw_protect";

export function gripPrecision(t: ChainNosePlierType): number {
  const m: Record<ChainNosePlierType, number> = {
    standard_taper_smooth: 9, bent_nose_angle: 8, flat_nose_parallel: 8, round_nose_loop: 6, nylon_jaw_protect: 7,
  };
  return m[t];
}

export function tightAccess(t: ChainNosePlierType): number {
  const m: Record<ChainNosePlierType, number> = {
    standard_taper_smooth: 9, bent_nose_angle: 10, flat_nose_parallel: 6, round_nose_loop: 7, nylon_jaw_protect: 5,
  };
  return m[t];
}

export function holdingForce(t: ChainNosePlierType): number {
  const m: Record<ChainNosePlierType, number> = {
    standard_taper_smooth: 8, bent_nose_angle: 7, flat_nose_parallel: 10, round_nose_loop: 5, nylon_jaw_protect: 6,
  };
  return m[t];
}

export function markFree(t: ChainNosePlierType): number {
  const m: Record<ChainNosePlierType, number> = {
    standard_taper_smooth: 7, bent_nose_angle: 6, flat_nose_parallel: 7, round_nose_loop: 8, nylon_jaw_protect: 10,
  };
  return m[t];
}

export function plierCost(t: ChainNosePlierType): number {
  const m: Record<ChainNosePlierType, number> = {
    standard_taper_smooth: 2, bent_nose_angle: 2, flat_nose_parallel: 2, round_nose_loop: 2, nylon_jaw_protect: 2,
  };
  return m[t];
}

export function makesLoops(t: ChainNosePlierType): boolean {
  const m: Record<ChainNosePlierType, boolean> = {
    standard_taper_smooth: false, bent_nose_angle: false, flat_nose_parallel: false, round_nose_loop: true, nylon_jaw_protect: false,
  };
  return m[t];
}

export function nylonJaw(t: ChainNosePlierType): boolean {
  const m: Record<ChainNosePlierType, boolean> = {
    standard_taper_smooth: false, bent_nose_angle: false, flat_nose_parallel: false, round_nose_loop: false, nylon_jaw_protect: true,
  };
  return m[t];
}

export function jawProfile(t: ChainNosePlierType): string {
  const m: Record<ChainNosePlierType, string> = {
    standard_taper_smooth: "tapered_flat_inner",
    bent_nose_angle: "angled_taper_bend",
    flat_nose_parallel: "parallel_flat_wide",
    round_nose_loop: "conical_round_smooth",
    nylon_jaw_protect: "flat_nylon_insert",
  };
  return m[t];
}

export function bestTask(t: ChainNosePlierType): string {
  const m: Record<ChainNosePlierType, string> = {
    standard_taper_smooth: "jump_ring_open_close",
    bent_nose_angle: "chain_maille_weave",
    flat_nose_parallel: "wire_straighten_hold",
    round_nose_loop: "eye_pin_loop_form",
    nylon_jaw_protect: "soft_wire_shape_safe",
  };
  return m[t];
}

export function chainNosePliers(): ChainNosePlierType[] {
  return ["standard_taper_smooth", "bent_nose_angle", "flat_nose_parallel", "round_nose_loop", "nylon_jaw_protect"];
}

export type PinViseType = "swivel_head_double" | "single_end_basic" | "archimedes_drill_push" | "collet_set_precision" | "mini_hand_twist";

export function gripRange(t: PinViseType): number {
  const m: Record<PinViseType, number> = {
    swivel_head_double: 9, single_end_basic: 6, archimedes_drill_push: 5, collet_set_precision: 10, mini_hand_twist: 4,
  };
  return m[t];
}

export function drillControl(t: PinViseType): number {
  const m: Record<PinViseType, number> = {
    swivel_head_double: 8, single_end_basic: 7, archimedes_drill_push: 9, collet_set_precision: 8, mini_hand_twist: 6,
  };
  return m[t];
}

export function runout(t: PinViseType): number {
  const m: Record<PinViseType, number> = {
    swivel_head_double: 8, single_end_basic: 6, archimedes_drill_push: 7, collet_set_precision: 10, mini_hand_twist: 5,
  };
  return m[t];
}

export function easeOfUse(t: PinViseType): number {
  const m: Record<PinViseType, number> = {
    swivel_head_double: 7, single_end_basic: 9, archimedes_drill_push: 8, collet_set_precision: 6, mini_hand_twist: 10,
  };
  return m[t];
}

export function viseCost(t: PinViseType): number {
  const m: Record<PinViseType, number> = {
    swivel_head_double: 2, single_end_basic: 1, archimedes_drill_push: 2, collet_set_precision: 3, mini_hand_twist: 1,
  };
  return m[t];
}

export function doubleEnd(t: PinViseType): boolean {
  const m: Record<PinViseType, boolean> = {
    swivel_head_double: true, single_end_basic: false, archimedes_drill_push: false, collet_set_precision: false, mini_hand_twist: false,
  };
  return m[t];
}

export function pushDrill(t: PinViseType): boolean {
  const m: Record<PinViseType, boolean> = {
    swivel_head_double: false, single_end_basic: false, archimedes_drill_push: true, collet_set_precision: false, mini_hand_twist: false,
  };
  return m[t];
}

export function chuckType(t: PinViseType): string {
  const m: Record<PinViseType, string> = {
    swivel_head_double: "double_collet_swivel",
    single_end_basic: "three_jaw_chuck",
    archimedes_drill_push: "spiral_push_chuck",
    collet_set_precision: "er_collet_set",
    mini_hand_twist: "small_jaw_twist",
  };
  return m[t];
}

export function bestUse(t: PinViseType): string {
  const m: Record<PinViseType, string> = {
    swivel_head_double: "dual_range_hold",
    single_end_basic: "basic_small_drill",
    archimedes_drill_push: "rapid_hole_push",
    collet_set_precision: "precision_micro_hold",
    mini_hand_twist: "tiny_wire_hold",
  };
  return m[t];
}

export function pinVises(): PinViseType[] {
  return ["swivel_head_double", "single_end_basic", "archimedes_drill_push", "collet_set_precision", "mini_hand_twist"];
}

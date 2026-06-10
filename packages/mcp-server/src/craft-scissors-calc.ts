export type CraftScissorsType = "fabric_shears_bent" | "detail_precision_tip" | "pinking_zigzag" | "rotary_cutter_wheel" | "spring_action_easy_grip";

export function cuttingPower(t: CraftScissorsType): number {
  const m: Record<CraftScissorsType, number> = {
    fabric_shears_bent: 9, detail_precision_tip: 5, pinking_zigzag: 7, rotary_cutter_wheel: 10, spring_action_easy_grip: 6,
  };
  return m[t];
}

export function precision(t: CraftScissorsType): number {
  const m: Record<CraftScissorsType, number> = {
    fabric_shears_bent: 7, detail_precision_tip: 10, pinking_zigzag: 5, rotary_cutter_wheel: 8, spring_action_easy_grip: 6,
  };
  return m[t];
}

export function ergonomic(t: CraftScissorsType): number {
  const m: Record<CraftScissorsType, number> = {
    fabric_shears_bent: 7, detail_precision_tip: 6, pinking_zigzag: 4, rotary_cutter_wheel: 8, spring_action_easy_grip: 10,
  };
  return m[t];
}

export function versatility(t: CraftScissorsType): number {
  const m: Record<CraftScissorsType, number> = {
    fabric_shears_bent: 8, detail_precision_tip: 6, pinking_zigzag: 4, rotary_cutter_wheel: 9, spring_action_easy_grip: 7,
  };
  return m[t];
}

export function scissorsCost(t: CraftScissorsType): number {
  const m: Record<CraftScissorsType, number> = {
    fabric_shears_bent: 7, detail_precision_tip: 5, pinking_zigzag: 6, rotary_cutter_wheel: 8, spring_action_easy_grip: 4,
  };
  return m[t];
}

export function selfSharpening(t: CraftScissorsType): boolean {
  const m: Record<CraftScissorsType, boolean> = {
    fabric_shears_bent: false, detail_precision_tip: false, pinking_zigzag: false, rotary_cutter_wheel: false, spring_action_easy_grip: true,
  };
  return m[t];
}

export function replaceableBlade(t: CraftScissorsType): boolean {
  const m: Record<CraftScissorsType, boolean> = {
    fabric_shears_bent: false, detail_precision_tip: false, pinking_zigzag: false, rotary_cutter_wheel: true, spring_action_easy_grip: false,
  };
  return m[t];
}

export function bladeMaterial(t: CraftScissorsType): string {
  const m: Record<CraftScissorsType, string> = {
    fabric_shears_bent: "forged_stainless_bent_handle",
    detail_precision_tip: "surgical_steel_fine_point",
    pinking_zigzag: "hardened_steel_zigzag_edge",
    rotary_cutter_wheel: "tungsten_carbide_disc",
    spring_action_easy_grip: "stainless_spring_loaded",
  };
  return m[t];
}

export function bestCraft(t: CraftScissorsType): string {
  const m: Record<CraftScissorsType, string> = {
    fabric_shears_bent: "sewing_quilting_fabric",
    detail_precision_tip: "paper_craft_intricate_cut",
    pinking_zigzag: "seam_finishing_fray_stop",
    rotary_cutter_wheel: "quilting_multiple_layers",
    spring_action_easy_grip: "arthritis_hand_fatigue",
  };
  return m[t];
}

export function craftScissors(): CraftScissorsType[] {
  return ["fabric_shears_bent", "detail_precision_tip", "pinking_zigzag", "rotary_cutter_wheel", "spring_action_easy_grip"];
}

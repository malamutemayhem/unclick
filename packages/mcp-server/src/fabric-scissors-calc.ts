export type FabricScissorsType = "dressmaker_bent" | "pinking_zigzag" | "rotary_cutter" | "spring_action" | "electric_power";

export function cutPrecision(t: FabricScissorsType): number {
  const m: Record<FabricScissorsType, number> = {
    dressmaker_bent: 9, pinking_zigzag: 6, rotary_cutter: 10, spring_action: 7, electric_power: 5,
  };
  return m[t];
}

export function bladeSharpness(t: FabricScissorsType): number {
  const m: Record<FabricScissorsType, number> = {
    dressmaker_bent: 9, pinking_zigzag: 7, rotary_cutter: 10, spring_action: 6, electric_power: 8,
  };
  return m[t];
}

export function handFatigue(t: FabricScissorsType): number {
  const m: Record<FabricScissorsType, number> = {
    dressmaker_bent: 5, pinking_zigzag: 7, rotary_cutter: 3, spring_action: 2, electric_power: 1,
  };
  return m[t];
}

export function layerCut(t: FabricScissorsType): number {
  const m: Record<FabricScissorsType, number> = {
    dressmaker_bent: 6, pinking_zigzag: 4, rotary_cutter: 10, spring_action: 3, electric_power: 8,
  };
  return m[t];
}

export function scissorCost(t: FabricScissorsType): number {
  const m: Record<FabricScissorsType, number> = {
    dressmaker_bent: 4, pinking_zigzag: 5, rotary_cutter: 6, spring_action: 3, electric_power: 8,
  };
  return m[t];
}

export function preventsRavel(t: FabricScissorsType): boolean {
  const m: Record<FabricScissorsType, boolean> = {
    dressmaker_bent: false, pinking_zigzag: true, rotary_cutter: false, spring_action: false, electric_power: false,
  };
  return m[t];
}

export function needsMat(t: FabricScissorsType): boolean {
  const m: Record<FabricScissorsType, boolean> = {
    dressmaker_bent: false, pinking_zigzag: false, rotary_cutter: true, spring_action: false, electric_power: false,
  };
  return m[t];
}

export function bladeDesign(t: FabricScissorsType): string {
  const m: Record<FabricScissorsType, string> = {
    dressmaker_bent: "offset_handle_flat_cut",
    pinking_zigzag: "sawtooth_edge_zigzag",
    rotary_cutter: "circular_wheel_blade",
    spring_action: "self_opening_ergonomic",
    electric_power: "motorized_dual_blade",
  };
  return m[t];
}

export function bestFabric(t: FabricScissorsType): string {
  const m: Record<FabricScissorsType, string> = {
    dressmaker_bent: "woven_cotton_garment",
    pinking_zigzag: "seam_finish_anti_fray",
    rotary_cutter: "quilting_multi_layer",
    spring_action: "arthritis_light_duty",
    electric_power: "industrial_bulk_cutting",
  };
  return m[t];
}

export function fabricScissors(): FabricScissorsType[] {
  return ["dressmaker_bent", "pinking_zigzag", "rotary_cutter", "spring_action", "electric_power"];
}

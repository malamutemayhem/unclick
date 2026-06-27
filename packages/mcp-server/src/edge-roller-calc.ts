export type EdgeRollerType = "brass_wheel_smooth" | "teflon_bone_press" | "steel_creaser_heat" | "nylon_roller_soft" | "cocobolo_wood_turn";

export function crispness(t: EdgeRollerType): number {
  const m: Record<EdgeRollerType, number> = {
    brass_wheel_smooth: 9, teflon_bone_press: 7, steel_creaser_heat: 10, nylon_roller_soft: 5, cocobolo_wood_turn: 8,
  };
  return m[t];
}

export function controlEase(t: EdgeRollerType): number {
  const m: Record<EdgeRollerType, number> = {
    brass_wheel_smooth: 8, teflon_bone_press: 9, steel_creaser_heat: 6, nylon_roller_soft: 10, cocobolo_wood_turn: 7,
  };
  return m[t];
}

export function surfaceSafe(t: EdgeRollerType): number {
  const m: Record<EdgeRollerType, number> = {
    brass_wheel_smooth: 6, teflon_bone_press: 10, steel_creaser_heat: 4, nylon_roller_soft: 9, cocobolo_wood_turn: 8,
  };
  return m[t];
}

export function durability(t: EdgeRollerType): number {
  const m: Record<EdgeRollerType, number> = {
    brass_wheel_smooth: 10, teflon_bone_press: 7, steel_creaser_heat: 10, nylon_roller_soft: 6, cocobolo_wood_turn: 9,
  };
  return m[t];
}

export function rollerCost(t: EdgeRollerType): number {
  const m: Record<EdgeRollerType, number> = {
    brass_wheel_smooth: 3, teflon_bone_press: 2, steel_creaser_heat: 4, nylon_roller_soft: 1, cocobolo_wood_turn: 4,
  };
  return m[t];
}

export function heated(t: EdgeRollerType): boolean {
  const m: Record<EdgeRollerType, boolean> = {
    brass_wheel_smooth: false, teflon_bone_press: false, steel_creaser_heat: true, nylon_roller_soft: false, cocobolo_wood_turn: false,
  };
  return m[t];
}

export function nonMarking(t: EdgeRollerType): boolean {
  const m: Record<EdgeRollerType, boolean> = {
    brass_wheel_smooth: false, teflon_bone_press: true, steel_creaser_heat: false, nylon_roller_soft: true, cocobolo_wood_turn: false,
  };
  return m[t];
}

export function rollerMaterial(t: EdgeRollerType): string {
  const m: Record<EdgeRollerType, string> = {
    brass_wheel_smooth: "solid_brass_turned",
    teflon_bone_press: "ptfe_coated_bone",
    steel_creaser_heat: "tool_steel_heated",
    nylon_roller_soft: "nylon_molded_soft",
    cocobolo_wood_turn: "cocobolo_hand_turned",
  };
  return m[t];
}

export function bestUse(t: EdgeRollerType): string {
  const m: Record<EdgeRollerType, string> = {
    brass_wheel_smooth: "leather_edge_crease",
    teflon_bone_press: "cloth_fold_press",
    steel_creaser_heat: "heated_edge_line",
    nylon_roller_soft: "delicate_paper_roll",
    cocobolo_wood_turn: "fine_binding_turn",
  };
  return m[t];
}

export function edgeRollers(): EdgeRollerType[] {
  return ["brass_wheel_smooth", "teflon_bone_press", "steel_creaser_heat", "nylon_roller_soft", "cocobolo_wood_turn"];
}

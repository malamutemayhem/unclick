export type CraftKnifeType = "retractable_snap_blade" | "precision_xacto_fixed" | "rotary_cutter_wheel" | "swivel_blade_curve" | "ceramic_safety_blade";

export function cuttingPrecision(t: CraftKnifeType): number {
  const m: Record<CraftKnifeType, number> = {
    retractable_snap_blade: 6, precision_xacto_fixed: 10, rotary_cutter_wheel: 5, swivel_blade_curve: 8, ceramic_safety_blade: 4,
  };
  return m[t];
}

export function bladeLife(t: CraftKnifeType): number {
  const m: Record<CraftKnifeType, number> = {
    retractable_snap_blade: 9, precision_xacto_fixed: 6, rotary_cutter_wheel: 7, swivel_blade_curve: 5, ceramic_safety_blade: 8,
  };
  return m[t];
}

export function safety(t: CraftKnifeType): number {
  const m: Record<CraftKnifeType, number> = {
    retractable_snap_blade: 7, precision_xacto_fixed: 3, rotary_cutter_wheel: 5, swivel_blade_curve: 4, ceramic_safety_blade: 10,
  };
  return m[t];
}

export function curvedCutAbility(t: CraftKnifeType): number {
  const m: Record<CraftKnifeType, number> = {
    retractable_snap_blade: 3, precision_xacto_fixed: 6, rotary_cutter_wheel: 7, swivel_blade_curve: 10, ceramic_safety_blade: 4,
  };
  return m[t];
}

export function knifeCost(t: CraftKnifeType): number {
  const m: Record<CraftKnifeType, number> = {
    retractable_snap_blade: 2, precision_xacto_fixed: 4, rotary_cutter_wheel: 5, swivel_blade_curve: 6, ceramic_safety_blade: 3,
  };
  return m[t];
}

export function retractable(t: CraftKnifeType): boolean {
  const m: Record<CraftKnifeType, boolean> = {
    retractable_snap_blade: true, precision_xacto_fixed: false, rotary_cutter_wheel: false, swivel_blade_curve: false, ceramic_safety_blade: true,
  };
  return m[t];
}

export function replaceBlade(t: CraftKnifeType): boolean {
  const m: Record<CraftKnifeType, boolean> = {
    retractable_snap_blade: true, precision_xacto_fixed: true, rotary_cutter_wheel: true, swivel_blade_curve: true, ceramic_safety_blade: false,
  };
  return m[t];
}

export function bladeProfile(t: CraftKnifeType): string {
  const m: Record<CraftKnifeType, string> = {
    retractable_snap_blade: "segmented_snap_off_carbon",
    precision_xacto_fixed: "pointed_no11_surgical_steel",
    rotary_cutter_wheel: "circular_tungsten_carbide",
    swivel_blade_curve: "small_angled_swivel_mount",
    ceramic_safety_blade: "rounded_zirconia_ceramic",
  };
  return m[t];
}

export function bestCraft(t: CraftKnifeType): string {
  const m: Record<CraftKnifeType, string> = {
    retractable_snap_blade: "general_purpose_cardboard",
    precision_xacto_fixed: "model_making_fine_detail",
    rotary_cutter_wheel: "fabric_quilting_straight",
    swivel_blade_curve: "vinyl_sticker_intricate",
    ceramic_safety_blade: "classroom_child_safe_cut",
  };
  return m[t];
}

export function craftKnives(): CraftKnifeType[] {
  return ["retractable_snap_blade", "precision_xacto_fixed", "rotary_cutter_wheel", "swivel_blade_curve", "ceramic_safety_blade"];
}

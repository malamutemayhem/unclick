export type StretchWrap = "hand_wrap" | "machine_wrap" | "pre_stretch" | "vci_film" | "netting";

export function loadContainment(s: StretchWrap): number {
  const m: Record<StretchWrap, number> = {
    hand_wrap: 5, machine_wrap: 10, pre_stretch: 8, vci_film: 6, netting: 7,
  };
  return m[s];
}

export function filmUsageEfficiency(s: StretchWrap): number {
  const m: Record<StretchWrap, number> = {
    hand_wrap: 4, machine_wrap: 8, pre_stretch: 10, vci_film: 5, netting: 7,
  };
  return m[s];
}

export function applicationSpeed(s: StretchWrap): number {
  const m: Record<StretchWrap, number> = {
    hand_wrap: 3, machine_wrap: 10, pre_stretch: 7, vci_film: 4, netting: 8,
  };
  return m[s];
}

export function corrosionProtection(s: StretchWrap): number {
  const m: Record<StretchWrap, number> = {
    hand_wrap: 2, machine_wrap: 2, pre_stretch: 2, vci_film: 10, netting: 1,
  };
  return m[s];
}

export function costPerLoad(s: StretchWrap): number {
  const m: Record<StretchWrap, number> = {
    hand_wrap: 5, machine_wrap: 3, pre_stretch: 4, vci_film: 9, netting: 6,
  };
  return m[s];
}

export function requiresMachine(s: StretchWrap): boolean {
  const m: Record<StretchWrap, boolean> = {
    hand_wrap: false, machine_wrap: true, pre_stretch: false, vci_film: false, netting: true,
  };
  return m[s];
}

export function uvProtection(s: StretchWrap): boolean {
  const m: Record<StretchWrap, boolean> = {
    hand_wrap: false, machine_wrap: false, pre_stretch: false, vci_film: true, netting: false,
  };
  return m[s];
}

export function filmComposition(s: StretchWrap): string {
  const m: Record<StretchWrap, string> = {
    hand_wrap: "lldpe_hand_dispensed", machine_wrap: "lldpe_power_pre_stretch",
    pre_stretch: "oriented_lldpe_reduced_gauge", vci_film: "polyethylene_vapor_inhibitor",
    netting: "hdpe_extruded_mesh",
  };
  return m[s];
}

export function bestApplication(s: StretchWrap): string {
  const m: Record<StretchWrap, string> = {
    hand_wrap: "low_volume_manual_pallet", machine_wrap: "high_volume_automated_line",
    pre_stretch: "cost_reduction_standard_load", vci_film: "metal_parts_rust_prevention",
    netting: "produce_ventilated_pallet",
  };
  return m[s];
}

export function stretchWraps(): StretchWrap[] {
  return ["hand_wrap", "machine_wrap", "pre_stretch", "vci_film", "netting"];
}

export type SolderIronType = "temp_control_station" | "pencil_iron_fixed" | "gun_trigger_fast" | "butane_torch_port" | "resistance_tweezer";

export function heatSpeed(t: SolderIronType): number {
  const m: Record<SolderIronType, number> = {
    temp_control_station: 8, pencil_iron_fixed: 6, gun_trigger_fast: 10, butane_torch_port: 7, resistance_tweezer: 5,
  };
  return m[t];
}

export function tempAccuracy(t: SolderIronType): number {
  const m: Record<SolderIronType, number> = {
    temp_control_station: 10, pencil_iron_fixed: 5, gun_trigger_fast: 4, butane_torch_port: 3, resistance_tweezer: 8,
  };
  return m[t];
}

export function tipVariety(t: SolderIronType): number {
  const m: Record<SolderIronType, number> = {
    temp_control_station: 10, pencil_iron_fixed: 6, gun_trigger_fast: 3, butane_torch_port: 5, resistance_tweezer: 4,
  };
  return m[t];
}

export function portability(t: SolderIronType): number {
  const m: Record<SolderIronType, number> = {
    temp_control_station: 3, pencil_iron_fixed: 7, gun_trigger_fast: 5, butane_torch_port: 10, resistance_tweezer: 6,
  };
  return m[t];
}

export function ironCost(t: SolderIronType): number {
  const m: Record<SolderIronType, number> = {
    temp_control_station: 4, pencil_iron_fixed: 1, gun_trigger_fast: 2, butane_torch_port: 3, resistance_tweezer: 3,
  };
  return m[t];
}

export function adjustable(t: SolderIronType): boolean {
  const m: Record<SolderIronType, boolean> = {
    temp_control_station: true, pencil_iron_fixed: false, gun_trigger_fast: false, butane_torch_port: true, resistance_tweezer: true,
  };
  return m[t];
}

export function cordless(t: SolderIronType): boolean {
  const m: Record<SolderIronType, boolean> = {
    temp_control_station: false, pencil_iron_fixed: false, gun_trigger_fast: false, butane_torch_port: true, resistance_tweezer: false,
  };
  return m[t];
}

export function heatingElement(t: SolderIronType): string {
  const m: Record<SolderIronType, string> = {
    temp_control_station: "ceramic_pid_control",
    pencil_iron_fixed: "nichrome_wire_coil",
    gun_trigger_fast: "transformer_loop_tip",
    butane_torch_port: "catalytic_flame_heat",
    resistance_tweezer: "dual_tip_clamp_heat",
  };
  return m[t];
}

export function bestProject(t: SolderIronType): string {
  const m: Record<SolderIronType, string> = {
    temp_control_station: "stained_glass_panel",
    pencil_iron_fixed: "basic_wire_joint",
    gun_trigger_fast: "heavy_copper_pipe",
    butane_torch_port: "field_repair_outdoor",
    resistance_tweezer: "smd_component_rework",
  };
  return m[t];
}

export function solderIrons(): SolderIronType[] {
  return ["temp_control_station", "pencil_iron_fixed", "gun_trigger_fast", "butane_torch_port", "resistance_tweezer"];
}

export type MachineBoltType = "hex_head_grade_5" | "carriage_bolt_round" | "flange_bolt_serrated" | "socket_head_cap" | "u_bolt_pipe_clamp";

export function tensileStrength(t: MachineBoltType): number {
  const m: Record<MachineBoltType, number> = {
    hex_head_grade_5: 7, carriage_bolt_round: 6, flange_bolt_serrated: 8, socket_head_cap: 10, u_bolt_pipe_clamp: 7,
  };
  return m[t];
}

export function installEase(t: MachineBoltType): number {
  const m: Record<MachineBoltType, number> = {
    hex_head_grade_5: 8, carriage_bolt_round: 9, flange_bolt_serrated: 7, socket_head_cap: 5, u_bolt_pipe_clamp: 6,
  };
  return m[t];
}

export function tamperResist(t: MachineBoltType): number {
  const m: Record<MachineBoltType, number> = {
    hex_head_grade_5: 3, carriage_bolt_round: 9, flange_bolt_serrated: 4, socket_head_cap: 7, u_bolt_pipe_clamp: 3,
  };
  return m[t];
}

export function vibrationResist(t: MachineBoltType): number {
  const m: Record<MachineBoltType, number> = {
    hex_head_grade_5: 5, carriage_bolt_round: 6, flange_bolt_serrated: 10, socket_head_cap: 7, u_bolt_pipe_clamp: 8,
  };
  return m[t];
}

export function boltCost(t: MachineBoltType): number {
  const m: Record<MachineBoltType, number> = {
    hex_head_grade_5: 4, carriage_bolt_round: 5, flange_bolt_serrated: 6, socket_head_cap: 8, u_bolt_pipe_clamp: 6,
  };
  return m[t];
}

export function needsWasher(t: MachineBoltType): boolean {
  const m: Record<MachineBoltType, boolean> = {
    hex_head_grade_5: true, carriage_bolt_round: false, flange_bolt_serrated: false, socket_head_cap: true, u_bolt_pipe_clamp: true,
  };
  return m[t];
}

export function squareNeck(t: MachineBoltType): boolean {
  const m: Record<MachineBoltType, boolean> = {
    hex_head_grade_5: false, carriage_bolt_round: true, flange_bolt_serrated: false, socket_head_cap: false, u_bolt_pipe_clamp: false,
  };
  return m[t];
}

export function headProfile(t: MachineBoltType): string {
  const m: Record<MachineBoltType, string> = {
    hex_head_grade_5: "hex_protruding_wrench",
    carriage_bolt_round: "dome_smooth_anti_spin",
    flange_bolt_serrated: "hex_integral_flange",
    socket_head_cap: "cylindrical_allen_key",
    u_bolt_pipe_clamp: "threaded_u_shape_plate",
  };
  return m[t];
}

export function bestUse(t: MachineBoltType): string {
  const m: Record<MachineBoltType, string> = {
    hex_head_grade_5: "general_structural_frame",
    carriage_bolt_round: "wood_through_bolt_safe",
    flange_bolt_serrated: "automotive_engine_mount",
    socket_head_cap: "precision_machine_assembly",
    u_bolt_pipe_clamp: "pipe_exhaust_suspension",
  };
  return m[t];
}

export function machineBolts(): MachineBoltType[] {
  return ["hex_head_grade_5", "carriage_bolt_round", "flange_bolt_serrated", "socket_head_cap", "u_bolt_pipe_clamp"];
}

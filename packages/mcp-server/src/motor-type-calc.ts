export type MotorType = "dc_brushed" | "dc_brushless" | "ac_induction" | "stepper" | "synchronous";

export function efficiencyScore(m_type: MotorType): number {
  const m: Record<MotorType, number> = {
    dc_brushed: 5, dc_brushless: 9, ac_induction: 7, stepper: 4, synchronous: 10,
  };
  return m[m_type];
}

export function torqueDensity(m_type: MotorType): number {
  const m: Record<MotorType, number> = {
    dc_brushed: 6, dc_brushless: 8, ac_induction: 7, stepper: 9, synchronous: 8,
  };
  return m[m_type];
}

export function speedRange(m_type: MotorType): number {
  const m: Record<MotorType, number> = {
    dc_brushed: 7, dc_brushless: 9, ac_induction: 6, stepper: 3, synchronous: 8,
  };
  return m[m_type];
}

export function maintenanceNeed(m_type: MotorType): number {
  const m: Record<MotorType, number> = {
    dc_brushed: 8, dc_brushless: 1, ac_induction: 2, stepper: 1, synchronous: 3,
  };
  return m[m_type];
}

export function costScore(m_type: MotorType): number {
  const m: Record<MotorType, number> = {
    dc_brushed: 2, dc_brushless: 7, ac_induction: 4, stepper: 5, synchronous: 8,
  };
  return m[m_type];
}

export function hasBrushes(m_type: MotorType): boolean {
  const m: Record<MotorType, boolean> = {
    dc_brushed: true, dc_brushless: false, ac_induction: false, stepper: false, synchronous: false,
  };
  return m[m_type];
}

export function requiresVfd(m_type: MotorType): boolean {
  const m: Record<MotorType, boolean> = {
    dc_brushed: false, dc_brushless: true, ac_induction: false, stepper: true, synchronous: true,
  };
  return m[m_type];
}

export function commonApplication(m_type: MotorType): string {
  const m: Record<MotorType, string> = {
    dc_brushed: "power_tools_toys", dc_brushless: "drones_ev",
    ac_induction: "industrial_hvac", stepper: "cnc_3d_printer",
    synchronous: "precision_drives",
  };
  return m[m_type];
}

export function controlMethod(m_type: MotorType): string {
  const m: Record<MotorType, string> = {
    dc_brushed: "voltage_pwm", dc_brushless: "esc_commutation",
    ac_induction: "v_f_control", stepper: "pulse_step",
    synchronous: "field_oriented_control",
  };
  return m[m_type];
}

export function motorTypes(): MotorType[] {
  return ["dc_brushed", "dc_brushless", "ac_induction", "stepper", "synchronous"];
}

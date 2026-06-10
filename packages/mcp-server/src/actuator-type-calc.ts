export type ActuatorType = "servo_motor" | "stepper_motor" | "pneumatic" | "hydraulic" | "piezoelectric";

export function forceOutput(a: ActuatorType): number {
  const m: Record<ActuatorType, number> = {
    servo_motor: 6, stepper_motor: 5, pneumatic: 7, hydraulic: 10, piezoelectric: 2,
  };
  return m[a];
}

export function positionAccuracy(a: ActuatorType): number {
  const m: Record<ActuatorType, number> = {
    servo_motor: 9, stepper_motor: 8, pneumatic: 4, hydraulic: 6, piezoelectric: 10,
  };
  return m[a];
}

export function speedOfResponse(a: ActuatorType): number {
  const m: Record<ActuatorType, number> = {
    servo_motor: 8, stepper_motor: 6, pneumatic: 9, hydraulic: 5, piezoelectric: 10,
  };
  return m[a];
}

export function energyEfficiency(a: ActuatorType): number {
  const m: Record<ActuatorType, number> = {
    servo_motor: 8, stepper_motor: 5, pneumatic: 3, hydraulic: 4, piezoelectric: 9,
  };
  return m[a];
}

export function maintenanceNeed(a: ActuatorType): number {
  const m: Record<ActuatorType, number> = {
    servo_motor: 3, stepper_motor: 2, pneumatic: 6, hydraulic: 8, piezoelectric: 1,
  };
  return m[a];
}

export function requiresFluid(a: ActuatorType): boolean {
  const m: Record<ActuatorType, boolean> = {
    servo_motor: false, stepper_motor: false, pneumatic: true, hydraulic: true, piezoelectric: false,
  };
  return m[a];
}

export function continuousRotation(a: ActuatorType): boolean {
  const m: Record<ActuatorType, boolean> = {
    servo_motor: true, stepper_motor: true, pneumatic: false, hydraulic: true, piezoelectric: false,
  };
  return m[a];
}

export function controlMethod(a: ActuatorType): string {
  const m: Record<ActuatorType, string> = {
    servo_motor: "closed_loop_pwm", stepper_motor: "open_loop_pulse",
    pneumatic: "valve_control", hydraulic: "proportional_valve",
    piezoelectric: "voltage_driven",
  };
  return m[a];
}

export function typicalApplication(a: ActuatorType): string {
  const m: Record<ActuatorType, string> = {
    servo_motor: "robotics_cnc", stepper_motor: "3d_printer",
    pneumatic: "packaging_line", hydraulic: "heavy_machinery",
    piezoelectric: "precision_optics",
  };
  return m[a];
}

export function actuatorTypes(): ActuatorType[] {
  return ["servo_motor", "stepper_motor", "pneumatic", "hydraulic", "piezoelectric"];
}

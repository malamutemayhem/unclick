export type MotionSensorType = "pir_passive" | "microwave_active" | "dual_tech" | "ultrasonic" | "vibration_contact";

export function detectionRange(t: MotionSensorType): number {
  const m: Record<MotionSensorType, number> = {
    pir_passive: 6, microwave_active: 9, dual_tech: 8, ultrasonic: 5, vibration_contact: 2,
  };
  return m[t];
}

export function falseAlarmRate(t: MotionSensorType): number {
  const m: Record<MotionSensorType, number> = {
    pir_passive: 5, microwave_active: 7, dual_tech: 2, ultrasonic: 6, vibration_contact: 3,
  };
  return m[t];
}

export function responseSpeed(t: MotionSensorType): number {
  const m: Record<MotionSensorType, number> = {
    pir_passive: 7, microwave_active: 10, dual_tech: 8, ultrasonic: 9, vibration_contact: 10,
  };
  return m[t];
}

export function powerDraw(t: MotionSensorType): number {
  const m: Record<MotionSensorType, number> = {
    pir_passive: 1, microwave_active: 7, dual_tech: 6, ultrasonic: 5, vibration_contact: 1,
  };
  return m[t];
}

export function sensorCost(t: MotionSensorType): number {
  const m: Record<MotionSensorType, number> = {
    pir_passive: 1, microwave_active: 5, dual_tech: 8, ultrasonic: 4, vibration_contact: 2,
  };
  return m[t];
}

export function petImmune(t: MotionSensorType): boolean {
  const m: Record<MotionSensorType, boolean> = {
    pir_passive: true, microwave_active: false, dual_tech: true, ultrasonic: false, vibration_contact: true,
  };
  return m[t];
}

export function throughWall(t: MotionSensorType): boolean {
  const m: Record<MotionSensorType, boolean> = {
    pir_passive: false, microwave_active: true, dual_tech: false, ultrasonic: false, vibration_contact: false,
  };
  return m[t];
}

export function detectionMethod(t: MotionSensorType): string {
  const m: Record<MotionSensorType, string> = {
    pir_passive: "infrared_heat_change", microwave_active: "doppler_frequency_shift",
    dual_tech: "pir_plus_microwave_confirm", ultrasonic: "sound_wave_reflection",
    vibration_contact: "piezo_shock_detect",
  };
  return m[t];
}

export function bestInstall(t: MotionSensorType): string {
  const m: Record<MotionSensorType, string> = {
    pir_passive: "hallway_room_corner", microwave_active: "warehouse_open_area",
    dual_tech: "high_security_vault_room", ultrasonic: "enclosed_office_space",
    vibration_contact: "window_glass_break",
  };
  return m[t];
}

export function motionSensors(): MotionSensorType[] {
  return ["pir_passive", "microwave_active", "dual_tech", "ultrasonic", "vibration_contact"];
}

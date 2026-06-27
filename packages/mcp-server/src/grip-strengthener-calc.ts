export type GripStrengthenerType = "spring_coil_hand_grip" | "adjustable_dial_resistance" | "finger_band_extensor" | "putty_therapy_squeeze" | "gyroscope_ball_spin";

export function crushStrength(t: GripStrengthenerType): number {
  const m: Record<GripStrengthenerType, number> = {
    spring_coil_hand_grip: 9, adjustable_dial_resistance: 10, finger_band_extensor: 3, putty_therapy_squeeze: 5, gyroscope_ball_spin: 7,
  };
  return m[t];
}

export function fingerIsolation(t: GripStrengthenerType): number {
  const m: Record<GripStrengthenerType, number> = {
    spring_coil_hand_grip: 4, adjustable_dial_resistance: 5, finger_band_extensor: 10, putty_therapy_squeeze: 8, gyroscope_ball_spin: 3,
  };
  return m[t];
}

export function rehabSafe(t: GripStrengthenerType): number {
  const m: Record<GripStrengthenerType, number> = {
    spring_coil_hand_grip: 5, adjustable_dial_resistance: 7, finger_band_extensor: 9, putty_therapy_squeeze: 10, gyroscope_ball_spin: 6,
  };
  return m[t];
}

export function portability(t: GripStrengthenerType): number {
  const m: Record<GripStrengthenerType, number> = {
    spring_coil_hand_grip: 9, adjustable_dial_resistance: 8, finger_band_extensor: 10, putty_therapy_squeeze: 7, gyroscope_ball_spin: 8,
  };
  return m[t];
}

export function gripCost(t: GripStrengthenerType): number {
  const m: Record<GripStrengthenerType, number> = {
    spring_coil_hand_grip: 1, adjustable_dial_resistance: 2, finger_band_extensor: 1, putty_therapy_squeeze: 1, gyroscope_ball_spin: 2,
  };
  return m[t];
}

export function adjustableResist(t: GripStrengthenerType): boolean {
  const m: Record<GripStrengthenerType, boolean> = {
    spring_coil_hand_grip: false, adjustable_dial_resistance: true, finger_band_extensor: false, putty_therapy_squeeze: false, gyroscope_ball_spin: false,
  };
  return m[t];
}

export function worksExtensors(t: GripStrengthenerType): boolean {
  const m: Record<GripStrengthenerType, boolean> = {
    spring_coil_hand_grip: false, adjustable_dial_resistance: false, finger_band_extensor: true, putty_therapy_squeeze: false, gyroscope_ball_spin: false,
  };
  return m[t];
}

export function resistSource(t: GripStrengthenerType): string {
  const m: Record<GripStrengthenerType, string> = {
    spring_coil_hand_grip: "torsion_coil_spring",
    adjustable_dial_resistance: "cam_dial_mechanism",
    finger_band_extensor: "silicone_elastic_band",
    putty_therapy_squeeze: "silicone_putty_compound",
    gyroscope_ball_spin: "gyroscopic_rotor_spin",
  };
  return m[t];
}

export function bestGoal(t: GripStrengthenerType): string {
  const m: Record<GripStrengthenerType, string> = {
    spring_coil_hand_grip: "deadlift_grip_endurance",
    adjustable_dial_resistance: "progressive_strength_build",
    finger_band_extensor: "climber_tendon_balance",
    putty_therapy_squeeze: "injury_rehab_recovery",
    gyroscope_ball_spin: "wrist_forearm_endurance",
  };
  return m[t];
}

export function gripStrengtheners(): GripStrengthenerType[] {
  return ["spring_coil_hand_grip", "adjustable_dial_resistance", "finger_band_extensor", "putty_therapy_squeeze", "gyroscope_ball_spin"];
}

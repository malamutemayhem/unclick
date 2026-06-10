export type MicrophonePattern = "cardioid" | "omnidirectional" | "figure_eight" | "supercardioid" | "shotgun";

export function offAxisRejection(mic: MicrophonePattern): number {
  const m: Record<MicrophonePattern, number> = {
    cardioid: 6, omnidirectional: 0, figure_eight: 5, supercardioid: 8, shotgun: 10,
  };
  return m[mic];
}

export function pickupAngleDeg(mic: MicrophonePattern): number {
  const m: Record<MicrophonePattern, number> = {
    cardioid: 131, omnidirectional: 360, figure_eight: 90, supercardioid: 115, shotgun: 50,
  };
  return m[mic];
}

export function proximityEffect(mic: MicrophonePattern): number {
  const m: Record<MicrophonePattern, number> = {
    cardioid: 7, omnidirectional: 0, figure_eight: 9, supercardioid: 8, shotgun: 5,
  };
  return m[mic];
}

export function ambientPickup(mic: MicrophonePattern): number {
  const m: Record<MicrophonePattern, number> = {
    cardioid: 4, omnidirectional: 10, figure_eight: 5, supercardioid: 3, shotgun: 1,
  };
  return m[mic];
}

export function feedbackResistance(mic: MicrophonePattern): number {
  const m: Record<MicrophonePattern, number> = {
    cardioid: 7, omnidirectional: 2, figure_eight: 5, supercardioid: 8, shotgun: 9,
  };
  return m[mic];
}

export function pressureGradient(mic: MicrophonePattern): boolean {
  const m: Record<MicrophonePattern, boolean> = {
    cardioid: true, omnidirectional: false, figure_eight: true, supercardioid: true, shotgun: true,
  };
  return m[mic];
}

export function rearPickup(mic: MicrophonePattern): boolean {
  const m: Record<MicrophonePattern, boolean> = {
    cardioid: false, omnidirectional: true, figure_eight: true, supercardioid: true, shotgun: false,
  };
  return m[mic];
}

export function bestApplication(mic: MicrophonePattern): string {
  const m: Record<MicrophonePattern, string> = {
    cardioid: "live_vocals", omnidirectional: "room_ambience",
    figure_eight: "interview_duet", supercardioid: "stage_monitor",
    shotgun: "film_dialogue",
  };
  return m[mic];
}

export function nullPointDeg(mic: MicrophonePattern): string {
  const m: Record<MicrophonePattern, string> = {
    cardioid: "180_rear", omnidirectional: "none",
    figure_eight: "90_270_sides", supercardioid: "126_rear_sides",
    shotgun: "110_rear_sides",
  };
  return m[mic];
}

export function microphonePatterns(): MicrophonePattern[] {
  return ["cardioid", "omnidirectional", "figure_eight", "supercardioid", "shotgun"];
}

export type BrainWaveType = "delta" | "theta" | "alpha" | "beta" | "gamma";

export function frequencyHz(w: BrainWaveType): number {
  const m: Record<BrainWaveType, number> = {
    delta: 2, theta: 6, alpha: 10, beta: 20, gamma: 40,
  };
  return m[w];
}

export function amplitudeMicroV(w: BrainWaveType): number {
  const m: Record<BrainWaveType, number> = {
    delta: 200, theta: 100, alpha: 50, beta: 20, gamma: 10,
  };
  return m[w];
}

export function consciousnessLevel(w: BrainWaveType): number {
  const m: Record<BrainWaveType, number> = {
    delta: 1, theta: 3, alpha: 5, beta: 8, gamma: 10,
  };
  return m[w];
}

export function relaxationScore(w: BrainWaveType): number {
  const m: Record<BrainWaveType, number> = {
    delta: 10, theta: 8, alpha: 9, beta: 3, gamma: 2,
  };
  return m[w];
}

export function focusScore(w: BrainWaveType): number {
  const m: Record<BrainWaveType, number> = {
    delta: 1, theta: 3, alpha: 5, beta: 8, gamma: 10,
  };
  return m[w];
}

export function duringDeepSleep(w: BrainWaveType): boolean {
  const m: Record<BrainWaveType, boolean> = {
    delta: true, theta: false, alpha: false, beta: false, gamma: false,
  };
  return m[w];
}

export function meditationRelated(w: BrainWaveType): boolean {
  const m: Record<BrainWaveType, boolean> = {
    delta: false, theta: true, alpha: true, beta: false, gamma: false,
  };
  return m[w];
}

export function associatedState(w: BrainWaveType): string {
  const m: Record<BrainWaveType, string> = {
    delta: "deep_sleep", theta: "drowsiness", alpha: "relaxed_awareness",
    beta: "active_thinking", gamma: "peak_focus",
  };
  return m[w];
}

export function eegLocation(w: BrainWaveType): string {
  const m: Record<BrainWaveType, string> = {
    delta: "frontal", theta: "temporal", alpha: "occipital",
    beta: "frontal", gamma: "parietal",
  };
  return m[w];
}

export function brainWaveTypes(): BrainWaveType[] {
  return ["delta", "theta", "alpha", "beta", "gamma"];
}

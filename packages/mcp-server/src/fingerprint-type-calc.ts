export type FingerprintType = "loop" | "whorl" | "arch" | "tented_arch" | "double_loop";

export function populationPercent(f: FingerprintType): number {
  const m: Record<FingerprintType, number> = {
    loop: 60, whorl: 30, arch: 5, tented_arch: 3, double_loop: 2,
  };
  return m[f];
}

export function ridgeComplexity(f: FingerprintType): number {
  const m: Record<FingerprintType, number> = {
    loop: 5, whorl: 8, arch: 3, tented_arch: 6, double_loop: 10,
  };
  return m[f];
}

export function identificationValue(f: FingerprintType): number {
  const m: Record<FingerprintType, number> = {
    loop: 5, whorl: 7, arch: 4, tented_arch: 8, double_loop: 10,
  };
  return m[f];
}

export function minutiaeCount(f: FingerprintType): number {
  const m: Record<FingerprintType, number> = {
    loop: 80, whorl: 120, arch: 50, tented_arch: 70, double_loop: 150,
  };
  return m[f];
}

export function classificationDifficulty(f: FingerprintType): number {
  const m: Record<FingerprintType, number> = {
    loop: 2, whorl: 4, arch: 1, tented_arch: 7, double_loop: 9,
  };
  return m[f];
}

export function hasCorePoint(f: FingerprintType): boolean {
  const m: Record<FingerprintType, boolean> = {
    loop: true, whorl: true, arch: false, tented_arch: true, double_loop: true,
  };
  return m[f];
}

export function hasDelta(f: FingerprintType): boolean {
  const m: Record<FingerprintType, boolean> = {
    loop: true, whorl: true, arch: false, tented_arch: true, double_loop: true,
  };
  return m[f];
}

export function ridgeFlowPattern(f: FingerprintType): string {
  const m: Record<FingerprintType, string> = {
    loop: "recurving", whorl: "circular", arch: "wave_like",
    tented_arch: "sharp_rise", double_loop: "dual_circular",
  };
  return m[f];
}

export function henryClassification(f: FingerprintType): string {
  const m: Record<FingerprintType, string> = {
    loop: "ulnar_or_radial", whorl: "plain_whorl", arch: "plain_arch",
    tented_arch: "tented_arch", double_loop: "central_pocket",
  };
  return m[f];
}

export function fingerprintTypes(): FingerprintType[] {
  return ["loop", "whorl", "arch", "tented_arch", "double_loop"];
}

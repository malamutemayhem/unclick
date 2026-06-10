export type ReverbType = "hall" | "plate" | "spring" | "chamber" | "convolution";

export function decayTimeS(r: ReverbType): number {
  const m: Record<ReverbType, number> = {
    hall: 9, plate: 6, spring: 5, chamber: 4, convolution: 7,
  };
  return m[r];
}

export function densityScore(r: ReverbType): number {
  const m: Record<ReverbType, number> = {
    hall: 8, plate: 10, spring: 4, chamber: 7, convolution: 9,
  };
  return m[r];
}

export function naturalismScore(r: ReverbType): number {
  const m: Record<ReverbType, number> = {
    hall: 9, plate: 5, spring: 3, chamber: 8, convolution: 10,
  };
  return m[r];
}

export function cpuUsage(r: ReverbType): number {
  const m: Record<ReverbType, number> = {
    hall: 5, plate: 3, spring: 2, chamber: 4, convolution: 10,
  };
  return m[r];
}

export function colorationLevel(r: ReverbType): number {
  const m: Record<ReverbType, number> = {
    hall: 3, plate: 6, spring: 9, chamber: 4, convolution: 2,
  };
  return m[r];
}

export function physicalDevice(r: ReverbType): boolean {
  const m: Record<ReverbType, boolean> = {
    hall: false, plate: true, spring: true, chamber: true, convolution: false,
  };
  return m[r];
}

export function impulseResponseBased(r: ReverbType): boolean {
  const m: Record<ReverbType, boolean> = {
    hall: false, plate: false, spring: false, chamber: false, convolution: true,
  };
  return m[r];
}

export function bestFor(r: ReverbType): string {
  const m: Record<ReverbType, string> = {
    hall: "orchestral_vocal", plate: "drums_snare",
    spring: "guitar_vintage", chamber: "ensemble_choir",
    convolution: "realistic_spaces",
  };
  return m[r];
}

export function earlyReflections(r: ReverbType): string {
  const m: Record<ReverbType, string> = {
    hall: "delayed_diffuse", plate: "immediate_dense",
    spring: "metallic_boing", chamber: "clear_distinct",
    convolution: "captured_accurate",
  };
  return m[r];
}

export function reverbTypes(): ReverbType[] {
  return ["hall", "plate", "spring", "chamber", "convolution"];
}

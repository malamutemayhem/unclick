export type BrainLobe = "frontal" | "parietal" | "temporal" | "occipital" | "cerebellar";

export function volumePercent(l: BrainLobe): number {
  const m: Record<BrainLobe, number> = {
    frontal: 35, parietal: 20, temporal: 22, occipital: 12, cerebellar: 11,
  };
  return m[l];
}

export function corticalThicknessMm(l: BrainLobe): number {
  const m: Record<BrainLobe, number> = {
    frontal: 4.5, parietal: 4.0, temporal: 3.8, occipital: 3.5, cerebellar: 1.5,
  };
  return m[l];
}

export function bloodFlowPercent(l: BrainLobe): number {
  const m: Record<BrainLobe, number> = {
    frontal: 30, parietal: 18, temporal: 20, occipital: 15, cerebellar: 17,
  };
  return m[l];
}

export function injuryVulnerability(l: BrainLobe): number {
  const m: Record<BrainLobe, number> = {
    frontal: 9, parietal: 6, temporal: 8, occipital: 5, cerebellar: 4,
  };
  return m[l];
}

export function maturationAge(l: BrainLobe): number {
  const m: Record<BrainLobe, number> = {
    frontal: 25, parietal: 18, temporal: 20, occipital: 15, cerebellar: 16,
  };
  return m[l];
}

export function involvedInLanguage(l: BrainLobe): boolean {
  const m: Record<BrainLobe, boolean> = {
    frontal: true, parietal: false, temporal: true, occipital: false, cerebellar: false,
  };
  return m[l];
}

export function motorControl(l: BrainLobe): boolean {
  const m: Record<BrainLobe, boolean> = {
    frontal: true, parietal: false, temporal: false, occipital: false, cerebellar: true,
  };
  return m[l];
}

export function primaryFunction(l: BrainLobe): string {
  const m: Record<BrainLobe, string> = {
    frontal: "executive_function", parietal: "spatial_processing",
    temporal: "memory", occipital: "vision", cerebellar: "coordination",
  };
  return m[l];
}

export function associatedDisorder(l: BrainLobe): string {
  const m: Record<BrainLobe, string> = {
    frontal: "adhd", parietal: "neglect_syndrome",
    temporal: "amnesia", occipital: "cortical_blindness", cerebellar: "ataxia",
  };
  return m[l];
}

export function brainLobes(): BrainLobe[] {
  return ["frontal", "parietal", "temporal", "occipital", "cerebellar"];
}

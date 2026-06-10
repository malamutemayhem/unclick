export type SpeakerType = "woofer" | "tweeter" | "midrange" | "subwoofer" | "full_range";

export function frequencyLow(s: SpeakerType): number {
  const m: Record<SpeakerType, number> = {
    woofer: 8, tweeter: 1, midrange: 4, subwoofer: 10, full_range: 6,
  };
  return m[s];
}

export function frequencyHigh(s: SpeakerType): number {
  const m: Record<SpeakerType, number> = {
    woofer: 3, tweeter: 10, midrange: 6, subwoofer: 1, full_range: 7,
  };
  return m[s];
}

export function powerHandling(s: SpeakerType): number {
  const m: Record<SpeakerType, number> = {
    woofer: 8, tweeter: 3, midrange: 5, subwoofer: 10, full_range: 4,
  };
  return m[s];
}

export function coneSize(s: SpeakerType): number {
  const m: Record<SpeakerType, number> = {
    woofer: 8, tweeter: 2, midrange: 5, subwoofer: 10, full_range: 4,
  };
  return m[s];
}

export function directionalityScore(s: SpeakerType): number {
  const m: Record<SpeakerType, number> = {
    woofer: 3, tweeter: 9, midrange: 6, subwoofer: 1, full_range: 5,
  };
  return m[s];
}

export function requiresCrossover(s: SpeakerType): boolean {
  const m: Record<SpeakerType, boolean> = {
    woofer: true, tweeter: true, midrange: true, subwoofer: true, full_range: false,
  };
  return m[s];
}

export function standaloneCapable(s: SpeakerType): boolean {
  const m: Record<SpeakerType, boolean> = {
    woofer: false, tweeter: false, midrange: false, subwoofer: false, full_range: true,
  };
  return m[s];
}

export function typicalMaterial(s: SpeakerType): string {
  const m: Record<SpeakerType, string> = {
    woofer: "paper_polypropylene_kevlar", tweeter: "silk_metal_dome",
    midrange: "paper_woven_fiber", subwoofer: "aluminum_paper_composite",
    full_range: "paper_whizzer_cone",
  };
  return m[s];
}

export function bestPlacement(s: SpeakerType): string {
  const m: Record<SpeakerType, string> = {
    woofer: "cabinet_floor_standing", tweeter: "ear_level_axis",
    midrange: "cabinet_ear_level", subwoofer: "corner_floor",
    full_range: "open_baffle_cabinet",
  };
  return m[s];
}

export function speakerTypes(): SpeakerType[] {
  return ["woofer", "tweeter", "midrange", "subwoofer", "full_range"];
}

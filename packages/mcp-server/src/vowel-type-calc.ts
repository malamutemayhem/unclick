export type VowelType = "close_front" | "close_back" | "open_front" | "mid_central" | "open_back";

export function frequencyInEnglish(v: VowelType): number {
  const m: Record<VowelType, number> = {
    close_front: 7, close_back: 5, open_front: 9, mid_central: 10, open_back: 4,
  };
  return m[v];
}

export function formantF1Hz(v: VowelType): number {
  const m: Record<VowelType, number> = {
    close_front: 270, close_back: 300, open_front: 750, mid_central: 500, open_back: 700,
  };
  return m[v];
}

export function formantF2Hz(v: VowelType): number {
  const m: Record<VowelType, number> = {
    close_front: 2300, close_back: 900, open_front: 1800, mid_central: 1500, open_back: 1100,
  };
  return m[v];
}

export function mouthOpening(v: VowelType): number {
  const m: Record<VowelType, number> = {
    close_front: 2, close_back: 2, open_front: 10, mid_central: 5, open_back: 9,
  };
  return m[v];
}

export function crossLinguisticFrequency(v: VowelType): number {
  const m: Record<VowelType, number> = {
    close_front: 10, close_back: 9, open_front: 10, mid_central: 6, open_back: 7,
  };
  return m[v];
}

export function rounded(v: VowelType): boolean {
  const m: Record<VowelType, boolean> = {
    close_front: false, close_back: true, open_front: false, mid_central: false, open_back: true,
  };
  return m[v];
}

export function tongueAdvanced(v: VowelType): boolean {
  const m: Record<VowelType, boolean> = {
    close_front: true, close_back: false, open_front: true, mid_central: false, open_back: false,
  };
  return m[v];
}

export function ipaExample(v: VowelType): string {
  const m: Record<VowelType, string> = {
    close_front: "i_as_in_see", close_back: "u_as_in_boot",
    open_front: "a_as_in_cat", mid_central: "schwa_as_in_about",
    open_back: "ah_as_in_father",
  };
  return m[v];
}

export function tonguePart(v: VowelType): string {
  const m: Record<VowelType, string> = {
    close_front: "blade_raised", close_back: "dorsum_raised",
    open_front: "blade_low", mid_central: "body_neutral",
    open_back: "dorsum_low",
  };
  return m[v];
}

export function vowelTypes(): VowelType[] {
  return ["close_front", "close_back", "open_front", "mid_central", "open_back"];
}

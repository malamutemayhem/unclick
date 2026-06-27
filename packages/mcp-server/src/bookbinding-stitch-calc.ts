export type BindingStitch = "coptic" | "long_stitch" | "kettle_stitch" | "french_link" | "pamphlet";

export function holesPerSignature(stitch: BindingStitch): number {
  const h: Record<BindingStitch, number> = {
    coptic: 5, long_stitch: 7, kettle_stitch: 5, french_link: 5, pamphlet: 3,
  };
  return h[stitch];
}

export function threadLengthMultiplier(stitch: BindingStitch): number {
  const t: Record<BindingStitch, number> = {
    coptic: 4, long_stitch: 3, kettle_stitch: 2.5, french_link: 3.5, pamphlet: 2,
  };
  return t[stitch];
}

export function spineFlexibility(stitch: BindingStitch): number {
  const f: Record<BindingStitch, number> = {
    coptic: 10, long_stitch: 8, kettle_stitch: 6, french_link: 7, pamphlet: 9,
  };
  return f[stitch];
}

export function layFlatRating(stitch: BindingStitch): number {
  const l: Record<BindingStitch, number> = {
    coptic: 10, long_stitch: 8, kettle_stitch: 5, french_link: 6, pamphlet: 9,
  };
  return l[stitch];
}

export function decorativeSpine(stitch: BindingStitch): boolean {
  return stitch === "coptic" || stitch === "long_stitch";
}

export function maxSignatures(stitch: BindingStitch): number {
  const m: Record<BindingStitch, number> = {
    coptic: 30, long_stitch: 20, kettle_stitch: 50, french_link: 40, pamphlet: 1,
  };
  return m[stitch];
}

export function strengthRating(stitch: BindingStitch): number {
  const s: Record<BindingStitch, number> = {
    coptic: 8, long_stitch: 6, kettle_stitch: 9, french_link: 9, pamphlet: 3,
  };
  return s[stitch];
}

export function difficultyRating(stitch: BindingStitch): number {
  const d: Record<BindingStitch, number> = {
    coptic: 6, long_stitch: 4, kettle_stitch: 5, french_link: 7, pamphlet: 1,
  };
  return d[stitch];
}

export function timePerSignatureMinutes(stitch: BindingStitch): number {
  const t: Record<BindingStitch, number> = {
    coptic: 8, long_stitch: 6, kettle_stitch: 4, french_link: 7, pamphlet: 10,
  };
  return t[stitch];
}

export function bindingStitches(): BindingStitch[] {
  return ["coptic", "long_stitch", "kettle_stitch", "french_link", "pamphlet"];
}

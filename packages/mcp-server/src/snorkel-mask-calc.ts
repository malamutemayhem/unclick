export type SnorkelMaskType = "traditional_two_piece" | "full_face_panoramic" | "low_volume_freedive" | "prescription_corrective" | "kid_junior_fit";

export function fieldOfView(t: SnorkelMaskType): number {
  const m: Record<SnorkelMaskType, number> = {
    traditional_two_piece: 7, full_face_panoramic: 10, low_volume_freedive: 6, prescription_corrective: 7, kid_junior_fit: 5,
  };
  return m[t];
}

export function sealQuality(t: SnorkelMaskType): number {
  const m: Record<SnorkelMaskType, number> = {
    traditional_two_piece: 8, full_face_panoramic: 7, low_volume_freedive: 10, prescription_corrective: 8, kid_junior_fit: 6,
  };
  return m[t];
}

export function diveDepth(t: SnorkelMaskType): number {
  const m: Record<SnorkelMaskType, number> = {
    traditional_two_piece: 8, full_face_panoramic: 4, low_volume_freedive: 10, prescription_corrective: 7, kid_junior_fit: 3,
  };
  return m[t];
}

export function breathingEase(t: SnorkelMaskType): number {
  const m: Record<SnorkelMaskType, number> = {
    traditional_two_piece: 7, full_face_panoramic: 10, low_volume_freedive: 5, prescription_corrective: 7, kid_junior_fit: 8,
  };
  return m[t];
}

export function maskCost(t: SnorkelMaskType): number {
  const m: Record<SnorkelMaskType, number> = {
    traditional_two_piece: 4, full_face_panoramic: 7, low_volume_freedive: 8, prescription_corrective: 9, kid_junior_fit: 3,
  };
  return m[t];
}

export function fogResistant(t: SnorkelMaskType): boolean {
  const m: Record<SnorkelMaskType, boolean> = {
    traditional_two_piece: false, full_face_panoramic: true, low_volume_freedive: false, prescription_corrective: false, kid_junior_fit: true,
  };
  return m[t];
}

export function noseEqualize(t: SnorkelMaskType): boolean {
  const m: Record<SnorkelMaskType, boolean> = {
    traditional_two_piece: true, full_face_panoramic: false, low_volume_freedive: true, prescription_corrective: true, kid_junior_fit: false,
  };
  return m[t];
}

export function lensType(t: SnorkelMaskType): string {
  const m: Record<SnorkelMaskType, string> = {
    traditional_two_piece: "tempered_glass_dual",
    full_face_panoramic: "polycarbonate_single_dome",
    low_volume_freedive: "tempered_glass_ultra_clear",
    prescription_corrective: "optical_lens_custom_diopter",
    kid_junior_fit: "shatter_proof_poly",
  };
  return m[t];
}

export function bestUse(t: SnorkelMaskType): string {
  const m: Record<SnorkelMaskType, string> = {
    traditional_two_piece: "reef_snorkel_scuba",
    full_face_panoramic: "surface_snorkel_casual",
    low_volume_freedive: "deep_freedive_spearfish",
    prescription_corrective: "vision_corrected_dive",
    kid_junior_fit: "shallow_family_snorkel",
  };
  return m[t];
}

export function snorkelMasks(): SnorkelMaskType[] {
  return ["traditional_two_piece", "full_face_panoramic", "low_volume_freedive", "prescription_corrective", "kid_junior_fit"];
}

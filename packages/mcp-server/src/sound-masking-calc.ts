export type SoundMaskingType =
  | "in_plenum_speaker"
  | "direct_field_ceiling"
  | "networked_zone_ip"
  | "desktop_personal_unit"
  | "outdoor_landscape_mask";

interface SoundMaskingData {
  coverage: number;
  uniformity: number;
  adjustability: number;
  aesthetic: number;
  smCost: number;
  networked: boolean;
  forOpenOffice: boolean;
  speaker: string;
  bestUse: string;
}

const DATA: Record<SoundMaskingType, SoundMaskingData> = {
  in_plenum_speaker: {
    coverage: 9, uniformity: 9, adjustability: 7, aesthetic: 10, smCost: 7,
    networked: false, forOpenOffice: true,
    speaker: "upward_facing_plenum_reflect",
    bestUse: "open_office_dropped_ceiling",
  },
  direct_field_ceiling: {
    coverage: 8, uniformity: 7, adjustability: 8, aesthetic: 8, smCost: 5,
    networked: false, forOpenOffice: true,
    speaker: "downward_facing_ceiling_mount",
    bestUse: "exposed_ceiling_no_plenum",
  },
  networked_zone_ip: {
    coverage: 10, uniformity: 10, adjustability: 10, aesthetic: 9, smCost: 9,
    networked: true, forOpenOffice: true,
    speaker: "ip_addressable_zone_speaker",
    bestUse: "large_campus_multi_zone_control",
  },
  desktop_personal_unit: {
    coverage: 3, uniformity: 5, adjustability: 9, aesthetic: 6, smCost: 2,
    networked: false, forOpenOffice: false,
    speaker: "desktop_tabletop_small_unit",
    bestUse: "private_office_therapy_room",
  },
  outdoor_landscape_mask: {
    coverage: 7, uniformity: 6, adjustability: 6, aesthetic: 9, smCost: 6,
    networked: false, forOpenOffice: false,
    speaker: "landscape_rock_bollard_speaker",
    bestUse: "outdoor_patio_courtyard_mask",
  },
};

function get(t: SoundMaskingType): SoundMaskingData {
  return DATA[t];
}

export const coverage = (t: SoundMaskingType) => get(t).coverage;
export const uniformity = (t: SoundMaskingType) => get(t).uniformity;
export const adjustability = (t: SoundMaskingType) => get(t).adjustability;
export const aesthetic = (t: SoundMaskingType) => get(t).aesthetic;
export const smCost = (t: SoundMaskingType) => get(t).smCost;
export const networked = (t: SoundMaskingType) => get(t).networked;
export const forOpenOffice = (t: SoundMaskingType) => get(t).forOpenOffice;
export const speaker = (t: SoundMaskingType) => get(t).speaker;
export const bestUse = (t: SoundMaskingType) => get(t).bestUse;
export const soundMaskingTypes = (): SoundMaskingType[] =>
  Object.keys(DATA) as SoundMaskingType[];

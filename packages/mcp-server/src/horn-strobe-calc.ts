export type HornStrobeType =
  | "wall_mount_horn_strobe"
  | "ceiling_mount_strobe"
  | "speaker_strobe_voice"
  | "mini_horn_compact"
  | "high_power_outdoor";

interface HornStrobeData {
  audible: number;
  visible: number;
  coverage: number;
  aesthetic: number;
  hsCost: number;
  voiceCapable: boolean;
  forAda: boolean;
  candela: string;
  bestUse: string;
}

const DATA: Record<HornStrobeType, HornStrobeData> = {
  wall_mount_horn_strobe: {
    audible: 8, visible: 8, coverage: 7, aesthetic: 5, hsCost: 4,
    voiceCapable: false, forAda: true,
    candela: "15_30_75_110_cd_selectable",
    bestUse: "standard_corridor_office_room",
  },
  ceiling_mount_strobe: {
    audible: 2, visible: 9, coverage: 9, aesthetic: 8, hsCost: 5,
    voiceCapable: false, forAda: true,
    candela: "15_30_60_95_115_cd_ceiling",
    bestUse: "open_plan_ada_visual_only",
  },
  speaker_strobe_voice: {
    audible: 10, visible: 8, coverage: 8, aesthetic: 5, hsCost: 8,
    voiceCapable: true, forAda: true,
    candela: "15_30_75_110_cd_with_speaker",
    bestUse: "high_rise_mass_notification",
  },
  mini_horn_compact: {
    audible: 6, visible: 6, coverage: 4, aesthetic: 9, hsCost: 3,
    voiceCapable: false, forAda: true,
    candela: "15_cd_fixed_compact",
    bestUse: "hotel_room_small_office",
  },
  high_power_outdoor: {
    audible: 10, visible: 10, coverage: 10, aesthetic: 3, hsCost: 9,
    voiceCapable: true, forAda: false,
    candela: "135_185_cd_weatherproof",
    bestUse: "parking_lot_campus_outdoor",
  },
};

function get(t: HornStrobeType): HornStrobeData {
  return DATA[t];
}

export const audible = (t: HornStrobeType) => get(t).audible;
export const visible = (t: HornStrobeType) => get(t).visible;
export const coverage = (t: HornStrobeType) => get(t).coverage;
export const aesthetic = (t: HornStrobeType) => get(t).aesthetic;
export const hsCost = (t: HornStrobeType) => get(t).hsCost;
export const voiceCapable = (t: HornStrobeType) => get(t).voiceCapable;
export const forAda = (t: HornStrobeType) => get(t).forAda;
export const candela = (t: HornStrobeType) => get(t).candela;
export const bestUse = (t: HornStrobeType) => get(t).bestUse;
export const hornStrobeTypes = (): HornStrobeType[] =>
  Object.keys(DATA) as HornStrobeType[];

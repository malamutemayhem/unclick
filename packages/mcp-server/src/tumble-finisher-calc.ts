export type TumbleFinisherType =
  | "vibratory_bowl"
  | "rotary_barrel"
  | "centrifugal_disc"
  | "drag_finish"
  | "high_energy_centrifugal";

interface TumbleFinisherData {
  surfaceFinish: number;
  throughput: number;
  mediaRange: number;
  partSafety: number;
  tfCost_: number;
  gentle: boolean;
  forPrecision: boolean;
  finisherConfig: string;
  bestUse: string;
}

const DATA: Record<TumbleFinisherType, TumbleFinisherData> = {
  vibratory_bowl: {
    surfaceFinish: 7, throughput: 8, mediaRange: 8, partSafety: 7, tfCost_: 4,
    gentle: false, forPrecision: false,
    finisherConfig: "vibratory_bowl_tumble_finisher_ceramic_media_deburr_polish_mass",
    bestUse: "general_deburr_vibratory_bowl_tumble_finisher_ceramic_media",
  },
  rotary_barrel: {
    surfaceFinish: 6, throughput: 7, mediaRange: 7, partSafety: 6, tfCost_: 3,
    gentle: false, forPrecision: false,
    finisherConfig: "rotary_barrel_tumble_finisher_drum_rotate_bulk_deburr_simple",
    bestUse: "bulk_part_rotary_barrel_tumble_finisher_drum_deburr_descale",
  },
  centrifugal_disc: {
    surfaceFinish: 9, throughput: 9, mediaRange: 8, partSafety: 8, tfCost_: 7,
    gentle: false, forPrecision: true,
    finisherConfig: "centrifugal_disc_tumble_finisher_high_speed_rotate_fast_cycle",
    bestUse: "jewelry_coin_centrifugal_disc_tumble_finisher_fast_high_luster",
  },
  drag_finish: {
    surfaceFinish: 10, throughput: 4, mediaRange: 7, partSafety: 10, tfCost_: 9,
    gentle: true, forPrecision: true,
    finisherConfig: "drag_tumble_finisher_spindle_mount_pull_through_media_isotropic",
    bestUse: "gear_implant_drag_tumble_finisher_spindle_isotropic_super_finish",
  },
  high_energy_centrifugal: {
    surfaceFinish: 9, throughput: 6, mediaRange: 8, partSafety: 7, tfCost_: 8,
    gentle: false, forPrecision: true,
    finisherConfig: "high_energy_centrifugal_tumble_finisher_barrel_spin_orbit_fast",
    bestUse: "aerospace_part_high_energy_centrifugal_tumble_finisher_fast",
  },
};

function get(t: TumbleFinisherType): TumbleFinisherData {
  return DATA[t];
}

export const surfaceFinish = (t: TumbleFinisherType) => get(t).surfaceFinish;
export const throughput = (t: TumbleFinisherType) => get(t).throughput;
export const mediaRange = (t: TumbleFinisherType) => get(t).mediaRange;
export const partSafety = (t: TumbleFinisherType) => get(t).partSafety;
export const tfCost_ = (t: TumbleFinisherType) => get(t).tfCost_;
export const gentle = (t: TumbleFinisherType) => get(t).gentle;
export const forPrecision = (t: TumbleFinisherType) => get(t).forPrecision;
export const finisherConfig = (t: TumbleFinisherType) => get(t).finisherConfig;
export const bestUse = (t: TumbleFinisherType) => get(t).bestUse;
export const tumbleFinisherTypes = (): TumbleFinisherType[] =>
  Object.keys(DATA) as TumbleFinisherType[];

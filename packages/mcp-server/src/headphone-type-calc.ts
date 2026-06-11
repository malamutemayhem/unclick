export type HeadphoneType =
  | "over_ear_open_back"
  | "over_ear_closed_back"
  | "on_ear_supra_aural"
  | "in_ear_monitor_iem"
  | "bone_conduction_vibration";

const DATA: Record<HeadphoneType, {
  soundstage: number; isolation: number; comfort: number;
  portability: number; hpCost: number; wireless: boolean;
  forMixing: boolean; driver: string; bestUse: string;
}> = {
  over_ear_open_back: {
    soundstage: 10, isolation: 2, comfort: 9,
    portability: 3, hpCost: 4, wireless: false,
    forMixing: true, driver: "dynamic_planar_open_grille",
    bestUse: "critical_listening_studio_mixing",
  },
  over_ear_closed_back: {
    soundstage: 6, isolation: 9, comfort: 8,
    portability: 4, hpCost: 3, wireless: false,
    forMixing: true, driver: "dynamic_sealed_cup_pad",
    bestUse: "tracking_recording_noisy_environ",
  },
  on_ear_supra_aural: {
    soundstage: 5, isolation: 5, comfort: 5,
    portability: 7, hpCost: 2, wireless: true,
    forMixing: false, driver: "dynamic_small_on_ear_pad",
    bestUse: "portable_commute_casual_listen",
  },
  in_ear_monitor_iem: {
    soundstage: 4, isolation: 10, comfort: 6,
    portability: 10, hpCost: 3, wireless: false,
    forMixing: false, driver: "balanced_armature_multi_driver",
    bestUse: "live_stage_musician_monitoring",
  },
  bone_conduction_vibration: {
    soundstage: 3, isolation: 1, comfort: 7,
    portability: 9, hpCost: 2, wireless: true,
    forMixing: false, driver: "piezo_transducer_cheekbone",
    bestUse: "outdoor_sport_situational_aware",
  },
};

const get = (t: HeadphoneType) => DATA[t];

export const soundstage = (t: HeadphoneType) => get(t).soundstage;
export const isolation = (t: HeadphoneType) => get(t).isolation;
export const comfort = (t: HeadphoneType) => get(t).comfort;
export const portability = (t: HeadphoneType) => get(t).portability;
export const hpCost = (t: HeadphoneType) => get(t).hpCost;
export const wireless = (t: HeadphoneType) => get(t).wireless;
export const forMixing = (t: HeadphoneType) => get(t).forMixing;
export const driver = (t: HeadphoneType) => get(t).driver;
export const bestUse = (t: HeadphoneType) => get(t).bestUse;
export const headphoneTypes = (): HeadphoneType[] => Object.keys(DATA) as HeadphoneType[];

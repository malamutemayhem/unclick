export type MicrophoneType =
  | "dynamic_moving_coil"
  | "condenser_large_diaphragm"
  | "ribbon_velocity_gradient"
  | "electret_mems_miniature"
  | "shotgun_interference_tube";

const DATA: Record<MicrophoneType, {
  sensitivity: number; frequency: number; selfNoise: number;
  durability: number; mcCost: number; phantomPower: boolean;
  forLive: boolean; transducer: string; bestUse: string;
}> = {
  dynamic_moving_coil: {
    sensitivity: 5, frequency: 6, selfNoise: 7,
    durability: 10, mcCost: 2, phantomPower: false,
    forLive: true, transducer: "electromagnetic_voice_coil",
    bestUse: "live_vocal_loud_source_stage",
  },
  condenser_large_diaphragm: {
    sensitivity: 10, frequency: 9, selfNoise: 4,
    durability: 5, mcCost: 4, phantomPower: true,
    forLive: false, transducer: "capacitor_polarized_backplate",
    bestUse: "studio_vocal_acoustic_detail",
  },
  ribbon_velocity_gradient: {
    sensitivity: 8, frequency: 9, selfNoise: 5,
    durability: 3, mcCost: 5, phantomPower: false,
    forLive: false, transducer: "thin_metal_ribbon_magnetic",
    bestUse: "studio_warm_tone_brass_strings",
  },
  electret_mems_miniature: {
    sensitivity: 6, frequency: 7, selfNoise: 6,
    durability: 8, mcCost: 1, phantomPower: false,
    forLive: true, transducer: "permanently_charged_capacitor",
    bestUse: "lavalier_phone_headset_iot",
  },
  shotgun_interference_tube: {
    sensitivity: 9, frequency: 7, selfNoise: 5,
    durability: 7, mcCost: 4, phantomPower: true,
    forLive: true, transducer: "condenser_slotted_tube_cancel",
    bestUse: "film_dialog_broadcast_boom_pole",
  },
};

const get = (t: MicrophoneType) => DATA[t];

export const sensitivity = (t: MicrophoneType) => get(t).sensitivity;
export const frequency = (t: MicrophoneType) => get(t).frequency;
export const selfNoise = (t: MicrophoneType) => get(t).selfNoise;
export const durability = (t: MicrophoneType) => get(t).durability;
export const mcCost = (t: MicrophoneType) => get(t).mcCost;
export const phantomPower = (t: MicrophoneType) => get(t).phantomPower;
export const forLive = (t: MicrophoneType) => get(t).forLive;
export const transducer = (t: MicrophoneType) => get(t).transducer;
export const bestUse = (t: MicrophoneType) => get(t).bestUse;
export const microphoneTypes = (): MicrophoneType[] => Object.keys(DATA) as MicrophoneType[];

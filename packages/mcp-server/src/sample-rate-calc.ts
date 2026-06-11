export type SampleRate =
  | "sr_8k_narrowband"
  | "sr_44k1_cd_audio"
  | "sr_48k_broadcast"
  | "sr_96k_hi_res"
  | "sr_192k_mastering";

const DATA: Record<SampleRate, {
  fidelity: number; bandwidth: number; storage: number;
  compatibility: number; srCost: number; lossless: boolean;
  forVoice: boolean; standard: string; bestUse: string;
}> = {
  sr_8k_narrowband: {
    fidelity: 2, bandwidth: 2, storage: 10,
    compatibility: 9, srCost: 1, lossless: false,
    forVoice: true, standard: "g711_telephony_pcm",
    bestUse: "voip_telephony_basic",
  },
  sr_44k1_cd_audio: {
    fidelity: 7, bandwidth: 7, storage: 6,
    compatibility: 10, srCost: 3, lossless: true,
    forVoice: false, standard: "red_book_cd_da",
    bestUse: "consumer_music_playback",
  },
  sr_48k_broadcast: {
    fidelity: 7, bandwidth: 7, storage: 6,
    compatibility: 9, srCost: 3, lossless: true,
    forVoice: false, standard: "aes3_ebu_broadcast",
    bestUse: "film_tv_post_production",
  },
  sr_96k_hi_res: {
    fidelity: 9, bandwidth: 9, storage: 4,
    compatibility: 6, srCost: 5, lossless: true,
    forVoice: false, standard: "dvd_audio_bluray",
    bestUse: "studio_tracking_mixing",
  },
  sr_192k_mastering: {
    fidelity: 10, bandwidth: 10, storage: 2,
    compatibility: 4, srCost: 7, lossless: true,
    forVoice: false, standard: "dxd_sacd_archive",
    bestUse: "archival_mastering_dsd",
  },
};

const get = (t: SampleRate) => DATA[t];

export const fidelity = (t: SampleRate) => get(t).fidelity;
export const bandwidth = (t: SampleRate) => get(t).bandwidth;
export const storage = (t: SampleRate) => get(t).storage;
export const compatibility = (t: SampleRate) => get(t).compatibility;
export const srCost = (t: SampleRate) => get(t).srCost;
export const lossless = (t: SampleRate) => get(t).lossless;
export const forVoice = (t: SampleRate) => get(t).forVoice;
export const standard = (t: SampleRate) => get(t).standard;
export const bestUse = (t: SampleRate) => get(t).bestUse;
export const sampleRates = (): SampleRate[] => Object.keys(DATA) as SampleRate[];

export type AudioCodec =
  | "pcm_i2s_tdm"
  | "sigma_delta_pdm"
  | "class_d_amp"
  | "codec_dsp_combo"
  | "mems_mic_asic";

const DATA: Record<AudioCodec, {
  snr: number; thd: number; dynamicRange: number;
  powerDraw: number; codecCost: number; digital: boolean;
  forVoice: boolean; interface_: string; bestUse: string;
}> = {
  pcm_i2s_tdm: {
    snr: 9, thd: 9, dynamicRange: 9,
    powerDraw: 5, codecCost: 6, digital: false,
    forVoice: false, interface_: "i2s_tdm_sai",
    bestUse: "studio_recording_adc",
  },
  sigma_delta_pdm: {
    snr: 7, thd: 7, dynamicRange: 7,
    powerDraw: 8, codecCost: 3, digital: true,
    forVoice: true, interface_: "pdm_1bit_stream",
    bestUse: "mems_mic_digital_out",
  },
  class_d_amp: {
    snr: 6, thd: 5, dynamicRange: 6,
    powerDraw: 9, codecCost: 4, digital: false,
    forVoice: false, interface_: "pwm_h_bridge_out",
    bestUse: "portable_speaker_amp",
  },
  codec_dsp_combo: {
    snr: 8, thd: 8, dynamicRange: 8,
    powerDraw: 4, codecCost: 8, digital: false,
    forVoice: true, interface_: "i2s_plus_dsp_core",
    bestUse: "smart_speaker_anc",
  },
  mems_mic_asic: {
    snr: 7, thd: 6, dynamicRange: 8,
    powerDraw: 10, codecCost: 5, digital: true,
    forVoice: true, interface_: "pdm_or_i2s_mono",
    bestUse: "tws_earbud_mic",
  },
};

const get = (t: AudioCodec) => DATA[t];

export const snr = (t: AudioCodec) => get(t).snr;
export const thd = (t: AudioCodec) => get(t).thd;
export const dynamicRange = (t: AudioCodec) => get(t).dynamicRange;
export const powerDraw = (t: AudioCodec) => get(t).powerDraw;
export const codecCost = (t: AudioCodec) => get(t).codecCost;
export const digital = (t: AudioCodec) => get(t).digital;
export const forVoice = (t: AudioCodec) => get(t).forVoice;
export const interface_ = (t: AudioCodec) => get(t).interface_;
export const bestUse = (t: AudioCodec) => get(t).bestUse;
export const audioCodecs = (): AudioCodec[] => Object.keys(DATA) as AudioCodec[];

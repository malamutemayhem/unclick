export type AudioDspType =
  | "conference_room_aec"
  | "paging_zone_mixer"
  | "dante_networked_pro"
  | "install_amp_dsp_combo"
  | "live_venue_matrix";

interface AudioDspData {
  channels: number;
  processing: number;
  flexibility: number;
  latency: number;
  adCost: number;
  networked: boolean;
  forLive: boolean;
  protocol: string;
  bestUse: string;
}

const DATA: Record<AudioDspType, AudioDspData> = {
  conference_room_aec: {
    channels: 4, processing: 7, flexibility: 5, latency: 8, adCost: 5,
    networked: true, forLive: false,
    protocol: "usb_dante_aec_beam_tracking",
    bestUse: "conference_room_huddle_space",
  },
  paging_zone_mixer: {
    channels: 5, processing: 5, flexibility: 6, latency: 7, adCost: 3,
    networked: false, forLive: false,
    protocol: "analog_zone_mixer_priority",
    bestUse: "school_hospital_paging_system",
  },
  dante_networked_pro: {
    channels: 9, processing: 9, flexibility: 10, latency: 9, adCost: 8,
    networked: true, forLive: false,
    protocol: "dante_avb_64x64_ethernet",
    bestUse: "campus_distributed_audio_net",
  },
  install_amp_dsp_combo: {
    channels: 6, processing: 6, flexibility: 7, latency: 7, adCost: 4,
    networked: false, forLive: false,
    protocol: "built_in_4ch_class_d_amp_dsp",
    bestUse: "restaurant_retail_bgm_system",
  },
  live_venue_matrix: {
    channels: 10, processing: 10, flexibility: 9, latency: 10, adCost: 10,
    networked: true, forLive: true,
    protocol: "madi_dante_96k_matrix_router",
    bestUse: "theater_arena_live_production",
  },
};

function get(t: AudioDspType): AudioDspData {
  return DATA[t];
}

export const channels = (t: AudioDspType) => get(t).channels;
export const processing = (t: AudioDspType) => get(t).processing;
export const flexibility = (t: AudioDspType) => get(t).flexibility;
export const latency = (t: AudioDspType) => get(t).latency;
export const adCost = (t: AudioDspType) => get(t).adCost;
export const networked = (t: AudioDspType) => get(t).networked;
export const forLive = (t: AudioDspType) => get(t).forLive;
export const protocol = (t: AudioDspType) => get(t).protocol;
export const bestUse = (t: AudioDspType) => get(t).bestUse;
export const audioDspTypes = (): AudioDspType[] =>
  Object.keys(DATA) as AudioDspType[];

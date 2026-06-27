export type SausageStufferType =
  | "hydraulic_piston"
  | "gear_pump"
  | "vacuum_filler"
  | "hand_crank"
  | "continuous_link";

interface SausageStufferData {
  fillAccuracy: number;
  throughput: number;
  airRemoval: number;
  casingRange: number;
  ssCost: number;
  automated: boolean;
  forSmoked: boolean;
  stufferConfig: string;
  bestUse: string;
}

const DATA: Record<SausageStufferType, SausageStufferData> = {
  hydraulic_piston: {
    fillAccuracy: 9, throughput: 8, airRemoval: 8, casingRange: 9, ssCost: 7,
    automated: true, forSmoked: true,
    stufferConfig: "hydraulic_piston_sausage_stuffer_ram_press_uniform_fill_density",
    bestUse: "commercial_sausage_hydraulic_piston_stuffer_consistent_fill_weight",
  },
  gear_pump: {
    fillAccuracy: 8, throughput: 10, airRemoval: 7, casingRange: 8, ssCost: 8,
    automated: true, forSmoked: true,
    stufferConfig: "gear_pump_sausage_stuffer_positive_displacement_continuous_flow",
    bestUse: "high_volume_sausage_gear_pump_stuffer_continuous_production_line",
  },
  vacuum_filler: {
    fillAccuracy: 10, throughput: 9, airRemoval: 10, casingRange: 10, ssCost: 10,
    automated: true, forSmoked: true,
    stufferConfig: "vacuum_filler_sausage_stuffer_deaerate_portion_clip_link_auto",
    bestUse: "premium_sausage_vacuum_filler_no_air_pocket_precise_portion",
  },
  hand_crank: {
    fillAccuracy: 6, throughput: 4, airRemoval: 5, casingRange: 7, ssCost: 3,
    automated: false, forSmoked: true,
    stufferConfig: "hand_crank_sausage_stuffer_manual_piston_small_batch_artisan",
    bestUse: "artisan_sausage_hand_crank_stuffer_small_batch_craft_production",
  },
  continuous_link: {
    fillAccuracy: 9, throughput: 10, airRemoval: 8, casingRange: 7, ssCost: 9,
    automated: true, forSmoked: false,
    stufferConfig: "continuous_link_sausage_stuffer_auto_twist_portion_conveyor",
    bestUse: "industrial_sausage_continuous_linker_auto_twist_high_speed_line",
  },
};

function get(t: SausageStufferType): SausageStufferData {
  return DATA[t];
}

export const fillAccuracy = (t: SausageStufferType) => get(t).fillAccuracy;
export const throughput = (t: SausageStufferType) => get(t).throughput;
export const airRemoval = (t: SausageStufferType) => get(t).airRemoval;
export const casingRange = (t: SausageStufferType) => get(t).casingRange;
export const ssCost = (t: SausageStufferType) => get(t).ssCost;
export const automated = (t: SausageStufferType) => get(t).automated;
export const forSmoked = (t: SausageStufferType) => get(t).forSmoked;
export const stufferConfig = (t: SausageStufferType) => get(t).stufferConfig;
export const bestUse = (t: SausageStufferType) => get(t).bestUse;
export const sausageStufferTypes = (): SausageStufferType[] =>
  Object.keys(DATA) as SausageStufferType[];

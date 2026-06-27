export type VideoIntercomType =
  | "ip_sip_surface_mount"
  | "analog_2_wire_flush"
  | "wireless_wifi_battery"
  | "multi_tenant_lobby"
  | "industrial_vandal_proof";

interface VideoIntercomData {
  videoQuality: number;
  audioClarity: number;
  durability: number;
  integration: number;
  viCost: number;
  twoWayVideo: boolean;
  forMultiTenant: boolean;
  protocol: string;
  bestUse: string;
}

const DATA: Record<VideoIntercomType, VideoIntercomData> = {
  ip_sip_surface_mount: {
    videoQuality: 9, audioClarity: 9, durability: 8, integration: 10, viCost: 7,
    twoWayVideo: true, forMultiTenant: false,
    protocol: "sip_h264_poe_onvif",
    bestUse: "office_entrance_ip_system",
  },
  analog_2_wire_flush: {
    videoQuality: 5, audioClarity: 7, durability: 8, integration: 3, viCost: 3,
    twoWayVideo: false, forMultiTenant: false,
    protocol: "analog_2_wire_cctv_bus",
    bestUse: "residential_single_family",
  },
  wireless_wifi_battery: {
    videoQuality: 7, audioClarity: 7, durability: 6, integration: 7, viCost: 4,
    twoWayVideo: true, forMultiTenant: false,
    protocol: "wifi_cloud_app_p2p_stream",
    bestUse: "diy_doorbell_home_retrofit",
  },
  multi_tenant_lobby: {
    videoQuality: 8, audioClarity: 9, durability: 9, integration: 8, viCost: 9,
    twoWayVideo: true, forMultiTenant: true,
    protocol: "ip_directory_sip_trunk",
    bestUse: "apartment_condo_lobby_entry",
  },
  industrial_vandal_proof: {
    videoQuality: 7, audioClarity: 8, durability: 10, integration: 6, viCost: 6,
    twoWayVideo: true, forMultiTenant: false,
    protocol: "sip_stainless_ik10_ip66",
    bestUse: "parking_garage_loading_dock",
  },
};

function get(t: VideoIntercomType): VideoIntercomData {
  return DATA[t];
}

export const videoQuality = (t: VideoIntercomType) => get(t).videoQuality;
export const audioClarity = (t: VideoIntercomType) => get(t).audioClarity;
export const durability = (t: VideoIntercomType) => get(t).durability;
export const integration = (t: VideoIntercomType) => get(t).integration;
export const viCost = (t: VideoIntercomType) => get(t).viCost;
export const twoWayVideo = (t: VideoIntercomType) => get(t).twoWayVideo;
export const forMultiTenant = (t: VideoIntercomType) => get(t).forMultiTenant;
export const protocol = (t: VideoIntercomType) => get(t).protocol;
export const bestUse = (t: VideoIntercomType) => get(t).bestUse;
export const videoIntercomTypes = (): VideoIntercomType[] =>
  Object.keys(DATA) as VideoIntercomType[];

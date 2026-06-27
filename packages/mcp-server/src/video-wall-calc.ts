export type VideoWallType =
  | "lcd_narrow_bezel"
  | "led_direct_view"
  | "rear_projection_cube"
  | "micro_led_fine_pitch"
  | "oled_flexible_curved";

interface VideoWallData {
  resolution: number;
  brightness: number;
  seamless: number;
  longevity: number;
  vwCost: number;
  indoor: boolean;
  forControlRoom: boolean;
  pixel: string;
  bestUse: string;
}

const DATA: Record<VideoWallType, VideoWallData> = {
  lcd_narrow_bezel: {
    resolution: 8, brightness: 7, seamless: 6, longevity: 7, vwCost: 4,
    indoor: true, forControlRoom: false,
    pixel: "lcd_ips_55in_0_88mm_bezel",
    bestUse: "corporate_lobby_retail_display",
  },
  led_direct_view: {
    resolution: 7, brightness: 10, seamless: 10, longevity: 9, vwCost: 7,
    indoor: false, forControlRoom: false,
    pixel: "smd_led_module_p2_5_outdoor",
    bestUse: "stadium_billboard_outdoor_sign",
  },
  rear_projection_cube: {
    resolution: 8, brightness: 6, seamless: 8, longevity: 10, vwCost: 8,
    indoor: true, forControlRoom: true,
    pixel: "dlp_rear_proj_67in_led_illum",
    bestUse: "noc_control_room_24_7_ops",
  },
  micro_led_fine_pitch: {
    resolution: 10, brightness: 9, seamless: 10, longevity: 9, vwCost: 10,
    indoor: true, forControlRoom: true,
    pixel: "micro_led_cob_p0_9_fine_pitch",
    bestUse: "broadcast_studio_command_ctr",
  },
  oled_flexible_curved: {
    resolution: 9, brightness: 7, seamless: 9, longevity: 6, vwCost: 9,
    indoor: true, forControlRoom: false,
    pixel: "oled_flexible_55in_curved_3mm",
    bestUse: "museum_exhibit_luxury_install",
  },
};

function get(t: VideoWallType): VideoWallData {
  return DATA[t];
}

export const resolution = (t: VideoWallType) => get(t).resolution;
export const brightness = (t: VideoWallType) => get(t).brightness;
export const seamless = (t: VideoWallType) => get(t).seamless;
export const longevity = (t: VideoWallType) => get(t).longevity;
export const vwCost = (t: VideoWallType) => get(t).vwCost;
export const indoor = (t: VideoWallType) => get(t).indoor;
export const forControlRoom = (t: VideoWallType) => get(t).forControlRoom;
export const pixel = (t: VideoWallType) => get(t).pixel;
export const bestUse = (t: VideoWallType) => get(t).bestUse;
export const videoWallTypes = (): VideoWallType[] =>
  Object.keys(DATA) as VideoWallType[];

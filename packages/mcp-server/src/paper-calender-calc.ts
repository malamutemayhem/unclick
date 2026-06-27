export type PaperCalenderType =
  | "machine_calender"
  | "supercalender"
  | "soft_nip"
  | "multinip_online"
  | "shoe_calender";

interface PaperCalenderData {
  glossLevel: number;
  smoothness: number;
  bulkPreserve: number;
  lineSpeed: number;
  pcCost: number;
  online: boolean;
  forCoated: boolean;
  calenderConfig: string;
  bestUse: string;
}

const DATA: Record<PaperCalenderType, PaperCalenderData> = {
  machine_calender: {
    glossLevel: 5, smoothness: 6, bulkPreserve: 8, lineSpeed: 10, pcCost: 5,
    online: true, forCoated: false,
    calenderConfig: "machine_calender_hard_nip_stack_online_paper_machine_end_smooth",
    bestUse: "newsprint_uncoated_paper_machine_calender_basic_smoothness_end",
  },
  supercalender: {
    glossLevel: 10, smoothness: 10, bulkPreserve: 4, lineSpeed: 7, pcCost: 8,
    online: false, forCoated: true,
    calenderConfig: "supercalender_alternating_steel_cotton_roll_high_gloss_offline",
    bestUse: "high_gloss_magazine_coated_paper_supercalender_offline_premium",
  },
  soft_nip: {
    glossLevel: 7, smoothness: 8, bulkPreserve: 7, lineSpeed: 9, pcCost: 7,
    online: true, forCoated: true,
    calenderConfig: "soft_nip_polymer_cover_roll_gentle_calender_bulk_preserve_coat",
    bestUse: "coated_paper_board_soft_nip_calender_gentle_bulk_preserve_online",
  },
  multinip_online: {
    glossLevel: 8, smoothness: 9, bulkPreserve: 6, lineSpeed: 8, pcCost: 9,
    online: true, forCoated: true,
    calenderConfig: "multinip_online_calender_multiple_nip_zone_high_speed_coated",
    bestUse: "lightweight_coated_paper_multinip_online_calender_high_speed",
  },
  shoe_calender: {
    glossLevel: 9, smoothness: 9, bulkPreserve: 8, lineSpeed: 8, pcCost: 10,
    online: true, forCoated: true,
    calenderConfig: "shoe_calender_extended_nip_wide_contact_zone_bulk_gloss_both",
    bestUse: "premium_board_packaging_shoe_calender_extended_nip_bulk_gloss",
  },
};

function get(t: PaperCalenderType): PaperCalenderData {
  return DATA[t];
}

export const glossLevel = (t: PaperCalenderType) => get(t).glossLevel;
export const smoothness = (t: PaperCalenderType) => get(t).smoothness;
export const bulkPreserve = (t: PaperCalenderType) => get(t).bulkPreserve;
export const lineSpeed = (t: PaperCalenderType) => get(t).lineSpeed;
export const pcCost = (t: PaperCalenderType) => get(t).pcCost;
export const online = (t: PaperCalenderType) => get(t).online;
export const forCoated = (t: PaperCalenderType) => get(t).forCoated;
export const calenderConfig = (t: PaperCalenderType) => get(t).calenderConfig;
export const bestUse = (t: PaperCalenderType) => get(t).bestUse;
export const paperCalenderTypes = (): PaperCalenderType[] =>
  Object.keys(DATA) as PaperCalenderType[];

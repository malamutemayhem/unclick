export type NurseCallType =
  | "basic_light_buzzer"
  | "audio_visual_intercom"
  | "pillow_speaker_entertainment"
  | "wireless_pendant_mobile"
  | "enterprise_rtls_integrated";

interface NurseCallData {
  response: number;
  integration: number;
  coverage: number;
  reliability: number;
  ncCost: number;
  wireless: boolean;
  forAcuteCare: boolean;
  communication: string;
  bestUse: string;
}

const DATA: Record<NurseCallType, NurseCallData> = {
  basic_light_buzzer: {
    response: 5, integration: 3, coverage: 6, reliability: 8, ncCost: 2,
    wireless: false, forAcuteCare: false,
    communication: "dome_light_buzzer_wired_pull",
    bestUse: "assisted_living_basic_alert",
  },
  audio_visual_intercom: {
    response: 8, integration: 6, coverage: 7, reliability: 9, ncCost: 5,
    wireless: false, forAcuteCare: true,
    communication: "two_way_intercom_master_stn",
    bestUse: "hospital_med_surg_floor",
  },
  pillow_speaker_entertainment: {
    response: 7, integration: 8, coverage: 7, reliability: 8, ncCost: 6,
    wireless: false, forAcuteCare: true,
    communication: "pillow_speaker_tv_nurse_combo",
    bestUse: "patient_room_full_service",
  },
  wireless_pendant_mobile: {
    response: 9, integration: 7, coverage: 10, reliability: 7, ncCost: 7,
    wireless: true, forAcuteCare: false,
    communication: "wireless_pendant_rfid_locate",
    bestUse: "memory_care_wander_management",
  },
  enterprise_rtls_integrated: {
    response: 10, integration: 10, coverage: 10, reliability: 9, ncCost: 10,
    wireless: true, forAcuteCare: true,
    communication: "rtls_badge_workflow_emr_link",
    bestUse: "large_hospital_campus_smart",
  },
};

function get(t: NurseCallType): NurseCallData {
  return DATA[t];
}

export const response = (t: NurseCallType) => get(t).response;
export const integration = (t: NurseCallType) => get(t).integration;
export const coverage = (t: NurseCallType) => get(t).coverage;
export const reliability = (t: NurseCallType) => get(t).reliability;
export const ncCost = (t: NurseCallType) => get(t).ncCost;
export const wireless = (t: NurseCallType) => get(t).wireless;
export const forAcuteCare = (t: NurseCallType) => get(t).forAcuteCare;
export const communication = (t: NurseCallType) => get(t).communication;
export const bestUse = (t: NurseCallType) => get(t).bestUse;
export const nurseCallTypes = (): NurseCallType[] =>
  Object.keys(DATA) as NurseCallType[];

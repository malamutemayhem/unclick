export type PullStationType =
  | "single_action_push"
  | "double_action_lift_pull"
  | "addressable_coded"
  | "break_glass_uk_style"
  | "outdoor_weatherproof";

interface PullStationData {
  activation: number;
  falseAlarm: number;
  ada: number;
  durability: number;
  psCost: number;
  addressable: boolean;
  forOutdoor: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<PullStationType, PullStationData> = {
  single_action_push: {
    activation: 10, falseAlarm: 4, ada: 9, durability: 7, psCost: 3,
    addressable: false, forOutdoor: false,
    mechanism: "push_down_lever_micro_switch",
    bestUse: "standard_exit_door_corridor",
  },
  double_action_lift_pull: {
    activation: 7, falseAlarm: 9, ada: 7, durability: 8, psCost: 5,
    addressable: false, forOutdoor: false,
    mechanism: "lift_cover_pull_handle_dual",
    bestUse: "school_public_false_alarm_risk",
  },
  addressable_coded: {
    activation: 8, falseAlarm: 7, ada: 8, durability: 8, psCost: 7,
    addressable: true, forOutdoor: false,
    mechanism: "addressable_module_coded_signal",
    bestUse: "large_building_zone_identify",
  },
  break_glass_uk_style: {
    activation: 6, falseAlarm: 8, ada: 5, durability: 6, psCost: 4,
    addressable: false, forOutdoor: false,
    mechanism: "break_glass_element_push_button",
    bestUse: "uk_standard_bs_compliant",
  },
  outdoor_weatherproof: {
    activation: 8, falseAlarm: 6, ada: 7, durability: 10, psCost: 6,
    addressable: false, forOutdoor: true,
    mechanism: "sealed_housing_dual_cover",
    bestUse: "parking_garage_loading_dock",
  },
};

function get(t: PullStationType): PullStationData {
  return DATA[t];
}

export const activation = (t: PullStationType) => get(t).activation;
export const falseAlarm = (t: PullStationType) => get(t).falseAlarm;
export const ada = (t: PullStationType) => get(t).ada;
export const durability = (t: PullStationType) => get(t).durability;
export const psCost = (t: PullStationType) => get(t).psCost;
export const addressable = (t: PullStationType) => get(t).addressable;
export const forOutdoor = (t: PullStationType) => get(t).forOutdoor;
export const mechanism = (t: PullStationType) => get(t).mechanism;
export const bestUse = (t: PullStationType) => get(t).bestUse;
export const pullStationTypes = (): PullStationType[] =>
  Object.keys(DATA) as PullStationType[];

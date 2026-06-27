export type SignalTowerType =
  | "led_modular_stack"
  | "rotating_beacon_single"
  | "flash_strobe_xenon"
  | "steady_dome_single"
  | "multi_color_rgb_smart";

const DATA: Record<SignalTowerType, {
  visibility: number; configurable: number; brightness: number;
  durability: number; towerCost: number; audible: boolean;
  multiColor: boolean; signalMethod: string; bestUse: string;
}> = {
  led_modular_stack: { visibility: 9, configurable: 10, brightness: 8, durability: 8, towerCost: 7, audible: true, multiColor: true, signalMethod: "stacked_led_module", bestUse: "cnc_machine_status" },
  rotating_beacon_single: { visibility: 8, configurable: 3, brightness: 9, durability: 6, towerCost: 4, audible: false, multiColor: false, signalMethod: "rotating_mirror_lamp", bestUse: "forklift_warning_light" },
  flash_strobe_xenon: { visibility: 10, configurable: 4, brightness: 10, durability: 5, towerCost: 5, audible: false, multiColor: false, signalMethod: "xenon_flash_tube", bestUse: "emergency_alert_flash" },
  steady_dome_single: { visibility: 6, configurable: 2, brightness: 6, durability: 9, towerCost: 2, audible: false, multiColor: false, signalMethod: "incandescent_dome_lens", bestUse: "door_entry_indicator" },
  multi_color_rgb_smart: { visibility: 7, configurable: 10, brightness: 7, durability: 7, towerCost: 9, audible: true, multiColor: true, signalMethod: "addressable_rgb_led", bestUse: "smart_factory_iot_signal" },
};

const get = (t: SignalTowerType) => DATA[t];

export const visibility = (t: SignalTowerType) => get(t).visibility;
export const configurable = (t: SignalTowerType) => get(t).configurable;
export const brightness = (t: SignalTowerType) => get(t).brightness;
export const durability = (t: SignalTowerType) => get(t).durability;
export const towerCost = (t: SignalTowerType) => get(t).towerCost;
export const audible = (t: SignalTowerType) => get(t).audible;
export const multiColor = (t: SignalTowerType) => get(t).multiColor;
export const signalMethod = (t: SignalTowerType) => get(t).signalMethod;
export const bestUse = (t: SignalTowerType) => get(t).bestUse;
export const signalTowers = (): SignalTowerType[] => Object.keys(DATA) as SignalTowerType[];

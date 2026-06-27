export type KeypadType =
  | "standalone_mechanical_combo"
  | "wired_digital_backlit"
  | "wireless_battery_rf"
  | "touchscreen_graphic_lcd"
  | "weatherproof_outdoor_metal";

interface KeypadData {
  security: number;
  convenience: number;
  durability: number;
  aesthetic: number;
  kpCost: number;
  powered: boolean;
  forOutdoor: boolean;
  entry: string;
  bestUse: string;
}

const DATA: Record<KeypadType, KeypadData> = {
  standalone_mechanical_combo: {
    security: 5, convenience: 7, durability: 9, aesthetic: 4, kpCost: 2,
    powered: false, forOutdoor: true,
    entry: "mechanical_push_button_code",
    bestUse: "gate_storage_unit_basic",
  },
  wired_digital_backlit: {
    security: 7, convenience: 8, durability: 8, aesthetic: 7, kpCost: 4,
    powered: true, forOutdoor: false,
    entry: "capacitive_key_backlit_led",
    bestUse: "office_door_interior_access",
  },
  wireless_battery_rf: {
    security: 7, convenience: 9, durability: 7, aesthetic: 7, kpCost: 5,
    powered: true, forOutdoor: false,
    entry: "wireless_rf_battery_keypad",
    bestUse: "retrofit_no_wiring_available",
  },
  touchscreen_graphic_lcd: {
    security: 8, convenience: 10, durability: 6, aesthetic: 10, kpCost: 8,
    powered: true, forOutdoor: false,
    entry: "lcd_touch_scramble_pin_gui",
    bestUse: "luxury_home_smart_building",
  },
  weatherproof_outdoor_metal: {
    security: 8, convenience: 7, durability: 10, aesthetic: 5, kpCost: 5,
    powered: true, forOutdoor: true,
    entry: "sealed_metal_key_ip67_rated",
    bestUse: "parking_gate_perimeter_entry",
  },
};

function get(t: KeypadType): KeypadData {
  return DATA[t];
}

export const security = (t: KeypadType) => get(t).security;
export const convenience = (t: KeypadType) => get(t).convenience;
export const durability = (t: KeypadType) => get(t).durability;
export const aesthetic = (t: KeypadType) => get(t).aesthetic;
export const kpCost = (t: KeypadType) => get(t).kpCost;
export const powered = (t: KeypadType) => get(t).powered;
export const forOutdoor = (t: KeypadType) => get(t).forOutdoor;
export const entry = (t: KeypadType) => get(t).entry;
export const bestUse = (t: KeypadType) => get(t).bestUse;
export const keypadTypes = (): KeypadType[] =>
  Object.keys(DATA) as KeypadType[];

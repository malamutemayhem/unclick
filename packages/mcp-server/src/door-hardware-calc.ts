export type DoorHardwareType =
  | "lever_handle_commercial"
  | "knob_cylindrical_residential"
  | "panic_bar_exit_device"
  | "pull_handle_plate_push"
  | "electronic_access_keypad";

interface DoorHardwareData {
  ada: number;
  security: number;
  durability: number;
  ease: number;
  dhCost: number;
  ada_compliant: boolean;
  forCommercial: boolean;
  finish_: string;
  bestUse: string;
}

const DATA: Record<DoorHardwareType, DoorHardwareData> = {
  lever_handle_commercial: {
    ada: 10, security: 7, durability: 8, ease: 9, dhCost: 5,
    ada_compliant: true, forCommercial: true,
    finish_: "satin_chrome_626_brushed",
    bestUse: "office_corridor_ada_passage_door",
  },
  knob_cylindrical_residential: {
    ada: 4, security: 6, durability: 7, ease: 6, dhCost: 3,
    ada_compliant: false, forCommercial: false,
    finish_: "polished_brass_605_lacquered",
    bestUse: "residential_interior_bedroom_door",
  },
  panic_bar_exit_device: {
    ada: 9, security: 8, durability: 9, ease: 10, dhCost: 8,
    ada_compliant: true, forCommercial: true,
    finish_: "aluminum_628_anodized_clear",
    bestUse: "fire_exit_assembly_hall_egress",
  },
  pull_handle_plate_push: {
    ada: 7, security: 3, durability: 9, ease: 8, dhCost: 4,
    ada_compliant: true, forCommercial: true,
    finish_: "stainless_steel_630_satin",
    bestUse: "vestibule_entry_push_pull_pair",
  },
  electronic_access_keypad: {
    ada: 8, security: 10, durability: 6, ease: 7, dhCost: 10,
    ada_compliant: true, forCommercial: true,
    finish_: "black_matte_electronic_housing",
    bestUse: "secure_server_room_restricted_entry",
  },
};

function get(t: DoorHardwareType): DoorHardwareData {
  return DATA[t];
}

export const ada = (t: DoorHardwareType) => get(t).ada;
export const security = (t: DoorHardwareType) => get(t).security;
export const durability = (t: DoorHardwareType) => get(t).durability;
export const ease = (t: DoorHardwareType) => get(t).ease;
export const dhCost = (t: DoorHardwareType) => get(t).dhCost;
export const adaCompliant = (t: DoorHardwareType) => get(t).ada_compliant;
export const forCommercial = (t: DoorHardwareType) => get(t).forCommercial;
export const finish_ = (t: DoorHardwareType) => get(t).finish_;
export const bestUse = (t: DoorHardwareType) => get(t).bestUse;
export const doorHardwareTypes = (): DoorHardwareType[] =>
  Object.keys(DATA) as DoorHardwareType[];

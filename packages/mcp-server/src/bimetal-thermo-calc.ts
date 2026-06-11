export type BimetalThermoType =
  | "dial_industrial_local"
  | "actuated_switch_control"
  | "sanitary_clamp_food"
  | "adjustable_angle_read"
  | "vapor_tension_remote";

interface BimetalThermoData {
  accuracy: number;
  durability: number;
  readability: number;
  response: number;
  btCost: number;
  localRead: boolean;
  forFood: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<BimetalThermoType, BimetalThermoData> = {
  dial_industrial_local: {
    accuracy: 6, durability: 8, readability: 8, response: 5, btCost: 2,
    localRead: true, forFood: false,
    element: "helical_coil_bimetal_strip_dial_pointer",
    bestUse: "pipe_tank_local_indication_no_power",
  },
  actuated_switch_control: {
    accuracy: 5, durability: 7, readability: 6, response: 6, btCost: 3,
    localRead: true, forFood: false,
    element: "bimetal_disc_snap_action_switch_contact",
    bestUse: "over_temperature_alarm_safety_cutout",
  },
  sanitary_clamp_food: {
    accuracy: 7, durability: 9, readability: 8, response: 7, btCost: 4,
    localRead: true, forFood: true,
    element: "sealed_316ss_stem_triclamp_sanitary",
    bestUse: "food_dairy_brew_sanitary_temp_check",
  },
  adjustable_angle_read: {
    accuracy: 6, durability: 8, readability: 10, response: 5, btCost: 3,
    localRead: true, forFood: false,
    element: "swivel_case_adjustable_angle_every_pos",
    bestUse: "awkward_mount_position_visible_any_angle",
  },
  vapor_tension_remote: {
    accuracy: 4, durability: 6, readability: 7, response: 8, btCost: 4,
    localRead: false, forFood: false,
    element: "sealed_bulb_capillary_vapor_pressure",
    bestUse: "remote_panel_mount_no_electric_needed",
  },
};

function get(t: BimetalThermoType): BimetalThermoData {
  return DATA[t];
}

export const accuracy = (t: BimetalThermoType) => get(t).accuracy;
export const durability = (t: BimetalThermoType) => get(t).durability;
export const readability = (t: BimetalThermoType) => get(t).readability;
export const response = (t: BimetalThermoType) => get(t).response;
export const btCost = (t: BimetalThermoType) => get(t).btCost;
export const localRead = (t: BimetalThermoType) => get(t).localRead;
export const forFood = (t: BimetalThermoType) => get(t).forFood;
export const element = (t: BimetalThermoType) => get(t).element;
export const bestUse = (t: BimetalThermoType) => get(t).bestUse;
export const bimetalThermoTypes = (): BimetalThermoType[] =>
  Object.keys(DATA) as BimetalThermoType[];

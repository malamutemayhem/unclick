export type StrainerTypeType =
  | "y_strainer_inline_compact"
  | "basket_strainer_pot_type"
  | "duplex_basket_switchable"
  | "cone_strainer_temporary"
  | "t_strainer_tee_body";

interface StrainerTypeData {
  capacity: number;
  pressure: number;
  cleanEase: number;
  retention: number;
  srCost: number;
  continuous: boolean;
  forPump: boolean;
  screen: string;
  bestUse: string;
}

const DATA: Record<StrainerTypeType, StrainerTypeData> = {
  y_strainer_inline_compact: {
    capacity: 5, pressure: 8, cleanEase: 6, retention: 7, srCost: 3,
    continuous: false, forPump: true,
    screen: "perforated_sheet_wedge_wire_mesh",
    bestUse: "steam_line_instrument_protection",
  },
  basket_strainer_pot_type: {
    capacity: 8, pressure: 7, cleanEase: 8, retention: 8, srCost: 5,
    continuous: false, forPump: true,
    screen: "basket_screen_removable_element",
    bestUse: "pump_suction_cooling_water_filter",
  },
  duplex_basket_switchable: {
    capacity: 9, pressure: 7, cleanEase: 10, retention: 8, srCost: 9,
    continuous: true, forPump: true,
    screen: "dual_basket_switch_valve_clean",
    bestUse: "continuous_process_no_shutdown_filter",
  },
  cone_strainer_temporary: {
    capacity: 6, pressure: 6, cleanEase: 4, retention: 5, srCost: 1,
    continuous: false, forPump: false,
    screen: "cone_mesh_temporary_startup",
    bestUse: "startup_commissioning_flush_debris",
  },
  t_strainer_tee_body: {
    capacity: 7, pressure: 7, cleanEase: 7, retention: 7, srCost: 4,
    continuous: false, forPump: true,
    screen: "cylindrical_screen_tee_housing",
    bestUse: "horizontal_line_moderate_debris_load",
  },
};

function get(t: StrainerTypeType): StrainerTypeData {
  return DATA[t];
}

export const capacity = (t: StrainerTypeType) => get(t).capacity;
export const pressure = (t: StrainerTypeType) => get(t).pressure;
export const cleanEase = (t: StrainerTypeType) => get(t).cleanEase;
export const retention = (t: StrainerTypeType) => get(t).retention;
export const srCost = (t: StrainerTypeType) => get(t).srCost;
export const continuous = (t: StrainerTypeType) => get(t).continuous;
export const forPump = (t: StrainerTypeType) => get(t).forPump;
export const screen = (t: StrainerTypeType) => get(t).screen;
export const bestUse = (t: StrainerTypeType) => get(t).bestUse;
export const strainerTypeTypes = (): StrainerTypeType[] =>
  Object.keys(DATA) as StrainerTypeType[];

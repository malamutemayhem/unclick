export type PanelBoardType =
  | "main_lug_residential_load"
  | "main_breaker_residential"
  | "distribution_panel_commercial"
  | "motor_control_center_mcc"
  | "sub_panel_branch_circuit";

interface PanelBoardData {
  capacity: number;
  circuits: number;
  safety: number;
  expandability: number;
  pbCost: number;
  mainBreaker: boolean;
  forCommercial: boolean;
  busRating: string;
  bestUse: string;
}

const DATA: Record<PanelBoardType, PanelBoardData> = {
  main_lug_residential_load: {
    capacity: 5, circuits: 6, safety: 6, expandability: 5, pbCost: 3,
    mainBreaker: false, forCommercial: false,
    busRating: "100a_200a_copper_bus_bar",
    bestUse: "residential_sub_feed_downstream",
  },
  main_breaker_residential: {
    capacity: 6, circuits: 7, safety: 8, expandability: 6, pbCost: 5,
    mainBreaker: true, forCommercial: false,
    busRating: "200a_copper_bus_bar_main",
    bestUse: "residential_service_entrance_main",
  },
  distribution_panel_commercial: {
    capacity: 9, circuits: 9, safety: 9, expandability: 8, pbCost: 8,
    mainBreaker: true, forCommercial: true,
    busRating: "400a_800a_copper_aluminum_bus",
    bestUse: "commercial_floor_distribution_board",
  },
  motor_control_center_mcc: {
    capacity: 10, circuits: 8, safety: 10, expandability: 10, pbCost: 10,
    mainBreaker: true, forCommercial: true,
    busRating: "600a_2000a_vertical_bus_draw_out",
    bestUse: "industrial_plant_motor_control",
  },
  sub_panel_branch_circuit: {
    capacity: 4, circuits: 5, safety: 7, expandability: 4, pbCost: 2,
    mainBreaker: false, forCommercial: false,
    busRating: "60a_125a_copper_sub_bus",
    bestUse: "garage_workshop_additional_circuits",
  },
};

function get(t: PanelBoardType): PanelBoardData {
  return DATA[t];
}

export const capacity = (t: PanelBoardType) => get(t).capacity;
export const circuits = (t: PanelBoardType) => get(t).circuits;
export const safety = (t: PanelBoardType) => get(t).safety;
export const expandability = (t: PanelBoardType) => get(t).expandability;
export const pbCost = (t: PanelBoardType) => get(t).pbCost;
export const mainBreaker = (t: PanelBoardType) => get(t).mainBreaker;
export const forCommercial = (t: PanelBoardType) => get(t).forCommercial;
export const busRating = (t: PanelBoardType) => get(t).busRating;
export const bestUse = (t: PanelBoardType) => get(t).bestUse;
export const panelBoardTypes = (): PanelBoardType[] =>
  Object.keys(DATA) as PanelBoardType[];

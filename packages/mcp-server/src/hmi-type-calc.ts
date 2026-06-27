export type HmiType =
  | "text_panel_monochrome"
  | "touch_panel_color"
  | "scada_workstation"
  | "web_hmi_html5"
  | "mobile_ar_overlay";

const DATA: Record<HmiType, {
  visualization: number; interactivity: number; connectivity: number;
  ruggedness: number; hmCost: number; remote: boolean;
  forOt: boolean; rendering: string; bestUse: string;
}> = {
  text_panel_monochrome: {
    visualization: 2, interactivity: 3, connectivity: 3,
    ruggedness: 10, hmCost: 1, remote: false,
    forOt: true, rendering: "character_lcd_segment",
    bestUse: "local_motor_starter_status",
  },
  touch_panel_color: {
    visualization: 7, interactivity: 8, connectivity: 6,
    ruggedness: 8, hmCost: 4, remote: false,
    forOt: true, rendering: "tft_resistive_capacitive",
    bestUse: "machine_operator_interface",
  },
  scada_workstation: {
    visualization: 9, interactivity: 9, connectivity: 9,
    ruggedness: 5, hmCost: 8, remote: true,
    forOt: true, rendering: "multi_monitor_gpu_accelerated",
    bestUse: "plant_wide_process_overview",
  },
  web_hmi_html5: {
    visualization: 8, interactivity: 7, connectivity: 10,
    ruggedness: 3, hmCost: 5, remote: true,
    forOt: false, rendering: "browser_svg_canvas_webgl",
    bestUse: "remote_dashboard_monitoring",
  },
  mobile_ar_overlay: {
    visualization: 10, interactivity: 10, connectivity: 8,
    ruggedness: 4, hmCost: 7, remote: true,
    forOt: false, rendering: "ar_spatial_anchor_overlay",
    bestUse: "maintenance_tech_field_assist",
  },
};

const get = (t: HmiType) => DATA[t];

export const visualization = (t: HmiType) => get(t).visualization;
export const interactivity = (t: HmiType) => get(t).interactivity;
export const connectivity = (t: HmiType) => get(t).connectivity;
export const ruggedness = (t: HmiType) => get(t).ruggedness;
export const hmCost = (t: HmiType) => get(t).hmCost;
export const remote = (t: HmiType) => get(t).remote;
export const forOt = (t: HmiType) => get(t).forOt;
export const rendering = (t: HmiType) => get(t).rendering;
export const bestUse = (t: HmiType) => get(t).bestUse;
export const hmiTypes = (): HmiType[] => Object.keys(DATA) as HmiType[];

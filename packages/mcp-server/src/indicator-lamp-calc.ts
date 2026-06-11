export type IndicatorLampType =
  | "led_5mm_through_hole"
  | "smd_0805_chip"
  | "high_power_1w_star"
  | "rgb_common_cathode"
  | "infrared_emitter_940";

const DATA: Record<IndicatorLampType, {
  brightness: number; efficiency: number; viewAngle: number;
  sizeCompact: number; ledCost: number; multiColor: boolean;
  visible: boolean; packageType: string; bestUse: string;
}> = {
  led_5mm_through_hole: { brightness: 5, efficiency: 7, viewAngle: 5, sizeCompact: 5, ledCost: 1, multiColor: false, visible: true, packageType: "t1_3_4_radial_lead", bestUse: "breadboard_status_led" },
  smd_0805_chip: { brightness: 4, efficiency: 8, viewAngle: 7, sizeCompact: 10, ledCost: 1, multiColor: false, visible: true, packageType: "smd_0805_reflow", bestUse: "pcb_board_indicator" },
  high_power_1w_star: { brightness: 10, efficiency: 7, viewAngle: 8, sizeCompact: 3, ledCost: 4, multiColor: false, visible: true, packageType: "star_pcb_heatsink", bestUse: "flashlight_illumination" },
  rgb_common_cathode: { brightness: 6, efficiency: 6, viewAngle: 6, sizeCompact: 4, ledCost: 2, multiColor: true, visible: true, packageType: "t1_3_4_4pin_rgb", bestUse: "color_status_display" },
  infrared_emitter_940: { brightness: 3, efficiency: 8, viewAngle: 4, sizeCompact: 6, ledCost: 2, multiColor: false, visible: false, packageType: "t1_ir_filtered_lens", bestUse: "remote_control_transmit" },
};

const get = (t: IndicatorLampType) => DATA[t];

export const brightness = (t: IndicatorLampType) => get(t).brightness;
export const efficiency = (t: IndicatorLampType) => get(t).efficiency;
export const viewAngle = (t: IndicatorLampType) => get(t).viewAngle;
export const sizeCompact = (t: IndicatorLampType) => get(t).sizeCompact;
export const ledCost = (t: IndicatorLampType) => get(t).ledCost;
export const multiColor = (t: IndicatorLampType) => get(t).multiColor;
export const visible = (t: IndicatorLampType) => get(t).visible;
export const packageType = (t: IndicatorLampType) => get(t).packageType;
export const bestUse = (t: IndicatorLampType) => get(t).bestUse;
export const indicatorLamps = (): IndicatorLampType[] => Object.keys(DATA) as IndicatorLampType[];

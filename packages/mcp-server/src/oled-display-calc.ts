// oled-display-calc - OLED display module types

export type OledDisplay =
  | "ssd1306_mono_128x64"
  | "ssd1306_mono_128x32"
  | "sh1106_mono_round"
  | "ssd1331_color_96x64"
  | "ssd1351_color_128x128";

const DATA: Record<OledDisplay, {
  resolution: number; colorDepth: number; contrast: number; powerEfficient: number;
  cost: number; color: boolean; spiInterface: boolean; driverChip: string; bestUse: string;
}> = {
  ssd1306_mono_128x64:  { resolution: 7, colorDepth: 1, contrast: 8, powerEfficient: 8, cost: 3, color: false, spiInterface: false, driverChip: "ssd1306_i2c_driver", bestUse: "general_mono_readout" },
  ssd1306_mono_128x32:  { resolution: 5, colorDepth: 1, contrast: 8, powerEfficient: 9, cost: 2, color: false, spiInterface: false, driverChip: "ssd1306_i2c_narrow", bestUse: "compact_status_line" },
  sh1106_mono_round:    { resolution: 7, colorDepth: 1, contrast: 9, powerEfficient: 7, cost: 4, color: false, spiInterface: true, driverChip: "sh1106_spi_driver", bestUse: "round_face_display" },
  ssd1331_color_96x64:  { resolution: 6, colorDepth: 8, contrast: 7, powerEfficient: 5, cost: 6, color: true, spiInterface: true, driverChip: "ssd1331_65k_color", bestUse: "small_color_graphic" },
  ssd1351_color_128x128: { resolution: 9, colorDepth: 10, contrast: 10, powerEfficient: 4, cost: 8, color: true, spiInterface: true, driverChip: "ssd1351_262k_color", bestUse: "rich_color_display" },
};

const get = (d: OledDisplay) => DATA[d];
export const resolution = (d: OledDisplay) => get(d).resolution;
export const colorDepth = (d: OledDisplay) => get(d).colorDepth;
export const contrast = (d: OledDisplay) => get(d).contrast;
export const powerEfficient = (d: OledDisplay) => get(d).powerEfficient;
export const displayCost = (d: OledDisplay) => get(d).cost;
export const color = (d: OledDisplay) => get(d).color;
export const spiInterface = (d: OledDisplay) => get(d).spiInterface;
export const driverChip = (d: OledDisplay) => get(d).driverChip;
export const bestUse = (d: OledDisplay) => get(d).bestUse;
export const oledDisplays = (): OledDisplay[] => Object.keys(DATA) as OledDisplay[];

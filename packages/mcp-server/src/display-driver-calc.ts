export type DisplayDriver =
  | "source_column_cof"
  | "gate_row_cof"
  | "tddi_touch_display"
  | "oled_amoled_ddic"
  | "led_matrix_constant";

const DATA: Record<DisplayDriver, {
  channels: number; dataRate: number; powerEff: number;
  integration: number; ddCost: number; touchIntegrated: boolean;
  forOled: boolean; interface_: string; bestUse: string;
}> = {
  source_column_cof: {
    channels: 9, dataRate: 8, powerEff: 6,
    integration: 5, ddCost: 4, touchIntegrated: false,
    forOled: false, interface_: "mipi_dsi_compressed",
    bestUse: "lcd_tv_4k_source_drive",
  },
  gate_row_cof: {
    channels: 7, dataRate: 5, powerEff: 8,
    integration: 4, ddCost: 2, touchIntegrated: false,
    forOled: false, interface_: "shift_register_level_shift",
    bestUse: "lcd_gate_scan_amorphous_si",
  },
  tddi_touch_display: {
    channels: 8, dataRate: 7, powerEff: 7,
    integration: 10, ddCost: 6, touchIntegrated: true,
    forOled: false, interface_: "mipi_dsi_i2c_touch_mux",
    bestUse: "smartphone_incell_touch_lcd",
  },
  oled_amoled_ddic: {
    channels: 10, dataRate: 10, powerEff: 5,
    integration: 8, ddCost: 8, touchIntegrated: false,
    forOled: true, interface_: "mipi_dsi_ltpo_pwm_dimming",
    bestUse: "flagship_phone_120hz_oled",
  },
  led_matrix_constant: {
    channels: 6, dataRate: 4, powerEff: 9,
    integration: 6, ddCost: 3, touchIntegrated: false,
    forOled: false, interface_: "spi_cascade_shift_latch",
    bestUse: "automotive_cluster_backlight",
  },
};

const get = (t: DisplayDriver) => DATA[t];

export const channels = (t: DisplayDriver) => get(t).channels;
export const dataRate = (t: DisplayDriver) => get(t).dataRate;
export const powerEff = (t: DisplayDriver) => get(t).powerEff;
export const integration = (t: DisplayDriver) => get(t).integration;
export const ddCost = (t: DisplayDriver) => get(t).ddCost;
export const touchIntegrated = (t: DisplayDriver) => get(t).touchIntegrated;
export const forOled = (t: DisplayDriver) => get(t).forOled;
export const interface_ = (t: DisplayDriver) => get(t).interface_;
export const bestUse = (t: DisplayDriver) => get(t).bestUse;
export const displayDrivers = (): DisplayDriver[] => Object.keys(DATA) as DisplayDriver[];

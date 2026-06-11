export type PowerDomain =
  | "always_on_aon"
  | "core_logic_vdd"
  | "io_ring_vddio"
  | "analog_vdda"
  | "retention_vret";

const DATA: Record<PowerDomain, {
  current: number; switchSpeed: number; isolation: number;
  voltage: number; pdCost: number; retentionCapable: boolean;
  forDeepSleep: boolean; regulation: string; bestUse: string;
}> = {
  always_on_aon: {
    current: 3, switchSpeed: 1, isolation: 5,
    voltage: 6, pdCost: 2, retentionCapable: false,
    forDeepSleep: true, regulation: "always_powered_rtc_wakeup",
    bestUse: "rtc_wakeup_timer",
  },
  core_logic_vdd: {
    current: 10, switchSpeed: 6, isolation: 7,
    voltage: 4, pdCost: 3, retentionCapable: false,
    forDeepSleep: false, regulation: "dvfs_scaled_core",
    bestUse: "cpu_sram_main_logic",
  },
  io_ring_vddio: {
    current: 5, switchSpeed: 5, isolation: 8,
    voltage: 8, pdCost: 3, retentionCapable: false,
    forDeepSleep: false, regulation: "level_shifted_multi_volt",
    bestUse: "gpio_peripheral_interface",
  },
  analog_vdda: {
    current: 4, switchSpeed: 3, isolation: 10,
    voltage: 7, pdCost: 4, retentionCapable: false,
    forDeepSleep: false, regulation: "low_noise_ldo_filtered",
    bestUse: "adc_pll_analog_block",
  },
  retention_vret: {
    current: 2, switchSpeed: 7, isolation: 6,
    voltage: 3, pdCost: 5, retentionCapable: true,
    forDeepSleep: true, regulation: "sub_threshold_sram_hold",
    bestUse: "sram_state_deep_sleep",
  },
};

const get = (t: PowerDomain) => DATA[t];

export const current = (t: PowerDomain) => get(t).current;
export const switchSpeed = (t: PowerDomain) => get(t).switchSpeed;
export const isolation = (t: PowerDomain) => get(t).isolation;
export const voltage = (t: PowerDomain) => get(t).voltage;
export const pdCost = (t: PowerDomain) => get(t).pdCost;
export const retentionCapable = (t: PowerDomain) => get(t).retentionCapable;
export const forDeepSleep = (t: PowerDomain) => get(t).forDeepSleep;
export const regulation = (t: PowerDomain) => get(t).regulation;
export const bestUse = (t: PowerDomain) => get(t).bestUse;
export const powerDomains = (): PowerDomain[] => Object.keys(DATA) as PowerDomain[];

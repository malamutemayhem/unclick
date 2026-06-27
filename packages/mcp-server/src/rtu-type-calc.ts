export type RtuType =
  | "single_board_compact"
  | "modular_rack_expandable"
  | "ruggedized_outdoor_ip67"
  | "cellular_iot_gateway"
  | "solar_powered_remote";

const DATA: Record<RtuType, {
  channels: number; processing: number; comms: number;
  environmental: number; rtCost: number; modular: boolean;
  forRemote: boolean; connectivity: string; bestUse: string;
}> = {
  single_board_compact: {
    channels: 4, processing: 5, comms: 5,
    environmental: 5, rtCost: 1, modular: false,
    forRemote: false, connectivity: "rs485_serial_ethernet_basic",
    bestUse: "small_site_pump_station_monitor",
  },
  modular_rack_expandable: {
    channels: 10, processing: 8, comms: 8,
    environmental: 6, rtCost: 4, modular: true,
    forRemote: false, connectivity: "ethernet_serial_fiber_redundant",
    bestUse: "large_substation_multi_protocol",
  },
  ruggedized_outdoor_ip67: {
    channels: 6, processing: 6, comms: 7,
    environmental: 10, rtCost: 3, modular: false,
    forRemote: true, connectivity: "ethernet_serial_radio_cellular",
    bestUse: "harsh_environment_pipeline_well",
  },
  cellular_iot_gateway: {
    channels: 3, processing: 4, comms: 9,
    environmental: 7, rtCost: 2, modular: false,
    forRemote: true, connectivity: "4g_lte_mqtt_cloud_native",
    bestUse: "distributed_sensor_cloud_scada",
  },
  solar_powered_remote: {
    channels: 3, processing: 4, comms: 6,
    environmental: 9, rtCost: 3, modular: false,
    forRemote: true, connectivity: "radio_satellite_low_power_sleep",
    bestUse: "off_grid_water_level_weather_stn",
  },
};

const get = (t: RtuType) => DATA[t];

export const channels = (t: RtuType) => get(t).channels;
export const processing = (t: RtuType) => get(t).processing;
export const comms = (t: RtuType) => get(t).comms;
export const environmental = (t: RtuType) => get(t).environmental;
export const rtCost = (t: RtuType) => get(t).rtCost;
export const modular = (t: RtuType) => get(t).modular;
export const forRemote = (t: RtuType) => get(t).forRemote;
export const connectivity = (t: RtuType) => get(t).connectivity;
export const bestUse = (t: RtuType) => get(t).bestUse;
export const rtuTypes = (): RtuType[] => Object.keys(DATA) as RtuType[];

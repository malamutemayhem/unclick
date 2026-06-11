export type DataLoggerType =
  | "universal_input"
  | "paperless_recorder"
  | "wireless_logger"
  | "high_speed_daq"
  | "edge_gateway";

interface DataLoggerData {
  channelCount: number;
  throughput: number;
  sampleRate: number;
  storageCapacity: number;
  dlCost: number;
  remoteAccess: boolean;
  forValidation: boolean;
  loggerConfig: string;
  bestUse: string;
}

const DATA: Record<DataLoggerType, DataLoggerData> = {
  universal_input: {
    channelCount: 7, throughput: 7, sampleRate: 6, storageCapacity: 7, dlCost: 5,
    remoteAccess: true, forValidation: true,
    loggerConfig: "universal_input_logger_tc_rtd_volt_current_multi_type_flexible",
    bestUse: "process_monitoring_universal_logger_multi_sensor_type_flexible",
  },
  paperless_recorder: {
    channelCount: 8, throughput: 8, sampleRate: 7, storageCapacity: 9, dlCost: 7,
    remoteAccess: true, forValidation: true,
    loggerConfig: "paperless_recorder_touchscreen_trend_display_fda_21_cfr_part_11",
    bestUse: "pharma_batch_paperless_recorder_fda_compliant_trend_display_audit",
  },
  wireless_logger: {
    channelCount: 5, throughput: 6, sampleRate: 5, storageCapacity: 6, dlCost: 4,
    remoteAccess: true, forValidation: false,
    loggerConfig: "wireless_logger_bluetooth_wifi_cloud_sync_battery_powered_remote",
    bestUse: "cold_chain_wireless_logger_battery_cloud_sync_transport_monitor",
  },
  high_speed_daq: {
    channelCount: 9, throughput: 10, sampleRate: 10, storageCapacity: 8, dlCost: 9,
    remoteAccess: false, forValidation: false,
    loggerConfig: "high_speed_daq_mhz_sample_simultaneous_transient_capture_stream",
    bestUse: "vibration_analysis_high_speed_daq_mhz_sample_transient_capture",
  },
  edge_gateway: {
    channelCount: 10, throughput: 9, sampleRate: 8, storageCapacity: 10, dlCost: 8,
    remoteAccess: true, forValidation: true,
    loggerConfig: "edge_gateway_logger_mqtt_opcua_modbus_aggregate_edge_compute_push",
    bestUse: "iiot_plant_edge_gateway_logger_aggregate_protocol_convert_cloud",
  },
};

function get(t: DataLoggerType): DataLoggerData {
  return DATA[t];
}

export const channelCount = (t: DataLoggerType) => get(t).channelCount;
export const throughput = (t: DataLoggerType) => get(t).throughput;
export const sampleRate = (t: DataLoggerType) => get(t).sampleRate;
export const storageCapacity = (t: DataLoggerType) => get(t).storageCapacity;
export const dlCost = (t: DataLoggerType) => get(t).dlCost;
export const remoteAccess = (t: DataLoggerType) => get(t).remoteAccess;
export const forValidation = (t: DataLoggerType) => get(t).forValidation;
export const loggerConfig = (t: DataLoggerType) => get(t).loggerConfig;
export const bestUse = (t: DataLoggerType) => get(t).bestUse;
export const dataLoggerTypes = (): DataLoggerType[] =>
  Object.keys(DATA) as DataLoggerType[];

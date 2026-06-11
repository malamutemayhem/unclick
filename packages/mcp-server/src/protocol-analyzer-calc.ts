export type ProtocolAnalyzerType =
  | "usb_analyzer"
  | "pcie_analyzer"
  | "can_bus_analyzer"
  | "spi_i2c_analyzer"
  | "ethernet_analyzer";

interface ProtocolAnalyzerData {
  dataRate: number;
  throughput: number;
  captureDepth: number;
  decodeCount: number;
  paCost: number;
  realTime: boolean;
  forDebug: boolean;
  analyzerConfig: string;
  bestUse: string;
}

const DATA: Record<ProtocolAnalyzerType, ProtocolAnalyzerData> = {
  usb_analyzer: {
    dataRate: 8, throughput: 8, captureDepth: 8, decodeCount: 7, paCost: 6,
    realTime: true, forDebug: true,
    analyzerConfig: "usb_protocol_analyzer_inline_tap_decode_descriptor_enumeration",
    bestUse: "usb_debug_protocol_analyzer_inline_tap_enumeration_compliance",
  },
  pcie_analyzer: {
    dataRate: 10, throughput: 7, captureDepth: 9, decodeCount: 6, paCost: 10,
    realTime: true, forDebug: true,
    analyzerConfig: "pcie_protocol_analyzer_interposer_slot_gen5_link_train_decode",
    bestUse: "pcie_validation_protocol_analyzer_interposer_link_train_tlp",
  },
  can_bus_analyzer: {
    dataRate: 4, throughput: 9, captureDepth: 7, decodeCount: 8, paCost: 3,
    realTime: true, forDebug: true,
    analyzerConfig: "can_bus_protocol_analyzer_obd_j1939_decode_error_frame_detect",
    bestUse: "automotive_can_bus_protocol_analyzer_obd_j1939_diagnostics",
  },
  spi_i2c_analyzer: {
    dataRate: 5, throughput: 8, captureDepth: 6, decodeCount: 9, paCost: 2,
    realTime: false, forDebug: true,
    analyzerConfig: "spi_i2c_protocol_analyzer_logic_capture_decode_multi_protocol",
    bestUse: "embedded_spi_i2c_protocol_analyzer_logic_decode_sensor_eeprom",
  },
  ethernet_analyzer: {
    dataRate: 9, throughput: 8, captureDepth: 10, decodeCount: 10, paCost: 8,
    realTime: true, forDebug: false,
    analyzerConfig: "ethernet_protocol_analyzer_tap_capture_wireshark_deep_inspect",
    bestUse: "network_debug_ethernet_protocol_analyzer_tap_packet_inspect",
  },
};

function get(t: ProtocolAnalyzerType): ProtocolAnalyzerData {
  return DATA[t];
}

export const dataRate = (t: ProtocolAnalyzerType) => get(t).dataRate;
export const throughput = (t: ProtocolAnalyzerType) => get(t).throughput;
export const captureDepth = (t: ProtocolAnalyzerType) => get(t).captureDepth;
export const decodeCount = (t: ProtocolAnalyzerType) => get(t).decodeCount;
export const paCost = (t: ProtocolAnalyzerType) => get(t).paCost;
export const realTime = (t: ProtocolAnalyzerType) => get(t).realTime;
export const forDebug = (t: ProtocolAnalyzerType) => get(t).forDebug;
export const analyzerConfig = (t: ProtocolAnalyzerType) => get(t).analyzerConfig;
export const bestUse = (t: ProtocolAnalyzerType) => get(t).bestUse;
export const protocolAnalyzerTypes = (): ProtocolAnalyzerType[] =>
  Object.keys(DATA) as ProtocolAnalyzerType[];

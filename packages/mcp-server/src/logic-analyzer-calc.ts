// logic-analyzer-calc - logic analyzer types for electronics

export type LogicAnalyzer =
  | "usb_basic_hobby"
  | "standalone_bench_pro"
  | "mixed_signal_combo"
  | "protocol_decode_adv"
  | "portable_field_logic";

const DATA: Record<LogicAnalyzer, {
  channelCount: number; sampleDepth: number; protocolSupport: number; portability: number;
  cost: number; standalone: boolean; forProtocol: boolean; captureMethod: string; bestUse: string;
}> = {
  usb_basic_hobby:       { channelCount: 5, sampleDepth: 5, protocolSupport: 4, portability: 9, cost: 2, standalone: false, forProtocol: false, captureMethod: "usb_stream_buffer", bestUse: "hobby_digital_debug" },
  standalone_bench_pro:  { channelCount: 9, sampleDepth: 10, protocolSupport: 8, portability: 2, cost: 9, standalone: true, forProtocol: true, captureMethod: "deep_memory_capture", bestUse: "professional_bench_test" },
  mixed_signal_combo:    { channelCount: 10, sampleDepth: 8, protocolSupport: 9, portability: 3, cost: 8, standalone: true, forProtocol: true, captureMethod: "analog_digital_merge", bestUse: "mixed_domain_analysis" },
  protocol_decode_adv:   { channelCount: 7, sampleDepth: 7, protocolSupport: 10, portability: 5, cost: 7, standalone: false, forProtocol: true, captureMethod: "protocol_aware_trigger", bestUse: "serial_bus_decode" },
  portable_field_logic:  { channelCount: 6, sampleDepth: 6, protocolSupport: 6, portability: 10, cost: 4, standalone: true, forProtocol: false, captureMethod: "compact_onboard_mem", bestUse: "field_logic_capture" },
};

const get = (a: LogicAnalyzer) => DATA[a];
export const channelCount = (a: LogicAnalyzer) => get(a).channelCount;
export const sampleDepth = (a: LogicAnalyzer) => get(a).sampleDepth;
export const protocolSupport = (a: LogicAnalyzer) => get(a).protocolSupport;
export const portability = (a: LogicAnalyzer) => get(a).portability;
export const analyzerCost = (a: LogicAnalyzer) => get(a).cost;
export const standalone = (a: LogicAnalyzer) => get(a).standalone;
export const forProtocol = (a: LogicAnalyzer) => get(a).forProtocol;
export const captureMethod = (a: LogicAnalyzer) => get(a).captureMethod;
export const bestUse = (a: LogicAnalyzer) => get(a).bestUse;
export const logicAnalyzers = (): LogicAnalyzer[] => Object.keys(DATA) as LogicAnalyzer[];

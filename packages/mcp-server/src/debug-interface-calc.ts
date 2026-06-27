export type DebugInterface =
  | "uart_console"
  | "segger_rtt"
  | "itm_swo_trace"
  | "openocd_gdb"
  | "etm_core_trace";

const DATA: Record<DebugInterface, {
  bandwidth: number; intrusiveness: number; setupEase: number;
  traceDepth: number; dbgCost: number; realtime: boolean;
  forProduction: boolean; transport: string; bestUse: string;
}> = {
  uart_console: {
    bandwidth: 3, intrusiveness: 4, setupEase: 9,
    traceDepth: 2, dbgCost: 1, realtime: false,
    forProduction: true, transport: "serial_115200_ascii",
    bestUse: "printf_debug_log",
  },
  segger_rtt: {
    bandwidth: 7, intrusiveness: 8, setupEase: 7,
    traceDepth: 4, dbgCost: 3, realtime: true,
    forProduction: false, transport: "swd_memory_buffer",
    bestUse: "non_blocking_log",
  },
  itm_swo_trace: {
    bandwidth: 6, intrusiveness: 9, setupEase: 6,
    traceDepth: 5, dbgCost: 4, realtime: true,
    forProduction: false, transport: "single_wire_output",
    bestUse: "event_timestamp_trace",
  },
  openocd_gdb: {
    bandwidth: 5, intrusiveness: 3, setupEase: 5,
    traceDepth: 7, dbgCost: 2, realtime: false,
    forProduction: false, transport: "jtag_swd_halt_step",
    bestUse: "breakpoint_source_debug",
  },
  etm_core_trace: {
    bandwidth: 9, intrusiveness: 10, setupEase: 3,
    traceDepth: 10, dbgCost: 8, realtime: true,
    forProduction: false, transport: "parallel_trace_port",
    bestUse: "full_instruction_trace",
  },
};

const get = (t: DebugInterface) => DATA[t];

export const bandwidth = (t: DebugInterface) => get(t).bandwidth;
export const intrusiveness = (t: DebugInterface) => get(t).intrusiveness;
export const setupEase = (t: DebugInterface) => get(t).setupEase;
export const traceDepth = (t: DebugInterface) => get(t).traceDepth;
export const dbgCost = (t: DebugInterface) => get(t).dbgCost;
export const realtime = (t: DebugInterface) => get(t).realtime;
export const forProduction = (t: DebugInterface) => get(t).forProduction;
export const transport = (t: DebugInterface) => get(t).transport;
export const bestUse = (t: DebugInterface) => get(t).bestUse;
export const debugInterfaces = (): DebugInterface[] => Object.keys(DATA) as DebugInterface[];

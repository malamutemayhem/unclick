export type DebugProbe =
  | "jtag_boundary_scan"
  | "swd_arm_serial_wire"
  | "uart_printf_debug"
  | "trace_etm_streaming"
  | "jtag_riscv_openocd";

const DATA: Record<DebugProbe, {
  bandwidth: number; intrusiveness: number; multicore: number;
  traceDepth: number; dbCost: number; realtime: boolean;
  forProduction: boolean; interface_: string; bestUse: string;
}> = {
  jtag_boundary_scan: {
    bandwidth: 6, intrusiveness: 7, multicore: 8,
    traceDepth: 5, dbCost: 5, realtime: false,
    forProduction: true, interface_: "tdi_tdo_tms_tck_4wire",
    bestUse: "pcb_boundary_scan_test",
  },
  swd_arm_serial_wire: {
    bandwidth: 7, intrusiveness: 8, multicore: 6,
    traceDepth: 6, dbCost: 2, realtime: false,
    forProduction: false, interface_: "swdio_swclk_2wire",
    bestUse: "arm_cortex_m_step_debug",
  },
  uart_printf_debug: {
    bandwidth: 3, intrusiveness: 4, multicore: 3,
    traceDepth: 2, dbCost: 1, realtime: false,
    forProduction: false, interface_: "uart_tx_rx_ascii_stream",
    bestUse: "quick_log_printf_prototype",
  },
  trace_etm_streaming: {
    bandwidth: 10, intrusiveness: 10, multicore: 9,
    traceDepth: 10, dbCost: 8, realtime: true,
    forProduction: false, interface_: "tpiu_4bit_parallel_trace",
    bestUse: "real_time_code_coverage_profile",
  },
  jtag_riscv_openocd: {
    bandwidth: 6, intrusiveness: 7, multicore: 7,
    traceDepth: 4, dbCost: 3, realtime: false,
    forProduction: false, interface_: "dm_abstract_command_dmi",
    bestUse: "riscv_hart_gdb_remote_debug",
  },
};

const get = (t: DebugProbe) => DATA[t];

export const bandwidth = (t: DebugProbe) => get(t).bandwidth;
export const intrusiveness = (t: DebugProbe) => get(t).intrusiveness;
export const multicore = (t: DebugProbe) => get(t).multicore;
export const traceDepth = (t: DebugProbe) => get(t).traceDepth;
export const dbCost = (t: DebugProbe) => get(t).dbCost;
export const realtime = (t: DebugProbe) => get(t).realtime;
export const forProduction = (t: DebugProbe) => get(t).forProduction;
export const interface_ = (t: DebugProbe) => get(t).interface_;
export const bestUse = (t: DebugProbe) => get(t).bestUse;
export const debugProbes = (): DebugProbe[] => Object.keys(DATA) as DebugProbe[];

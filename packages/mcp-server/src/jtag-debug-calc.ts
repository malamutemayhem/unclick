export type JtagDebug =
  | "jtag_ieee_1149"
  | "swd_arm_serial"
  | "bdi_background"
  | "trace_etm_itm"
  | "jtag_boundary_scan";

const DATA: Record<JtagDebug, {
  speed: number; pinCount: number; traceDepth: number;
  intrusiveness: number; debugCost: number; realtime: boolean;
  forProduction: boolean; interface_: string; bestUse: string;
}> = {
  jtag_ieee_1149: {
    speed: 5, pinCount: 4, traceDepth: 3,
    intrusiveness: 5, debugCost: 3, realtime: false,
    forProduction: true, interface_: "tck_tms_tdi_tdo",
    bestUse: "fpga_bitstream_load",
  },
  swd_arm_serial: {
    speed: 7, pinCount: 9, traceDepth: 4,
    intrusiveness: 6, debugCost: 2, realtime: false,
    forProduction: false, interface_: "swdio_swclk_2wire",
    bestUse: "cortex_m_firmware_debug",
  },
  bdi_background: {
    speed: 6, pinCount: 5, traceDepth: 5,
    intrusiveness: 8, debugCost: 6, realtime: true,
    forProduction: false, interface_: "nexus_aux_port",
    bestUse: "automotive_ecu_cal",
  },
  trace_etm_itm: {
    speed: 9, pinCount: 3, traceDepth: 10,
    intrusiveness: 10, debugCost: 8, realtime: true,
    forProduction: false, interface_: "trace_port_4bit",
    bestUse: "rtos_perf_profiling",
  },
  jtag_boundary_scan: {
    speed: 4, pinCount: 6, traceDepth: 2,
    intrusiveness: 3, debugCost: 5, realtime: false,
    forProduction: true, interface_: "bscan_extest_chain",
    bestUse: "pcb_solder_test",
  },
};

const get = (t: JtagDebug) => DATA[t];

export const speed = (t: JtagDebug) => get(t).speed;
export const pinCount = (t: JtagDebug) => get(t).pinCount;
export const traceDepth = (t: JtagDebug) => get(t).traceDepth;
export const intrusiveness = (t: JtagDebug) => get(t).intrusiveness;
export const debugCost = (t: JtagDebug) => get(t).debugCost;
export const realtime = (t: JtagDebug) => get(t).realtime;
export const forProduction = (t: JtagDebug) => get(t).forProduction;
export const interface_ = (t: JtagDebug) => get(t).interface_;
export const bestUse = (t: JtagDebug) => get(t).bestUse;
export const jtagDebugs = (): JtagDebug[] => Object.keys(DATA) as JtagDebug[];

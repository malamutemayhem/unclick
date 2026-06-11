export type RtlSim =
  | "event_driven_vcs"
  | "cycle_accurate_verilator"
  | "emulation_palladium"
  | "prototyping_haps"
  | "formal_jaspergold";

const DATA: Record<RtlSim, {
  speed: number; accuracy: number; capacity: number;
  debugability: number; simCost: number; synthesisReq: boolean;
  forSoc: boolean; engine: string; bestUse: string;
}> = {
  event_driven_vcs: {
    speed: 5, accuracy: 10, capacity: 7,
    debugability: 10, simCost: 7, synthesisReq: false,
    forSoc: true, engine: "compiled_event_queue",
    bestUse: "block_level_verification",
  },
  cycle_accurate_verilator: {
    speed: 8, accuracy: 8, capacity: 6,
    debugability: 7, simCost: 1, synthesisReq: false,
    forSoc: false, engine: "cpp_model_compile",
    bestUse: "open_source_ip_dev",
  },
  emulation_palladium: {
    speed: 9, accuracy: 9, capacity: 10,
    debugability: 8, simCost: 10, synthesisReq: true,
    forSoc: true, engine: "custom_asic_array",
    bestUse: "full_chip_sw_bringup",
  },
  prototyping_haps: {
    speed: 10, accuracy: 7, capacity: 9,
    debugability: 5, simCost: 8, synthesisReq: true,
    forSoc: true, engine: "multi_fpga_partition",
    bestUse: "pre_silicon_driver_test",
  },
  formal_jaspergold: {
    speed: 3, accuracy: 10, capacity: 4,
    debugability: 9, simCost: 8, synthesisReq: false,
    forSoc: false, engine: "bounded_model_check",
    bestUse: "protocol_property_proof",
  },
};

const get = (t: RtlSim) => DATA[t];

export const speed = (t: RtlSim) => get(t).speed;
export const accuracy = (t: RtlSim) => get(t).accuracy;
export const capacity = (t: RtlSim) => get(t).capacity;
export const debugability = (t: RtlSim) => get(t).debugability;
export const simCost = (t: RtlSim) => get(t).simCost;
export const synthesisReq = (t: RtlSim) => get(t).synthesisReq;
export const forSoc = (t: RtlSim) => get(t).forSoc;
export const engine = (t: RtlSim) => get(t).engine;
export const bestUse = (t: RtlSim) => get(t).bestUse;
export const rtlSims = (): RtlSim[] => Object.keys(DATA) as RtlSim[];

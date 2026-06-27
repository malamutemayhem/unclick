// Pipe blow calculator - glassblowing blowpipe tools

export type PipeBlowType =
  | "standard_steel_pipe"
  | "short_gather_pipe"
  | "long_reach_extend"
  | "color_coated_grip"
  | "lightweight_alloy_thin";

const PIPE_DATA: Record<
  PipeBlowType,
  {
    blowControl: number;
    gatherCapacity: number;
    heatBalance: number;
    spinWeight: number;
    cost: number;
    insulated: boolean;
    forBeginner: boolean;
    pipeLength: string;
    bestUse: string;
  }
> = {
  standard_steel_pipe: {
    blowControl: 7,
    gatherCapacity: 7,
    heatBalance: 7,
    spinWeight: 6,
    cost: 4,
    insulated: false,
    forBeginner: false,
    pipeLength: "four_foot_standard",
    bestUse: "general_blow_work",
  },
  short_gather_pipe: {
    blowControl: 8,
    gatherCapacity: 5,
    heatBalance: 8,
    spinWeight: 9,
    cost: 3,
    insulated: false,
    forBeginner: true,
    pipeLength: "three_foot_short",
    bestUse: "small_piece_start",
  },
  long_reach_extend: {
    blowControl: 6,
    gatherCapacity: 9,
    heatBalance: 5,
    spinWeight: 4,
    cost: 6,
    insulated: false,
    forBeginner: false,
    pipeLength: "five_foot_long",
    bestUse: "large_gather_reach",
  },
  color_coated_grip: {
    blowControl: 8,
    gatherCapacity: 7,
    heatBalance: 8,
    spinWeight: 7,
    cost: 7,
    insulated: true,
    forBeginner: true,
    pipeLength: "four_foot_standard",
    bestUse: "cool_grip_comfort",
  },
  lightweight_alloy_thin: {
    blowControl: 7,
    gatherCapacity: 6,
    heatBalance: 9,
    spinWeight: 10,
    cost: 8,
    insulated: false,
    forBeginner: false,
    pipeLength: "four_foot_standard",
    bestUse: "extended_session_light",
  },
};

export function blowControl(type: PipeBlowType): number {
  return PIPE_DATA[type].blowControl;
}
export function gatherCapacity(type: PipeBlowType): number {
  return PIPE_DATA[type].gatherCapacity;
}
export function heatBalance(type: PipeBlowType): number {
  return PIPE_DATA[type].heatBalance;
}
export function spinWeight(type: PipeBlowType): number {
  return PIPE_DATA[type].spinWeight;
}
export function pipeCost(type: PipeBlowType): number {
  return PIPE_DATA[type].cost;
}
export function insulated(type: PipeBlowType): boolean {
  return PIPE_DATA[type].insulated;
}
export function forBeginner(type: PipeBlowType): boolean {
  return PIPE_DATA[type].forBeginner;
}
export function pipeLength(type: PipeBlowType): string {
  return PIPE_DATA[type].pipeLength;
}
export function bestUse(type: PipeBlowType): string {
  return PIPE_DATA[type].bestUse;
}
export function pipeBlows(): PipeBlowType[] {
  return Object.keys(PIPE_DATA) as PipeBlowType[];
}

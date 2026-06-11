// Pipe bender calculator - plumbing tube bending tools

export type PipeBenderType =
  | "spring_bend_internal"
  | "lever_bend_manual"
  | "hydraulic_ram_power"
  | "conduit_shoe_electric"
  | "mini_tube_compact";

const BENDER_DATA: Record<
  PipeBenderType,
  {
    bendSmooth: number;
    angleAccuracy: number;
    pipeRange: number;
    portability: number;
    cost: number;
    powered: boolean;
    forConduit: boolean;
    formType: string;
    bestUse: string;
  }
> = {
  spring_bend_internal: {
    bendSmooth: 7,
    angleAccuracy: 6,
    pipeRange: 4,
    portability: 10,
    cost: 2,
    powered: false,
    forConduit: false,
    formType: "internal_spring_coil",
    bestUse: "soft_copper_bend",
  },
  lever_bend_manual: {
    bendSmooth: 8,
    angleAccuracy: 8,
    pipeRange: 7,
    portability: 7,
    cost: 5,
    powered: false,
    forConduit: false,
    formType: "lever_arm_former",
    bestUse: "general_pipe_bend",
  },
  hydraulic_ram_power: {
    bendSmooth: 9,
    angleAccuracy: 9,
    pipeRange: 10,
    portability: 3,
    cost: 9,
    powered: true,
    forConduit: false,
    formType: "hydraulic_shoe_ram",
    bestUse: "heavy_steel_bend",
  },
  conduit_shoe_electric: {
    bendSmooth: 7,
    angleAccuracy: 9,
    pipeRange: 6,
    portability: 6,
    cost: 6,
    powered: false,
    forConduit: true,
    formType: "conduit_shoe_hook",
    bestUse: "emt_conduit_bend",
  },
  mini_tube_compact: {
    bendSmooth: 8,
    angleAccuracy: 7,
    pipeRange: 3,
    portability: 9,
    cost: 3,
    powered: false,
    forConduit: false,
    formType: "compact_roller_guide",
    bestUse: "small_tube_tight",
  },
};

export function bendSmooth(type: PipeBenderType): number {
  return BENDER_DATA[type].bendSmooth;
}
export function angleAccuracy(type: PipeBenderType): number {
  return BENDER_DATA[type].angleAccuracy;
}
export function pipeRange(type: PipeBenderType): number {
  return BENDER_DATA[type].pipeRange;
}
export function portability(type: PipeBenderType): number {
  return BENDER_DATA[type].portability;
}
export function benderCost(type: PipeBenderType): number {
  return BENDER_DATA[type].cost;
}
export function powered(type: PipeBenderType): boolean {
  return BENDER_DATA[type].powered;
}
export function forConduit(type: PipeBenderType): boolean {
  return BENDER_DATA[type].forConduit;
}
export function formType(type: PipeBenderType): string {
  return BENDER_DATA[type].formType;
}
export function bestUse(type: PipeBenderType): string {
  return BENDER_DATA[type].bestUse;
}
export function pipeBenders(): PipeBenderType[] {
  return Object.keys(BENDER_DATA) as PipeBenderType[];
}

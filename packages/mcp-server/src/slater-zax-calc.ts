// Slater zax calculator - timber framing slater zax tools

export type SlaterZaxType =
  | "standard_slate_cut"
  | "ripper_nail_pull"
  | "stake_hole_punch"
  | "combination_multi_tool"
  | "lightweight_thin_slate";

const ZAX_DATA: Record<
  SlaterZaxType,
  {
    cutClean: number;
    holePunch: number;
    nailPull: number;
    controlGrip: number;
    cost: number;
    multiFunction: boolean;
    forThin: boolean;
    bladeStyle: string;
    bestUse: string;
  }
> = {
  standard_slate_cut: {
    cutClean: 9,
    holePunch: 7,
    nailPull: 5,
    controlGrip: 8,
    cost: 3,
    multiFunction: false,
    forThin: false,
    bladeStyle: "single_edge_cut",
    bestUse: "general_slate_trim",
  },
  ripper_nail_pull: {
    cutClean: 5,
    holePunch: 5,
    nailPull: 10,
    controlGrip: 7,
    cost: 4,
    multiFunction: false,
    forThin: false,
    bladeStyle: "hooked_rip_blade",
    bestUse: "slate_nail_remove",
  },
  stake_hole_punch: {
    cutClean: 6,
    holePunch: 10,
    nailPull: 5,
    controlGrip: 8,
    cost: 3,
    multiFunction: false,
    forThin: false,
    bladeStyle: "pointed_stake_tip",
    bestUse: "nail_hole_punch",
  },
  combination_multi_tool: {
    cutClean: 8,
    holePunch: 8,
    nailPull: 8,
    controlGrip: 7,
    cost: 6,
    multiFunction: true,
    forThin: false,
    bladeStyle: "combo_cut_punch_rip",
    bestUse: "all_round_slate_work",
  },
  lightweight_thin_slate: {
    cutClean: 8,
    holePunch: 7,
    nailPull: 5,
    controlGrip: 9,
    cost: 4,
    multiFunction: false,
    forThin: true,
    bladeStyle: "thin_light_blade",
    bestUse: "thin_slate_precise",
  },
};

export function cutClean(type: SlaterZaxType): number {
  return ZAX_DATA[type].cutClean;
}
export function holePunch(type: SlaterZaxType): number {
  return ZAX_DATA[type].holePunch;
}
export function nailPull(type: SlaterZaxType): number {
  return ZAX_DATA[type].nailPull;
}
export function controlGrip(type: SlaterZaxType): number {
  return ZAX_DATA[type].controlGrip;
}
export function zaxCost(type: SlaterZaxType): number {
  return ZAX_DATA[type].cost;
}
export function multiFunction(type: SlaterZaxType): boolean {
  return ZAX_DATA[type].multiFunction;
}
export function forThin(type: SlaterZaxType): boolean {
  return ZAX_DATA[type].forThin;
}
export function bladeStyle(type: SlaterZaxType): string {
  return ZAX_DATA[type].bladeStyle;
}
export function bestUse(type: SlaterZaxType): string {
  return ZAX_DATA[type].bestUse;
}
export function slaterZaxs(): SlaterZaxType[] {
  return Object.keys(ZAX_DATA) as SlaterZaxType[];
}

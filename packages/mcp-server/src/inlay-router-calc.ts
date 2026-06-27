// Inlay router calculator - inlay channel routing tools

export type InlayRouterType =
  | "dremel_rotary_small"
  | "laminate_trim_base"
  | "plunge_router_depth"
  | "hand_scratch_stock"
  | "cnc_carve_program";

const ROUTER_DATA: Record<
  InlayRouterType,
  {
    channelClean: number;
    depthControl: number;
    curveFollow: number;
    speedCut: number;
    cost: number;
    powered: boolean;
    forFreehand: boolean;
    cutMethod: string;
    bestUse: string;
  }
> = {
  dremel_rotary_small: {
    channelClean: 7,
    depthControl: 7,
    curveFollow: 9,
    speedCut: 7,
    cost: 4,
    powered: true,
    forFreehand: true,
    cutMethod: "rotary_burr",
    bestUse: "small_inlay_channel",
  },
  laminate_trim_base: {
    channelClean: 8,
    depthControl: 8,
    curveFollow: 7,
    speedCut: 8,
    cost: 5,
    powered: true,
    forFreehand: false,
    cutMethod: "spiral_bit",
    bestUse: "edge_band_channel",
  },
  plunge_router_depth: {
    channelClean: 9,
    depthControl: 10,
    curveFollow: 6,
    speedCut: 8,
    cost: 6,
    powered: true,
    forFreehand: false,
    cutMethod: "plunge_spiral",
    bestUse: "deep_recess_route",
  },
  hand_scratch_stock: {
    channelClean: 8,
    depthControl: 7,
    curveFollow: 5,
    speedCut: 4,
    cost: 2,
    powered: false,
    forFreehand: false,
    cutMethod: "scrape_profile",
    bestUse: "string_line_groove",
  },
  cnc_carve_program: {
    channelClean: 10,
    depthControl: 10,
    curveFollow: 10,
    speedCut: 9,
    cost: 9,
    powered: true,
    forFreehand: false,
    cutMethod: "programmed_path",
    bestUse: "complex_pattern_route",
  },
};

export function channelClean(type: InlayRouterType): number {
  return ROUTER_DATA[type].channelClean;
}
export function depthControl(type: InlayRouterType): number {
  return ROUTER_DATA[type].depthControl;
}
export function curveFollow(type: InlayRouterType): number {
  return ROUTER_DATA[type].curveFollow;
}
export function speedCut(type: InlayRouterType): number {
  return ROUTER_DATA[type].speedCut;
}
export function routerCost(type: InlayRouterType): number {
  return ROUTER_DATA[type].cost;
}
export function powered(type: InlayRouterType): boolean {
  return ROUTER_DATA[type].powered;
}
export function forFreehand(type: InlayRouterType): boolean {
  return ROUTER_DATA[type].forFreehand;
}
export function cutMethod(type: InlayRouterType): string {
  return ROUTER_DATA[type].cutMethod;
}
export function bestUse(type: InlayRouterType): string {
  return ROUTER_DATA[type].bestUse;
}
export function inlayRouters(): InlayRouterType[] {
  return Object.keys(ROUTER_DATA) as InlayRouterType[];
}

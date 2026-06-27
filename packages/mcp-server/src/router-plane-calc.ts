export type RouterPlaneType = "standard_closed_throat" | "small_palm_router" | "large_open_throat" | "vintage_womans_model" | "plow_fence_guide";

export function depthControl(t: RouterPlaneType): number {
  const m: Record<RouterPlaneType, number> = {
    standard_closed_throat: 10, small_palm_router: 7, large_open_throat: 9, vintage_womans_model: 6, plow_fence_guide: 8,
  };
  return m[t];
}

export function accessTight(t: RouterPlaneType): number {
  const m: Record<RouterPlaneType, number> = {
    standard_closed_throat: 7, small_palm_router: 10, large_open_throat: 6, vintage_womans_model: 8, plow_fence_guide: 5,
  };
  return m[t];
}

export function stability(t: RouterPlaneType): number {
  const m: Record<RouterPlaneType, number> = {
    standard_closed_throat: 9, small_palm_router: 5, large_open_throat: 10, vintage_womans_model: 6, plow_fence_guide: 8,
  };
  return m[t];
}

export function bladeVariety(t: RouterPlaneType): number {
  const m: Record<RouterPlaneType, number> = {
    standard_closed_throat: 8, small_palm_router: 4, large_open_throat: 9, vintage_womans_model: 5, plow_fence_guide: 10,
  };
  return m[t];
}

export function planeCost(t: RouterPlaneType): number {
  const m: Record<RouterPlaneType, number> = {
    standard_closed_throat: 3, small_palm_router: 2, large_open_throat: 3, vintage_womans_model: 2, plow_fence_guide: 3,
  };
  return m[t];
}

export function hasFence(t: RouterPlaneType): boolean {
  const m: Record<RouterPlaneType, boolean> = {
    standard_closed_throat: false, small_palm_router: false, large_open_throat: false, vintage_womans_model: false, plow_fence_guide: true,
  };
  return m[t];
}

export function oneHanded(t: RouterPlaneType): boolean {
  const m: Record<RouterPlaneType, boolean> = {
    standard_closed_throat: false, small_palm_router: true, large_open_throat: false, vintage_womans_model: true, plow_fence_guide: false,
  };
  return m[t];
}

export function bodyStyle(t: RouterPlaneType): string {
  const m: Record<RouterPlaneType, string> = {
    standard_closed_throat: "cast_iron_closed",
    small_palm_router: "bronze_palm_grip",
    large_open_throat: "cast_iron_wide_base",
    vintage_womans_model: "compact_light_body",
    plow_fence_guide: "iron_with_fence_arm",
  };
  return m[t];
}

export function bestJoint(t: RouterPlaneType): string {
  const m: Record<RouterPlaneType, string> = {
    standard_closed_throat: "dado_groove_clean",
    small_palm_router: "hinge_mortise_small",
    large_open_throat: "wide_housing_joint",
    vintage_womans_model: "inlay_recess_shallow",
    plow_fence_guide: "groove_plow_along",
  };
  return m[t];
}

export function routerPlanes(): RouterPlaneType[] {
  return ["standard_closed_throat", "small_palm_router", "large_open_throat", "vintage_womans_model", "plow_fence_guide"];
}

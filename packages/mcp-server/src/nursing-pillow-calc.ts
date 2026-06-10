export type NursingPillowType = "c_shape_classic" | "o_shape_wraparound" | "wedge_incline" | "twin_tandem" | "inflatable_travel";

export function supportLevel(t: NursingPillowType): number {
  const m: Record<NursingPillowType, number> = {
    c_shape_classic: 8, o_shape_wraparound: 9, wedge_incline: 6, twin_tandem: 10, inflatable_travel: 5,
  };
  return m[t];
}

export function positionVersatility(t: NursingPillowType): number {
  const m: Record<NursingPillowType, number> = {
    c_shape_classic: 7, o_shape_wraparound: 9, wedge_incline: 5, twin_tandem: 6, inflatable_travel: 4,
  };
  return m[t];
}

export function firmness(t: NursingPillowType): number {
  const m: Record<NursingPillowType, number> = {
    c_shape_classic: 7, o_shape_wraparound: 8, wedge_incline: 9, twin_tandem: 8, inflatable_travel: 5,
  };
  return m[t];
}

export function packability(t: NursingPillowType): number {
  const m: Record<NursingPillowType, number> = {
    c_shape_classic: 3, o_shape_wraparound: 2, wedge_incline: 5, twin_tandem: 1, inflatable_travel: 10,
  };
  return m[t];
}

export function pillowCost(t: NursingPillowType): number {
  const m: Record<NursingPillowType, number> = {
    c_shape_classic: 5, o_shape_wraparound: 7, wedge_incline: 4, twin_tandem: 8, inflatable_travel: 3,
  };
  return m[t];
}

export function removableCover(t: NursingPillowType): boolean {
  const m: Record<NursingPillowType, boolean> = {
    c_shape_classic: true, o_shape_wraparound: true, wedge_incline: true, twin_tandem: true, inflatable_travel: false,
  };
  return m[t];
}

export function backSupport(t: NursingPillowType): boolean {
  const m: Record<NursingPillowType, boolean> = {
    c_shape_classic: false, o_shape_wraparound: true, wedge_incline: false, twin_tandem: true, inflatable_travel: false,
  };
  return m[t];
}

export function fillType(t: NursingPillowType): string {
  const m: Record<NursingPillowType, string> = {
    c_shape_classic: "polyester_fiber_firm",
    o_shape_wraparound: "memory_foam_contour",
    wedge_incline: "dense_foam_wedge_block",
    twin_tandem: "dual_chamber_poly_fill",
    inflatable_travel: "pvc_air_bladder",
  };
  return m[t];
}

export function bestFeed(t: NursingPillowType): string {
  const m: Record<NursingPillowType, string> = {
    c_shape_classic: "general_breastfeed_bottle",
    o_shape_wraparound: "long_session_comfort",
    wedge_incline: "reflux_upright_feed",
    twin_tandem: "twins_simultaneous",
    inflatable_travel: "airplane_hotel_compact",
  };
  return m[t];
}

export function nursingPillows(): NursingPillowType[] {
  return ["c_shape_classic", "o_shape_wraparound", "wedge_incline", "twin_tandem", "inflatable_travel"];
}

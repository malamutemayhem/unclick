export type AwlPierceType = "bookbinding_straight" | "diamond_point_leather" | "scratch_awl_mark" | "brad_awl_pilot" | "sewing_awl_thread";

export function pierceClean(t: AwlPierceType): number {
  const m: Record<AwlPierceType, number> = {
    bookbinding_straight: 10, diamond_point_leather: 8, scratch_awl_mark: 5, brad_awl_pilot: 7, sewing_awl_thread: 9,
  };
  return m[t];
}

export function handleComfort(t: AwlPierceType): number {
  const m: Record<AwlPierceType, number> = {
    bookbinding_straight: 8, diamond_point_leather: 7, scratch_awl_mark: 6, brad_awl_pilot: 9, sewing_awl_thread: 8,
  };
  return m[t];
}

export function pointDurability(t: AwlPierceType): number {
  const m: Record<AwlPierceType, number> = {
    bookbinding_straight: 7, diamond_point_leather: 10, scratch_awl_mark: 8, brad_awl_pilot: 9, sewing_awl_thread: 7,
  };
  return m[t];
}

export function versatility(t: AwlPierceType): number {
  const m: Record<AwlPierceType, number> = {
    bookbinding_straight: 5, diamond_point_leather: 7, scratch_awl_mark: 9, brad_awl_pilot: 8, sewing_awl_thread: 6,
  };
  return m[t];
}

export function awlCost(t: AwlPierceType): number {
  const m: Record<AwlPierceType, number> = {
    bookbinding_straight: 1, diamond_point_leather: 2, scratch_awl_mark: 1, brad_awl_pilot: 1, sewing_awl_thread: 2,
  };
  return m[t];
}

export function forPaper(t: AwlPierceType): boolean {
  const m: Record<AwlPierceType, boolean> = {
    bookbinding_straight: true, diamond_point_leather: false, scratch_awl_mark: false, brad_awl_pilot: false, sewing_awl_thread: true,
  };
  return m[t];
}

export function hasThread(t: AwlPierceType): boolean {
  const m: Record<AwlPierceType, boolean> = {
    bookbinding_straight: false, diamond_point_leather: false, scratch_awl_mark: false, brad_awl_pilot: false, sewing_awl_thread: true,
  };
  return m[t];
}

export function pointShape(t: AwlPierceType): string {
  const m: Record<AwlPierceType, string> = {
    bookbinding_straight: "round_taper_point",
    diamond_point_leather: "diamond_facet_point",
    scratch_awl_mark: "conical_scratch_tip",
    brad_awl_pilot: "chisel_wedge_point",
    sewing_awl_thread: "curved_eye_needle",
  };
  return m[t];
}

export function bestCraft(t: AwlPierceType): string {
  const m: Record<AwlPierceType, string> = {
    bookbinding_straight: "signature_hole_punch",
    diamond_point_leather: "saddle_stitch_leather",
    scratch_awl_mark: "scribe_line_mark",
    brad_awl_pilot: "pilot_hole_wood",
    sewing_awl_thread: "lock_stitch_repair",
  };
  return m[t];
}

export function awlPierces(): AwlPierceType[] {
  return ["bookbinding_straight", "diamond_point_leather", "scratch_awl_mark", "brad_awl_pilot", "sewing_awl_thread"];
}

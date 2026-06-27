export type BookmarkType = "paper_card_flat" | "metal_clip_page" | "leather_ribbon" | "magnetic_fold_over" | "elastic_band_wrap";

export function pageHold(t: BookmarkType): number {
  const m: Record<BookmarkType, number> = {
    paper_card_flat: 4, metal_clip_page: 8, leather_ribbon: 5, magnetic_fold_over: 10, elastic_band_wrap: 7,
  };
  return m[t];
}

export function durability(t: BookmarkType): number {
  const m: Record<BookmarkType, number> = {
    paper_card_flat: 2, metal_clip_page: 8, leather_ribbon: 9, magnetic_fold_over: 7, elastic_band_wrap: 6,
  };
  return m[t];
}

export function pageGentle(t: BookmarkType): number {
  const m: Record<BookmarkType, number> = {
    paper_card_flat: 10, metal_clip_page: 4, leather_ribbon: 9, magnetic_fold_over: 8, elastic_band_wrap: 6,
  };
  return m[t];
}

export function aestheticAppeal(t: BookmarkType): number {
  const m: Record<BookmarkType, number> = {
    paper_card_flat: 5, metal_clip_page: 7, leather_ribbon: 10, magnetic_fold_over: 6, elastic_band_wrap: 4,
  };
  return m[t];
}

export function bookmarkCost(t: BookmarkType): number {
  const m: Record<BookmarkType, number> = {
    paper_card_flat: 1, metal_clip_page: 4, leather_ribbon: 6, magnetic_fold_over: 3, elastic_band_wrap: 2,
  };
  return m[t];
}

export function staysFlat(t: BookmarkType): boolean {
  const m: Record<BookmarkType, boolean> = {
    paper_card_flat: true, metal_clip_page: false, leather_ribbon: true, magnetic_fold_over: true, elastic_band_wrap: false,
  };
  return m[t];
}

export function marksExactLine(t: BookmarkType): boolean {
  const m: Record<BookmarkType, boolean> = {
    paper_card_flat: false, metal_clip_page: true, leather_ribbon: false, magnetic_fold_over: true, elastic_band_wrap: false,
  };
  return m[t];
}

export function materialType(t: BookmarkType): string {
  const m: Record<BookmarkType, string> = {
    paper_card_flat: "coated_cardstock_printed",
    metal_clip_page: "stainless_steel_spring_clip",
    leather_ribbon: "full_grain_leather_tassel",
    magnetic_fold_over: "laminated_card_magnet_pair",
    elastic_band_wrap: "woven_elastic_button_loop",
  };
  return m[t];
}

export function bestReader(t: BookmarkType): string {
  const m: Record<BookmarkType, string> = {
    paper_card_flat: "casual_paperback_reader",
    metal_clip_page: "reference_textbook_study",
    leather_ribbon: "hardcover_collector_gift",
    magnetic_fold_over: "commuter_bag_toss_safe",
    elastic_band_wrap: "journal_planner_wrap",
  };
  return m[t];
}

export function bookmarks(): BookmarkType[] {
  return ["paper_card_flat", "metal_clip_page", "leather_ribbon", "magnetic_fold_over", "elastic_band_wrap"];
}

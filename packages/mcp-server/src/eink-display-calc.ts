// eink-display-calc - e-ink display module types

export type EinkDisplay =
  | "mono_2_9_inch"
  | "tricolor_4_2_inch"
  | "flexible_eink_bend"
  | "partial_refresh_fast"
  | "large_7_5_inch";

const DATA: Record<EinkDisplay, {
  resolution: number; refreshSpeed: number; powerEfficient: number; contrastRatio: number;
  cost: number; color: boolean; partialRefresh: boolean; panelType: string; bestUse: string;
}> = {
  mono_2_9_inch:           { resolution: 6, refreshSpeed: 5, powerEfficient: 10, contrastRatio: 9, cost: 4, color: false, partialRefresh: false, panelType: "electrophoretic_bw", bestUse: "small_label_tag" },
  tricolor_4_2_inch:       { resolution: 7, refreshSpeed: 3, powerEfficient: 9, contrastRatio: 7, cost: 7, color: true, partialRefresh: false, panelType: "electrophoretic_bwr", bestUse: "price_tag_signage" },
  flexible_eink_bend:      { resolution: 5, refreshSpeed: 4, powerEfficient: 9, contrastRatio: 6, cost: 9, color: false, partialRefresh: false, panelType: "flexible_substrate", bestUse: "curved_surface_show" },
  partial_refresh_fast:    { resolution: 7, refreshSpeed: 9, powerEfficient: 8, contrastRatio: 8, cost: 6, color: false, partialRefresh: true, panelType: "fast_partial_epd", bestUse: "dynamic_info_update" },
  large_7_5_inch:          { resolution: 9, refreshSpeed: 4, powerEfficient: 8, contrastRatio: 9, cost: 8, color: false, partialRefresh: false, panelType: "large_panel_epd", bestUse: "dashboard_wall_mount" },
};

const get = (d: EinkDisplay) => DATA[d];
export const resolution = (d: EinkDisplay) => get(d).resolution;
export const refreshSpeed = (d: EinkDisplay) => get(d).refreshSpeed;
export const powerEfficient = (d: EinkDisplay) => get(d).powerEfficient;
export const contrastRatio = (d: EinkDisplay) => get(d).contrastRatio;
export const displayCost = (d: EinkDisplay) => get(d).cost;
export const color = (d: EinkDisplay) => get(d).color;
export const partialRefresh = (d: EinkDisplay) => get(d).partialRefresh;
export const panelType = (d: EinkDisplay) => get(d).panelType;
export const bestUse = (d: EinkDisplay) => get(d).bestUse;
export const einkDisplays = (): EinkDisplay[] => Object.keys(DATA) as EinkDisplay[];

export type LyeCalculatorType = "sap_table_manual" | "online_calc_auto" | "spreadsheet_custom" | "recipe_book_fixed" | "app_mobile_scan";

export function accuracy(t: LyeCalculatorType): number {
  const m: Record<LyeCalculatorType, number> = {
    sap_table_manual: 7, online_calc_auto: 9, spreadsheet_custom: 10, recipe_book_fixed: 5, app_mobile_scan: 8,
  };
  return m[t];
}

export function easeOfUse(t: LyeCalculatorType): number {
  const m: Record<LyeCalculatorType, number> = {
    sap_table_manual: 4, online_calc_auto: 9, spreadsheet_custom: 6, recipe_book_fixed: 10, app_mobile_scan: 10,
  };
  return m[t];
}

export function oilFlexibility(t: LyeCalculatorType): number {
  const m: Record<LyeCalculatorType, number> = {
    sap_table_manual: 8, online_calc_auto: 10, spreadsheet_custom: 10, recipe_book_fixed: 3, app_mobile_scan: 9,
  };
  return m[t];
}

export function batchScaling(t: LyeCalculatorType): number {
  const m: Record<LyeCalculatorType, number> = {
    sap_table_manual: 5, online_calc_auto: 10, spreadsheet_custom: 10, recipe_book_fixed: 4, app_mobile_scan: 9,
  };
  return m[t];
}

export function calcCost(t: LyeCalculatorType): number {
  const m: Record<LyeCalculatorType, number> = {
    sap_table_manual: 1, online_calc_auto: 1, spreadsheet_custom: 1, recipe_book_fixed: 2, app_mobile_scan: 1,
  };
  return m[t];
}

export function worksOffline(t: LyeCalculatorType): boolean {
  const m: Record<LyeCalculatorType, boolean> = {
    sap_table_manual: true, online_calc_auto: false, spreadsheet_custom: true, recipe_book_fixed: true, app_mobile_scan: false,
  };
  return m[t];
}

export function customRecipe(t: LyeCalculatorType): boolean {
  const m: Record<LyeCalculatorType, boolean> = {
    sap_table_manual: true, online_calc_auto: true, spreadsheet_custom: true, recipe_book_fixed: false, app_mobile_scan: true,
  };
  return m[t];
}

export function calcMethod(t: LyeCalculatorType): string {
  const m: Record<LyeCalculatorType, string> = {
    sap_table_manual: "manual_sap_value_lookup",
    online_calc_auto: "database_driven_auto",
    spreadsheet_custom: "formula_cell_custom",
    recipe_book_fixed: "pre_calculated_ratio",
    app_mobile_scan: "barcode_scan_lookup",
  };
  return m[t];
}

export function bestUser(t: LyeCalculatorType): string {
  const m: Record<LyeCalculatorType, string> = {
    sap_table_manual: "experienced_formulator",
    online_calc_auto: "beginner_first_batch",
    spreadsheet_custom: "production_scale_pro",
    recipe_book_fixed: "follow_recipe_start",
    app_mobile_scan: "mobile_workshop_quick",
  };
  return m[t];
}

export function lyeCalculators(): LyeCalculatorType[] {
  return ["sap_table_manual", "online_calc_auto", "spreadsheet_custom", "recipe_book_fixed", "app_mobile_scan"];
}

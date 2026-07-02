/**
 * Single source of truth for user-facing product/feature names.
 *
 * Lesson of the Boardroom rename: a brand name must never be baked into
 * contracts (database tables, API routes, tool/action names, env vars,
 * storage keys, generated artifacts). Those stay neutral and descriptive
 * (account_links, link_permissions, ...). UI copy imports the label
 * from here, so renaming a feature is a one-line change in this file
 * plus a copy review, never a migration.
 *
 * Adding a feature name? Same deal: pick a neutral internal identifier
 * first, then register the display label here.
 */

export const PRODUCT_NAMES = {
  /** People-linking under Connections. Internal identifier: account_links. */
  circle: "Circle",
} as const;

export type ProductNameKey = keyof typeof PRODUCT_NAMES;

export function productName(key: ProductNameKey): string {
  return PRODUCT_NAMES[key];
}

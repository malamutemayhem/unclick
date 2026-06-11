// SINGLE SOURCE OF TRUTH for all site-wide statistics.
//
// Counts are MEASURED from the generated catalogs, never maintained by hand,
// so the public numbers are the real ones on every build. Regenerating the
// catalogs (scripts/generate-app-catalog.mjs and the connector setup
// generator) refreshes every display automatically. Do not hardcode counts
// anywhere on a public surface; render from SITE_STATS instead.

import appCatalog from "@/data/app-catalog.generated.json";
import connectorSetup from "@/data/connector-setup.generated.json";

const APP_COUNT: number = appCatalog.appCount;
const TOOL_COUNT: number = appCatalog.toolCount;
const CATEGORY_COUNT: number = appCatalog.categories.length;
const PLATFORM_COUNT: number = connectorSetup.count;

export const SITE_STATS = {
  // Measured counts
  APPS: APP_COUNT,                  // connectors (apps) in the catalog
  TOOLS: TOOL_COUNT,                // callable tools across all apps
  TOOL_CATEGORIES: CATEGORY_COUNT,  // catalog categories
  PASSPORT_PLATFORMS: PLATFORM_COUNT, // platforms with a Passport setup flow

  // Formatted strings for display
  get APPS_DISPLAY() { return `${APP_COUNT}+`; },
  get TOOLS_DISPLAY() { return `${TOOL_COUNT.toLocaleString("en-US")}+`; },
  get PLATFORMS_DISPLAY() { return `${PLATFORM_COUNT}+`; },
} as const;

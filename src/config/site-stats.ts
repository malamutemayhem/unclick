// SINGLE SOURCE OF TRUTH for all site-wide statistics
// Update these numbers here and they propagate everywhere
// Last updated: 2026-05-01

export const SITE_STATS = {
  // Tool counts
  TOOL_GROUPS: 21,           // Number of tool groups in the hosted API catalog
  TOOL_FILES: 178,           // Number of tool files in the repo
  CALLABLE_ENDPOINTS: 450,   // Total callable endpoints across all tools

  // Passport
  BACKSTAGEPASS_PLATFORMS: 20, // Number of supported platform connectors

  // Categories
  TOOL_CATEGORIES: 8,        // Number of tool categories

  // Formatted strings for display
  get TOOLS_DISPLAY() { return `${this.TOOL_FILES}+`; },
  get ENDPOINTS_DISPLAY() { return `${this.CALLABLE_ENDPOINTS}+`; },
  get PLATFORMS_DISPLAY() { return `${this.BACKSTAGEPASS_PLATFORMS}+`; },
} as const;

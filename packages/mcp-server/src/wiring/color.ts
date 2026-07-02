// wiring/color.ts
// Per-app MCP wiring for the color connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Utilities

import { convertColor, getColorInfo, generateColorPalette, mixColors, checkContrastRatio } from "../color-tool.js";

export const colorTools = [
  // ── color-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "color_convert",
    description: "Convert a color from one format into ALL other formats (HEX, RGB, HSL, HSV, CMYK) at once.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        color: { type: "string", description: "The color value, e.g. #ff0000 or rgb(255,0,0)" },
        from: { type: "string", description: "Source format: hex, rgb, hsl, hsv, or cmyk" },
      },
      required: ["color", "from"],
    },
  },
  {
    name: "color_info",
    description: "Get information about a color (name, complementary, etc.).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        color: { type: "string" },
        format: { type: "string" },
      },
      required: ["color"],
    },
  },
  {
    name: "color_palette",
    description: "Generate a color palette from a base color.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        color: { type: "string" },
        type: { type: "string", description: "complementary, analogous, triadic, etc." },
        count: { type: "number" },
      },
      required: ["color"],
    },
  },
  {
    name: "color_mix",
    description: "Mix two colors together.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        color1: { type: "string" },
        color2: { type: "string" },
        ratio: { type: "number" },
      },
      required: ["color1", "color2"],
    },
  },
  {
    name: "color_contrast_ratio",
    description: "Check the contrast ratio between two colors.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        foreground: { type: "string" },
        background: { type: "string" },
      },
      required: ["foreground", "background"],
    },
  },
] as const;

export const colorHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // color-tool.ts
  color_convert:           (args) => Promise.resolve(convertColor(args)),
  color_info:              (args) => Promise.resolve(getColorInfo(args)),
  color_palette:           (args) => Promise.resolve(generateColorPalette(args)),
  color_mix:               (args) => Promise.resolve(mixColors(args)),
  color_contrast_ratio:    (args) => Promise.resolve(checkContrastRatio(args)),
};

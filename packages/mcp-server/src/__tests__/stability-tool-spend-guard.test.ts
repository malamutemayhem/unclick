import { describe, expect, it } from "vitest";

import { decideStabilityToolProviderCall } from "../stability-tool.js";

describe("Stability MCP tool spend guard", () => {
  it("blocks paid Stability tool calls without the caller API key signal", () => {
    expect(decideStabilityToolProviderCall("text-to-image", "stable-diffusion-xl-1024-v1-0", "")).toMatchObject({
      allowed: false,
      path_id: "mcp.stability.tool.text-to-image",
      provider: "Stability AI",
      model: "stable-diffusion-xl-1024-v1-0",
      cost_tier: "paid",
      default_allowed: false,
      reason: "paid_or_unknown_blocked",
      allow_paid_flag: "api_key argument",
    });
  });

  it("allows Stability tool calls when the caller supplied an API key", () => {
    expect(decideStabilityToolProviderCall("image-to-image", "stable-diffusion-xl-1024-v1-0", "sk-test")).toMatchObject({
      allowed: true,
      path_id: "mcp.stability.tool.image-to-image",
      provider: "Stability AI",
      model: "stable-diffusion-xl-1024-v1-0",
      cost_tier: "paid",
      default_allowed: false,
      reason: "explicit_paid_allowed",
      allow_paid_flag: "api_key argument",
    });
  });

  it("labels engine listing as a paid or unknown provider surface", () => {
    expect(decideStabilityToolProviderCall("engine-listing", "Stability AI /v1/engines/list", "")).toMatchObject({
      allowed: false,
      path_id: "mcp.stability.tool.engine-listing",
      provider: "Stability AI",
      model: "Stability AI /v1/engines/list",
      cost_tier: "paid_or_unknown",
      default_allowed: false,
      reason: "paid_or_unknown_blocked",
      allow_paid_flag: "api_key argument",
    });
  });
});

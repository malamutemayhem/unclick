import { describe, expect, it } from "vitest";
import {
  DEFAULT_MODELS,
  MODEL_ROLE_ENV,
  resolveModelForCallSite,
  resolveModelForRole,
  roleForCallSite,
} from "./model-split";

describe("resolveModelForRole", () => {
  it("returns the default when the env var is unset", () => {
    expect(resolveModelForRole("architect", {})).toBe(DEFAULT_MODELS.architect);
    expect(resolveModelForRole("editor", {})).toBe(DEFAULT_MODELS.editor);
  });

  it("editor default matches the legacy arena default (behaviour-preserving)", () => {
    expect(DEFAULT_MODELS.editor).toBe("claude-haiku-4-5-20251001");
  });

  it("honours an env override", () => {
    expect(
      resolveModelForRole("architect", { [MODEL_ROLE_ENV.architect]: "vendor/strong" }),
    ).toBe("vendor/strong");
    expect(
      resolveModelForRole("editor", { [MODEL_ROLE_ENV.editor]: " vendor/cheap " }),
    ).toBe("vendor/cheap");
  });

  it("falls back to the default for an empty override", () => {
    expect(resolveModelForRole("editor", { [MODEL_ROLE_ENV.editor]: "   " })).toBe(
      DEFAULT_MODELS.editor,
    );
  });
});

describe("roleForCallSite", () => {
  it("sends high-frequency calls to the editor regardless of context", () => {
    expect(roleForCallSite({ highFrequency: true, highContext: true })).toBe("editor");
    expect(roleForCallSite({ highFrequency: true, highContext: false })).toBe("editor");
  });

  it("sends low-frequency high-context calls to the architect", () => {
    expect(roleForCallSite({ highFrequency: false, highContext: true })).toBe("architect");
  });

  it("sends low-frequency low-context calls to the editor", () => {
    expect(roleForCallSite({ highFrequency: false, highContext: false })).toBe("editor");
  });
});

describe("resolveModelForCallSite", () => {
  it("classifies then resolves in one step", () => {
    // A planning call (low frequency, high context) -> architect default.
    expect(
      resolveModelForCallSite({ highFrequency: false, highContext: true }, {}),
    ).toBe(DEFAULT_MODELS.architect);
    // A per-row classify call (high frequency) -> editor default.
    expect(
      resolveModelForCallSite({ highFrequency: true, highContext: false }, {}),
    ).toBe(DEFAULT_MODELS.editor);
  });
});

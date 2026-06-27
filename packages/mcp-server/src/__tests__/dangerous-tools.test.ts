import { describe, it, expect } from "vitest";
import {
  isDangerousTool,
  isOwnerOnly,
  isSpendGated,
  getDangerTag,
  filterByAccess,
} from "../dangerous-tools.js";

describe("isDangerousTool", () => {
  it("identifies exec as dangerous", () => {
    expect(isDangerousTool("exec")).toBe(true);
    expect(isDangerousTool("shell")).toBe(true);
    expect(isDangerousTool("fs_write")).toBe(true);
  });

  it("does not flag safe tools", () => {
    expect(isDangerousTool("search_memory")).toBe(false);
    expect(isDangerousTool("stripe_customers")).toBe(false);
  });
});

describe("isOwnerOnly", () => {
  it("flags admin tools", () => {
    expect(isOwnerOnly("admin_wipe")).toBe(true);
    expect(isOwnerOnly("hard_forget")).toBe(true);
    expect(isOwnerOnly("save_identity")).toBe(true);
  });

  it("does not flag regular tools", () => {
    expect(isOwnerOnly("save_fact")).toBe(false);
  });
});

describe("isSpendGated", () => {
  it("flags LLM and generation tools", () => {
    expect(isSpendGated("anthropic_create_message")).toBe(true);
    expect(isSpendGated("openai_generate_image")).toBe(true);
    expect(isSpendGated("runway_generate_video")).toBe(true);
  });

  it("does not flag free-tier tools", () => {
    expect(isSpendGated("weather_current")).toBe(false);
  });
});

describe("getDangerTag", () => {
  it("returns correct tag for known tools", () => {
    expect(getDangerTag("exec")).toBe("command_execution");
    expect(getDangerTag("fs_delete")).toBe("filesystem_mutation");
    expect(getDangerTag("admin_wipe")).toBe("data_destruction");
  });

  it("returns undefined for unlisted tools", () => {
    expect(getDangerTag("search_memory")).toBeUndefined();
  });
});

describe("filterByAccess", () => {
  const tools = ["exec", "save_fact", "admin_wipe", "stripe_customers"];

  it("blocks dangerous tools over HTTP", () => {
    const result = filterByAccess(tools, { isOwner: true, isHttp: true });
    expect(result.denied.map(d => d.tool)).toContain("exec");
    expect(result.denied.map(d => d.tool)).toContain("admin_wipe");
    expect(result.allowed).toContain("save_fact");
    expect(result.allowed).toContain("stripe_customers");
  });

  it("blocks owner-only tools for non-owners", () => {
    const result = filterByAccess(tools, { isOwner: false, isHttp: false });
    expect(result.denied.map(d => d.tool)).toContain("admin_wipe");
    expect(result.allowed).toContain("exec");
  });

  it("allows everything for owner on non-HTTP", () => {
    const result = filterByAccess(tools, { isOwner: true, isHttp: false });
    expect(result.denied).toHaveLength(0);
    expect(result.allowed).toHaveLength(4);
  });
});

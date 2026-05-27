import { describe, expect, it } from "vitest";
import {
  canUseTestPassPack,
  normalizeTestPassEditVerdict,
  resolveTestPassAction,
  selectTestPassPackYaml,
  testPassPackSaveConflict,
} from "./testpass";

describe("TestPass API helpers", () => {
  it("normalizes manual edit verdicts including Other", () => {
    expect(normalizeTestPassEditVerdict("pass")).toBe("check");
    expect(normalizeTestPassEditVerdict("check")).toBe("check");
    expect(normalizeTestPassEditVerdict("fail")).toBe("fail");
    expect(normalizeTestPassEditVerdict("na")).toBe("na");
    expect(normalizeTestPassEditVerdict("other")).toBe("other");
    expect(normalizeTestPassEditVerdict("unknown")).toBeNull();
  });

  it("accepts canonical and legacy save_pack YAML body keys", () => {
    expect(selectTestPassPackYaml({ pack_yaml: "id: p" })).toBe("id: p");
    expect(selectTestPassPackYaml({ yaml: "id: p" })).toBe("id: p");
    expect(selectTestPassPackYaml({ pack_yaml: "" })).toBeNull();
  });

  it("accepts action from query first and body as admin UI fallback", () => {
    expect(resolveTestPassAction("status", { action: "run" })).toBe("status");
    expect(resolveTestPassAction(undefined, { action: "save_pack" })).toBe("save_pack");
    expect(resolveTestPassAction(undefined, {})).toBeUndefined();
  });

  it("allows only system packs or owned packs to be used by a caller", () => {
    expect(canUseTestPassPack({ owner_user_id: null }, "user-1")).toBe(true);
    expect(canUseTestPassPack({ owner_user_id: "user-1" }, "user-1")).toBe(true);
    expect(canUseTestPassPack({ owner_user_id: "user-2" }, "user-1")).toBe(false);
  });

  it("blocks save collisions with system or another user's pack slug", () => {
    expect(testPassPackSaveConflict(null, "user-1")).toBeNull();
    expect(testPassPackSaveConflict({ slug: "mine", owner_user_id: "user-1" }, "user-1")).toBeNull();
    expect(testPassPackSaveConflict({ slug: "testpass-core", owner_user_id: null }, "user-1")).toContain("reserved");
    expect(testPassPackSaveConflict({ slug: "team-pack", owner_user_id: "user-2" }, "user-1")).toContain("another user");
  });
});

import { describe, expect, it } from "vitest";
import { canViewTestpassRun } from "./memory-admin";

// Authorization rule for opening a single TestPass run by id (get_testpass_run).
// Guards the fix for the "Run not found" bug where a scheduled cron run (system
// pack testpass-core, stamped with TESTPASS_CRON_USER_ID) could be listed but
// not opened, while making sure another user's PRIVATE run stays unreachable by
// id enumeration.
describe("canViewTestpassRun", () => {
  const me = "user-A";

  it("allows the caller to open their own run (no pack lookup needed)", () => {
    expect(
      canViewTestpassRun({ runActorUserId: me, sessionUserId: me, packOwnerUserId: undefined, packFound: false }),
    ).toBe(true);
  });

  it("allows opening a system-pack run owned by a different actor (cron run)", () => {
    expect(
      canViewTestpassRun({ runActorUserId: "cron-user", sessionUserId: me, packOwnerUserId: null, packFound: true }),
    ).toBe(true);
  });

  it("blocks another user's private-pack run", () => {
    expect(
      canViewTestpassRun({ runActorUserId: "user-B", sessionUserId: me, packOwnerUserId: "user-B", packFound: true }),
    ).toBe(false);
  });

  it("blocks when the pack cannot be found (no system-pack proof)", () => {
    expect(
      canViewTestpassRun({ runActorUserId: "cron-user", sessionUserId: me, packOwnerUserId: undefined, packFound: false }),
    ).toBe(false);
  });

  it("does not treat a missing/undefined pack owner as a system pack", () => {
    // packFound true but owner undefined (defensive): must NOT pass as system.
    expect(
      canViewTestpassRun({ runActorUserId: "user-B", sessionUserId: me, packOwnerUserId: undefined, packFound: true }),
    ).toBe(false);
  });

  it("allows the caller's own run even when it is a system pack", () => {
    expect(
      canViewTestpassRun({ runActorUserId: me, sessionUserId: me, packOwnerUserId: null, packFound: true }),
    ).toBe(true);
  });
});

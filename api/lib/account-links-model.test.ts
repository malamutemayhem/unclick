import { describe, expect, it } from "vitest";

import {
  buildCirclePermissionState,
  countActiveOutboundShares,
  normalizeCircleEmail,
  type LinkPermissionRow,
} from "./account-links-model";

describe("account links Circle model", () => {
  it("normalizes invite emails", () => {
    expect(normalizeCircleEmail(" Alice@Example.COM ")).toBe("alice@example.com");
  });

  it("requires both sides before a share is active", () => {
    const rows: LinkPermissionRow[] = [
      {
        link_id: "link-1",
        owner_user_id: "me",
        grantee_user_id: "them",
        permission: "shared_memory",
        owner_enabled: true,
        grantee_enabled: false,
      },
      {
        link_id: "link-1",
        owner_user_id: "them",
        grantee_user_id: "me",
        permission: "shared_orchestrator",
        owner_enabled: true,
        grantee_enabled: true,
      },
    ];

    const state = buildCirclePermissionState("me", "them", rows);

    expect(state.shared_memory.give_enabled).toBe(true);
    expect(state.shared_memory.give_active).toBe(false);
    expect(state.shared_orchestrator.receive_active).toBe(true);
  });

  it("counts people with active outbound sharing", () => {
    const withActiveMemory = buildCirclePermissionState("me", "them", [
      {
        link_id: "link-1",
        owner_user_id: "me",
        grantee_user_id: "them",
        permission: "shared_memory",
        owner_enabled: true,
        grantee_enabled: true,
      },
    ]);
    const withoutActiveSharing = buildCirclePermissionState("me", "other", [
      {
        link_id: "link-2",
        owner_user_id: "me",
        grantee_user_id: "other",
        permission: "shared_orchestrator",
        owner_enabled: true,
        grantee_enabled: false,
      },
    ]);

    expect(countActiveOutboundShares([withActiveMemory, withoutActiveSharing])).toBe(1);
  });
});

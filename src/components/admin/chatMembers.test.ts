import { afterEach, describe, it, expect, vi } from "vitest";
import {
  fetchConnectedMembers,
  fetchRoomMembers,
  fetchPendingHandshakes,
  respondToHandshake,
} from "./chatMembers";

// A fetch stub that returns the given body with status 200 (or a chosen
// status), capturing the calls so we can assert URL + method + payload.
function stubFetch(body: unknown, ok = true, status = 200) {
  const spy = vi.fn().mockResolvedValue({
    ok,
    status,
    json: async () => body,
  } as Response);
  vi.stubGlobal("fetch", spy);
  return spy;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const linksBody = {
  links: [
    {
      id: "link-accepted",
      status: "accepted",
      direction: "linked",
      person: {
        user_id: "u-1",
        email: "a@x.com",
        display_name: "Ada",
        avatar_url: null,
      },
      created_at: "2026-06-01T00:00:00Z",
    },
    {
      id: "link-received",
      status: "pending",
      direction: "received",
      person: {
        user_id: "u-2",
        email: "b@x.com",
        display_name: "Boris",
        avatar_url: null,
      },
      created_at: "2026-06-02T00:00:00Z",
    },
    {
      id: "link-sent",
      status: "pending",
      direction: "sent",
      person: {
        user_id: "u-3",
        email: "c@x.com",
        display_name: "Cleo",
        avatar_url: null,
      },
      created_at: "2026-06-03T00:00:00Z",
    },
  ],
};

describe("fetchConnectedMembers", () => {
  it("returns only accepted links, shaped for the member rail", async () => {
    stubFetch(linksBody);
    const members = await fetchConnectedMembers("token");
    expect(members).toHaveLength(1);
    expect(members?.[0]).toMatchObject({
      id: "link-accepted",
      userId: "u-1",
      label: "Ada",
    });
  });

  it("returns null when the request fails", async () => {
    stubFetch({}, false, 500);
    expect(await fetchConnectedMembers("token")).toBeNull();
  });
});

describe("fetchRoomMembers", () => {
  it("returns active room members shaped for the member rail", async () => {
    const spy = stubFetch({
      members: [
        {
          id: "member-owner",
          member_lane_hash: "lane-owner",
          role: "owner",
          status: "active",
          user_id: "u-owner",
          email: "owner@example.com",
          display_name: "Owner",
          avatar_url: null,
        },
        {
          id: "member-left",
          member_lane_hash: "lane-left",
          role: "member",
          status: "left",
          user_id: "u-left",
          email: "left@example.com",
          display_name: "Left",
          avatar_url: null,
        },
      ],
    });
    const members = await fetchRoomMembers("token", "thread-1");
    expect(members).toHaveLength(1);
    expect(members?.[0]).toMatchObject({
      id: "member-owner",
      userId: "u-owner",
      label: "Owner",
      memberLaneHash: "lane-owner",
      role: "owner",
    });
    expect(spy.mock.calls[0][0]).toBe(
      "/api/chat-threads?action=members&thread_id=thread-1",
    );
  });

  it("returns null when the request fails", async () => {
    stubFetch({}, false, 403);
    expect(await fetchRoomMembers("token", "thread-1")).toBeNull();
  });
});

describe("fetchPendingHandshakes", () => {
  it("returns only pending+received links (not sent, not accepted)", async () => {
    stubFetch(linksBody);
    const pending = await fetchPendingHandshakes("token");
    expect(pending).toHaveLength(1);
    expect(pending?.[0]).toMatchObject({
      id: "link-received",
      label: "Boris",
      email: "b@x.com",
      createdAt: "2026-06-02T00:00:00Z",
    });
  });

  it("falls back to a generic label when no name or email is present", async () => {
    stubFetch({
      links: [
        {
          id: "link-x",
          status: "pending",
          direction: "received",
          person: {
            user_id: null,
            email: null,
            display_name: null,
            avatar_url: null,
          },
        },
      ],
    });
    const pending = await fetchPendingHandshakes("token");
    expect(pending?.[0].label).toBe("Someone");
  });

  it("returns null when the request fails", async () => {
    stubFetch({}, false, 500);
    expect(await fetchPendingHandshakes("token")).toBeNull();
  });
});

describe("respondToHandshake", () => {
  it("posts accept to the correct endpoint with the link_id and returns true", async () => {
    const spy = stubFetch({ success: true });
    const ok = await respondToHandshake("token", "link-received", "accept");
    expect(ok).toBe(true);
    const [url, init] = spy.mock.calls[0];
    expect(url).toBe("/api/account-links?action=accept");
    expect((init as RequestInit).method).toBe("POST");
    expect(JSON.parse((init as RequestInit).body as string)).toEqual({
      link_id: "link-received",
    });
  });

  it("posts decline and returns false on a failed response", async () => {
    const spy = stubFetch({ error: "nope" }, false, 409);
    const ok = await respondToHandshake("token", "link-x", "decline");
    expect(ok).toBe(false);
    expect(spy.mock.calls[0][0]).toBe("/api/account-links?action=decline");
  });
});

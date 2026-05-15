import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const posthogCapture = vi.hoisted(() => vi.fn());

vi.mock("./posthog", () => ({
  posthog: {
    capture: posthogCapture,
  },
}));

import { track, trackPageView } from "./analytics";

type TestWindow = Window &
  typeof globalThis & {
    umami?: {
      track?: (event: string, data?: Record<string, unknown>) => void;
    };
  };

describe("analytics", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    posthogCapture.mockReset();
    fetchMock.mockReset();
    fetchMock.mockResolvedValue(new Response(null, { status: 202 }));
    vi.stubGlobal("fetch", fetchMock);
    document.title = "UnClick Test Page";
    window.history.replaceState({}, "", "/test-path?from=analytics#proof");
  });

  afterEach(() => {
    Reflect.deleteProperty(window, "umami");
    vi.unstubAllGlobals();
  });

  function latestNativePayload() {
    const request = fetchMock.mock.calls[fetchMock.mock.calls.length - 1]?.[1] as RequestInit | undefined;
    return JSON.parse(String(request?.body));
  }

  it("emits route page views to native analytics, PostHog, and the optional Umami fallback", () => {
    const umamiTrack = vi.fn();
    (window as TestWindow).umami = { track: umamiTrack };

    trackPageView("/test-path?from=analytics#proof");

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/analytics",
      expect.objectContaining({
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
      }),
    );
    expect(latestNativePayload()).toEqual({
      event: "$pageview",
      path: "/test-path?from=analytics#proof",
      title: "UnClick Test Page",
      properties: {
        path: "/test-path?from=analytics#proof",
        title: "UnClick Test Page",
        $current_url: "http://localhost:3000/test-path?from=analytics#proof",
        $pathname: "/test-path?from=analytics#proof",
      },
    });
    expect(posthogCapture).toHaveBeenCalledWith("$pageview", {
      path: "/test-path?from=analytics#proof",
      title: "UnClick Test Page",
      $current_url: "http://localhost:3000/test-path?from=analytics#proof",
      $pathname: "/test-path?from=analytics#proof",
    });
    expect(umamiTrack).toHaveBeenCalledWith("pageview", {
      path: "/test-path?from=analytics#proof",
      title: "UnClick Test Page",
      $current_url: "http://localhost:3000/test-path?from=analytics#proof",
      $pathname: "/test-path?from=analytics#proof",
    });
  });

  it("emits signup events through the safe analytics wrapper", () => {
    const umamiTrack = vi.fn();
    (window as TestWindow).umami = { track: umamiTrack };

    track("signup_started", { method: "magic", page: "/signup" });

    expect(latestNativePayload()).toEqual({
      event: "signup_started",
      path: "/test-path?from=analytics#proof",
      title: "UnClick Test Page",
      properties: {
        method: "magic",
        page: "/signup",
      },
    });
    expect(posthogCapture).toHaveBeenCalledWith("signup_started", {
      method: "magic",
      page: "/signup",
    });
    expect(umamiTrack).toHaveBeenCalledWith("signup_started", {
      method: "magic",
      page: "/signup",
    });
  });

  it("never lets analytics failures throw into the app", () => {
    posthogCapture.mockImplementationOnce(() => {
      throw new Error("analytics provider unavailable");
    });

    expect(() => track("signup_started", { method: "google" })).not.toThrow();
    expect(() => trackPageView("/safe-even-when-provider-fails")).not.toThrow();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});

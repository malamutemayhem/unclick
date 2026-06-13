import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import CodeTab from "./CodeTab";

function jsonResponse(body: unknown) {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(body),
  } as Response);
}

describe("CodeTab", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("shows captured code with the auto-capture state", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        jsonResponse({
          auto_capture: { code: true, library: false },
          data: [
            {
              id: "code-1",
              session_id: "session-1",
              language: "ts",
              filename: null,
              description: "ts: const receipt = await saveTurn();",
              content: "const receipt = await saveTurn();\nconsole.log(receipt);",
              created_at: "2026-06-08T00:00:00.000Z",
            },
          ],
        }),
      ),
    );

    render(<CodeTab apiKey="test-token" />);

    expect(await screen.findByText("Automatic code capture is on")).toBeInTheDocument();
    expect(screen.getByText("ts: const receipt = await saveTurn();")).toBeInTheDocument();
    expect(screen.getByText("2 lines")).toBeInTheDocument();
    expect(screen.getByText("session-1")).toBeInTheDocument();
  });

  it("explains when the Code store exists but auto-capture is off", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => jsonResponse({ auto_capture: { code: false }, data: [] })),
    );

    render(<CodeTab apiKey="test-token" />);

    expect(await screen.findByText("Automatic code capture is off")).toBeInTheDocument();
    expect(screen.getByText("No code captured yet")).toBeInTheDocument();
    expect(screen.getByText("Turn on MEMORY_CODE_AUTOCAPTURE_ENABLED")).toBeInTheDocument();
  });
});

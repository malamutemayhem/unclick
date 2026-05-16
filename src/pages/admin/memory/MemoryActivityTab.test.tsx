import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import MemoryActivityTab from "./MemoryActivityTab";

function makeActivity(topFactCount: number) {
  return {
    facts_by_day: {},
    storage: {
      business_context: 0,
      knowledge_library: 0,
      session_summaries: 0,
      extracted_facts: topFactCount,
      conversation_log: 0,
      code_dumps: 0,
      total: topFactCount,
    },
    recent_decay: [],
    top_facts: Array.from({ length: topFactCount }, (_, index) => ({
      id: `fact-${index + 1}`,
      fact: `fact ${index + 1}`,
      category: "technical",
      access_count: topFactCount - index,
      decay_tier: "hot",
    })),
  };
}

describe("MemoryActivityTab", () => {
  const fetchCalls: string[] = [];

  beforeEach(() => {
    fetchCalls.length = 0;
    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL) => {
        const url = String(input);
        fetchCalls.push(url);
        const topFactCount = url.includes("top_facts_limit=110") ? 110 : 10;

        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(makeActivity(topFactCount)),
        });
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("loads more accessed facts on request", async () => {
    render(<MemoryActivityTab apiKey="test-token" />);

    await screen.findByText("Most Accessed Facts");

    expect(fetchCalls[0]).toContain("top_facts_limit=10");
    expect(screen.getByText("fact 10")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Show 100 more/i }));

    await waitFor(() => {
      expect(fetchCalls.some((url) => url.includes("top_facts_limit=110"))).toBe(true);
    });
    expect(await screen.findByText("fact 110")).toBeInTheDocument();
  });
});

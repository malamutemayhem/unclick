import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LibraryTab from "./LibraryTab";

function jsonResponse(body: unknown) {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(body),
  } as Response);
}

const docs = [
  {
    id: "doc-product",
    slug: "memory-taxonomy-07-projects-and-products",
    title: "Projects memory snapshot",
    category: "07 Projects & Products",
    tags: ["source:fact", "roadmap"],
    version: 2,
    updated_at: "2026-05-14T03:00:00.000Z",
    decay_tier: "warm",
  },
  {
    id: "doc-memory",
    slug: "memory-taxonomy-15-data-and-memory",
    title: "Data memory snapshot",
    category: "15 Data & Memory",
    tags: ["source:session"],
    version: 1,
    updated_at: "2026-05-14T02:00:00.000Z",
    decay_tier: "hot",
  },
  {
    id: "doc-product-older",
    slug: "project-follow-up",
    title: "Project follow-up",
    category: "07 Projects & Products",
    tags: ["source:session"],
    version: 1,
    updated_at: "2026-05-14T01:00:00.000Z",
    decay_tier: "cold",
  },
];

describe("LibraryTab", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("method=list")) return jsonResponse({ data: docs });
        if (url.includes("method=view")) return jsonResponse({ data: { content: "Sources: fact:doc-memory" } });
        if (url.includes("method=history")) return jsonResponse({ data: [] });
        return jsonResponse({});
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders existing library docs under deterministic taxonomy shelves", async () => {
    render(React.createElement(LibraryTab, { apiKey: "test-key" }));

    await screen.findByText("07 Projects & Products");

    expect(screen.getByText("15 Data & Memory")).toBeInTheDocument();
    expect(screen.getByText("Projects memory snapshot")).toBeInTheDocument();
    expect(screen.getByText("Project follow-up")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /07 Projects & Products/i }));

    await waitFor(() => {
      expect(screen.queryByText("Projects memory snapshot")).not.toBeInTheDocument();
    });
    expect(screen.getByText("Data memory snapshot")).toBeInTheDocument();
  });

  it("shows taxonomy storage proof status when library is empty", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("method=list")) return jsonResponse({ data: [] });
        if (url.includes("method=taxonomy_status")) {
          return jsonResponse({
            data: {
              snapshot_count: 0,
              proof_ready: false,
              blocker:
                "No memory snapshot rows found yet. Run taxonomy snapshot refresh in commit mode to write source-linked snapshots.",
            },
          });
        }
        return jsonResponse({});
      }),
    );

    render(React.createElement(LibraryTab, { apiKey: "test-key" }));

    await screen.findByText("No Library Snapshots yet");
    expect(
      screen.getByText(
        "No memory snapshot rows found yet. Run taxonomy snapshot refresh in commit mode to write source-linked snapshots.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Storage proof check: 0 snapshot rows currently detected.")).toBeInTheDocument();
  });
});

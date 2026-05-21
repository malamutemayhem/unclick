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

  it("previews and commits taxonomy refresh with an explicit write request", async () => {
    const refreshBodies: Array<Record<string, unknown>> = [];
    let listCalls = 0;
    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(input);
        if (url.includes("method=list")) {
          listCalls += 1;
          return jsonResponse({ data: listCalls === 1 ? [] : docs });
        }
        if (url.includes("action=admin_library") && init?.method === "POST") {
          const body = JSON.parse(String(init.body ?? "{}"));
          refreshBodies.push(body);
          return jsonResponse({
            data: {
              dry_run: body.dry_run,
              source_count: 7,
              snapshot_count: 2,
              planned_snapshot_count: 2,
              written_count: body.commit ? 2 : 0,
              skipped_secret_count: 1,
            },
          });
        }
        return jsonResponse({});
      }),
    );

    render(React.createElement(LibraryTab, { apiKey: "test-key" }));

    await screen.findByText("No Library Snapshots yet");

    fireEvent.click(screen.getByRole("button", { name: /Preview Refresh/i }));
    await waitFor(() => {
      expect(refreshBodies[0]).toMatchObject({
        method: "refresh_taxonomy_snapshots",
        commit: false,
        dry_run: true,
      });
    });
    expect(screen.getByText(/Preview: 2 planned, 0 written, 7 sources, 1 skipped/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Write Snapshots/i }));
    await waitFor(() => {
      expect(refreshBodies[1]).toMatchObject({
        method: "refresh_taxonomy_snapshots",
        commit: true,
        dry_run: false,
      });
    });
    await screen.findByText("Projects memory snapshot");
  });
});

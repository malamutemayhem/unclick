import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import HomePreviewB from "./HomePreviewB";

vi.mock("@/lib/auth", () => ({
  useSession: () => ({ session: null }),
}));

vi.mock("@/components/FadeIn", () => ({
  default: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
}));

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return { ...actual, useReducedMotion: () => true };
});

function renderPage() {
  return render(
    <MemoryRouter initialEntries={["/home-preview-b"]}>
      <HomePreviewB />
    </MemoryRouter>,
  );
}

describe("HomePreviewB", () => {
  it("keeps the brand headline, the map, and the install path", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Every tool\.\s*One install\./,
    );
    expect(
      screen.getByRole("img", { name: /UnClick system map/i }),
    ).toBeInTheDocument();
    expect(document.getElementById("install")).not.toBeNull();
  });

  it("carries the deck statements as bands", () => {
    renderPage();
    for (const statement of [
      /Give your AI a seat at the\s?table\./,
      /Every app you already\s?use\./,
      /Your AI forgets everything\. UnClick\s?doesn't\./,
      /Checked before it runs\./,
      /Not one bot\. A whole\s?team\./,
    ]) {
      expect(screen.getByText(statement)).toBeInTheDocument();
    }
    for (const check of ["works", "reads well", "safe", "honest", "looks right"]) {
      expect(screen.getByText(check)).toBeInTheDocument();
    }
  });

  it("speaks plainly: no endpoint ids or internal product jargon", () => {
    const { container } = renderPage();
    const main = container.querySelector("main");
    const text = main?.textContent ?? "";
    expect(text).not.toMatch(/XGate|XPass|ScopeGate|Orchestrator/);
    expect(text).not.toMatch(/[a-z]+_[a-z]+_?[a-z]*\(/);
  });

  it("marks the preview noindex while it is a design sample", () => {
    renderPage();
    const robots = document.head.querySelector('meta[name="robots"]');
    expect(robots?.getAttribute("content")).toBe("noindex");
  });
});

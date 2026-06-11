import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import HomePreview from "./HomePreview";

vi.mock("@/lib/auth", () => ({
  useSession: () => ({ session: null }),
}));

vi.mock("@/components/FadeIn", () => ({
  default: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
}));

// The run console renders complete under reduced motion; force that path
// so the test never races the sequencer timers.
vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return { ...actual, useReducedMotion: () => true };
});

function renderPage() {
  return render(
    <MemoryRouter initialEntries={["/home-preview"]}>
      <HomePreview />
    </MemoryRouter>,
  );
}

describe("HomePreview", () => {
  it("keeps the brand headline and the install path", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Every tool.One install.",
    );
    expect(screen.getAllByText("Get started").length).toBeGreaterThan(0);
    // The live install section ships unchanged on the preview.
    expect(document.getElementById("install")).not.toBeNull();
  });

  it("plays a complete run in the console under reduced motion", () => {
    renderPage();
    expect(screen.getByText(/Fix the broken pricing link and ship it/)).toBeInTheDocument();
    expect(screen.getByText("load_memory")).toBeInTheDocument();
    expect(screen.getByText("XGate · ScopeGate")).toBeInTheDocument();
  });

  it("keeps all five product rails linked to their live routes", () => {
    renderPage();
    const links = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    for (const href of ["/tools", "/memory", "/admin/keychain", "/admin/autopilot", "/dogfood"]) {
      expect(links, `expected a rail linking to ${href}`).toContain(href);
    }
  });

  it("ships no invented latency or token claims in page copy", () => {
    const { container } = renderPage();
    expect(container.textContent).not.toMatch(/~[\d,]+ms|~[\d,]+ tokens/);
  });

  it("marks the preview noindex while it is a design sample", () => {
    renderPage();
    const robots = document.head.querySelector('meta[name="robots"]');
    expect(robots?.getAttribute("content")).toBe("noindex");
  });
});

import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import HomePreviewC from "./HomePreviewC";
import HomePreviewD from "./HomePreviewD";
import HomePreviewE from "./HomePreviewE";
import HomePreviewF from "./HomePreviewF";
import HomePreviewG from "./HomePreviewG";
import HomePreviewH from "./HomePreviewH";
import HomePreviewI from "./HomePreviewI";
import HomePreviewJ from "./HomePreviewJ";
import HomePreviewK from "./HomePreviewK";
import HomePreviewL from "./HomePreviewL";
import HomePreviewM from "./HomePreviewM";
import HomePreviewN from "./HomePreviewN";
import HomePreviewO from "./HomePreviewO";
import HomePreviewP from "./HomePreviewP";
import HomePreviewQ from "./HomePreviewQ";
import HomePreviewR from "./HomePreviewR";

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

const OPTIONS = [
  { id: "c", Page: HomePreviewC, signature: /Just/ },
  { id: "d", Page: HomePreviewD, signature: /Give your AI/ },
  { id: "e", Page: HomePreviewE, signature: /A day with/ },
  { id: "f", Page: HomePreviewF, signature: /Same AI\./ },
  { id: "g", Page: HomePreviewG, signature: /Your AI can think\./ },
  { id: "h", Page: HomePreviewH, signature: /seat at/ },
  { id: "i", Page: HomePreviewI, signature: /One brain\./ },
  { id: "j", Page: HomePreviewJ, signature: /Where AI/ },
  { id: "k", Page: HomePreviewK, signature: /One remote\./ },
  { id: "l", Page: HomePreviewL, signature: /one\s?room\./ },
  { id: "m", Page: HomePreviewM, signature: /It just works\./ },
  { id: "n", Page: HomePreviewN, signature: /Done\./ },
  { id: "o", Page: HomePreviewO, signature: /Flip one/ },
  { id: "p", Page: HomePreviewP, signature: /new\s?dock\./ },
  { id: "q", Page: HomePreviewQ, signature: /Every tool\./ },
  { id: "r", Page: HomePreviewR, signature: /One\s?bubble\./ },
] as const;

function renderPage(Page: React.ComponentType) {
  return render(
    <MemoryRouter>
      <Page />
    </MemoryRouter>,
  );
}

afterEach(cleanup);

describe.each(OPTIONS)("HomePreview option $id", ({ Page, signature }) => {
  it("renders its signature headline and keeps the install path", () => {
    renderPage(Page);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(signature);
    expect(document.getElementById("install")).not.toBeNull();
  });

  it("speaks plainly: no internal product jargon in its own sections", () => {
    const { container } = renderPage(Page);
    const main = container.querySelector("main");
    expect(main?.textContent ?? "").not.toMatch(/ScopeGate|Orchestrator|XGate|XPass/);
  });

  it("marks the preview noindex while it is a design sample", () => {
    renderPage(Page);
    const robots = document.head.querySelector('meta[name="robots"]');
    expect(robots?.getAttribute("content")).toBe("noindex");
  });
});

import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import AppDetail from "./AppDetail";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/apps/:slug" element={<AppDetail />} />
      </Routes>
    </MemoryRouter>,
  );
}

afterEach(cleanup);

describe("AppDetail", () => {
  it("renders a real app's info, tools, and a Passport connect link", () => {
    renderAt("/apps/github");
    expect(screen.getByRole("heading", { name: "GitHub", level: 2 })).toBeInTheDocument();
    expect(screen.getByText(/what GitHub can do/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Open Passport/i })).toHaveAttribute("href", "/admin/keychain");
    expect(screen.getByText(/How your AI uses GitHub/i)).toBeInTheDocument();
  });

  it("shows a friendly not-found for an unknown slug", () => {
    renderAt("/apps/not-a-real-app");
    expect(screen.getByRole("heading", { name: /App not found/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Browse all apps/i })).toHaveAttribute("href", "/apps");
  });
});

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import AdminBrainmap from "./AdminBrainmap";

describe("AdminBrainmap", () => {
  it("renders the generated ecosystem Brainmap with meaning attached", () => {
    render(React.createElement(AdminBrainmap));

    expect(screen.getByRole("heading", { name: "Ecosystem Brainmap" })).toBeInTheDocument();
    expect(screen.getByText("Internal admin only")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Human orientation" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Core admin surfaces" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Worker tree" })).toBeInTheDocument();
    expect(screen.getByText("AI seat packet")).toBeInTheDocument();
    expect(screen.getAllByText("/admin/jobs").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Operational job and task queue.").length).toBeGreaterThan(0);
    expect(screen.getByText("Raw generated Brainmap")).toBeInTheDocument();
    expect(screen.getAllByText("Pages and Meaning").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Tool Families and Meaning").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Launchpad Route").length).toBeGreaterThan(0);
    expect(screen.getByText(/teaches seats what the system is/i)).toBeInTheDocument();
  });
});

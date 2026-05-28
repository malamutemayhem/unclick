import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import CopyPassCatalog from "./CopyPassCatalog";

describe("CopyPassCatalog", () => {
  it("surfaces the CopyRoom receipt contract for exact-copy worker jobs", () => {
    render(React.createElement(CopyPassCatalog));

    expect(screen.getByRole("heading", { name: "CopyPass" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Exact-copy receipt rail" })).toBeInTheDocument();
    expect(screen.getByText("copyroom_required")).toBeInTheDocument();
    expect(screen.getByText("copyroom_source_packet")).toBeInTheDocument();
    expect(screen.getByText("copyroom_receipt")).toBeInTheDocument();
    expect(screen.getByText("COPYROOM_MISSING")).toBeInTheDocument();
    expect(screen.getByText("FIDELITY_DRIFT_RISK")).toBeInTheDocument();
    expect(screen.getByText(/matching hashes/i)).toBeInTheDocument();
  });
});

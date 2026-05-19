import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import JobsmithPage from "./Jobsmith";

vi.mock("@/lib/auth", () => ({
  useSession: () => ({ session: null }),
}));

vi.mock("@/components/FadeIn", () => ({
  default: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
}));

function renderJobsmith() {
  return render(
    <MemoryRouter initialEntries={["/jobsmith"]}>
      <JobsmithPage />
    </MemoryRouter>,
  );
}

describe("JobsmithPage", () => {
  it("blocks the starter packet until role basics and proof are present", () => {
    renderJobsmith();

    expect(screen.getByRole("heading", { name: "Application packet builder" })).toBeInTheDocument();
    expect(screen.getByText("Jobsmith")).toBeInTheDocument();
    const welcomePacket = screen.getByRole("region", { name: "Jobsmith AI welcome packet" });
    expect(welcomePacket).toHaveTextContent("AI Welcome Packet");
    expect(welcomePacket).toHaveTextContent("JobSmith manages a job application run");
    expect(welcomePacket).toHaveTextContent("Needs intake");
    expect(welcomePacket).toHaveTextContent("Company");
    expect(welcomePacket).toHaveTextContent("Source-backed claim");
    expect(welcomePacket).toHaveTextContent("Safest next move");
    expect(screen.getByRole("region", { name: "Jobsmith universal rules" })).toHaveTextContent("Universal Rules v1");
    expect(screen.getByRole("region", { name: "Jobsmith universal rules" })).toHaveTextContent("229");
    expect(screen.getByRole("region", { name: "Jobsmith universal rules" })).toHaveTextContent("Standard headings pass");
    const managedRunReport = screen.getByRole("region", { name: "Jobsmith managed run report" });
    expect(managedRunReport).toHaveTextContent("Managed Run Report");
    expect(managedRunReport).toHaveTextContent("Rules passed");
    expect(managedRunReport).toHaveTextContent("Run steps");
    expect(managedRunReport).toHaveTextContent("Final report");
    expect(managedRunReport).toHaveTextContent("Blockers");
    expect(managedRunReport).toHaveTextContent("No run proof attached yet.");
    expect(managedRunReport).toHaveTextContent("Decision cards");
    expect(managedRunReport).toHaveTextContent("Not submit-ready");
    expect(managedRunReport).toHaveTextContent("Missing application inputs");

    fireEvent.change(screen.getByLabelText("Source-backed claim"), {
      target: { value: "Led a redesign that improved checkout completion." },
    });

    const packet = screen.getByRole("region", { name: "Starter packet" });
    expect(packet).toHaveTextContent("Packet locked");
    expect(packet).toHaveTextContent("Add company, role, and job source");
    expect(packet).toHaveTextContent("Add one claim and one source or proof note");
    expect(within(packet).getByRole("button", { name: "Copy packet" })).toBeDisabled();
  });

  it("builds a ready browser-local starter packet from one source-backed claim", () => {
    renderJobsmith();

    fireEvent.change(screen.getByLabelText("Company"), { target: { value: "Example Studio" } });
    fireEvent.change(screen.getByLabelText("Role"), { target: { value: "Senior Product Designer" } });
    fireEvent.change(screen.getByLabelText("Job source"), { target: { value: "https://example.com/jobs/designer" } });
    fireEvent.change(screen.getByLabelText("Source-backed claim"), {
      target: { value: "Shipped a product redesign with documented conversion improvement." },
    });
    fireEvent.change(screen.getByLabelText("Source or proof note"), {
      target: { value: "Portfolio case study and CV project notes show the redesign proof." },
    });

    const readiness = screen.getByRole("region", { name: "ATS and paste readiness" });
    expect(readiness).toHaveTextContent("Ready");
    expect(readiness).toHaveTextContent("No brittle ATS formatting language detected");

    const welcomePacket = screen.getByRole("region", { name: "Jobsmith AI welcome packet" });
    expect(welcomePacket).toHaveTextContent("Draft ready for review");
    expect(welcomePacket).toHaveTextContent("Company: Example Studio");
    expect(welcomePacket).toHaveTextContent("Source-backed claim captured");
    expect(welcomePacket).toHaveTextContent("No missing inputs in this slice.");
    expect(welcomePacket).toHaveTextContent("Review the generated draft");
    const managedRunReport = screen.getByRole("region", { name: "Jobsmith managed run report" });
    expect(managedRunReport).toHaveTextContent("Checklist to submit-ready gate");
    expect(managedRunReport).toHaveTextContent("Rules passed");
    expect(managedRunReport).toHaveTextContent("Blockers");
    expect(managedRunReport).toHaveTextContent("Deterministic findings");
    expect(managedRunReport).toHaveTextContent("Review needed");
    expect(managedRunReport).toHaveTextContent("Decision cards");
    expect(managedRunReport).toHaveTextContent("Browser-local starter packet: Ready");
    expect(managedRunReport).toHaveTextContent("Managed run report UI");
    expect(managedRunReport).toHaveTextContent("Run proof");
    expect(managedRunReport).toHaveTextContent("Not submit-ready");
    expect(managedRunReport).toHaveTextContent("Proof needed:");

    const packet = screen.getByRole("region", { name: "Starter packet" });
    const packetText = within(packet).getByTestId("jobsmith-public-packet-copy");
    expect(packet).toHaveTextContent("Ready");
    expect(packetText).toHaveTextContent("Starter packet: Senior Product Designer at Example Studio");
    expect(packetText).toHaveTextContent("- Job source: https://example.com/jobs/designer");
    expect(packetText).toHaveTextContent("- Claim proof: Portfolio case study and CV project notes show the redesign proof.");
    expect(packetText).toHaveTextContent("- Workday: Ready for careful field-by-field paste");
    expect(packetText).toHaveTextContent("No application is submitted and no external check is called.");
    expect(within(packet).getByRole("button", { name: "Copy packet" })).not.toBeDisabled();
    expect(screen.queryByText(/ApplyPass/i)).not.toBeInTheDocument();
  });
});

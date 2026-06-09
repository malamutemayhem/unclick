import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import JobsmithPage from "./Jobsmith";

vi.mock("@/lib/auth", () => ({
  useSession: () => ({ session: null }),
}));

vi.mock("@/components/FadeIn", () => ({
  default: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
}));

// Keep pdfjs-dist out of the jsdom test run; the .txt path does not need it.
vi.mock("@/lib/jobsmith/parsePdfBrowser", () => ({
  extractPdfTextBrowser: vi.fn(),
}));

const SAMPLE_LETTER = [
  "Dear Hiring Manager,",
  "I am writing to express my interest in the role.",
  "My experience across Paslode has given me a creative and strategic track record.",
  "Thank you for considering my application.",
  "I look forward to discussing how I can contribute.",
  "Sincerely,",
  "Jane Smith",
].join("\n");

const SAMPLE_JD = [
  "Digital Media Designer",
  "Ampersand International",
  "Sydney NSW",
  "Key Responsibilities: coordinate content production.",
].join("\n");

function renderJobsmith() {
  return render(
    <MemoryRouter initialEntries={["/jobsmith"]}>
      <JobsmithPage />
    </MemoryRouter>,
  );
}

async function loadCorpus() {
  const file = new File([SAMPLE_LETTER], "Cover Letter 1.txt", {
    type: "text/plain",
  });
  const input = screen.getByLabelText("Cover letter files");
  fireEvent.change(input, { target: { files: [file] } });
  await screen.findByText(/parsed into your voice profile/);
}

async function generateDraft() {
  await loadCorpus();
  fireEvent.change(screen.getByLabelText(/Paste the full job description/), {
    target: { value: SAMPLE_JD },
  });
  fireEvent.click(
    screen.getByRole("button", { name: /Generate tailored draft/ }),
  );
  await screen.findByRole("region", { name: "Cover letter draft" });
}

describe("JobsmithPage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders the Jobsmith draft builder without the dead ApplyPass name", () => {
    renderJobsmith();

    expect(
      screen.getByRole("heading", { name: "Tailored application drafts" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Jobsmith")).toBeInTheDocument();
    const welcomePacket = screen.getByRole("region", { name: "Jobsmith AI welcome packet" });
    expect(welcomePacket).toHaveTextContent("AI Welcome Packet");
    expect(welcomePacket).toHaveTextContent("Loading inputs");
    expect(welcomePacket).toHaveTextContent("Loaded CV corpus and voice profile");
    const rulePack = screen.getByRole("region", { name: "Jobsmith universal rules" });
    expect(rulePack).toHaveTextContent("Universal Rules v1");
    expect(rulePack).toHaveTextContent("232");
    expect(rulePack).toHaveTextContent("Standard headings pass");
    const managedRunReport = screen.getByRole("region", { name: "Jobsmith managed run report" });
    expect(managedRunReport).toHaveTextContent("Managed Run Report");
    expect(managedRunReport).toHaveTextContent("Rules passed");
    expect(managedRunReport).toHaveTextContent("Run steps");
    expect(managedRunReport).toHaveTextContent("Final report");
    expect(managedRunReport).toHaveTextContent("No run proof attached yet.");
    expect(managedRunReport).toHaveTextContent("Decision cards");
    expect(managedRunReport).toHaveTextContent("Not submit-ready");
    const proofSummary = within(managedRunReport).getByTestId("jobsmith-final-report-proof-summary");
    expect(proofSummary).toHaveTextContent("Submit-ready status: not ready");
    expect(proofSummary).toHaveTextContent("Rules passed:");
    expect(proofSummary).toHaveTextContent("Artifacts: 0/3 ready");
    expect(proofSummary).toHaveTextContent("Proof receipts: 0");
    expect(screen.queryByText(/ApplyPass/i)).not.toBeInTheDocument();
  });

  it("disables generation until a corpus is loaded", () => {
    renderJobsmith();
    expect(
      screen.getByRole("button", { name: /Generate tailored draft/ }),
    ).toBeDisabled();
  });

  it("parses an uploaded cover letter into a voice profile", async () => {
    renderJobsmith();
    await loadCorpus();
    expect(screen.getByText(/1 of 1 file parsed/)).toBeInTheDocument();
    expect(screen.getAllByText(/Paslode/).length).toBeGreaterThan(0);
  });

  it("generates a tailored draft from a corpus and a job description", async () => {
    renderJobsmith();
    await loadCorpus();

    fireEvent.change(screen.getByLabelText(/Paste the full job description/), {
      target: { value: SAMPLE_JD },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /Generate tailored draft/ }),
    );

    const draftRegion = await screen.findByRole("region", {
      name: "Cover letter draft",
    });
    const draft = within(draftRegion).getByLabelText(
      "Editable cover letter draft",
    ) as HTMLTextAreaElement;
    expect(draft.value).toContain("Digital Media Designer");
    expect(draft.value).toContain("Ampersand International");
    expect(draft.value).toContain("Paslode");
    expect(draft.value).toContain("Your Name");
    expect(draft.value).not.toContain("Creative Lead & Founder");

    const readiness = screen.getByRole("region", {
      name: "ATS and paste readiness",
    });
    await waitFor(() =>
      expect(readiness).toHaveTextContent("Role and company detected"),
    );
    expect(readiness).toHaveTextContent(
      "No brittle ATS formatting language detected",
    );

    const welcomePacket = screen.getByRole("region", { name: "Jobsmith AI welcome packet" });
    expect(welcomePacket).toHaveTextContent("Draft artifact: application packet generated for review");
    expect(welcomePacket).toHaveTextContent("Company: Ampersand International");
    expect(welcomePacket).toHaveTextContent("Role: Digital Media Designer");
    expect(welcomePacket).toHaveTextContent("Source-backed claim captured");

    const managedRunReport = screen.getByRole("region", { name: "Jobsmith managed run report" });
    expect(managedRunReport).toHaveTextContent("Browser-local cover letter draft: Ready");
    expect(managedRunReport).toHaveTextContent("Managed run report UI");
    const proofSummary = within(managedRunReport).getByTestId("jobsmith-final-report-proof-summary");
    expect(proofSummary).toHaveTextContent("Submit-ready status: not ready");
    expect(proofSummary).toHaveTextContent(/Decision cards: \d+ resolved/);
    expect(proofSummary).toHaveTextContent("Artifacts: 1/3 ready");
    expect(proofSummary).toHaveTextContent("Proof receipts: 2");
  });

  it("logs an application and persists it across a remount", async () => {
    const view = renderJobsmith();
    await generateDraft();

    fireEvent.click(
      screen.getByRole("button", { name: /Log this application/ }),
    );

    const log = screen.getByRole("region", { name: "Application log" });
    expect(within(log).getByText("Ampersand International")).toBeInTheDocument();

    // Remount from scratch: the log is restored from localStorage.
    view.unmount();
    renderJobsmith();
    const reloadedLog = screen.getByRole("region", {
      name: "Application log",
    });
    expect(
      within(reloadedLog).getByText("Ampersand International"),
    ).toBeInTheDocument();
  });
});

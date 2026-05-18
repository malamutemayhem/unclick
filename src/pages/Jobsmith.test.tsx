import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
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
  "Christopher Byrne",
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

describe("JobsmithPage", () => {
  it("renders the Jobsmith draft builder without the dead ApplyPass name", () => {
    renderJobsmith();
    expect(
      screen.getByRole("heading", { name: "Tailored application drafts" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Jobsmith")).toBeInTheDocument();
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
    expect(screen.getByText(/Paslode/)).toBeInTheDocument();
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

    const readiness = screen.getByRole("region", {
      name: "ATS and paste readiness",
    });
    await waitFor(() =>
      expect(readiness).toHaveTextContent("Role and company detected"),
    );
    expect(readiness).toHaveTextContent(
      "No brittle ATS formatting language detected",
    );
  });
});

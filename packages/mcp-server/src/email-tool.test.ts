import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// SMTP transport mock: email sends via nodemailer, not an HTTP API, so the L2
// resilience contract here is an overall send timeout, SMTP-throttle (4xx)
// handling, input validation, and stable response mapping.
const { sendMailMock } = vi.hoisted(() => ({ sendMailMock: vi.fn() }));
vi.mock("nodemailer", () => ({
  default: { createTransport: () => ({ sendMail: sendMailMock }) },
}));

import { sendEmail } from "./email-tool.js";

const SMTP = { smtp_host: "smtp.example.com", smtp_user: "user@example.com", smtp_pass: "pw" };

describe("email connector resilience (L2)", () => {
  beforeEach(() => { vi.stubEnv("EMAIL_TIMEOUT_MS", "20"); sendMailMock.mockReset(); });
  afterEach(() => { vi.unstubAllEnvs(); });

  it("throws a clean rate-limit error when the SMTP server throttles", async () => {
    sendMailMock.mockRejectedValue(Object.assign(new Error("Too many messages"), { responseCode: 421 }));
    await expect(sendEmail({ ...SMTP, to: "a@b.com", subject: "Hi", body: "Hello" }))
      .rejects.toThrow(/rate limit|throttled/i);
  });

  it("throws a clean timeout error when the send stalls", async () => {
    sendMailMock.mockImplementation(() => new Promise(() => { /* never resolves */ }));
    await expect(sendEmail({ ...SMTP, to: "a@b.com", subject: "Hi", body: "Hello" }))
      .rejects.toThrow(/timed out/i);
  });

  it("validates required params before sending", async () => {
    await expect(sendEmail({ ...SMTP, subject: "Hi", body: "Hello" }))
      .rejects.toThrow(/to is required/i);
  });

  it("maps a successful send into a clean shape", async () => {
    sendMailMock.mockResolvedValue({ messageId: "<abc@example.com>", accepted: ["a@b.com"], rejected: [] });
    const result = await sendEmail({ ...SMTP, to: "a@b.com", subject: "Hi", body: "Hello" }) as Record<string, unknown>;
    expect(result.success).toBe(true);
    expect(result.message_id).toBe("<abc@example.com>");
  });
});

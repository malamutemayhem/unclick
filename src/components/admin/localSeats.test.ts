import { describe, expect, it, vi } from "vitest";
import {
  isLocalSeat,
  listInstalledLocalModels,
  makeLocalHandle,
  newLocalSeat,
  runLocalChatTurn,
  toLocalMessages,
} from "./localSeats";

function ndjsonResponse(lines: unknown[], status = 200): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const line of lines) {
        controller.enqueue(encoder.encode(`${JSON.stringify(line)}\n`));
      }
      controller.close();
    },
  });
  return new Response(stream, { status });
}

describe("local seat shape", () => {
  it("creates a local-lane seat with a friendly label and handle", () => {
    const seat = newLocalSeat("llama3.2:3b", []);
    expect(seat.lane).toBe("local");
    expect(seat.slug).toBe("local");
    expect(seat.model).toBe("llama3.2:3b");
    expect(seat.label).toBe("Everyday Helper");
    expect(seat.handle).toBe("EverydayHelper");
    expect(seat.active).toBe(true);
    expect(isLocalSeat(seat)).toBe(true);
  });

  it("normalizes :latest and falls back to the raw tag for unknown models", () => {
    const seat = newLocalSeat("phi4:latest", []);
    expect(seat.model).toBe("phi4");
    expect(seat.label).toBe("Homework Whiz");

    const custom = newLocalSeat("my-custom:13b", []);
    expect(custom.label).toBe("my-custom:13b");
    expect(custom.handle).toBe("mycustom13b");
  });

  it("dodges taken handles with a numeric suffix", () => {
    expect(makeLocalHandle("llama3.2:3b", ["EverydayHelper"])).toBe(
      "EverydayHelper2",
    );
  });

  it("does not flag api or subscription seats as local", () => {
    expect(isLocalSeat({ lane: "api" })).toBe(false);
    expect(isLocalSeat({ lane: "subscription" })).toBe(false);
    expect(isLocalSeat({})).toBe(false);
  });
});

describe("toLocalMessages", () => {
  it("folds history, prefixes other seats' replies, and appends the new turn", () => {
    const turns = toLocalMessages(
      [
        { role: "user", text: "hello" },
        { role: "assistant", text: "hi there", author: "Sharp Thinker" },
        { role: "assistant", text: "unattributed" },
        { role: "user", text: "   " },
      ],
      "what next?",
    );
    expect(turns).toEqual([
      { role: "user", content: "hello" },
      { role: "assistant", content: "[Sharp Thinker] hi there" },
      { role: "assistant", content: "unattributed" },
      { role: "user", content: "what next?" },
    ]);
  });

  it("caps to the newest turns", () => {
    const prior = Array.from({ length: 40 }, (_, i) => ({
      role: "user" as const,
      text: `turn ${i}`,
    }));
    const turns = toLocalMessages(prior, "latest", 10);
    expect(turns).toHaveLength(10);
    expect(turns[turns.length - 1].content).toBe("latest");
  });
});

describe("listInstalledLocalModels", () => {
  it("returns installed models when the engine answers", async () => {
    const fetchFn = vi.fn(async () =>
      new Response(
        JSON.stringify({
          models: [
            { name: "llama3.2:3b", size: 2_000_000_000 },
            { name: "phi4:latest", size: 9_100_000_000 },
          ],
        }),
        { status: 200 },
      ),
    );
    const rows = await listInstalledLocalModels(
      "http://localhost:11434",
      fetchFn as unknown as typeof fetch,
    );
    expect(rows).toEqual([
      { name: "llama3.2:3b", sizeBytes: 2_000_000_000 },
      { name: "phi4:latest", sizeBytes: 9_100_000_000 },
    ]);
  });

  it("returns null when the engine is unreachable", async () => {
    const fetchFn = vi.fn(async () => {
      throw new TypeError("failed to fetch");
    });
    expect(
      await listInstalledLocalModels(
        "http://localhost:11434",
        fetchFn as unknown as typeof fetch,
      ),
    ).toBeNull();
  });
});

describe("runLocalChatTurn", () => {
  it("streams NDJSON chunks into one reply", async () => {
    const fetchFn = vi.fn(async () =>
      ndjsonResponse([
        { message: { role: "assistant", content: "Hel" }, done: false },
        { message: { role: "assistant", content: "lo!" }, done: false },
        { message: { role: "assistant", content: "" }, done: true },
      ]),
    );
    const outcome = await runLocalChatTurn({
      model: "llama3.2:3b",
      messages: [{ role: "user", content: "hi" }],
      fetchFn: fetchFn as unknown as typeof fetch,
    });
    expect(outcome).toEqual({ ok: true, content: "Hello!" });
  });

  it("surfaces an engine error line as a failure", async () => {
    const fetchFn = vi.fn(async () =>
      ndjsonResponse([{ error: "model requires more system memory" }]),
    );
    const outcome = await runLocalChatTurn({
      model: "gemma3:27b",
      messages: [{ role: "user", content: "hi" }],
      fetchFn: fetchFn as unknown as typeof fetch,
    });
    expect(outcome.ok).toBe(false);
    expect(outcome.error).toContain("memory");
  });

  it("explains a missing model in plain English", async () => {
    const fetchFn = vi.fn(async () => new Response("not found", { status: 404 }));
    const outcome = await runLocalChatTurn({
      model: "llama3.2:3b",
      messages: [{ role: "user", content: "hi" }],
      fetchFn: fetchFn as unknown as typeof fetch,
    });
    expect(outcome.ok).toBe(false);
    expect(outcome.error).toContain("not installed");
  });

  it("marks a network failure as offline with a friendly hint", async () => {
    const fetchFn = vi.fn(async () => {
      throw new TypeError("failed to fetch");
    });
    const outcome = await runLocalChatTurn({
      model: "llama3.2:3b",
      messages: [{ role: "user", content: "hi" }],
      fetchFn: fetchFn as unknown as typeof fetch,
    });
    expect(outcome.ok).toBe(false);
    expect(outcome.offline).toBe(true);
    expect(outcome.error).toContain("Ollama");
  });
});

import type { FactInput, MemoryClass, SessionEventInput } from "./types.js";

export const MEMORY_CLASSES: readonly MemoryClass[] = ["episodic", "semantic", "procedural", "task"];

const TIMESTAMP_PATTERN =
  /\b(?:20\d{2}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2})?|\d{1,2}:\d{2}Z|[A-Z][a-z]{2}\s+\d{1,2},\s+20\d{2})\b/;
const LOG_SIGNAL_PATTERN =
  /\b(boardroom|broadcast|heartbeat|handoff|receipt|session|status|state delta|transcript|wake)\b/i;
const PROCEDURAL_CATEGORY_PATTERN = /\b(policy|preference|procedure|rule|workflow)\b/i;
const TASK_CATEGORY_PATTERN = /\b(commitment|deadline|follow.?up|open_loop|task|todo)\b/i;

export function isTypedMemorySplitEnabled(): boolean {
  const raw = process.env.MEMORY_TYPED_SPLIT_ENABLED ?? "";
  return raw === "1" || raw.toLowerCase() === "true";
}

export function normalizeMemoryClass(value: unknown, fallback: MemoryClass = "semantic"): MemoryClass {
  return typeof value === "string" && (MEMORY_CLASSES as readonly string[]).includes(value)
    ? (value as MemoryClass)
    : fallback;
}

export function isFactSearchableMemoryClass(memoryClass: unknown): boolean {
  return normalizeMemoryClass(memoryClass, "semantic") !== "episodic";
}

export function classifyMemoryClass(input: {
  text: string;
  category?: string;
  startup_fact_kind?: string;
  memory_class?: unknown;
}): MemoryClass {
  const explicit = normalizeMemoryClass(input.memory_class, "semantic");
  if (input.memory_class !== undefined) return explicit;

  const category = input.category ?? "";
  if (TASK_CATEGORY_PATTERN.test(category)) return "task";
  if (PROCEDURAL_CATEGORY_PATTERN.test(category)) return "procedural";

  const text = input.text.trim();
  const lineCount = text.split(/\r?\n/).filter((line) => line.trim().length > 0).length;
  const operationalKind = input.startup_fact_kind === "operational" || input.startup_fact_kind === "excluded";
  const longLog =
    text.length >= 420 &&
    (lineCount >= 3 || TIMESTAMP_PATTERN.test(text) || LOG_SIGNAL_PATTERN.test(text));
  const denseOperationalLog =
    lineCount >= 3 &&
    (TIMESTAMP_PATTERN.test(text) || LOG_SIGNAL_PATTERN.test(text));

  if (operationalKind || longLog || denseOperationalLog) return "episodic";
  return "semantic";
}

export function factInputToSessionEventInput(data: FactInput): SessionEventInput {
  const memoryClass = classifyMemoryClass({
    text: data.fact,
    category: data.category,
    startup_fact_kind: data.startup_fact_kind,
    memory_class: data.memory_class,
  });

  return {
    session_id: data.source_session_id,
    memory_class: memoryClass === "semantic" ? "episodic" : memoryClass,
    event_kind: "fact_route",
    content: data.fact,
    summary: data.fact.length > 240 ? `${data.fact.slice(0, 237)}...` : data.fact,
    payload: {
      category: data.category,
      confidence: data.confidence,
      startup_fact_kind: data.startup_fact_kind ?? "durable",
      routed_from: "add_fact",
    },
  };
}

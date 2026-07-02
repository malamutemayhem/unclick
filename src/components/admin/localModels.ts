// ============================================================
// Local models (client helpers)
//
// The curated local-model experience: a small, opinionated catalog
// of popular models (the 80/20 set), a browser-side machine check,
// and a recommender that maps the user's hardware to the models
// that will actually run well on it.
//
// Everything here is plain data + pure logic so the Local page and
// the chat seat picker can share it, and so it is unit-testable
// without a browser. The engine underneath is Ollama; the user
// never has to touch a terminal after installing it.
// ============================================================

export const LOCAL_ENGINE_URL = "http://localhost:11434";

// ─── the curated catalog ─────────────────────────────────────
//
// Ten models, chosen for range not volume: everyday chat, an
// all-rounder, multilingual, vision, coding, step-by-step
// reasoning, memory/search, and one heavyweight. Sizes are the
// default quantized download from the Ollama library.

export type LocalModelUse = "chat" | "code" | "vision" | "memory" | "reasoning";

export interface CuratedLocalModel {
  // The exact tag `ollama pull` understands.
  tag: string;
  // The friendly display name users see first.
  nick: string;
  maker: string;
  // One plain-English sentence: what this model is.
  blurb: string;
  // Optional everyday analogy to make the choice obvious.
  analogy?: string;
  // Short "good at" chips, plain words only.
  goodFor: string[];
  // Download size in GB (approximate, default quantization).
  sizeGB: number;
  // RAM (GB) where this model runs comfortably.
  comfortableRamGB: number;
  // 1 (relaxed) to 5 (instant) on a typical machine that fits it.
  speed: number;
  // 1 (basic) to 5 (sharpest local quality) within this catalog.
  brains: number;
  uses: LocalModelUse[];
  // True when the model can answer as a chat seat in a room.
  chatSeat: boolean;
}

export const CURATED_LOCAL_MODELS: CuratedLocalModel[] = [
  {
    tag: "llama3.2:3b",
    nick: "Everyday Helper",
    maker: "Meta",
    blurb: "A small, snappy model for quick answers, drafts, and summaries.",
    analogy: "Like a helpful assistant at the front desk: fast, friendly, always available.",
    goodFor: ["Quick questions", "Drafts", "Summaries"],
    sizeGB: 2.0,
    comfortableRamGB: 8,
    speed: 5,
    brains: 2,
    uses: ["chat"],
    chatSeat: true,
  },
  {
    tag: "llama3.1:8b",
    nick: "All-Rounder",
    maker: "Meta",
    blurb: "The classic do-everything model. A safe first pick for general chat and writing.",
    analogy: "Like a reliable family car: not the flashiest, good at almost everything.",
    goodFor: ["General chat", "Writing", "Brainstorming"],
    sizeGB: 4.9,
    comfortableRamGB: 16,
    speed: 4,
    brains: 3,
    uses: ["chat"],
    chatSeat: true,
  },
  {
    tag: "qwen3:8b",
    nick: "Sharp Thinker",
    maker: "Alibaba",
    blurb: "A strong all-rounder that can pause and think before it answers, and speaks many languages well.",
    goodFor: ["Tricky questions", "Other languages", "Analysis"],
    sizeGB: 5.2,
    comfortableRamGB: 16,
    speed: 3,
    brains: 4,
    uses: ["chat", "reasoning"],
    chatSeat: true,
  },
  {
    tag: "gemma3:4b",
    nick: "Compact Google",
    maker: "Google",
    blurb: "Small and quick, and it can look at pictures you share, not just text.",
    goodFor: ["Everyday chat", "Describing images", "Light machines"],
    sizeGB: 3.3,
    comfortableRamGB: 8,
    speed: 4,
    brains: 2,
    uses: ["chat", "vision"],
    chatSeat: true,
  },
  {
    tag: "gemma3:12b",
    nick: "Bigger Google",
    maker: "Google",
    blurb: "A noticeably smarter Google model that also understands images. Great middle ground.",
    goodFor: ["Better answers", "Images", "Longer writing"],
    sizeGB: 8.1,
    comfortableRamGB: 16,
    speed: 3,
    brains: 4,
    uses: ["chat", "vision"],
    chatSeat: true,
  },
  {
    tag: "phi4",
    nick: "Homework Whiz",
    maker: "Microsoft",
    blurb: "Punches above its size on logic, maths, and careful step-by-step answers.",
    analogy: "Like the quiet student who aces the exam.",
    goodFor: ["Maths", "Logic", "Careful answers"],
    sizeGB: 9.1,
    comfortableRamGB: 16,
    speed: 3,
    brains: 4,
    uses: ["chat", "reasoning"],
    chatSeat: true,
  },
  {
    tag: "deepseek-r1:8b",
    nick: "Shows Its Working",
    maker: "DeepSeek",
    blurb: "Reasons out loud before answering, so you can see how it got there. Slower, but thorough.",
    goodFor: ["Hard problems", "Step-by-step reasoning"],
    sizeGB: 5.2,
    comfortableRamGB: 16,
    speed: 2,
    brains: 4,
    uses: ["chat", "reasoning"],
    chatSeat: true,
  },
  {
    tag: "qwen2.5-coder:7b",
    nick: "The Coder",
    maker: "Alibaba",
    blurb: "Built for writing and explaining code. The go-to if you program.",
    goodFor: ["Writing code", "Fixing bugs", "Explaining code"],
    sizeGB: 4.7,
    comfortableRamGB: 16,
    speed: 4,
    brains: 3,
    uses: ["code", "chat"],
    chatSeat: true,
  },
  {
    tag: "gemma3:27b",
    nick: "The Heavyweight",
    maker: "Google",
    blurb: "The sharpest model in this list. Needs a powerful machine, rewards it with near-cloud quality.",
    goodFor: ["Best local quality", "Complex work", "Images"],
    sizeGB: 17,
    comfortableRamGB: 32,
    speed: 2,
    brains: 5,
    uses: ["chat", "vision", "reasoning"],
    chatSeat: true,
  },
  {
    tag: "nomic-embed-text",
    nick: "The Librarian",
    maker: "Nomic",
    blurb: "Not a chatbot. It powers private search and memory by turning text into something searchable.",
    analogy: "Like a librarian who indexes everything so it can be found later.",
    goodFor: ["Private search", "Memory features"],
    sizeGB: 0.3,
    comfortableRamGB: 8,
    speed: 5,
    brains: 1,
    uses: ["memory"],
    chatSeat: false,
  },
];

export function findCuratedModel(tag: string): CuratedLocalModel | undefined {
  const wanted = normalizeModelTag(tag);
  return CURATED_LOCAL_MODELS.find((m) => normalizeModelTag(m.tag) === wanted);
}

// Ollama reports installed models with an explicit ":latest" suffix when no
// tag was given; treat "phi4" and "phi4:latest" as the same model.
export function normalizeModelTag(tag: string): string {
  const t = tag.trim().toLowerCase();
  return t.endsWith(":latest") ? t.slice(0, -":latest".length) : t;
}

// The friendly name for any installed model: the curated nick when we know
// it, otherwise the raw tag so nothing is ever unnamed.
export function friendlyModelName(tag: string): string {
  return findCuratedModel(tag)?.nick ?? tag;
}

// ─── machine check ───────────────────────────────────────────
//
// Browsers only reveal so much on purpose, so this is a best-effort
// probe: CPU cores, an approximate memory reading (Chrome caps it at
// 8 GB), and the GPU family via WebGPU. The UI always lets the user
// confirm or correct the memory amount, Apple-setup style.

export interface MachineProbe {
  cores: number | null;
  // navigator.deviceMemory in GB. Chrome never reports more than 8,
  // so 8 means "8 or more"; memIsFloor flags that.
  approxMemGB: number | null;
  memIsFloor: boolean;
  gpuLabel: string | null;
  appleSilicon: boolean;
  platform: "mac" | "windows" | "linux" | "other";
}

function detectPlatform(): MachineProbe["platform"] {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("mac")) return "mac";
  if (ua.includes("win")) return "windows";
  if (ua.includes("linux") || ua.includes("x11")) return "linux";
  return "other";
}

interface GpuAdapterLike {
  info?: { vendor?: string; architecture?: string; description?: string };
}

export async function probeMachine(): Promise<MachineProbe> {
  const platform = detectPlatform();
  let cores: number | null = null;
  let approxMemGB: number | null = null;
  let gpuLabel: string | null = null;
  let appleSilicon = false;

  if (typeof navigator !== "undefined") {
    if (Number.isFinite(navigator.hardwareConcurrency)) {
      cores = navigator.hardwareConcurrency;
    }
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    if (Number.isFinite(mem)) approxMemGB = mem as number;

    try {
      const gpu = (navigator as Navigator & {
        gpu?: { requestAdapter: () => Promise<GpuAdapterLike | null> };
      }).gpu;
      const adapter = gpu ? await gpu.requestAdapter() : null;
      const info = adapter?.info;
      if (info) {
        const bits = [info.vendor, info.architecture].filter(Boolean);
        gpuLabel = bits.length > 0 ? bits.join(" ") : (info.description ?? null);
        if ((info.vendor ?? "").toLowerCase().includes("apple")) {
          appleSilicon = true;
        }
      }
    } catch {
      // WebGPU unavailable or blocked; the check still works without it.
    }
  }

  return {
    cores,
    approxMemGB,
    memIsFloor: approxMemGB !== null && approxMemGB >= 8,
    gpuLabel,
    appleSilicon,
    platform,
  };
}

// ─── memory choice + recommendations ─────────────────────────

// The RAM sizes we ask the user to confirm. "Not sure" maps to 8 so the
// recommendations stay safe rather than optimistic.
export const RAM_CHOICES_GB = [8, 16, 32, 64] as const;

export const MACHINE_RAM_STORAGE_KEY = "unclick_local_machine_ram_gb";

export function readSavedRamGB(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(MACHINE_RAM_STORAGE_KEY);
    const n = raw ? Number(raw) : NaN;
    return Number.isFinite(n) && n > 0 ? n : null;
  } catch {
    return null;
  }
}

export function saveRamGB(ramGB: number): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(MACHINE_RAM_STORAGE_KEY, String(ramGB));
  } catch {
    /* ignore */
  }
}

// Which RAM chip to preselect from the probe. The probe under-reports on
// purpose (Chrome caps at 8), so an 8 GB reading on Apple Silicon or a
// many-core machine very likely means 16 or more; still, we only ever
// preselect, never decide, and the user confirms.
export function suggestRamGB(probe: MachineProbe): number {
  const mem = probe.approxMemGB;
  if (mem !== null && mem < 8) return 8;
  if (probe.memIsFloor && (probe.appleSilicon || (probe.cores ?? 0) >= 10)) {
    return 16;
  }
  return 8;
}

export type ModelFit = "great" | "ok" | "too-big";

// How well a model fits a machine with the given RAM. "ok" means it will
// load and run, just slower than its comfortable spot.
export function modelFit(model: CuratedLocalModel, ramGB: number): ModelFit {
  if (model.comfortableRamGB <= ramGB) return "great";
  // A model is workable one RAM step below comfortable when it still
  // leaves headroom for the system (size well under available memory).
  if (model.sizeGB <= ramGB * 0.65) return "ok";
  return "too-big";
}

export const FIT_LABELS: Record<ModelFit, string> = {
  great: "Great fit",
  ok: "Will run, a little slower",
  "too-big": "Too big for this machine",
};

export interface LocalRecommendation {
  // The single best everyday-chat pick for this machine.
  best: CuratedLocalModel;
  // One optional extra per specialty that fits: code, vision, reasoning.
  extras: CuratedLocalModel[];
  // The memory/search helper, always cheap enough to include.
  librarian: CuratedLocalModel | null;
}

// Pick the recommended set for a machine: the smartest comfortable chat
// model, plus at most one comfortable specialist per lane so the list
// stays short.
export function recommendModels(ramGB: number): LocalRecommendation {
  const comfy = CURATED_LOCAL_MODELS.filter(
    (m) => m.comfortableRamGB <= ramGB,
  );

  const chatPicks = comfy
    .filter((m) => m.chatSeat && m.uses.includes("chat"))
    .sort((a, b) => b.brains - a.brains || b.speed - a.speed);
  const best = chatPicks[0] ?? CURATED_LOCAL_MODELS[0];

  const extras: CuratedLocalModel[] = [];
  for (const use of ["code", "vision", "reasoning"] as const) {
    if (best.uses.includes(use)) continue;
    const pick = comfy
      .filter((m) => m.tag !== best.tag && m.uses.includes(use))
      .sort((a, b) => b.brains - a.brains)[0];
    if (pick && !extras.some((m) => m.tag === pick.tag)) extras.push(pick);
  }

  const librarian =
    comfy.find((m) => m.uses.includes("memory")) ?? null;

  return { best, extras, librarian };
}

// ─── plain-English sizing helpers ────────────────────────────

export function formatSizeGB(sizeGB: number): string {
  if (sizeGB < 1) return `${Math.round(sizeGB * 1000)} MB`;
  return `${sizeGB % 1 === 0 ? sizeGB : sizeGB.toFixed(1)} GB`;
}

// A rough download time on an ordinary connection (about 50 Mbps),
// phrased the way a person would say it.
export function estimateDownloadTime(sizeGB: number): string {
  const minutes = (sizeGB * 1024) / (6 * 60); // ~6 MB/s
  if (minutes < 1) return "under a minute";
  if (minutes < 2) return "about a minute";
  if (minutes < 60) return `about ${Math.round(minutes)} minutes`;
  const hours = minutes / 60;
  return `about ${hours < 1.75 ? "an hour and a half" : `${Math.round(hours)} hours`}`;
}

// One-line machine summary for the check step, e.g.
// "16 GB memory, 10 cores, Apple graphics".
export function describeMachine(probe: MachineProbe, ramGB: number): string {
  const bits = [`${ramGB} GB memory`];
  if (probe.cores) bits.push(`${probe.cores} cores`);
  if (probe.appleSilicon) bits.push("Apple graphics");
  else if (probe.gpuLabel) bits.push(`${probe.gpuLabel} graphics`);
  return bits.join(", ");
}

// What this machine can comfortably run, in one sentence.
export function describeCapability(ramGB: number): string {
  if (ramGB >= 32) {
    return "This machine can run everything here, including the heavyweight models.";
  }
  if (ramGB >= 16) {
    return "This machine comfortably runs small and medium models (up to about 9 GB).";
  }
  return "This machine is happiest with small models (up to about 3 GB).";
}

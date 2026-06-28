export type LocalComputeTask = "chat" | "code" | "embeddings" | "ocr";

export interface LocalHardwareProfile {
  ramGb: number | null;
  cpuCores: number | null;
  gpuName: string | null;
  gpuVendor: string | null;
  vramGb: number | null;
  webGpuSupported: boolean;
}

export interface LocalModelCatalogEntry {
  id: string;
  label: string;
  family: string;
  parameterSize: string;
  quantization: string;
  tasks: LocalComputeTask[];
  minRamGb: number;
  minVramGb: number;
  recommendedVramGb: number;
  qualityScore: number;
  localPrivacyScore: number;
  cpuFriendly: boolean;
  speedByVram: Record<number, string>;
  notes: string;
}

export interface ModelFitResult {
  status: "fits" | "borderline" | "blocked" | "unknown";
  label: string;
  reason: string;
}

export interface ModelRecommendation {
  task: LocalComputeTask;
  model: LocalModelCatalogEntry;
  fit: ModelFitResult;
  estimatedSpeed: string;
}

export const LOCAL_COMPUTE_TASK_LABELS: Record<LocalComputeTask, string> = {
  chat: "Chat",
  code: "Code",
  embeddings: "Embeddings",
  ocr: "OCR",
};

export const VRAM_TIERS = [
  {
    minGb: 0,
    maxGb: 3.9,
    label: "CPU or tiny GPU",
    guidance: "Use embeddings, OCR helpers, and tiny 1B-3B quantized chat models.",
  },
  {
    minGb: 4,
    maxGb: 7.9,
    label: "4GB tier",
    guidance: "3B-7B quantized models only. Keep context windows modest.",
  },
  {
    minGb: 8,
    maxGb: 11.9,
    label: "8GB tier",
    guidance: "7B-8B models comfortably, with some 13B quantized models at smaller context.",
  },
  {
    minGb: 12,
    maxGb: 15.9,
    label: "12GB tier",
    guidance: "13B models are reasonable. Some 30B-class quantized models may fit with care.",
  },
  {
    minGb: 16,
    maxGb: 23.9,
    label: "16GB tier",
    guidance: "30B-class quantized models are practical. 70B is possible only with heavy quantization.",
  },
  {
    minGb: 24,
    maxGb: Number.POSITIVE_INFINITY,
    label: "24GB+ tier",
    guidance: "70B-class quantized models become realistic for local chat and reasoning.",
  },
] as const;

export const LOCAL_MODEL_CATALOG: LocalModelCatalogEntry[] = [
  {
    id: "llama-3.2-3b-q4",
    label: "Llama 3.2 3B Q4",
    family: "Llama",
    parameterSize: "3B",
    quantization: "Q4",
    tasks: ["chat"],
    minRamGb: 8,
    minVramGb: 0,
    recommendedVramGb: 4,
    qualityScore: 58,
    localPrivacyScore: 95,
    cpuFriendly: true,
    speedByVram: { 0: "8-14 tok/s CPU", 4: "28-45 tok/s", 8: "45-70 tok/s" },
    notes: "Best tiny fallback when no GPU VRAM is available.",
  },
  {
    id: "llama-3.1-8b-q4",
    label: "Llama 3.1 8B Q4",
    family: "Llama",
    parameterSize: "8B",
    quantization: "Q4",
    tasks: ["chat"],
    minRamGb: 16,
    minVramGb: 5,
    recommendedVramGb: 8,
    qualityScore: 78,
    localPrivacyScore: 95,
    cpuFriendly: false,
    speedByVram: { 4: "8-14 tok/s partial GPU", 8: "24-40 tok/s", 12: "34-55 tok/s", 16: "45-70 tok/s" },
    notes: "Default local chat choice for 8GB+ GPUs.",
  },
  {
    id: "qwen-2.5-7b-instruct-q4",
    label: "Qwen 2.5 7B Instruct Q4",
    family: "Qwen",
    parameterSize: "7B",
    quantization: "Q4",
    tasks: ["chat", "code"],
    minRamGb: 16,
    minVramGb: 5,
    recommendedVramGb: 8,
    qualityScore: 81,
    localPrivacyScore: 95,
    cpuFriendly: false,
    speedByVram: { 4: "8-13 tok/s partial GPU", 8: "24-38 tok/s", 12: "34-52 tok/s", 16: "44-66 tok/s" },
    notes: "Strong general model that also handles coding tasks.",
  },
  {
    id: "qwen-2.5-coder-7b-q4",
    label: "Qwen 2.5 Coder 7B Q4",
    family: "Qwen Coder",
    parameterSize: "7B",
    quantization: "Q4",
    tasks: ["code"],
    minRamGb: 16,
    minVramGb: 5,
    recommendedVramGb: 8,
    qualityScore: 86,
    localPrivacyScore: 95,
    cpuFriendly: false,
    speedByVram: { 4: "7-12 tok/s partial GPU", 8: "22-36 tok/s", 12: "32-50 tok/s", 16: "40-62 tok/s" },
    notes: "Best compact coding default for laptops and small desktops.",
  },
  {
    id: "deepseek-coder-v2-lite-q4",
    label: "DeepSeek Coder V2 Lite Q4",
    family: "DeepSeek Coder",
    parameterSize: "16B MoE",
    quantization: "Q4",
    tasks: ["code"],
    minRamGb: 24,
    minVramGb: 10,
    recommendedVramGb: 12,
    qualityScore: 90,
    localPrivacyScore: 95,
    cpuFriendly: false,
    speedByVram: { 12: "16-28 tok/s", 16: "24-38 tok/s", 24: "34-52 tok/s" },
    notes: "Higher quality code model for 12GB+ GPUs.",
  },
  {
    id: "codestral-22b-q4",
    label: "Codestral 22B Q4",
    family: "Codestral",
    parameterSize: "22B",
    quantization: "Q4",
    tasks: ["code"],
    minRamGb: 32,
    minVramGb: 14,
    recommendedVramGb: 16,
    qualityScore: 92,
    localPrivacyScore: 95,
    cpuFriendly: false,
    speedByVram: { 16: "12-24 tok/s", 24: "22-36 tok/s" },
    notes: "Excellent code choice when a 16GB+ GPU is available.",
  },
  {
    id: "mistral-small-24b-q4",
    label: "Mistral Small 24B Q4",
    family: "Mistral",
    parameterSize: "24B",
    quantization: "Q4",
    tasks: ["chat"],
    minRamGb: 32,
    minVramGb: 14,
    recommendedVramGb: 16,
    qualityScore: 89,
    localPrivacyScore: 95,
    cpuFriendly: false,
    speedByVram: { 16: "12-22 tok/s", 24: "20-34 tok/s" },
    notes: "Quality local chat for 16GB cards.",
  },
  {
    id: "llama-3.1-70b-q4",
    label: "Llama 3.1 70B Q4",
    family: "Llama",
    parameterSize: "70B",
    quantization: "Q4",
    tasks: ["chat"],
    minRamGb: 64,
    minVramGb: 40,
    recommendedVramGb: 48,
    qualityScore: 96,
    localPrivacyScore: 95,
    cpuFriendly: false,
    speedByVram: { 24: "2-5 tok/s split/offload", 48: "8-16 tok/s" },
    notes: "Only sensible on large GPUs or multi-GPU rigs.",
  },
  {
    id: "nomic-embed-text",
    label: "Nomic Embed Text",
    family: "Nomic",
    parameterSize: "137M",
    quantization: "FP16/Q8",
    tasks: ["embeddings"],
    minRamGb: 4,
    minVramGb: 0,
    recommendedVramGb: 0,
    qualityScore: 82,
    localPrivacyScore: 98,
    cpuFriendly: true,
    speedByVram: { 0: "250-700 docs/min CPU", 4: "900+ docs/min" },
    notes: "Default local embedding choice for privacy-first RAG.",
  },
  {
    id: "bge-m3",
    label: "BGE-M3",
    family: "BGE",
    parameterSize: "568M",
    quantization: "FP16/Q8",
    tasks: ["embeddings"],
    minRamGb: 8,
    minVramGb: 0,
    recommendedVramGb: 4,
    qualityScore: 90,
    localPrivacyScore: 98,
    cpuFriendly: true,
    speedByVram: { 0: "90-260 docs/min CPU", 4: "500+ docs/min", 8: "850+ docs/min" },
    notes: "High quality multilingual embeddings and retrieval.",
  },
  {
    id: "paddleocr-vl-0.9b",
    label: "PaddleOCR-VL 0.9B",
    family: "PaddleOCR",
    parameterSize: "0.9B",
    quantization: "FP16/Q8",
    tasks: ["ocr"],
    minRamGb: 8,
    minVramGb: 0,
    recommendedVramGb: 4,
    qualityScore: 84,
    localPrivacyScore: 98,
    cpuFriendly: true,
    speedByVram: { 0: "2-6 pages/min CPU", 4: "10-24 pages/min", 8: "20-38 pages/min" },
    notes: "Document OCR and layout extraction for local ingestion.",
  },
  {
    id: "llava-7b-q4",
    label: "LLaVA 7B Q4",
    family: "LLaVA",
    parameterSize: "7B",
    quantization: "Q4",
    tasks: ["ocr"],
    minRamGb: 16,
    minVramGb: 6,
    recommendedVramGb: 8,
    qualityScore: 76,
    localPrivacyScore: 95,
    cpuFriendly: false,
    speedByVram: { 8: "4-9 images/min", 12: "8-15 images/min", 16: "12-22 images/min" },
    notes: "Useful for visual question answering, not a dedicated OCR engine.",
  },
  {
    id: "minicpm-v-8b-q4",
    label: "MiniCPM-V 8B Q4",
    family: "MiniCPM-V",
    parameterSize: "8B",
    quantization: "Q4",
    tasks: ["ocr"],
    minRamGb: 16,
    minVramGb: 7,
    recommendedVramGb: 8,
    qualityScore: 82,
    localPrivacyScore: 95,
    cpuFriendly: false,
    speedByVram: { 8: "5-10 images/min", 12: "9-16 images/min", 16: "14-24 images/min" },
    notes: "Compact vision model for OCR-like extraction and image understanding.",
  },
];

export function coerceHardwareNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) return null;
  return Math.round(numeric * 10) / 10;
}

export function classifyVramTier(vramGb: number | null) {
  if (vramGb === null) return null;
  return VRAM_TIERS.find((tier) => vramGb >= tier.minGb && vramGb <= tier.maxGb) ?? VRAM_TIERS[0];
}

export function describeModelFit(
  model: LocalModelCatalogEntry,
  hardware: LocalHardwareProfile,
): ModelFitResult {
  const ramGb = coerceHardwareNumber(hardware.ramGb);
  const vramGb = coerceHardwareNumber(hardware.vramGb);

  if (vramGb !== null && vramGb < model.minVramGb) {
    return {
      status: "blocked",
      label: "Won't fit",
      reason: `Needs ~${model.minVramGb}GB VRAM, you have ${vramGb}GB.`,
    };
  }

  if (ramGb !== null && ramGb < model.minRamGb) {
    return {
      status: "blocked",
      label: "Needs more RAM",
      reason: `Needs ${model.minRamGb}GB system RAM, detected ${ramGb}GB.`,
    };
  }

  if (vramGb === null && (model.cpuFriendly || model.minVramGb === 0)) {
    return {
      status: "fits",
      label: "CPU capable",
      reason: model.recommendedVramGb > 0
        ? `Runs without dedicated VRAM, but ${model.recommendedVramGb}GB VRAM is better.`
        : "Runs locally without dedicated GPU VRAM.",
    };
  }

  if (vramGb === null) {
    return {
      status: "unknown",
      label: "Needs VRAM input",
      reason: `Enter GPU VRAM to verify fit. Needs at least ${model.minVramGb}GB VRAM.`,
    };
  }

  if (vramGb < model.recommendedVramGb) {
    return {
      status: "borderline",
      label: "Tight fit",
      reason: `Can run with quantization, but ${model.recommendedVramGb}GB VRAM is recommended.`,
    };
  }

  return {
    status: "fits",
    label: "Fits",
    reason: `Fits this ${classifyVramTier(vramGb)?.label ?? "GPU"} profile.`,
  };
}

export function estimateModelSpeed(model: LocalModelCatalogEntry, vramGb: number | null): string {
  const tiers = Object.keys(model.speedByVram)
    .map(Number)
    .sort((left, right) => left - right);
  if (tiers.length === 0) return "Speed varies by runtime";

  const effectiveVram = vramGb ?? 0;
  const tier = [...tiers].reverse().find((candidate) => effectiveVram >= candidate) ?? tiers[0];
  return model.speedByVram[tier] ?? "Speed varies by runtime";
}

export function rankModelsForHardware(
  hardware: LocalHardwareProfile,
  task?: LocalComputeTask,
): ModelRecommendation[] {
  const fitRank: Record<ModelFitResult["status"], number> = {
    fits: 0,
    borderline: 1,
    unknown: 2,
    blocked: 3,
  };

  return LOCAL_MODEL_CATALOG
    .filter((model) => !task || model.tasks.includes(task))
    .map((model) => ({
      task: task ?? model.tasks[0],
      model,
      fit: describeModelFit(model, hardware),
      estimatedSpeed: estimateModelSpeed(model, hardware.vramGb),
    }))
    .sort((left, right) => {
      const fitDelta = fitRank[left.fit.status] - fitRank[right.fit.status];
      if (fitDelta !== 0) return fitDelta;
      return right.model.qualityScore - left.model.qualityScore;
    });
}

export function recommendModelsByTask(hardware: LocalHardwareProfile): Record<LocalComputeTask, ModelRecommendation> {
  return {
    chat: rankModelsForHardware(hardware, "chat")[0],
    code: rankModelsForHardware(hardware, "code")[0],
    embeddings: rankModelsForHardware(hardware, "embeddings")[0],
    ocr: rankModelsForHardware(hardware, "ocr")[0],
  };
}

export function modelById(modelId: string): LocalModelCatalogEntry {
  return LOCAL_MODEL_CATALOG.find((model) => model.id === modelId) ?? LOCAL_MODEL_CATALOG[0];
}

import { useEffect, useMemo, useState } from "react";
import {
  Calculator,
  Cpu,
  HardDrive,
  Loader2,
  MemoryStick,
  MonitorCog,
  RefreshCw,
  SearchCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LOCAL_MODEL_CATALOG,
  type LocalModelProfile,
  type LocalModelTask,
} from "./localModelCatalog";

interface GpuAdapterInfoLike {
  vendor?: string;
  architecture?: string;
  device?: string;
  description?: string;
}

interface GpuAdapterLike {
  info?: GpuAdapterInfoLike;
  requestAdapterInfo?: () => Promise<GpuAdapterInfoLike>;
}

interface NavigatorHardwareLike extends Navigator {
  deviceMemory?: number;
  gpu?: {
    requestAdapter: () => Promise<GpuAdapterLike | null>;
  };
}

interface HardwareSnapshot {
  ramGb: number | null;
  cpuCores: number | null;
  gpuName: string | null;
  gpuVendor: string | null;
  inferredVramGb: number | null;
  webGpuSupported: boolean;
  checkedAt: string | null;
}

interface Recommendation {
  task: LocalModelTask;
  model: LocalModelProfile;
  fits: boolean;
  reason: string;
  estimatedTokensPerSecond: number;
}

const TASK_LABELS: Record<LocalModelTask, string> = {
  chat: "Chat",
  code: "Code",
  embeddings: "Embeddings",
  ocr: "OCR",
};

const TASK_DESCRIPTIONS: Record<LocalModelTask, string> = {
  chat: "Simple local assistant work and private drafting.",
  code: "Repository edits, review, debugging, and technical notes.",
  embeddings: "Memory, retrieval indexing, semantic search, and clustering.",
  ocr: "Document, screenshot, receipt, and PDF text extraction.",
};

const EMPTY_HARDWARE: HardwareSnapshot = {
  ramGb: null,
  cpuCores: null,
  gpuName: null,
  gpuVendor: null,
  inferredVramGb: null,
  webGpuSupported: false,
  checkedAt: null,
};

function inferVramFromGpuName(name: string | null): number | null {
  if (!name) return null;
  const lower = name.toLowerCase();
  const patterns: Array<[RegExp, number]> = [
    [/4090|3090|7900\s*xtx|6000\s*ada|a5000|a6000/, 24],
    [/4080|5080|7800\s*xt|6900\s*xt|6800\s*xt/, 16],
    [/4070\s*ti|5070\s*ti|3080\s*ti/, 12],
    [/4070|5070|4060\s*ti|3070|3080|6700\s*xt/, 8],
    [/4060|3060|6600|7600/, 6],
    [/3050|1650|1660|5500/, 4],
  ];
  const match = patterns.find(([pattern]) => pattern.test(lower));
  return match?.[1] ?? null;
}

function formatGb(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return "Unknown";
  return `${value}GB`;
}

function formatDateTime(iso: string | null): string {
  if (!iso) return "Not checked";
  return new Date(iso).toLocaleString();
}

function getEffectiveVram(input: string, fallback: number | null): number | null {
  const numeric = Number(input);
  if (Number.isFinite(numeric) && numeric >= 0) return numeric;
  return fallback;
}

function getVramTier(vramGb: number | null): string {
  if (vramGb === null) return "Enter GPU VRAM to rank GPU models";
  if (vramGb >= 24) return "24GB+ tier - 70B models become realistic";
  if (vramGb >= 16) return "16GB tier - 30B models and tight 70B quantized runs";
  if (vramGb >= 12) return "12GB tier - 13B models and some 30B quantized runs";
  if (vramGb >= 8) return "8GB tier - 7B to 8B models comfortably, 13B quantized";
  if (vramGb >= 4) return "4GB tier - 3B to 7B quantized models only";
  return "CPU or low VRAM tier - embeddings and small models first";
}

function modelFits(model: LocalModelProfile, vramGb: number | null, ramGb: number | null): { fits: boolean; reason: string } {
  const ramOk = ramGb === null || ramGb >= model.minRamGb;
  const vramOk = model.minVramGb === 0 || (vramGb !== null && vramGb >= model.minVramGb);
  if (ramOk && vramOk) return { fits: true, reason: "Fits estimated hardware" };
  const needs: string[] = [];
  if (!vramOk) {
    needs.push(vramGb === null ? `Needs ~${model.minVramGb}GB VRAM` : `Needs ~${model.minVramGb}GB VRAM, you have ${vramGb}GB`);
  }
  if (!ramOk && ramGb !== null) needs.push(`Needs ~${model.minRamGb}GB RAM, you have ${ramGb}GB`);
  return { fits: false, reason: needs.join("; ") };
}

function estimateTokensPerSecond(model: LocalModelProfile, vramGb: number | null): number {
  if (model.minVramGb === 0) return model.baseTokensPerSecond;
  if (vramGb === null) return Math.max(1, Math.round(model.baseTokensPerSecond * 0.5));
  if (vramGb < model.minVramGb) return Math.max(1, Math.round(model.baseTokensPerSecond * 0.25));
  if (vramGb >= model.recommendedVramGb + 8) return Math.round(model.baseTokensPerSecond * 1.25);
  if (vramGb >= model.recommendedVramGb) return model.baseTokensPerSecond;
  return Math.max(1, Math.round(model.baseTokensPerSecond * 0.75));
}

function rankModelsForTask(
  task: LocalModelTask,
  vramGb: number | null,
  ramGb: number | null,
): Recommendation {
  const candidates = LOCAL_MODEL_CATALOG.filter((model) => model.tasks.includes(task));
  const ranked = candidates
    .map((model) => {
      const fit = modelFits(model, vramGb, ramGb);
      return {
        task,
        model,
        fits: fit.fits,
        reason: fit.reason,
        estimatedTokensPerSecond: estimateTokensPerSecond(model, vramGb),
      };
    })
    .sort((left, right) => {
      if (left.fits !== right.fits) return left.fits ? -1 : 1;
      if (left.model.qualityScore !== right.model.qualityScore) return right.model.qualityScore - left.model.qualityScore;
      return left.model.recommendedVramGb - right.model.recommendedVramGb;
    });
  return ranked[0];
}

function rankedModelsForVram(vramGb: number, ramGb: number | null): Array<Recommendation & { taskLabel: string }> {
  return LOCAL_MODEL_CATALOG.map((model) => {
    const fit = modelFits(model, vramGb, ramGb);
    return {
      task: model.tasks[0],
      taskLabel: model.tasks.map((task) => TASK_LABELS[task]).join(", "),
      model,
      fits: fit.fits,
      reason: fit.reason,
      estimatedTokensPerSecond: estimateTokensPerSecond(model, vramGb),
    };
  })
    .filter((item) => item.fits)
    .sort((left, right) => right.model.qualityScore - left.model.qualityScore);
}

async function detectHardware(): Promise<HardwareSnapshot> {
  if (typeof window === "undefined") return EMPTY_HARDWARE;

  const nav = window.navigator as NavigatorHardwareLike;
  const ramGb = typeof nav.deviceMemory === "number" ? nav.deviceMemory : null;
  const cpuCores = typeof nav.hardwareConcurrency === "number" ? nav.hardwareConcurrency : null;
  let gpuName: string | null = null;
  let gpuVendor: string | null = null;
  let webGpuSupported = false;

  try {
    const adapter = nav.gpu ? await nav.gpu.requestAdapter() : null;
    webGpuSupported = Boolean(adapter);
    const info = adapter?.requestAdapterInfo ? await adapter.requestAdapterInfo() : adapter?.info;
    gpuVendor = info?.vendor ?? null;
    gpuName = info?.description ?? info?.device ?? info?.architecture ?? gpuVendor ?? null;
  } catch {
    // Keep the default unsupported state when WebGPU inspection is blocked.
  }

  const inferredVramGb = inferVramFromGpuName([gpuVendor, gpuName].filter(Boolean).join(" "));

  return {
    ramGb,
    cpuCores,
    gpuName,
    gpuVendor,
    inferredVramGb,
    webGpuSupported,
    checkedAt: new Date().toISOString(),
  };
}

export default function AdminSeatsLocal() {
  const [hardware, setHardware] = useState<HardwareSnapshot>(EMPTY_HARDWARE);
  const [detecting, setDetecting] = useState(false);
  const [vramInput, setVramInput] = useState("");
  const [calculatorModelId, setCalculatorModelId] = useState(LOCAL_MODEL_CATALOG[0].id);
  const [calculatorVram, setCalculatorVram] = useState("12");

  const refreshHardware = async () => {
    setDetecting(true);
    try {
      const next = await detectHardware();
      setHardware(next);
      if (next.inferredVramGb !== null) {
        setVramInput((current) => current || String(next.inferredVramGb));
      }
    } finally {
      setDetecting(false);
    }
  };

  useEffect(() => {
    queueMicrotask(() => void refreshHardware());
  }, []);

  const effectiveVram = getEffectiveVram(vramInput, hardware.inferredVramGb);
  const ramGb = hardware.ramGb;
  const recommendations = useMemo(
    () => (["chat", "code", "embeddings", "ocr"] as LocalModelTask[]).map((task) => rankModelsForTask(task, effectiveVram, ramGb)),
    [effectiveVram, ramGb],
  );
  const selectedModel = LOCAL_MODEL_CATALOG.find((model) => model.id === calculatorModelId) ?? LOCAL_MODEL_CATALOG[0];
  const selectedFit = modelFits(selectedModel, effectiveVram, ramGb);
  const reverseVram = Number(calculatorVram);
  const reverseModels = Number.isFinite(reverseVram) ? rankedModelsForVram(reverseVram, ramGb) : [];

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-heading">Local model recommendations</h1>
          <p className="mt-1 max-w-3xl text-sm text-body">
            Estimate what can run on this machine and pick local models for chat, code, embeddings, and OCR.
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => void refreshHardware()} disabled={detecting}>
          {detecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Refresh specs
        </Button>
      </header>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <SpecCard icon={MemoryStick} label="RAM estimate" value={formatGb(hardware.ramGb)} detail="navigator.deviceMemory" />
        <SpecCard icon={Cpu} label="CPU cores" value={hardware.cpuCores ? String(hardware.cpuCores) : "Unknown"} detail="navigator.hardwareConcurrency" />
        <SpecCard
          icon={MonitorCog}
          label="GPU adapter"
          value={hardware.gpuName ?? hardware.gpuVendor ?? "Unknown"}
          detail={hardware.webGpuSupported ? "WebGPU available" : "WebGPU unavailable"}
        />
        <SpecCard icon={HardDrive} label="VRAM tier" value={formatGb(effectiveVram)} detail={getVramTier(effectiveVram)} />
      </section>

      <section className="rounded-xl border border-border/40 bg-card/20 p-4">
        <div className="grid gap-4 lg:grid-cols-[1fr_280px] lg:items-end">
          <div>
            <h2 className="text-sm font-semibold text-heading">Hardware estimate</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Browser APIs expose approximate RAM, CPU cores, and GPU adapter names. VRAM is inferred when possible and can be adjusted here.
            </p>
            <p className="mt-2 text-[11px] text-muted-foreground">Last checked: {formatDateTime(hardware.checkedAt)}</p>
          </div>
          <label className="flex flex-col gap-1 text-xs text-muted-foreground">
            GPU VRAM override
            <input
              type="number"
              min={0}
              step={1}
              value={vramInput}
              onChange={(event) => setVramInput(event.target.value)}
              placeholder={hardware.inferredVramGb === null ? "Enter GB" : String(hardware.inferredVramGb)}
              className="rounded-md border border-border/40 bg-background px-3 py-2 text-sm text-heading outline-none focus:border-primary/50"
            />
          </label>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-4">
        {recommendations.map((recommendation) => (
          <RecommendationCard key={recommendation.task} recommendation={recommendation} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <ForwardCalculator
          model={selectedModel}
          modelId={calculatorModelId}
          onModelChange={setCalculatorModelId}
          fitReason={selectedFit.reason}
          fits={selectedFit.fits}
          tokensPerSecond={estimateTokensPerSecond(selectedModel, effectiveVram)}
        />
        <ReverseCalculator
          vram={calculatorVram}
          onVramChange={setCalculatorVram}
          rankedModels={reverseModels}
        />
      </section>
    </div>
  );
}

function SpecCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-border/40 bg-card/20 p-4">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      </div>
      <p className="mt-3 truncate text-lg font-semibold text-heading" title={value}>
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}

function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  const { model } = recommendation;
  return (
    <article className="rounded-xl border border-border/40 bg-card/20 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {TASK_LABELS[recommendation.task]}
          </p>
          <h2 className="mt-2 text-sm font-semibold text-heading">{model.label}</h2>
        </div>
        <span
          className={`rounded-md border px-2 py-1 text-[11px] ${
            recommendation.fits
              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
              : "border-amber-400/30 bg-amber-400/10 text-amber-300"
          }`}
        >
          {recommendation.fits ? "Fits" : "Check fit"}
        </span>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{TASK_DESCRIPTIONS[recommendation.task]}</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <ModelStat label="VRAM" value={`${model.minVramGb}GB min`} />
        <ModelStat label="RAM" value={`${model.minRamGb}GB min`} />
        <ModelStat label="Disk" value={`${model.diskGb}GB`} />
        <ModelStat label="Speed" value={`${recommendation.estimatedTokensPerSecond} tok/s`} />
      </div>
      <p className="mt-3 text-xs text-body">{recommendation.reason}</p>
    </article>
  );
}

function ModelStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border/30 bg-background/40 px-2 py-2">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold text-heading">{value}</p>
    </div>
  );
}

function ForwardCalculator({
  model,
  modelId,
  onModelChange,
  fitReason,
  fits,
  tokensPerSecond,
}: {
  model: LocalModelProfile;
  modelId: string;
  onModelChange: (modelId: string) => void;
  fitReason: string;
  fits: boolean;
  tokensPerSecond: number;
}) {
  return (
    <section className="rounded-xl border border-border/40 bg-card/20 p-4">
      <div className="flex items-center gap-2">
        <Calculator className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-heading">Model to hardware</h2>
      </div>
      <label className="mt-4 flex flex-col gap-1 text-xs text-muted-foreground">
        Model
        <select
          value={modelId}
          onChange={(event) => onModelChange(event.target.value)}
          className="rounded-md border border-border/40 bg-background px-3 py-2 text-sm text-heading outline-none focus:border-primary/50"
        >
          {LOCAL_MODEL_CATALOG.map((candidate) => (
            <option key={candidate.id} value={candidate.id}>
              {candidate.label}
            </option>
          ))}
        </select>
      </label>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <ModelStat label="Minimum VRAM" value={`${model.minVramGb}GB`} />
        <ModelStat label="Recommended VRAM" value={`${model.recommendedVramGb}GB`} />
        <ModelStat label="Minimum RAM" value={`${model.minRamGb}GB`} />
        <ModelStat label="Estimated speed" value={`${tokensPerSecond} tok/s`} />
      </div>
      <div
        className={`mt-4 rounded-lg border p-3 text-xs ${
          fits
            ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
            : "border-amber-400/30 bg-amber-400/10 text-amber-200"
        }`}
      >
        {fitReason}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{model.notes}</p>
    </section>
  );
}

function ReverseCalculator({
  vram,
  onVramChange,
  rankedModels,
}: {
  vram: string;
  onVramChange: (value: string) => void;
  rankedModels: Array<Recommendation & { taskLabel: string }>;
}) {
  return (
    <section className="rounded-xl border border-border/40 bg-card/20 p-4">
      <div className="flex items-center gap-2">
        <SearchCheck className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-heading">Hardware to models</h2>
      </div>
      <label className="mt-4 flex flex-col gap-1 text-xs text-muted-foreground">
        GPU VRAM
        <input
          type="number"
          min={0}
          step={1}
          value={vram}
          onChange={(event) => onVramChange(event.target.value)}
          className="rounded-md border border-border/40 bg-background px-3 py-2 text-sm text-heading outline-none focus:border-primary/50"
        />
      </label>
      <div className="mt-4 max-h-[370px] space-y-2 overflow-y-auto pr-1">
        {rankedModels.length === 0 ? (
          <div className="rounded-lg border border-border/30 bg-background/40 p-3 text-xs text-muted-foreground">
            Enter a VRAM value to rank models that fit.
          </div>
        ) : (
          rankedModels.slice(0, 8).map((item) => (
            <div key={item.model.id} className="rounded-lg border border-border/30 bg-background/40 p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-heading">{item.model.label}</p>
                  <p className="text-xs text-muted-foreground">{item.taskLabel}</p>
                </div>
                <span className="rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-[11px] text-emerald-300">
                  {item.model.qualityScore}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {item.model.parameterLabel}, {item.model.quantization}, ~{item.estimatedTokensPerSecond} tok/s
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

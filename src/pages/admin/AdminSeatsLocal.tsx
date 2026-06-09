import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Brain,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  Gauge,
  HardDrive,
  Loader2,
  RefreshCw,
  ScanText,
  Search,
  Server,
  SlidersHorizontal,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LOCAL_COMPUTE_TASK_LABELS,
  LOCAL_MODEL_CATALOG,
  classifyVramTier,
  coerceHardwareNumber,
  describeModelFit,
  estimateModelSpeed,
  modelById,
  rankModelsForHardware,
  recommendModelsByTask,
  type LocalComputeTask,
  type LocalHardwareProfile,
  type ModelFitResult,
  type ModelRecommendation,
} from "@/lib/localComputeRecommendations";

interface WebGpuAdapterInfo {
  vendor?: string;
  architecture?: string;
  device?: string;
  description?: string;
}

interface WebGpuAdapter {
  requestAdapterInfo?: () => Promise<WebGpuAdapterInfo>;
  info?: WebGpuAdapterInfo;
}

interface NavigatorWithLocalHardware extends Navigator {
  deviceMemory?: number;
  gpu?: {
    requestAdapter: () => Promise<WebGpuAdapter | null>;
  };
}

const EMPTY_HARDWARE: LocalHardwareProfile = {
  ramGb: null,
  cpuCores: null,
  gpuName: null,
  gpuVendor: null,
  vramGb: null,
  webGpuSupported: false,
};

const TASK_ICONS: Record<LocalComputeTask, typeof Brain> = {
  chat: Brain,
  code: Code2,
  embeddings: Database,
  ocr: ScanText,
};

const FIT_BADGE_CLASS: Record<ModelFitResult["status"], string> = {
  fits: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  borderline: "border-[#E2B93B]/30 bg-[#E2B93B]/10 text-[#E2B93B]",
  blocked: "border-red-400/30 bg-red-400/10 text-red-200",
  unknown: "border-white/[0.10] bg-white/[0.05] text-[#aaa]",
};

function formatGb(value: number | null): string {
  return value === null ? "Unknown" : `${value}GB`;
}

function numberInputValue(value: string): number | null {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric >= 0 ? numeric : null;
}

function joinGpuName(info: WebGpuAdapterInfo | null): string | null {
  if (!info) return null;
  const name = info.description?.trim();
  if (name) return name;
  const parts = [info.vendor, info.architecture, info.device]
    .map((part) => part?.trim())
    .filter(Boolean);
  return parts.length ? parts.join(" ") : "WebGPU adapter detected";
}

function FitBadge({ fit }: { fit: ModelFitResult }) {
  return (
    <Badge variant="outline" className={FIT_BADGE_CLASS[fit.status]}>
      {fit.label}
    </Badge>
  );
}

function SpecTile({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: typeof Cpu;
}) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium uppercase text-[#777]">{label}</p>
        <Icon className="h-4 w-4 text-[#61C1C4]" />
      </div>
      <p className="mt-3 text-xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs leading-5 text-[#777]">{detail}</p>
    </div>
  );
}

function TaskRecommendationCard({ recommendation }: { recommendation: ModelRecommendation }) {
  const Icon = TASK_ICONS[recommendation.task];
  const quality = Math.min(100, Math.max(0, recommendation.model.qualityScore));

  return (
    <div className="rounded-lg border border-white/[0.06] bg-black/20 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Icon className="h-4 w-4 shrink-0 text-[#61C1C4]" />
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase text-[#777]">
              {LOCAL_COMPUTE_TASK_LABELS[recommendation.task]}
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-white">{recommendation.model.label}</p>
          </div>
        </div>
        <FitBadge fit={recommendation.fit} />
      </div>
      <div className="mt-4 grid gap-2 text-xs text-[#999]">
        <div className="flex justify-between gap-3">
          <span>Quality</span>
          <span className="tabular-nums text-[#ddd]">{recommendation.model.qualityScore}/100</span>
        </div>
        <Progress value={quality} className="h-1.5 bg-white/[0.06]" />
        <div className="flex justify-between gap-3">
          <span>Estimated speed</span>
          <span className="text-right text-[#ddd]">{recommendation.estimatedSpeed}</span>
        </div>
        <p className="leading-5 text-[#777]">{recommendation.fit.reason}</p>
      </div>
    </div>
  );
}

function ModelRequirementPanel({
  modelId,
  hardware,
}: {
  modelId: string;
  hardware: LocalHardwareProfile;
}) {
  const model = modelById(modelId);
  const fit = describeModelFit(model, hardware);
  const speed = estimateModelSpeed(model, hardware.vramGb);

  return (
    <div className="rounded-lg border border-white/[0.06] bg-black/20 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">{model.label}</p>
          <p className="mt-1 text-xs text-[#777]">
            {model.family} {model.parameterSize} {model.quantization}
          </p>
        </div>
        <FitBadge fit={fit} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div>
          <p className="text-[11px] uppercase text-[#666]">Minimum</p>
          <p className="mt-1 text-sm text-[#ddd]">{model.minRamGb}GB RAM, {model.minVramGb}GB VRAM</p>
        </div>
        <div>
          <p className="text-[11px] uppercase text-[#666]">Recommended</p>
          <p className="mt-1 text-sm text-[#ddd]">{model.recommendedVramGb}GB VRAM</p>
        </div>
        <div>
          <p className="text-[11px] uppercase text-[#666]">Throughput</p>
          <p className="mt-1 text-sm text-[#ddd]">{speed}</p>
        </div>
      </div>
      <p className="mt-4 text-xs leading-5 text-[#777]">{fit.reason}</p>
    </div>
  );
}

function RankedModelRow({ recommendation }: { recommendation: ModelRecommendation }) {
  return (
    <div className="grid gap-2 rounded-lg border border-white/[0.06] bg-black/20 p-3 sm:grid-cols-[1fr_90px_150px] sm:items-center">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-white">{recommendation.model.label}</p>
        <p className="mt-1 text-[11px] text-[#777]">
          {recommendation.model.tasks.map((task) => LOCAL_COMPUTE_TASK_LABELS[task]).join(", ")}
        </p>
      </div>
      <div className="text-sm tabular-nums text-[#ddd]">
        {recommendation.model.qualityScore}/100
      </div>
      <div className="flex items-center justify-between gap-2 sm:justify-end">
        <span className="text-xs text-[#777]">{recommendation.estimatedSpeed}</span>
        <FitBadge fit={recommendation.fit} />
      </div>
    </div>
  );
}

function useMachineSpecs() {
  const [hardware, setHardware] = useState<LocalHardwareProfile>(EMPTY_HARDWARE);
  const [detecting, setDetecting] = useState(false);
  const [error, setError] = useState("");

  const detect = useCallback(async () => {
    if (typeof navigator === "undefined") return;

    setDetecting(true);
    setError("");
    const nav = navigator as NavigatorWithLocalHardware;
    let gpuInfo: WebGpuAdapterInfo | null = null;
    let webGpuSupported = false;

    try {
      if (nav.gpu?.requestAdapter) {
        const adapter = await nav.gpu.requestAdapter();
        webGpuSupported = Boolean(adapter);
        if (adapter?.requestAdapterInfo) {
          gpuInfo = await adapter.requestAdapterInfo();
        } else {
          gpuInfo = adapter?.info ?? null;
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "WebGPU detection failed");
    } finally {
      setHardware({
        ramGb: coerceHardwareNumber(nav.deviceMemory),
        cpuCores: coerceHardwareNumber(nav.hardwareConcurrency),
        gpuName: joinGpuName(gpuInfo),
        gpuVendor: gpuInfo?.vendor ?? null,
        vramGb: null,
        webGpuSupported,
      });
      setDetecting(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void detect();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [detect]);

  return { hardware, detecting, error, detect };
}

export default function AdminSeatsLocal() {
  const { hardware, detecting, error, detect } = useMachineSpecs();
  const [manualVram, setManualVram] = useState("");
  const [calculatorVram, setCalculatorVram] = useState("12");
  const [selectedModelId, setSelectedModelId] = useState(LOCAL_MODEL_CATALOG[0].id);
  const [taskFilter, setTaskFilter] = useState<LocalComputeTask>("chat");

  const effectiveVram = numberInputValue(manualVram);
  const calculatorVramGb = numberInputValue(calculatorVram);

  const effectiveHardware = useMemo<LocalHardwareProfile>(() => ({
    ...hardware,
    vramGb: effectiveVram,
  }), [effectiveVram, hardware]);

  const calculatorHardware = useMemo<LocalHardwareProfile>(() => ({
    ...hardware,
    vramGb: calculatorVramGb,
  }), [calculatorVramGb, hardware]);

  const recommendations = useMemo(() => recommendModelsByTask(effectiveHardware), [effectiveHardware]);
  const vramTier = classifyVramTier(effectiveHardware.vramGb);
  const rankedForTask = useMemo(
    () => rankModelsForHardware(calculatorHardware, taskFilter).slice(0, 6),
    [calculatorHardware, taskFilter],
  );
  const blockedModels = useMemo(
    () => rankModelsForHardware(effectiveHardware)
      .filter((entry) => entry.fit.status === "blocked")
      .slice(0, 4),
    [effectiveHardware],
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-heading">Local compute</h1>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-body">
            Hardware estimates and model fit guidance for running UnClick locally.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => void detect()}
          disabled={detecting}
          className="border-white/[0.08] bg-white/[0.04] text-[#ddd] hover:bg-white/[0.08] hover:text-white"
        >
          {detecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Refresh specs
        </Button>
      </header>

      <Card className="border-white/[0.06] bg-white/[0.03]">
        <CardHeader className="p-4 pb-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle className="text-base text-white">Detected machine spec</CardTitle>
              <p className="mt-1 text-xs leading-5 text-[#777]">
                Browser APIs are estimates. Treat RAM, CPU, GPU, and VRAM as planning signals.
              </p>
            </div>
            <Badge variant="outline" className="border-[#E2B93B]/30 bg-[#E2B93B]/10 text-[#E2B93B]">
              Estimate
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-4 pt-2">
          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-[#E2B93B]/20 bg-[#E2B93B]/10 p-3 text-sm text-[#E2B93B]">
              <AlertTriangle className="mt-0.5 h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid gap-3 md:grid-cols-4">
            <SpecTile
              label="RAM"
              value={formatGb(hardware.ramGb)}
              detail="From navigator.deviceMemory when available."
              icon={HardDrive}
            />
            <SpecTile
              label="CPU"
              value={hardware.cpuCores === null ? "Unknown" : `${hardware.cpuCores} cores`}
              detail="From navigator.hardwareConcurrency."
              icon={Cpu}
            />
            <SpecTile
              label="GPU"
              value={hardware.gpuName ?? "Unknown"}
              detail={hardware.webGpuSupported ? "WebGPU adapter detected." : "WebGPU unavailable or blocked."}
              icon={Server}
            />
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="manual-vram" className="text-xs font-medium uppercase text-[#777]">
                  GPU VRAM
                </Label>
                <Gauge className="h-4 w-4 text-[#61C1C4]" />
              </div>
              <Input
                id="manual-vram"
                inputMode="decimal"
                value={manualVram}
                onChange={(event) => setManualVram(event.target.value)}
                placeholder="Enter GB"
                className="mt-3 h-9 border-white/[0.08] bg-black/30 text-white placeholder:text-[#555]"
              />
              <p className="mt-2 text-xs leading-5 text-[#777]">
                Browsers do not expose exact VRAM, so enter your card size for precise fit checks.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3">
            <div className="flex flex-wrap items-center gap-2">
              {vramTier ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  <span className="text-sm font-medium text-white">{vramTier.label}</span>
                  <span className="text-sm text-[#777]">{vramTier.guidance}</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 text-[#E2B93B]" />
                  <span className="text-sm font-medium text-white">Enter GPU VRAM to classify the local tier.</span>
                  <span className="text-sm text-[#777]">CPU-friendly embedding and OCR options are still shown.</span>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white">Smart recommendations</h2>
            <p className="mt-1 text-xs text-[#777]">Best local model by task for the detected and entered hardware.</p>
          </div>
          <Badge variant="outline" className="border-white/[0.08] bg-white/[0.04] text-[#aaa]">
            Data driven catalog
          </Badge>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {(["chat", "code", "embeddings", "ocr"] as LocalComputeTask[]).map((task) => (
            <TaskRecommendationCard key={task} recommendation={recommendations[task]} />
          ))}
        </div>
      </section>

      <Card className="border-white/[0.06] bg-white/[0.03]">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="flex items-center gap-2 text-base text-white">
            <AlertTriangle className="h-4 w-4 text-[#E2B93B]" />
            Fit warnings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          {blockedModels.length === 0 ? (
            <p className="text-sm text-[#777]">No blocked high-interest models for the current hardware input.</p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {blockedModels.map((entry) => (
                <div key={entry.model.id} className="rounded-lg border border-red-400/20 bg-red-400/10 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{entry.model.label}</p>
                      <p className="mt-1 text-xs text-red-100">{entry.fit.reason}</p>
                    </div>
                    <FitBadge fit={entry.fit} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-white/[0.06] bg-white/[0.03]">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="flex items-center gap-2 text-base text-white">
            <SlidersHorizontal className="h-4 w-4 text-[#61C1C4]" />
            Cooking calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4 pt-2">
          <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
            <div className="space-y-2">
              <Label htmlFor="model-select" className="text-xs uppercase text-[#777]">Model</Label>
              <Select value={selectedModelId} onValueChange={setSelectedModelId}>
                <SelectTrigger id="model-select" className="border-white/[0.08] bg-black/30 text-white">
                  <SelectValue placeholder="Choose a model" />
                </SelectTrigger>
                <SelectContent>
                  {LOCAL_MODEL_CATALOG.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="calculator-vram" className="text-xs uppercase text-[#777]">GPU VRAM</Label>
              <Input
                id="calculator-vram"
                inputMode="decimal"
                value={calculatorVram}
                onChange={(event) => setCalculatorVram(event.target.value)}
                className="border-white/[0.08] bg-black/30 text-white"
              />
            </div>
          </div>

          <ModelRequirementPanel modelId={selectedModelId} hardware={calculatorHardware} />

          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">Best models for entered VRAM</p>
                <p className="mt-1 text-xs text-[#777]">Sorted by fit first, then quality score.</p>
              </div>
              <Select value={taskFilter} onValueChange={(value) => setTaskFilter(value as LocalComputeTask)}>
                <SelectTrigger className="w-[180px] border-white/[0.08] bg-black/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["chat", "code", "embeddings", "ocr"] as LocalComputeTask[]).map((task) => (
                    <SelectItem key={task} value={task}>
                      {LOCAL_COMPUTE_TASK_LABELS[task]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              {rankedForTask.map((recommendation) => (
                <RankedModelRow key={recommendation.model.id} recommendation={recommendation} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg border border-[#61C1C4]/20 bg-[#61C1C4]/10 p-4">
        <div className="flex items-start gap-3">
          <Zap className="mt-0.5 h-4 w-4 text-[#61C1C4]" />
          <p className="text-sm leading-6 text-[#bdecee]">
            Use local first for embeddings and OCR when privacy matters. Escalate large reasoning or vision work to API or subscription tiers when the model fit is blocked.
          </p>
        </div>
      </div>
    </div>
  );
}

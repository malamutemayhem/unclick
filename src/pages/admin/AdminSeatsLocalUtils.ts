export interface OllamaModel {
  name: string;
  model: string;
  modified_at: string;
  size: number;
  digest: string;
  details: {
    parent_model?: string;
    format?: string;
    family?: string;
    families?: string[] | null;
    parameter_size?: string;
    quantization_level?: string;
  };
}

export type EndpointType = "ollama" | "openai-compat";

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(0)} MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(1)} GB`;
}

export function normalizeEndpointUrl(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

export function getEndpointModelsUrl(type: EndpointType, url: string): string {
  const base = normalizeEndpointUrl(url);
  if (type === "ollama") return `${base}/api/tags`;
  return base.endsWith("/v1") ? `${base}/models` : `${base}/v1/models`;
}

export function inferCapabilities(model: OllamaModel): string[] {
  const caps: string[] = [];
  const n = model.name.toLowerCase();
  const families = model.details.families ?? [];

  if (n.includes("embed") || families.includes("bert")) {
    caps.push("Embeddings");
  } else {
    caps.push("Chat");
  }

  if (n.includes("code") || n.includes("codestral") || n.includes("deepseek-coder") || n.includes("starcoder")) {
    caps.push("Code");
  }

  if (n.includes("llava") || n.includes("bakllava") || n.includes("vision") || families.includes("clip")) {
    caps.push("Vision");
  }

  return caps;
}

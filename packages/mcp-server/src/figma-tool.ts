// Figma REST API integration for the UnClick MCP server.
// Uses the official Figma API v1 via fetch - no external dependencies.
// Users must generate a Personal Access Token in Figma account settings.

const FIGMA_API_BASE = "https://api.figma.com/v1";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FigmaFile {
  name: string;
  role: string;
  lastModified: string;
  editorType: string;
  thumbnailUrl?: string;
  version: string;
  document: FigmaNode;
  components: Record<string, FigmaComponent>;
}

interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
}

interface FigmaComponent {
  key: string;
  name: string;
  description: string;
}

interface FigmaComment {
  id: string;
  message: string;
  created_at: string;
  resolved_at: string | null;
  user: { handle: string; img_url: string };
  client_meta?: { x?: number; y?: number; node_id?: string };
}

interface FigmaImageResponse {
  err: string | null;
  images: Record<string, string | null>;
}

// ─── API helper ───────────────────────────────────────────────────────────────

async function figmaGet<T>(
  token: string,
  path: string,
  params?: Record<string, string>
): Promise<T> {
  let url = `${FIGMA_API_BASE}${path}`;
  if (params && Object.keys(params).length > 0) {
    const qs = new URLSearchParams(params);
    url += `?${qs}`;
  }

  const res = await fetch(url, {
    headers: { "X-Figma-Token": token },
  });

  const data = (await res.json()) as Record<string, unknown>;

  if (!res.ok) {
    const msg = (data.err as string) ?? (data.message as string) ?? `HTTP ${res.status}`;
    const status = (data.status as number) ?? res.status;
    throw new Error(`Figma API error (${status}): ${msg}`);
  }

  return data as T;
}

async function figmaPost<T>(
  token: string,
  path: string,
  body: Record<string, unknown>
): Promise<T> {
  const res = await fetch(`${FIGMA_API_BASE}${path}`, {
    method: "POST",
    headers: {
      "X-Figma-Token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as Record<string, unknown>;

  if (!res.ok) {
    const msg = (data.err as string) ?? (data.message as string) ?? `HTTP ${res.status}`;
    const status = (data.status as number) ?? res.status;
    throw new Error(`Figma API error (${status}): ${msg}`);
  }

  return data as T;
}

// ─── Token validation ─────────────────────────────────────────────────────────

function requireToken(token: unknown): string {
  const t = String(token ?? "").trim();
  if (!t) throw new Error("personal_access_token is required. Generate one at figma.com → Account Settings → Personal access tokens.");
  return t;
}

function requireFileKey(fileKey: unknown): string {
  const k = String(fileKey ?? "").trim();
  if (!k) throw new Error("file_key is required (the alphanumeric ID from the Figma file URL).");
  return k;
}

// ─── Operations ───────────────────────────────────────────────────────────────

export async function figmaGetFile(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args.personal_access_token);
  const fileKey = requireFileKey(args.file_key);

  const params: Record<string, string> = {};
  if (args.depth !== undefined) params.depth = String(args.depth);

  const file = await figmaGet<FigmaFile>(token, `/files/${fileKey}`, params);

  // Summarize pages (top-level children of document)
  const pages = (file.document.children ?? []).map((page) => ({
    id: page.id,
    name: page.name,
    type: page.type,
    frame_count: (page.children ?? []).filter((n) => n.type === "FRAME" || n.type === "COMPONENT").length,
  }));

  const componentCount = Object.keys(file.components ?? {}).length;

  return {
    name: file.name,
    file_key: fileKey,
    last_modified: file.lastModified,
    version: file.version,
    thumbnail_url: file.thumbnailUrl ?? null,
    editor_type: file.editorType,
    page_count: pages.length,
    pages,
    component_count: componentCount,
  };
}

export async function figmaGetNode(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args.personal_access_token);
  const fileKey = requireFileKey(args.file_key);
  const nodeId = String(args.node_id ?? "").trim();
  if (!nodeId) throw new Error("node_id is required.");

  // The /files/:key/nodes endpoint accepts comma-separated node IDs
  const data = await figmaGet<{ nodes: Record<string, { document: FigmaNode; components?: Record<string, FigmaComponent> }> }>(
    token,
    `/files/${fileKey}/nodes`,
    { ids: nodeId }
  );

  const nodeData = data.nodes?.[nodeId];
  if (!nodeData) {
    throw new Error(`Node "${nodeId}" not found in file "${fileKey}".`);
  }

  const node = nodeData.document;

  function summarizeNode(n: FigmaNode, depth = 0): unknown {
    const summary: Record<string, unknown> = {
      id: n.id,
      name: n.name,
      type: n.type,
    };
    if (n.children && depth < 2) {
      summary.children = n.children.map((c) => summarizeNode(c, depth + 1));
    } else if (n.children) {
      summary.child_count = n.children.length;
    }
    return summary;
  }

  return {
    file_key: fileKey,
    node: summarizeNode(node),
    component_count: Object.keys(nodeData.components ?? {}).length,
  };
}

export async function figmaGetImages(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args.personal_access_token);
  const fileKey = requireFileKey(args.file_key);

  // node_ids can be a comma-separated string or an array
  let nodeIds: string;
  if (Array.isArray(args.node_ids)) {
    nodeIds = (args.node_ids as string[]).join(",");
  } else {
    nodeIds = String(args.node_ids ?? "").trim();
  }
  if (!nodeIds) throw new Error("node_ids is required (comma-separated list of node IDs to render).");

  const format = String(args.format ?? "png").toLowerCase();
  const validFormats = ["png", "jpg", "svg", "pdf"];
  if (!validFormats.includes(format)) {
    throw new Error(`Invalid format "${format}". Valid formats: ${validFormats.join(", ")}.`);
  }

  const params: Record<string, string> = { ids: nodeIds, format };

  const scale = Number(args.scale ?? 1);
  if (format !== "svg" && format !== "pdf") {
    const clampedScale = Math.min(4, Math.max(0.01, scale));
    params.scale = String(clampedScale);
  }

  const result = await figmaGet<FigmaImageResponse>(token, `/images/${fileKey}`, params);

  if (result.err) {
    throw new Error(`Figma image render error: ${result.err}`);
  }

  const images = Object.entries(result.images ?? {}).map(([id, url]) => ({
    node_id: id,
    url: url ?? null,
    rendered: url !== null,
  }));

  return {
    file_key: fileKey,
    format,
    scale: params.scale ?? null,
    count: images.length,
    images,
  };
}

export async function figmaGetComments(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args.personal_access_token);
  const fileKey = requireFileKey(args.file_key);

  const data = await figmaGet<{ comments: FigmaComment[] }>(token, `/files/${fileKey}/comments`);

  const comments = (data.comments ?? []).map((c) => ({
    id: c.id,
    message: c.message,
    author: c.user?.handle ?? null,
    created_at: c.created_at,
    resolved: c.resolved_at !== null,
    resolved_at: c.resolved_at ?? null,
    position: c.client_meta
      ? { x: c.client_meta.x ?? null, y: c.client_meta.y ?? null, node_id: c.client_meta.node_id ?? null }
      : null,
  }));

  return {
    file_key: fileKey,
    count: comments.length,
    comments,
  };
}

export async function figmaPostComment(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args.personal_access_token);
  const fileKey = requireFileKey(args.file_key);
  const message = String(args.message ?? "").trim();
  if (!message) throw new Error("message is required.");

  const body: Record<string, unknown> = { message };

  // Optional canvas coordinates for pinning the comment to a location
  const x = args.x !== undefined ? Number(args.x) : undefined;
  const y = args.y !== undefined ? Number(args.y) : undefined;
  if (x !== undefined && y !== undefined) {
    body.client_meta = { x, y };
  }

  const data = await figmaPost<{ id: string; message: string; created_at: string }>(
    token,
    `/files/${fileKey}/comments`,
    body
  );

  return {
    success: true,
    file_key: fileKey,
    comment_id: data.id,
    message: data.message,
    created_at: data.created_at,
  };
}

export async function figmaGetComponents(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args.personal_access_token);
  const fileKey = requireFileKey(args.file_key);

  // /files/:key returns components in the top-level `components` map
  const file = await figmaGet<FigmaFile>(token, `/files/${fileKey}`, { depth: "1" });

  const components = Object.entries(file.components ?? {}).map(([nodeId, comp]) => ({
    node_id: nodeId,
    key: comp.key,
    name: comp.name,
    description: comp.description ?? null,
  }));

  return {
    file_key: fileKey,
    count: components.length,
    components,
  };
}

export async function figmaGetTeamProjects(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args.personal_access_token);
  const teamId = String(args.team_id ?? "").trim();
  if (!teamId) throw new Error("team_id is required (found in your Figma team URL).");

  const data = await figmaGet<{ projects: Array<{ id: string; name: string }> }>(
    token,
    `/teams/${encodeURIComponent(teamId)}/projects`
  );

  const projects = (data.projects ?? []).map((p) => ({
    id: p.id,
    name: p.name,
  }));

  return {
    team_id: teamId,
    count: projects.length,
    projects,
  };
}

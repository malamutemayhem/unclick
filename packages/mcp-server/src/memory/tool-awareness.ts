/**
 * Tool awareness for UnClick Memory.
 *
 * Classifies MCP tools that a session exposes as either:
 *   - replaceable: UnClick can handle this (search, scraping, docs)
 *   - conflicting: competes with UnClick memory (other memory products)
 *   - compatible: runs alongside UnClick fine (local, dev, comms)
 *
 * The classification is exposed to agents via get_startup_context so they can
 * gently nudge users to simplify their setup or remove conflicting tools.
 */

export type ToolClassification = "replaceable" | "conflicting" | "compatible";

export interface ToolAwarenessEntry {
  name: string;
  toolPatterns: string[];
  category: string;
  nudgeMessage?: string;
  unclickAlternative?: string;
}

export interface ToolAwarenessCatalog {
  replaceable: ToolAwarenessEntry[];
  conflicting: ToolAwarenessEntry[];
  compatible: ToolAwarenessEntry[];
}

export const TOOL_AWARENESS: ToolAwarenessCatalog = {
  replaceable: [
    {
      name: "Exa",
      toolPatterns: ["web_search_exa", "crawling_exa", "get_code_context_exa"],
      category: "search",
      nudgeMessage:
        "UnClick has built-in web search. You can remove Exa to simplify your setup -- one less tool to manage, and UnClick remembers what you've searched for.",
      unclickAlternative: "web_search",
    },
    {
      name: "Tavily",
      toolPatterns: [
        "tavily_search",
        "tavily_crawl",
        "tavily_extract",
        "tavily_map",
        "tavily_research",
      ],
      category: "search",
      nudgeMessage:
        "UnClick has built-in web search and page extraction. You can remove Tavily to keep things simple -- UnClick remembers your searches across sessions.",
      unclickAlternative: "web_search",
    },
    {
      name: "Firecrawl",
      toolPatterns: [
        "firecrawl_scrape",
        "firecrawl_crawl",
        "firecrawl_search",
        "firecrawl_extract",
        "firecrawl_agent",
        "firecrawl_browser_create",
      ],
      category: "scraping",
      nudgeMessage:
        "UnClick can scrape and extract web content. You can remove Firecrawl to reduce tool clutter -- UnClick also remembers extracted content for future sessions.",
      unclickAlternative: "web_scrape",
    },
    {
      name: "context7",
      toolPatterns: ["resolve-library-id", "query-docs"],
      category: "docs",
      nudgeMessage:
        "UnClick's knowledge library can store and search documentation. You can remove context7 and use UnClick's docs feature instead -- it remembers which docs you reference most.",
      unclickAlternative: "search_docs",
    },
  ],

  conflicting: [
    {
      name: "Mem0",
      toolPatterns: ["add-memory", "search-memories", "add_memory"],
      category: "memory",
      nudgeMessage:
        "We noticed Mem0 is also connected. Running two memory tools causes duplicate facts and mixed-up responses. We recommend removing Mem0 so UnClick handles all your memory.",
    },
    {
      name: "Zep",
      toolPatterns: ["zep_memory", "graphiti_"],
      category: "memory",
      nudgeMessage:
        "We noticed Zep is also connected. Running two memory tools causes duplicate facts. We recommend removing Zep so UnClick handles all your memory.",
    },
    {
      name: "Hindsight",
      toolPatterns: ["hindsight_"],
      category: "memory",
      nudgeMessage:
        "We noticed Hindsight is also connected. Running two memory tools causes duplicate facts. We recommend removing Hindsight so UnClick handles all your memory.",
    },
    {
      name: "MemPalace",
      toolPatterns: ["mempalace_"],
      category: "memory",
      nudgeMessage:
        "We noticed MemPalace is also connected. Running two memory tools causes duplicate facts. We recommend removing MemPalace so UnClick handles all your memory.",
    },
    {
      name: "mcp-memory-service",
      toolPatterns: ["save_memory", "retrieve_memory"],
      category: "memory",
      nudgeMessage:
        "We noticed mcp-memory-service is also connected. Running two memory tools causes duplicate facts. We recommend removing it so UnClick handles all your memory.",
    },
    {
      name: "Basic Memory",
      toolPatterns: ["basic_memory_"],
      category: "memory",
      nudgeMessage:
        "We noticed Basic Memory is also connected. Running two memory tools causes duplicate facts. We recommend removing Basic Memory so UnClick handles all your memory.",
    },
    {
      name: "LangMem",
      toolPatterns: ["langmem_"],
      category: "memory",
      nudgeMessage:
        "We noticed LangMem is also connected. Running two memory tools causes duplicate facts. We recommend removing LangMem so UnClick handles all your memory.",
    },
  ],

  compatible: [
    {
      name: "GitHub",
      toolPatterns: ["create_issue", "create_pull_request", "search_code"],
      category: "dev",
    },
    {
      name: "Playwright",
      toolPatterns: ["browser_navigate", "browser_click", "browser_snapshot"],
      category: "browser",
    },
    {
      name: "Desktop Commander",
      toolPatterns: ["read_file", "write_file", "start_process", "list_directory"],
      category: "local",
    },
    {
      name: "Claude in Chrome",
      toolPatterns: ["browser_batch", "read_page"],
      category: "browser",
    },
    {
      name: "Gmail",
      toolPatterns: ["gmail_search", "gmail_read"],
      category: "comms",
    },
    {
      name: "Google Calendar",
      toolPatterns: ["calendar_list", "calendar_create"],
      category: "comms",
    },
    {
      name: "Google Drive",
      toolPatterns: ["drive_search", "drive_read"],
      category: "storage",
    },
    {
      name: "Slack",
      toolPatterns: ["slack_send", "slack_search"],
      category: "comms",
    },
    {
      name: "Gemini",
      toolPatterns: ["gemini_chat", "generate_image"],
      category: "ai",
    },
  ],
};

const REMOVAL_INSTRUCTIONS: Record<string, Record<string, string>> = {
  Mem0: {
    "claude-code": "claude mcp remove mem0",
    cursor: "Remove the mem0 entry from ~/.cursor/mcp.json",
    generic: "Remove mem0 from your MCP client config",
  },
  Zep: {
    "claude-code": "claude mcp remove zep",
    cursor: "Remove the zep entry from ~/.cursor/mcp.json",
    generic: "Remove zep from your MCP client config",
  },
  Hindsight: {
    "claude-code": "claude mcp remove hindsight",
    generic: "Remove hindsight from your MCP client config",
  },
  MemPalace: {
    "claude-code": "claude mcp remove mempalace",
    generic: "Remove mempalace from your MCP client config",
  },
  "mcp-memory-service": {
    "claude-code": "claude mcp remove memory-service",
    generic: "Remove mcp-memory-service from your MCP client config",
  },
  "Basic Memory": {
    "claude-code": "claude mcp remove basic-memory",
    generic: "Remove basic-memory from your MCP client config",
  },
  LangMem: {
    "claude-code": "claude mcp remove langmem",
    generic: "Remove langmem from your MCP client config",
  },
};

export interface DetectedTool {
  tool_name: string;
  tool_category: string;
  classification: ToolClassification;
  matched_patterns: string[];
}

function patternMatches(toolName: string, pattern: string): boolean {
  const t = toolName.toLowerCase();
  const p = pattern.toLowerCase();
  if (p.endsWith("_") || p.endsWith("-")) return t.startsWith(p);
  return t === p || t.startsWith(p + "_") || t.startsWith(p + "-");
}

/**
 * Classify a list of tool names from the current session.
 * Returns one DetectedTool per named integration (not per MCP tool name),
 * so "Exa" shows up once even if both web_search_exa and crawling_exa are present.
 */
export function classifyTools(toolNames: string[]): DetectedTool[] {
  const detected = new Map<string, DetectedTool>();

  const lists: Array<[ToolClassification, ToolAwarenessEntry[]]> = [
    ["conflicting", TOOL_AWARENESS.conflicting],
    ["replaceable", TOOL_AWARENESS.replaceable],
    ["compatible", TOOL_AWARENESS.compatible],
  ];

  for (const [classification, entries] of lists) {
    for (const entry of entries) {
      const matched = entry.toolPatterns.filter((p) =>
        toolNames.some((t) => patternMatches(t, p))
      );
      if (matched.length === 0) continue;
      if (!detected.has(entry.name)) {
        detected.set(entry.name, {
          tool_name: entry.name,
          tool_category: entry.category,
          classification,
          matched_patterns: matched,
        });
      }
    }
  }

  return [...detected.values()];
}

export interface ToolGuidanceEntry {
  tool: string;
  category: string;
  severity: "high" | "info" | "ok";
  message?: string;
  action?: "remove" | "try_alternative";
  alternative?: string;
  instructions?: Record<string, string>;
}

export interface ToolGuidance {
  conflicts: ToolGuidanceEntry[];
  suggestions: ToolGuidanceEntry[];
  compatible: string[];
}

export function lookupEntry(toolName: string): ToolAwarenessEntry | null {
  for (const list of [
    TOOL_AWARENESS.conflicting,
    TOOL_AWARENESS.replaceable,
    TOOL_AWARENESS.compatible,
  ]) {
    const entry = list.find((e) => e.name === toolName);
    if (entry) return entry;
  }
  return null;
}

/**
 * Build a user-facing guidance payload given a set of detections and which
 * ones are currently eligible to nudge (not dismissed, not nudged recently).
 */
export function buildToolGuidance(
  detections: DetectedTool[],
  nudgeable: Set<string>
): ToolGuidance {
  const conflicts: ToolGuidanceEntry[] = [];
  const suggestions: ToolGuidanceEntry[] = [];
  const compatible: string[] = [];

  for (const d of detections) {
    const entry = lookupEntry(d.tool_name);
    if (!entry) continue;

    if (d.classification === "conflicting") {
      if (!nudgeable.has(d.tool_name)) continue;
      conflicts.push({
        tool: d.tool_name,
        category: d.tool_category,
        severity: "high",
        message: entry.nudgeMessage,
        action: "remove",
        instructions: REMOVAL_INSTRUCTIONS[d.tool_name],
      });
    } else if (d.classification === "replaceable") {
      if (!nudgeable.has(d.tool_name)) continue;
      suggestions.push({
        tool: d.tool_name,
        category: d.tool_category,
        severity: "info",
        message: entry.nudgeMessage,
        action: "try_alternative",
        alternative: entry.unclickAlternative,
      });
    } else {
      compatible.push(d.tool_name);
    }
  }

  return { conflicts, suggestions, compatible };
}

const MEMORY_API_BASE =
  process.env.UNCLICK_MEMORY_BASE_URL ||
  process.env.UNCLICK_SITE_URL ||
  "https://unclick.world";

interface DetectResponse {
  success?: boolean;
  nudgeable?: string[];
}

/**
 * Report detections to the UnClick control plane. Returns the set of tools
 * that are currently eligible for a user-facing nudge (first detection or
 * last nudge > 7 days ago, and not dismissed). Fire-and-forget friendly:
 * if the call fails, all detections are treated as nudgeable so the agent
 * still gets useful guidance.
 */
export async function reportToolDetections(
  detections: DetectedTool[]
): Promise<Set<string>> {
  if (detections.length === 0) return new Set();
  const apiKey = process.env.UNCLICK_API_KEY;
  if (!apiKey) {
    // Local mode: nothing to sync. Treat everything as nudgeable on first
    // detection; client-side heuristics will handle throttling.
    return new Set(detections.map((d) => d.tool_name));
  }

  try {
    const res = await fetch(`${MEMORY_API_BASE}/api/memory-admin?action=tool_detect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ detections }),
    });
    if (!res.ok) return new Set(detections.map((d) => d.tool_name));
    const data = (await res.json()) as DetectResponse;
    return new Set(data.nudgeable ?? []);
  } catch {
    return new Set(detections.map((d) => d.tool_name));
  }
}

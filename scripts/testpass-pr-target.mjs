const DEFAULT_TESTPASS_SERVER_URL = "https://unclick.world/api/mcp";
const DEFAULT_TESTPASS_API_URL = "https://unclick.world/api/testpass-run";

function safeText(value) {
  return String(value ?? "").trim();
}

function authorLogin(comment) {
  return safeText(comment?.user?.login || comment?.author?.login);
}

function createdTime(comment) {
  const value = comment?.updated_at || comment?.updatedAt || comment?.created_at || comment?.createdAt || 0;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function statusContext(status) {
  return safeText(status?.context || status?.name).toLowerCase();
}

function statusState(status) {
  return safeText(status?.state || status?.conclusion).toLowerCase();
}

export function hasSuccessfulVercelStatus(statuses = []) {
  return statusState(selectLatestStatusContext(statuses, "Vercel")) === "success";
}

export function extractVercelPreviewUrls(body) {
  const text = safeText(body);
  if (!text) return [];

  const urls = [];
  const markdownPreviewLink =
    /\[\s*Preview\s*\]\((https:\/\/[^)\s]+?\.vercel\.app(?:\/[^)\s]*)?)\)/gi;
  let match;
  while ((match = markdownPreviewLink.exec(text)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

export function selectLatestVercelPreviewUrl(comments = []) {
  const vercelComments = comments
    .filter((comment) => ["vercel", "vercel[bot]"].includes(authorLogin(comment)))
    .sort((a, b) => createdTime(b) - createdTime(a));

  for (const comment of vercelComments) {
    const [previewUrl] = extractVercelPreviewUrls(comment.body);
    if (previewUrl) return previewUrl;
  }
  return "";
}

export function toMcpServerUrl(previewUrl) {
  const parsed = new URL(previewUrl);
  parsed.pathname = "/api/mcp";
  parsed.search = "";
  parsed.hash = "";
  return parsed.toString().replace(/\/$/, "");
}

export function toTestPassRunApiUrl(previewUrl) {
  const parsed = new URL(previewUrl);
  parsed.pathname = "/api/testpass-run";
  parsed.search = "";
  parsed.hash = "";
  return parsed.toString().replace(/\/$/, "");
}

export function resolveTestPassPrTarget(input = {}) {
  const requestedServerUrl = safeText(input.requestedServerUrl);
  const defaultServerUrl = safeText(input.defaultServerUrl) || DEFAULT_TESTPASS_SERVER_URL;
  const defaultApiUrl = safeText(input.defaultApiUrl) || DEFAULT_TESTPASS_API_URL;

  if (requestedServerUrl && requestedServerUrl !== defaultServerUrl) {
    let apiUrl = defaultApiUrl;
    try {
      apiUrl = toTestPassRunApiUrl(requestedServerUrl);
    } catch {
      apiUrl = defaultApiUrl;
    }
    return { serverUrl: requestedServerUrl, apiUrl, source: "workflow_input" };
  }

  const previewUrl = selectLatestVercelPreviewUrl(input.comments);
  if (previewUrl) {
    return {
      serverUrl: toMcpServerUrl(previewUrl),
      apiUrl: toTestPassRunApiUrl(previewUrl),
      source: "vercel_preview_comment",
    };
  }

  return { serverUrl: requestedServerUrl || defaultServerUrl, apiUrl: defaultApiUrl, source: "default" };
}
export function selectLatestStatusContext(statuses = [], contextName = "Vercel") {
  const wanted = safeText(contextName).toLowerCase();
  return statuses
    .filter((status) => statusContext(status) === wanted)
    .sort((a, b) => createdTime(b) - createdTime(a))[0] || null;
}

const DEFAULT_TESTPASS_SERVER_URL = "https://unclick.world/api/mcp";

function safeText(value) {
  return String(value ?? "").trim();
}

function authorLogin(comment) {
  return safeText(comment?.user?.login || comment?.author?.login);
}

function createdTime(comment) {
  const value = comment?.created_at || comment?.createdAt || 0;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
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

export function resolveTestPassPrTarget(input = {}) {
  const requestedServerUrl = safeText(input.requestedServerUrl);
  const defaultServerUrl = safeText(input.defaultServerUrl) || DEFAULT_TESTPASS_SERVER_URL;

  if (requestedServerUrl && requestedServerUrl !== defaultServerUrl) {
    return { serverUrl: requestedServerUrl, source: "workflow_input" };
  }

  const previewUrl = selectLatestVercelPreviewUrl(input.comments);
  if (previewUrl) {
    return { serverUrl: toMcpServerUrl(previewUrl), source: "vercel_preview_comment" };
  }

  return { serverUrl: requestedServerUrl || defaultServerUrl, source: "default" };
}

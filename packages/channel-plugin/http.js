export async function apiFetchJson({
  apiBase,
  apiKey,
  action,
  method = "GET",
  body,
  query = {},
  timeoutMs = 10_000,
}) {
  const describeBody = (value) => {
    if (typeof value !== "string") return "";
    const compact = value.replace(/\s+/g, " ").trim();
    return compact ? ` body="${compact.slice(0, 160)}"` : "";
  };

  const qs = new URLSearchParams({ action, ...query }).toString();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${apiBase}/api/memory-admin?${qs}`, {
      method,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`api ${action} -> ${res.status}${describeBody(text)}`);
    }
    try {
      return await res.json();
    } catch (err) {
      const text = await res.text().catch(() => "");
      const reason =
        err && typeof err === "object" && "message" in err
          ? String(err.message)
          : "unknown parse error";
      throw new Error(
        `api ${action} -> invalid json (${reason})${describeBody(text)}`
      );
    }
  } catch (err) {
    if (err && typeof err === "object" && err.name === "AbortError") {
      throw new Error(`api ${action} timeout after ${timeoutMs}ms`);
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

// WhatsApp Business Cloud API integration for the UnClick MCP server.
// Uses the WhatsApp Cloud API via fetch - no external dependencies.
// Users must supply a Bearer token and phone number ID from Meta for Developers.

import { notConnectedFor } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";

const WA_API_BASE = "https://graph.facebook.com/v19.0";

// ─── Types ────────────────────────────────────────────────────────────────────

interface WaMessageResponse {
  messaging_product: string;
  contacts: Array<{ input: string; wa_id: string }>;
  messages: Array<{ id: string; message_status?: string }>;
}

interface WaMediaResponse {
  id: string;
  url?: string;
  mime_type?: string;
  sha256?: string;
  file_size?: number;
  messaging_product?: string;
}

// ─── Auth validation ──────────────────────────────────────────────────────────

function requireAuth(args: Record<string, unknown>): { token: string; phoneNumberId: string } | NotConnectedResult {
  const token = String(args.bearer_token ?? process.env.WHATSAPP_BEARER_TOKEN ?? "").trim();
  const phoneNumberId = String(args.phone_number_id ?? process.env.WHATSAPP_PHONE_NUMBER_ID ?? "").trim();
  if (!token || !phoneNumberId) return notConnectedFor("whatsapp");
  return { token, phoneNumberId };
}

// ─── API helpers ──────────────────────────────────────────────────────────────

async function waPost<T>(token: string, path: string, body: unknown): Promise<T> {
  const WHATSAPP_TIMEOUT_MS = Number(process.env.WHATSAPP_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), WHATSAPP_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${WA_API_BASE}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`WhatsApp request timed out after ${WHATSAPP_TIMEOUT_MS}ms.`);
    }
    throw new Error(`WhatsApp network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("WhatsApp rate limit reached (HTTP 429). Please wait and retry.");

  const data = await res.json() as Record<string, unknown>;
  if (!res.ok) {
    const err = data.error as Record<string, unknown> | undefined;
    const msg = err?.message ?? `status ${res.status}`;
    const code = err?.code ? ` (code ${err.code})` : "";
    throw new Error(`WhatsApp API error${code}: ${msg}`);
  }
  return data as T;
}

async function waGet<T>(token: string, path: string): Promise<T> {
  const WHATSAPP_TIMEOUT_MS = Number(process.env.WHATSAPP_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), WHATSAPP_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${WA_API_BASE}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`WhatsApp request timed out after ${WHATSAPP_TIMEOUT_MS}ms.`);
    }
    throw new Error(`WhatsApp network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("WhatsApp rate limit reached (HTTP 429). Please wait and retry.");

  const data = await res.json() as Record<string, unknown>;
  if (!res.ok) {
    const err = data.error as Record<string, unknown> | undefined;
    const msg = err?.message ?? `status ${res.status}`;
    throw new Error(`WhatsApp API error: ${msg}`);
  }
  return data as T;
}

// ─── Operations ───────────────────────────────────────────────────────────────

export async function whatsappSendText(args: Record<string, unknown>): Promise<unknown> {
  const _auth = requireAuth(args);
  if ("not_connected" in _auth) return _auth;
  const { token, phoneNumberId } = _auth;
  const to = String(args.to ?? "").trim();
  const body = String(args.body ?? "").trim();
  if (!to) throw new Error("to is required (recipient phone number in E.164 format).");
  if (!body) throw new Error("body is required (message text).");

  const payload: Record<string, unknown> = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to,
    type: "text",
    text: { body, preview_url: args.preview_url === true },
  };

  const result = await waPost<WaMessageResponse>(token, `/${phoneNumberId}/messages`, payload);
  return {
    success: true,
    message_id: result.messages[0]?.id ?? null,
    wa_id: result.contacts[0]?.wa_id ?? to,
    to,
  };
}

export async function whatsappSendTemplate(args: Record<string, unknown>): Promise<unknown> {
  const _auth = requireAuth(args);
  if ("not_connected" in _auth) return _auth;
  const { token, phoneNumberId } = _auth;
  const to = String(args.to ?? "").trim();
  const templateName = String(args.template_name ?? "").trim();
  const language = String(args.language ?? "en_US").trim();
  if (!to) throw new Error("to is required.");
  if (!templateName) throw new Error("template_name is required.");

  let components: unknown[] = [];
  if (args.components) {
    if (typeof args.components === "string") {
      try { components = JSON.parse(args.components); }
      catch { throw new Error("components must be valid JSON (array of template component objects)."); }
    } else if (Array.isArray(args.components)) {
      components = args.components;
    }
  }

  const payload: Record<string, unknown> = {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: templateName,
      language: { code: language },
      components: components.length > 0 ? components : undefined,
    },
  };

  const result = await waPost<WaMessageResponse>(token, `/${phoneNumberId}/messages`, payload);
  return {
    success: true,
    message_id: result.messages[0]?.id ?? null,
    wa_id: result.contacts[0]?.wa_id ?? to,
    template_name: templateName,
    to,
  };
}

export async function whatsappSendMedia(args: Record<string, unknown>): Promise<unknown> {
  const _auth = requireAuth(args);
  if ("not_connected" in _auth) return _auth;
  const { token, phoneNumberId } = _auth;
  const to = String(args.to ?? "").trim();
  const mediaType = String(args.media_type ?? "").toLowerCase().trim();
  if (!to) throw new Error("to is required.");

  const validTypes = ["image", "video", "audio", "document", "sticker"];
  if (!validTypes.includes(mediaType)) {
    throw new Error(`media_type must be one of: ${validTypes.join(", ")}.`);
  }

  const mediaId = String(args.media_id ?? "").trim();
  const mediaLink = String(args.media_link ?? "").trim();
  if (!mediaId && !mediaLink) throw new Error("Either media_id or media_link is required.");

  const mediaObject: Record<string, unknown> = {};
  if (mediaId) mediaObject.id = mediaId;
  if (mediaLink) mediaObject.link = mediaLink;
  if (args.caption && mediaType !== "audio" && mediaType !== "sticker") {
    mediaObject.caption = String(args.caption);
  }
  if (args.filename && mediaType === "document") {
    mediaObject.filename = String(args.filename);
  }

  const payload: Record<string, unknown> = {
    messaging_product: "whatsapp",
    to,
    type: mediaType,
    [mediaType]: mediaObject,
  };

  const result = await waPost<WaMessageResponse>(token, `/${phoneNumberId}/messages`, payload);
  return {
    success: true,
    message_id: result.messages[0]?.id ?? null,
    wa_id: result.contacts[0]?.wa_id ?? to,
    media_type: mediaType,
    to,
  };
}

export async function whatsappGetMedia(args: Record<string, unknown>): Promise<unknown> {
  const token = String(args.bearer_token ?? process.env.WHATSAPP_BEARER_TOKEN ?? "").trim();
  if (!token) return notConnectedFor("whatsapp");
  const mediaId = String(args.media_id ?? "").trim();
  if (!mediaId) throw new Error("media_id is required.");

  const result = await waGet<WaMediaResponse>(token, `/${mediaId}`);
  return {
    id: result.id,
    url: result.url ?? null,
    mime_type: result.mime_type ?? null,
    file_size: result.file_size ?? null,
    sha256: result.sha256 ?? null,
  };
}

export async function whatsappUploadMedia(args: Record<string, unknown>): Promise<unknown> {
  const _auth = requireAuth(args);
  if ("not_connected" in _auth) return _auth;
  const { token, phoneNumberId } = _auth;
  const mediaUrl = String(args.media_url ?? "").trim();
  const mimeType = String(args.mime_type ?? "").trim();
  if (!mediaUrl) throw new Error("media_url is required (URL to fetch the media from).");
  if (!mimeType) throw new Error("mime_type is required (e.g. image/jpeg, video/mp4).");

  const WHATSAPP_TIMEOUT_MS = Number(process.env.WHATSAPP_TIMEOUT_MS) || 15000;

  // Fetch the media and upload it as a blob
  const mediaController = new AbortController();
  const mediaTimer = setTimeout(() => mediaController.abort(), WHATSAPP_TIMEOUT_MS);
  let mediaRes: Response;
  try {
    mediaRes = await fetch(mediaUrl, { signal: mediaController.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`WhatsApp media download timed out after ${WHATSAPP_TIMEOUT_MS}ms.`);
    }
    throw new Error(`WhatsApp media download network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(mediaTimer);
  }
  if (!mediaRes.ok) throw new Error(`Failed to fetch media from URL: HTTP ${mediaRes.status}`);
  const mediaBlob = await mediaRes.blob();

  const form = new FormData();
  form.append("messaging_product", "whatsapp");
  form.append("type", mimeType);
  form.append("file", mediaBlob, args.filename ? String(args.filename) : "upload");

  const uploadController = new AbortController();
  const uploadTimer = setTimeout(() => uploadController.abort(), WHATSAPP_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${WA_API_BASE}/${phoneNumberId}/media`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
      signal: uploadController.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`WhatsApp upload timed out after ${WHATSAPP_TIMEOUT_MS}ms.`);
    }
    throw new Error(`WhatsApp upload network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(uploadTimer);
  }
  if (res.status === 429) throw new Error("WhatsApp rate limit reached (HTTP 429). Please wait and retry.");

  const data = await res.json() as Record<string, unknown>;
  if (!res.ok) {
    const err = data.error as Record<string, unknown> | undefined;
    throw new Error(`WhatsApp upload error: ${err?.message ?? `status ${res.status}`}`);
  }
  return {
    success: true,
    media_id: data.id,
  };
}

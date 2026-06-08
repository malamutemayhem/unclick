import { stampMeta } from "./connector-meta.js";

export async function httpCatImage(args: Record<string, unknown>) {
  const code = Number(args.status_code) || 200;
  const url = `https://http.cat/${code}`;
  return stampMeta(
    { image_url: url, status_code: code },
    { source: "http.cat", fetched_at: new Date().toISOString(), next_steps: ["Common codes: 200 OK, 201 Created, 204 No Content, 301 Moved, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error.", "The image URL can be embedded directly in messages or docs."] },
  );
}

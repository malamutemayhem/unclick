import type { VercelRequest, VercelResponse } from "@vercel/node";
import { protectedResourceMetadata } from "./lib/mcp-oauth.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "GET required" });

  return res.status(200).json(protectedResourceMetadata());
}

/**
 * UnClick Developer Tool Submission - Vercel serverless function
 *
 * Route: POST /api/developer-submit-tool
 *
 * Accepts tool submissions from developers, inserts into tool_submissions
 * with status='pending', and sends a notification email to the review team.
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const VALID_CATEGORIES = [
  "automation",
  "business",
  "content",
  "data",
  "devtools",
  "finance",
  "life",
  "scheduling",
  "security",
  "web",
];

async function sendSubmissionEmail(params: {
  tool_name: string;
  category: string;
  description: string;
  api_name: string;
  github_url?: string;
  contact_email: string;
  submission_id: string;
  submitted_at: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[sendSubmissionEmail] RESEND_API_KEY not set - skipping notification email");
    return;
  }

  const { tool_name, category, description, api_name, github_url, contact_email, submission_id, submitted_at } = params;

  const emailBody = [
    `New tool submission received for review.`,
    ``,
    `Submission ID: ${submission_id}`,
    `Submitted: ${submitted_at}`,
    ``,
    `Tool Name: ${tool_name}`,
    `Category: ${category}`,
    `API Name: ${api_name}`,
    `Developer Email: ${contact_email}`,
    github_url ? `GitHub URL: ${github_url}` : "",
    ``,
    `Description:`,
    description,
  ].filter((line) => line !== undefined).join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "UnClick Developer Platform <developers@unclick.world>",
        to: ["creativelead@malamutemayhem.com"],
        subject: `[UnClick] New Tool Submission: ${tool_name}`,
        text: emailBody,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[sendSubmissionEmail] Resend error:", res.status, body);
    } else {
      console.log("[sendSubmissionEmail] Notification sent successfully");
    }
  } catch (err) {
    console.error("[sendSubmissionEmail] Network error:", err);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { tool_name, category, description, api_name, github_url, tool_file_content, contact_email } =
    req.body ?? {};

  // Required field validation
  if (!tool_name || typeof tool_name !== "string" || tool_name.trim().length < 2) {
    return res.status(400).json({ error: "tool_name is required (min 2 characters)" });
  }
  if (!category || !VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({ error: `category is required. Valid options: ${VALID_CATEGORIES.join(", ")}` });
  }
  if (!description || typeof description !== "string" || description.trim().length < 20) {
    return res.status(400).json({ error: "description is required (min 20 characters)" });
  }
  if (!api_name || typeof api_name !== "string" || api_name.trim().length < 2) {
    return res.status(400).json({ error: "api_name is required (min 2 characters)" });
  }
  if (!contact_email || typeof contact_email !== "string" || !contact_email.includes("@")) {
    return res.status(400).json({ error: "contact_email is required and must be a valid email address" });
  }
  if (!github_url && !tool_file_content) {
    return res.status(400).json({ error: "Either github_url or tool_file_content is required" });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase env vars missing - tool submission not persisted");
    return res.status(500).json({ error: "Submission service unavailable. Please try again later." });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from("tool_submissions")
    .insert({
      tool_name: tool_name.trim(),
      category,
      description: description.trim(),
      api_name: api_name.trim(),
      github_url: github_url ? String(github_url).trim() : null,
      tool_file_content: tool_file_content ? String(tool_file_content) : null,
      contact_email: contact_email.trim().toLowerCase(),
      status: "pending",
    })
    .select("id, submitted_at")
    .single();

  if (error) {
    console.error("Supabase insert error:", error.message);
    return res.status(500).json({ error: "Failed to submit tool. Please try again." });
  }

  await sendSubmissionEmail({
    tool_name: tool_name.trim(),
    category,
    description: description.trim(),
    api_name: api_name.trim(),
    github_url: github_url ? String(github_url).trim() : undefined,
    contact_email: contact_email.trim().toLowerCase(),
    submission_id: data.id,
    submitted_at: data.submitted_at ?? new Date().toISOString(),
  });

  return res.status(201).json({
    success: true,
    submission_id: data.id,
    message: "Submitted! You'll hear back within 48 hours.",
  });
}

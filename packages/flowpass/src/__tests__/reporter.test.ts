import { describe, expect, it } from "vitest";

import {
  FLOWPASS_INTERNAL_DOGFOOD_INPUT,
  generateFlowPassFixPrompt,
  generateFlowPassHtmlReport,
  generateFlowPassJsonReport,
  generateFlowPassMarkdownReport,
  runFlowPass,
} from "../index.js";

describe("FlowPass reporter", () => {
  it("generates JSON, Markdown, HTML, and a repair prompt", () => {
    const report = runFlowPass(FLOWPASS_INTERNAL_DOGFOOD_INPUT);
    const json = generateFlowPassJsonReport(report);
    const markdown = generateFlowPassMarkdownReport(report);
    const html = generateFlowPassHtmlReport(report, {
      ogImageUrl: "https://unclick.world/og-image.png",
    });
    const prompt = generateFlowPassFixPrompt(report);

    expect(json).toMatchObject({ verdict: "ready", mode: "fixture" });
    expect(markdown).toContain("# FlowPass Report");
    expect(markdown).toContain("## Hat panel");
    expect(markdown).toContain("## Not checked");
    expect(html).toContain("<!doctype html>");
    expect(html).toContain('<meta name="description"');
    expect(html).toContain('<meta property="og:image" content="https://unclick.world/og-image.png">');
    expect(html).toContain("FlowPass is a scoped journey proof");
    expect(prompt).toContain("FlowPass journey-fix prompt");
  });
});

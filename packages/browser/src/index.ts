// @unclick/browser - B1 reader core.
//
// The conversion pipeline at the heart of the UnClick Browser: turn any HTML
// page into a clean, consistent UnClick Doc, then render it identically
// everywhere. The same UnClick Doc is what an agent reads, so one observation
// serves both the human reader and the agent (see docs/connectors/unclick-browser-plan.md).

export * from "./format.js";
export { htmlToUnclickDoc, type ConvertOptions } from "./convert.js";
export {
  renderUnclickDoc,
  renderBody,
  stylesheet,
  MAX_IMAGE_WIDTH,
  type RenderOptions,
} from "./render.js";

import { htmlToUnclickDoc, type ConvertOptions } from "./convert.js";
import { renderUnclickDoc, type RenderOptions } from "./render.js";

/** Convenience: HTML straight to clean, themed HTML via an UnClick Doc. */
export function renderHtml(
  html: string,
  options: ConvertOptions & RenderOptions = {},
): string {
  const doc = htmlToUnclickDoc(html, options);
  return renderUnclickDoc(doc, options);
}

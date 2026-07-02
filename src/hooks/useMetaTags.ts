import { useEffect } from "react";

interface MetaTagsOptions {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
}

function setMeta(property: string, content: string) {
  // OpenGraph tags use the `property` attribute; Twitter cards and plain
  // meta (description) use `name`. index.html ships the static tags the
  // same way, so updates edit those tags instead of adding duplicates.
  const attr = property.startsWith("og:") ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

const defaultTitle = "UnClick - Agent rails for tools, memory, and QC";
const defaultDescription =
  "UnClick gives AI agents shared rails for callable tools, persistent memory, secure connections, crews, and Pass family QA checks. Works with Claude, ChatGPT, Cursor, and MCP-compatible agents.";
const defaultOgDescription =
  "Shared agent rails for tools, memory, connections, crews, and Pass family checks. Works with Claude, ChatGPT, Cursor, and MCP-compatible agents.";

export function useMetaTags({ title, description, ogTitle, ogDescription, ogUrl }: MetaTagsOptions) {
  useEffect(() => {
    document.title = title;

    if (ogTitle) {
      setMeta("og:title", ogTitle);
      setMeta("twitter:title", ogTitle);
    }
    if (ogDescription) {
      setMeta("og:description", ogDescription);
      setMeta("twitter:description", ogDescription);
    }
    if (ogUrl) {
      setMeta("og:url", ogUrl);
    }
    if (description) {
      setMeta("description", description);
    }

    return () => {
      // Restore every tag this hook can touch, so a page that sets only a
      // subset never inherits stale values from the previous page.
      document.title = defaultTitle;
      setMeta("og:title", defaultTitle);
      setMeta("twitter:title", defaultTitle);
      setMeta("og:description", defaultOgDescription);
      setMeta("twitter:description", defaultOgDescription);
      setMeta("description", defaultDescription);
      setMeta("og:url", "https://unclick.world/");
    };
  }, [title, description, ogTitle, ogDescription, ogUrl]);
}

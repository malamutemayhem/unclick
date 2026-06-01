// Registry of optional rich panels shown on an app's detail page (/apps/:slug),
// below the auto-generated info. Most apps need nothing here; an app with its own
// in-product experience (e.g. JobSmith, added in a later phase) registers a panel
// so clicking it in the library opens the app "as intended".
//
// Keyed by app slug. Phase 5 plugs JobSmith in here.

import type { ReactNode } from "react";

export type AppDetailExtra = () => ReactNode;

export const APP_DETAIL_EXTRAS: Record<string, AppDetailExtra> = {};

import type { StaticImageData } from "next/image";

import mark from "./brand/mark.png";
import favicon16 from "./favicon-16.png";
import favicon32 from "./favicon-32.png";
import favicon180 from "./favicon-180.png";
import ogImage from "./og-image.png";

/**
 * Brand assets for OpsBrain AI.
 *
 * `brand/mark.png` - brain icon used in navbar, footer, and SEO.
 * Full horizontal lockup (icon + “OpsBrain AI” wordmark) is rendered by
 * `Logo` in `src/components/ui/logo.tsx` using this mark + Plus Jakarta Sans.
 */
export const brandAssets = {
  mark,
  ogImage: ogImage.src,
  favicon: {
    icon16: favicon16.src,
    icon32: favicon32.src,
    icon180: favicon180.src,
    icon512: mark.src,
  },
} as const;

export type BrandMark = StaticImageData;

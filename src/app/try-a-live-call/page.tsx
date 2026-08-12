import { JsonLdScript } from "@/components/pages/JsonLdScript";
import { MarketingPageShell } from "@/components/pages/MarketingPageShell";
import { LiveCallAgentsGallery } from "@/components/sections/LiveCallAgentsGallery";
import { hubPages } from "@/content/seo-pages";
import {
  buildPageMetadata,
  getBreadcrumbJsonLd,
  getPageJsonLd,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: hubPages.tryLiveCall.title,
  description: hubPages.tryLiveCall.description,
  path: hubPages.tryLiveCall.path,
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Try a live call", path: hubPages.tryLiveCall.path },
];

const jsonLd = getPageJsonLd([getBreadcrumbJsonLd(breadcrumbs)]);

export default function TryALiveCallPage() {
  return (
    <>
      <JsonLdScript data={jsonLd} />
      <MarketingPageShell breadcrumbs={breadcrumbs}>
        <LiveCallAgentsGallery />
      </MarketingPageShell>
    </>
  );
}

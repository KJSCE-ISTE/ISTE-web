import Footer from "@/components/site/Footer";
import GalleryPage from "@/components/site/GalleryPage";
import Nav from "@/components/site/Nav";
import { getGallery } from "@/lib/data/content";

/**
 * The gallery page, shared by every palette route.
 *
 * Rendered by /gallery and by the same path under each palette folder, so
 * the palettes cannot drift apart from the canonical page.
 */
export default function SiteGallery() {
  return (
    <>
      <Nav />
      <main id="main">
        <GalleryPage items={getGallery()} />
      </main>
      <Footer />
    </>
  );
}

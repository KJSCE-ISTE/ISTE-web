import EventsArchive from "@/components/site/EventsArchive";
import Footer from "@/components/site/Footer";
import Nav from "@/components/site/Nav";
import { getEventsByTerm } from "@/lib/data/content";

/**
 * The events archive page, shared by every palette route.
 *
 * Rendered by /events and by the same path under each palette folder, so
 * the palettes cannot drift apart from the canonical page.
 */
export default function SiteEvents() {
  const terms = getEventsByTerm();
  const total = terms.reduce((sum, group) => sum + group.events.length, 0);

  return (
    <>
      <Nav />
      <main id="main">
        <EventsArchive terms={terms} total={total} />
      </main>
      <Footer />
    </>
  );
}

import About from "@/components/site/About";
import Contact from "@/components/site/Contact";
import Events from "@/components/site/Events";
import Footer from "@/components/site/Footer";
import Gallery from "@/components/site/Gallery";
import HexGrid from "@/components/fx/HexGrid";
import Hero from "@/components/site/Hero";
import Nav from "@/components/site/Nav";
import TeamTeaser from "@/components/site/TeamTeaser";
import {
  getCouncilContacts,
  getCurrentTerm,
  getDisplayedTeamTerm,
  getEvents,
  getGallery,
  getTeam,
  getTerms,
} from "@/lib/data/content";

/**
 * The homepage composition, shared by every palette route.
 *
 * `/`, `/aurora` and `/spectrum` all render exactly this. The palettes differ
 * only by the wrapper class their layout applies, so a colour comparison is a
 * genuine like-for-like — there is no second copy of the markup that could
 * drift from this one.
 */
export default function SiteHome() {
  const events = getEvents(3);
  const gallery = getGallery(9);

  const termNames = getTerms();
  const displayedTerm = termNames.includes(getCurrentTerm())
    ? getCurrentTerm()
    : getDisplayedTeamTerm();

  const roster = getTeam(displayedTerm);
  const core = roster.filter((m) => /^core/i.test(m.department)).slice(0, 3);

  // Headcount across every council, for the teaser's "and N students before
  // them" line. Cheap: these rows are already in memory per request.
  const totalMembers = termNames.reduce((sum, term) => sum + getTeam(term).length, 0);

  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        {/* Continuous hexagon field spanning from Events heading down to the end of Visuals without break */}
        <div className="relative overflow-hidden bg-canvas">
          <HexGrid className="opacity-70" />
          <Events events={events} showHexGrid={false} />
          <Gallery items={gallery} showHexGrid={false} />
        </div>
        <TeamTeaser
          core={core}
          term={displayedTerm}
          totalMembers={totalMembers}
          totalTerms={termNames.length}
        />
        <Contact contacts={getCouncilContacts()} />
      </main>
      <Footer />
    </>
  );
}

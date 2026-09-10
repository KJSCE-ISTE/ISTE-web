import Footer from "@/components/site/Footer";
import Nav from "@/components/site/Nav";
import TeamsPage from "@/components/site/TeamsPage";
import {
  getCurrentTerm,
  getDepartmentOrder,
  getDisplayedTeamTerm,
  getTeam,
  getTerms,
} from "@/lib/data/content";

/**
 * The council roster page, shared by every palette route.
 *
 * Rendered by /teams and by the same path under each palette folder, so
 * the palettes cannot drift apart from the canonical page.
 */
export default function SiteTeams() {
  const termNames = getTerms();
  const terms = termNames.map((term) => ({
    term,
    members: getTeam(term),
    departmentOrder: getDepartmentOrder(term),
  }));

  // After a handover `current_term` can point at a year with no published
  // roster yet, so open on whichever term is actually on screen.
  const openOn = termNames.includes(getCurrentTerm()) ? getCurrentTerm() : getDisplayedTeamTerm();

  return (
    <>
      <Nav />
      <main id="main">
        <TeamsPage terms={terms} currentTerm={openOn} />
      </main>
      <Footer />
    </>
  );
}

import SiteHome from "@/components/site/SiteHome";

/**
 * Homepage, on the original palette.
 *
 * The two candidate palettes live at /aurora and /spectrum. This route is
 * left unthemed so all three can be compared side by side; adopting a winner
 * is a one-line wrapper change here.
 */


export default function HomePage() {
  return <SiteHome />;
}

import type { Metadata } from "next";

import SiteTeams from "@/components/site/SiteTeams";

export const metadata: Metadata = {
  title: "The Council",
  description:
    "Every ISTE KJSSE council since 2020 — the students who have run the chapter, year by year.",
};


export default function Page() {
  return <SiteTeams />;
}

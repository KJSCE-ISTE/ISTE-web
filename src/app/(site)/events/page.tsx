import type { Metadata } from "next";

import SiteEvents from "@/components/site/SiteEvents";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Every event run by the ISTE KJSSE Students' Chapter — Prakalpa, ThinkSprint, Pixel Wars and more.",
};


export default function Page() {
  return <SiteEvents />;
}

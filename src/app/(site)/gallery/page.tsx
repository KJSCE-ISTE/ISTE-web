import type { Metadata } from "next";

import SiteGallery from "@/components/site/SiteGallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs and event posters from the ISTE KJSSE Students' Chapter — Prakalpa, Abhiyantriki, workshops and seminars.",
};


export default function Page() {
  return <SiteGallery />;
}

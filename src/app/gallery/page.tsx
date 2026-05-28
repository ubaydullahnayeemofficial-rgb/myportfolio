import type { Metadata } from "next";
import { buildMetadata, collectionPageSchema } from "@/lib/seo";
import { fetchYouTubeVideos } from "@/lib/youtube";
import { galleryImages } from "@/lib/data/gallery";
import { GalleryClient } from "./GalleryClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description:
    "Photographs and YouTube lectures of Hafiz Qari Ubaydullah Nayeem — straight from gatherings, the minbar, and quiet hours in Dhaka.",
  path: "/gallery",
});

export const revalidate = 3600;

export default async function GalleryPage(
  props: PageProps<"/gallery">,
) {
  const sp = (await props.searchParams) as Record<string, string | string[] | undefined>;
  const tabParam = typeof sp.tab === "string" ? sp.tab : undefined;
  const pageParam = typeof sp.page === "string" ? sp.page : undefined;

  const videos = await fetchYouTubeVideos();
  const initialTab: "images" | "videos" =
    tabParam === "videos" ? "videos" : "images";
  const initialPage = Math.max(1, parseInt(pageParam || "1", 10) || 1);

  return (
    <>
      <JsonLd
        data={collectionPageSchema({
          name: "Gallery — Ubaydullah Nayeem",
          description:
            "Photographs and YouTube lectures of Hafiz Qari Ubaydullah Nayeem.",
          path: "/gallery",
          numberOfItems: galleryImages.length + videos.length,
        })}
      />
      <Breadcrumbs items={[{ name: "Gallery", nameBn: "গ্যালারি", href: "/gallery" }]} />
      <GalleryClient
        videos={videos}
        images={galleryImages}
        initialTab={initialTab}
        initialPage={initialPage}
      />
    </>
  );
}

import type { MetadataRoute } from "next";
import { basePath, withBasePath } from "@/lib/site-config";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nxk Developer",
    short_name: "NXK",
    description:
      "Interactive portfolio of Nxk Developer — creative web experiences, projects and digital work.",
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    background_color: "#06060a",
    theme_color: "#06060a",
    icons: [
      { src: withBasePath("/icon.svg"), sizes: "any", type: "image/svg+xml" },
      { src: withBasePath("/apple-icon.png"), sizes: "180x180", type: "image/png" },
    ],
  };
}

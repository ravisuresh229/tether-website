import { MetadataRoute } from "next";

const baseUrl = "https://tetherhealth.co";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/security`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/legal`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];
}

/*
 * To add future static pages (e.g. /for-pcps, /for-specialists, /pricing):
 *
 *   { url: `${baseUrl}/for-pcps`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
 *   { url: `${baseUrl}/for-specialists`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
 *   { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
 */

/*
 * To add dynamic blog post URLs in the future:
 *
 * 1. Fetch posts from your data source (e.g. CMS, database, or static list)
 * 2. Map them to sitemap entries:
 *
 *   const posts = await getPosts(); // or: const posts = [...];
 *   const postEntries = posts.map((post) => ({
 *     url: `${baseUrl}/blog/${post.slug}`,
 *     lastModified: post.updatedAt ?? new Date(),
 *     changeFrequency: 'weekly' as const,
 *     priority: 0.6,
 *   }));
 * 3. Spread into the return array: return [...staticEntries, ...postEntries];
 */

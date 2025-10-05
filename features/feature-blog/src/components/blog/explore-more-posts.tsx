import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts } from '@/libs';

export const ExploreMorePosts = async ({
  slug,
  metadata,
  hasAuthors = false,
}: {
  slug: string
  metadata: BlogPostMetadata
  hasAuthors?: boolean
}) => {
  const allPosts = await getBlogPosts();
  const index = allPosts.findIndex((post) => post.slug === slug);
  const prevPost = index > 0 ? allPosts[index - 1] : null;
  const nextPost = index < allPosts.length - 1 ? allPosts[index + 1] : null;

  const relatedPosts = allPosts
    .filter(
      (post) =>
        post.slug !== slug &&
        post.metadata.tags?.some((tag) => metadata.tags?.includes(tag)),
    )
    .slice(0, 3);
  return (
    <section
      className={`  pt-12 ${
        hasAuthors ? '' : 'border-t border-gray-200 dark:border-gray-700 mt-20'
      }`}
    >
      <h2 className="text-2xl font-semibold mb-8 text-purple">
        More to Explore
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Previous */}
        {prevPost ? (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="group flex flex-col border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden hover:border-purple transition"
          >
            <div className="relative h-32 w-full">
              <Image
                src={`/og${prevPost.metadata.ogImage}`}
                alt={prevPost.metadata.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                ← Previous
              </span>
              <h3 className="font-semibold text-lg line-clamp-2 mb-1 text-purple group-hover:underline">
                {prevPost.metadata.title}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-2">
                {prevPost.metadata.excerpt}
              </p>
            </div>
          </Link>
        ) : (
          <div className="flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-lg p-6 text-gray-600 dark:text-gray-500 italic">
            No previous post
          </div>
        )}

        {/* Next */}
        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="group flex flex-col border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden hover:border-purple transition"
          >
            <div className="relative h-32 w-full">
              <Image
                src={`/og${nextPost.metadata.ogImage}`}
                alt={nextPost.metadata.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <span className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Next →
              </span>
              <h3 className="font-semibold text-lg line-clamp-2 mb-1 text-purple group-hover:underline">
                {nextPost.metadata.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {nextPost.metadata.excerpt}
              </p>
            </div>
          </Link>
        ) : (
          <div className="flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-lg p-6 dark:text-gray-500 text-gray-600 italic">
            No next post
          </div>
        )}
      </div>

      {/* Related */}
      {relatedPosts.length > 0 && (
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6">Related Posts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden hover:border-purple transition"
              >
                <div className="relative h-28 w-full">
                  <Image
                    src={`/og${post.metadata.ogImage}`}
                    alt={post.metadata.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-base line-clamp-2 mb-1 text-purple group-hover:underline">
                    {post.metadata.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-2">
                    {post.metadata.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back to Blog */}
      <div className="text-center mt-10">
        <Link
          href="/blog"
          className="inline-block px-6 py-3 bg-purple-600 text-white font-medium rounded-lg shadow-md hover:bg-purple-700 transition"
        >
          ← Back to Blog
        </Link>
      </div>
    </section>
  );
};

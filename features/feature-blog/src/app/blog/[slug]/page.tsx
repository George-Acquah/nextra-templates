import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import Link from 'next/link';
import Image from 'next/image';
import { getAuthors, getBlogPosts } from '@/libs';
import {
  ExploreMorePosts,
  ReadingProgress,
  ShareButtons,
  TableOfContents,
} from '@/components/blog';
import { getBlogPost } from '@/libs/post';
import { SITE_URL } from '@nextra-templates/constants';
import { getBreadcrumbSchema, getPageMetadata } from '@nextra-templates/utils';
import { Avatar } from '@/components/ui';
import { getArticleSchema, getFaqSchema } from '@/utils';

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const blogPosts = await getBlogPosts();
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = await getBlogPost(slug);

  if (!metadata) {
    return {
      title: 'Post Not Found',
      robots: { index: false, follow: false },
    };
  }

  return getPageMetadata({
    title: metadata.title,
    description: metadata.description,
    slug: `blog/${slug}`,
    tags: metadata.tags,
    ogImage: metadata.ogImage,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { metadata, component: MDXContent } = await getBlogPost(slug);

  if (!metadata?.title) return notFound();

  let authorsForPost: AuthorData[] = [];

  if (metadata.authorSlugs && metadata.authorSlugs?.length > 0) {
    const allAuthors = getAuthors();

    authorsForPost = allAuthors.filter((author) =>
      metadata.authorSlugs?.includes(author.slug),
    );
  }
  const schemas: SchemaObject[] = [
    getArticleSchema({ metadata, slug, authors: authorsForPost }),
    getBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Blog', url: `${SITE_URL}/blog` },
      { name: metadata.title, url: `${SITE_URL}/blog/${slug}` },
    ]),
  ];
  if (metadata.faqs?.length) {
    schemas.push(getFaqSchema(metadata.faqs, 'blog', 'blogPost'));
  }

  // Share helpers
  const shareUrl = metadata.canonicalUrl ?? `${SITE_URL}/blog/${slug}`;
  const shareTitle = metadata.title;

  return (
    <>
      <ReadingProgress />

      <div className="self-start max-w-7xl px-4 pb-12 grid grid-cols-1 md:grid-cols-[16rem_minmax(0,1fr)] gap-8">
        <aside className="sticky top-24 self-start h-fit">
          <TableOfContents />
          <div className="hidden md:block p-4 mt-8 bg-[var(--code-bg)] rounded-lg">
            <h4 className="text-sm font-semibold text-purple-300 mb-3">
              Share this article
            </h4>
            <ShareButtons url={shareUrl} title={shareTitle} />
          </div>
        </aside>

        <main className="">
          <div className="max-w-2xl">
            <article className="prose prose-invert max-w-none">
              {/* Title */}
              <header className="mb-6">
                <h1 className="text-4xl font-bold mb-2">{metadata.title}</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {metadata.description}
                </p>

                <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-400">
                  <time dateTime={metadata.date}>
                    {new Date(metadata.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {metadata.updatedDate && (
                    <>
                      <span>·</span>
                      <time dateTime={metadata.updatedDate}>
                        Updated{' '}
                        {new Date(metadata.updatedDate).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          },
                        )}
                      </time>
                    </>
                  )}
                  <span>·</span>
                  <span>{Math.ceil(metadata.readingTime)} min read</span>
                </div>

                {/* Tags */}
                {metadata.tags?.length > 0 && (
                  <ul className="flex flex-wrap gap-2 mt-4">
                    {metadata.tags.map((tag) => (
                      <li key={tag}>
                        <Link
                          href={`?tag=${encodeURIComponent(tag)}`}
                          className="px-3 py-1 text-xs rounded-full bg-gray-200 dark:bg-[#1f2336] text-purple hover:bg-purple-700/20 dark:hover:bg-purple-700/40 transition-all duration-200"
                        >
                          #{tag}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </header>

              {/* Cover image (prefer metadata.image then ogImage) */}
              {(metadata.image || metadata.ogImage) && (
                <div className="mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={metadata.image ?? `/og${metadata.ogImage}`}
                    alt={metadata.title}
                    width={1200}
                    height={630}
                    className="w-full h-auto object-cover rounded-lg"
                    priority={true}
                  />
                </div>
              )}

              {/* Content */}
              <section id="article-body">
                <MDXContent />
              </section>

              {/* Share Buttons (client) */}
              <div className="mt-12 md:mt-0 md:hidden">
                <ShareButtons url={shareUrl} title={shareTitle} />
              </div>

              {/* Author box */}
              {authorsForPost.length > 0 && (
                <div className="mt-16 space-y-6">
                  {authorsForPost.map((author) => (
                    <div
                      key={author.slug}
                      className="p-8 border-t border-b border-gray-200 dark:border-gray-700 md:flex md:gap-8"
                    >
                      {/* Author Avatar */}
                      <div className="flex-shrink-0 mb-6 md:mb-0">
                        <Avatar
                          imageUrl={author?.avatar}
                          size={96}
                          name={author.name}
                          // className="rounded-full border-2 border-gray-300 dark:border-gray-600"
                        />
                      </div>

                      {/* Author Details */}
                      <div className="md:flex-1">
                        <p className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          {author.name}
                        </p>

                        {/* Combined Bio and Social Links */}
                        <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xl">
                          {author.bio ? (
                            author.bio
                          ) : (
                            <>
                              Full-stack developer — writing about React,
                              Next.js and web performance.
                            </>
                          )}

                          {/* Social links are added seamlessly after the bio */}
                          {author?.social &&
                            Object.entries(author.social || {}).length > 0 && (
                              <>
                                {' '}
                                If you’re of the social persuasion, you can
                                follow them on{' '}
                                {/* Maps over social links to render them inline */}
                                {Object.entries(author.social).map(
                                  ([platform, url], index, array) => (
                                    <span key={platform}>
                                      <a
                                        href={url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                                      >
                                        {platform.charAt(0).toUpperCase() +
                                          platform.slice(1)}
                                      </a>
                                      {/* Adds commas and "or" for proper grammar */}
                                      {index < array.length - 2 && ', '}
                                      {index === array.length - 2 &&
                                        array.length > 1 &&
                                        ' or '}
                                    </span>
                                  ),
                                )}
                                .
                              </>
                            )}
                        </p>

                        <Link
                          href={`/blog/author/${author.slug}`}
                          className="mt-4 inline-block font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                        >
                          View all posts by {author.name} &rarr;
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>
            {/* --- More to Explore (Prev/Next + Related) --- */}
            <ExploreMorePosts
              slug={slug}
              metadata={metadata}
              hasAuthors={!!authorsForPost.length}
            />

            {schemas.map((schema, i) => (
              <Script
                id={schema.id}
                key={i}
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(schema.content),
                }}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

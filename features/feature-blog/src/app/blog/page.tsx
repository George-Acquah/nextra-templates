import Blogs from '@/components/blog/blog-grid';
import { getBlogPosts, getAuthors } from '@/libs';
import { getBlogSchema, paginate } from '@/utils';
import { OWNER_NAME, SITE_URL } from '@nextra-templates/constants';
import { getBreadcrumbSchema, getPageMetadata } from '@nextra-templates/utils';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';

type Props = {
  searchParams: Promise<{
    tag?: string
    query?: string
    currentPage?: string
    pageSize?: string
  }>
}

export const generateMetadata = (): Metadata =>
  getPageMetadata({
    title: `Blog | ${OWNER_NAME}`,
    description: `Articles, tutorials, and insights on full-stack development, React, Next.js, and more by ${OWNER_NAME}`,
    slug: 'blog',
    //You can add some tags here
    tags: ['React articles', 'Next.js blog'],
    ogImage: '/favicon.ico',
  });

export default async function BlogsPage({ searchParams }: Props) {
  const { tag, query, currentPage = '1', pageSize = '5' } = await searchParams;
  const authors = getAuthors();
  const author = authors.find((a) => a.slug === 'author-slug');
  if (!author) {
    notFound();
  }
  const schemas = [
    getBlogSchema(),
    getBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Blog', url: `${SITE_URL}/blog` },
    ]),
  ];

  const allPosts = await getBlogPosts();

  // You can do this filtering at the getBlogPosts, getAuthors level
  // Filter by tag (case-insensitive)
  const normalizedTag = tag?.toLowerCase();
  let filteredPosts = normalizedTag
    ? allPosts.filter((post) =>
        post.metadata.tags?.some((t) => t.toLowerCase() === normalizedTag),
      )
    : allPosts;

  // Filter by search query
  if (query) {
    const q = query.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.metadata.title.toLowerCase().includes(q) ||
        post.metadata.description.toLowerCase().includes(q) ||
        post.metadata.excerpt.toLowerCase().includes(q),
    );
  }

  // Paginate filtered results
  const paginated = paginate(
    filteredPosts,
    parseInt(currentPage, 10),
    parseInt(pageSize, 10),
  );
  return (
    <>
      <Blogs paginated={paginated} author={author} />

      {schemas.map((schema, i) => (
        <Script
          id={schema.id}
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.content) }}
        />
      ))}
    </>
  );
}

import Blogs from '@/components/blog/blog-grid';
import { getAuthors, getAuthorPosts } from '@/libs';
import { getBlogSchema, paginate } from '@/utils';
import { SITE_URL } from '@nextra-templates/constants';
import { getBreadcrumbSchema, getPageMetadata } from '@nextra-templates/utils';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';

type Props = {
  searchParams: Promise<SearchParams>;
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  const authors = getAuthors();
  return authors.map((author) => ({ slug: author.slug }));
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;

  const authors = getAuthors();
  const author = authors.find((a) => a.slug === slug);
  if (!author) {
    return {
      title: 'Author Not Found',
      robots: { index: false, follow: false },
    };
  }

  return getPageMetadata({
    title: `Blogs by ${author.name}`,
    description: author.bio,
    slug: `blog/author/${slug}`,
    tags: [author.name, 'Author', 'Blog'],
    ogImage: author.avatar || 'favicon.ico',
  });
};

export default async function AuthorPage({ searchParams, params }: Props) {
  const [param, searchParam] = await Promise.all([params, searchParams]);
  const { slug } = param;
  const { tag, query, currentPage = '1', pageSize = '10' } = searchParam;

  // Get author and their posts
  const authors = getAuthors();
  const author = authors.find((a) => a.slug === slug);
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
  const allPosts = await getAuthorPosts(slug);

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
    <div className="self-start px-4 pb-12 w-full">
      <div className="mb-12 self-start text-start">
        <h1 className="text-4xl font-bold mb-2">Posts by {author.name}</h1>
        <p className="text-gray-600 dark:text-gray-400">{author.bio}</p>
      </div>

      <Blogs paginated={paginated} author={author} />

      {schemas.map((schema, i) => (
        <Script
          id={schema.id}
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.content) }}
        />
      ))}
    </div>
  );
}

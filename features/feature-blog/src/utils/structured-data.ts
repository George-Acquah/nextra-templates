import { OWNER_NAME, SITE_URL } from '@nextra-templates/constants';

export function getFaqSchema(
  faqs: { question: string; answer: string }[],
  url: string,
  type: string,
  slug?: string,
) {
  return {
    id: slug
      ? `${SITE_URL}/${url}/${slug}#${type}-faq`
      : `${SITE_URL}/${url}/#${type}-faq`,
    content: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  };
}

export function getBlogSchema() {
  return {
    id: `${SITE_URL}/blog#blog`,
    content: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      headline: `${OWNER_NAME} Blog`,
      description: `Articles, tutorials, and insights on full-stack development, React, Next.js, and more by ${OWNER_NAME}.`,
      url: `${SITE_URL}/blog`,
      publisher: { '@type': 'Person', name: OWNER_NAME, url: SITE_URL },
    },
  };
}

export function getArticleSchema({
  metadata,
  slug,
  authors,
}: {
  metadata: BlogPostMetadata
  slug: string
  authors: AuthorData[]
}) {
  const absoluteImage = metadata.ogImage.startsWith('http')
    ? metadata.ogImage
    : `${SITE_URL}${metadata.ogImage}`;

  const shareUrl = `${SITE_URL}/blog/${slug}`;

  return {
    id: `${SITE_URL}/blog/{slug}#article`,
    content: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: metadata.title,
      description: metadata.description,
      image: absoluteImage,
      author: authors?.map((author) => ({
        '@type': 'Person',
        name: author.name,
        url:
          author.social?.twitter ??
          author.social?.github ??
          author.social?.linkedin ??
          SITE_URL,
        sameAs: [
          author.social?.twitter,
          author.social?.github,
          author.social?.linkedin,
        ].filter(Boolean),
      })),
      publisher: {
        '@type': 'Organization',
        name: `${OWNER_NAME} Portfolio`,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.png`,
        },
      },
      datePublished: metadata.date,
      dateModified: metadata.updatedDate ?? metadata.date,
      wordCount: metadata.wordCount ?? undefined,
      keywords: metadata.tags?.join(', ') ?? undefined,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': metadata.canonicalUrl ?? shareUrl,
      },
    },
  };
}

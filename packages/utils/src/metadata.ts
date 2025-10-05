import type { Metadata } from 'next';
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from '@nextra-templates/constants';

export function getBaseMetadata(): Partial<Metadata> {
  return {
    metadataBase: new URL(SITE_URL),
    openGraph: {
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 742,
          alt: `${SITE_NAME} Preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@GAcquah3',
      images: [DEFAULT_OG_IMAGE],
    },
    robots: { index: true, follow: true },
  };
}

export function getPageMetadata({
  title,
  description,
  slug,
  tags,
  ogImage,
}: {
  title: string
  description: string
  slug?: string
  tags?: string[]
  ogImage?: string
}): Metadata {
  const base = getBaseMetadata();

  const url = slug ? `${SITE_URL}/${slug}` : SITE_URL;
  const imageUrl = ogImage?.startsWith('http')
    ? ogImage
    : `${SITE_URL}/og${ogImage || '/og-image.webp'}`;

  return {
    ...base,
    title,
    description,
    keywords: tags,
    openGraph: {
      ...base.openGraph,
      title,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 742,
          alt: `${title} Preview`,
        },
      ],
    },
    twitter: {
      ...base.twitter,
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

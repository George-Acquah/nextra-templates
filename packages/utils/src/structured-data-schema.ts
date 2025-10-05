// utils/schema.ts
import { OWNER_JOB, OWNER_NAME, SITE_URL } from '@nextra-templates/constants';

type BreadcrumbItem = { name: string; url: string }

export function getPersonSchema() {
  return {
    id: `${SITE_URL}#person`,
    content: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: OWNER_NAME,
      url: SITE_URL,
      sameAs: [
        'https://github.com/<Your username>',
        'https://www.linkedin.com/in/<Your linkedin id>',
        //Add any more socials here
      ],
      jobTitle: OWNER_JOB,
      worksFor: {
        '@type': 'Organization',
        name: 'Freelance / Open Source',
      },
    },
  };
}
export function getWebsiteSchema() {
  return {
    id: `${SITE_URL}#website`,
    content: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: OWNER_NAME,
      url: SITE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  };
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    id: `${SITE_URL}#breadcrumb`,
    content: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    },
  };
}

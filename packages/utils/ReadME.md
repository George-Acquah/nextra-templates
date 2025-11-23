# @nextra-templates/utils

This package provides class name merging, text transformation, metadata generation, and structured data schema builders.

## Features

- Class Name Merging — Safely merge and deduplicate class names with Tailwind CSS support
- Text Transformation — Convert text to URL-friendly slugs
- Metadata Helpers — Generate SEO-optimized metadata for pages
- Structured Data Schemas — Build Schema.org JSON-LD for rich search results


## Installation

This package is intended to be consumed inside the monorepo, but if installed independently it works like any other workspace dependency.

```bash
pnpm add @nextra-templates/utils
```
Use this for yarn


```bash
npm install @nextra-templates/utils
```
Use this for Npm

## Class Name Helper - cn(...inputs)
This class name helper merges class names in a safe and predictable way using clsx and tailwind-smart-merge. This prevents conflicting Tailwind classes and simplifies conditional styling.

Example:

```bash
import { cn } from '@nextra-templates/utils';

const buttonClass = cn(
  'px-4 py-2 rounded',
  isActive && 'bg-blue-600 text-white',
  disabled && 'opacity-50 cursor-not-allowed'
);
```

## Text Transformation: slugify(text)
This transforms a string into a clean URL-friendly slug.
It lowercases text, trims spaces, replaces punctuation, and removes unsupported characters.
Example:
```bash
import { slugify } from '@nextra-templates/utils';

slugify('Hello World!'); 
// it returns: "hello-world"
```

## Metadata Helpers

These helpers simplify creating metadata objects for Next.js pages. They rely on shared constants from @nextra-templates/constants. Example of these metadata helpers are:

##getBaseMetadata()

Returns default metadata for the site, including Open Graph data, preview images, Twitter metadata, and canonical URLs.

```bash
import { getBaseMetadata } from '@nextra-templates/utils';

const metadata = getBaseMetadata();
// Returns base metadata configuration
```

## getPageMetadata(options)
Builds a complete metadata object for a specific page. It merges the default metadata with page-specific fields like title, description, keywords, canonical URL, and social images.

## Parameters:

- title (string) — Page title
- description (string) — Page description
- slug (string) — Page URL slug
- tags (string[]) — SEO keywords/tags
- ogImage (string, optional) — Open Graph image URL

```bash
import { getPageMetadata } from '@nextra-templates/utils';

export const metadata = getPageMetadata({
  title: 'Documentation',
  description: 'A guide to using the template',
  slug: 'docs',
  tags: ['docs', 'guide'],
  ogImage: 'https://example.com/og-image.png'
});
```

## Structured Data Schema Helpers
These functions generate structured data in the Schema.org format. They can be included in metadata or injected into pages as JSON-LD.

## getPersonSchema()
Defines schema data representing the site owner as a person, including name, job title, social profiles, and organization information.

```bash
import { getPersonSchema } from '@nextra-templates/utils';

const personSchema = getPersonSchema();
```

## getWebsiteSchema()
Creates schema data for the website including basic site information and search actions.
```bash
import { getWebsiteSchema } from '@nextra-templates/utils';

const websiteSchema = getWebsiteSchema();
```

## getBreadcrumbSchema(items)

Creates a BreadcrumbList schema from an array of navigation items, each with a name and URL.
```bash
import { getBreadcrumbSchema } from '@nextra-templates/utils';

const breadcrumbs = getBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Docs', url: '/docs' },
]);
```

## Imports
```bash
Import helpers directly from the package root:
import {
  cn,
  slugify,
  getBaseMetadata,
  getPageMetadata,
  getPersonSchema,
  getWebsiteSchema,
  getBreadcrumbSchema
} from '@nextra-templates/utils';
```
Internal modules are also available for more granular imports
```bash
import { cn } from '@nextra-templates/utils/classes';
import { getBaseMetadata } from '@nextra-templates/utils/metadata';
import { getPersonSchema } from '@nextra-templates/utils/structured-data-schema';
```
## Internal Modules

- ./classes — Class name utilities and type definitions
- ./metadata — Metadata generation and helpers
- ./structured-data-schema — Schema.org builder functions

## Contributing
When adding new utilities to this package, ensure they:

1. Have clear, concise documentation
2. Include TypeScript types
3. Have accompanying examples
4. Are re-exported from the package root
5. Are tested before merging




 
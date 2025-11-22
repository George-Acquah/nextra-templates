This package provides global constants shared across the Nextra Templates ecosystem.  
These constants ensure that metadata, structured data, social previews, and site configuration remain consistent across packages such as `@nextra-templates/utils` and `@nextra-templates/ui`.

---
## Overview

The constants exported from this package define:

- Base site information
- Open Graph defaults
- Default metadata values
- Owner / author information

These values are often used when generating metadata, SEO configurations, and structured data.

## Installation

This package is primarily used inside the monorepo but can be installed independently:

```bash
pnpm add @nextra-templates/constants
OR 
npm install @nextra-templates/constants
```

## Available Constants

Below is a detailed explanation of each constant exported by the package
## SITE_URL
The base URL of your site. Used for generating canonical URLs, social sharing links, and constructing absolute URLs throughout the application.

- Type: string
- Default: 'http://localhost:3000'

Example:
```bash
export const SITE_URL = 'http://localhost:3000';
```
## SITE_NAME
The official name of your website. Used in page titles, Open Graph metadata, and branding across the site.
- Type: string
- Default: 'Name of Site'

Example:
```bash
 export const SITE_NAME = 'Name of Site';
 ```

## DEFAULT_OG_IMAGE
Default Open Graph image URL used for social media sharing when a page-specific image isn't provided. Typically points to your site logo or a branded image.

- Type: string
- Constructed from: ${SITE_URL}/favicon

Example:
```bash
export const DEFAULT_OG_IMAGE = `${SITE_URL}/favicon`;
  // Resolves to: 'http://localhost:3000/favicon'
```
## Owner Information
Details about the site owner or author:
```bash
import { OWNER_NAME, OWNER_JOB } from '@nextra-templates/constants';
```

## OWNER_NAME
The name of the site owner or primary author. Used in author metadata, schema markup, and footer information.

- Type: string
- Default: 'Owner Name'

Example:
```bash
export const OWNER_NAME = 'Owner Name';
```

## OWNER_JOB
The job title or professional role of the site owner. Used in author schema markup and about sections.

- Type: string
- Default: 'Owner Job'

Example:
```bash
export const OWNER_JOB = 'Owner Job';
```

## Usage Examples: A. Using in Metadata
```bash
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from '@nextra-templates/constants';

export const metadata = {
  title: SITE_NAME,
  description: 'Welcome to my site',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: SITE_NAME,
    image: DEFAULT_OG_IMAGE
  },
  twitter: {
    card: 'summary_large_image',
    image: DEFAULT_OG_IMAGE
  }
};
```

## Usage Examples: B. Using in Schema Markup
```bash
import { OWNER_NAME, OWNER_JOB, SITE_NAME } from '@nextra-templates/constants';

export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: OWNER_NAME,
    jobTitle: OWNER_JOB,
    worksFor: {
      '@type': 'Organization',
      name: SITE_NAME
    }
  };
}
```

## Usage Examples: C. Using in  Components
```bash
import { SITE_NAME, OWNER_NAME } from '@nextra-templates/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer>
      <p>© {currentYear} {SITE_NAME}. All rights reserved.</p>
      <p>Created by {OWNER_NAME}</p>
    </footer>
  );
}
```

## Usage Examples: D. Using in Canonical URLs
```bash
import { SITE_URL } from '@nextra-templates/constants';

export function getCanonicalUrl(slug) {
  return `${SITE_URL}/${slug}`;
  // Example: 'http://localhost:3000/docs/getting-started'
}
```
## Imports
All constants can be imported from the root of the package::
```bash
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  OWNER_NAME,
  OWNER_JOB
} from '@nextra-templates/constants';
```

## Best Practices
- Keep it DRY — Use constants instead of hardcoded values throughout your application
- Compose constants — Build complex values from simpler constants (like DEFAULT_OG_IMAGE from SITE_URL)
- Document purpose — Add comments explaining why each constant exists
- Use environment variables — For deployment-specific values
- Update in one place — Changes automatically propagate throughout the monorepo
- TypeScript support — Leverage type safety with TypeScript

## Adding New Constants
When adding new constants to this package:

- Define the constant in src/index.ts
- Add JSDoc comments explaining its purpose and usage
- Include the type annotation
- Update this README with the new constant

## Integration with Other Packages
With @nextra-templates/utils
Constants are used by utility functions to generate metadata:
```bash
import { getBaseMetadata } from '@nextra-templates/utils';
import { SITE_NAME, DEFAULT_OG_IMAGE } from '@nextra-templates/constants';
// Base metadata uses constants for defaults
const baseMetadata = getBaseMetadata();
```

## With @nextra-templates/ui
Constants can be used to style components consistently:

```bash
import { Container } from '@nextra-templates/ui';
import { SITE_NAME } from '@nextra-templates/constants';

export function Header() {
  return (
    <Container>
      <h1>{SITE_NAME}</h1>
    </Container>
  );
}
```

## TypeScript
All constants are fully typed and provide IDE autocomplete:

```bash
const siteUrl: string = SITE_URL;
const siteName: string = SITE_NAME;
const ownerName: string = OWNER_NAME;
```
## Contributing
When modifying constants:

1. Update the constant value in src/index.ts
2. Add or update JSDoc comments
3. Update examples in this README if the usage pattern changed
4. Test that dependent packages work correctly with the updated constants
5. Run npm run build or yarn run build to ensure TypeScript compilation succeeds

## Project Structure

constants/
├── src/
│   └── index.ts          # All exported constants
├── tsconfig.json         # TypeScript configuration
├── package.json          # Package metadata
├── README.md             # This file
└── dist/                 # Compiled output (generated)
## Quick Reference
| Constant | Type | Purpose |
| :------ | :---------: | -----: |
| SITE_URL | String |Base URL for canonical links and routing|
| SITE_NAME | String | Official site name for branding |
| DEFAULT_OG_IMAGE | String | Social sharing image |
| OWNER_NAME | String | Site owner/author name |
| OWNER_JOB | String | Site owner's job title |


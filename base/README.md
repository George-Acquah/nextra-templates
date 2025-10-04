# Nextra Base Template

This is the **base project template** for Nextra.
It provides a clean, industry-standard structure for Next.js applications, ready to extend with features such as **blog, themes,** or other modules.

The goal is to give you a **production-ready starting point** that balances simplicity and scalability.
---

## Getting Started
1. Install dependencies

```bash
pnpm install
```
2. Run the development server

```bash
pnpm dev
```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## File Structure
```ts
src
 ┣ app/          → Next.js app directory (routes, layouts, entry points)
 ┣ components/   → Reusable UI components
 ┣ providers/    → React context providers (global state, wrappers)
 ┣ context/      → React context definitions
 ┣ hooks/        → Custom React hooks
 ┣ lib/          → Core libraries (API clients, DB, configs, external wrappers)
 ┣ utils/        → Small framework-agnostic helper functions
 ┣ data/         → Static or mock data, content-like configs
 ┣ styles/       → Global CSS, Tailwind config, theme styles
 ┣ types/        → TypeScript types and global definitions
 ┗ assets/       → Local assets (icons, images, fonts) not in /public
 ```
---

`app/`
The **Next.js App Router** folder.
- Contains your routes (`page.tsx`), layouts, and metadata.
- Uses file-system based routing.
- Example: `src/app/page.tsx` = `/` route.
  
---

`components/`
Reusable UI building blocks.
- Split into subfolders if needed (`/ui, /layout, /forms`).
- Should remain `presentation-focused.`
- Example: `button.tsx`, `navbar.tsx`.

---
`providers/`
Global providers that wrap your application.
- Each provider should live in its own folder.
- Example: `ThemeProvider`, `AuthProvider`.
- They are wired together in `providers.tsx` and used in `app/layout.tsx`.

---
`context/`
Contains the actual `React.createContext` definitions.
- Keeps provider logic (`providers/`) separate from context creation.
- Example: `AuthContext.ts`.

---
`hooks/`
Custom React hooks.
- Encapsulate reusable logic (`useAuth`, `useTheme`, `useClickOutside`).
- Only React-related state/effects go here (pure helpers should be in `utils/`).

---
`lib/`
Core integrations and external services.
- API clients (REST, GraphQL, TRPC).
- Database clients (Prisma, Drizzle).
- Authentication configuration.
- Analytics setup.
- Should contain `system-level logic`.

---
`utils/`
Small, pure helper functions.
- Framework-agnostic and easily testable.
- Examples: `format-date.ts`, `slugify.ts`, `classes.ts`.

---
`data/`
Static or mock data used in the app.
- Navigation links.
- Feature flags.
- Local JSON or TS objects representing mock API responses.

---
`styles/`
Application-wide styles.
- `globals.css` for base styles.
- Tailwind or other design tokens.
- Feature-specific styles can also live here.

---
`types/`
Centralized TypeScript types.
- API response types.
- DTOs (Data Transfer Objects).
- Global type definitions (`global.d.ts`).

---
`assets/`
Local images, SVGs, icons, or fonts.
- Use this if you want to import assets directly via bundling (instead of placing them in /public).
--- 

## Index Files

Each directory has an `index.ts` file that re-exports modules.
This makes imports shorter and more consistent. For example:

Instead of:
```ts
import { useAuth } from "@/hooks/useAuth";
```

You can do:
```ts
import { useAuth } from "@/hooks";
```
Every `index.ts` also contains a comment at the top describing what belongs in that folder, so developers know how to contribute correctly

---
## Extending the Base
This template is designed to be extended with features (like Blog or Theme).
- Each feature provides its own README explaining what it adds.
- When you generate a project with features, all relevant READMEs are merged into the final project README.

---

## Scripts
- `export-template.ts` → Prepares templates for distribution.
- `generate-readmes.ts` → Combines the base README with selected features into the final project README.

---

## Conventions
- **Absolute imports:** Use `@/` for root imports (`@/hooks`, `@/components`).
- **Consistency:** Shared logic goes in `lib` or `utils` instead of being duplicated.
- **Providers orchestration:** Only `providers.tsx` is imported in `layout.tsx`.

---

## Next Steps
- Add your own components inside `components/`.
- Extend providers in `providers/` as you integrate new services.
- Add custom hooks to `hooks/` for app-wide logic.
- Keep shared logic inside `lib` and `utils`.

This README serves as a **guidebook** for working in this codebase.
New developers should read through it first before contributing.
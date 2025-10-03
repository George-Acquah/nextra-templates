# Nextra Templates

A modular template system for building modern web apps with **Next.js 15**, **Tailwind CSS v4**, and a flexible feature-based architecture.  

The project is designed to let you scaffold a base template and selectively add features (e.g., blog, docs, themes) while maintaining clean structure and consistency.  

---

## Project Structure

```bash
nextra-templates/
├── styles/                 # Shared root styles (used across all templates/features)
│   └── root.css
│
├── packages/                # Shared packages
│   └── ui/                  # Reusable UI components (buttons, forms, layouts, etc.)
│
├── templates/               # All template definitions
│   ├── base/                # The core base template
│   │   ├── src/
│   │   │   ├── app/         # Next.js app directory
│   │   │   ├── components/  # Base components
│   │   │   ├── context/     # React contexts
│   │   │   ├── hooks/       # Custom hooks
│   │   │   ├── lib/         # Library helpers
│   │   │   ├── providers/   # Provider wrappers
│   │   │   ├── styles/      # Base styles (globals.css imports root.css)
│   │   │   └── utils/       # Utility functions
│   │   └── postcss.config.mjs
│   │
│   ├── portfolio/           # Portfolio template
│   ├── blog/                # Blog template
│   └── ...                  # More templates
│
├── features/                # Optional feature modules
│   ├── feature-theme/       # Theming support
│   └── feature-auth/        # Authentication support
│
├── docs/                    # Documentation
│   ├── CONTRIBUTING.md 
│   └── README.md            # This file
└── package.json             # For managing workspace packages               
```
---

## Styling Approach

- **`styles/root.css`** → global design tokens, colors, typography, etc. (single source of truth).  
- **Base template** (`globals.css`) imports `root.css`.  
- **Features** define their own `<feature>.css` and import `root.css` at the top for consistency.  
- During final merge:
  - All feature CSS files are copied into `/styles`.
  - Base `globals.css` is replaced with merged `root.css` + feature imports.

---

## Shared UI

- `packages/ui/` holds **reusable components** shared across templates and features (buttons, inputs, modals, etc.).  
- Features should never redefine the same UI component. Instead, extend or import from `packages/ui/`.

---

## Development

1. Clone the repo  
```bash
git clone https://github.com/George-Acquah/nextra-templates.git
cd nextra-templates
```
2. Install dependencies
```bash
pnpm install
```
3. Run a template
```bash
# Run the base template
pnpm dev

# Run a specific template (example: blog)
pnpm dev:blog
```

---

## Features & Merging
- Each feature lives in its own folder under templates/.
- Features include only the files they need (app/, components/, styles/, etc.).
- During generation, selected features are merged into the base template:
    - Shared files like providers.tsx are combined.
    - Feature styles are imported in final globals.css.
    - Feature-specific routes/components are copied over.
    - Dependencies are updated in package.json.
  
---

## Contributing
Want to add features or improve the base? See [CONTRIBUTING.md](./CONTRIBUTING.md)

---

This README serves as a **guidebook** for working in this codebase.
New developers should read through it first before contributing.
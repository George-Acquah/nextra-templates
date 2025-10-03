# Contributing to Nextra Templates

Thank you for your interest in contributing!
This project is designed to be **modular, extensible, and community-driven**.  
We welcome contributions in the form of **bug fixes, new features, new templates, documentation improvements, or tooling enhancements**.

---

## How to Contribute

### 1. Fork the Repository

Start by forking the project into your own GitHub account.

```bash
git clone https://github.com/<your-username>/nextra-templates.git
cd nextra-templates
pnpm install
```

---

### 2. Create a Branch

Follow a consistent naming convention for your branch:
```bash
# Feature branch
git checkout -b feature/add-auth

# Bug fix branch
git checkout -b fix/fix-postcss-path
```

---

### 3. Run the Project Locally

You can run templates or features directly during development:
```bash
# Run the base template
pnpm dev

# Run a specific template (example: blog)
pnpm dev:blog
```
- Shared UI components live in `packages/ui/`.
- Shared styles live in `styles/root.css`.
- Features live in `features/feature-*`.

Make sure your feature or fix works in at least the **base template** before submitting a PR.

---

### 4. Coding Standards
- **File structure** should follow the conventions in README.md
- **Naming:**
  - Features: `features/feature-name`
  - Templates: `templates/template-name`
- **Index files:**
  - Each folder (`components/`, `hooks/`, etc.) should have an `index.ts` with comments explaining what can be exported.
- **Styling:**
  - Use Tailwind CSS v4.
  - Add shared tokens, colors, and utilities only in `styles/root.css`.
  - Each feature has its own `<feature>.css`, which imports `root.css` first.
- **Providers:**
  - All providers should be registered in `src/providers/`.
  - If a feature adds providers, extend the central `index.ts` in `src/providers/` instead of creating duplicates.

---

### 5. Write or Update Documentation
- If you add a **new feature** → include a `README.md` inside the feature folder explaining what it does.
- If you add a **new template** → document its purpose and structure.
- If you change **shared logic** (like `ui/` or `root.css`) → update the main docs in `/docs`.

---

### 6. Commit Guidelines
We use conventional commits to keep history clean:
- `feat:` → for new features
- `fix:` → for bug fixes
- `docs:` → for documentation changes
- `chore:` → for tooling/config
- `refactor:` → for code structure changes

Example:
```bash
git commit -m "feat(auth): add login provider and context"
```

---

### 7. Push and Open a Pull Request
Push your branch and open a PR against `main`:
```bash
git push origin feature/add-auth
```

When opening your PR:
- Explain what you changed and why.
- If applicable, mention which template/feature it affects.
- Add screenshots if your change impacts UI.

---

## Adding a New Feature
1. Create a folder in /features/feature-name.
2. Structure it like this:
```bash
feature-name/
├── app/              # Routes specific to this feature
├── components/       # Feature-specific UI
├── styles/           # <feature>.css (must import root.css first)
├── providers/        # Any feature providers
└── README.md         # Documentation for this feature
```
3. Update `index.ts` inside `providers/`, `package.json`, or `globals.css` in base only if necessary.
4. Add tests or examples in the template that consumes it.

---

## Adding a New Template
1. Create a folder in `/templates/template-name`.
2. Follow the structure from `base`.
3. Use `packages/ui/` for shared UI, and `styles/root.css` for shared styles.
4. Add a `README.md` in the template folder explaining its purpose.

---

## Pull Request Review Process
- A maintainer will review your PR.
- Requested changes must be addressed before merging.
- CI must pass (linting, formatting, and build).
- Once approved, your PR will be merged into `main`.

---

## Code of Conduct

By contributing, you agree to uphold the community’s values of **respect**, **collaboration**, and **inclusivity**.
Discrimination, harassment, or abusive behavior will not be tolerated.

---

## Tips for New Contributors
- Start small — fix a typo, improve docs, or add a helper function.
- Look at existing features/templates for patterns before adding new ones.
- Join discussions on issues before implementing large changes.

---

Thank you for contributing to **Nextra Templates!**
Together, we’re building a flexible and powerful template ecosystem.
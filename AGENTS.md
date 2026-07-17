<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Next.js 16 + Tailwind v4 + shadcn/ui

## Stack

- **Next.js 16.2.10** (App Router), **React 19.2.4**, **TypeScript 5** (strict)
- **Tailwind CSS v4** — no `tailwind.config`. Config is CSS-based: `@import "tailwindcss"`, `@theme inline {}` in `app/globals.css`. PostCSS plugin: `@tailwindcss/postcss`.
- **shadcn/ui** (Radix Maia style) — uses `radix-ui` (single package, not `@radix-ui/*` scoped), `class-variance-authority`, `lucide-react`, `clsx` + `tailwind-merge` (`cn()` in `lib/utils.ts`).
- **ESLint v9** — flat config (`eslint.config.mjs`, no `.eslintrc`).

## Commands

| Action | Command |
|--------|---------|
| dev server | `npm run dev` |
| build | `npm run build` |
| lint | `npm run lint` (`eslint`) |
| start (prod) | `npm run start` |

No typecheck script — rely on your editor or `npx tsc --noEmit`.

## Project structure

```
app/
  (auth)/login, register
  (dashboard)/dashboard, admin-dashboard, author-dashboard (shared layout)
  (public)/page.tsx (home), news
  layout.tsx          ← root layout
  globals.css         ← Tailwind v4 + theme tokens
components/ui/        ← shadcn components (button, card, input, label)
lib/utils.ts          ← cn() helper
```

- Route groups use `(parentheses)` — `(auth)`, `(dashboard)`, `(public)`.
- `@/*` import alias maps to project root (tsconfig.json `paths`).
- Generated file: `next-env.d.ts` (do not edit).

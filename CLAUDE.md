# CLAUDE.md — ParkShare Czech Republic

## Project Overview

ParkShare is a smart parking marketplace for Prague built as a single-page Next.js 14 application. It demonstrates three role-based views (Driver, Owner/Host, Admin) with interactive SVG maps, dynamic pricing, and real-time dashboard metrics. All data is mock/client-side — there is no backend or database.

## Tech Stack

- **Framework:** Next.js 14.2.29 (App Router)
- **Language:** TypeScript 5.4.5
- **UI:** React 18.3.1 with inline styles (no CSS framework)
- **Font:** Figtree (Google Fonts, weights 400–800)
- **Locale:** Czech (cs-CZ), currency CZK

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # Run Next.js lint (ESLint)
```

There is no test suite configured (no Jest, Vitest, Cypress, or Playwright).

## Project Structure

```
app/
  layout.tsx         Root layout (metadata, Figtree font, body background)
  page.tsx           Home page — role switcher (driver/owner/admin), renders views
  globals.css        Keyframes (fadeIn, spin, ping), CSS resets, range input styles

components/
  DriverView.tsx     Driver interface: dynamic pricing, map, spot details, gate simulation
  OwnerView.tsx      Owner interface: AI pricing advisor, 3-step wizard, audit log
  AdminView.tsx      Admin dashboard: 6 KPIs, SDR gauge, occupancy, unit economics
  PragueMap.tsx      Interactive SVG map of Prague with spot markers
  ui/
    Bar.tsx          Horizontal progress bar with optional label/value
    Card.tsx         Container card with optional title, border, fadeIn animation
    Pill.tsx         Toggle button (used for event/role selectors)
    StatRow.tsx      Key-value row for statistics/financials
    Tag.tsx          Colored badge/label

lib/
  data.ts            Design tokens (colors as `C`), TypeScript interfaces, mock data
                     (SPOTS, EVENTS, AUDIT, KPI arrays)
```

## Architecture & Patterns

### Rendering
All interactive components use `'use client'` directive. The app is entirely client-rendered with no server components doing data fetching or SSR-specific logic.

### State Management
Local `useState` / `useRef` only — no Redux, Zustand, or Context API. State is co-located within each view component:
- `page.tsx` — `role` state switches between views
- `DriverView` — `eventIdx`, `active` spot, `gate` state
- `OwnerView` — `wizard` step, `wizType`, `price`, `tab`
- `AdminView` — `sdr` / `occ` refs updated via `setInterval`

### Routing
Single-page app at `/`. No multi-page routing; views switch via role state in `page.tsx`.

### Styling
Inline `style` props everywhere — no CSS modules, Tailwind, or styled-components. All colors come from the `C` constant in `lib/data.ts`. Responsive breakpoints (768px) are handled via `<style>` tags embedded in components with media queries.

### Data
All data lives in `lib/data.ts` as exported constants. No API calls, no fetch, no data layer. Prices are computed client-side as `basePrice * demand multiplier`.

## Key Conventions

### Naming
- **Components:** PascalCase (`DriverView`, `StatRow`)
- **Functions/variables:** camelCase (`handleGate`, `getAiText`)
- **Constants/data arrays:** UPPERCASE (`SPOTS`, `EVENTS`, `AUDIT`, `KPI`)
- **Props interfaces:** `{ComponentName}Props` suffix (`CardProps`, `PragueMapProps`)

### Type Patterns
- `type Role = 'driver' | 'owner' | 'admin'`
- `type GateState = 'idle' | 'opening' | 'open'`
- Interfaces for data models (`Spot`) and component props
- Path alias `@/` maps to project root (configured in `tsconfig.json`)

### Component Patterns
- Default exports for all components
- Props destructured in function signature
- `useCallback` for event handlers passed as props or used in effects
- Animations use CSS keyframes defined in `globals.css`

### Number Formatting
- Czech locale: `toLocaleString('cs-CZ')`
- Currency always in CZK (Czech Koruna)
- Platform fee constant: 15%

## Design Tokens

Colors are centralized in `lib/data.ts` as the `C` object:

| Token | Value | Usage |
|-------|-------|-------|
| `C.bg` | `#f9f9f8` | Page background |
| `C.surface` | `#ffffff` | Card backgrounds |
| `C.text` | `#111110` | Primary text |
| `C.textMid` | `#6b6860` | Secondary text |
| `C.textSoft` | `#a3a198` | Muted/helper text |
| `C.accent` | `#e8560a` | Primary orange accent |
| `C.border` | `#e8e7e4` | Default borders |
| `C.green` | `#1a7a4a` | Available / positive |
| `C.red` | `#c0392b` | Occupied / negative |

## Common Pitfalls

- **No backend:** Don't try to add API routes or database connections without discussing architecture first. The app is a pure frontend demo.
- **Inline styles:** Adding CSS modules or Tailwind would require refactoring every component. Follow the existing inline style pattern for consistency.
- **Single page:** Adding new routes via the App Router is fine but the current navigation is state-based, not route-based.
- **No tests:** There is no test infrastructure. Adding tests requires setting up Jest/Vitest and React Testing Library from scratch.
- **Strict mode:** TypeScript strict mode is enabled in `tsconfig.json`. All code must pass strict checks.

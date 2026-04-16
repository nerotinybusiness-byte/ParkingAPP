# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ParkShare is a smart parking marketplace demo for Prague — a single-page Next.js 14 app with three role-based views (Driver, Owner/Host, Admin). It is a pure frontend demo with no backend, database, or API calls. All data is mock data defined in `lib/data.ts`.

## Commands

```bash
npm run dev      # Dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint via Next.js
```

No test framework is configured.

## Architecture

**Next.js 14 App Router** with a single route (`/`). All components use `'use client'` — there is no server-side data fetching.

**Role switching** happens via local state in `app/page.tsx`, which conditionally renders one of three view components: `DriverView`, `OwnerView`, or `AdminView`. There is no client-side routing between pages.

**State management** is local only (`useState`/`useRef` per component). No Redux, Context, or external state library.

**Styling** uses inline `style` props exclusively — no CSS modules, Tailwind, or styled-components. All color values come from the `C` constant exported by `lib/data.ts`. Responsive layouts use `<style>` tags with media queries embedded in components (breakpoint: 768px).

**Data layer:** `lib/data.ts` exports all mock data (`SPOTS`, `EVENTS`, `AUDIT`, `KPI`), TypeScript interfaces (`Spot`), type aliases (`Role`, `GateState`), and the color palette (`C`). Prices are computed client-side as `basePrice × demand multiplier`.

**Reusable UI primitives** live in `components/ui/` (Card, Bar, Pill, Tag, StatRow). `PragueMap.tsx` is an interactive SVG map used by DriverView.

## Conventions

- **Components:** PascalCase, default exports, props destructured in signature
- **Props interfaces:** `{ComponentName}Props` (e.g., `CardProps`)
- **Data constants:** UPPERCASE (e.g., `SPOTS`, `EVENTS`)
- **Path alias:** `@/` maps to project root
- **Locale:** Czech (`cs-CZ`), currency CZK, use `toLocaleString('cs-CZ')` for number formatting
- **TypeScript:** Strict mode enabled
- **Animations:** Defined as CSS `@keyframes` in `app/globals.css` (`fadeIn`, `spin`, `ping`)

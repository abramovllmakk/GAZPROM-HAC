# INDUSTRIA TWIN Interface Refresh Implementation Plan

> **For agentic workers:** Use the approved design in `docs/superpowers/specs/2026-11-09-interface-refresh-design.md`. Implement task by task in this session and keep all existing business behavior intact.

**Goal:** Make every INDUSTRIA TWIN screen feel like one clear, restrained engineering interface, keep text/actions within their layouts, organize simulation explanations, and recover the 3D scene after WebGL context loss.

**Architecture:** Refine the existing Tailwind/CSS design system and shared layout components first. Apply those rules to every route, restructure the documentation content presentation, then address the factory viewport lifecycle and its 2D fallback. No new UI dependency or server/data changes.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4, React Three Fiber 9, Three.js.

**Spec:** `docs/superpowers/specs/2026-11-09-interface-refresh-design.md`

## Global Constraints

- Use a minimal, independent corporate theme with blue accents; do not copy Gazprom’s logo or exact identity.
- Preserve existing routes, business behavior, model formulas, simulation data, APIs, roles, and persistence.
- Organize complex information in short semantic sections; keep synthetic-data disclosures and model limitations visible.
- Keep text, controls, tables, and diagrams within their containers at mobile, medium, and wide viewports.
- Keep the 2D factory plan as a useful fallback; preserve keyboard interaction and accessible names.
- Do not add dependencies.

## Review Focus

- Long scenario names, dates, technical identifiers, and Russian prose at narrow widths — confirm they wrap or clip within the intended panel without widening the page.
- Dense tables and action groups at mobile and tablet widths — confirm horizontal scrolling stays inside a labelled table region and buttons keep a clear primary/secondary hierarchy.
- WebGL loss/restoration and browser resize — confirm the fallback remains visible and the scene can recover without a full page reload.
- SVG station captions in the 2D plan — confirm long captions stay within the station card and remain selectable by keyboard.
- Semantic/color states — confirm status, selected tab, disabled state, busy action, and critical action remain understandable without color alone.

---

### Task 1: Shared visual foundation and navigation

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/layout/AppShell.tsx`
- Modify: `src/components/layout/PageHeader.tsx`
- Modify: `src/components/ui/Button.tsx`
- Modify: `src/components/ui/Panel.tsx`
- Modify: `src/app/login/page.tsx`

**Interfaces:** Preserve the props and variants of `Button`, `LinkButton`, `Panel`, `PageHeader`, and `AppShell`; add no new styling dependency.

- [ ] Define the updated color, typography, spacing, border, shadow, focus, and status tokens in `globals.css`; keep status colors paired with labels.
- [ ] Tighten the shared shell into a consistent nav/header/content grid with wrapping breadcrumbs, predictable action placement, and clear selected navigation state on desktop and mobile.
- [ ] Normalize page heading and panel header/body spacing; ensure all shared text containers can shrink and wrap long content.
- [ ] Standardize button height, hit area, icon spacing, primary/secondary/ghost/danger contrast, and focus/disabled states.
- [ ] Bring the login split layout and small-screen version into the same visual language without changing authentication behavior.
- [ ] Inspect the shared shell, one dense panel, and login at narrow, medium, and wide widths; note any global rule that causes horizontal overflow and correct it before continuing.

### Task 2: Dashboard, process, scenarios, comparison, administration, and account

**Files:**
- Modify: `src/app/(app)/dashboard/page.tsx`
- Modify: `src/app/(app)/process/page.tsx`
- Modify: `src/app/(app)/scenarios/page.tsx`
- Modify: `src/app/(app)/compare/page.tsx`
- Modify: `src/app/(app)/admin/page.tsx`
- Modify: `src/app/(app)/account/page.tsx`
- Modify: `src/components/process/StationTable.tsx`
- Modify: `src/components/process/StationPanel.tsx`
- Modify: `src/components/process/ProcessMnemonic.tsx`
- Modify: `src/components/scenarios/ScenarioStudio.tsx`
- Modify: `src/components/scenarios/fields.tsx`
- Modify: `src/components/compare/CompareView.tsx`
- Modify: `src/components/advisor/ResourceAdvisor.tsx`
- Modify: `src/app/(app)/admin/UserAdmin.tsx`
- Modify: `src/app/(app)/admin/RunAdminTable.tsx`
- Modify: `src/app/(app)/admin/AuditLogPanel.tsx`
- Modify: `src/app/(app)/account/PasswordForm.tsx`

**Interfaces:** Continue using current page data and API contracts; preserve component props and selection synchronization.

- [ ] Give each page a clear first-read hierarchy: key status/result, related detail, then secondary/reference information.
- [ ] Group page actions by task and align their sizing/placement; show in-progress and result states in context.
- [ ] Present the scenario editor in named groups and preserve its existing values, validation, save/run/copy/delete/import/export behavior.
- [ ] Make dashboard metrics and advisor output scannable; keep chart explanations near their charts and secondary run details grouped.
- [ ] Make comparison columns and station details legible; keep wide data in a local scroll region and wrap scenario names/interpretations.
- [ ] Reshape administration controls so role, status, last login, and row actions do not compete for one cramped line; preserve safeguards and user actions.
- [ ] Fix min-width, wrapping, and text overflow for all forms, data labels, statuses, descriptions, and action groups in these routes.
- [ ] Review all six routes at narrow, medium, and wide widths and correct visible overflow, cramped controls, or unclear action grouping.

### Task 3: Documentation and simulation engine explanation

**Files:**
- Modify: `src/app/(app)/documentation/page.tsx`
- Modify: `src/components/ui/SyntheticNote.tsx`
- Modify: `src/app/(app)/documentation/page.tsx` engine and metrics sections

**Interfaces:** Continue deriving limits, event types, metrics, and model data from their existing domain modules; do not change engine behavior or documentation facts.

- [ ] Reformat the engine section into a readable sequence: what the model does, event timeline, queue/resource rules, reproducibility, equipment failures, and limits.
- [ ] Render future events and journal events as distinct compact labelled groups instead of one uninterrupted paragraph; retain every event name and Russian explanation.
- [ ] Use concise headings, definition lists, and compact tables/cards for formulas and assumptions; preserve CRN, MTBF/MTTR, horizon, and event-limit details.
- [ ] Keep the data and metrics tables within their own scroll containers and make long descriptions wrap.
- [ ] Review the documentation page at narrow, medium, and wide widths and check that technical content is scannable without horizontal page overflow.

### Task 4: 3D scene lifecycle and useful 2D plan

**Files:**
- Modify: `src/components/factory3d/FactoryTour.tsx`
- Modify: `src/components/factory3d/FactoryCanvas.tsx`
- Modify: `src/components/factory3d/FactoryPlan2D.tsx`
- Modify: `src/components/factory3d/sceneStore.ts` only if a scene reset action is required
- Inspect: `src/components/factory3d/SceneQualityController.tsx`

**Interfaces:** Preserve tour/replay state, camera selection, station selection, and the `StationSceneData` shape.

- [ ] Handle `webglcontextlost` and `webglcontextrestored` as separate states; prevent default context destruction behavior and show a stable 2D fallback while unavailable.
- [ ] Add a direct, labelled action to retry/remount the 3D scene after context loss; avoid trapping the user in a permanently failed state.
- [ ] Make canvas size and camera/quality behavior respond to container resize and scene remount without resetting unrelated selected route/replay state.
- [ ] Rework 2D station labels to fit each station card, wrapping or shortening display labels while retaining full accessible names and all status/queue/resource data.
- [ ] Keep plan selection and keyboard activation functional, with viewport controls placed consistently and without covering station labels.
- [ ] Review tour, replay, context-loss fallback, and restored 3D behavior in the running app at narrow and wide widths.

### Task 5: Whole-product visual pass

**Files:**
- Modify only files identified during the pass in `src/app/`, `src/components/`, and `src/app/globals.css`.

- [ ] Navigate every route: dashboard, process, scenarios, comparison, factory, documentation, admin, account, and login.
- [ ] Inspect responsive widths and confirm page-level content never expands beyond the viewport; check table and diagram scrolling remains local.
- [ ] Confirm buttons communicate action hierarchy, controls have visible labels, and long text does not overlap adjacent content.
- [ ] Confirm synthetic-data notes, model caveats, statuses, and 3D fallback/recovery messaging remain visible and accurate.
- [ ] Summarize changed areas and any remaining limitation; do not run automated test suites unless the user asks for them.

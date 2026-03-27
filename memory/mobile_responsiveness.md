---
name: Mobile Responsiveness Implementation
description: Mobile optimization work while preserving desktop layout
type: feedback

## What was done:

### 1. Navbar - Added Mobile Menu
- Converted to client component with useState
- Added hamburger menu button (visible only on sm:hidden)
- Full-screen overlay menu with backdrop blur
- Mobile nav links: full-width, larger touch targets (py-4, min-h-[44px])
- Desktop layout completely unchanged
- **Bug fix:** Navbar now `relative` with `z-50` to stay above overlay
- **Bug fix:** Mobile overlay positioned `top-16` (below Navbar) so it doesn't cover the hamburger button
- **Bug fix:** Mobile overlay has `overflow-y-auto` for scrollable menu if needed

### 2. Stocks Page - Card Layout for Mobile
- Desktop: Original table with horizontal overflow remains unchanged
- Mobile: Complete card-based layout:
  - Each stock displays as a card with ticker, name, badges for market/currency
  - Full-width search and filters with proper touch targets (h-11)
  - Entire card is clickable (navigates to company page)
  - No horizontal scrolling on mobile

### 3. Dashboard - Spacing Optimization
- Reduced grid gap: `gap-2 sm:gap-3` for tighter mobile spacing
- Maintained all desktop layout and interaction patterns
- Table rows retain adequate touch area (~48px height)

### 4. Company Page - Touch Target Fixes
- Back button: Added `h-11 w-11` on mobile (44×44px) while keeping `h-9 w-9` on desktop
- Chart areas remain responsive (100% container width/height)
- Fundamentals section scrollable with existing layout

### 5. About Page - Mobile Spacing
- Adjusted container padding: `p-3 sm:p-4 md:p-6`
- Responsive heading: `text-lg sm:text-xl`
- Reduced grid gap: `gap-4 sm:gap-6`

### 6. Global Touch Target Standards
- All mobile interactive elements meet 44×44px minimum:
  - Mobile menu links: h-11 (44px)
  - Mobile search/filter inputs: h-11 (44px)
  - Mobile stock access buttons: w-11 h-11 (44×44px)
  - Mobile clear filters button: h-11 (44px)
  - Mobile navbar toggle: min-h-[44px] min-w-[44px]

## Critical Layout Fix: Responsive Height & Overflow

**Problem:** Mobile pages had content cut off because page containers used `h-full` unconditionally, creating a fixed-height viewport on mobile instead of allowing natural page growth.

**Solution:** Made layout responsive:
- Desktop (≥768px): `md:h-full` + `md:overflow-hidden` on body → fixed viewport, inner scrolling
- Mobile (<768px): no `h-full` on containers → natural flow, full page scrolls

**Pages fixed:**
- src/app/page.tsx: Wrapped scrollable area with `md:flex-grow md:overflow-y-auto`, container `md:h-full`
- src/app/stocks/page.tsx: Inner wrapper `md:flex-grow md:overflow-y-auto`, container `md:h-full`
- src/app/company/[symbol]/page.tsx: Main content area `md:flex-grow md:overflow-y-auto`, container `md:h-full`, responsive back button
- src/app/about/page.tsx: Content area `md:flex-grow md:overflow-y-auto`, container `md:h-full`

## Navigation Menu Bug: Button Not Working

**Root cause:** Mobile overlay was a child of `<nav>` and covered the hamburger button.

**Fix:**
- Moved overlay outside `<nav>` (render as sibling in fragment)
- Overlay uses `fixed inset-x-0 top-16 bottom-0 z-40` (starts below navbar)
- Navbar keeps `relative z-50`
- Hamburger button now fully clickable, overlay appears below navbar

## Breakpoints Used:
- `sm:` (640px)
- `md:` (768px)
- `lg:` (1024px)

## Testing Checklist:
- [x] Navbar hamburger opens/closes menu; button remains clickable
- [ ] Stocks page on mobile: cards stack vertically, no horizontal scroll, page scrolls fully
- [ ] Stocks page on desktop: table still works as before
- [ ] Dashboard: all sections visible on mobile, page scrolls
- [ ] All buttons/links have adequate touch area on mobile (≥44px)
- [ ] No horizontal overflow on any page
- [ ] Desktop layout (1024px+) unchanged: fixed header/footer, inner scroll only

Test on:
- 375px (iPhone SE)
- 390px (iPhone X/12/13)
- 768px (iPad)

## Files Modified:
- src/app/layout.tsx
- src/components/Navbar.tsx
- src/components/StockList.tsx
- src/app/page.tsx
- src/app/stocks/page.tsx
- src/app/company/[symbol]/page.tsx
- src/app/about/page.tsx

## Final Touch: Bigger Chart on Mobile

**File:** `src/app/company/[symbol]/page.tsx`

Changed the chart container to have a minimum height on mobile:
```tsx
<CardContent className="p-3 sm:p-4 h-full min-h-[50vh] md:min-h-0">
  <StockChart key={symbol} data={chartData} />
</CardContent>
```

- Mobile (<768px): Chart takes at least 50% of viewport height (`50vh`)
- Desktop (≥768px): Chart height adapts to container (`min-h-0`)

This makes the chart more prominent and easier to interact with on mobile where it's the primary visualization.

## Professional Loading Skeletons for Mobile

Updated all loading skeletons to match the responsive layouts and provide a better UX on mobile.

### Dashboard Loading (`src/app/loading.tsx`)
- Made responsive layout: `p-3 sm:p-4`, `space-y-3 sm:space-y-4`, container `md:h-full`
- Scrollable area now: `md:flex-grow md:overflow-y-auto` (natural on mobile)
- Reduced gaps for mobile: `gap-2 sm:gap-3`
- Footer spacing adjusted for mobile

### Stocks Loading (`src/app/stocks/loading.tsx`)
- **Desktop:** Table skeleton (same as before)
- **Mobile:** Card-based skeleton layout with:
  - Larger touch targets (h-11 for inputs)
  - Mobile cards that match the actual card design
  - 10 card skeletons shown (vs 20 table rows - appropriate for screen size)
- Toolbar: Separate mobile/desktop skeletons with proper sizing
- Import: Removed unused Table components

### Company Loading (`src/app/company/[symbol]/loading.tsx`)
- Responsive back button: `h-11 w-11` on mobile, `md:h-9 md:w-9` on desktop
- Chart container: `min-h-[50vh]` on mobile for prominence, `md:min-h-0` on desktop
- Layout structure: `md:flex-grow md:overflow-y-auto` for proper scrolling
- Spacing: `p-3 sm:p-4`, `gap-3 sm:gap-4`
- Removed unnecessary Info icon imports

All loading states now provide a smooth, professional experience on both mobile and desktop.

## API Query Update (Top Gainers & Losers)

**Files:** `src/lib/db.ts` - functions `getTopGainers()` and `getTopLosers()`

Updated queries to match the specified logic:

**Before:** Used today's date (`new Date()`) to filter `quotes_history`

**After:** Derive the date from the latest record in `prices_history`:
```ts
const latestPriceRecord = await prisma.prices_history.findFirst({
  orderBy: { date: 'desc' },
  select: { date: true },
});
```
Then filter `quotes_history` by that date.

**Logic:**
- Get the maximum date from `prices_history` table
- Query `quotes_history` where:
  - `date = latestPriceRecord.date`
  - `price_change IS NOT NULL`
  - For gainers: `price_change > 0`, ordered by `price_change DESC`, limit 5
  - For losers: `price_change < 0`, ordered by `price_change ASC`, limit 5

This ensures both queries use the most recent data date from the prices history, exactly as requested.

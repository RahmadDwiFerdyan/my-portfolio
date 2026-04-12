## Project Overview

A simple finance tracking app that helps users monitor expenses, manage budgets, and gain clear insights into spending habits.

### Goals

- Reduce friction when recording daily expenses
- Give clear budget feedback and trends
- Keep the UI clean and fast for mobile use

## Detail Product & Requirement

### Requirements (example)

- Users can add/edit/delete transactions
- Transactions support categories, notes, and dates
- Dashboard shows totals by period (week/month)

### Constraints

| Constraint | Notes |
|---|---|
| Offline-friendly | Cache latest data and queue sync |
| Performance | Fast lists for many transactions |
| Accessibility | Contrast + readable text sizes |

## Research & Planning

### Key insights (dummy)

- Users want **quick entry** above all else
- The most-used screen is the transaction list
- Visual summaries should be simple, not overwhelming

### Flow (dummy)

1. Open app
2. Add transaction
3. Review dashboard
4. Adjust budget

## UI Design & Prototype

Here are example placeholders for images. Put your assets in `public/projects/finance-app/`.

![Dashboard UI](/projects/finance-app/dashboard.png)

![Transaction list](/projects/finance-app/list.png)

## Usability Test

### Scenarios (dummy)

- Add 3 transactions and verify totals
- Edit a transaction category and confirm updates
- Find a transaction from last month

### Findings (dummy)

- Some users missed the filter button on mobile
- Category selection needed clearer active state

### Improvements (dummy)

- Move filters to a more discoverable location
- Add empty states + better error copy

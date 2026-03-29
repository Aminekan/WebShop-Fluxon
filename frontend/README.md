# Fluxon Frontend

React + Vite storefront for the Fluxon project.

## What is included
- Home page, product listing, product details, cart, login, register, checkout, confirmation, and account pages
- Cart and auth state stored in `localStorage`
- Hybrid API layer that can use real backend endpoints or fall back to mock data
- Responsive visual design meant for demos and presentations

## Run locally
1. Install Node.js if it is not already available on your machine.
2. Open `C:\Users\bib\Documents\LEA2\WebShop_Fluxon\frontend`
3. Copy `.env.example` to `.env`
4. Run `npm install`
5. Run `npm run dev`

## API mode
- Default is mock mode: `VITE_USE_MOCK_API=true`
- To use the backend, set `VITE_USE_MOCK_API=false`
- Backend base URL is controlled by `VITE_API_BASE_URL`

## Important files
- `src/services/api.ts`: real API calls plus fallback behavior
- `src/services/mockApi.ts`: mock implementations used for demos
- `src/state/AuthContext.tsx`: login/register session state
- `src/state/CartContext.tsx`: cart state and totals
- `INTEGRATION_CHECKLIST.md`: quick contract checklist for backend coordination

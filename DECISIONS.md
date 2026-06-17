# Decisions

- AI used only for autocomplete and debugging purposes, not actually implementing features, just boilerplate
- Loading screen was set to `true` always — changed to use `useState` so it reflects actual fetch state
- Fetching all users was creating an infinite request loop — added a dependency array to `useEffect` to fix it
- Added query params for the GET request: changed both backend and frontend, adding next page / previous page logic
- Change the JSON file to use a SQL version — decision made but not implemented

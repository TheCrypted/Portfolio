# Repository Guidelines

## Project Structure & Module Organization
This repository is a React 18 portfolio built with Vite, Tailwind CSS, and Three.js through React Three Fiber. `src/main.jsx` mounts the application and its context providers; `src/App.jsx` defines routes.

- `src/pages/`: route-level views such as `Work.jsx` and `Projects.jsx`.
- `src/components/`: reusable interface and animation components.
- `src/models/`: React wrappers for 3D models.
- `src/context/`: shared mouse-position and link-hover state.
- `src/helpers/` and `src/utils/`: rendering helpers and utilities.
- `src/assets/`: imported images, fonts, GIFs, and GLB models; `public/` contains directly served assets.
- `.github/workflows/deploy.yml`: build and GitHub Pages deployment configuration.

## Build, Test, and Development Commands
- `npm ci`: install dependencies from `package-lock.json`.
- `npm run dev`: start the Vite development server.
- `npm run build`: generate the production bundle in `dist/`.
- `npm run preview`: serve the production build for local inspection.
- `npm run lint`: check JavaScript and JSX with ESLint; warnings fail the command.

## Coding Style & Naming Conventions
Use ES modules and functional React components. Name component files in PascalCase (`ProjBlock.jsx`) and functions and variables in camelCase. Follow the surrounding file's indentation and quote style: application JSX commonly uses four spaces, while configuration files use two. Avoid unrelated formatting changes.

ESLint enables recommended JavaScript, React, and Hooks rules, plus React Refresh checks. No Prettier configuration is present. Use Tailwind utilities and existing CSS patterns for styling.

## Testing Guidelines
No automated test framework, test script, or coverage threshold is configured. `src/components/test.js` is a standalone scratch script, not a test suite. Run lint and a production build before submitting changes. Manually verify affected routes, navigation, hover interactions, animations, and 3D asset loading at desktop and mobile sizes. Preserve route capitalization from `src/App.jsx`.

## Commit & Pull Request Guidelines
Recent commits use short descriptive subjects such as `added projects`; no strict commit format is established. Prefer concise, specific subjects describing the affected feature.

Pull requests should explain the change, list validation performed, link relevant issues, and include screenshots or recordings for visual changes. Pushes to `master` trigger deployment to GitHub Pages. Keep generated `dist/` and `node_modules/` out of commits.

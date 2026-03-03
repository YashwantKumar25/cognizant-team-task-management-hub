
# Cognizant Team Task Management Hub

A small full-stack test app to manage cognizant team tasks. We can add tasks, search tasks and delete tasks.

## Tech
- Frontend: React + TypeScript + Vite, Redux Toolkit + RTK Query, Zod, Tailwind CSS
- Backend: Node.js + Express + TypeScript, Zod, in-memory store

## Quick Start
```bash
npm install
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env
npm run dev
```

- Server: `http://localhost:4000`
- Web: `http://localhost:3000`

## API
- `GET /api/tasks?q=<title>` – list tasks (search by title)
- `POST /api/tasks` – create task (requires `title`; `priority` in {low, medium, high, critical})
- `PATCH /api/tasks/:id` – update task fields
- `DELETE /api/tasks/:id` – protected; requires header `X-Task-Auth: <DELETE_TOKEN>`

## Architecture Decisions
- **Shared validation** via Zod to maintain single source of truth.
- **RTK Query** for fetch lifecycle and normalization; scalable tags-based cache invalidation.
- **Resilient server** with centralized error handling, CORS allow-list (incl. custom header).
- **Search performance** via debounce + server filtering.

# Application Screenshot
![Screenshot-without-data](https://github.com/YashwantKumar25/cognizant-team-task-management-hub/blob/main/apps/web/public/Screenshot-Searching-with-debounce-implementation.png?raw=true)

![responsive on small screen](https://github.com/YashwantKumar25/cognizant-team-task-management-hub/blob/main/apps/web/public/Screenshot-responsive-on-small-screen.png?raw=true)

![screenshot with data](https://github.com/YashwantKumar25/cognizant-team-task-management-hub/blob/main/apps/web/public/Screenshot-with-data.png?raw=true)

![Screenshort with search](https://github.com/YashwantKumar25/cognizant-team-task-management-hub/blob/main/apps/web/public/Screenshot-Searching-with-debounce-implementation.png?raw=true)

![Screenshot with black theme](https://github.com/YashwantKumar25/cognizant-team-task-management-hub/blob/main/apps/web/public/Screenshot-black-theme.png?raw=true)



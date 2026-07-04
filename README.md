# autokicker

Autokicker is a Discord bot that automatically removes inactive members from servers. It tracks activity across messages, voice joins, and reactions — then warns users before kicking/banning them, with full audit logging.

## Requirements

- [Node.js](https://nodejs.org/) `>=26.1`.
- [pnpm](https://pnpm.io/) `11.9.0`.
- [Docker](https://www.docker.com/) is optional but recommended for deployment.

## Structure

```
autokicker/
├── apps/
│   ├── backend/      # Fastify REST API + Socket.IO   (port 7200)
│   ├── bot/          # Discord.js bot + health server (port 7000)
│   └── frontend/     # Next.js 16 dashboard           (port 7700)
└── lib/
    ├── database/     # Drizzle ORM + PostgreSQL connection
    ├── schema/       # Shared TypeBox schemas & Socket.IO event types
    ├── test/         # Shared test utilities
    └── utils/        # Shared helper utilities
```

## Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Copy and fill environment files
cp apps/backend/.env.example apps/backend/.env
cp apps/bot/.env.example     apps/bot/.env

# 3. Start all apps in watch mode
node --run dev
```

---

## Apps

### backend

Fastify REST API with TypeBox schema validation, JWT authentication, Discord OAuth2, rate limiting, Swagger/Scalar API docs, and a Socket.IO server.

**Environment variables** (`apps/backend/.env`):

| Variable            | Description                                       |
| ------------------- | ------------------------------------------------- |
| `NODE_ENV`          | `development` or `production`                     |
| `DATABASE_URL`      | PostgreSQL connection string                      |
| `FRONTEND_URL`      | Frontend origin (default `http://localhost:7700`) |
| `DISCORD_URL`       | Bot service URL (default `http://localhost:7000`) |
| `PORT`              | API port (default `7200`)                         |
| `CLIENT_ID`         | Discord application client ID                     |
| `CLIENT_SECRET`     | Discord application client secret                 |
| `CLIENT_TOKEN`      | Discord bot token                                 |
| `ERROR_LOG_CHANNEL` | Discord channel ID for error logging              |
| `API_SECRET`        | Internal API secret                               |
| `COOKIE_SECRET`     | Fastify cookie secret                             |
| `JWT_SECRET`        | JWT signing secret                                |
| `HMAC_SECRET`       | HMAC signing secret                               |
| `IO_USERNAME`       | Socket.IO admin UI username                       |
| `IO_PASSWORD`       | Socket.IO admin UI password                       |

```bash
# Development
node --run dev -- --filter=backend

# Production build
node --run build -- --filter=backend
node --run start -- --filter=backend

# Docker
node --run docker:build -- --filter=backend
node --run docker:start -- --filter=backend
```

---

### bot

Discord.js bot with slash commands, buttons, modals, select menus, context menus, and event handlers. Exposes a minimal Fastify health server.

**Environment variables** (`apps/bot/.env`):

| Variable       | Description                                       |
| -------------- | ------------------------------------------------- |
| `NODE_ENV`     | `development` or `production`                     |
| `DATABASE_URL` | PostgreSQL connection string                      |
| `FRONTEND_URL` | Frontend origin                                   |
| `API_URL`      | Backend API URL (default `http://localhost:7200`) |
| `PORT`         | Health server port (default `7000`)               |
| `SECRET`       | Internal shared secret with the API               |
| `TOKEN`        | Discord bot token                                 |

```bash
# Development
node --run dev -- --filter=bot

# Production build
node --run build -- --filter=bot
node --run start -- --filter=bot

# Docker
node --run docker:build -- --filter=bot
node --run docker:start -- --filter=bot
```

---

### frontend

Next.js 16 App Router dashboard with Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, and Zustand.

**Pages:**

| Route        | Description               |
| ------------ | ------------------------- |
| `/`          | Landing page              |
| `/auth`      | Discord OAuth2 login flow |
| `/dashboard` | User dashboard            |
| `/privacy`   | Privacy policy            |
| `/terms`     | Terms of service          |

```bash
# Development
node --run dev -- --filter=frontend

# Production build
node --run build -- --filter=frontend
node --run start -- --filter=frontend
```

---

## Shared Libraries

### `@repo/database`

Drizzle ORM client and PostgreSQL connection, shared across `backend`, `bot`, and `test`.

### `@repo/schema`

TypeBox schemas and Socket.IO event type definitions shared between `backend` and `frontend`.

### `@repo/utils`

General-purpose helper utilities shared across all packages.

### `@repo/test`

Shared test setup and utilities.

---

## Scripts

All scripts run across the full monorepo via Turborepo:

| Script                | Description                           |
| --------------------- | ------------------------------------- |
| `node --run dev`      | Start all apps in parallel watch mode |
| `node --run build`    | Build all apps                        |
| `node --run start`    | Start all apps                        |
| `node --run test`     | Type-check all packages               |
| `node --run lint`     | Lint all files with oxlint            |
| `node --run lint:fix` | Lint and auto-fix                     |
| `node --run fmt`      | Format all files with Prettier        |
| `node --run studio`   | Open Drizzle Studio                   |
| `node --run clean`    | Remove all `node_modules` directories |

---

## License

MIT — see [LICENSE](LICENSE) for details.

## Links

| Resource    | URL                                        |
| ----------- | ------------------------------------------ |
| GitHub      | https://github.com/xcfio/autokicker        |
| Bug reports | https://github.com/xcfio/autokicker/issues |
| Help        | https://dsc.gg/xcfio                       |

---

Made with ❤️ by [xcfio](https://github.com/xcfio)

# FakeStore Playwright Hybrid QA Portfolio

Modern QA automation portfolio project showcasing API + UI hybrid testing, POM design, Dockerized execution, and CI/CD with GitHub Actions.

## Tech Stack
- Playwright (latest)
- TypeScript
- Docker / Docker Compose
- GitHub Actions
- FakeStore API: https://fakestoreapi.com
- UI under test: https://www.saucedemo.com

## Directory Structure

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml
├── src/
│   ├── api/
│   │   └── apiClient.ts
│   ├── config/
│   │   └── env.ts
│   ├── pages/
│   │   ├── InventoryPage.ts
│   │   └── LoginPage.ts
│   └── types/
│       └── fakestore.ts
├── tests/
│   ├── api/
│   │   └── api-smoke.spec.ts
│   └── hybrid/
│       └── hybrid-api-ui.spec.ts
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
├── playwright.config.ts
├── README.md
└── tsconfig.json
```

## Setup

```bash
npm install
npx playwright install --with-deps
cp .env.example .env
npm test
```

## Run in Docker Compose

```bash
docker compose up --build --abort-on-container-exit --exit-code-from playwright-tests
```

## Hybrid Test Strategy
- API layer (`request`) seeds or updates FakeStore data (`POST`/`PUT`) before UI verification.
- UI layer (`page`) validates user-facing behavior and layout via SauceDemo using POM classes.
- This demonstrates realistic cross-layer orchestration even when backend and UI are separate targets.

## CI/CD Pipeline
- Workflow: `.github/workflows/playwright.yml`
- Triggers: push/pull_request on `main`
- Steps:
  - Build Docker image
  - Run test suite in container
  - Upload Playwright HTML report artifact on failure

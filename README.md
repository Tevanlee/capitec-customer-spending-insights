# Customer Spending Insights Dashboard

A production-grade web app built with **Nuxt 4** and **pnpm** that provides financial and customer spending insights.

---

## Getting Started (Docker Deployment)

This project contains a runnable Docker configuration designed to build, compile, and run the production assets efficiently.

### Build the Project Image

```bash
pnpm docker:build
```

### Run the Local Container

```bash
pnpm docker:run
```

Once the container starts successfully, view the running dashboard app directly at **`http://localhost:3000`**.

### Stop and Clean Up

```bash
pnpm docker:stop
```

### Fresh Build & Run

```bash
pnpm docker:fresh
```

---

## Local Development

If you need to install, build, or verify artifacts locally:

```bash
# Install dependencies
pnpm install

# Run application in localized development mode
pnpm dev

# Compile production distributions locally
pnpm build

# Build and preview production distribution locally
pnpm build
pnpm preview
```

---

## Running Tests

Run the test suite:

```bash
# Run unit and composable tests
pnpm test
```

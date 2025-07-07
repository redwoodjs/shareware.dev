---
title: Code Style
slug: /code
description: To maintain quality and consistency across official RedwoodSDK add-ons, we encourage contributors to follow our code style guidelines. These help ensure your add-on is easy to read, extend, and maintain—whether it’s used by a solo dev or a scaling team.
---

To maintain quality and consistency across official RedwoodSDK add-ons, we encourage contributors to follow these code style guidelines. These help ensure your add-on is easy to read, extend, and maintain—whether it’s used by a solo dev or a scaling team.

---

## 🧱 Architecture & Structure

- **Keep It Modular**
Break your logic into clear modules—preferably colocated. Use folders like /components, /routes, /actions, and /types.
- **Use Durable Objects for State**
Each add-on should encapsulate its own database logic within a Durable Object for clear isolation and scalability.
- **Avoid Framework-Level Magic**
Prefer transparent, readable code over overly abstracted utilities or patterns. RedwoodSDK favors explicit behavior over hidden conventions.

---

## ⚛️ React Guidelines
- **Use Functional Components**
Stick with functional React components and React Hooks.
- **Colocate State with Behavior**
Keep related state and logic close to where it’s used—this includes local hooks, useEffect, etc.
- **Follow Consistent Naming**
Use PascalCase for components (UserForm.tsx), camelCase for functions and variables, and kebab-case for route folder names.
- **Minimal Dependencies**
Avoid bringing in unnecessary component libraries or utility packages. If it can be built simply with native JavaScript, do it that way.

---

## 🗃 Data Access
- **Use Kysely for SQL**
All official add-ons should use [Kysely](https://kysely.dev/) for type-safe SQL queries. Avoid ORMs or other abstractions.
- **Types First**
Define types and interfaces for all DB rows, inputs, and outputs. Prefer zod for validation where necessary.
- **Avoid Cross-Add-On State**
Don’t assume access to another add-on’s data or functionality unless explicitly designed as a dependency.

---

## 🎨 UI & Styling
- **BaseUI Only**
Official add-ons should use [BaseUI](https://base-ui.com/react/overview/quick-start) as the primary component library. Avoid mixing multiple UI kits.
- **Custom Styling with Tailwind v4**
Use [Tailwind’s @layer](https://tailwindcss.com/) to inject custom styles. Avoid inline styles unless necessary.
- **Keep UI Optional**
Where possible, expose your add-on’s logic via hooks or service functions so it can be used headlessly or re-skinned.

---

## 🧪 Testing
- **Prefer Playwright or Vitest**
If testing is included, use [Vitest](https://vitest.dev/) for unit tests and [Playwright](https://playwright.dev/) for integration or E2E tests.
- **Test Business Logic First**
UI tests are great, but logic should be testable in isolation.

---

## ⚙️ Dev Experience
- **Use Vite Plugins When Needed**
If your add-on extends build behavior, wrap custom behavior as a Vite plugin—avoid complex CLI wrappers unless truly needed.
- **Autoload Routes Where Possible**
Organize routes within a folder and export a routes.ts file. Prefer declarative route configuration.
- **Follow RedwoodSDK Lint Rules**
Use the shared ESLint and Prettier configuration from RedwoodSDK where available.

---

📚 README Requirements

Every add-on must include a README.md that clearly documents:

1. **What the add-on does**
A brief summary of functionality and intended use cases.

2.	**Installation instructions**
Step-by-step setup that can be followed manually or by an AI agent.

This should include:
- Any required npm/yarn/pnpm install commands
- Any necessary route registration (prefix() example if applicable)
- Any configuration steps (e.g. tailwind.config, .env, or auth.ts)
- Instructions for seeding or initializing the add-on, if needed

3.	**Usage examples**
Show how to use the add-on, both in code (e.g. imports, hooks, or components) and within the UI if applicable.

4. **Dependencies**
Clearly list any packages your add-on requires that aren’t included by default in RedwoodSDK.

5. **Optional configuration**
Document any settings or options users can tweak.

**Goal:** If someone (or something) reads your README, they should be able to install and start using the add-on without asking questions.

Make your instructions copy-pasteable. Clarity and completeness are more valuable than cleverness.

---

## 📋 Submission Checklist

Before submitting your add-on for inclusion:

- ✅ Is your add-on self-contained and clearly scoped?
- ✅ Does it avoid global state and namespace collisions?
- ✅ Are types declared for all public interfaces?
- ✅ Are your dependencies minimal and justified?
- ✅ Does it work out of the box with no external setup?
- ✅ Does your add-on include a README?
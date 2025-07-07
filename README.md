# RedwoodSDK Addons Catalog

A community-driven catalog and index of all addons built for [RedwoodSDK](https://rwsdk.com). This platform allows developers to discover, submit, and manage addons that extend RedwoodSDK's functionality.

## Features

- **Addon Discovery**: Browse and search through community-created addons
- **Addon Submission**: Submit your own addons for the community
- **Admin Panel**: Manage addon submissions and user accounts
- **User Authentication**: Secure login with passkey support
- **Content Management**: Markdown-based content with syntax highlighting

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Cloudflare account (for deployment)

### Installation

```shell
git clone https://github.com/ahaywood/addons-site.git
cd addons-site
pnpm install
```

### Development

```shell
pnpm dev
```

The first time you run `pnpm dev` it will create the `.wrangler` directory with a `d1` database and all the necessary migrations and database seeds.

Point your browser to the URL displayed in the terminal (e.g. `http://localhost:5173/`).

## Deployment

```shell
pnpm release
```

## Project Structure

- `src/app/content` - contains Markdown files for all the content within the application (Docs, FAQs, and Legal pages)

## License

MIT

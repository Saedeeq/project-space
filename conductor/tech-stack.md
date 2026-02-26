# Technology Stack

## Core Technologies

### Programming Language
- **TypeScript 5.x** - Primary language for type-safe development
  - Strict mode enabled
  - ES2020+ target

### Frontend Framework
- **Next.js 14.2.13** - React framework with App Router
  - Server Components for optimal performance
  - Server Actions for mutations
  - File-based routing via `src/app/`

### UI Library
- **React 18** - Component library
  - Functional components with hooks
  - Concurrent rendering features

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
  - Custom configuration via `tailwind.config.ts`
  - Responsive design with mobile-first approach
  - Custom color palette and theme extensions

### Icons
- **Heroicons 2.2** - SVG icon library
  - Consistent icon sizing and styling
  - Tree-shakeable imports

### Database
- **MongoDB** - NoSQL document database
  - **Mongoose 8.9** - ODM for MongoDB
  - Schema-based data modeling
  - Connection pooling and query optimization

## Development Tools

### Linting & Formatting
- **ESLint 8** - Code quality
  - Next.js recommended configuration
  - TypeScript-aware rules
  - React hooks rules

### Build Tooling
- **PostCSS 8** - CSS processing
  - Autoprefixer for vendor prefixes
  - Tailwind CSS integration

### Type Definitions
- **@types/node** - Node.js types
- **@types/react** - React types
- **@types/react-dom** - React DOM types

## Runtime Environment
- **Node.js 20.x** - JavaScript runtime
- **npm** - Package management

## Deployment
- **Vercel** - Recommended deployment platform
  - Optimized for Next.js
  - Automatic SSL and CDN
  - Preview deployments for branches

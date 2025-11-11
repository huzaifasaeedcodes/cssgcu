# Computer Science Society Website - GCU Lahore

## Overview

This is a full-stack web application for the Computer Science Society at Government College University Lahore. The website serves as the central digital hub for the society, showcasing events, team members, announcements, and providing event registration capabilities. Built for the Tech Taakra 2025 Web Development Competition, it focuses on professional presentation with student-friendly accessibility.

The application is a single-page React application with a Node.js/Express backend, featuring modern UI components, responsive design, and a clean architectural approach suitable for a university society's digital presence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server, providing fast HMR and optimized production builds
- Wouter for lightweight client-side routing (single-page application)
- React Query (@tanstack/react-query) for server state management

**UI Component Strategy**
- shadcn/ui component library built on Radix UI primitives for accessible, composable components
- Tailwind CSS for utility-first styling with custom design tokens
- Component organization: reusable UI components in `client/src/components/ui/`, page-specific components in `client/src/components/`, and page layouts in `client/src/pages/`
- Design system follows "New York" style from shadcn/ui with custom typography (Poppins font family) and spacing scales defined in design guidelines

**State & Context Management**
- Theme context for light/dark mode toggling with localStorage persistence
- Form state managed with React Hook Form and Zod validation
- Toast notifications for user feedback

**Styling Approach**
- Custom CSS variables for theming (light/dark mode support)
- Grid-based layouts with Tailwind's responsive utilities
- Elevation/shadow system using custom utility classes (hover-elevate, active-elevate)
- Mobile-first responsive design with breakpoints at 768px (md) and 1024px (lg)

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for type-safe API development
- ESM module system throughout the codebase
- Custom middleware for request logging and JSON parsing
- Vite middleware integration for development mode with HMR

**Storage Layer**
- Abstracted storage interface (`IStorage`) allowing for pluggable implementations
- Currently implements in-memory storage (`MemStorage`) for development
- Designed to accommodate database migration (Drizzle ORM configured for PostgreSQL)
- Schema definitions use Drizzle ORM with Zod validation schemas

**API Design**
- RESTful API pattern (routes prefixed with `/api`)
- Placeholder route structure in `server/routes.ts` ready for CRUD operations
- Request/response logging middleware for debugging

**Development Workflow**
- Separate dev and production build processes
- Development: tsx for TypeScript execution with hot reload
- Production: esbuild for server bundling, Vite for client bundling

### Project Structure

```
client/          # Frontend application
  src/
    components/  # React components (UI library + custom)
    pages/       # Page-level components
    contexts/    # React context providers
    hooks/       # Custom React hooks
    lib/         # Utility functions and query client
server/          # Backend application
  index.ts       # Express server setup
  routes.ts      # API route definitions
  storage.ts     # Data storage abstraction
  vite.ts        # Vite development server integration
shared/          # Shared code between client/server
  schema.ts      # Database schema and Zod validators
```

### Data Flow

1. Client components use React Query hooks to fetch data from `/api` endpoints
2. API requests go through custom `apiRequest` wrapper with error handling
3. Backend routes interact with storage interface for CRUD operations
4. Form submissions use Zod schemas for validation on both client and server

### Design System

Typography hierarchy based on Poppins font family with specific size scales (Hero: 56px, H2: 40px, H3: 24px, Body: 16px). Spacing follows Tailwind units (4px increments) with consistent padding and gap values. Color system uses HSL-based CSS variables for theme switching, with separate palettes for light and dark modes.

## External Dependencies

### UI & Styling
- **Radix UI**: Comprehensive collection of accessible, unstyled UI primitives (@radix-ui/react-*)
- **Tailwind CSS**: Utility-first CSS framework with PostCSS/Autoprefixer
- **class-variance-authority**: Utility for creating variant-based component APIs
- **tailwind-merge**: Utility for merging Tailwind classes without conflicts
- **Embla Carousel**: Carousel/slider functionality for image galleries
- **Lucide React**: Icon library
- **React Icons**: Additional icon sets (used for GitHub icon)

### Forms & Validation
- **React Hook Form**: Form state management with performance optimization
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Integrates Zod with React Hook Form

### Data Fetching
- **@tanstack/react-query**: Server state management, caching, and synchronization

### Database (Configured but not active)
- **Drizzle ORM**: TypeScript ORM for SQL databases
- **@neondatabase/serverless**: PostgreSQL driver for serverless/edge environments
- **drizzle-zod**: Generate Zod schemas from Drizzle tables
- **drizzle-kit**: CLI tool for migrations and schema management

### Routing & Navigation
- **Wouter**: Minimalist routing library (< 2KB alternative to React Router)

### Build Tools
- **Vite**: Build tool and dev server with React plugin
- **esbuild**: Fast JavaScript bundler for production server code
- **TypeScript**: Type checking and compilation
- **tsx**: TypeScript execution for development

### Development Tools (Replit-specific)
- **@replit/vite-plugin-runtime-error-modal**: Runtime error overlay
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development environment banner

### Utilities
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional className utility
- **cmdk**: Command palette component
- **nanoid**: Unique ID generation

### Session Management (Installed but not configured)
- **connect-pg-simple**: PostgreSQL session store (ready for when database is added)
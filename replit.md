# Deploy Platform - Replit Configuration

## Overview

This is a full-stack web application built for deployment management, featuring a modern dashboard for managing projects, deployments, domains, and GitHub integrations. The system uses a React frontend with TypeScript and Express.js backend, styled with Tailwind CSS and shadcn/ui components.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with structured error handling
- **Database**: PostgreSQL using Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL session store
- **Development**: Hot module replacement with Vite integration

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` for type-safe database operations
- **Migrations**: Managed through Drizzle Kit
- **Connection**: Neon Database serverless connection

## Key Components

### Database Schema
The application manages five main entities:
- **Projects**: Core deployment projects with status tracking
- **Deployments**: Individual deployment records with build status
- **Domains**: Domain management with SSL and custom domain support
- **Repositories**: GitHub repository connections
- **Activities**: Activity feed for tracking system events

### UI Components
- Dark-themed deployment dashboard with blue accent colors
- Comprehensive component library using Radix UI primitives
- Responsive design with mobile-first approach
- Custom styling with CSS variables for theming

### API Structure
- RESTful endpoints for CRUD operations on all entities
- Input validation using Zod schemas
- Structured error handling with proper HTTP status codes
- Request/response logging for development debugging

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **Server Processing**: Express routes handle requests, validate input, and interact with database
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Handling**: Structured JSON responses with error handling
5. **State Updates**: TanStack Query manages caching and state synchronization

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless database connection
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router
- **zod**: Runtime type validation

### UI Dependencies
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe CSS class variants
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Static type checking
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development Environment
- **Command**: `npm run dev`
- **Features**: Hot module replacement, error overlays, development logging
- **Database**: Uses DATABASE_URL environment variable

### Production Build
- **Frontend**: Vite builds optimized static assets
- **Backend**: esbuild bundles server code with ESM format
- **Output**: Separate dist folders for client and server builds

### Database Management
- **Schema Changes**: `npm run db:push` applies schema changes
- **Migrations**: Stored in `migrations/` directory
- **Environment**: Requires DATABASE_URL environment variable

## Changelog

- July 04, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.
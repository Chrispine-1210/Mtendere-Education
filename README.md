# Mtendere Education Consult - Full Stack Web Application

## Overview

This is a full-stack web application for Mtendere Education Consult, an educational consultancy platform that helps students apply to international universities and access scholarships. The application features a modern React frontend with a Node.js/Express backend, using PostgreSQL for data persistence.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js with middleware for CORS, JSON parsing, and request logging
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **File Uploads**: Multer middleware for handling CV and transcript uploads
- **Web Scraping**: JSDOM for extracting content from external educational websites

### Database Design
- **Users Table**: Authentication and role-based access (admin/user/applicant)
- **Applications Table**: Student application data with file references
- **Blog Posts Table**: Content management with publish/draft states
- **Site Data Table**: Dynamic content scraped from external sources
- **Media Files Table**: File metadata and storage references

## Key Components

### Authentication System
- JWT token-based authentication stored in localStorage
- Role-based access control (admin, user, applicant)
- Protected routes for admin functionality
- Automatic token validation and refresh

### Application Management
- Complete student application workflow
- File upload system for CVs and transcripts
- Application status tracking (pending, approved, rejected)
- Admin dashboard for application review and management

### Content Management System
- Dynamic blog post creation and management
- Rich text editing capabilities
- Image upload and media management
- Content publication workflow

### Web Scraping Integration
- Automated content extraction from educational websites
- Dynamic site data updates for hero sections, services, and testimonials
- Structured data storage for consistent display

## Data Flow

1. **User Registration/Login**: Users register through the frontend, credentials are validated against the database, JWT tokens are issued for authenticated sessions
2. **Application Submission**: Students fill out application forms, upload documents, data is validated and stored with pending status
3. **Admin Review**: Admins access protected routes, review applications, update statuses, manage user accounts
4. **Content Updates**: Admins can create/edit blog posts, update site content, trigger web scraping updates
5. **File Management**: Uploaded files are stored in the uploads directory, metadata is tracked in the database

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database adapter for serverless environments
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Accessible UI component primitives
- **drizzle-orm**: Type-safe SQL query builder and ORM
- **bcrypt**: Password hashing and validation
- **jsonwebtoken**: JWT token generation and verification
- **multer**: Multipart form data handling for file uploads
- **jsdom**: DOM manipulation for web scraping

### Development Dependencies
- **typescript**: Static type checking
- **vite**: Fast build tool and development server
- **tailwindcss**: Utility-first CSS framework
- **tsx**: TypeScript execution for Node.js

## Deployment Strategy

### Development Environment
- Vite development server with HMR (Hot Module Replacement)
- PostgreSQL database with Drizzle migrations
- File uploads stored locally in uploads directory
- Environment variables for database connection and JWT secrets

### Production Deployment
- **Build Process**: Vite builds client-side assets, esbuild bundles server code
- **Database**: PostgreSQL with connection pooling via Neon Database
- **File Storage**: Local file system with configurable upload directory
- **Environment**: NODE_ENV-based configuration switching
- **Port Configuration**: Configurable port binding (default 5000)

### Replit Configuration
- Modules: nodejs-20, web, postgresql-16
- Auto-deployment with build and start scripts
- Port forwarding from internal 5000 to external 80
- Database provisioning through Replit's PostgreSQL module

## Changelog

Changelog:
- June 27, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.
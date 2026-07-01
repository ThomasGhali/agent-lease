![Next.js](https://img.shields.io/badge/Next.js-v16-black?style=flat&logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-v11-E0234E?style=flat&logo=nestjs&logoColor=white)
![React](https://img.shields.io/badge/React-v19-20232A?style=flat&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.2-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Auth&DB-3ECF8E?style=flat&logo=supabase&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat&logo=prisma&logoColor=white)
![License: All Rights Reserved](https://img.shields.io/badge/License-All_Rights_Reserved-red?style=flat)

# Agent Lease - Full-Stack AI SaaS Platform

## Video placeholder

**Agent Lease** is a production-ready SaaS platform that allows users to deploy customizable AI chat agents to any website in **under 3 minutes**. It pairs a frictionless, no-code integration widget with a robust, scalable backend—featuring **real-time WebSockets**, **automated Stripe billing**, and **comprehensive usage analytics** for users and **advanced global analytics** for admins.

<div align="center">

# [Live Demo <img src="https://www.svgrepo.com/show/450126/external-link.svg" width="20" height="20" />](placeholder-url)
</div>

<a name="toc"></a> <!-- Table of Contents reference -->

## Table of Contents placeholder

## Architecture & Data Flow

```mermaid
flowchart LR
    %% Styling Classes
    classDef frontend fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff
    classDef backend fill:#0f172a,stroke:#ef4444,stroke-width:2px,color:#fff
    classDef database fill:#0f172a,stroke:#10b981,stroke-width:2px,color:#fff
    classDef external fill:#0f172a,stroke:#8b5cf6,stroke-width:2px,color:#fff
    classDef client fill:#f8fafc,stroke:#cbd5e1,stroke-width:2px,color:#0f172a

    subgraph Clients ["👥 Clients"]
        direction TB
        User(["User Client"]):::client
        Widget(["Embeddable Widget"]):::client
        Admin(["Admin Interface"]):::client
    end

    subgraph Frontend ["🖥️ Next.js Frontend"]
        direction TB
        WebApp["Web App (Dashboard/UI)"]:::frontend
    end

    subgraph Backend ["⚙️ NestJS Backend"]
        direction TB
        API["REST API"]:::backend
        ChatGateway{"WebSocket Gateway"}:::backend
        ChatService["Chat & AI Service"]:::backend
        WebhookSvc["Webhook Processor"]:::backend
    end

    subgraph Data ["🗄️ Database & Cache"]
        PrismaDB[("PostgreSQL (Prisma)")]:::database
        Redis[("Upstash Redis")]:::database
    end

    subgraph External ["🌐 External APIs"]
        direction TB
        Supabase[("Supabase Auth")]:::external
        Stripe[("Stripe API")]:::external
        LLM[("Groq / Llama 3")]:::external
    end

    %% Client Interactions
    User -->|Login / Manage| WebApp
    Admin -->|View Metrics| WebApp
    Widget -->|Real-time Chat| ChatGateway

    %% Frontend connections
    WebApp -->|Auth / Session| Supabase
    WebApp -->|HTTP API Requests| API
    WebApp -->|Checkout| Stripe

    %% Backend & External
    API -.->|Verify JWT| Supabase
    API -->|Read / Write| PrismaDB

    ChatGateway <-->|WS Events| ChatService
    ChatService <-->|Prompt & Stream| LLM
    ChatService <-->|Cache & Pub/Sub| Redis
    ChatService -->|Store History| PrismaDB

    Stripe -.->|Webhooks| WebhookSvc
    WebhookSvc -->|Update Subs| PrismaDB
```

## Core Features
### 1. Onboarding & Configuration
Modern sign in/up UI using **Tailwind CSS** & **Shadcn UI**, backed by **Supabase Auth** secure session management.

### 2. 






| <!--                         | Feature                                                                              | Description | Status |
| :--------------------------- | :----------------------------------------------------------------------------------- | :---------: |
| **Embeddable Chat Widget**   | Deploy AI agents to any website via a single `<script>` tag.                         |      ✅      |
| **Real-time AI Chat**        | WebSocket-powered interface with streaming AI responses using Llama 3/3.3 via Groq.  |      ✅      |
| **Agent Management**         | Create, edit, and manage multiple AI agents with subscription-based limits.          |      ✅      |
| **White-labeling & Config**  | Customize agent system prompts, roles, fallback messages, and UI theme colors.       |      ✅      |
| **Domain Whitelisting**      | Restrict widget embedding to authorized domains to prevent quota theft.              |      ✅      |
| **Chat Transcript Viewer**   | Browse historical conversations and read past chat sessions from the dashboard.      |      ✅      |
| **User Analytics Dashboard** | Monitor agent performance, track token usage metrics, and view real-time statistics. |      ✅      |
| **Subscription Billing**     | Stripe-powered subscription system handling Free, Premium, and Enterprise tiers.     |      ✅      |
| **Quotas & Rate Limiting**   | Enforce message quotas, token limits, and rate limiting based on active plans.       |      ✅      |
| **Admin Analytics**          | Monitor global platform usage, active subscriptions, revenue, and system stats.      |      ✅      |
| **Chat History Persistence** | Store conversations reliably in Redis (fast-access) and PostgreSQL (long-term).      |      ✅      |
| **Auth & RBAC**              | Secure login and protected routes using Supabase, with Role-Based Access Control.    |      ✅      |
| **Payment Management**       | Handle Stripe checkouts, customer portals, and webhook-driven lifecycle events.      |      ✅      |
| **WebSocket Infrastructure** | Scalable real-time communication layer with strict authentication guards.            |      ✅      |
| **Redis Caching Layer**      | High-performance caching and ephemeral chat persistence using Upstash Redis.         |      ✅      |
| **Database & ORM**           | Type-safe relational data modeling and querying using Prisma ORM and PostgreSQL.     |      ✅      |
| **Schema Validation**        | End-to-end type safety using shared Zod validation schemas across the stack.         |      ✅      |
| **Monorepo Architecture**    | Turborepo-powered workspace enabling shared packages and fast builds.                |      ✅      |
| **Dark Mode Support**        | Built-in dark and light theme support across the dashboard and embeddable widget.    |      ✅      |
| **Automated Testing**        | Jest-powered testing infrastructure for API stability and core flows.                |      ⚠️      | -->    |
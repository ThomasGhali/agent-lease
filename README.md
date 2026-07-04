![Next.js](https://img.shields.io/badge/Next.js-v16-black?style=flat&logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-v11-E0234E?style=flat&logo=nestjs&logoColor=white)
![React](https://img.shields.io/badge/React-v19-20232A?style=flat&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.2-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Auth&DB-3ECF8E?style=flat&logo=supabase&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat&logo=prisma&logoColor=white)
![License: All Rights Reserved](https://img.shields.io/badge/License-All_Rights_Reserved-red?style=flat)

# Agent Lease - Full-Stack AI SaaS Platform

**[🔴 Live Demo](placeholder-url)** | **[▶️ Watch the 90-Second Walkthrough](#video-placeholder)**

**Agent Lease** is a production-ready SaaS platform that allows users to deploy customizable AI chat agents to any website in **under 3 minutes**. It pairs a frictionless, no-code integration widget with a robust, scalable backend—featuring **real-time WebSockets**, **automated Stripe billing**, and **comprehensive analytics**. Engineered as a Turborepo monorepo, it demonstrates strict end-to-end type safety, modern infrastructure, and robust enterprise-grade features.

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

<a name="toc"></a>
## Table of Contents

- [Agent Lease - Full-Stack AI SaaS Platform](#agent-lease---full-stack-ai-saas-platform)
  - [Architecture \& Data Flow](#architecture--data-flow)
  - [Table of Contents](#table-of-contents)
  - [User Journey Walkthrough](#user-journey-walkthrough)
    - [1. Secure Authentication \& Agent Management](#1-secure-authentication--agent-management)
    - [2. Frictionless Widget Integration](#2-frictionless-widget-integration)
    - [3. Professional, Context-Aware AI Chat](#3-professional-context-aware-ai-chat)
    - [4. Comprehensive User Analytics \& Monetization](#4-comprehensive-user-analytics--monetization)
    - [5. Global Admin Console](#5-global-admin-console)
  - [Engineering \& Infrastructure](#engineering--infrastructure)
  - [Getting Started / Local Development](#getting-started--local-development)
    - [1. Environment Configuration](#1-environment-configuration)
    - [2. Installation \& Database Setup](#2-installation--database-setup)
    - [3. Running the Ecosystem](#3-running-the-ecosystem)

## User Journey Walkthrough

### 1. Secure Authentication & Agent Management
A new user's journey begins with a seamless onboarding experience backed by **Supabase Auth** and styled with **Tailwind CSS & Shadcn UI**. After signing in, the client is redirected to their dashboard where they can securely provision and configure a new AI agent. Strict `zod` validation enforces tier-based resource limits from the moment of creation.

<div align="center">
    <br>
    <img src="docs/sign-up.jpg" width="80%">
    <br><small><i>1. The client registers for a new account.</i></small>
    <br><br>
    <img src="docs/create-agent.jpg" width="80%">
    <br><small><i>2. The client provisions and configures their custom AI agent.</i></small>
    <br><br>
    <img src="docs/initial-user-dashboard.jpg" width="80%">
    <br><small><i>3. The client views their dashboard. The agent has been added.</i></small>
</div>

> **Security Note:** Agents are cryptographically bound to specific whitelisted domains to prevent unauthorized cross-site embedding.

<div align="right"><a href="#toc"><b>⤴ Back to Contents</b></a></div>

### 2. Frictionless Widget Integration
Integration is designed for zero friction. Once the agent is provisioned, the client receives framework-agnostic setup instructions. By pasting a single `<script>` tag, they instantly deploy a fully functional, responsive chat bubble to their live website.

<div align="center">
    <br>
    <img src="docs/agent-setup.jpg" width="80%">
    <br><small><i>4. The client receives a single-line embed script.</i></small>
    <br><br>
    <img src="docs/code-embed.png" width="80%">
    <br><small><i>5. The client adds the script to their website's HTML.</i></small>
    <br><br>
    <img src="docs/bubble-appear.jpg" width="80%">
    <br><small><i>6. The live AI chat widget immediately appears on their platform.</i></small>
</div>

<div align="right"><a href="#toc"><b>⤴ Back to Contents</b></a></div>

### 3. Professional, Context-Aware AI Chat
As visitors interact with the widget, the conversational engine utilizes **WebSockets** for sub-second streaming. The AI is sandboxed via system prompts to exclusively discuss authorized company data, maintaining a professional tone while strictly refusing unrelated queries.

<div align="center">
    <br>
    <img src="docs/7.2-unrelated-question.png" width="50%">
    <br><small><i>7. The AI strictly enforces boundary guardrails on off-topic questions.</i></small>
    <br><br>
    <img src="docs/7.2-related-question.png" width="50%">
    <br><small><i>8. The AI provides highly accurate, context-aware responses.</i></small>
    <br><br>
    <img src="docs/7.2-limit-reached.png" width="50%">
    <br><small><i>9. Usage limits are dynamically enforced mid-conversation.</i></small>
</div>

> **Infrastructure:** Chats are highly responsive thanks to an **Upstash Redis** caching layer, with asynchronous persistence to **PostgreSQL** for long-term chat transcript review.

<div align="right"><a href="#toc"><b>⤴ Back to Contents</b></a></div>

### 4. Comprehensive User Analytics & Monetization
The client monitors their usage through a dynamic, heavily-cached Next.js dashboard detailing agent performance and token consumption. After eventually exhausting their free quota (as seen in the previous chat), they are seamlessly routed through a **Stripe Checkout** flow to upgrade their subscription tier.

<div align="center">
    <br>
    <img src="docs/combined-payment.png" width="80%">
    <br><small><i>10. After hitting their quota, the client upgrades to a Premium plan via a secure Stripe Checkout session.</i></small>
    <br><br>
    <img src="docs/dashboard-after-upgrade.jpg" width="80%">
    <br><small><i>11. The dashboard instantly reflects the upgraded plan and massively increased token limits.</i></small>
</div>

<div align="right"><a href="#toc"><b>⤴ Back to Contents</b></a></div>

### 5. Global Admin Console
Meanwhile, on the backend, platform owners have real-time visibility into critical business metrics. A dedicated admin portal tracks the new active subscription, MRR (Monthly Recurring Revenue), and global token consumption across all user tiers.

<div align="center">
    <br>
    <img src="docs/admin-dashboard-post-upgrade.jpg" width="80%">
    <br><small><i>12. The admin portal registers the new revenue and subscription metrics in real-time.</i></small>
</div>

<div align="right"><a href="#toc"><b>⤴ Back to Contents</b></a></div>

## Engineering & Infrastructure

While the user journey highlights the frontend capabilities, the backend is engineered for horizontal scalability, data integrity, and strict type safety.

| System                        | Technical Implementation                                                                                                    |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| **Monorepo Architecture**     | Turborepo workspace managing shared packages and independent builds across Next.js and NestJS.                              |
| **Real-time Infrastructure**  | Scalable WebSocket layer using NestJS gateways, secured by custom JWT authentication guards.                                |
| **Hybrid Data Persistence**   | Upstash Redis for sub-second, ephemeral chat caching and pub/sub, syncing to PostgreSQL for long-term storage.              |
| **End-to-End Type Safety**    | Shared Zod validation schemas enforcing identical data contracts across the frontend UI, API routes, and Prisma ORM models. |
| **Role-Based Access Control** | Supabase Auth integrated with custom backend middleware to strictly separate User and Admin data access.                    |
| **Automated Testing**         | Jest-powered e2e testing infrastructure ensuring core API stability and billing webhook reliability. *(WIP)*                |

---

## Getting Started / Local Development

To run this Turborepo ecosystem locally, ensure you have **Node.js** (v18+), **npm**, and a running **PostgreSQL** instance.

### 1. Environment Configuration
Copy the `.env.example` file to `.env` in the root directory:
```bash
cp .env.example .env
```
You will need to provision and configure keys for the following third-party services:
- **Database**: PostgreSQL connection (`DATABASE_URL`, `DIRECT_URL`)
- **Supabase**: Auth (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`)
- **Stripe**: Billing (`STRIPE_SECRET_KEY`, `WEBHOOK_SECRET_KEY`)
- **Groq**: Llama 3/3.3 API access (`GROQ_API_KEY`)
- **Upstash Redis**: Serverless caching (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`)

### 2. Installation & Database Setup
Run the following commands from the root workspace:

```bash
# 1. Clone the repository
git clone https://github.com/thomasghali/agent-lease.git
cd agent-lease

# 2. Install dependencies across the monorepo
npm install

# 3. Push the Prisma schema to your PostgreSQL database
npm run db:push
```

### 3. Running the Ecosystem

You need two terminal windows to run the full application locally, including the Stripe webhook listener.

**Terminal 1: Start the Turborepo Server**
```bash
npm run dev
```
*(This starts the Next.js frontend on port 3000, NestJS API on 3001, and WebSocket gateway on 3002).*

**Terminal 2: Forward Stripe Webhooks**
Stripe must be able to hit your local server to process plan upgrades during checkout.
```bash
stripe login
stripe listen --forward-to localhost:3001/webhook
```
*(Copy the generated webhook signing secret into your `.env` as `WEBHOOK_SECRET_KEY` and restart Terminal 1).*
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
### 1. Onboarding
Modern sign in/up UI using **Tailwind CSS** & **Shadcn UI**, backed by **Supabase Auth** secure session management.

<div align="center">
    <img src="docs/sign-up.jpg">
    <small>User Signing up</small>
</div>

<div align="right">
  <a href="#toc"><b>⤴ Back to Contents</b></a>
</div>

### 2. Dashboard
Built using **Shadcn UI + Tailwind CSS** as well.

Once signed in, the user is **redirected to the dashboard** where he can create and manage his AI agents (empty so far, but we'll create one next).

<div align="center">
    <div><img src="docs/no-agents.jpg" ></div>
    <small>Dashboard > My Agents (empty state)</small>
</div>

<div align="right">
  <a href="#toc"><b>⤴ Back to Contents</b></a>
</div>

### 3. Create Agent
Create & configure a custom AI agent Through a secure form. `zod` validation used to **ensure limits met**.

<div align="center">
    <img src="docs/create-agent.jpg">
    <small>Creating an agent</small>
</div>

> **Notes:**
> - the agent created **only works with the provided domain and no other**; this is a security precaution to prevent being used on other websites without permission from the agent owner (the creator).
> - Form is **secured against DDOS attacks and abuses** using rate limiting.

<div align="right">
  <a href="#toc"><b>⤴ Back to Contents</b></a>
</div>

### 4. Easy Integration
After creation the user is redirected to a setup page, you can **easily integrate the agent** by following simple instructions given that is customizable to your stack and environment, non-coders can apply this easily from their github by following the guide.

<div align="center">
    <img src="docs/agent-setup.jpg">
    <small>Agent Setup Guide</small>
</div>

<div align="right">
  <a href="#toc"><b>⤴ Back to Contents</b></a>
</div>

## 5. Control Agents behavior
Editing agents configuration can be easily done using the `My Agents` page in your dashboard.
<div align="center">
    <img src="docs/agent-edit.png">
    <small>Editing agents configuration</small>
</div>

<div align="right">
  <a href="#toc"><b>⤴ Back to Contents</b></a>
</div>

## 6. Add Agent to your website
Focused on ease of implementation, you only need to copy-paste the script line to you main `.html` file and you'll get your customized agent ready to go instantly!

<div align="center">
    <img src="docs/agent-embed.png">
    <small>Adding agent to your website</small>
</div>

<div align="right">
  <a href="#toc"><b>⤴ Back to Contents</b></a>
</div>

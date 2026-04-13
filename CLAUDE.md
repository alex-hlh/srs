# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**星环空间 (Stellar Ring Space, SRS)** is an enterprise SaaS office system with a microservices architecture. This repository contains project documentation (not source code) for system reproduction.

---

## Repository Structure

```
srs/
├── 01-环境搭建指南.md      # Environment setup (JDK/Maven/Node/Middleware)
├── 02-部署架构文档.md      # Docker deployment & container orchestration
├── 03-API接口规范.md      # API specifications & authentication flow
├── 04-配置文件模板.md      # Configuration templates (application.yml)
├── 05-系统架构文档.md      # System architecture (module relationships)
├── 06-安全设计文档.md      # Security design (JWT/RBAC/SM4 encryption)
├── 07-测试规范文档.md      # Testing standards (unit/integration/E2E)
├── 08-运维手册.md          # Operations guide (monitoring/alerting)
├── 09-开发规范文档.md      # Development standards (Java/Vue/SQL/Git)
├── init_mysql.sql          # Database initialization script
├── 数据库设计文档.md        # Database schema (ER diagrams/table designs)
├── 功能清单文档.md          # Feature list & page inventory
├── UI设计文档.md           # UI design & component specifications
├── 复刻技术栈文档.md       # Complete tech stack reference
├── React迁移方案.md         # Vue → React migration plan
├── 依赖升级方案.md         # JDK 17 / Spring Boot 3.x upgrade plan
└── README.md              # Project documentation index
```

---

## Build & Development Commands

### Backend (srs-platform)
```bash
cd srs-platform
mvn clean install -DskipTests           # Build entire project
mvn -pl srs-center -am clean compile    # Build specific module
cd srs-ctrl && mvn spring-boot:run     # Run module
```

### Frontend (srs-ui)
```bash
cd srs-ui
yarn install                            # Install dependencies
yarn dev                                # Development server (port 3000)
yarn build                              # Production build
```

### Database
```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS srs_db DEFAULT CHARACTER SET utf8mb4;"
mysql -u root -p srs_db < init_mysql.sql
```

---

## Architecture Summary

### Backend (Spring Boot Microservices)
- **srs-gateway** (8080) - Spring Cloud Gateway, routing/limiting/auth
- **srs-center** (8081) - Unified authentication center, CAS SSO, JWT
- **srs-ctrl** (8082) - Intelligent control platform, business logic
- **srs-doc-center** (8083) - Document management
- **srs-meeting** (8084) - Video conferencing
- **common/** - Shared modules: base, component (Redis/MinIO/ES/RocketMQ), utils

### Frontend (React 18)
- **React 18** + TypeScript + Vite
- **Ant Design 5.x** + React Router 6
- **Zustand** for state management
- **@tanstack/react-query** for server state

### Data Layer
- Multi-database support: MySQL 8.0 / DAMENG / Oracle / PostgreSQL
- Read/write splitting with Druid connection pool
- Redis caching + RocketMQ messaging + Elasticsearch search + MinIO storage

---

## Key Security Features

- **Authentication**: JWT Token + CAS SSO single sign-on
- **Authorization**: RBAC with menu/button-level permissions
- **Password**: SM4 (national cipher) + MD5 salt hashing
- **API Protection**: Rate limiting + signature verification

---

## Common Dev Tasks

| Task | Command |
|------|---------|
| Start backend | `mvn spring-boot:run` in srs-ctrl module |
| Start frontend | `yarn dev` in srs-ui |
| Run SQL | `mysql -u root -p srs_db < init_mysql.sql` |
| Check port | `lsof -i :3000` or `lsof -i :8082` |

---

## Documentation Priority (P0 = Critical)

| Priority | Documents |
|----------|-----------|
| P0 | 01-环境搭建指南, 02-部署架构文档, 03-API接口规范, 04-配置文件模板, 10-分阶段实施方案 |
| P1 | 05-系统架构文档, 06-安全设计文档, 07-测试规范文档, 08-运维手册 |
| P2 | 09-开发规范文档, React迁移方案, 依赖升级方案 |

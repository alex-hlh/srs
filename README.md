# 星环空间 (Stellar Ring Space, SRS)

企业级 SaaS 办公系统，采用微服务架构。

---

## 技术栈

### 后端

| 组件 | 版本 |
|------|------|
| JDK | 21 |
| Spring Boot | 3.2.3 |
| Spring Cloud | 2023.0.0 |
| MyBatis-Plus | 3.5.5 |
| Druid | 1.2.21 |
| Redis | 6.x / 7.x |
| RocketMQ | 5.2.0 |
| Elasticsearch | 8.12.2 |
| MinIO | 8.5.9 |

### 前端

| 组件 | 版本 |
|------|------|
| React | 18.x |
| TypeScript | 5.x |
| Vite | 5.x |
| Ant Design | 5.x |
| React Router | 6.x |
| Zustand | 4.x |

---

## 项目结构

```
srs/
├── srs-platform/                # Java 后端 (Spring Boot)
│   ├── srs-gateway/            # 安全网关 (8080)
│   ├── srs-center/             # 统一认证中心 (8081)
│   ├── srs-ctrl/               # 智能管控平台 (8082)
│   ├── srs-doc-center/         # 文档中心 (8083)
│   ├── srs-meeting/            # 视频会议 (8084)
│   ├── common/
│   │   ├── base/               # 基础框架
│   │   ├── component/          # 公共组件
│   │   └── utils/              # 工具类
│   └── pom.xml
│
├── srs-ui/                      # React 前端
│   ├── src/
│   │   ├── api/                # API 接口
│   │   ├── components/         # 公共组件
│   │   ├── pages/              # 页面
│   │   ├── routes/             # 路由配置
│   │   ├── store/              # Zustand 状态
│   │   └── utils/              # 工具函数
│   └── package.json
│
└── init_mysql.sql               # 数据库初始化脚本
```

---

## 快速开始

### 环境要求

- JDK 21
- Maven 3.8+
- Node.js 18+
- MySQL 8.0
- Redis 7.x

### 后端启动

```bash
cd srs-platform
mvn clean install -DskipTests
cd srs-gateway && mvn spring-boot:run    # 端口 8080
cd srs-center && mvn spring-boot:run     # 端口 8081
cd srs-ctrl && mvn spring-boot:run       # 端口 8082
```

### 前端启动

```bash
cd srs-ui
yarn install
yarn dev    # 端口 3000
```

### 数据库初始化

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS srs_db DEFAULT CHARACTER SET utf8mb4;"
mysql -u root -p srs_db < init_mysql.sql
```

---

## 文档索引

| 编号 | 文档 | 说明 |
|------|------|------|
| 01 | [环境搭建指南](./01-环境搭建指南.md) | JDK/Maven/Node/中间件安装 |
| 02 | [部署架构文档](./02-部署架构文档.md) | Docker 部署与容器编排 |
| 03 | [API接口规范](./03-API接口规范.md) | 接口定义与认证流程 |
| 04 | [配置文件模板](./04-配置文件模板.md) | application.yml 配置示例 |
| 05 | [系统架构文档](./05-系统架构文档.md) | 模块关系与部署架构 |
| 06 | [安全设计文档](./06-安全设计文档.md) | 认证授权/加密/RBAC |
| 07 | [测试规范文档](./07-测试规范文档.md) | 单元/集成/E2E 测试 |
| 08 | [运维手册](./08-运维手册.md) | 监控/告警/故障处理 |
| 09 | [开发规范文档](./09-开发规范文档.md) | Java/SQL/Git 规范 |
| - | [数据库设计文档](./数据库设计文档.md) | ER图/表结构/索引 |
| - | [功能清单文档](./功能清单文档.md) | 功能模块清单 |
| - | [UI设计文档](./UI设计文档.md) | 页面布局/组件设计 |
| - | [复刻技术栈文档](./复刻技术栈文档.md) | 完整技术栈参考 |

---

## 主要功能

- 用户管理 / 角色管理 / 权限管理
- 部门管理 / 字典管理
- 应用管理 / 服务管理
- 文档上传下载
- 统一认证 (JWT + CAS SSO)
- RBAC 菜单/按钮级权限控制

---

*最后更新: 2026-04-14*

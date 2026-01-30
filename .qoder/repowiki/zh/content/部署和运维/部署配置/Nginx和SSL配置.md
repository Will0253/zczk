# Nginx和SSL配置

<cite>
**本文引用的文件**
- [nginx.conf](file://ops/nginx/nginx.conf)
- [sites.conf](file://ops/nginx/sites.conf)
- [init-cert.sh](file://ops/docker/init-cert.sh)
- [certbot-renew.sh](file://ops/docker/certbot-renew.sh)
- [docker-compose.prod.yml](file://ops/docker/docker-compose.prod.yml)
- [docker-compose.dev.yml](file://ops/docker/docker-compose.dev.yml)
- [.env.prod.example](file://ops/.env.prod.example)
- [.env.dev.example](file://ops/.env.dev.example)
- [deploy.sh](file://ops/deploy.sh)
- [Dockerfile.backend](file://ops/docker/Dockerfile.backend)
- [Dockerfile.frontend](file://ops/docker/Dockerfile.frontend)
- [README.md](file://ops/README.md)
- [healthz.ts](file://backend/src/api/healthz/routes/healthz.ts)
- [route.ts](file://frontend/app/healthz/route.ts)
</cite>

## 更新摘要
**所做更改**
- 更新了Nginx站点配置文件，整合了自动HTTP到HTTPS重定向和严格安全头设置
- 新增了WebSocket支持配置，包括升级头处理
- 完善了SSL证书管理流程，包含证书初始化和续期脚本
- 更新了容器编排配置，明确了服务依赖关系和网络配置
- 增强了健康检查机制，支持前后端服务的独立监控

## 目录
1. [简介](#简介)
2. [项目结构](#项目结构)
3. [核心组件](#核心组件)
4. [架构总览](#架构总览)
5. [详细组件分析](#详细组件分析)
6. [依赖关系分析](#依赖关系分析)
7. [性能考虑](#性能考虑)
8. [故障排除指南](#故障排除指南)
9. [结论](#结论)
10. [附录](#附录)

## 简介
本文件面向运维团队，系统化梳理本项目的 Nginx 反向代理与 SSL 证书自动化管理方案。内容涵盖：
- Nginx 主配置与站点配置的结构与职责
- HTTP 到 HTTPS 的自动重定向策略与虚拟主机配置
- 静态资源与健康检查的路径组织
- Let's Encrypt 证书的获取、安装与自动续期流程
- 严格安全头设置、缓存与性能优化建议
- WebSocket 支持配置和证书管理脚本的使用方法
- 常见问题排查步骤

## 项目结构
本项目采用"容器化 + 反向代理"的生产部署架构，Nginx 作为统一入口，负责：
- HTTP/HTTPS 流量接入与自动重定向
- 反向代理到前端 Next.js 与后端 Strapi
- SSL/TLS 终止与证书管理（通过 Certbot）
- WebSocket 升级支持与严格安全头设置

```mermaid
graph TB
subgraph "外部访问"
U["用户浏览器"]
end
subgraph "生产环境容器"
NGINX["Nginx<br/>反向代理/SSL终止/WebSocket支持"]
FE["Frontend Next.js<br/>:3000"]
BE["Backend Strapi<br/>:1337"]
PG["PostgreSQL<br/>:5432"]
CERT["Certbot<br/>证书管理"]
end
U --> NGINX
NGINX --> FE
NGINX --> BE
BE --> PG
NGINX -.-> CERT
```

**章节来源**
- [docker-compose.prod.yml](file://ops/docker/docker-compose.prod.yml#L1-L153)

## 核心组件
- Nginx 反向代理与 SSL 终止
  - HTTP 80 端口监听，处理 Let's Encrypt ACME 挑战与全站 301 自动重定向至 HTTPS
  - HTTPS 443 端口监听，启用 http2，配置 TLS 协议与密码套件，加载 Let's Encrypt 证书
  - 设置严格安全响应头，强化传输安全与浏览器防护
- Certbot 证书管理
  - 首次部署时通过 standalone 模式申请证书
  - 定时任务每日检查续期，成功后自动触发 Nginx 重载
- 健康检查与静态资源
  - 提供 /healthz 与 /.well-known/acme-challenge/ 路径，便于探活与挑战验证
- WebSocket 支持
  - 配置升级头处理，支持实时通信功能

**章节来源**
- [sites.conf](file://ops/nginx/sites.conf#L1-L63)
- [init-cert.sh](file://ops/docker/init-cert.sh#L1-L31)
- [certbot-renew.sh](file://ops/docker/certbot-renew.sh#L1-L7)

## 架构总览
下图展示了生产环境的网络与服务交互关系，以及 Nginx 在整体架构中的定位。

```mermaid
graph TB
Internet["互联网"] --> Nginx["Nginx<br/>:443/80<br/>WebSocket支持"]
Nginx --> FE["Frontend Next.js<br/>:3000"]
Nginx --> BE["Backend Strapi<br/>:1337"]
BE --> DB["PostgreSQL<br/>:5432"]
Nginx -. "ACME 挑战" .-> Cert["Certbot"]
Cert -. "证书文件" .-> Nginx
```

**章节来源**
- [docker-compose.prod.yml](file://ops/docker/docker-compose.prod.yml#L92-L123)

## 详细组件分析

### Nginx 主配置与站点配置
- HTTP 到 HTTPS 自动重定向
  - 80 端口 server 块：允许 ACME 挑战路径访问；对其他请求自动返回 301 至 https://$host$request_uri
  - 支持多域名配置，包括主域名和 www 域名
- HTTPS 主站点配置
  - 443 端口 server 块：绑定生产域名，启用 http2 和 SSL
  - SSL 参数：指定证书链与私钥路径、TLSv1.2 和 TLSv1.3 协议版本
  - 严格安全响应头：HSTS、X-Frame-Options、X-Content-Type-Options、X-XSS-Protection、Referrer-Policy、Permissions-Policy
- 反向代理配置
  - 前端 Next.js 代理：/ 路径代理到 :3000，设置必要的头部信息
  - 后端 Strapi API 代理：/api/ 路径代理到 :1337，支持完整的头部传递
  - 管理后台代理：/admin 路径代理到 :1337/admin，启用 HTTP/1.1 和升级头
- 健康检查与静态资源
  - 提供 /healthz 以供健康检查
  - 提供 /.well-known/acme-challenge/ 以供 Certbot ACME 挑战验证

**章节来源**
- [sites.conf](file://ops/nginx/sites.conf#L1-L63)

### SSL 证书自动化管理
- 证书获取与安装
  - 首次部署：通过 docker compose 运行 certbot 容器，使用 standalone 模式申请证书
  - 证书文件挂载至 Nginx，路径指向 /etc/letsencrypt/live/<domain> 下的 fullchain.pem 与 privkey.pem
- 自动续期
  - 使用定时任务每天凌晨 3 点执行续期脚本
  - 续期成功后通过 Nginx 信号触发重载，避免中断服务
- 证书初始化脚本
  - 通过环境变量传入域名与邮箱，完成证书初始化与后续部署流程
  - 支持多个域名的批量处理，自动去除空格和过滤无效域名

```mermaid
sequenceDiagram
participant Ops as "运维"
participant Compose as "Docker Compose"
participant Cert as "Certbot"
participant Nginx as "Nginx"
Ops->>Compose : "运行 certbot 初始化"
Compose->>Cert : "standalone 模式申请证书"
Cert-->>Compose : "返回证书文件"
Compose->>Nginx : "挂载证书并启动"
Note over Cert,Nginx : "定时任务每日检查续期"
Ops->>Compose : "执行续期脚本"
Compose->>Cert : "certbot renew"
Cert-->>Compose : "续期结果"
Compose->>Nginx : "nginx -s reload"
```

**章节来源**
- [init-cert.sh](file://ops/docker/init-cert.sh#L1-L31)
- [certbot-renew.sh](file://ops/docker/certbot-renew.sh#L1-L7)

### 环境变量与域名配置
- 生产环境变量模板中包含域名列表与 Let's Encrypt 邮箱
- 支持多个域名配置，使用逗号分隔
- 部署流程要求将站点配置中的示例域名替换为实际生产域名
- 健康检查与 API 健康检查均基于生产域名进行验证

**章节来源**
- [.env.prod.example](file://ops/.env.prod.example#L1-L27)
- [deploy.sh](file://ops/deploy.sh#L42-L56)

### 容器编排与部署流程
- 首次部署：生成密钥 → 替换站点域名 → 构建镜像 → 启动基础服务 → 初始化证书 → 启动 Nginx 与 Certbot → 健康检查
- 更新部署：拉取镜像 → 停止旧容器 → 启动基础服务 → 等待就绪 → 检查证书存在 → 启动 Nginx 与 Certbot → 健康检查
- 服务依赖关系：PostgreSQL → Backend → Frontend → Nginx → Certbot
- 网络配置：所有服务都在同一个自定义网络中通信

**章节来源**
- [docker-compose.prod.yml](file://ops/docker/docker-compose.prod.yml#L1-L153)
- [deploy.sh](file://ops/deploy.sh#L16-L61)

### WebSocket 支持配置
- 升级头处理：配置 proxy_set_header Upgrade $http_upgrade 和 Connection "upgrade"
- HTTP/1.1 支持：设置 proxy_http_version 1.1 确保 WebSocket 协议正常工作
- 管理后台特殊配置：/admin 路径专门处理 WebSocket 连接
- 实时通信支持：为需要实时数据更新的功能提供基础设施

**章节来源**
- [sites.conf](file://ops/nginx/sites.conf#L44-L53)

## 依赖关系分析
- Nginx 依赖 Certbot 提供的证书文件
- Nginx 依赖后端服务（Frontend/Backend）正常运行
- Certbot 依赖 DNS 解析到服务器 IP，以便 ACME 挑战验证
- 健康检查依赖 Nginx 暴露的 /healthz 路由
- WebSocket 功能依赖正确的升级头配置

```mermaid
graph LR
DNS["DNS 解析"] --> Nginx["Nginx"]
Nginx --> FE["Frontend"]
Nginx --> BE["Backend"]
Nginx --> WS["WebSocket<br/>升级头"]
Cert["Certbot"] --> Nginx
Nginx --> Health["/healthz"]
```

**章节来源**
- [docker-compose.prod.yml](file://ops/docker/docker-compose.prod.yml#L92-L123)

## 性能考虑
- 启用 http2：提升连接复用与头部压缩，降低延迟
- 合理的 SSL 参数：限定 TLS 版本与密码套件，兼顾安全与兼容性
- 会话缓存与超时：减少握手开销，提升并发能力
- 静态资源与缓存：建议在上游服务或 CDN 层面配置缓存策略，减轻 Nginx 压力
- 日志轮转：容器日志驱动与大小限制，避免磁盘占用过高
- WebSocket 优化：使用 HTTP/1.1 和正确的升级头配置，确保实时通信性能

**章节来源**
- [sites.conf](file://ops/nginx/sites.conf#L15-L22)
- [docker-compose.prod.yml](file://ops/docker/docker-compose.prod.yml#L116-L121)

## 故障排除指南
- 证书未签发或过期
  - 检查域名解析是否正确指向服务器
  - 确认 80 端口可被外网访问，以便 ACME 挑战
  - 查看 Certbot 日志与续期脚本输出
  - 手动执行续期并重载 Nginx
- Nginx 启动失败或证书加载失败
  - 核对证书路径与文件权限
  - 确认 ssl_certificate 与 ssl_certificate_key 指向正确
- 健康检查失败
  - 检查 /healthz 是否可达
  - 确认上游服务（Frontend/Backend）已启动并监听对应端口
- WebSocket 连接失败
  - 检查 /admin 路径的升级头配置
  - 确认 proxy_http_version 设置为 1.1
  - 验证客户端是否正确发送 Upgrade 请求头
- 部署脚本报错
  - 确认 .env.prod 存在且包含必要变量
  - 检查容器编排文件中的卷挂载与网络配置
  - 验证域名列表格式是否正确（逗号分隔）

**章节来源**
- [deploy.sh](file://ops/deploy.sh#L30-L34)
- [sites.conf](file://ops/nginx/sites.conf#L44-L53)

## 结论
本方案通过 Nginx 实现统一入口与 SSL 终止，并借助 Certbot 完成证书的自动化获取与续期。新增的严格安全头设置和 WebSocket 支持进一步增强了安全性与功能性。配合健康检查与定时任务，形成闭环的运维保障。建议在生产环境中持续关注证书有效期、日志轮转与上游服务健康状态，确保稳定运行。

## 附录

### A. 配置与脚本清单
- Nginx 主配置文件
  - 参考路径：ops/nginx/nginx.conf
  - 关键点：基础配置、MIME类型、include conf.d
- 站点配置文件（HTTPS/重定向/安全头/WebSocket）
  - 参考路径：ops/nginx/sites.conf
  - 关键点：监听 80/443、ACME 挑战路径、证书路径、安全头、WebSocket 升级头
- 证书初始化脚本
  - 参考路径：ops/docker/init-cert.sh
  - 关键点：standalone 模式申请证书、多域名支持、参数验证
- 证书续期脚本与定时任务
  - 参考路径：ops/docker/certbot-renew.sh
  - 关键点：每日定时执行、续期成功后重载 Nginx
- 生产环境容器编排
  - 参考路径：ops/docker/docker-compose.prod.yml
  - 关键点：服务依赖、网络配置、卷挂载、健康检查
- 开发环境容器编排
  - 参考路径：ops/docker/docker-compose.dev.yml
  - 关键点：开发模式配置、热重载支持
- 部署与健康检查脚本
  - 参考路径：ops/deploy.sh
  - 关键点：拉取镜像、启动基础服务、检查证书、启动 Nginx/Certbot、健康检查

**章节来源**
- [nginx.conf](file://ops/nginx/nginx.conf#L1-L20)
- [sites.conf](file://ops/nginx/sites.conf#L1-L63)
- [init-cert.sh](file://ops/docker/init-cert.sh#L1-L31)
- [certbot-renew.sh](file://ops/docker/certbot-renew.sh#L1-L7)
- [docker-compose.prod.yml](file://ops/docker/docker-compose.prod.yml#L1-L153)
- [docker-compose.dev.yml](file://ops/docker/docker-compose.dev.yml#L1-L55)
- [deploy.sh](file://ops/deploy.sh#L1-L61)

### B. 环境变量与域名替换
- 生产环境变量模板包含域名列表与 Let's Encrypt 邮箱
- 支持多个域名配置，使用逗号分隔
- 部署流程要求将站点配置中的示例域名替换为实际域名
- 健康检查基于生产域名进行验证

**章节来源**
- [.env.prod.example](file://ops/.env.prod.example#L1-L27)
- [deploy.sh](file://ops/deploy.sh#L42-L56)

### C. 安全头配置详解
- 严格传输安全（HSTS）：max-age=63072000; includeSubDomains; preload
- 同源框架保护（X-Frame-Options）：SAMEORIGIN
- 禁用嗅探（X-Content-Type-Options）：nosniff
- XSS 保护：1; mode=block
- 引用策略：strict-origin-when-cross-origin
- 权限策略：camera=(), microphone=(), geolocation=()

**章节来源**
- [sites.conf](file://ops/nginx/sites.conf#L24-L29)

### D. WebSocket 配置详解
- 升级头设置：Upgrade $http_upgrade
- 连接保持：Connection "upgrade"
- HTTP 版本：proxy_http_version 1.1
- 管理后台专用：/admin 路径的完整 WebSocket 支持

**章节来源**
- [sites.conf](file://ops/nginx/sites.conf#L50-L53)
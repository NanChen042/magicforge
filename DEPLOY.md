# 部署 Giao哥人生模拟游戏

本文档将指导你如何将 Giao哥人生模拟游戏部署到公网。

## 准备工作

1. 确保你已经安装了以下工具：
   - Node.js (推荐 v16+)
   - npm 或 yarn
   - Docker (如果选择Docker部署方式)

2. 确保项目已经构建完成：
   ```bash
   npm run build
   ```
   这将在 `dist` 目录下生成静态文件。

## 部署方式

### 方式一: 使用 Vercel 部署（推荐）

1. 注册 [Vercel](https://vercel.com/) 账号

2. 安装 Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. 登录 Vercel:
   ```bash
   vercel login
   ```

4. 在项目根目录下运行：
   ```bash
   vercel
   ```

5. 按照提示操作，完成部署。

6. 部署完成后，Vercel 会提供一个域名，你可以通过该域名访问你的游戏。

### 方式二: 使用 Netlify 部署

1. 注册 [Netlify](https://www.netlify.com/) 账号

2. 在 Netlify 控制台点击 "New site from Git"

3. 选择你的 Git 仓库

4. 配置构建命令为 `npm run build`，发布目录为 `dist`

5. 点击 "Deploy site"

6. 部署完成后，Netlify 会提供一个域名，你可以通过该域名访问你的游戏。

### 方式三: 使用 GitHub Pages 部署

1. 在 `vite.config.ts` 中添加 base 配置：
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // 其他配置...
   })
   ```

2. 创建 `deploy.sh` 脚本：
   ```bash
   #!/usr/bin/env sh

   # 发生错误时终止
   set -e

   # 构建
   npm run build

   # 进入构建文件夹
   cd dist

   # 如果你要部署到自定义域名
   # echo 'www.example.com' > CNAME

   git init
   git add -A
   git commit -m 'deploy'

   # 如果你要部署在 https://<USERNAME>.github.io/<REPO>
   git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

   cd -
   ```

3. 运行脚本：
   ```bash
   sh deploy.sh
   ```

### 方式四: 使用 Docker 部署

1. 创建 `Dockerfile`：
   ```dockerfile
   # 构建阶段
   FROM node:16-alpine as build-stage
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build

   # 生产阶段
   FROM nginx:stable-alpine as production-stage
   COPY --from=build-stage /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. 创建 `nginx.conf`：
   ```
   server {
     listen 80;
     server_name _;
     
     root /usr/share/nginx/html;
     index index.html;
     
     # 处理 SPA 路由
     location / {
       try_files $uri $uri/ /index.html;
     }
   }
   ```

3. 构建 Docker 镜像：
   ```bash
   docker build -t giao-game .
   ```

4. 运行 Docker 容器：
   ```bash
   docker run -d -p 80:80 giao-game
   ```

5. 访问 `http://localhost` 或你的服务器 IP 查看游戏。

## 配置 SSL 证书（HTTPS）

对于生产环境，强烈建议配置 HTTPS 以提高安全性：

### 使用 Certbot 自动配置（适用于自托管服务器）

1. 安装 Certbot：
   ```bash
   # Ubuntu/Debian
   sudo apt-get update
   sudo apt-get install certbot python3-certbot-nginx
   
   # CentOS/RHEL
   sudo yum install certbot python3-certbot-nginx
   ```

2. 获取并安装证书：
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

3. 设置自动续期：
   ```bash
   sudo certbot renew --dry-run
   ```

### 在 Docker 环境中配置 SSL

1. 创建一个包含 SSL 配置的 `nginx-ssl.conf`：
   ```
   server {
     listen 80;
     server_name yourdomain.com;
     return 301 https://$host$request_uri;
   }

   server {
     listen 443 ssl;
     server_name yourdomain.com;
     
     ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
     ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
     ssl_protocols TLSv1.2 TLSv1.3;
     ssl_prefer_server_ciphers on;
     
     root /usr/share/nginx/html;
     index index.html;
     
     location / {
       try_files $uri $uri/ /index.html;
     }
   }
   ```

2. 更新 `Dockerfile` 以包含 SSL 证书：
   ```dockerfile
   # 构建阶段
   FROM node:16-alpine as build-stage
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build

   # 生产阶段
   FROM nginx:stable-alpine as production-stage
   COPY --from=build-stage /app/dist /usr/share/nginx/html
   COPY nginx-ssl.conf /etc/nginx/conf.d/default.conf
   # 创建证书目录
   RUN mkdir -p /etc/letsencrypt/live/yourdomain.com
   # 证书文件需要在运行容器时挂载
   EXPOSE 80 443
   CMD ["nginx", "-g", "daemon off;"]
   ```

3. 运行 Docker 容器，挂载证书目录：
   ```bash
   docker run -d -p 80:80 -p 443:443 \
     -v /path/to/certificates:/etc/letsencrypt/live/yourdomain.com \
     giao-game
   ```

## 图片资源

确保所有游戏所需的图片都存放在 `public/images/giao/` 目录下，以保证部署后图片路径正确。如果你使用了 `src/assets/images/` 目录，Vite 会在构建时处理这些图片，确保正确引用。

## 自定义域名

如果你想使用自定义域名，可以在 Vercel 或 Netlify 的控制台中配置。具体步骤请参考他们的官方文档。

### 为 GitHub Pages 配置自定义域名

1. 在 `dist` 目录中创建一个名为 `CNAME` 的文件，内容为你的域名：
   ```
   yourdomain.com
   ```

2. 在你的域名注册商那里，添加一条 CNAME 记录，将你的域名指向 `<USERNAME>.github.io`。

## 性能优化建议

1. **启用压缩**：确保服务器启用了 gzip 或 brotli 压缩。
   ```
   # Nginx 配置示例
   gzip on;
   gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   ```

2. **配置缓存头**：为静态资源设置合适的缓存头。
   ```
   # Nginx 配置示例
   location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
     expires 30d;
     add_header Cache-Control "public, no-transform";
   }
   ```

3. **启用 HTTP/2**：提高加载速度。
   ```
   # Nginx 配置示例（需要 SSL）
   listen 443 ssl http2;
   ```

## 监控与日志

对于生产环境的应用，建议配置适当的监控和日志系统：

1. **应用监控**：使用 [Sentry](https://sentry.io/) 或类似服务捕获前端错误。

2. **服务器监控**：使用 [Prometheus](https://prometheus.io/) + [Grafana](https://grafana.com/) 或 [Datadog](https://www.datadoghq.com/) 监控服务器性能。

3. **访问日志**：分析 Nginx 访问日志了解用户行为和性能问题。

## 常见问题

1. **图片路径错误**
   确保图片路径正确，建议使用相对路径。

2. **样式问题**
   确保 Tailwind CSS 正确配置，检查 `postcss.config.js` 和 `tailwind.config.js` 文件。

3. **404 错误**
   如果使用前端路由，确保部署平台正确配置，将所有路由请求重定向到 `index.html`。

4. **API 连接问题**
   确保 API 地址配置正确，特别是在不同环境之间切换时。

## 帮助与支持

如有其他问题，请查看相关部署平台的官方文档：
- [Vercel 文档](https://vercel.com/docs)
- [Netlify 文档](https://docs.netlify.com/)
- [GitHub Pages 文档](https://docs.github.com/en/pages) 
- [Docker 文档](https://docs.docker.com/)
- [Nginx 文档](https://nginx.org/en/docs/) 

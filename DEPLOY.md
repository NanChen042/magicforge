# 部署 Giao哥人生模拟游戏

本文档将指导你如何将 Giao哥人生模拟游戏部署到公网。

## 准备工作

1. 确保你已经安装了以下工具：
   - Node.js (推荐 v16+)
   - npm 或 yarn

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

## 图片资源

确保所有游戏所需的图片都存放在 `public/images/giao/` 目录下，以保证部署后图片路径正确。如果你使用了 `src/assets/images/` 目录，Vite 会在构建时处理这些图片，确保正确引用。

## 自定义域名

如果你想使用自定义域名，可以在 Vercel 或 Netlify 的控制台中配置。具体步骤请参考他们的官方文档。

## 常见问题

1. **图片路径错误**
   确保图片路径正确，建议使用相对路径。

2. **样式问题**
   确保 Tailwind CSS 正确配置，检查 `postcss.config.js` 和 `tailwind.config.js` 文件。

3. **404 错误**
   如果使用前端路由，确保部署平台正确配置，将所有路由请求重定向到 `index.html`。

## 帮助与支持

如有其他问题，请查看相关部署平台的官方文档：
- [Vercel 文档](https://vercel.com/docs)
- [Netlify 文档](https://docs.netlify.com/)
- [GitHub Pages 文档](https://docs.github.com/en/pages) 

# BeePOP Web

BeePOP 旨在为电商卖家提供高效、低成本的智能图像处理解决方案。

## 项目介绍

BeePOP 为电商卖家提供以下核心功能：

- **智能抠图**：AI 自动识别商品主体并进行高精度抠图
- **背景替换**：一键替换为纯白背景（RGB 255,255,255），满足亚马逊主图要求
- **批量处理**：一次性抠图、替换背景和调整数百张图片的尺寸
- **品牌套件**：品牌一致性工具包，确保图像风格统一
- **合规检测**：自动检测和修复图像，确保符合亚马逊平台图像规范

## 技术栈

- **框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **状态管理**: Pinia
- **UI 组件**: TODO
- **路由**: Vue Router
- **国际化**: Vue I18n
- **样式**: Tailwind CSS
- **包管理器**: pnpm

## 启动前准备

### 1.1 设置 vite-plugin-vue-inspector 插件的系统环境变量

`vite-plugin-vue-inspector` 插件用于在开发时快速定位组件源码位置。为了正确使用该插件，需要设置以下环境变量：

**Windows 系统：**

```powershell
# 临时设置（仅当前终端会话有效）
$env:LAUNCH_EDITOR="code"

# 或永久设置（添加到系统环境变量）
[System.Environment]::SetEnvironmentVariable("LAUNCH_EDITOR", "code", "User")
```

**macOS/Linux 系统：**

```bash
# 临时设置（仅当前终端会话有效）
export LAUNCH_EDITOR="code"

# 或永久设置（添加到 ~/.bashrc 或 ~/.zshrc）
echo 'export LAUNCH_EDITOR="code"' >> ~/.bashrc  # 或 ~/.zshrc
source ~/.bashrc  # 或 source ~/.zshrc
```

**支持的编辑器：**
- `code` - Visual Studio Code
- `webstorm` - WebStorm
- `idea` - IntelliJ IDEA
- 其他编辑器请参考 [vite-plugin-vue-inspector 文档](https://github.com/webfansplz/vite-plugin-vue-inspector)

### 1.2 创建 .env.local 文件

在项目根目录下创建 `.env.local` 文件，配置本地开发环境变量：

```bash
# API 数据格式（使用 JSON 格式，而非 Protobuf）
VITE_APP_API_JSON=true

# figma key 用于figma mcp服务
# https://github.com/GLips/Figma-Context-MCP
FIGMA_API_KEY=true
```

**.env.local 文件说明：**
该文件只保存自己的开发配置,禁止 `push` 到远程仓库

## 项目启动流程

### 1. 安装依赖

本项目使用 `pnpm` 作为包管理器，请确保已安装 pnpm：

```bash
# 如果未安装 pnpm，请先安装
npm install -g pnpm

# 安装项目依赖
pnpm install
```

### 2. 生成 Protobuf 类型文件（可选）

如果 `protobuf/` 目录中的 `.proto` 文件有更新，需要重新生成类型文件：

```bash
pnpm run proto
```

**注意：** `src/proto/` 目录下的文件是自动生成的，请勿手动编辑。

### 3. 启动开发服务器

```bash
pnpm run dev
```

启动后，开发服务器将运行在：
- **本地访问**: http://localhost:5173
- **网络访问**: http://0.0.0.0:5173（可通过局域网访问）

### 4. 其他常用命令

```bash
# 构建生产版本
pnpm run build

# 预览生产构建
pnpm run preview

# 代码检查并自动修复
pnpm run lint:fix
```

## 项目结构

```
beepop-web/
├── protobuf/              # 后端定制的 .proto 文件（不可编辑）
├── src/
│   ├── api/              # 与后端通信的接口集合
│   │   └── request/      # 使用 axios 封装的请求方法
│   ├── components/       # 公共组件
│   ├── constant/         # 公共常量定义
│   ├── hooks/            # Vue 组合式 API hooks
│   ├── language/         # 国际化配置
│   │   └── locales/      # 多语言翻译文件
│   ├── proto/            # 从 protobuf/ 生成的文件（不可编辑）
│   ├── router/           # Vue Router 路由定义
│   ├── stores/           # Pinia 全局状态管理
│   ├── utils/            # 公共工具函数/方法
│   └── views/            # 页面组件（对应 router 中的路由）
│       └── [page]/       # 每个页面包含自己的组件
│           └── components/
├── vite.config.ts        # Vite 配置文件
├── tailwind.config.js    # Tailwind CSS 配置
└── package.json          # 项目依赖配置
```

## 开发注意事项

- **不可编辑的文件**：`protobuf/*` 和 `src/proto/*` 目录下的文件由后端或脚本生成，请勿手动编辑
- **代码规范**：提交代码前请运行 `pnpm run lint:fix` 进行代码检查
- **组件化开发**：业务代码应考虑组件化，提高代码复用性
- **命名规范**：添加新代码前，请先研究现有代码的命名约定和架构选择

## API 代理配置

开发服务器配置了 API 代理，所有 `/api` 请求将被转发到后端服务：

```javascript
// vite.config.ts
// proxy: {
//   '/api': {
//     target: 'http://192.168.15.2:8000/', // 修改为你的后端服务地址
//     changeOrigin: true,
//   },
// }
```

如需修改后端服务地址，请编辑 `vite.config.ts` 文件中的 `target` 配置。

## 了解更多

- [Vue 3 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)
- [Ant Design Vue 文档](https://antdv.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Pinia 文档](https://pinia.vuejs.org/)

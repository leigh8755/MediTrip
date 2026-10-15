# MediTrip 开发指南

## 快速开始

### 环境要求
- 现代浏览器 (Chrome, Firefox, Safari, Edge)
- 本地 Web 服务器 (Python, Node.js, 或任何 HTTP 服务器)
- 文本编辑器 / IDE (VS Code, WebStorm, 等)

### 启动项目

1. **使用 Python (推荐用于快速测试)**
   ```bash
   python -m http.server 8000
   ```

2. **使用 Node.js**
   ```bash
   npx serve
   # 或
   npm install -g http-server
   http-server -p 8000
   ```

3. **使用 PHP**
   ```bash
   php -S localhost:8000
   ```

4. **访问网站**
   ```
   http://localhost:8000
   ```

---

## 项目结构

```
MediTrip/
├── index.html              # 主页面 (244 行)
├── styles.css              # 样式表 (584 行)
├── script.js               # 交互逻辑 (412 行)
├── README.md               # 项目说明
├── API_DOCUMENTATION.md    # API 接口文档
├── TODO.md                 # 开发清单
├── DEVELOPMENT_GUIDE.md    # 开发指南 (本文件)
└── 1.jpg, 2.jpg, 3.jpg, 4.jpg  # 需求文档图片
```

**代码统计**: 1240 行代码 (HTML + CSS + JS)

---

## 开发约定

### 代码风格

#### HTML
- 使用语义化标签
- class 命名采用 BEM 简化版: `.block-element`
- 保持嵌套层级清晰
- 添加 ARIA 属性以提升无障碍性

#### CSS
- 使用 CSS 自定义属性 (CSS Variables)
- 所有间距、颜色、字体使用 tokens
- 响应式优先，使用 `clamp()` 实现流式排版
- Grid 优先用于布局，Flex 用于组件内部
- 移动端优先的媒体查询

#### JavaScript
- ES6+ 语法
- 使用 `async/await` 处理异步操作
- 函数命名采用驼峰式
- 添加清晰的注释
- 所有 API 调用通过 `API_ENDPOINTS` 对象

---

## 设计系统

### 颜色 Token

```css
/* 品牌色 */
--color-teal: #0B6E6E;      /* 主色 - 信任、医疗 */
--color-navy: #0F2A43;      /* 深蓝 - 高端、沉稳 */
--color-gold: #C9A24B;      /* 强调 - 数据、旗舰 */
--color-cream: #FAF9F6;     /* 背景 - 页面底色 */
--color-ink: #1C2B36;       /* 文字 - 正文 */

/* 表面层级 (深色场景用) */
--surface-1: #05070C;
--surface-2: #0A0D12;
--surface-3: #0F131C;
--surface-4: #161D2B;
--surface-5: #1E2636;

/* 强调色 */
--accent-primary: #0B6E6E;
--accent-light: #6EE7B7;
```

### 间距 Token

```css
--space-xs: clamp(0.5rem, 1vw, 0.75rem);
--space-sm: clamp(0.75rem, 1.5vw, 1rem);
--space-md: clamp(1rem, 2vw, 1.5rem);
--space-lg: clamp(1.5rem, 3vw, 2rem);
--space-xl: clamp(2rem, 4vw, 3rem);
--space-2xl: clamp(3rem, 6vw, 5rem);
```

### 圆角 Token

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-full: 999px;     /* 药丸形 */
--radius-circle: 50%;     /* 圆形 */
```

### 字体系统

```css
/* 字体族 */
--font-display: 'Noto Serif SC', serif;    /* 标题 */
--font-body: 'Noto Sans SC', sans-serif;   /* 正文 */

/* 字号层级 (使用 clamp 实现流式) */
h1: clamp(2rem, 4vw, 3.5rem)
h2: clamp(1.75rem, 3vw, 2.5rem)
h3: clamp(1.25rem, 2vw, 1.75rem)
body: clamp(0.9375rem, 1vw + 0.5rem, 1rem)
```

---

## API 集成指南

### 基础配置

所有 API 端点定义在 `script.js` 的 `API_ENDPOINTS` 对象中：

```javascript
const API_BASE_URL = '/api/v1';

const API_ENDPOINTS = {
    services: {
        checkup: `${API_BASE_URL}/services/checkup`,
        tcm: `${API_BASE_URL}/services/tcm`,
        // ...
    },
    // ...
};
```

### 实现 API 调用

模板已在 `script.js` 底部提供，例如：

```javascript
async function fetchServiceDetails(serviceType) {
    const endpoint = API_ENDPOINTS.services[serviceType];
    
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error loading data', 3000);
    }
}
```

### 后端实现建议

推荐技术栈：
1. **Node.js + Express**: 适合快速开发
2. **Python + Flask/FastAPI**: 适合数据处理
3. **Go + Gin**: 适合高性能需求

---

## 多语言实现

### 结构建议

```
/locales
  /en.json
  /ru.json
  /ar.json
  /id.json
  /zh.json
```

### 语言文件示例 (en.json)

```json
{
  "header": {
    "tagline": "Your Healthcare Bridge to China",
    "nav": {
      "services": "Services",
      "destinations": "Destinations",
      "how_it_works": "How It Works",
      "insurance": "Insurance",
      "about": "About Us",
      "contact": "Contact"
    }
  },
  "hero": {
    "title": "Access World-Class Healthcare in China",
    "subtitle": "Expert consultation • Trusted medical facilities • Seamless experience",
    "cta": "Start Your Healthcare Journey"
  },
  "services": {
    "title": "Our Services",
    "checkup": {
      "title": "Health Checkup",
      "description": "Comprehensive health examination packages"
    }
    // ...
  }
}
```

### 实现 i18n 加载

```javascript
let currentLang = 'en';
let translations = {};

async function loadLanguage(lang) {
    const response = await fetch(`/locales/${lang}.json`);
    translations = await response.json();
    updatePageContent();
}

function t(key) {
    const keys = key.split('.');
    let value = translations;
    for (const k of keys) {
        value = value[k];
    }
    return value || key;
}

function updatePageContent() {
    document.querySelector('.hero-title').textContent = t('hero.title');
    // ... 更新其他内容
}
```

---

## 常见任务

### 添加新服务

1. **更新 HTML** (`index.html`)
   ```html
   <div class="service-card">
       <div class="service-icon">🏥</div>
       <h3 class="service-title">New Service</h3>
       <p class="service-desc">Description...</p>
       <button class="service-button" data-service="new">Learn More</button>
   </div>
   ```

2. **添加 API 端点** (`script.js`)
   ```javascript
   services: {
       // ...
       newService: `${API_BASE_URL}/services/new-service`
   }
   ```

3. **更新样式**（如需特殊样式）

### 添加新页面

1. 创建新 HTML 文件
2. 链接样式表: `<link rel="stylesheet" href="styles.css">`
3. 在主导航添加链接
4. 更新 API 文档

### 修改配色

所有颜色定义在 `styles.css` 的 `:root` 中，修改 CSS 变量即可全局生效：

```css
:root {
    --color-teal: #YOUR_COLOR;
    /* ... */
}
```

---

## 测试

### 浏览器测试
- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- 移动端浏览器

### 测试清单
- [ ] 所有链接可点击
- [ ] 表单提交正常
- [ ] 语言切换功能
- [ ] 响应式布局 (手机、平板、桌面)
- [ ] 键盘导航
- [ ] 屏幕阅读器兼容性

### 性能测试
使用 Google Lighthouse 或 WebPageTest

---

## 调试技巧

### 浏览器控制台

所有 API 端点会在控制台打印：

```javascript
console.log('API Endpoints:', API_ENDPOINTS);
```

查看彩色格式的 API 结构：

```javascript
// 自动在页面加载时打印
logAPIStructure();
```

### 通知系统

使用内置通知系统显示消息：

```javascript
showNotification('Your message here', 3000);
```

---

## 部署

### 静态托管（推荐用于前端原型）

1. **Netlify**
   ```bash
   # 安装 Netlify CLI
   npm install -g netlify-cli
   
   # 部署
   netlify deploy --dir=. --prod
   ```

2. **Vercel**
   ```bash
   # 安装 Vercel CLI
   npm install -g vercel
   
   # 部署
   vercel --prod
   ```

3. **GitHub Pages**
   - 推送到 GitHub 仓库
   - 在设置中启用 GitHub Pages
   - 选择分支和根目录

### 全栈部署

当后端开发完成后：

1. **云服务器** (阿里云、腾讯云、AWS)
   - 前端：Nginx 提供静态文件
   - 后端：Node.js/Python/Go 应用
   - 数据库：PostgreSQL/MySQL/MongoDB

2. **容器化部署**
   ```dockerfile
   # Dockerfile 示例
   FROM nginx:alpine
   COPY . /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

---

## 性能优化

### 已实现
- ✅ CSS 变量替代重复值
- ✅ 流式排版减少媒体查询
- ✅ 语义化 HTML 提升 SEO
- ✅ 外部字体使用 Google Fonts CDN

### 待优化
- [ ] 图片压缩和懒加载
- [ ] CSS/JS 代码压缩
- [ ] 启用 Gzip/Brotli 压缩
- [ ] 添加 Service Worker (PWA)
- [ ] 使用 CDN 加速静态资源

---

## 安全注意事项

### 前端安全
- 所有用户输入需要验证
- 使用 HTTPS (生产环境必须)
- 不在前端存储敏感信息
- 使用 Content Security Policy (CSP)

### API 安全
- 实现用户认证和授权
- 使用 CORS 限制跨域请求
- 限制请求频率 (Rate Limiting)
- 验证和清理所有输入
- 使用 HTTPS 加密传输

---

## 获取帮助

### 文档
- `README.md` - 项目概述
- `API_DOCUMENTATION.md` - 完整 API 文档
- `TODO.md` - 开发清单

### 代码注释
所有关键函数都有详细注释，查看 `script.js`

### 开发工具
- Chrome DevTools
- Firefox Developer Tools
- React DevTools (如果使用 React)
- Vue DevTools (如果使用 Vue)

---

## 贡献指南

### 代码提交
1. 创建功能分支
2. 编写清晰的提交信息
3. 运行测试
4. 提交 Pull Request

### 提交信息格式
```
[类型] 简短描述

详细说明（可选）

类型：feat, fix, docs, style, refactor, test, chore
```

示例：
```
[feat] 添加多语言支持

- 实现语言切换功能
- 添加 5 种语言的翻译文件
- 更新导航栏语言选择器
```

---

**最后更新**: 2024-10-07
**项目版本**: 0.1.0 (原型阶段)

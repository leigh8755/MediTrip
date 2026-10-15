# MediTrip - Medical Tourism Platform

医疗旅游咨询平台，为外国人在中国的体检和医疗服务提供专业咨询和协调。

## 项目概述

MediTrip 是一个面向国际患者的医疗旅游咨询网站，主要服务于希望在中国接受医疗服务的外国人群体。

### 主要功能模块

1. **服务板块 (Services)**
   - 高端体检 (Health Checkup)
   - 中医理疗 (Traditional Chinese Medicine)
   - 牙科治疗 (Dental Services)
   - 眼科验光配镜 (Vision Care)
   - 医美与皮肤护理 (Medical Aesthetics)
   - 乐城先进诊疗 (Advanced Treatment - Boao Lecheng)

2. **目标市场 (Target Markets)**
   - 东南亚 (Southeast Asia)
   - 俄罗斯/中亚 (Russia & Central Asia)
   - 中东 (Middle East)
   - 欧美 (Europe)

3. **转化与信任 (Conversion & Trust)**
   - 就医流程 (How It Works)
   - 医院网络 (Hospital Network)
   - 保险与支付 (Insurance & Payment)
   - 关于我们 (About Us)

4. **多语言支持 (Multi-language)**
   - EN (主站)
   - RU (俄语区)
   - AR (中东)
   - ID/MS/TH (东南亚)
   - ZH (中文华人)

## 技术栈

- **前端**: HTML5, CSS3, JavaScript (Vanilla)
- **字体**: Noto Serif SC (标题), Noto Sans SC (正文) - Google Fonts
- **设计系统**: 基于品牌色彩规范的响应式设计

## 设计规范

### 色彩系统
- **Teal 主色**: `#0B6E6E` - 信任、医疗
- **Navy 深蓝**: `#0F2A43` - 高端、沉稳
- **Gold 强调**: `#C9A24B` - 数据、旗舰
- **Cream 背景**: `#FAF9F6` - 页面底
- **Ink 文字**: `#1C2B36` - 正文

### 字体规范
- **标题**: Noto Serif SC (正式英文版碰衬线英文体系)
- **正文**: Noto Sans SC / 系统栈
- **字号层级**: 13 / 15 / 20 / 34 / 52

## 文件结构

```
MediTrip/
├── index.html          # 主页面
├── styles.css          # 样式表
├── script.js           # JavaScript 交互逻辑
└── README.md           # 项目文档
```

## API 接口结构

### 服务接口 (Services API)
- `GET /api/v1/services` - 获取所有服务列表
- `GET /api/v1/services/checkup` - 高端体检详情
- `GET /api/v1/services/tcm` - 中医理疗详情
- `GET /api/v1/services/dental` - 牙科服务详情
- `GET /api/v1/services/optometry` - 眼科服务详情
- `GET /api/v1/services/aesthetics` - 医美服务详情
- `GET /api/v1/services/boao` - 乐城先进诊疗详情

### 市场接口 (Markets API)
- `GET /api/v1/markets` - 获取所有市场列表
- `GET /api/v1/markets/southeast-asia` - 东南亚市场
- `GET /api/v1/markets/russia-central-asia` - 俄罗斯/中亚市场
- `GET /api/v1/markets/middle-east` - 中东市场
- `GET /api/v1/markets/europe` - 欧洲市场

### 咨询接口 (Consultation API)
- `POST /api/v1/consultation/create` - 创建咨询请求
- `GET /api/v1/consultation/status` - 查询咨询状态
- `GET /api/v1/consultation/list` - 获取咨询列表

### 医院网络接口 (Hospitals API)
- `GET /api/v1/hospitals` - 获取医院列表
- `GET /api/v1/hospitals/search` - 搜索医院
- `GET /api/v1/hospitals/:id` - 获取医院详情

### 保险接口 (Insurance API)
- `POST /api/v1/insurance/check` - 检查保险资格
- `GET /api/v1/insurance/providers` - 获取保险提供商列表
- `POST /api/v1/insurance/direct-billing` - 直接结算

### 支付接口 (Payment API)
- `GET /api/v1/payment/methods` - 获取支付方式
- `POST /api/v1/payment/process` - 处理支付
- `GET /api/v1/payment/currencies` - 支持的货币列表

### 联系接口 (Contact API)
- `POST /api/v1/contact/submit` - 提交联系表单
- `POST /api/v1/contact/callback` - 请求回电

### 内容接口 (Content API)
- `GET /api/v1/content/insights` - 资讯文章 (SEO)
- `GET /api/v1/content/articles` - 文章列表
- `GET /api/v1/content/faqs` - 常见问题

## 本地运行

1. 直接在浏览器中打开 `index.html` 文件
2. 或使用本地服务器:
   ```bash
   # 使用 Python
   python -m http.server 8000
   
   # 使用 Node.js
   npx serve
   ```
3. 在浏览器中访问 `http://localhost:8000`

## 开发说明

### 当前状态
- ✅ 页面结构完成
- ✅ 样式系统完成
- ✅ API 接口结构定义完成
- ✅ 基础交互逻辑完成
- ⏳ 后端 API 实现（待开发）
- ⏳ 多语言内容（待添加）
- ⏳ 实际功能实现（待开发）

### 下一步开发

1. **后端开发**
   - 实现 API 接口
   - 数据库设计
   - 用户认证系统

2. **多语言支持**
   - 创建语言文件 (i18n)
   - 实现语言切换逻辑
   - 翻译所有内容

3. **功能完善**
   - 服务详情页面
   - 预约系统
   - 支付集成
   - 用户仪表盘

4. **内容管理**
   - 医院信息录入
   - 服务详细说明
   - FAQ 内容
   - 博客/资讯系统

## 合规声明

### 医疗免责声明
本平台为医疗转介与咨询服务，不提供诊断、处方或治疗；个案效果因人而异，平台不承诺定结果。定价、政策与医院信息以上线时最新核实的官方口径为准。

### 内容与数据
- 医疗广告: 内地《医疗广告管理办法》+ 香港《不良广告（医药）条例》双向约束，禁疗效承诺，禁术前术后对比招揽
- 医美: 只与持牌机构合作，主诊医师年限（外科6年/牙科5年/中医皮肤科3年）
- 患者数据: 跨境病历传输符合 GDPR 与目的地法规，合同约定管辖地
- 免责声明: 全站明示「非医疗机构，不提供诊断治疗」

### 品牌与备案
- 香港《旅游业条例》634章：不自行打包「机酒+医院行程」，机酒外包持牌旅行社
- 保险中介牌照：不以推荐保险/向保险收佣
- 内地：代办签证业务须向公安出入境备案（2026-09-15 新规）

## 联系方式

（待补充具体联系方式）

---

**注**: 本项目目前为前端原型，所有 API 接口均为结构定义，尚未实现实际功能。开发时请参考 `script.js` 中的 API 端点定义。
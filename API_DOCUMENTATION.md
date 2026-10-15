# MediTrip API Documentation

API 接口文档 - 用于后端开发参考

## Base URL
```
Development: http://localhost:3000/api/v1
Production: https://api.meditrip.com/api/v1
```

## Authentication
所有 API 请求需要在 header 中包含认证信息：
```
Authorization: Bearer {access_token}
Content-Type: application/json
Accept-Language: en|ru|ar|id|zh
```

---

## 1. Services API (服务接口)

### 1.1 获取所有服务列表
```http
GET /api/v1/services
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "checkup",
      "name": "Health Checkup",
      "name_zh": "高端体检",
      "description": "Comprehensive health examination packages",
      "icon": "🏥",
      "available": true
    }
  ]
}
```

### 1.2 获取服务详情
```http
GET /api/v1/services/{serviceType}
```

**Parameters:**
- `serviceType`: checkup | tcm | dental | optometry | aesthetics | boao

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "checkup",
    "name": "Health Checkup",
    "description": "...",
    "packages": [
      {
        "id": "basic",
        "name": "Basic Package",
        "price_range": "1000-3000",
        "currency": "CNY",
        "duration": "1 day",
        "includes": []
      }
    ],
    "locations": ["Beijing", "Shanghai", "Guangzhou"],
    "target_markets": ["southeast_asia", "russia", "middle_east"]
  }
}
```

---

## 2. Markets API (市场接口)

### 2.1 获取市场列表
```http
GET /api/v1/markets
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "southeast_asia",
      "name": "Southeast Asia",
      "countries": ["Indonesia", "Malaysia", "Thailand", "Singapore"],
      "languages": ["id", "ms", "th", "en"],
      "marketing_channels": ["Google", "Instagram", "TikTok"]
    }
  ]
}
```

---

## 3. Consultation API (咨询接口)

### 3.1 创建咨询请求
```http
POST /api/v1/consultation/create
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+62123456789",
  "service_type": "checkup",
  "preferred_location": "Beijing",
  "message": "I'm interested in comprehensive health checkup",
  "language": "en"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "consultation_id": "CONS-20241007-001",
    "status": "pending",
    "created_at": "2024-10-07T10:00:00Z",
    "estimated_response_time": "6-24 hours"
  }
}
```

### 3.2 查询咨询状态
```http
GET /api/v1/consultation/status?id={consultation_id}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "consultation_id": "CONS-20241007-001",
    "status": "in_progress",
    "updated_at": "2024-10-07T12:00:00Z",
    "messages": []
  }
}
```

---

## 4. Hospitals API (医院网络接口)

### 4.1 搜索医院
```http
GET /api/v1/hospitals/search?service={service}&location={location}&language={lang}
```

**Query Parameters:**
- `service`: 服务类型
- `location`: 城市
- `language`: 语言支持
- `page`: 页码 (default: 1)
- `limit`: 每页数量 (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "hospitals": [
      {
        "id": "H001",
        "name": "Beijing International Hospital",
        "name_zh": "北京国际医院",
        "location": "Beijing",
        "services": ["checkup", "dental", "tcm"],
        "languages": ["en", "zh", "ar"],
        "accreditation": ["JCI", "ISO"],
        "rating": 4.8
      }
    ],
    "total": 45,
    "page": 1,
    "pages": 3
  }
}
```

### 4.2 获取医院详情
```http
GET /api/v1/hospitals/{hospital_id}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "H001",
    "name": "Beijing International Hospital",
    "address": "...",
    "services": [],
    "departments": [],
    "facilities": [],
    "contact": {
      "phone": "+86-10-12345678",
      "email": "info@hospital.com",
      "wechat": "hospital_official"
    }
  }
}
```

---

## 5. Insurance API (保险接口)

### 5.1 检查保险资格
```http
POST /api/v1/insurance/check
```

**Request Body:**
```json
{
  "insurance_provider": "Allianz",
  "policy_number": "ALZ123456",
  "service_type": "checkup",
  "estimated_cost": 5000
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "eligible": true,
    "coverage_percentage": 80,
    "direct_billing_available": true,
    "pre_approval_required": false,
    "estimated_coverage": 4000,
    "patient_payment": 1000
  }
}
```

### 5.2 获取支持的保险提供商
```http
GET /api/v1/insurance/providers
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "name": "Allianz",
      "countries": ["Global"],
      "direct_billing": true,
      "contact": "..."
    }
  ]
}
```

---

## 6. Payment API (支付接口)

### 6.1 获取支付方式
```http
GET /api/v1/payment/methods?country={country}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "methods": [
      {
        "type": "credit_card",
        "name": "Credit/Debit Card",
        "currencies": ["CNY", "USD", "EUR"],
        "fee_percentage": 2.5
      },
      {
        "type": "bank_transfer",
        "name": "International Bank Transfer",
        "currencies": ["CNY", "USD"],
        "fee_percentage": 0
      },
      {
        "type": "wechat_pay",
        "name": "WeChat Pay",
        "currencies": ["CNY"],
        "fee_percentage": 0
      }
    ]
  }
}
```

### 6.2 处理支付
```http
POST /api/v1/payment/process
```

**Request Body:**
```json
{
  "consultation_id": "CONS-20241007-001",
  "amount": 5000,
  "currency": "CNY",
  "payment_method": "credit_card",
  "card_details": {
    "encrypted": true,
    "token": "..."
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transaction_id": "TXN-20241007-001",
    "status": "completed",
    "amount": 5000,
    "currency": "CNY",
    "receipt_url": "https://..."
  }
}
```

---

## 7. Contact API (联系接口)

### 7.1 提交联系表单
```http
POST /api/v1/contact/submit
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+62123456789",
  "service": "checkup",
  "message": "I would like to know more about...",
  "language": "en",
  "preferred_contact_method": "email"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "ticket_id": "TICKET-20241007-001",
    "status": "received",
    "estimated_response_time": "1-2 business days"
  }
}
```

---

## 8. Content API (内容接口)

### 8.1 获取资讯文章
```http
GET /api/v1/content/insights?category={category}&lang={lang}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "id": "ART-001",
        "title": "Medical Tourism in China: Complete Guide",
        "slug": "medical-tourism-china-guide",
        "excerpt": "...",
        "category": "guide",
        "language": "en",
        "published_at": "2024-10-01",
        "read_time": "5 min"
      }
    ]
  }
}
```

### 8.2 获取常见问题
```http
GET /api/v1/content/faqs?lang={lang}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "FAQ-001",
      "question": "Do I need a visa to visit China for medical treatment?",
      "answer": "...",
      "category": "visa",
      "language": "en"
    }
  ]
}
```

---

## Error Responses

所有错误响应遵循统一格式：

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {}
  }
}
```

### 常见错误码

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_REQUEST` | 400 | 请求参数无效 |
| `UNAUTHORIZED` | 401 | 未授权访问 |
| `NOT_FOUND` | 404 | 资源不存在 |
| `RATE_LIMIT` | 429 | 请求频率超限 |
| `SERVER_ERROR` | 500 | 服务器内部错误 |

---

## Rate Limiting

API 请求频率限制：
- 未认证请求: 100 requests/hour
- 认证请求: 1000 requests/hour
- 支付相关: 10 requests/minute

响应 Header 包含限流信息：
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1696680000
```

---

## Webhooks (待实现)

用于接收异步事件通知：
- 咨询状态更新
- 支付状态变更
- 预约确认

---

**注**: 此文档为 API 设计规范，实际实现时需要根据业务需求调整。
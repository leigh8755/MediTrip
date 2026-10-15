# MediTrip 权限管理系统

## 功能概述

MediTrip 网站现在实现了完整的用户权限管理系统，包含四个权限级别：

### 权限级别

1. **User（用户）** - 默认权限
   - 注册账号
   - 查看服务信息
   - 管理个人记事本
   - 修改个人密码
   - 删除自己的账号

2. **Staff（员工）**
   - 用户的所有权限
   - 访问"客户管理"页面
   - 查看和编辑客户信息（功能待实现）

3. **Admin（管理员）**
   - 员工的所有权限
   - 访问"客户管理"页面
   - 查看、编辑和删除客户信息（功能待实现）

4. **Superadmin（超级管理员）** - nattugglahk@gmail.com
   - 管理员的所有权限
   - 访问"账号管理"页面
   - 查看所有注册用户
   - 修改任何用户的权限级别
   - 删除任何用户账号（除了自己）

## 使用说明

### 1. 超级管理员登录

```
邮箱：nattugglahk@gmail.com
密码：（需要先注册这个账号）
```

### 2. 赋予权限

1. 以超级管理员身份登录
2. 点击右上角用户名，选择"账号管理"
3. 在账号列表中找到要赋权的用户
4. 在"Role"下拉框中选择新的权限级别
5. 系统会自动保存修改

### 3. 客户管理

- 员工和管理员登录后，用户菜单中会显示"客户管理"选项
- 点击后会跳转到客户管理页面（customer-management.html）
- 当前为空页面，等待后续功能开发

## 技术实现

### 文件修改

1. **script.js**
   - 扩展 UserManager 类，添加 `getAllUsers()`, `updateUserRole()`, `deleteUserAccount()` 方法
   - 添加 `setupAccountManagement()` 和 `setupCustomerManagement()` 函数
   - 更新 `updateUIForUser()` 函数，根据用户角色显示/隐藏菜单项

2. **index.html**
   - 添加账号管理模态框（#account-mgmt-modal）
   - 在用户下拉菜单中添加"客户管理"和"账号管理"按钮
   - 更新脚本版本号

3. **styles.css**
   - 添加账号管理表格样式
   - 添加操作按钮样式

4. **i18n.js**
   - 添加账号管理和客户管理的中英文翻译

5. **customer-management.html**
   - 创建独立的客户管理页面
   - 实现权限检查，只允许 staff/admin/superadmin 访问
   - 展示空状态，等待功能实现

### 数据存储

所有用户数据存储在浏览器的 localStorage 中：
- `meditrip_users`: 用户账号和权限信息
- `meditrip_current_user`: 当前登录用户的邮箱

### 安全注意事项

⚠️ **重要提示**：当前实现是前端原型，仅用于演示和测试。

生产环境需要：
1. 后端 API 进行用户认证和权限验证
2. 密码加密存储（bcrypt 等）
3. JWT 或 Session 进行会话管理
4. HTTPS 加密传输
5. CSRF 保护
6. 输入验证和 SQL 注入防护

## 测试

使用 `test-permissions.html` 页面快速创建测试账号：

```
http://localhost:8000/test-permissions.html
```

测试账号：
- nattugglahk@gmail.com (superadmin) / admin123
- admin@test.com (admin) / admin123
- staff@test.com (staff) / staff123
- user@test.com (user) / user123

## 下一步开发

### 客户管理功能

在 customer-management.html 中实现：

1. **客户列表**
   - 显示所有客户信息
   - 搜索和筛选功能
   - 分页

2. **添加客户**
   - 表单输入客户信息
   - 数据验证

3. **编辑客户**
   - 修改客户信息
   - Staff 和 Admin 都可以编辑

4. **删除客户**
   - 只有 Admin 和 Superadmin 可以删除
   - 删除确认对话框

5. **导出数据**
   - 导出为 CSV/Excel
   - 筛选导出内容

### 后端集成

1. 创建用户认证 API
2. 创建权限管理 API
3. 创建客户管理 CRUD API
4. 实现数据库存储
5. 添加审计日志

## 维护

### 修改超级管理员

在 `script.js` 的两个位置硬编码了超级管理员邮箱：

1. `getCurrentUser()` 方法（第 155 行）
2. `getAllUsers()` 方法（第 210 行）

如需更改超级管理员，修改这两处的邮箱地址。

### 添加新权限级别

1. 在 UserManager 中添加新角色
2. 更新 `updateUIForUser()` 函数的权限检查
3. 在账号管理模态框中添加新角色选项
4. 更新 customer-management.html 的访问检查

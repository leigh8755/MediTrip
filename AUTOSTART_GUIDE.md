# MediTrip 开机自启动设置指南

## 方法 1: 使用 PowerShell 脚本（推荐）

### 步骤：
1. **以管理员身份运行 PowerShell**
   - 按 Win + X
   - 选择 "Windows PowerShell (管理员)" 或 "终端 (管理员)"

2. **运行设置脚本**
   ```powershell
   cd "C:\Users\Leigh\Desktop\Projects\MediTrip"
   powershell -ExecutionPolicy Bypass -File setup_autostart.ps1
   ```

3. **验证设置**
   - 打开任务计划程序（按 Win + R，输入 `taskschd.msc`）
   - 查找 "MediTrip Web Server" 任务

4. **测试任务**
   ```powershell
   Start-ScheduledTask -TaskName "MediTrip Web Server"
   ```

---

## 方法 2: 手动创建任务计划程序

### 步骤：

1. **打开任务计划程序**
   - 按 `Win + R`
   - 输入 `taskschd.msc` 并回车

2. **创建新任务**
   - 右键点击 "任务计划程序库"
   - 选择 "创建任务..."

3. **常规选项卡**
   - 名称：`MediTrip Web Server`
   - 描述：`Automatically starts MediTrip web server on port 8000`
   - 选中 "使用最高权限运行"
   - 配置：Windows 10

4. **触发器选项卡**
   - 点击 "新建..."
   - 开始任务：选择 "启动时"
   - 点击 "确定"

5. **操作选项卡**
   - 点击 "新建..."
   - 操作：启动程序
   - 程序或脚本：`wscript.exe`
   - 添加参数：`"C:\Users\Leigh\Desktop\Projects\MediTrip\start_server_hidden.vbs"`
   - 点击 "确定"

6. **条件选项卡**
   - 取消选中 "只有在计算机使用交流电源时才启动此任务"
   - 选中 "唤醒计算机运行此任务"（可选）

7. **设置选项卡**
   - 选中 "如果任务失败，按以下方式重新启动"
   - 重新尝试次数：3
   - 重新尝试间隔：1 分钟

8. **完成**
   - 点击 "确定" 保存任务

---

## 方法 3: 使用启动文件夹（简单但会显示窗口）

1. **打开启动文件夹**
   - 按 `Win + R`
   - 输入 `shell:startup` 并回车

2. **创建快捷方式**
   - 右键点击空白处 → "新建" → "快捷方式"
   - 位置：`C:\Users\Leigh\Desktop\Projects\MediTrip\start_server_hidden.vbs`
   - 名称：`MediTrip Web Server`

---

## 验证自动启动

### 测试方法：
1. 重启计算机
2. 等待系统完全启动
3. 打开浏览器访问：http://localhost:8000
4. 如果能看到 MediTrip 网站，说明自动启动成功

### 检查服务是否运行：
```powershell
# 查看 Python 进程
Get-Process python -ErrorAction SilentlyContinue

# 检查端口 8000 是否被占用
netstat -ano | findstr :8000
```

---

## 管理自动启动服务

### 启动服务：
```powershell
Start-ScheduledTask -TaskName "MediTrip Web Server"
```

### 停止服务：
```powershell
# 停止 Python 进程
Stop-Process -Name python -Force
```

### 禁用自动启动：
```powershell
Disable-ScheduledTask -TaskName "MediTrip Web Server"
```

### 启用自动启动：
```powershell
Enable-ScheduledTask -TaskName "MediTrip Web Server"
```

### 删除自动启动任务：
```powershell
Unregister-ScheduledTask -TaskName "MediTrip Web Server" -Confirm:$false
```

---

## 文件说明

已创建的文件：
- `start_server.bat` - 批处理启动脚本
- `start_server_hidden.vbs` - VBS 隐藏窗口启动脚本
- `setup_autostart.ps1` - PowerShell 自动配置脚本
- `AUTOSTART_GUIDE.md` - 本文档

---

## 故障排除

### 问题 1: 重启后服务没有启动
**解决方案：**
- 检查任务计划程序中任务是否启用
- 查看任务历史记录（任务计划程序 → 启用所有任务历史记录）
- 确认 Python 已安装并在 PATH 中

### 问题 2: 端口 8000 被占用
**解决方案：**
```powershell
# 查找占用端口的进程
netstat -ano | findstr :8000

# 结束进程（替换 <PID> 为实际进程 ID）
taskkill /PID <PID> /F
```

### 问题 3: Python 没有权限
**解决方案：**
- 确保以管理员权限创建任务
- 在任务属性中选中 "使用最高权限运行"

---

## 注意事项

⚠️ **重要提示：**
1. 此设置使用 Python 的简单 HTTP 服务器，仅适合开发和测试环境
2. 生产环境建议使用专业的 Web 服务器（如 Nginx、Apache、IIS）
3. 确保防火墙允许端口 8000 的访问
4. 定期检查服务运行状态

---

## 生产环境建议

对于生产环境部署，建议：
1. 使用 **IIS**（Internet Information Services）作为 Web 服务器
2. 配置 **HTTPS** SSL 证书
3. 设置适当的**防火墙规则**
4. 配置**反向代理**
5. 启用**日志记录和监控**
6. 设置**自动备份**

如需生产环境部署支持，请告知！

---

访问地址：http://localhost:8000
服务端口：8000

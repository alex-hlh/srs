# 03-API接口规范

> 本文档定义星环空间 (Stellar Ring Space) 的 API 接口规范，包括认证流程、接口格式和核心接口清单。

---

## 一、接口基础规范

### 1.1 接口协议

| 项目 | 规范 |
|------|------|
| 协议 | HTTP/HTTPS |
| 数据格式 | JSON |
| 字符编码 | UTF-8 |
| 请求方法 | GET / POST / PUT / DELETE |

### 1.2 统一响应格式

```json
{
  "code": 0,
  "message": "success",
  "data": { },
  "timestamp": 1701234567890
}
```

**响应码定义:**

| code | 说明 |
|------|------|
| 0 | 成功 |
| 1001 | 参数错误 |
| 1002 | 签名验证失败 |
| 2001 | 未登录 |
| 2002 | 登录过期 |
| 2003 | 无权限 |
| 3001 | 业务处理失败 |
| 5000 | 系统内部错误 |

### 1.3 分页响应格式

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "records": [ ],
    "total": 100,
    "size": 10,
    "current": 1,
    "pages": 10
  },
  "timestamp": 1701234567890
}
```

### 1.4 请求头规范

| 头信息 | 说明 | 必填 |
|--------|------|------|
| Content-Type | application/json | 是 |
| Authorization | Bearer {token} | 是 |
| X-Access-Token | 用户访问令牌 | 是 |
| X-Tenant-Id | 租户ID (多租户场景) | 否 |
| X-Request-Id | 请求唯一标识 | 否 |
| X-Timestamp | 请求时间戳 (毫秒) | 是 |

---

## 二、认证授权流程

### 2.1 整体认证流程

```
┌─────────┐                    ┌─────────┐                    ┌─────────┐
│  前端   │                    │ 网关    │                    │ 后端    │
└────┬────┘                    └────┬────┘                    └────┬────┘
     │                              │                              │
     │  1. 登录请求                  │                              │
     │────────────────────────────>│                              │
     │                              │  2. 验证账号密码               │
     │                              │────────────────────────────>│
     │                              │                              │
     │                              │  3. 生成token                │
     │                              │<────────────────────────────│
     │  4. 返回token                │                              │
     │<────────────────────────────│                              │
     │                              │                              │
     │  5. 后续请求带token          │                              │
     │────────────────────────────>│                              │
     │                              │  6. 验证token                │
     │                              │────────────────────────────>│
     │                              │                              │
     │                              │  7. 返回数据                 │
     │  8. 返回数据                 │<────────────────────────────│
     │<────────────────────────────│                              │
```

### 2.2 登录接口

**请求:**

```http
POST /ctrl/sys/login HTTP/1.1
Content-Type: application/json

{
  "username": "admin",
  "password": "e10adc3949ba59abbe56e057f20f883e",
  "captcha": "1234",
  "checkKey": "uuid-xxx"
}
```

**响应:**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userInfo": {
      "id": "1",
      "username": "admin",
      "realname": "系统管理员",
      "avatar": "",
      "phone": "13800138000",
      "email": "admin@example.com"
    },
    "permissions": [
      "sys:user:view",
      "sys:user:add",
      "sys:user:edit",
      "sys:user:delete"
    ],
    "menuTree": [
      {
        "path": "/system",
        "name": "system",
        "component": "Layout",
        "meta": { "title": "系统管理", "icon": "setting" },
        "children": [
          {
            "path": "/system/users",
            "name": "userList",
            "meta": { "title": "用户管理" }
          }
        ]
      }
    ],
    "allChildren": []
  },
  "timestamp": 1701234567890
}
```

### 2.3 登出接口

**请求:**

```http
POST /ctrl/sys/logout HTTP/1.1
Authorization: Bearer {token}
```

**响应:**

```json
{
  "code": 0,
  "message": "success",
  "data": null,
  "timestamp": 1701234567890
}
```

### 2.4 获取用户信息

**请求:**

```http
GET /ctrl/sys/user/getUserInfo HTTP/1.1
Authorization: Bearer {token}
```

**响应:**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": "1",
    "username": "admin",
    "realname": "系统管理员",
    "avatar": "",
    "phone": "13800138000",
    "email": "admin@example.com",
    "roles": [
      { "id": "1", "roleName": "超级管理员" }
    ],
    "departments": [
      { "id": "1", "departName": "技术部" }
    ]
  },
  "timestamp": 1701234567890
}
```

---

## 三、系统管理模块 API

### 3.1 用户管理

| 接口 | 方法 | 说明 |
|------|------|------|
| /ctrl/sys/user/list | GET | 用户列表查询 |
| /ctrl/sys/user/add | POST | 新增用户 |
| /ctrl/sys/user/edit | PUT | 编辑用户 |
| /ctrl/sys/user/delete | DELETE | 删除用户 |
| /ctrl/sys/user/resetPassword | PUT | 重置密码 |
| /ctrl/sys/user/freeze | PUT | 冻结用户 |
| /ctrl/sys/user/unfreeze | PUT | 解冻用户 |
| /ctrl/sys/user/export | GET | 导出用户 |
| /ctrl/sys/user/import | POST | 导入用户 |

**用户列表查询:**

```http
GET /ctrl/sys/user/list?pageNo=1&pageSize=10&username=admin&status=1
Authorization: Bearer {token}
```

**请求参数:**

| 参数 | 类型 | 说明 |
|------|------|------|
| pageNo | int | 页码 |
| pageSize | int | 每页条数 |
| username | string | 用户名 (模糊) |
| realname | string | 真实姓名 (模糊) |
| phone | string | 手机号 |
| status | int | 状态 (1正常 2冻结) |
| roleId | string | 角色ID |
| departId | string | 部门ID |

**响应:**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "records": [
      {
        "id": "1",
        "username": "admin",
        "realname": "系统管理员",
        "password": "",
        "salt": "",
        "avatar": "",
        "birthday": "",
        "sex": 1,
        "email": "admin@example.com",
        "phone": "13800138000",
        "workNo": "A001",
        "post": "管理员",
        "telephone": "",
        "status": 1,
        "delFlag": 0,
        "userIdentity": 1,
        "departIds": "1",
        "createBy": "system",
        "createTime": "2024-01-01 10:00:00",
        "updateBy": "",
        "updateTime": ""
      }
    ],
    "total": 100,
    "size": 10,
    "current": 1,
    "pages": 10
  }
}
```

**新增用户:**

```http
POST /ctrl/sys/user/add HTTP/1.1
Authorization: Bearer {token}
Content-Type: application/json

{
  "username": "newuser",
  "realname": "新用户",
  "password": "123456",
  "phone": "13800138001",
  "email": "newuser@example.com",
  "workNo": "A002",
  "post": "员工",
  "sex": 1,
  "roleIds": ["1", "2"],
  "departIds": ["1"],
  "userIdentity": 0
}
```

### 3.2 角色管理

| 接口 | 方法 | 说明 |
|------|------|------|
| /ctrl/sys/role/list | GET | 角色列表查询 |
| /ctrl/sys/role/add | POST | 新增角色 |
| /ctrl/sys/role/edit | PUT | 编辑角色 |
| /ctrl/sys/role/delete | DELETE | 删除角色 |
| /ctrl/sys/role/permission | GET | 获取角色权限 |
| /ctrl/sys/role/setPermission | POST | 设置角色权限 |

**角色列表:**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "records": [
      {
        "id": "1",
        "roleName": "超级管理员",
        "roleCode": "admin",
        "description": "拥有所有权限",
        "createBy": "system",
        "createTime": "2024-01-01 10:00:00"
      },
      {
        "id": "2",
        "roleName": "普通用户",
        "roleCode": "user",
        "description": "普通用户角色",
        "createBy": "system",
        "createTime": "2024-01-01 10:00:00"
      }
    ],
    "total": 2
  }
}
```

**设置角色权限:**

```http
POST /ctrl/sys/role/setPermission HTTP/1.1
Authorization: Bearer {token}
Content-Type: application/json

{
  "roleId": "2",
  "permissionIds": [
    "1a2b3c4d",
    "2b3c4d5e",
    "3c4d5e6f"
  ],
  "dataRuleIds": []
}
```

### 3.3 权限管理

| 接口 | 方法 | 说明 |
|------|------|------|
| /ctrl/sys/permission/list | GET | 权限列表 (树形) |
| /ctrl/sys/permission/add | POST | 新增权限 |
| /ctrl/sys/permission/edit | PUT | 编辑权限 |
| /ctrl/sys/permission/delete | DELETE | 删除权限 |

**权限树响应:**

```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "id": "1",
      "parentId": "0",
      "name": "系统管理",
      "perms": "",
      "permsType": "",
      "icon": "setting",
      "component": "",
      "url": "/system",
      "sortNo": 1,
      "menuType": 0,
      "isLeaf": false,
      "children": [
        {
          "id": "1a",
          "parentId": "1",
          "name": "用户管理",
          "perms": "sys:user:view",
          "permsType": "permission",
          "icon": "user",
          "component": "/system/users/index",
          "url": "/system/users",
          "menuType": 1,
          "isLeaf": true
        }
      ]
    }
  ]
}
```

### 3.4 部门管理

| 接口 | 方法 | 说明 |
|------|------|------|
| /ctrl/sys/depart/list | GET | 部门列表 (树形) |
| /ctrl/sys/depart/add | POST | 新增部门 |
| /ctrl/sys/depart/edit | PUT | 编辑部门 |
| /ctrl/sys/depart/delete | DELETE | 删除部门 |
| /ctrl/sys/depart/sync | POST | 同步部门 |

**部门树响应:**

```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "id": "1",
      "parentId": "0",
      "departName": "技术部",
      "departNameEn": "Technology",
      "departNameAbbr": "TECH",
      "departOrder": 1,
      "description": "技术研发部门",
      "orgCategory": "company",
      "orgType": "tech",
      "orgCode": "TECH001",
      "mobile": "",
      "fax": "",
      "address": "",
      "memo": "",
      "status": "1",
      "children": [
        {
          "id": "1a",
          "parentId": "1",
          "departName": "前端组",
          "departOrder": 1
        }
      ]
    }
  ]
}
```

### 3.5 字典管理

| 接口 | 方法 | 说明 |
|------|------|------|
| /ctrl/sys/dict/list | GET | 字典类型列表 |
| /ctrl/sys/dict/add | POST | 新增字典类型 |
| /ctrl/sys/dict/edit | PUT | 编辑字典类型 |
| /ctrl/sys/dict/delete | DELETE | 删除字典类型 |
| /ctrl/sys/dictItem/list | GET | 字典项列表 |
| /ctrl/sys/dictItem/add | POST | 新增字典项 |
| /ctrl/sys/dictItem/edit | PUT | 编辑字典项 |
| /ctrl/sys/dictItem/delete | DELETE | 删除字典项 |

---

## 四、应用服务模块 API

### 4.1 应用管理

| 接口 | 方法 | 说明 |
|------|------|------|
| /app/list | GET | 应用列表 |
| /app/add | POST | 新增应用 |
| /app/edit | PUT | 编辑应用 |
| /app/delete | DELETE | 删除应用 |
| /app/enable | PUT | 启用应用 |
| /app/disable | PUT | 禁用应用 |
| /app/service/grant | POST | 服务授权 |

**应用列表响应:**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "records": [
      {
        "appId": "1",
        "appCode": "APP001",
        "appName": "统一认证平台",
        "orgName": "SRS公司",
        "appType": 1,
        "contactName": "张三",
        "contactPhone": "13800138000",
        "status": 1,
        "serverUrl": "http://service.example.com",
        "createTime": "2024-01-01 10:00:00"
      }
    ],
    "total": 10
  }
}
```

### 4.2 服务管理

| 接口 | 方法 | 说明 |
|------|------|------|
| /open/list | GET | 服务列表 |
| /open/add | POST | 新增服务 |
| /open/edit | PUT | 编辑服务 |
| /open/delete | DELETE | 删除服务 |
| /open/{id} | GET | 获取服务详情 |
| /open/serviceTree | GET | 服务树形结构 |

**服务列表响应:**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "records": [
      {
        "serviceId": "1",
        "parentServiceId": 0,
        "serviceName": "用户服务",
        "serviceCode": "USER_SERVICE",
        "serviceUrl": "/api/user",
        "remoteUrl": "http://remote.example.com/user",
        "requestMethod": "post",
        "isLogin": 0,
        "isSign": 1,
        "responseCode": "code",
        "responseMsg": "message",
        "concurrent": 100,
        "sortNo": 1,
        "requestLog": 1,
        "responseLog": 1,
        "status": 1
      }
    ]
  }
}
```

---

## 五、文档管理模块 API

### 5.1 文档管理

| 接口 | 方法 | 说明 |
|------|------|------|
| /doc/list | GET | 文档列表 |
| /doc/add | POST | 新增文档 |
| /doc/edit | PUT | 编辑文档 |
| /doc/delete | DELETE | 删除文档 |
| /doc/upload | POST | 上传文档 |
| /doc/download/{id} | GET | 下载文档 |
| /doc/preview/{id} | GET | 预览文档 |

### 5.2 文件上传

**请求:**

```http
POST /doc/upload HTTP/1.1
Authorization: Bearer {token}
Content-Type: multipart/form-data

file: (binary)
category: document
tags: "tag1,tag2"
```

**响应:**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": "1",
    "fileName": "document.pdf",
    "filePath": "/2024/01/15/document_abc123.pdf",
    "fileSize": 1024000,
    "fileType": "application/pdf",
    "fileExt": ".pdf"
  }
}
```

---

## 六、网关路由 API

### 6.1 路由配置

| 接口 | 方法 | 说明 |
|------|------|------|
| /gateway/route/list | GET | 路由列表 |
| /gateway/route/add | POST | 新增路由 |
| /gateway/route/edit | PUT | 编辑路由 |
| /gateway/route/delete | DELETE | 删除路由 |
| /gateway/route/refresh | POST | 刷新路由 |

---

## 七、错误码详解

### 7.1 系统级错误码

| 错误码 | 说明 | 解决方案 |
|--------|------|----------|
| 1001 | 参数校验失败 | 检查请求参数 |
| 1002 | 签名验证失败 | 检查签名算法 |
| 2001 | 未登录 | 调用登录接口 |
| 2002 | token过期 | 刷新token或重新登录 |
| 2003 | 无权限访问 | 联系管理员授权 |
| 5000 | 系统内部错误 | 查看服务日志 |

### 7.2 业务级错误码

| 错误码 | 说明 | 解决方案 |
|--------|------|----------|
| 3001 | 业务处理失败 | 查看message具体信息 |
| 3002 | 数据不存在 | 检查查询条件 |
| 3003 | 数据已存在 | 更换数据内容 |
| 3004 | 数据关联引用 | 先删除关联数据 |
| 3005 | 操作不支持 | 检查操作类型 |

---

## 八、接口签名算法

### 8.1 签名生成规则

```javascript
/**
 * 签名算法说明:
 * 1. 将请求参数按 key 进行字典序排序
 * 2. 将 key=value 形式用 & 连接
 * 3. 在字符串末尾拼接密钥
 * 4. 对整个字符串进行 MD5/SM4 加密
 */

// 示例
const params = {
  timestamp: 1701234567890,
  userId: "1",
  action: "query"
};
const secret = "your_secret_key";

// 排序后的参数字符串
const sortedParams = "action=query&timestamp=1701234567890&userId=1";
// 拼接密钥
const signStr = sortedParams + secret;
// MD5 加密
const sign = md5(signStr);
```

---

*文档版本: v1.0*
*生成时间: 2026-04-14*

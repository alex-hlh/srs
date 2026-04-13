-- =========================================
-- 星环空间 (SRS) 数据库初始化脚本
-- 数据库版本: MySQL 8.0+
-- 生成时间: 2026-04-13
-- =========================================

-- 创建数据库
CREATE DATABASE IF NOT EXISTS srs_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE srs_db;

-- =========================================
-- 1. 用户权限模块
-- =========================================

-- 用户表
DROP TABLE IF EXISTS sys_user;
CREATE TABLE sys_user (
    id VARCHAR(32) NOT NULL COMMENT '主键',
    username VARCHAR(100) NOT NULL COMMENT '登录账号',
    realname VARCHAR(100) DEFAULT NULL COMMENT '真实姓名',
    password VARCHAR(255) DEFAULT NULL COMMENT '密码',
    salt VARCHAR(45) DEFAULT NULL COMMENT '密码盐',
    avatar VARCHAR(255) DEFAULT NULL COMMENT '头像URL',
    birthday DATETIME DEFAULT NULL COMMENT '生日',
    sex TINYINT(1) DEFAULT NULL COMMENT '性别 1男2女',
    email VARCHAR(100) DEFAULT NULL COMMENT '邮箱',
    phone VARCHAR(20) DEFAULT NULL COMMENT '手机号',
    work_no VARCHAR(50) DEFAULT NULL COMMENT '工号',
    post VARCHAR(50) DEFAULT NULL COMMENT '职务',
    telephone VARCHAR(20) DEFAULT NULL COMMENT '座机',
    status TINYINT(1) DEFAULT 1 COMMENT '状态 1正常 2冻结',
    del_flag TINYINT(1) DEFAULT 0 COMMENT '删除标志 0未删 1已删',
    user_identity TINYINT(1) DEFAULT 0 COMMENT '身份 0普通 1上级',
    depart_ids VARCHAR(255) DEFAULT NULL COMMENT '负责部门ID列表',
    create_by VARCHAR(50) DEFAULT NULL COMMENT '创建人',
    create_time DATETIME DEFAULT NULL COMMENT '创建时间',
    update_by VARCHAR(50) DEFAULT NULL COMMENT '更新人',
    update_time DATETIME DEFAULT NULL COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_username (username),
    UNIQUE KEY uk_work_no (work_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 角色表
DROP TABLE IF EXISTS sys_role;
CREATE TABLE sys_role (
    id VARCHAR(32) NOT NULL COMMENT '主键',
    role_name VARCHAR(100) NOT NULL COMMENT '角色名称',
    role_code VARCHAR(100) NOT NULL COMMENT '角色编码',
    description VARCHAR(255) DEFAULT NULL COMMENT '描述',
    create_by VARCHAR(50) DEFAULT NULL COMMENT '创建人',
    create_time DATETIME DEFAULT NULL COMMENT '创建时间',
    update_by VARCHAR(50) DEFAULT NULL COMMENT '更新人',
    update_time DATETIME DEFAULT NULL COMMENT '更新时间',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色表';

-- 菜单权限表
DROP TABLE IF EXISTS sys_permission;
CREATE TABLE sys_permission (
    id VARCHAR(32) NOT NULL COMMENT '主键',
    parent_id VARCHAR(32) DEFAULT NULL COMMENT '父菜单ID',
    name VARCHAR(100) DEFAULT NULL COMMENT '菜单名称',
    perms VARCHAR(255) DEFAULT NULL COMMENT '权限标识',
    perms_type VARCHAR(10) DEFAULT NULL COMMENT '权限类型',
    icon VARCHAR(100) DEFAULT NULL COMMENT '图标',
    component VARCHAR(255) DEFAULT NULL COMMENT '组件路径',
    url VARCHAR(255) DEFAULT NULL COMMENT 'URL路径',
    redirect VARCHAR(255) DEFAULT NULL COMMENT '跳转地址',
    sort_no DECIMAL(10,2) DEFAULT NULL COMMENT '排序号',
    menu_type TINYINT(1) DEFAULT NULL COMMENT '类型 0菜单1子菜单2按钮',
    is_leaf TINYINT(1) DEFAULT NULL COMMENT '是否叶子节点',
    is_route TINYINT(1) DEFAULT 1 COMMENT '是否路由菜单',
    keep_alive TINYINT(1) DEFAULT 0 COMMENT '是否缓存',
    hidden TINYINT(1) DEFAULT 0 COMMENT '是否隐藏',
    always_show TINYINT(1) DEFAULT NULL COMMENT 'alwaysShow',
    description VARCHAR(255) DEFAULT NULL COMMENT '描述',
    rule_flag TINYINT(1) DEFAULT NULL COMMENT '是否配置数据权限',
    status VARCHAR(2) DEFAULT NULL COMMENT '状态',
    del_flag TINYINT(1) DEFAULT 0 COMMENT '删除标志',
    create_by VARCHAR(50) DEFAULT NULL COMMENT '创建人',
    create_time DATETIME DEFAULT NULL COMMENT '创建时间',
    update_by VARCHAR(50) DEFAULT NULL COMMENT '更新人',
    update_time DATETIME DEFAULT NULL COMMENT '更新时间',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='菜单权限表';

-- 部门表
DROP TABLE IF EXISTS sys_depart;
CREATE TABLE sys_depart (
    id VARCHAR(32) NOT NULL COMMENT '主键',
    parent_id VARCHAR(32) DEFAULT NULL COMMENT '父部门ID',
    depart_name VARCHAR(100) DEFAULT NULL COMMENT '部门名称',
    depart_name_en VARCHAR(100) DEFAULT NULL COMMENT '英文名称',
    depart_name_abbr VARCHAR(100) DEFAULT NULL COMMENT '缩写',
    depart_order INT DEFAULT 0 COMMENT '排序',
    description VARCHAR(255) DEFAULT NULL COMMENT '描述',
    org_category VARCHAR(10) DEFAULT NULL COMMENT '机构类别',
    org_type VARCHAR(10) DEFAULT NULL COMMENT '机构类型',
    org_code VARCHAR(50) DEFAULT NULL COMMENT '机构编码',
    mobile VARCHAR(20) DEFAULT NULL COMMENT '手机号',
    fax VARCHAR(20) DEFAULT NULL COMMENT '传真',
    address VARCHAR(255) DEFAULT NULL COMMENT '地址',
    memo VARCHAR(255) DEFAULT NULL COMMENT '备注',
    status VARCHAR(2) DEFAULT NULL COMMENT '状态',
    del_flag TINYINT(1) DEFAULT 0 COMMENT '删除标志',
    create_by VARCHAR(50) DEFAULT NULL COMMENT '创建人',
    create_time DATETIME DEFAULT NULL COMMENT '创建时间',
    update_by VARCHAR(50) DEFAULT NULL COMMENT '更新人',
    update_time DATETIME DEFAULT NULL COMMENT '更新时间',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='部门表';

-- 租户表
DROP TABLE IF EXISTS sys_tenant;
CREATE TABLE sys_tenant (
    id INT NOT NULL COMMENT '主键',
    name VARCHAR(100) DEFAULT NULL COMMENT '名称',
    create_by VARCHAR(50) DEFAULT NULL COMMENT '创建人',
    create_time DATETIME DEFAULT NULL COMMENT '创建时间',
    begin_date DATE DEFAULT NULL COMMENT '开始时间',
    end_date DATE DEFAULT NULL COMMENT '结束时间',
    status INT DEFAULT 1 COMMENT '状态',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='租户表';

-- 用户角色关联表
DROP TABLE IF EXISTS sys_user_role;
CREATE TABLE sys_user_role (
    id VARCHAR(32) NOT NULL COMMENT '主键',
    user_id VARCHAR(32) DEFAULT NULL COMMENT '用户ID',
    role_id VARCHAR(32) DEFAULT NULL COMMENT '角色ID',
    PRIMARY KEY (id),
    KEY idx_user_id (user_id),
    KEY idx_role_id (role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户角色关联表';

-- 角色权限关联表
DROP TABLE IF EXISTS sys_role_permission;
CREATE TABLE sys_role_permission (
    id VARCHAR(32) NOT NULL COMMENT '主键',
    role_id VARCHAR(32) DEFAULT NULL COMMENT '角色ID',
    permission_id VARCHAR(32) DEFAULT NULL COMMENT '权限ID',
    data_rule_ids VARCHAR(255) DEFAULT NULL COMMENT '数据权限ID列表',
    PRIMARY KEY (id),
    KEY idx_role_id (role_id),
    KEY idx_permission_id (permission_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色权限关联表';

-- 用户部门关联表
DROP TABLE IF EXISTS sys_user_depart;
CREATE TABLE sys_user_depart (
    id VARCHAR(32) NOT NULL COMMENT '主键',
    user_id VARCHAR(32) DEFAULT NULL COMMENT '用户ID',
    depart_id VARCHAR(32) DEFAULT NULL COMMENT '部门ID',
    PRIMARY KEY (id),
    KEY idx_user_id (user_id),
    KEY idx_depart_id (depart_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户部门关联表';

-- 部门角色表
DROP TABLE IF EXISTS sys_depart_role;
CREATE TABLE sys_depart_role (
    id VARCHAR(32) NOT NULL COMMENT '主键',
    depart_id VARCHAR(32) DEFAULT NULL COMMENT '部门ID',
    role_name VARCHAR(100) DEFAULT NULL COMMENT '角色名称',
    role_code VARCHAR(100) DEFAULT NULL COMMENT '角色编码',
    description VARCHAR(255) DEFAULT NULL COMMENT '描述',
    create_by VARCHAR(50) DEFAULT NULL COMMENT '创建人',
    create_time DATETIME DEFAULT NULL COMMENT '创建时间',
    update_by VARCHAR(50) DEFAULT NULL COMMENT '更新人',
    update_time DATETIME DEFAULT NULL COMMENT '更新时间',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='部门角色表';

-- =========================================
-- 2. 字典模块
-- =========================================

-- 字典表
DROP TABLE IF EXISTS sys_dict;
CREATE TABLE sys_dict (
    id VARCHAR(32) NOT NULL COMMENT '主键',
    dict_name VARCHAR(100) DEFAULT NULL COMMENT '字典名称',
    dict_code VARCHAR(100) DEFAULT NULL COMMENT '字典编码',
    description VARCHAR(255) DEFAULT NULL COMMENT '描述',
    del_flag TINYINT(1) DEFAULT 0 COMMENT '删除标志',
    create_by VARCHAR(50) DEFAULT NULL COMMENT '创建人',
    create_time DATETIME DEFAULT NULL COMMENT '创建时间',
    update_by VARCHAR(50) DEFAULT NULL COMMENT '更新人',
    update_time DATETIME DEFAULT NULL COMMENT '更新时间',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='字典表';

-- 字典项表
DROP TABLE IF EXISTS sys_dict_item;
CREATE TABLE sys_dict_item (
    id VARCHAR(32) NOT NULL COMMENT '主键',
    dict_id VARCHAR(32) DEFAULT NULL COMMENT '字典ID',
    item_text VARCHAR(100) DEFAULT NULL COMMENT '字典项文本',
    item_value VARCHAR(100) DEFAULT NULL COMMENT '字典项值',
    description VARCHAR(255) DEFAULT NULL COMMENT '描述',
    sort_order INT DEFAULT 0 COMMENT '排序',
    status TINYINT(1) DEFAULT 1 COMMENT '状态',
    create_by VARCHAR(50) DEFAULT NULL COMMENT '创建人',
    create_time DATETIME DEFAULT NULL COMMENT '创建时间',
    update_by VARCHAR(50) DEFAULT NULL COMMENT '更新人',
    update_time DATETIME DEFAULT NULL COMMENT '更新时间',
    PRIMARY KEY (id),
    KEY idx_dict_id (dict_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='字典项表';

-- =========================================
-- 3. 日志模块
-- =========================================

-- 登录日志表
DROP TABLE IF EXISTS sys_log_login;
CREATE TABLE sys_log_login (
    id VARCHAR(32) NOT NULL COMMENT '主键',
    user_id VARCHAR(32) DEFAULT NULL COMMENT '用户ID',
    username VARCHAR(100) DEFAULT NULL COMMENT '用户名',
    ip VARCHAR(50) DEFAULT NULL COMMENT 'IP地址',
    result VARCHAR(50) DEFAULT NULL COMMENT '登录结果',
    log_type VARCHAR(10) DEFAULT NULL COMMENT '日志类型',
    fail_reason VARCHAR(255) DEFAULT NULL COMMENT '失败原因',
    origin_app VARCHAR(50) DEFAULT NULL COMMENT '来源应用',
    target_app VARCHAR(50) DEFAULT NULL COMMENT '目标应用',
    request_url VARCHAR(255) DEFAULT NULL COMMENT '请求地址',
    create_time DATETIME DEFAULT NULL COMMENT '创建时间',
    PRIMARY KEY (id),
    KEY idx_username (username),
    KEY idx_create_time (create_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='登录日志表';

-- 操作日志表
DROP TABLE IF EXISTS sys_log_operate;
CREATE TABLE sys_log_operate (
    id VARCHAR(32) NOT NULL COMMENT '主键',
    username VARCHAR(100) DEFAULT NULL COMMENT '操作人',
    ip VARCHAR(50) DEFAULT NULL COMMENT 'IP地址',
    method VARCHAR(200) DEFAULT NULL COMMENT '请求方法',
    request_url VARCHAR(500) DEFAULT NULL COMMENT '请求路径',
    request_param TEXT DEFAULT NULL COMMENT '请求参数',
    request_type VARCHAR(10) DEFAULT NULL COMMENT '请求类型',
    cost_time BIGINT DEFAULT NULL COMMENT '耗时(ms)',
    log_content TEXT DEFAULT NULL COMMENT '日志内容',
    log_type INT DEFAULT NULL COMMENT '日志类型',
    operate_type INT DEFAULT NULL COMMENT '操作类型',
    create_by VARCHAR(50) DEFAULT NULL COMMENT '创建人',
    create_time DATETIME DEFAULT NULL COMMENT '创建时间',
    PRIMARY KEY (id),
    KEY idx_username (username),
    KEY idx_create_time (create_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='操作日志表';

-- =========================================
-- 4. 业务模块
-- =========================================

-- 应用信息表
DROP TABLE IF EXISTS sys_app_info;
CREATE TABLE sys_app_info (
    app_id VARCHAR(32) NOT NULL COMMENT '应用ID',
    app_code VARCHAR(100) NOT NULL COMMENT '应用编码',
    app_name VARCHAR(100) NOT NULL COMMENT '应用名称',
    org_name VARCHAR(100) DEFAULT NULL COMMENT '所属机构',
    app_type INT DEFAULT NULL COMMENT '应用类型',
    data_secret VARCHAR(255) DEFAULT NULL COMMENT '数据密钥',
    sign_secret VARCHAR(255) DEFAULT NULL COMMENT '签名密钥',
    secret_update_time DATETIME DEFAULT NULL COMMENT '密钥更新时间',
    contact_name VARCHAR(50) DEFAULT NULL COMMENT '联系人',
    contact_phone VARCHAR(20) DEFAULT NULL COMMENT '联系电话',
    status INT NOT NULL DEFAULT 1 COMMENT '状态 1启用 0禁用',
    enc_type VARCHAR(20) DEFAULT NULL COMMENT '加密算法',
    start_time DATETIME DEFAULT NULL COMMENT '生效时间',
    end_time DATETIME DEFAULT NULL COMMENT '失效时间',
    concurrent INT DEFAULT 10 COMMENT '并发数',
    access_token_survival BIGINT DEFAULT 7200 COMMENT 'token有效期(秒)',
    refresh_token_survival BIGINT DEFAULT 604800 COMMENT '刷新token有效期',
    server_url VARCHAR(255) DEFAULT NULL COMMENT '服务地址',
    tenant_id INT DEFAULT NULL COMMENT '租户ID',
    sort_no INT DEFAULT 0 COMMENT '排序',
    white_ip VARCHAR(500) DEFAULT NULL COMMENT 'IP白名单',
    is_del TINYINT(1) DEFAULT 0 COMMENT '删除标志',
    create_by VARCHAR(50) DEFAULT NULL COMMENT '创建人',
    create_time DATETIME DEFAULT NULL COMMENT '创建时间',
    update_by VARCHAR(50) DEFAULT NULL COMMENT '更新人',
    update_time DATETIME DEFAULT NULL COMMENT '更新时间',
    PRIMARY KEY (app_id),
    UNIQUE KEY uk_app_code (app_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='应用信息表';

-- 开放服务表
DROP TABLE IF EXISTS sys_open_service;
CREATE TABLE sys_open_service (
    id VARCHAR(32) NOT NULL COMMENT '主键',
    service_code VARCHAR(100) NOT NULL COMMENT '服务编码',
    service_name VARCHAR(100) DEFAULT NULL COMMENT '服务名称',
    service_type VARCHAR(20) DEFAULT NULL COMMENT '服务类型',
    service_url VARCHAR(255) DEFAULT NULL COMMENT '服务地址',
    service_desc VARCHAR(500) DEFAULT NULL COMMENT '服务描述',
    status INT DEFAULT 1 COMMENT '状态',
    is_del TINYINT(1) DEFAULT 0 COMMENT '删除标志',
    create_by VARCHAR(50) DEFAULT NULL COMMENT '创建人',
    create_time DATETIME DEFAULT NULL COMMENT '创建时间',
    update_by VARCHAR(50) DEFAULT NULL COMMENT '更新人',
    update_time DATETIME DEFAULT NULL COMMENT '更新时间',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='开放服务表';

-- 服务参数表
DROP TABLE IF EXISTS sys_service_param;
CREATE TABLE sys_service_param (
    id BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
    service_id VARCHAR(32) DEFAULT NULL COMMENT '服务ID',
    param_name VARCHAR(100) DEFAULT NULL COMMENT '参数名称',
    param_key VARCHAR(100) DEFAULT NULL COMMENT '参数键',
    param_value VARCHAR(500) DEFAULT NULL COMMENT '参数值',
    param_type VARCHAR(20) DEFAULT NULL COMMENT '参数类型',
    param_required INT DEFAULT 0 COMMENT '是否必填',
    param_order INT DEFAULT 0 COMMENT '排序',
    description VARCHAR(255) DEFAULT NULL COMMENT '描述',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='服务参数表';

-- 计算历史记录表
DROP TABLE IF EXISTS calc_history_record;
CREATE TABLE calc_history_record (
    id VARCHAR(32) NOT NULL COMMENT '主键',
    calc_name VARCHAR(100) DEFAULT NULL COMMENT '计算名称',
    calc_type VARCHAR(50) DEFAULT NULL COMMENT '计算类型',
    input_params TEXT DEFAULT NULL COMMENT '输入参数JSON',
    output_result TEXT DEFAULT NULL COMMENT '输出结果JSON',
    status INT DEFAULT NULL COMMENT '状态 0进行中 1成功 2失败',
    error_message VARCHAR(500) DEFAULT NULL COMMENT '错误信息',
    user_id VARCHAR(32) DEFAULT NULL COMMENT '用户ID',
    tenant_id INT DEFAULT NULL COMMENT '租户ID',
    is_del TINYINT(1) DEFAULT 0 COMMENT '删除标志',
    create_by VARCHAR(50) DEFAULT NULL COMMENT '创建人',
    create_time DATETIME DEFAULT NULL COMMENT '创建时间',
    update_by VARCHAR(50) DEFAULT NULL COMMENT '更新人',
    update_time DATETIME DEFAULT NULL COMMENT '更新时间',
    PRIMARY KEY (id),
    KEY idx_user_id (user_id),
    KEY idx_create_time (create_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='计算历史记录表';

-- 计算参数配置表
DROP TABLE IF EXISTS calc_param_conf;
CREATE TABLE calc_param_conf (
    id VARCHAR(32) NOT NULL COMMENT '主键',
    conf_name VARCHAR(100) DEFAULT NULL COMMENT '配置名称',
    conf_key VARCHAR(100) DEFAULT NULL COMMENT '配置键',
    conf_value VARCHAR(500) DEFAULT NULL COMMENT '配置值',
    conf_type VARCHAR(50) DEFAULT NULL COMMENT '配置类型',
    default_value VARCHAR(255) DEFAULT NULL COMMENT '默认值',
    value_range VARCHAR(255) DEFAULT NULL COMMENT '取值范围',
    required INT DEFAULT 0 COMMENT '是否必填',
    sort_order INT DEFAULT 0 COMMENT '排序',
    description VARCHAR(255) DEFAULT NULL COMMENT '描述',
    is_del TINYINT(1) DEFAULT 0 COMMENT '删除标志',
    create_by VARCHAR(50) DEFAULT NULL COMMENT '创建人',
    create_time DATETIME DEFAULT NULL COMMENT '创建时间',
    update_by VARCHAR(50) DEFAULT NULL COMMENT '更新人',
    update_time DATETIME DEFAULT NULL COMMENT '更新时间',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='计算参数配置表';

-- 快速计算模板表
DROP TABLE IF EXISTS quick_calc_template;
CREATE TABLE quick_calc_template (
    id VARCHAR(32) NOT NULL COMMENT '主键',
    template_name VARCHAR(100) DEFAULT NULL COMMENT '模板名称',
    template_code VARCHAR(100) DEFAULT NULL COMMENT '模板编码',
    template_desc VARCHAR(500) DEFAULT NULL COMMENT '模板描述',
    template_config TEXT DEFAULT NULL COMMENT '模板配置JSON',
    category VARCHAR(50) DEFAULT NULL COMMENT '分类',
    status INT DEFAULT 1 COMMENT '状态',
    is_public INT DEFAULT 0 COMMENT '是否公开',
    user_id VARCHAR(32) DEFAULT NULL COMMENT '创建用户',
    tenant_id INT DEFAULT NULL COMMENT '租户ID',
    is_del TINYINT(1) DEFAULT 0 COMMENT '删除标志',
    create_by VARCHAR(50) DEFAULT NULL COMMENT '创建人',
    create_time DATETIME DEFAULT NULL COMMENT '创建时间',
    update_by VARCHAR(50) DEFAULT NULL COMMENT '更新人',
    update_time DATETIME DEFAULT NULL COMMENT '更新时间',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='快速计算模板表';

-- 流程设计表
DROP TABLE IF EXISTS gt_flow_design;
CREATE TABLE gt_flow_design (
    id VARCHAR(32) NOT NULL COMMENT '主键',
    flow_name VARCHAR(100) DEFAULT NULL COMMENT '流程名称',
    flow_code VARCHAR(100) DEFAULT NULL COMMENT '流程编码',
    flow_config TEXT DEFAULT NULL COMMENT '流程配置JSON',
    flow_desc VARCHAR(500) DEFAULT NULL COMMENT '流程描述',
    version INT DEFAULT 1 COMMENT '版本号',
    status INT DEFAULT 1 COMMENT '状态 0禁用 1启用',
    publish_status INT DEFAULT 0 COMMENT '发布状态',
    user_id VARCHAR(32) DEFAULT NULL COMMENT '创建用户',
    tenant_id INT DEFAULT NULL COMMENT '租户ID',
    is_del TINYINT(1) DEFAULT 0 COMMENT '删除标志',
    create_by VARCHAR(50) DEFAULT NULL COMMENT '创建人',
    create_time DATETIME DEFAULT NULL COMMENT '创建时间',
    update_by VARCHAR(50) DEFAULT NULL COMMENT '更新人',
    update_time DATETIME DEFAULT NULL COMMENT '更新时间',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='流程设计表';

-- 文档主表
DROP TABLE IF EXISTS fdc_main_doc;
CREATE TABLE fdc_main_doc (
    id VARCHAR(32) NOT NULL COMMENT '主键',
    doc_name VARCHAR(255) DEFAULT NULL COMMENT '文档名称',
    doc_type VARCHAR(50) DEFAULT NULL COMMENT '文档类型',
    doc_path VARCHAR(500) DEFAULT NULL COMMENT '存储路径',
    doc_size BIGINT DEFAULT NULL COMMENT '文件大小',
    category VARCHAR(50) DEFAULT NULL COMMENT '分类',
    tags VARCHAR(255) DEFAULT NULL COMMENT '标签',
    status INT DEFAULT 1 COMMENT '状态',
    is_public INT DEFAULT 0 COMMENT '是否公开',
    user_id VARCHAR(32) DEFAULT NULL COMMENT '上传用户',
    tenant_id INT DEFAULT NULL COMMENT '租户ID',
    is_del TINYINT(1) DEFAULT 0 COMMENT '删除标志',
    create_by VARCHAR(50) DEFAULT NULL COMMENT '创建人',
    create_time DATETIME DEFAULT NULL COMMENT '创建时间',
    update_by VARCHAR(50) DEFAULT NULL COMMENT '更新人',
    update_time DATETIME DEFAULT NULL COMMENT '更新时间',
    PRIMARY KEY (id),
    KEY idx_user_id (user_id),
    KEY idx_create_time (create_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文档主表';

-- 文档版本表
DROP TABLE IF EXISTS fdc_version_doc;
CREATE TABLE fdc_version_doc (
    id VARCHAR(32) NOT NULL COMMENT '主键',
    doc_id VARCHAR(32) DEFAULT NULL COMMENT '文档ID',
    version INT DEFAULT NULL COMMENT '版本号',
    doc_name VARCHAR(255) DEFAULT NULL COMMENT '文档名称',
    doc_path VARCHAR(500) DEFAULT NULL COMMENT '存储路径',
    doc_size BIGINT DEFAULT NULL COMMENT '文件大小',
    change_desc VARCHAR(500) DEFAULT NULL COMMENT '变更说明',
    user_id VARCHAR(32) DEFAULT NULL COMMENT '操作用户',
    is_del TINYINT(1) DEFAULT 0 COMMENT '删除标志',
    create_by VARCHAR(50) DEFAULT NULL COMMENT '创建人',
    create_time DATETIME DEFAULT NULL COMMENT '创建时间',
    PRIMARY KEY (id),
    KEY idx_doc_id (doc_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文档版本表';

-- 上传文件表
DROP TABLE IF EXISTS fdc_upload_file;
CREATE TABLE fdc_upload_file (
    id VARCHAR(32) NOT NULL COMMENT '主键',
    file_name VARCHAR(255) DEFAULT NULL COMMENT '文件名',
    file_path VARCHAR(500) DEFAULT NULL COMMENT '存储路径',
    file_size BIGINT DEFAULT NULL COMMENT '文件大小',
    file_type VARCHAR(50) DEFAULT NULL COMMENT '文件类型',
    file_ext VARCHAR(20) DEFAULT NULL COMMENT '文件扩展名',
    bucket_name VARCHAR(100) DEFAULT NULL COMMENT '存储桶名称',
    user_id VARCHAR(32) DEFAULT NULL COMMENT '上传用户',
    tenant_id INT DEFAULT NULL COMMENT '租户ID',
    is_del TINYINT(1) DEFAULT 0 COMMENT '删除标志',
    create_by VARCHAR(50) DEFAULT NULL COMMENT '创建人',
    create_time DATETIME DEFAULT NULL COMMENT '创建时间',
    update_by VARCHAR(50) DEFAULT NULL COMMENT '更新人',
    update_time DATETIME DEFAULT NULL COMMENT '更新时间',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='上传文件表';

-- =========================================
-- 5. 初始化数据
-- =========================================

-- 插入超级管理员用户 (密码: admin123, MD5加密)
INSERT INTO sys_user (id, username, realname, password, salt, status, del_flag, create_time) VALUES
('1', 'admin', '系统管理员', '25d55ad283aa400af464c76d713c07ad', 'abc123', 1, 0, NOW());

-- 插入系统角色
INSERT INTO sys_role (id, role_name, role_code, description, create_time) VALUES
('1', '超级管理员', 'super_admin', '拥有系统所有权限', NOW()),
('2', '普通用户', 'user', '普通用户角色', NOW());

-- 插入用户角色关联
INSERT INTO sys_user_role (id, user_id, role_id) VALUES
('1', '1', '1');

-- 插入部门
INSERT INTO sys_depart (id, parent_id, depart_name, depart_order, del_flag, create_time) VALUES
('1', '0', '总公司', 0, 0, NOW()),
('2', '1', '技术部', 1, 0, NOW()),
('3', '1', '运营部', 2, 0, NOW());

-- 插入用户部门关联
INSERT INTO sys_user_depart (id, user_id, depart_id) VALUES
('1', '1', '1');

-- 插入字典数据
INSERT INTO sys_dict (id, dict_name, dict_code, del_flag, create_time) VALUES
('1', '用户状态', 'user_status', 0, NOW()),
('2', '性别', 'sex', 0, NOW()),
('3', '菜单类型', 'menu_type', 0, NOW());

-- 插入字典项
INSERT INTO sys_dict_item (id, dict_id, item_text, item_value, sort_order, status, create_time) VALUES
('1', '1', '正常', '1', 1, 1, NOW()),
('2', '1', '冻结', '2', 2, 1, NOW()),
('3', '2', '男', '1', 1, 1, NOW()),
('4', '2', '女', '2', 2, 1, NOW()),
('5', '3', '目录', '0', 1, 1, NOW()),
('6', '3', '菜单', '1', 2, 1, NOW()),
('7', '3', '按钮', '2', 3, 1, NOW());

-- 插入权限菜单
INSERT INTO sys_permission (id, parent_id, name, perms, menu_type, sort_no, del_flag, create_time) VALUES
('1', '0', '系统管理', NULL, 0, 1, 0, NOW()),
('2', '1', '用户管理', 'sys_user', 1, 1, 0, NOW()),
('3', '2', '用户列表', 'sys_user:list', 2, 1, 0, NOW()),
('4', '2', '用户新增', 'sys_user:add', 2, 2, 0, NOW()),
('5', '2', '用户编辑', 'sys_user:edit', 2, 3, 0, NOW()),
('6', '2', '用户删除', 'sys_user:delete', 2, 4, 0, NOW()),
('7', '1', '角色管理', 'sys_role', 1, 2, 0, NOW()),
('8', '7', '角色列表', 'sys_role:list', 2, 1, 0, NOW()),
('9', '7', '角色新增', 'sys_role:add', 2, 2, 0, NOW()),
('10', '7', '角色编辑', 'sys_role:edit', 2, 3, 0, NOW()),
('11', '1', '菜单管理', 'sys_permission', 1, 3, 0, NOW()),
('12', '1', '部门管理', 'sys_depart', 1, 4, 0, NOW());

-- 插入角色权限关联
INSERT INTO sys_role_permission (id, role_id, permission_id) VALUES
('1', '1', '1'),
('2', '1', '2'),
('3', '1', '3'),
('4', '1', '4'),
('5', '1', '5'),
('6', '1', '6'),
('7', '1', '7'),
('8', '1', '8'),
('9', '1', '9'),
('10', '1', '10'),
('11', '1', '11'),
('12', '1', '12');

-- 插入租户
INSERT INTO sys_tenant (id, name, create_time, status) VALUES
(1, '默认租户', NOW(), 1);

-- =========================================
-- 完成
-- =========================================
SELECT '数据库初始化完成!' AS message;

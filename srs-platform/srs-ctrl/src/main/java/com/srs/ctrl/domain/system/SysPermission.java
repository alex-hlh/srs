package com.srs.ctrl.domain.system;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.srs.common.base.domain.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * System Permission
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_permission")
public class SysPermission extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @TableId(type = IdType.ASSIGN_ID)
    private String id;

    private String parentId;
    private String name;
    private String url;
    private String component;
    private String permission;
    private Integer isRoute;
    private Integer menuType;
    private Integer status;
    private Integer delFlag;
    private String icon;
    private Integer sortOrder;
}

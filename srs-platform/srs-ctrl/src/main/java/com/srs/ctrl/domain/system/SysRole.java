package com.srs.ctrl.domain.system;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.srs.common.base.domain.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * System Role
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_role")
public class SysRole extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @TableId(type = IdType.ASSIGN_ID)
    private String id;

    private String roleName;
    private String roleCode;
    private String description;
    private Integer roleType;
    private Integer status;
    private Integer delFlag;
}

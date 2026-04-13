package com.srs.ctrl.domain.system;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.srs.common.base.domain.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * System Department
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_depart")
public class SysDepart extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @TableId(type = IdType.ASSIGN_ID)
    private String id;

    private String parentId;
    private String departName;
    private String departNameEn;
    private String departNameAbbr;
    private Integer departOrder;
    private String description;
    private String orgCategory;
    private Integer status;
    private Integer delFlag;
}

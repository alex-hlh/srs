package com.srs.ctrl.domain.system;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.srs.common.base.domain.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

/**
 * System User
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_user")
public class SysUser extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @TableId(type = IdType.ASSIGN_ID)
    private String id;

    private String username;
    private String password;
    private String salt;
    private String realname;
    private String avatar;
    private LocalDate birthday;
    private Integer sex;
    private String email;
    private String phone;
    private String workNo;
    private String post;
    private String telephone;
    private Integer status;
    private Integer delFlag;
    private Integer userIdentity;
    private String departIds;
}

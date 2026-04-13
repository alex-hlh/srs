package com.srs.center.domain;

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

    /**
     * User ID
     */
    @TableId(type = IdType.ASSIGN_ID)
    private String id;

    /**
     * Username
     */
    private String username;

    /**
     * Password
     */
    private String password;

    /**
     * Salt
     */
    private String salt;

    /**
     * Real name
     */
    private String realname;

    /**
     * Avatar
     */
    private String avatar;

    /**
     * Birthday
     */
    private LocalDate birthday;

    /**
     * Sex: 1=Male, 2=Female
     */
    private Integer sex;

    /**
     * Email
     */
    private String email;

    /**
     * Phone
     */
    private String phone;

    /**
     * Work number
     */
    private String workNo;

    /**
     * Position
     */
    private String post;

    /**
     * Telephone
     */
    private String telephone;

    /**
     * Status: 1=Normal, 2=Frozen
     */
    private Integer status;

    /**
     * Delete flag: 0=Not deleted, 1=Deleted
     */
    private Integer delFlag;

    /**
     * User identity: 0=Normal, 1=Manager
     */
    private Integer userIdentity;

    /**
     * Department IDs (comma separated)
     */
    private String departIds;
}

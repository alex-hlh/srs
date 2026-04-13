package com.srs.ctrl.dao.system;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.srs.ctrl.domain.system.SysUser;
import org.apache.ibatis.annotations.Mapper;

/**
 * System User Mapper
 */
@Mapper
public interface SysUserMapper extends BaseMapper<SysUser> {
}

package com.srs.center.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.srs.center.domain.SysUser;
import org.apache.ibatis.annotations.Mapper;

/**
 * System User Mapper
 */
@Mapper
public interface SysUserMapper extends BaseMapper<SysUser> {
}

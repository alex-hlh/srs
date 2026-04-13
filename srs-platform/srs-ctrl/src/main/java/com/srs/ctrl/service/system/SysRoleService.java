package com.srs.ctrl.service.system;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.srs.ctrl.dao.system.SysRoleMapper;
import com.srs.ctrl.domain.system.SysRole;
import com.srs.common.base.exception.BusinessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * System Role Service
 */
@Slf4j
@Service
public class SysRoleService {

    @Autowired
    private SysRoleMapper roleMapper;

    /**
     * Query role list with pagination
     */
    public Page<SysRole> list(Integer pageNo, Integer pageSize, String roleName) {
        Page<SysRole> page = new Page<>(pageNo, pageSize);
        LambdaQueryWrapper<SysRole> queryWrapper = new LambdaQueryWrapper<>();
        if (StringUtils.hasText(roleName)) {
            queryWrapper.like(SysRole::getRoleName, roleName);
        }
        queryWrapper.eq(SysRole::getDelFlag, 0);
        queryWrapper.orderByDesc(SysRole::getCreateTime);
        return roleMapper.selectPage(page, queryWrapper);
    }

    /**
     * Get all roles
     */
    public List<SysRole> getAll() {
        LambdaQueryWrapper<SysRole> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(SysRole::getDelFlag, 0);
        queryWrapper.orderByAsc(SysRole::getCreateTime);
        return roleMapper.selectList(queryWrapper);
    }

    /**
     * Get role by ID
     */
    public SysRole getById(String id) {
        return roleMapper.selectById(id);
    }

    /**
     * Add role
     */
    @Transactional(rollbackFor = Exception.class)
    public boolean addRole(SysRole role) {
        // Check role code uniqueness
        long count = roleMapper.selectCount(new LambdaQueryWrapper<SysRole>()
                .eq(SysRole::getRoleCode, role.getRoleCode())
                .eq(SysRole::getDelFlag, 0));
        if (count > 0) {
            throw new BusinessException("角色编码已存在");
        }

        role.setId(UUID.randomUUID().toString().replace("-", ""));
        role.setCreateTime(LocalDateTime.now());
        role.setDelFlag(0);

        return roleMapper.insert(role) > 0;
    }

    /**
     * Update role
     */
    @Transactional(rollbackFor = Exception.class)
    public boolean updateRole(SysRole role) {
        role.setUpdateTime(LocalDateTime.now());
        return roleMapper.updateById(role) > 0;
    }

    /**
     * Delete role (logical)
     */
    @Transactional(rollbackFor = Exception.class)
    public boolean deleteRole(String id) {
        SysRole role = new SysRole();
        role.setId(id);
        role.setDelFlag(1);
        role.setUpdateTime(LocalDateTime.now());
        return roleMapper.updateById(role) > 0;
    }
}

package com.srs.ctrl.service.system;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.srs.ctrl.dao.system.SysUserMapper;
import com.srs.ctrl.domain.system.SysUser;
import com.srs.common.base.exception.BusinessException;
import com.srs.common.utils.CryptoUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * System User Service
 */
@Slf4j
@Service
public class SysUserService {

    @Autowired
    private SysUserMapper userMapper;

    /**
     * Query user list with pagination
     */
    public Page<SysUser> list(Integer pageNo, Integer pageSize, String username) {
        Page<SysUser> page = new Page<>(pageNo, pageSize);
        LambdaQueryWrapper<SysUser> queryWrapper = new LambdaQueryWrapper<>();
        if (StringUtils.hasText(username)) {
            queryWrapper.like(SysUser::getUsername, username);
        }
        queryWrapper.eq(SysUser::getDelFlag, 0);
        queryWrapper.orderByDesc(SysUser::getCreateTime);
        Page<SysUser> result = userMapper.selectPage(page, queryWrapper);
        // Mask password
        result.forEach(this::maskPassword);
        return result;
    }

    /**
     * Get user by ID
     */
    public SysUser getById(String id) {
        SysUser user = userMapper.selectById(id);
        if (user != null) {
            maskPassword(user);
        }
        return user;
    }

    /**
     * Add user
     */
    @Transactional(rollbackFor = Exception.class)
    public boolean addUser(SysUser user) {
        // Check username uniqueness
        long count = userMapper.selectCount(new LambdaQueryWrapper<SysUser>()
                .eq(SysUser::getUsername, user.getUsername())
                .eq(SysUser::getDelFlag, 0));
        if (count > 0) {
            throw new BusinessException("用户名已存在");
        }

        // Generate salt and encrypt password
        String salt = UUID.randomUUID().toString().replace("-", "");
        user.setSalt(salt);
        if (StringUtils.hasText(user.getPassword())) {
            user.setPassword(encryptPassword(user.getPassword(), salt));
        }

        user.setId(UUID.randomUUID().toString().replace("-", ""));
        user.setCreateTime(LocalDateTime.now());
        user.setDelFlag(0);

        return userMapper.insert(user) > 0;
    }

    /**
     * Update user
     */
    @Transactional(rollbackFor = Exception.class)
    public boolean updateUser(SysUser user) {
        if (StringUtils.hasText(user.getPassword())) {
            String salt = user.getSalt();
            if (!StringUtils.hasText(salt)) {
                salt = UUID.randomUUID().toString().replace("-", "");
                user.setSalt(salt);
            }
            user.setPassword(encryptPassword(user.getPassword(), salt));
        }
        user.setUpdateTime(LocalDateTime.now());
        return userMapper.updateById(user) > 0;
    }

    /**
     * Delete user (logical)
     */
    @Transactional(rollbackFor = Exception.class)
    public boolean deleteUser(String id) {
        SysUser user = new SysUser();
        user.setId(id);
        user.setDelFlag(1);
        user.setUpdateTime(LocalDateTime.now());
        return userMapper.updateById(user) > 0;
    }

    /**
     * Reset password
     */
    @Transactional(rollbackFor = Exception.class)
    public boolean resetPassword(String id, String newPassword) {
        SysUser user = userMapper.selectById(id);
        if (user == null) {
            throw new BusinessException("用户不存在");
        }
        String salt = UUID.randomUUID().toString().replace("-", "");
        user.setSalt(salt);
        user.setPassword(encryptPassword(newPassword, salt));
        user.setUpdateTime(LocalDateTime.now());
        return userMapper.updateById(user) > 0;
    }

    /**
     * Mask password for security
     */
    private void maskPassword(SysUser user) {
        if (user != null) {
            user.setPassword(null);
            user.setSalt(null);
        }
    }

    /**
     * Encrypt password with SM4 + MD5 salt
     */
    private String encryptPassword(String password, String salt) {
        return CryptoUtil.md5Salt(CryptoUtil.sm4Encrypt(password, salt), salt);
    }
}

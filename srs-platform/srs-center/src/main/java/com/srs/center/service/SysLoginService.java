package com.srs.center.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.srs.center.dao.SysUserMapper;
import com.srs.center.domain.SysUser;
import com.srs.center.security.JwtTokenProvider;
import com.srs.common.base.exception.BusinessException;
import com.srs.common.utils.CryptoUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * System Login Service
 */
@Slf4j
@Service
public class SysLoginService {

    @Autowired
    private SysUserMapper userMapper;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    /**
     * Login
     */
    public Map<String, Object> login(String username, String password) {
        // Query user
        SysUser user = userMapper.selectOne(new LambdaQueryWrapper<SysUser>()
                .eq(SysUser::getUsername, username)
                .eq(SysUser::getDelFlag, 0));

        if (user == null) {
            throw new BusinessException(2001, "用户名或密码错误");
        }

        // Check status
        if (user.getStatus() != 1) {
            throw new BusinessException(2002, "账号已被冻结");
        }

        // Verify password
        String encryptedPwd = CryptoUtil.md5Salt(CryptoUtil.sm4Encrypt(password, user.getSalt()), user.getSalt());
        if (!encryptedPwd.equals(user.getPassword())) {
            throw new BusinessException(2001, "用户名或密码错误");
        }

        // Generate token
        String token = jwtTokenProvider.generateToken(username, user.getId());

        // Cache token
        redisTemplate.opsForValue().set("token:" + user.getId(), token, 7, TimeUnit.DAYS);

        log.info("User login: {}", username);

        // Return user info and token
        Map<String, Object> result = new HashMap<>();
        result.put("token", token);
        result.put("userInfo", getUserInfo(user));

        return result;
    }

    /**
     * Logout
     */
    public void logout(String userId) {
        redisTemplate.delete("token:" + userId);
        log.info("User logout: userId={}", userId);
    }

    /**
     * Get user info
     */
    private Map<String, Object> getUserInfo(SysUser user) {
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("id", user.getId());
        userInfo.put("username", user.getUsername());
        userInfo.put("realname", user.getRealname());
        userInfo.put("avatar", user.getAvatar());
        userInfo.put("email", user.getEmail());
        userInfo.put("phone", user.getPhone());
        userInfo.put("post", user.getPost());
        return userInfo;
    }
}

package com.srs.center.controller;

import com.srs.center.service.SysLoginService;
import com.srs.common.base.result.Result;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * System Login Controller
 */
@Slf4j
@RestController
@RequestMapping("/sys/login")
@Api(tags = "系统登录")
public class SysLoginController {

    @Autowired
    private SysLoginService loginService;

    @PostMapping
    @ApiOperation(value = "用户登录", notes = "用户名密码登录")
    public Result<Map<String, Object>> login(
            @ApiParam(value = "用户名", required = true) @RequestParam String username,
            @ApiParam(value = "密码", required = true) @RequestParam String password) {

        log.info("Login request: username={}", username);
        Map<String, Object> result = loginService.login(username, password);
        return Result.ok(result);
    }

    @DeleteMapping
    @ApiOperation(value = "用户登出", notes = "退出登录")
    public Result<?> logout(
            @ApiParam(value = "用户ID", required = true) @RequestParam String userId) {

        loginService.logout(userId);
        return Result.ok();
    }
}

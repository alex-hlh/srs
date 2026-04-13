package com.srs.ctrl.controller.system;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.srs.ctrl.domain.system.SysUser;
import com.srs.ctrl.service.system.SysUserService;
import com.srs.common.base.annotation.RequirePermission;
import com.srs.common.base.result.Result;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * System User Controller
 */
@Slf4j
@RestController
@RequestMapping("/sys/user")
@Api(tags = "用户管理")
public class SysUserController {

    @Autowired
    private SysUserService userService;

    @GetMapping("/list")
    @ApiOperation(value = "用户列表查询", notes = "分页查询用户信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageNo", value = "页码", dataType = "int"),
            @ApiImplicitParam(name = "pageSize", value = "每页条数", dataType = "int"),
            @ApiImplicitParam(name = "username", value = "用户名", dataType = "String")
    })
    public Result<Page<SysUser>> list(
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) String username) {
        Page<SysUser> page = userService.list(pageNo, pageSize, username);
        return Result.ok(page);
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "用户详情查询", notes = "根据ID查询用户详情")
    public Result<SysUser> getById(@PathVariable String id) {
        SysUser user = userService.getById(id);
        return Result.ok(user);
    }

    @PostMapping("/add")
    @RequirePermission("sys:user:add")
    @ApiOperation(value = "新增用户", notes = "创建新用户")
    public Result<?> add(@RequestBody SysUser user) {
        boolean success = userService.addUser(user);
        return success ? Result.ok() : Result.fail("新增失败");
    }

    @PutMapping("/edit")
    @RequirePermission("sys:user:edit")
    @ApiOperation(value = "编辑用户", notes = "更新用户信息")
    public Result<?> edit(@RequestBody SysUser user) {
        boolean success = userService.updateUser(user);
        return success ? Result.ok() : Result.fail("编辑失败");
    }

    @DeleteMapping("/{id}")
    @RequirePermission("sys:user:delete")
    @ApiOperation(value = "删除用户", notes = "逻辑删除用户")
    public Result<?> delete(@PathVariable String id) {
        boolean success = userService.deleteUser(id);
        return success ? Result.ok() : Result.fail("删除失败");
    }

    @PutMapping("/resetPwd")
    @RequirePermission("sys:user:resetpwd")
    @ApiOperation(value = "重置密码", notes = "重置用户密码")
    public Result<?> resetPassword(@RequestParam String id, @RequestParam String password) {
        boolean success = userService.resetPassword(id, password);
        return success ? Result.ok() : Result.fail("重置密码失败");
    }
}

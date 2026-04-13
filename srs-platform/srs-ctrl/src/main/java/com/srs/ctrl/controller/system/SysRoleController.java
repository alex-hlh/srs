package com.srs.ctrl.controller.system;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.srs.ctrl.domain.system.SysRole;
import com.srs.ctrl.service.system.SysRoleService;
import com.srs.common.base.annotation.RequirePermission;
import com.srs.common.base.result.Result;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * System Role Controller
 */
@Slf4j
@RestController
@RequestMapping("/sys/role")
@Api(tags = "角色管理")
public class SysRoleController {

    @Autowired
    private SysRoleService roleService;

    @GetMapping("/list")
    @ApiOperation(value = "角色列表查询", notes = "分页查询角色信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageNo", value = "页码", dataType = "int"),
            @ApiImplicitParam(name = "pageSize", value = "每页条数", dataType = "int"),
            @ApiImplicitParam(name = "roleName", value = "角色名称", dataType = "String")
    })
    public Result<Page<SysRole>> list(
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) String roleName) {
        Page<SysRole> page = roleService.list(pageNo, pageSize, roleName);
        return Result.ok(page);
    }

    @GetMapping("/all")
    @ApiOperation(value = "获取所有角色", notes = "查询所有角色")
    public Result<List<SysRole>> getAll() {
        List<SysRole> roles = roleService.getAll();
        return Result.ok(roles);
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "角色详情查询", notes = "根据ID查询角色详情")
    public Result<SysRole> getById(@PathVariable String id) {
        SysRole role = roleService.getById(id);
        return Result.ok(role);
    }

    @PostMapping("/add")
    @RequirePermission("sys:role:add")
    @ApiOperation(value = "新增角色", notes = "创建新角色")
    public Result<?> add(@RequestBody SysRole role) {
        boolean success = roleService.addRole(role);
        return success ? Result.ok() : Result.fail("新增失败");
    }

    @PutMapping("/edit")
    @RequirePermission("sys:role:edit")
    @ApiOperation(value = "编辑角色", notes = "更新角色信息")
    public Result<?> edit(@RequestBody SysRole role) {
        boolean success = roleService.updateRole(role);
        return success ? Result.ok() : Result.fail("编辑失败");
    }

    @DeleteMapping("/{id}")
    @RequirePermission("sys:role:delete")
    @ApiOperation(value = "删除角色", notes = "逻辑删除角色")
    public Result<?> delete(@PathVariable String id) {
        boolean success = roleService.deleteRole(id);
        return success ? Result.ok() : Result.fail("删除失败");
    }
}

package com.srs.center;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * SRS Center Application
 * 统一认证中心 - 登录/权限/SSO
 */
@SpringBootApplication
@ComponentScan(basePackages = {"com.srs.center", "com.srs.common.base"})
@MapperScan("com.srs.center.dao")
public class SrsCenterApplication {

    public static void main(String[] args) {
        SpringApplication.run(SrsCenterApplication.class, args);
    }
}

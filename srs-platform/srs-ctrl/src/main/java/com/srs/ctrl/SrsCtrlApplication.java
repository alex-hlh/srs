package com.srs.ctrl;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * SRS Ctrl Application
 * 智能管控平台 - 业务功能
 */
@SpringBootApplication
@ComponentScan(basePackages = {"com.srs.ctrl", "com.srs.common.base", "com.srs.common.component"})
@MapperScan("com.srs.ctrl.dao")
public class SrsCtrlApplication {

    public static void main(String[] args) {
        SpringApplication.run(SrsCtrlApplication.class, args);
    }
}

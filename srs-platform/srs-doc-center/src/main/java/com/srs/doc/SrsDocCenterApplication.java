package com.srs.doc;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * SRS Doc Center Application
 * 文档中心
 */
@SpringBootApplication
@ComponentScan(basePackages = {"com.srs.doc", "com.srs.common.base", "com.srs.common.component"})
@MapperScan("com.srs.doc.dao")
public class SrsDocCenterApplication {

    public static void main(String[] args) {
        SpringApplication.run(SrsDocCenterApplication.class, args);
    }
}

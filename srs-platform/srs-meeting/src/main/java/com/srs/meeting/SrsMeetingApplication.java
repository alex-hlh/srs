package com.srs.meeting;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * SRS Meeting Application
 * 视频会议
 */
@SpringBootApplication
@ComponentScan(basePackages = {"com.srs.meeting", "com.srs.common.base", "com.srs.common.component"})
@MapperScan("com.srs.meeting.dao")
public class SrsMeetingApplication {

    public static void main(String[] args) {
        SpringApplication.run(SrsMeetingApplication.class, args);
    }
}

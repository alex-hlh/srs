package com.srs.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * SRS Gateway Application
 * 安全网关 - 路由/限流/认证
 */
@SpringBootApplication
public class SrsGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(SrsGatewayApplication.class, args);
    }
}

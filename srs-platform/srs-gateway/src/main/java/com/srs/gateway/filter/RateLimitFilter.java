package com.srs.gateway.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.core.Ordered;
import org.springframework.data.redis.core.ReactiveStringRedisTemplate;
import org.springframework.data.redis.core.ReactiveValueOperations;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.time.Duration;

/**
 * Rate Limiting Filter using Redis
 */
@Slf4j
@Component
public class RateLimitFilter implements org.springframework.cloud.gateway.filter.GlobalFilter, Ordered {

    @Autowired
    private ReactiveStringRedisTemplate redisTemplate;

    // Default rate limit: 100 requests per minute
    private static final long DEFAULT_RATE_LIMIT = 100L;
    private static final Duration WINDOW_SIZE = Duration.ofMinutes(1);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String clientId = getClientId(exchange);
        String key = "rate_limit:" + clientId;

        ReactiveValueOperations<String, String> ops = redisTemplate.opsForValue();

        return ops.increment(key)
                .flatMap(count -> {
                    if (count == 1) {
                        // First request, set expiration
                        redisTemplate.expire(key, WINDOW_SIZE).subscribe();
                    }

                    if (count > DEFAULT_RATE_LIMIT) {
                        log.warn("Rate limit exceeded for client: {}", clientId);
                        exchange.getResponse().setStatusCode(HttpStatus.TOO_MANY_REQUESTS);
                        exchange.getResponse().getHeaders().add("X-RateLimit-Limit", String.valueOf(DEFAULT_RATE_LIMIT));
                        exchange.getResponse().getHeaders().add("X-RateLimit-Remaining", "0");
                        return exchange.getResponse().setComplete();
                    }

                    exchange.getResponse().getHeaders().add("X-RateLimit-Limit", String.valueOf(DEFAULT_RATE_LIMIT));
                    exchange.getResponse().getHeaders().add("X-RateLimit-Remaining", String.valueOf(DEFAULT_RATE_LIMIT - count));

                    return chain.filter(exchange);
                })
                .onErrorResume(e -> {
                    log.error("Rate limit error", e);
                    // On error, allow the request
                    return chain.filter(exchange);
                });
    }

    /**
     * Get client identifier (IP address)
     */
    private String getClientId(ServerWebExchange exchange) {
        String ip = exchange.getRequest().getHeaders().getFirst("X-Forwarded-For");
        if (ip == null || ip.isEmpty()) {
            ip = exchange.getRequest().getRemoteAddress().getAddress().getHostAddress();
        }
        return ip;
    }

    @Override
    public int getOrder() {
        return -90; // After auth filter
    }
}

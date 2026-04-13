package com.srs.common.base.annotation;

import java.lang.annotation.*;

/**
 * Permission annotation for method-level authorization
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RequirePermission {

    /**
     * Permission code, e.g., "sys:user:add"
     */
    String value();
}

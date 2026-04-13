package com.srs.common.base.exception;

/**
 * No permission exception
 */
public class NoPermissionException extends RuntimeException {

    public NoPermissionException() {
        super("无权限访问该资源");
    }

    public NoPermissionException(String message) {
        super(message);
    }
}

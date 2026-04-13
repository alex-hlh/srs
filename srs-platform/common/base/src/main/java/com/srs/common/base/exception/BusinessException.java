package com.srs.common.base.exception;

/**
 * Business exception
 */
public class BusinessException extends RuntimeException {

    private int code = 3001;

    public BusinessException(String message) {
        super(message);
    }

    public BusinessException(int code, String message) {
        super(message);
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }
}

package com.srs.common.utils;

import cn.hutool.core.util.StrUtil;

/**
 * String utility
 */
public class StringUtil extends StrUtil {

    /**
     * Check if string is blank
     */
    public static boolean isBlank(String str) {
        return str == null || str.trim().isEmpty();
    }

    /**
     * Check if string is not blank
     */
    public static boolean isNotBlank(String str) {
        return !isBlank(str);
    }

    /**
     * Get string or default
     */
    public static String getOrDefault(String str, String defaultValue) {
        return isNotBlank(str) ? str : defaultValue;
    }

    /**
     * Convert to camelCase
     */
    public static String toCamelCase(String str) {
        if (str == null || str.isEmpty()) {
            return str;
        }
        if (str.contains("_")) {
            return StrUtil.toCamelCase(str);
        }
        return str;
    }

    /**
     * Convert to snake_case
     */
    public static String toSnakeCase(String str) {
        if (str == null || str.isEmpty()) {
            return str;
        }
        return StrUtil.toUnderlineCase(str);
    }

    /**
     * Truncate string
     */
    public static String truncate(String str, int maxLength) {
        if (str == null || str.length() <= maxLength) {
            return str;
        }
        return str.substring(0, maxLength);
    }

    /**
     * Mask string in the middle
     */
    public static String mask(String str, int start, int end, char maskChar) {
        if (isBlank(str)) {
            return str;
        }
        int length = str.length();
        if (start >= length || end <= start) {
            return str;
        }
        StringBuilder sb = new StringBuilder(str);
        int maskEnd = Math.min(end, length);
        for (int i = start; i < maskEnd; i++) {
            sb.setCharAt(i, maskChar);
        }
        return sb.toString();
    }

    /**
     * Mask phone number
     */
    public static String maskPhone(String phone) {
        if (isBlank(phone) || phone.length() < 7) {
            return phone;
        }
        return mask(phone, 3, 7, '*');
    }

    /**
     * Mask email
     */
    public static String maskEmail(String email) {
        if (isBlank(email) || !email.contains("@")) {
            return email;
        }
        int atIndex = email.indexOf('@');
        if (atIndex <= 1) {
            return email;
        }
        return mask(email, 1, atIndex, '*');
    }
}

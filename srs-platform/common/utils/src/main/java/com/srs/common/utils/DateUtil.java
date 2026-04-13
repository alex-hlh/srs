package com.srs.common.utils;

import cn.hutool.core.date.DateUtil;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

/**
 * Date utility
 */
public class DateUtil {

    public static final String PATTERN_DATE = "yyyy-MM-dd";
    public static final String PATTERN_DATETIME = "yyyy-MM-dd HH:mm:ss";
    public static final String PATTERN_TIME = "HH:mm:ss";

    /**
     * Format date to string
     */
    public static String format(Date date) {
        return DateUtil.format(date, PATTERN_DATETIME);
    }

    /**
     * Format date with pattern
     */
    public static String format(Date date, String pattern) {
        return DateUtil.format(date, pattern);
    }

    /**
     * Format LocalDateTime to string
     */
    public static String format(LocalDateTime dateTime) {
        return dateTime.format(DateTimeFormatter.ofPattern(PATTERN_DATETIME));
    }

    /**
     * Format LocalDateTime with pattern
     */
    public static String format(LocalDateTime dateTime, String pattern) {
        return dateTime.format(DateTimeFormatter.ofPattern(pattern));
    }

    /**
     * Format LocalDate to string
     */
    public static String format(LocalDate date) {
        return date.format(DateTimeFormatter.ofPattern(PATTERN_DATE));
    }

    /**
     * Format LocalDate with pattern
     */
    public static String format(LocalDate date, String pattern) {
        return date.format(DateTimeFormatter.ofPattern(pattern));
    }

    /**
     * Parse string to date
     */
    public static Date parse(String dateStr) {
        return DateUtil.parse(dateStr, PATTERN_DATETIME);
    }

    /**
     * Parse string to date with pattern
     */
    public static Date parse(String dateStr, String pattern) {
        return DateUtil.parse(dateStr, pattern);
    }

    /**
     * Parse string to LocalDateTime
     */
    public static LocalDateTime parseDateTime(String dateStr) {
        return LocalDateTime.parse(dateStr, DateTimeFormatter.ofPattern(PATTERN_DATETIME));
    }

    /**
     * Parse string to LocalDateTime with pattern
     */
    public static LocalDateTime parseDateTime(String dateStr, String pattern) {
        return LocalDateTime.parse(dateStr, DateTimeFormatter.ofPattern(pattern));
    }

    /**
     * Get current date string
     */
    public static String getCurrentDate() {
        return format(new Date());
    }

    /**
     * Get current datetime string
     */
    public static String getCurrentDateTime() {
        return format(new Date());
    }
}

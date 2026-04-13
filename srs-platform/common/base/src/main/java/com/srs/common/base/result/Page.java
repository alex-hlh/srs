package com.srs.common.base.result;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Page result wrapper
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class Page<T> extends java.util.ArrayList<T> implements Serializable {

    private static final long serialVersionUID = 1L;

    private long total;
    private long current;
    private long size;

    public Page() {
        super();
    }

    public Page(List<T> records, long total, long current, long size) {
        super(records);
        this.total = total;
        this.current = current;
        this.size = size;
    }

    public static <T> Page<T> of(List<T> records, long total, long current, long size) {
        return new Page<>(records, total, current, size);
    }

    public static <T> Page<T> empty() {
        return new Page<>(new ArrayList<>(), 0, 0, 0);
    }
}

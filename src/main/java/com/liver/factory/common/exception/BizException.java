package com.liver.factory.common.exception;

/**
 * 自定义异常
 * exception handler
 */
public class BizException extends RuntimeException {

    private static final long serialVersionUID = -3473402972830636409L;

    public BizException(String message) {
        super(message);
    }

    public BizException(Throwable throwable) {
        super(throwable);
    }


}

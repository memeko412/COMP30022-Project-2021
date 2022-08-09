package com.liver.factory.common.controller;

/**
 * 请求操作结果码枚举类
 */
public enum ResponseEnum {

    // 操作成功
    SUCCESS("000000", "操作成功"),

    // 操作失败
    FAIL("999999", "操作失败");

    private String code;

    private String message;

    ResponseEnum(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}

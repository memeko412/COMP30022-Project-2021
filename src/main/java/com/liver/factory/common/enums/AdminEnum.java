package com.liver.factory.common.enums;

/**
 * Admin 枚举类
 */
public enum  AdminEnum {

    /**
     * 是 admin
     */
    IS_ADMIN("Y","valid"),

    /**
     * not admin.
     */
    NOT_ADMIN("N","not_valid");

    private String code;

    private String message;

    AdminEnum(String code, String message) {
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

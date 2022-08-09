package com.liver.factory.common.enums;

/**
 * 是否生效枚举类
 */
public enum ValidEnum {

    /**
     * 生效
     */
    VALID("0", "valid"),

    /**
     * 不生效
     */
    NOT_VALID("1", "not_valid");

    private String code;

    private String message;

    ValidEnum(String code, String message) {
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

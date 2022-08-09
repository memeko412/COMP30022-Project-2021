package com.liver.factory.common.util.id;

import java.util.UUID;

/**
 * 唯一 id 生成工具类
 */
public class UUIDUtils {

    public static String uuid() {
        String uuid = UUID.randomUUID().toString();
        return uuid.replaceAll("-", "");
    }

}

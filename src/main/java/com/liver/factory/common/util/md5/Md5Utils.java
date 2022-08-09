package com.liver.factory.common.util.md5;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/**
 * md5 摘要加密算法工具类
 */
@Component
public class Md5Utils {

    /**
     * 字符 md5 加密
     * @param content
     * @return
     */
    public String encoding(String content) {
        return DigestUtils.md5Hex(content.getBytes());
    }

    /**
     * md5(content) == cipherText
     * @param content
     * @param cipherText
     * @return
     */
    public boolean match(String content, String cipherText) {
        if (StringUtils.isEmpty(content)
                && StringUtils.isEmpty(cipherText)) {
            return true;
        }
        if (! StringUtils.isEmpty(content)) {
            String contentText = encoding(content);
            return contentText.equals(cipherText);
        }
        return false;
    }
}

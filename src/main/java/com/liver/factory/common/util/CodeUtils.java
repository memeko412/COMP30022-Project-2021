package com.liver.factory.common.util;

import java.util.Random;

/**
 * 验证码生成工具类
 */
public class CodeUtils {

    /**
     * 生成四位数字码，可供生成验证码
     *
     * @return
     */
    public static int makeAuthCode() {

        int authCodeNew = (int) Math.round(Math.random() * (9999 - 1000) + 1000);
        return authCodeNew;
    }


    /**
     * 生成指定位数的验证码，包括字符串的验证码
     * @param length
     * @return
     */
    public static String makeAuthCode(int length){
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for(int i = 0;i<length;i++){
            //type为当前位类型：小写字母(2)、数字(0)、大写字母(1)
            int type = random.nextInt(3);
            int content = 0;
            switch (type){
                case 0:
                    content = random.nextInt(10) + 48;
                    break;
                case 1:
                    content = random.nextInt(26) + 65;
                    break;
                case 2:
                    content = random.nextInt(26) + 97;
                    break;
                default:
                    break;
            }
            sb.append((char)content);
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        for (int i = 0; i < 100; i++) {
            System.out.println(makeAuthCode());
        }
    }
}

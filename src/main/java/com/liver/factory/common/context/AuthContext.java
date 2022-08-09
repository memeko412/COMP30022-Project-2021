package com.liver.factory.common.context;

import org.springframework.core.NamedThreadLocal;

/**
 * 用户信息上下文
 */
public class AuthContext {

    /**
     * 使用线程变量用于获取登录用户信息
     */
    private static ThreadLocal<UserBean> userInfoContext = new NamedThreadLocal<>("userBean");

    public static void setUserBean(UserBean userBean) {
        userInfoContext.set(userBean);
    }

    public static UserBean getUserBean() {
        return userInfoContext.get();
    }

    public static void clear() {
        userInfoContext.remove();
    }

}

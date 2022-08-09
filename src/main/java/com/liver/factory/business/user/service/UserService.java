package com.liver.factory.business.user.service;

import com.liver.factory.business.user.dto.UserDto;
import com.liver.factory.common.context.UserBean;

public interface UserService {

    /**
     * 处理登录逻辑
     * @param accountName
     * @param password
     * @return
     */
    UserBean handleLogin(String accountName, String password);

    /**
     * 处理重置密码逻辑
     * @param email
     * @param password
     * @return
     */
    boolean handleRestPasswordResult(String email, String password);

    /**
     * 新增 User
     * @param userDto
     */
    int addUser(UserDto userDto, String createdBy, String updatedBy);

    /**
     * 刷新用戶信息
     * @param userDto
     * @return
     */
    int freshUserInfo(UserDto userDto);

    /**
     * 查询已登录用户信息
     * @return
     */
    UserBean findUserBean();
}

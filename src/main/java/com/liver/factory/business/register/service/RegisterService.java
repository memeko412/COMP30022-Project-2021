package com.liver.factory.business.register.service;

import com.liver.factory.business.register.vo.UserRegisterVo;
import com.liver.factory.common.context.UserBean;
import org.springframework.lang.Nullable;

public interface RegisterService {


    /**
     * 发送邮箱验证码
     * @param email
     * @return
     */
    boolean sendEmailCode(String email);

    /**
     * 注册用户
     * @param userRegisterVo
     * @return
     */
    @Nullable
    UserBean registerUser(UserRegisterVo userRegisterVo);
}

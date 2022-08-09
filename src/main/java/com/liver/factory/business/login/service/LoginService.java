package com.liver.factory.business.login.service;

import com.liver.factory.business.login.vo.UserInfoFreshVo;
import com.liver.factory.business.login.vo.UserRestPasswordVo;
import com.liver.factory.common.context.UserBean;
import com.liver.factory.common.controller.ResponseBean;


import java.io.IOException;

public interface LoginService {

    String verificationCode(String codeId) throws IOException;

    UserBean handleLogin(String accountName, String password);

    ResponseBean handleLogin(String accountName, String password, String codeText, String codeId);

    UserBean findUserInfo(String token);

    UserBean freshUserInfo(UserInfoFreshVo userInfoFreshVo);

    boolean handleQuit(String token);


    boolean handleRestPassword(UserRestPasswordVo userRestPassword);
}

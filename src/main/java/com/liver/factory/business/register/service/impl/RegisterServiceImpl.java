package com.liver.factory.business.register.service.impl;

import com.liver.factory.business.login.service.LoginService;
import com.liver.factory.business.register.service.RegisterService;
import com.liver.factory.business.register.vo.UserRegisterVo;
import com.liver.factory.business.user.dto.UserDto;
import com.liver.factory.business.user.service.UserService;
import com.liver.factory.common.context.UserBean;
import com.liver.factory.common.enums.AdminEnum;
import com.liver.factory.common.enums.ValidEnum;
import com.liver.factory.common.redis.RedisService;
import com.liver.factory.common.util.CodeUtils;
import com.liver.factory.common.util.EmailUtil;
import org.apache.xmlbeans.impl.xb.ltgfmt.Code;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

@Service
public class RegisterServiceImpl implements RegisterService {

    @Autowired
    private UserService userService;

    @Autowired
    private LoginService loginService;

    @Autowired
    private RedisService redisService;

    @Value("${email.redis.code}")
    private String emailCodePre;

    @Value("${login.duration}")
    private int time;

    @Override
    public boolean sendEmailCode(String email) {
        String code = CodeUtils.makeAuthCode(4);
        boolean result = EmailUtil.sendMessage(email, code);
        if (result) {
            // 存储至 Redis
            redisService.set(emailCodePre + email, code, time);
            return true;
        }
        return false;
    }

    /**
     * 注册用户逻辑:
     * 1. 用户填写 email、系统登录名、系统显示名、密码后，注册账户成功
     * 2. 后台向用户邮箱发送邮件
     * 3. 用户登录邮件后点击连接进行用户激活
     * 4. 账户激活
     * 5. 用户使用 email or 系统登录名 进行 系统登录
     *
     * @param userRegisterVo
     * @return
     */
    @Nullable
    @Override
    public UserBean registerUser(UserRegisterVo userRegisterVo) {
        // 校验邮箱验证码
        String redisCode = redisService.get(emailCodePre + userRegisterVo.getEmail(), String.class);
        redisService.remove(emailCodePre + userRegisterVo.getEmail());
        if (redisCode == null || !redisCode.equals(userRegisterVo.getEmailCode())) {
            // 邮箱校验失败
            return null;
        }
        // 新增用户
        UserDto userDto = new UserDto();
        BeanUtils.copyProperties(userRegisterVo, userDto);
        userDto.setIsValid(ValidEnum.VALID.getCode());
        userDto.setIsAdmin(AdminEnum.NOT_ADMIN.getCode());

        int result = userService.addUser(userDto, "registerUser", "registerUser");

        if (result > 0) {
            // 实现用户登录流程
            UserBean userBean = loginService.handleLogin(userRegisterVo.getAccountName(),
                    userRegisterVo.getPassword());
            return userBean;
        }
        // 返回用户信息
        return null;
    }
}

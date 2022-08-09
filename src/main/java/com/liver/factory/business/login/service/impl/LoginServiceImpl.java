package com.liver.factory.business.login.service.impl;


import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.liver.factory.business.login.service.LoginService;
import com.liver.factory.business.login.vo.UserInfoFreshVo;
import com.liver.factory.business.login.vo.UserRestPasswordVo;
import com.liver.factory.business.user.dto.UserDto;
import com.liver.factory.business.user.service.UserService;
import com.liver.factory.common.context.AuthContext;
import com.liver.factory.common.context.UserBean;
import com.liver.factory.common.controller.ResponseBean;
import com.liver.factory.common.redis.RedisService;
import com.liver.factory.common.util.id.UUIDUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;

import javax.imageio.ImageIO;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Objects;

@Service
public class LoginServiceImpl implements LoginService {

    private final Logger logger = LoggerFactory.getLogger(LoginServiceImpl.class);

    @Autowired
    private UserService userService;

    @Autowired
    private RedisService redisService;

    @Autowired
    private DefaultKaptcha defaultKaptcha;

    // login token prefix. help see in redis.
    @Value("${login.redis.token.prefix}")
    private String tokenPrefix;

    @Value("${login.redis.image.prefix}")
    private String imagePrefix;

    @Value("${login.duration}")
    private Long duration;

    @Value("${email.redis.code}")
    private String emailCodePre;

    @Override
    @Nullable
    public UserBean handleLogin(String accountName, String password) {
        UserBean userBean = userService.handleLogin(accountName, password);
        if (Objects.nonNull(userBean)) {
            String token = UUIDUtils.uuid();
            userBean.setToken(token);
            redisService.set(tokenPrefix + token, userBean, duration);
        }
        return userBean;
    }

    /**
     * 校验图形验证码是否成功
     *
     * redis: key imagePrefix + codeId. value: codeText
     * @param codeText
     * @param codeId
     * @return
     */
    public boolean imageCodeResult(String codeText, String codeId) {
        String key = imagePrefix + codeId;
        String redisCodeText = redisService.get(key, String.class);
        boolean result = codeText.equalsIgnoreCase(redisCodeText);
        if (result) {
            redisService.remove(key);
            return true;
        }
        return false;
    }


    @Override
    public String verificationCode(String codeId) throws IOException {
        String codeText = defaultKaptcha.createText();
        redisService.set(imagePrefix + codeId, codeText, duration);
        BufferedImage image = defaultKaptcha.createImage(codeText);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ImageIO.write(image, "png", outputStream);
        String base64Img = Base64Utils.encodeToString(outputStream.toByteArray());
        String result = "data:image/jpg;base64," + base64Img;
        outputStream.close();
        return result;
    }

    /**
     * 处理登录逻辑
     * 1. 先进行验证码校验
     * 2. 再进行账户校验
     * 账户校验包括 accountNo. phone 两种逻辑
     *
     * @param accountName
     * @param password
     * @param codeText
     * @param codeId
     * @return
     */
    @Override
    @Nullable
    public ResponseBean handleLogin(String accountName, String password, String codeText, String codeId) {
        // handle 验证码
        boolean flag = imageCodeResult(codeText, codeId);
        if (!flag) {
            return ResponseBean.error("图形验证码校验失败");
        }
        UserBean userBean = handleLogin(accountName, password);
        if (userBean == null) {
            return ResponseBean.error("账户或密码错误");
        }
        ResponseBean responseBean = new ResponseBean();
        responseBean.setData(userBean);
        return responseBean;
    }

    @Override
    @Nullable
    public UserBean findUserInfo(String token) {
        UserBean userBean = redisService.get(new StringBuilder(tokenPrefix)
                .append(token)
                .toString(), UserBean.class);
        return userBean;
    }

    @Override
    public UserBean freshUserInfo(UserInfoFreshVo userInfoFreshVo) {
        UserBean userBean = AuthContext.getUserBean();
        UserDto userDto = new UserDto();
        BeanUtils.copyProperties(userInfoFreshVo, userDto);
        Long userId = userBean.getUserId();
        userDto.setUserId(userId);
        int result = userService.freshUserInfo(userDto);
        if (result > 0) {
            // 刷新 userBean
            userBean = userService.findUserBean();
            redisService.set(tokenPrefix + userBean.getToken(), userBean, duration);
            return userBean;
        }
        return null;
    }

    @Override
    public boolean handleQuit(String token) {
        return redisService.remove(new StringBuilder(tokenPrefix)
                .append(token)
                .toString());
    }

    /**
     * 重置密码
     * @param userRestPassword
     * @return
     */
    @Override
    public boolean handleRestPassword(UserRestPasswordVo userRestPassword) {
        // 1. 校验 邮箱验证码
        String redisCode = redisService.get(emailCodePre + userRestPassword.getEmail(), String.class);
        redisService.remove(emailCodePre + userRestPassword.getEmail());
        if (redisCode == null || !redisCode.equals(userRestPassword.getEmailCode())) {
            // 邮箱校验失败
            return false;
        }
        boolean result = userService.handleRestPasswordResult(userRestPassword.getEmail(),
                userRestPassword.getUpdatedPassword());
        return result;
    }

}

package com.liver.factory.business.login.web;

import com.liver.factory.business.login.service.LoginService;
import com.liver.factory.business.login.vo.UserInfoFreshVo;
import com.liver.factory.business.login.vo.UserLoginVo;
import com.liver.factory.business.login.vo.UserRestPasswordVo;
import com.liver.factory.business.login.vo.VerificationVo;
import com.liver.factory.common.context.AuthContext;
import com.liver.factory.common.context.UserBean;
import com.liver.factory.common.controller.ResponseBean;
import com.liver.factory.common.controller.ResponseEnum;
import com.liver.factory.common.util.id.UUIDUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Objects;

@RestController
@Api(tags = {"系统管理-登录"})
@Slf4j
public class LoginController {

    @Autowired
    private LoginService loginService;


    @ApiOperation(value = "获取图形验证码")
    @ApiImplicitParams({
    })
    @GetMapping("/verification/code")
    public ResponseBean verificationCode(){
        String codeId = UUIDUtils.uuid();
        ResponseBean response = new ResponseBean();
        try {
            String result = loginService.verificationCode(codeId);
            VerificationVo verificationVo = new VerificationVo(codeId, result);
            response.setData(verificationVo);
            return response;
        } catch (Exception e) {
            log.error("handle verification code error!", codeId, e);
            response.setMessage("生成验证码失败");
            response.setCode(ResponseEnum.FAIL.getCode());
            return response;
        }
    }

    @ApiOperation(value = "登录接口，目前需使用图形验证码登录")
    @PostMapping("/login")
    public ResponseBean login(@RequestBody UserLoginVo user) {
        ResponseBean response = loginService.handleLogin(user.getLoginUser(), user.getPassword(),
                user.getCodeText(), user.getCodeId());
        return response;
    }


    @ApiOperation(value = "用户退出系统，前端请求时在请求头中传入 token 即可")
    @ApiImplicitParams({
    })
    @GetMapping("/quit")
    public ResponseBean quit(HttpServletRequest request) {
        String token = request.getHeader("token");
        loginService.handleQuit(token);
        ResponseBean response = new ResponseBean();
        return response;
    }

    @ApiOperation(value = "重置用户密码")
    @PostMapping(value = "/reset")
    public ResponseBean resetPassword(@RequestBody UserRestPasswordVo userRestPassword) {
        ResponseBean response = new ResponseBean();
        boolean result = loginService.handleRestPassword(userRestPassword);
        if (!result) {
            response.setCode(ResponseEnum.FAIL.getCode());
            response.setMessage("重置用户密码失败");
            return response;
        }
        return response;
    }

    @ApiOperation(value = "基于token查询用户信息")
    @ApiImplicitParams({
    })
    @GetMapping(value = "/user")
    public ResponseBean findUserInfo(HttpServletRequest request) {
        String token = request.getHeader("token");
        UserBean userBean = loginService.findUserInfo(token);
        ResponseBean response = new ResponseBean();
        if (Objects.isNull(userBean)) {
            response.setCode(ResponseEnum.FAIL.getCode());
            response.setMessage("查询用户信息失败");
            return response;
        }
        response.setData(userBean);
        return response;
    }

//    @ApiOperation(value = "设置用户个人信息")
//    @ApiImplicitParams({
//    })
//    @PostMapping(value = "/fresh/user")
//    public ResponseBean freshUserInfo(UserInfoFreshVo userInfoFreshVo) {
//        UserBean userBean = loginService.freshUserInfo(userInfoFreshVo);
//        ResponseBean response = new ResponseBean();
//        if (Objects.isNull(userBean)) {
//            response.setCode(ResponseEnum.FAIL.getCode());
//            response.setMessage("设置用户信息失败");
//            return response;
//        }
//        response.setData(userBean);
//        return response;
//    }



}

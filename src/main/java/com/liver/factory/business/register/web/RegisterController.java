package com.liver.factory.business.register.web;

import com.liver.factory.business.register.service.RegisterService;
import com.liver.factory.business.register.vo.UserRegisterVo;
import com.liver.factory.common.context.UserBean;
import com.liver.factory.common.controller.ResponseBean;
import com.liver.factory.common.controller.ResponseEnum;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = {"系统管理-登录"})
@Slf4j
public class RegisterController {

    @Autowired
    private RegisterService registerService;


    @ApiOperation(value = "发送邮箱验证码，目前只支持 QQ 邮箱")
    @GetMapping("/email/code")
    public ResponseBean emailCode(@RequestParam String email) {
        boolean result = registerService.sendEmailCode(email);
        ResponseBean response = new ResponseBean();
        response.setData(result);
        return response;
    }

    @ApiOperation(value = "注册用户接口，需要用户进行填写相关信息后注册，注册后默认登录状态")
    @PostMapping("/register")
    public ResponseBean register(@RequestBody UserRegisterVo userRegisterVo) {
        UserBean userBean = registerService.registerUser(userRegisterVo);
        ResponseBean response = new ResponseBean();
        if (userBean == null) {
            response.setCode(ResponseEnum.FAIL.getCode());
            response.setMessage("注册用户失败");
            return response;
        }
        response.setData(userBean);
        return response;
    }







}

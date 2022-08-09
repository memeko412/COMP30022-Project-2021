package com.liver.factory.business.login.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class UserRestPasswordVo {

    @ApiModelProperty(name = "email", value = "email", dataType = "string", required = true)
    private String email;

    /**
     * updated password. base64
     */
    @ApiModelProperty(name = "updatedPassword", value = "用户更新后登录密码, 使用base64加密", dataType = "string", required = true)
    private String updatedPassword;



    @ApiModelProperty(name = "emailCode", value = "邮箱验证码", dataType = "string", required = true)
    private String emailCode;
}

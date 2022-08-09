package com.liver.factory.business.login.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@ApiModel
public class UserLoginVo {

    @ApiModelProperty(name = "loginUser", value = "用户登录凭证，支持使用账户", dataType = "string", required = true)
    private String loginUser;

    @ApiModelProperty(name = "password", value = "用户登录密码, 使用base64加密", dataType = "string", required = true)
    private String password;

    @ApiModelProperty(name = "codeText", value = "验证码数据", dataType = "string", required = true)
    private String codeText;

    @ApiModelProperty(name = "codeId", value = "验证码Id, 由前端确认保持", dataType = "string", required = true)
    private String codeId;
}

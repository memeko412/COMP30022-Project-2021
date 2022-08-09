package com.liver.factory.business.register.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@ToString
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ApiModel
public class UserRegisterVo {

    @ApiModelProperty(name = "email", value = "email", dataType = "string", required = true)
    private String email;


    @ApiModelProperty(name = "emailCode", value = "邮箱验证码", dataType = "string", required = true)
    private String emailCode;

    /**
     * 系统登录账户，不容许重名，默认大写
     */
    @ApiModelProperty(name = "accountName", value = "系统登录账户", dataType = "string", required = true)
    private String accountName;

    /**
     * 系统显示账户
     */
    @ApiModelProperty(name = "userName", value = "系统显示账户", dataType = "string", required = true)
    private String userName;

    /**
     * 登录密码，默认md5加密
     */
    @ApiModelProperty(name = "password", value = "password", dataType = "string", required = true)
    private String password;

}

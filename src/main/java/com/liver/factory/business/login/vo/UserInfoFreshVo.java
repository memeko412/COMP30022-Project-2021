package com.liver.factory.business.login.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.Date;

@ToString
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ApiModel
public class UserInfoFreshVo {

    /**
     * userName
     */
    @ApiModelProperty(name = "userName", value = "用户昵称", dataType = "string", required = true)
    private String userName;

    /**
     * company
     */
    @ApiModelProperty(name = "company", value = "company", dataType = "string", required = true)
    private String company;

    /**
     * work
     */
    @ApiModelProperty(name = "work", value = "work", dataType = "string", required = true)
    private String work;

    /**
     * 性别
     */
    @ApiModelProperty(name = "gender", value = "1 man, 2 woman", dataType = "int", required = true)
    private Integer gender;

    /**
     * photo
     */
    @ApiModelProperty(name = "photo", value = "photo", dataType = "byte array", required = true)
    private Byte[] photo;

    @ApiModelProperty(name = "intro", value = "intro", dataType = "string", required = true)
    private String intro;

    @ApiModelProperty(name = "phone", value = "phone", dataType = "string", required = true)
    private String phone;

    @ApiModelProperty(name = "address", value = "address", dataType = "string", required = true)
    private String address;

    @ApiModelProperty(name = "photo", value = "photo", dataType = "byte array", required = true)
    private Byte[] theme;

    @ApiModelProperty(name = "dateOfBirth", value = "birthday", dataType = "date", required = true)
    private Date dateOfBirth;


}

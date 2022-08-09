package com.liver.factory.business.user.dto;

import lombok.*;

import java.util.Date;

/**
 * 用户 DTO
 */
@ToString
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    /**
     * 业务主键
     */
    private Long userId;

    /**
     * 系统登录账户，不容许重名，默认大写
     */
    private String accountName;

    /**
     * 系统显示账户
     */
    private String userName;

    /**
     * company
     */
    private String company;

    /**
     * work
     */
    private String work;

    /**
     * 性别
     */
    private Integer gender;

    /**
     * photo
     */
    private Byte[] photo;

    private String intro;

    private String phone;

    private String address;

    private String email;

    private Byte[] theme;

    private Date dateOfBirth;

    /**
     * 登录密码，默认md5加密
     */
    private String password;

    /**
     * 是否是管理员，Y 表示是 N表示否
     */
    private String isAdmin;

    /**
     * 是否有效, 0 有效 1 无效
     */
    private String isValid;

    private String createdBy;

    private Date createdTime;

    private String updatedBy;

    private Date updatedTime;

}

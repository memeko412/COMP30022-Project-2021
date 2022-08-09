package com.liver.factory.common.context;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

/**
 * 用户登陆信息存储类，存储用户信息，一般与 AuthContext 一起使用
 */
@Setter
@Getter
@ToString
public class UserBean implements Serializable {


    private static final long serialVersionUID = -8208088342467246549L;

    private String token;

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
     * 是否是管理员，Y 表示是 N表示否
     */
    private String isAdmin;

}

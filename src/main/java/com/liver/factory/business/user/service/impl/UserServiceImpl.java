package com.liver.factory.business.user.service.impl;

import com.liver.factory.business.user.dao.UserDao;
import com.liver.factory.business.user.dto.UserDto;
import com.liver.factory.business.user.service.UserService;
import com.liver.factory.common.Constants;
import com.liver.factory.common.context.AuthContext;
import com.liver.factory.common.context.UserBean;
import com.liver.factory.common.util.id.UUIDUtils;
import com.liver.factory.common.util.md5.Md5Utils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private Md5Utils md5Utils;

    /**
     * handle login logic
     * @param accountName
     * @param password
     * @return
     */
    @Override
    @Nullable
    public UserBean handleLogin(String accountName, String password) {
        String upperAccountNo = accountName.toUpperCase();
        String encryptionPassword = md5Utils.encoding(password);
        UserDto user = null;
        if (StringUtils.isNotBlank(accountName)) {
            user = userDao.findUser(upperAccountNo, encryptionPassword);
        }
        if (Objects.isNull(user)) {
            return null;
        }
        UserBean userBean = new UserBean();
        BeanUtils.copyProperties(user, userBean);
        return userBean;
    }

    /**
     * 重置密码
     *
     * @param email
     * @param password
     * @return
     */
    @Override
    public boolean handleRestPasswordResult(String email, String password) {
        if(StringUtils.isBlank(email) || StringUtils.isBlank(password)) {
            return false;
        }
        String encryptionPassword = md5Utils.encoding(password);
        int result = userDao.updateUserPassword(email, encryptionPassword);
        return result == 1;
    }

    /**
     * 新增用户
     * @param userDto
     * @param createdBy
     * @param updatedBy
     * @return
     */
    @Override
    public int addUser(UserDto userDto, String createdBy, String updatedBy) {
        String encryptionPassword = md5Utils.encoding(userDto.getPassword());
        String upperAccountNo = userDto.getAccountName().toUpperCase();
        userDto.setAccountName(upperAccountNo);
        userDto.setPassword(encryptionPassword);
        Date date = new Date();
        userDto.setCreatedBy(createdBy);
        userDto.setCreatedTime(date);
        userDto.setUpdatedBy(updatedBy);
        userDto.setUpdatedTime(date);
        return userDao.addUser(userDto);
    }

    /**
     * 刷新用户信息
     * @param userDto
     * @return
     */
    @Override
    public int freshUserInfo(UserDto userDto) {
        Date date = new Date();
        userDto.setUpdatedBy(userDto.getAccountName());
        userDto.setUpdatedTime(date);
        return userDao.updateUser(userDto);
    }

    /**
     * 查找用户
     * @return
     */
    public UserBean findUserBean() {
        Long userId = AuthContext.getUserBean().getUserId();
        UserDto user = userDao.findUserByUserId(userId);
        if (Objects.isNull(user)) {
            return null;
        }
        String token = AuthContext.getUserBean().getToken();
        UserBean userBean = new UserBean();
        BeanUtils.copyProperties(user, userBean);
        userBean.setToken(token);
        return userBean;
    }
}

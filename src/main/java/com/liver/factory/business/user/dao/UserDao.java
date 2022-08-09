package com.liver.factory.business.user.dao;

import com.liver.factory.business.user.dto.UserDto;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * User DAO
 */
@Repository
public interface UserDao {


    /**
     * find user.
     *
     * @param accountName Uppercase letters
     * @param password  md5
     * @return
     */
    UserDto findUser(@Param("accountName") String accountName,
                     @Param("password") String password);

    /**
     * find user By UserId.
     *
     * @param userId UserId
     * @return
     */
    UserDto findUserByUserId(@Param("userId") Long userId);

    /**
     * update user password
     * @param email Uppercase letters
     * @param password  md5
     * @return
     */
    int updateUserPassword(@Param("email") String email,
                           @Param("password") String password);

    /**
     * add user.
     * @param userDto
     * @return
     */
    int addUser(UserDto userDto);

    /**
     * add user.
     * @param userDto
     * @return
     */
    int updateUser(UserDto userDto);
}

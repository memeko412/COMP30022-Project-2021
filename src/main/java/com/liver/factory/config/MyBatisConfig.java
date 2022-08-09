package com.liver.factory.config;

import com.github.pagehelper.autoconfigure.PageHelperAutoConfiguration;
import com.liver.factory.common.mybatis.MybatisInterceptor;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.context.annotation.Configuration;
import javax.annotation.PostConstruct;
import java.util.List;

/**
 * Mybatis 拦截器
 */
@Configuration
@AutoConfigureAfter(PageHelperAutoConfiguration.class)
public class MyBatisConfig {

    @Autowired
    private List<SqlSessionFactory> sqlSessionFactoryList;

    @PostConstruct
    public void addMySqlInterceptor() {
        MybatisInterceptor interceptor = new MybatisInterceptor();
        for (SqlSessionFactory sqlSessionFactory : sqlSessionFactoryList) {

            sqlSessionFactory.getConfiguration().addInterceptor(interceptor);

        }
    }

}
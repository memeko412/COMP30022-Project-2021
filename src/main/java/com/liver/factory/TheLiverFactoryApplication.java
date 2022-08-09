package com.liver.factory;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * 程序启动类
 */
@SpringBootApplication
@EnableTransactionManagement
@EnableScheduling
@MapperScan("com.liver.factory.**.dao")
public class TheLiverFactoryApplication {

    public static void main(String[] args) {
        SpringApplication.run(TheLiverFactoryApplication.class, args);
    }

}

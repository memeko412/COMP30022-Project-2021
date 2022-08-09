package com.liver.factory.config;

import com.liver.factory.common.filter.RequestRecordFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 拦截器注册类
 */
@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean registrationFilter() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(new RequestRecordFilter());
        registration.addUrlPatterns("/*");
        registration.setName("RequestRecordFilter");
        registration.setOrder(1);
        return registration;
    }
}

package com.liver.factory.common.interceptor;


import com.liver.factory.common.context.AuthContext;
import com.liver.factory.common.context.UserBean;
import com.liver.factory.common.redis.RedisService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.EnvironmentAware;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

/**
 * 登陆拦截器，用于取 http 请求中的 token进行鉴权
 */
@Component
@Slf4j
public class LoginInterceptor implements HandlerInterceptor, EnvironmentAware {

    private Environment environment;

    @Autowired
    private RedisService redisService;

    private List<String> noFilterList;


    private String tokenPrefix;

    private Long duration;

    /**
     * 拦截器逻辑实现如下：
     * 1. 若请求携带 token. 则直接取出用户信息，设置线程私有变量，请求放行
     * 2. 若访问为无需鉴权url，直接放行
     * 3. 否则，将请求拒绝
     *
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader("token");
        if (StringUtils.isNotBlank(token)) {
            String tokenKey = tokenPrefix + token;
            UserBean userBean = redisService.get(tokenKey, UserBean.class);
            if (Objects.nonNull(userBean)) {
                redisService.set(tokenKey, userBean, duration);
                AuthContext.setUserBean(userBean);
                return true;
            }
        }
        String uri = request.getRequestURI();
        for (String noFilter : noFilterList) {
            if (noFilter.startsWith(uri)) {
                return true;
            }
        }
        log.error("request no access uri [{}]!", uri);
        response.setStatus(HttpStatus.FORBIDDEN.value());
        return false;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }

    @Override
    public void setEnvironment(Environment environment) {
        this.environment = environment;
        String noFilterStr = environment.getProperty("request.noFilter");
        if (StringUtils.isBlank(noFilterStr)) {
            this.noFilterList = Collections.EMPTY_LIST;
        }
        this.noFilterList = Arrays.asList(noFilterStr.split(","));
        tokenPrefix = environment.getProperty("login.redis.token.prefix");
        duration = Long.parseLong(environment.getProperty("login.duration"));
    }
}

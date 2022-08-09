package com.liver.factory.common.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.NamedThreadLocal;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.time.LocalDateTime;

/**
 * 请求拦截器，用于打印请求日志
 */
@Slf4j
public class RequestRecordFilter implements Filter {

    NamedThreadLocal<Long> timeThreadLocal = new NamedThreadLocal<>("timeRecord");
    NamedThreadLocal<String> threadThreadLocal = new NamedThreadLocal<>("threadRecord");

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String uri = ((HttpServletRequest) request).getRequestURI();
        Thread thread = Thread.currentThread();
        long startTime = System.currentTimeMillis();
        timeThreadLocal.set(startTime);
        threadThreadLocal.set(thread.getName());

        log.info("{} {} request {} start.", LocalDateTime.now(), threadThreadLocal.get(), uri);

        chain.doFilter(request, response);

        log.info("{} {} request {} end. cost [{}]s.", LocalDateTime.now(),
                threadThreadLocal.get(), uri, (System.currentTimeMillis() - timeThreadLocal.get()) / 1000);
    }

    @Override
    public void destroy() {
        // do nothing

    }
}

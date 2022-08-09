package com.liver.factory.common.redis;

import com.liver.factory.common.exception.BizException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

/**
 * Redis 缓存 Service
 */
@Component
@Slf4j
public class RedisService {


    @Autowired
    private RedisTemplate redisTemplate;

    /**
     * 写入缓存
     * 不指定保存时间,永久保存
     *
     * @param key
     * @param value
     * @return
     */
    public boolean set(final String key, Object value) {
        try {
            ValueOperations<Serializable, Object> operations = redisTemplate.opsForValue();
            operations.set(key, value);
            return true;
        } catch (Exception e) {
            log.error("operation redis error! key:[{}], value:[{}]", key, value);
            throw new BizException(e.getMessage());
        }
    }

    /**
     * 写入缓存
     * 指定保存时间,单位：秒,超时将自动删除
     *
     * @param key
     * @param value
     * @param expireTime
     * @return
     */
    public boolean set(final String key, Object value, long expireTime) {
        try {
            ValueOperations<Serializable, Object> operations = redisTemplate.opsForValue();
            operations.set(key, value);
            return redisTemplate.expire(key, expireTime, TimeUnit.SECONDS);
        } catch (Exception ex) {
            log.error("operation redis error! key:[{}], value:[{}]", key, value);
            throw new BizException(ex);
        }
    }

    /**
     * 判断缓存中是否有对应的 key
     *
     * @param key
     * @return
     */
    public boolean exists(final String key) {
        try {
            return redisTemplate.hasKey(key);
        } catch (Exception e) {
            log.error("operation redis error! key:[{}]", key);
            throw new BizException(e);
        }
    }

    @Nullable
    public <T> T get(final String key, Class<T> clazz) {
        try {
            ValueOperations<Serializable, Object> operations = redisTemplate.opsForValue();
            Object result = operations.get(key);
            if (Objects.isNull(result)) {
                return null;
            }
            return (T) result;
        } catch (Exception ex) {
            log.error("operation redis error! key:[{}]", key);
            throw new BizException(ex);
        }
    }


    public boolean remove(final String key) {
        if (exists(key)) {
            return redisTemplate.delete(key);
        }
        return false;
    }


}

package com.liver.factory.common.controller;

/**
 * 请求返回包装类，用于包装每个请求的返回结果
 * @param <T>
 */
public class ResponseBean<T> {

    private String message;

    private String code;

    private T data;

    public ResponseBean() {
        this.code = ResponseEnum.SUCCESS.getCode();
        this.message = ResponseEnum.SUCCESS.getMessage();
    }

    public ResponseBean(ResponseBeanBuilder<T> builder) {
        this.code = builder.code;
        this.message = builder.message;
        this.data = builder.data;
    }

    public static ResponseBean response401() {
        ResponseBean responseBean = new ResponseBean();
        responseBean.setCode("401");
        responseBean.setMessage("当前用户无权限访问");
        return responseBean;
    }

    public static ResponseBean error() {
        ResponseBean responseBean = new ResponseBean();
        responseBean.code = ResponseEnum.FAIL.getCode();
        responseBean.message = ResponseEnum.FAIL.getMessage();
        return responseBean;
    }

    public static ResponseBean error(String message) {
        ResponseBean responseBean = new ResponseBean();
        responseBean.code = ResponseEnum.FAIL.getCode();
        responseBean.message = message;
        return responseBean;
    }

    public static ResponseBean success() {
        ResponseBean responseBean = new ResponseBean();
        return responseBean;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public static class ResponseBeanBuilder<T> {
        private String message;

        private String code;

        private T data;

        public ResponseBeanBuilder message(String message) {
            this.message = message;
            return this;
        }

        public ResponseBeanBuilder code(String code) {
            this.code = code;
            return this;
        }

        public ResponseBeanBuilder data(T data) {
            this.data = data;
            return this;
        }

        @SuppressWarnings("all")
        public ResponseBean build() {
            return new ResponseBean(this);
        }

    }
}

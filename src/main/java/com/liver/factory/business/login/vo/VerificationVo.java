package com.liver.factory.business.login.vo;

public class VerificationVo {

    private String codeId;

    private String base64Img;

    public VerificationVo() {
    }

    public VerificationVo(String codeId, String base64Img) {
        this.codeId = codeId;
        this.base64Img = base64Img;
    }

    public String getCodeId() {
        return codeId;
    }

    public void setCodeId(String codeId) {
        this.codeId = codeId;
    }

    public String getBase64Img() {
        return base64Img;
    }

    public void setBase64Img(String base64Img) {
        this.base64Img = base64Img;
    }
}

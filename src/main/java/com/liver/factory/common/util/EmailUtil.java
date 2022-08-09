package com.liver.factory.common.util;

import com.sun.mail.util.MailSSLSocketFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * email 配置发送工具类
 */
public class EmailUtil {

    private final static Logger logger = LoggerFactory.getLogger(EmailUtil.class);

    private static Map<String, Session> sessionMap = new HashMap<>();

    /**
     * 发送者配置
     */
    private static String fromEmail = "1406604402@qq.com";

    private static String fromEmailPw = "kpnihgxfhmzvhbgj";

    public static void setFromEmail(String fromEmail) {
        EmailUtil.fromEmail = fromEmail;
    }

    public static void setFromEmailPw(String fromEmailPw) {
        EmailUtil.fromEmailPw = fromEmailPw;
    }

    static {
        try {
            // qq
            Properties props = new Properties();
            props.setProperty("mail.transport.protocol", "smtp");
            props.setProperty("mail.smtp.host", "smtp.qq.com");
            props.setProperty("mail.smtp.auth", "true");
            MailSSLSocketFactory sf = new MailSSLSocketFactory();
            sf.setTrustAllHosts(true);
            props.put("mail.smtp.ssl.enable", "true");
            props.put("mail.smtp.ssl.socketFactory", sf);
            Session qqSession = Session.getInstance(props);
            qqSession.setDebug(true);
            sessionMap.put("qq", qqSession);

        } catch (Exception ex) {
            logger.error("init email config failed.", ex);
        }
    }


    /**
     * send email.
     *
     * @param target
     * @param code
     */
    public static boolean sendMessage(String target, String code) {
        try {
            Session qqSession = sessionMap.get("qq");
            MimeMessage msg = new MimeMessage(qqSession);
            //发件人
            msg.setFrom(new InternetAddress(fromEmail, "验证码发送系统", "UTF-8"));
            //接件人
            msg.setRecipient(MimeMessage.RecipientType.TO, new InternetAddress(target));
            //邮件主题
            msg.setSubject("验证码", "UTF-8");
            //生成验证码
            //邮件正文
            msg.setContent("您好，您的验证码是：" + code + "。", "text/html;charset=UTF-8");
            //发送时间
            msg.setSentDate(new Date());
            //保存设置
            msg.saveChanges();

            Transport transport = qqSession.getTransport();
            transport.connect(fromEmail, fromEmailPw);
            transport.sendMessage(msg, msg.getAllRecipients());
            transport.close();
            return true;
        } catch (Exception ex) {
            logger.error("init email config failed.", ex);
            return false;
        }
    }


}

# IT-Project-COMP30022 -[^Team-67] --Personal Customer Relationship Management(CRM)

[^Team-67]: TheLiverFactory™   

## Table of Contents
* Project Overview

## Important docs
Ant design docs https://ant.design/docs/spec/introduce
## Project Overview


## submit files

* git add *
* git commit -m "description"
* git push origin


# package

* business  业务包，下面存放各个业务，包括用户注册、登陆等业务逻辑
  * login 登陆业务包，登陆的 Controller - Service - Dao
  * register 注册业务包，登陆的 Controller - Service - Dao
  * user 用户业务包，登陆的 Controller - Service - Dao
* common 公共包，用来存放公共类，包括 Utils 工具类等
  * config 存放 swagger 的配置类
  * context 用户缓存信息 AuthContext
  * controller 请求结果，包括结果枚举值和包装类
  * enums 枚举值类
  * exception 自定义异常
  * filter web 过滤器
  * interceptor web 拦截器
  * mybatis mybatis 配置类
  * redis redis业务处理类
  * util 工具类
* config 配置包，用来存放配置类


# centos 
ssh xttan1@34.125.253.188
ssh root@34.125.253.188
cd project/tm/
nohup java -jar the-liver-factory-0.0.1-SNAPSHOT.jar &

scp ~/Desktop/work/Project/Team-67/build/libs/the-liver-factory-0.0.1-SNAPSHOT.jar xttan1@34.125.253.188:~/project/tm/


# redis

https://www.linode.com/docs/guides/install-and-configure-redis-on-centos-7/

sudo yum install redis
sudo systemctl start redis
sudo systemctl enable redis
File: /etc/redis.conf
sudo systemctl restart redis


# mysql

https://linuxize.com/post/install-mysql-on-centos-7/

sudo yum localinstall https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
sudo yum install mysql-community-server

sudo systemctl enable mysqld
sudo systemctl start mysqld
sudo systemctl status mysqld


# update package
cd /Users/tanxiao/Desktop/work/Project/Team-67/build/libs

scp the-liver-factory-0.0.1-SNAPSHOT.jar xttan1@34.125.253.188:/home/xttan1/project/tm

# open remote connection centos
https://www.jianshu.com/p/d00febf98488
sudo -i
vi /etc/ssh/sshd_config

PermitRootLogin yes  #这个不安全

PasswordAuthentication yes

systemctl restart sshd

service sshd restart
=======


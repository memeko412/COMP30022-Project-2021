
DROP TABLE IF EXISTS tm_user;

CREATE TABLE `tm_user` (
  `user_id` INT(16) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `account_name` VARCHAR(32) NULL DEFAULT NULL COMMENT 'The system login account',
  `user_name` VARCHAR(32) NOT NULL COMMENT 'The system username',
  `company` VARCHAR(32) NULL COMMENT 'company',
  `work` VARCHAR(32) NULL COMMENT 'user s work',
  `gender` TINYINT NULL COMMENT 'user s gender',
  `photo` LONGBLOB NULL COMMENT 'a photo of user',
  `intro` VARCHAR(1024) NULL COMMENT 'brief introduction of user s profile',
  `phone` VARCHAR(50) NULL DEFAULT NULL COMMENT 'Phone number',
  `address` VARCHAR(100) NULL COMMENT 'address',
  `email` VARCHAR(100) NULL COMMENT 'email',
  `theme` LONGBLOB NULL COMMENT 'colour information of preferred theme',
  `date_of_birth` DATETIME NULL COMMENT 'birthday',
  `password` VARCHAR(100) NOT NULL COMMENT 'Login password',
  `is_admin` VARCHAR(1) NOT NULL COMMENT 'Determine whether it is an administrator login, Y: Yes, N: No',
  `is_valid` VARCHAR(1) NOT NULL COMMENT 'Determine whether the account is valid, 0 vaild, 1 not vaild',
  `created_by` VARCHAR(32) NULL DEFAULT NULL COMMENT 'Creator',
  `created_time` DATETIME NULL DEFAULT NULL COMMENT 'Creation time',
  `updated_by` VARCHAR(32) NULL DEFAULT NULL COMMENT 'Updater',
  `updated_time` DATETIME NULL DEFAULT NULL COMMENT 'Update time',
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `account_no_password_tm_user` (`account_name` ASC, `password` ASC) ,
  UNIQUE INDEX `email_password_tm_user` (`email` ASC, `password` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'System management, system user table';

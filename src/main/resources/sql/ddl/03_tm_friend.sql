
DROP TABLE IF EXISTS tm_friend;

CREATE TABLE IF NOT EXISTS `tm_friend` (
  `friend_id` INT(16) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `name` VARCHAR(32) NOT NULL COMMENT 'Friend name',
  `gender` TINYINT NULL DEFAULT NULL COMMENT 'Friend gender',
  `notes` VARCHAR(1024) NULL DEFAULT NULL COMMENT 'notes',
  `phone` VARCHAR(16) NULL COMMENT 'Phone number',
  `address` VARCHAR(32) NULL DEFAULT NULL COMMENT 'Friend address',
  `fax` VARCHAR(16) NULL DEFAULT NULL COMMENT 'Fax',
  `company` VARCHAR(16) NULL DEFAULT NULL COMMENT 'Company',
  `photo` LONGBLOB NULL COMMENT 'friend s photo',
  `email` VARCHAR(16) NULL DEFAULT NULL COMMENT 'Email',
  `date_meet` DATETIME NULL DEFAULT NULL COMMENT 'Date of encounter',
  `user_id` INT(16) NOT NULL COMMENT 'user id',
  `group_id` INT(16) NOT NULL  COMMENT 'group id',
  `friend_user_id` INT(16) NOT NULL COMMENT 'The user id corresponding to the friend',
  `is_valid` VARCHAR(1) NOT NULL COMMENT 'Determine whether the friend list is valid',
  `created_by` VARCHAR(32) NULL DEFAULT NULL COMMENT 'Creator',
  `created_time` DATETIME NULL DEFAULT NULL COMMENT 'Creation time',
  `updated_by` VARCHAR(32) NULL DEFAULT NULL COMMENT 'Updater',
  `updated_time` DATETIME NULL DEFAULT NULL COMMENT 'Update time',
  PRIMARY KEY (`friend_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'Friends management, friend list table';



DROP TABLE IF EXISTS tm_group;

CREATE TABLE `tm_group` (
  `group_id` INT(16) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `group_name` VARCHAR(32) NOT NULL COMMENT 'Group Name',
  `group_desc` VARCHAR(32) NULL DEFAULT NULL COMMENT 'Group description',
  `user_id` VARCHAR(32) NULL DEFAULT NULL COMMENT 'A specific user group',
  `is_valid` VARCHAR(1) NOT NULL COMMENT 'Determine whether the group is valid, 0 vaild, 1 not vaild',
  `created_by` VARCHAR(32) NOT NULL COMMENT 'Creator',
  `created_time` DATETIME NULL DEFAULT NULL COMMENT 'Creation time',
  `updated_by` VARCHAR(32) NULL DEFAULT NULL COMMENT 'Updater',
  `updated_time` DATETIME NULL DEFAULT NULL COMMENT 'Update time',
  PRIMARY KEY (`group_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'Friends management, group table';

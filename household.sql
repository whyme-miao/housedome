/*
 Navicat Premium Data Transfer

 Source Server         : MYSQL
 Source Server Type    : MySQL
 Source Server Version : 50729
 Source Host           : localhost:3306
 Source Schema         : household

 Target Server Type    : MySQL
 Target Server Version : 50729
 File Encoding         : 65001

 Date: 02/12/2020 19:25:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for employee
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee`  (
  `idcard` varbinary(255) NULL DEFAULT NULL COMMENT '身份证号码',
  `employeeid` int(11) NOT NULL AUTO_INCREMENT COMMENT '工号',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '性别',
  `section` enum('正式工','临时工') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '工种：0正式工 1临时工',
  `number` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电话号码',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '家庭住址',
  `birthdate` bigint(20) NULL DEFAULT NULL COMMENT '出生日期',
  `political` enum('中共党员','共青团员','群众') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '政治面貌：0中共党员 1共青团员 2群众',
  `state` enum('雇佣中','未雇佣') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '雇佣状态：0雇佣中 1未雇佣',
  `avgscore` float(255, 1) NULL DEFAULT 0.0 COMMENT '历史评分',
  PRIMARY KEY (`employeeid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 48 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of employee
-- ----------------------------
INSERT INTO `employee` VALUES (0x34353038383131393938303330333933393339, 1, '如如子', '男', '正式工', '13526434642', '泉州晋江安海镇前湖村西区18号', 915206400000, '中共党员', '未雇佣', 0.0);
INSERT INTO `employee` VALUES (0x34353038383131393938303330333933393232, 2, '贤贤子', '女', '正式工', '13626434642', '湖南长沙美誉名作呀', 915292800000, '共青团员', '雇佣中', 4.6);
INSERT INTO `employee` VALUES (0x34353038383131393938303330333934353435, 3, '娜娜子', '男', '正式工', '13726434642', '广西省桂平市XX号', 915292800000, '中共党员', '未雇佣', 3.0);
INSERT INTO `employee` VALUES (0x34353038383131393938303330333933393339, 35, '虫虫', '男', '正式工', '134512345d67', '广东省中山市东升镇坦背新市场', 915292800000, '共青团员', '未雇佣', 1.0);
INSERT INTO `employee` VALUES (NULL, 36, '憨憨', '女', '正式工', '134512345967', '广东省中山市东升镇坦背新市场', 917971200000, '中共党员', '未雇佣', 0.0);
INSERT INTO `employee` VALUES (0x343530393931313838373834383433393439, 46, '憨憨吗', '男', '正式工', '134512345967', '广东省中山市东升镇坦背新市场', 917971200000, '中共党员', '未雇佣', 0.0);
INSERT INTO `employee` VALUES (0x343530393931313838373834383433393439, 47, '憨', '男', '正式工', '134512345967', '广东省中山市东升镇坦背新市场', 917971200000, '中共党员', '未雇佣', 0.0);

-- ----------------------------
-- Table structure for evaluate
-- ----------------------------
DROP TABLE IF EXISTS `evaluate`;
CREATE TABLE `evaluate`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderid` int(11) NULL DEFAULT NULL COMMENT '订单id',
  `rate` float(255, 1) NULL DEFAULT NULL COMMENT '评分',
  `employeeid` int(11) NULL DEFAULT NULL COMMENT '员工id',
  `evaluate` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '评价',
  `userid` int(11) NULL DEFAULT NULL COMMENT '顾客id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of evaluate
-- ----------------------------
INSERT INTO `evaluate` VALUES (1, 1, 1.0, 35, '的话赛点局啊四点', 1);
INSERT INTO `evaluate` VALUES (2, 1, 3.0, 3, '奥术大师多撒多', 6);
INSERT INTO `evaluate` VALUES (6, 3, 2.0, 36, '真不错，记录大袋', 1);
INSERT INTO `evaluate` VALUES (7, 3, 2.0, 36, '真不错，记录大袋', 1);

-- ----------------------------
-- Table structure for power
-- ----------------------------
DROP TABLE IF EXISTS `power`;
CREATE TABLE `power`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `authName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '权限名称',
  `level` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '权限等级',
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '路径',
  `desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '权限描述',
  `options` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '请求方式',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of power
-- ----------------------------
INSERT INTO `power` VALUES (1, '员工管理', '0', '/employee', '对员工进行增删改查', '/');
INSERT INTO `power` VALUES (3, '顾客管理', '0', '/user', '对顾客进行增删改查', '/');
INSERT INTO `power` VALUES (4, '权限管理', '0', '/role', '对权限进行增删改查', '/');
INSERT INTO `power` VALUES (5, '添加员工', '1', '/employee/add', '添加员工', 'POST');
INSERT INTO `power` VALUES (6, '员工列表', '2', '/employee', '查看员工列表', 'GET');
INSERT INTO `power` VALUES (7, '编辑员工', '1', '/employee', '编辑员工信息', 'PUT');
INSERT INTO `power` VALUES (8, '删除员工', '0', '/employee', '删除员工信息', 'DELETE');
INSERT INTO `power` VALUES (9, '订单列表', '2', '/order', '查看订单列表', NULL);
INSERT INTO `power` VALUES (10, '订单修改', '1', '/order', '编辑订单信息', NULL);
INSERT INTO `power` VALUES (11, '顾客列表', '2', '/user', '查看顾客列表', 'GET');
INSERT INTO `power` VALUES (12, '编辑顾客', '2', '/user', '编辑顾客信息', 'PUT');
INSERT INTO `power` VALUES (13, '删除顾客', '0', '/user', '删除顾客信息', 'DELETE');
INSERT INTO `power` VALUES (14, '权限列表', '2', '/role', '查看权限列表', NULL);
INSERT INTO `power` VALUES (15, '分配权限', '0', '/role', '分配权限', NULL);
INSERT INTO `power` VALUES (16, '修改员工雇佣状态', '0', '/state', '修改员工雇佣状态', 'PUT');
INSERT INTO `power` VALUES (17, '显示未雇佣员工列表', '2', '/state', '显示未雇佣员工列表', 'GET');
INSERT INTO `power` VALUES (18, '员工服务类型列表', '2', '/service', '员工服务类型列表', 'GET');
INSERT INTO `power` VALUES (19, '根据服务类型查询员工', '2', '/service', '根据服务类型查询员工', 'POST');
INSERT INTO `power` VALUES (20, '评价信息列表', '2', '/rate', '评价信息列表', 'GET');
INSERT INTO `power` VALUES (21, '新增评价', '2', '/rate', '新增评价', 'POST');
INSERT INTO `power` VALUES (22, '上传头像', '2', '/user', '顾客头像', 'POST');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int(255) NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `level` int(255) NULL DEFAULT NULL COMMENT '权限等级',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, 0, '超级管理员');
INSERT INTO `role` VALUES (5, 2, '员工');

-- ----------------------------
-- Table structure for salary
-- ----------------------------
DROP TABLE IF EXISTS `salary`;
CREATE TABLE `salary`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `workExperience` enum('0~1','1~2','3~4','5~6','7~8') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '工作经验',
  `type` enum('看护服务','清洁服务','宠物托管','母婴护理','家庭教育') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '服务类型',
  `salary` enum('80','100','160','200','260','300','320','400','500') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '薪水',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of salary
-- ----------------------------
INSERT INTO `salary` VALUES (1, '0~1', '看护服务', '80');
INSERT INTO `salary` VALUES (2, '1~2', '看护服务', '160');
INSERT INTO `salary` VALUES (3, '3~4', '看护服务', '260');
INSERT INTO `salary` VALUES (4, '5~6', '看护服务', '320');
INSERT INTO `salary` VALUES (5, '7~8', '看护服务', '400');
INSERT INTO `salary` VALUES (6, '0~1', '清洁服务', '100');
INSERT INTO `salary` VALUES (7, '1~2', '清洁服务', '160');
INSERT INTO `salary` VALUES (8, '3~4', '清洁服务', '160');
INSERT INTO `salary` VALUES (9, '5~6', '清洁服务', '260');
INSERT INTO `salary` VALUES (10, '7~8', '清洁服务', '320');
INSERT INTO `salary` VALUES (11, '0~1', '宠物托管', '100');
INSERT INTO `salary` VALUES (12, '1~2', '宠物托管', '200');
INSERT INTO `salary` VALUES (13, '3~4', '宠物托管', '260');
INSERT INTO `salary` VALUES (14, '5~6', '宠物托管', '320');
INSERT INTO `salary` VALUES (15, '7~8', '宠物托管', '400');
INSERT INTO `salary` VALUES (16, '0~1', '母婴护理', '160');
INSERT INTO `salary` VALUES (17, '1~2', '母婴护理', '260');
INSERT INTO `salary` VALUES (18, '3~4', '母婴护理', '320');
INSERT INTO `salary` VALUES (19, '5~6', '母婴护理', '320');
INSERT INTO `salary` VALUES (20, '7~8', '母婴护理', '400');
INSERT INTO `salary` VALUES (21, '0~1', '家庭教育', '160');
INSERT INTO `salary` VALUES (22, '1~2', '家庭教育', '260');
INSERT INTO `salary` VALUES (23, '3~4', '家庭教育', '320');
INSERT INTO `salary` VALUES (24, '5~6', '家庭教育', '400');
INSERT INTO `salary` VALUES (25, '7~8', '家庭教育', '500');

-- ----------------------------
-- Table structure for servicerecord
-- ----------------------------
DROP TABLE IF EXISTS `servicerecord`;
CREATE TABLE `servicerecord`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `type` enum('看护服务','清洁服务','宠物托管','母婴护理','家庭教育') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '服务类型',
  `userid` int(11) NULL DEFAULT NULL COMMENT '顾客id',
  `employeeid` int(11) NULL DEFAULT NULL COMMENT '服务员id',
  `hiredate` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '雇佣日期',
  `day` int(255) NULL DEFAULT NULL COMMENT '雇佣天数',
  `status` enum('完成','进行中','未安排') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '订单状态',
  `salary` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '薪水',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of servicerecord
-- ----------------------------
INSERT INTO `servicerecord` VALUES (1, '看护服务', 6, 1, '1999', 3, '未安排', '1000');
INSERT INTO `servicerecord` VALUES (2, '清洁服务', 6, 1, '1605598051963', 3, '完成', '3000');
INSERT INTO `servicerecord` VALUES (3, '宠物托管', 4, 2, '1605598051963', 3, '未安排', '22');

-- ----------------------------
-- Table structure for servicetype
-- ----------------------------
DROP TABLE IF EXISTS `servicetype`;
CREATE TABLE `servicetype`  (
  `serviceid` int(11) NOT NULL COMMENT '服务类型id',
  `employeeid` int(11) NOT NULL COMMENT '员工id',
  `type` enum('看护服务','清洁服务','宠物托管','母婴护理','家庭教育') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '服务类型',
  `synopsis` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '服务简介',
  `workExperience` enum('0~1','1~2','3~4','5~6','7~8') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '工作经验',
  `time` enum('2','3','4','5','6','7','8') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '工作时间',
  PRIMARY KEY (`serviceid`) USING BTREE,
  INDEX `employeeid`(`employeeid`) USING BTREE,
  INDEX `serviceid`(`serviceid`, `employeeid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of servicetype
-- ----------------------------
INSERT INTO `servicetype` VALUES (1, 1, '清洁服务', '指通过专业清洁人员使用清洁设备、工具、用品和药剂，对居室内地面、墙面、顶棚、阳台、厨房、卫生间等部位进行清扫服务：对门窗、玻璃、灶具、洁具、家具等进行针对性的处理，以达到环境清洁、杀菌防腐、物品保养的目的', '0~1', '4');
INSERT INTO `servicetype` VALUES (2, 1, '看护服务', '指以病人为中心，强化基础护理，全面落实护理责任制，深化护理专业内涵，整体提升护理服务水平', '1~2', '4');
INSERT INTO `servicetype` VALUES (3, 2, '宠物托管', '提供宠物日间托管服务以及老年宠物托管服务', '5~6', '8');
INSERT INTO `servicetype` VALUES (4, 2, '母婴护理', '主要是指对孕妇分娩后的心理、健康、饮食、体形及新生儿成长发育、健康成长、疾病护理等的一种服务', '1~2', '8');
INSERT INTO `servicetype` VALUES (5, 3, '看护服务', '指以病人为中心，强化基础护理，全面落实护理责任制，深化护理专业内涵，整体提升护理服务水平', '0~1', '4');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '住址',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `sex` enum('女','男') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '性别',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `number` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电话号码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '广东', '张三', '男', 'http://localhost:3000/uploads/0822150f3cd09a42ccbba3a2d6f9ab23', 'root', '$2a$10$pbkqpoB29bqaioxjJXiiD.qVzIp4w/UzAx5OUJfFU5yM8TWHpjApq', '13666666666');
INSERT INTO `user` VALUES (5, 'dasdsadsda', '胖四', '女', 'http://localhost:3000/uploads/0822150f3cd09a42ccbba3a2d6f9ab23', 'root', '$2a$10$BbNhC68WmQt8w7OhuPFChOra5auxXSD8ya3UlLVdlqNproD5rBgbu', '1353333333');
INSERT INTO `user` VALUES (6, 'dasdsadsda', '胖五', '女', 'http://localhost:3000/uploads/0822150f3cd09a42ccbba3a2d6f9ab23', 'admin', '$2a$10$D77s/LNtvjF7mN.1ZEs2IOVVuC3Orgxrq3tbe3JW7WaCn4vtvr4mm', '1353333333');

-- ----------------------------
-- Table structure for userend
-- ----------------------------
DROP TABLE IF EXISTS `userend`;
CREATE TABLE `userend`  (
  `id` int(11) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `role_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userend
-- ----------------------------
INSERT INTO `userend` VALUES (1, 'admin', '123', NULL, '超级管理员');
INSERT INTO `userend` VALUES (2, 'user', '123', NULL, '员工');

SET FOREIGN_KEY_CHECKS = 1;

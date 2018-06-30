-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 29, 2018 at 02:07 AM
-- Server version: 5.7.18
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cAuth`
--

-- --------------------------------------------------------

--
-- Table structure for table `cAppinfo`
--

CREATE TABLE `cAppinfo` (
  `appid` char(36) DEFAULT NULL,
  `secret` char(64) DEFAULT NULL,
  `ip` char(20) DEFAULT NULL,
  `login_duration` int(11) DEFAULT NULL,
  `qcloud_appid` char(64) DEFAULT NULL,
  `session_duration` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cAppinfo`
--

INSERT INTO `cAppinfo` (`appid`, `secret`, `ip`, `login_duration`, `qcloud_appid`, `session_duration`) VALUES
('wxde99d98b14941b95', '', '139.199.210.199', 1000, '1252727453', 2000);

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

CREATE TABLE `coupon` (
  `discount_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `money` decimal(8,2) DEFAULT NULL,
  `amount` decimal(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `cSessionInfo`
--

CREATE TABLE `cSessionInfo` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skey` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `session_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_info` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会话管理用户信息';

-- --------------------------------------------------------

--
-- Table structure for table `dishes`
--

CREATE TABLE `dishes` (
  `dish_id` int(11) NOT NULL,
  `type` varchar(45) COLLATE utf8_bin NOT NULL,
  `image` varchar(128) COLLATE utf8_bin NOT NULL,
  `dish_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `ordered_count` int(11) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `star_times` decimal(8,2) NOT NULL,
  `star_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `dishes`
--

INSERT INTO `dishes` (`dish_id`, `type`, `image`, `dish_name`, `ordered_count`, `price`, `star_times`, `star_count`) VALUES
(1, '小食', '', '浓情烤翅', 4, '10.00', '1.00', 5),
(2, '小食', '', '浓情香鸡翼', 0, '12.00', '1.00', 5),
(3, '小食', '', '酥炸鱿鱼', 0, '13.50', '1.00', 5),
(4, '小食', '', '香草凤尾虾', 0, '20.00', '1.00', 5),
(5, '小食', '', '鱼籽酱虾球', 0, '20.00', '1.00', 5),
(6, '披萨', '', '和风四拼披萨', 0, '55.00', '1.00', 5),
(7, '披萨', '', '地中海风情披萨', 0, '50.00', '1.00', 5),
(8, '披萨', '', '榴莲多多披萨', 0, '50.00', '1.00', 5),
(9, '披萨', '', '至尊四拼披萨', 0, '55.00', '1.00', 5),
(10, '披萨', '', '超级至尊披萨', 0, '50.00', '1.00', 5),
(11, '披萨', '', '鳗烤究披萨', 0, '60.00', '1.00', 5),
(12, '汤&甜品', '', '巧克力蛋糕', 0, '25.00', '1.00', 5),
(13, '汤&甜品', '', '提拉米苏', 0, '30.00', '1.00', 5),
(14, '汤&甜品', '', '法式南瓜汤', 0, '20.00', '1.00', 5),
(15, '汤&甜品', '', '鸡茸蘑菇汤', 0, '20.00', '1.00', 5),
(16, '饭面', '', '意式肉酱面', 0, '30.00', '1.00', 5),
(17, '饭面', '', '松子罗勒意面', 0, '30.00', '1.00', 5),
(18, '饭面', '', '欧式培根炒饭', 0, '30.00', '1.00', 5),
(19, '饭面', '', '照烧鸡肉炒饭', 0, '30.00', '1.00', 5),
(20, '饭面', '', '西班牙海鲜面', 0, '30.00', '1.00', 5),
(21, '饮料', '', '丝滑奶茶', 0, '15.00', '1.00', 5),
(22, '饮料', '', '冰柠檬红茶', 0, '15.00', '1.00', 5),
(23, '饮料', '', '嗨杯鲜果茶', 0, '15.00', '1.00', 5),
(24, '饮料', '', '石榴美莓', 0, '15.00', '1.00', 5),
(25, '饮料', '', '福佳白啤酒', 0, '45.00', '1.00', 5);

-- --------------------------------------------------------

--
-- Table structure for table `distribution`
--

CREATE TABLE `distribution` (
  `table_id` int(11) NOT NULL,
  `number` varchar(32) COLLATE utf8_bin NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `orderers_count` int(11) DEFAULT NULL,
  `user_avatar` varchar(128) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `distribution`
--

INSERT INTO `distribution` (`table_id`, `number`, `user_id`, `orderers_count`, `user_avatar`) VALUES
(1, 'A1', NULL, NULL, NULL),
(2, 'A2', NULL, NULL, NULL),
(3, 'A3', NULL, NULL, NULL),
(4, 'A4', NULL, NULL, NULL),
(5, 'A5', NULL, NULL, NULL),
(6, 'A6', NULL, NULL, NULL),
(7, 'A7', NULL, NULL, NULL),
(8, 'A8', NULL, NULL, NULL),
(9, 'A9', NULL, NULL, NULL),
(10, 'A10', NULL, NULL, NULL),
(11, 'A11', NULL, NULL, NULL),
(12, 'A12', NULL, NULL, NULL),
(13, 'B1', NULL, NULL, NULL),
(14, 'B2', NULL, NULL, NULL),
(15, 'B3', NULL, NULL, NULL),
(16, 'B4', NULL, NULL, NULL),
(17, 'B5', NULL, NULL, NULL),
(18, 'B6', NULL, NULL, NULL),
(19, 'B7', NULL, NULL, NULL),
(20, 'B8', NULL, NULL, NULL),
(21, 'C1', NULL, NULL, NULL),
(22, 'C2', NULL, NULL, NULL),
(23, 'C3', NULL, NULL, NULL),
(24, 'C4', NULL, NULL, NULL),
(25, 'C5', NULL, NULL, NULL),
(26, 'C6', NULL, NULL, NULL),
(27, 'C7', NULL, NULL, NULL),
(28, 'C8', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `dinning_choice` tinyint(1) DEFAULT NULL,
  `payment_choice` tinyint(1) DEFAULT NULL,
  `note` varchar(64) COLLATE utf8_bin NOT NULL,
  `total_price` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `order_record`
--

CREATE TABLE `order_record` (
  `od_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `dish_id` int(11) NOT NULL,
  `amount` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `table_dish`
--

CREATE TABLE `table_dish` (
  `td_id` int(11) NOT NULL,
  `table_id` int(11) NOT NULL,
  `dish_id` int(11) NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `wechat_name` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `wechat_avatar` varchar(256) COLLATE utf8_bin DEFAULT NULL,
  `location` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `openid` char(64) COLLATE utf8_bin DEFAULT NULL,
  `phone` char(20) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`discount_id`),
  ADD KEY `user_id3` (`user_id`);

--
-- Indexes for table `cSessionInfo`
--
ALTER TABLE `cSessionInfo`
  ADD PRIMARY KEY (`open_id`),
  ADD KEY `openid` (`open_id`) USING BTREE,
  ADD KEY `skey` (`skey`) USING BTREE;

--
-- Indexes for table `dishes`
--
ALTER TABLE `dishes`
  ADD PRIMARY KEY (`dish_id`);

--
-- Indexes for table `distribution`
--
ALTER TABLE `distribution`
  ADD PRIMARY KEY (`table_id`),
  ADD KEY `user_id2` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id1` (`user_id`);

--
-- Indexes for table `order_record`
--
ALTER TABLE `order_record`
  ADD PRIMARY KEY (`od_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `table_dish`
--
ALTER TABLE `table_dish`
  ADD PRIMARY KEY (`td_id`),
  ADD KEY `table_id` (`table_id`),
  ADD KEY `dish_id` (`dish_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `coupon`
--
ALTER TABLE `coupon`
  MODIFY `discount_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `dishes`
--
ALTER TABLE `dishes`
  MODIFY `dish_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `distribution`
--
ALTER TABLE `distribution`
  MODIFY `table_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `order_record`
--
ALTER TABLE `order_record`
  MODIFY `od_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `table_dish`
--
ALTER TABLE `table_dish`
  MODIFY `td_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `coupon`
--
ALTER TABLE `coupon`
  ADD CONSTRAINT `coupon_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `distribution`
--
ALTER TABLE `distribution`
  ADD CONSTRAINT `distribution_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_record`
--
ALTER TABLE `order_record`
  ADD CONSTRAINT `order_record_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `table_dish`
--
ALTER TABLE `table_dish`
  ADD CONSTRAINT `table_dish_ibfk_1` FOREIGN KEY (`table_id`) REFERENCES `distribution` (`table_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `table_dish_ibfk_2` FOREIGN KEY (`dish_id`) REFERENCES `dishes` (`dish_id`) ON DELETE CASCADE ON UPDATE CASCADE;

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `event_0` ON SCHEDULE AT '2018-06-27 21:15:14' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE `distribution` SET `user_id` = NULL WHERE `table_id` =2$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

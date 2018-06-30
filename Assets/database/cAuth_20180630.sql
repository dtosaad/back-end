-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 30, 2018 at 09:41 AM
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
(1, '小食', '', '浓情烤翅', 57, '10.00', '1.00', 5),
(2, '小食', '', '浓情香鸡翼', 1, '12.00', '1.00', 5),
(3, '小食', '', '酥炸鱿鱼', 3, '13.50', '1.00', 5),
(4, '小食', '', '香草凤尾虾', 0, '20.00', '1.00', 5),
(5, '小食', '', '鱼籽酱虾球', 0, '20.00', '1.00', 5),
(6, '披萨', '', '和风四拼披萨', 37, '55.00', '1.00', 5),
(7, '披萨', '', '地中海风情披萨', 20, '50.00', '1.00', 5),
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
  `user_avatar` varchar(256) COLLATE utf8_bin DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `distribution`
--

INSERT INTO `distribution` (`table_id`, `number`, `user_id`, `orderers_count`, `user_avatar`, `status`) VALUES
(1, 'A1', NULL, 0, NULL, 0),
(2, 'A2', NULL, 0, NULL, 0),
(3, 'A3', NULL, 0, NULL, 0),
(4, 'A4', NULL, 0, NULL, 0),
(5, 'A5', NULL, 0, NULL, 0),
(6, 'A6', NULL, 0, NULL, 0),
(7, 'A7', NULL, 0, NULL, 0),
(8, 'A8', NULL, 0, NULL, 0),
(9, 'A9', NULL, 0, NULL, 0),
(10, 'A10', NULL, 0, NULL, 0),
(11, 'A11', NULL, 0, NULL, 0),
(12, 'A12', NULL, 0, NULL, 0),
(13, 'B1', NULL, 0, NULL, 0),
(14, 'B2', NULL, 0, NULL, 0),
(15, 'B3', NULL, 0, NULL, 0),
(16, 'B4', NULL, 0, NULL, 0),
(17, 'B5', NULL, 0, NULL, 0),
(18, 'B6', NULL, 0, NULL, 0),
(19, 'B7', NULL, 0, NULL, 0),
(20, 'B8', NULL, 0, NULL, 0),
(21, 'C1', NULL, 0, NULL, 0),
(22, 'C2', NULL, 0, NULL, 0),
(23, 'C3', NULL, 0, NULL, 0),
(24, 'C4', NULL, 0, NULL, 0),
(25, 'C5', NULL, 0, NULL, 0),
(26, 'C6', NULL, NULL, NULL, 0),
(27, 'C7', NULL, NULL, NULL, 0),
(28, 'C8', NULL, NULL, NULL, 0);

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

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `dinning_choice`, `payment_choice`, `note`, `total_price`) VALUES
(12, 66, 1, NULL, 'undefined', '20.00'),
(13, 66, 1, NULL, 'undefined', '180.00'),
(14, 66, 1, NULL, 'undefined', '180.00'),
(15, 66, 1, NULL, 'undefined', '180.00'),
(16, 65, 1, NULL, '不要辣', '175.00'),
(17, 66, 1, NULL, '少辣', '175.00'),
(18, 66, 1, NULL, '少辣', '175.00'),
(19, 66, 1, NULL, '少辣', '175.00'),
(20, 66, 1, NULL, '少辣', '175.00'),
(21, 68, 2, NULL, '口味偏好等', '10.00'),
(22, 68, 2, NULL, '口味偏好等', '12.00'),
(23, 68, 2, NULL, '口味偏好等', '13.50'),
(24, 68, 2, NULL, '口味偏好等', '10.00'),
(25, 68, 2, NULL, '口味偏好等', '10.00'),
(26, 68, 2, NULL, '口味偏好等', '10.00'),
(27, 68, 2, NULL, '口味偏好等', '13.50'),
(28, 68, 2, NULL, '口味偏好等', '13.50'),
(29, 68, 2, NULL, '口味偏好等', '10.00'),
(30, 67, 2, NULL, '口味偏好等', '55.00'),
(31, 67, 2, NULL, '口味偏好等', '55.00'),
(32, 67, 3, NULL, '1111', '55.00');

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

--
-- Dumping data for table `order_record`
--

INSERT INTO `order_record` (`od_id`, `order_id`, `dish_id`, `amount`) VALUES
(19, 14, 1, '2.00'),
(20, 14, 7, '1.00'),
(21, 14, 6, '2.00'),
(22, 16, 1, '2.00'),
(23, 16, 7, '1.00'),
(24, 16, 6, '2.00'),
(25, 17, 1, '2.00'),
(26, 17, 7, '1.00'),
(27, 17, 6, '2.00'),
(28, 18, 1, '2.00'),
(29, 18, 7, '1.00'),
(30, 18, 6, '2.00'),
(31, 19, 1, '2.00'),
(32, 19, 7, '1.00'),
(33, 19, 6, '2.00'),
(34, 20, 1, '2.00'),
(35, 20, 7, '1.00'),
(36, 20, 6, '2.00'),
(37, 21, 1, '1.00'),
(38, 22, 2, '1.00'),
(39, 23, 3, '1.00'),
(40, 24, 1, '1.00'),
(41, 25, 1, '1.00'),
(42, 26, 1, '1.00'),
(43, 27, 3, '1.00'),
(44, 28, 3, '1.00'),
(45, 29, 1, '1.00'),
(46, 30, 6, '1.00'),
(47, 31, 6, '1.00'),
(48, 32, 6, '1.00');

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
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `wechat_name`, `wechat_avatar`, `location`, `openid`, `phone`) VALUES
(65, '郑钊', 'https://wx.qlogo.cn/mmopen/vi_32/qD5uG2V8zB7R55pOLyxTTGHbyJQSHdqNQUwiburkXwSiab1icyHCoaZTxyHclSaQ4P4lFrLPHiaxdyZ9ibnhur31L2Q/132', NULL, 'oFX6G5KGoC8GtDEEQQ2Lh7_2uTwA', NULL),
(66, '荣柳', 'https://wx.qlogo.cn/mmopen/vi_32/mbalywiaENf6lxVzEU8mIB6BkxyfCxaGSTJH4qMDKOJn3LL9uN1zhYRXVayp9kL65B25u3sw6uj3xrYBBKohvjQ/132', '中山大学东校区慎思园 6 号', 'oFX6G5FZ5_rhmTGF_HXMUdB9VqQI', '15521221390'),
(67, '不羁爱自由', 'https://wx.qlogo.cn/mmopen/vi_32/jXBTTwMa0XQ2iaEsbFNzA0OrjQqQFk8aMrL2PdiaBK9JtrBIWaiaMXwOzWdhPWcgZAO2df8biaEkphtuiaDqxx7Wibqw/132', '111 111', 'oFX6G5CVUbETcA1Ekd_CvSv9ZoV0', '111'),
(68, '张子扬', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epF1dbEWKbxTyY66V8ibKxiaiaGMXfqA9IZpIPicextTWAlDMusrlz33LA0H3r984MfssKSeiaTTWermyg/132', NULL, 'oFX6G5B0ZZ2KZFyRilStUi1zdopU', NULL),
(69, '央央', 'https://wx.qlogo.cn/mmopen/vi_32/ic3F8TD3LldJTcAqn2gTgfrc9epAbMibZvc6vphjiarbLFEYKlPrLmmHplUI8vbbmF85RlWNbpIYp7fgLWHpiacvIg/132', NULL, 'oFX6G5O26y92d5MMx6g6GrjRi6PM', NULL);

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
  MODIFY `discount_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
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
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `order_record`
--
ALTER TABLE `order_record`
  MODIFY `od_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;
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

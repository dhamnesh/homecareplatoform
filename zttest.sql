-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 21, 2018 at 11:09 AM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zttest`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `from_date` varchar(255) DEFAULT NULL,
  `to_date` varchar(255) DEFAULT NULL,
  `start_time` varchar(255) DEFAULT NULL,
  `end_time` varchar(255) DEFAULT NULL,
  `weekdays` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `schedule_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `secondery_email` varchar(255) DEFAULT NULL,
  `home_phone` varchar(255) DEFAULT NULL,
  `work_phone` varchar(255) DEFAULT NULL,
  `social_security_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `emergency_contact` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `secondery_email`, `home_phone`, `work_phone`, `social_security_number`, `address`, `address2`, `city`, `pincode`, `state`, `country`, `emergency_contact`, `createdAt`, `updatedAt`) VALUES
(1, NULL, '123465789', '123456789', '123456789', '201 silver spring', 'church road', 'Indore', '452010', 'NY', 'New York', '132465798', '2018-06-20 13:48:54', '2018-06-20 13:48:54'),
(2, NULL, '7778889944', '132465', '123456798', 'Starc tower', 'US', 'us', '452010', 'LA', 'USA', '452134', '2018-06-20 13:49:09', '2018-06-21 05:34:23'),
(3, NULL, '78979', '13465', '1345', 'bicholi', 'mardana', 'Indore', '452010', 'MP', 'India', '123132', '2018-06-20 13:49:09', '2018-06-21 05:45:39'),
(4, NULL, '9998882222', '7894657845', '12345678', 'Manhattan', 'Starc tower', 'Manhattan', '452010', 'USA', 'USA', '789461323', '2018-06-20 13:49:09', '2018-06-21 05:32:08'),
(5, NULL, '1478523697', '123465798', '1345', 'apolo tower', 'jk', 'New Jersey', '452010', 'US', 'USA', '134578', '2018-06-20 13:49:10', '2018-06-21 05:45:03'),
(6, NULL, '3333669977', '123465798', '134513456', 'New Jersy', 'Church Road', 'New Jersey', '452010', 'USA', 'USA', '1348597', '2018-06-20 13:49:10', '2018-06-21 06:54:22'),
(7, NULL, '22336655', '13245788', '13245678', 'Manhattan', 'USA', 'USA', '452010', 'USA', 'USA', '2134578', '2018-06-20 13:49:11', '2018-06-21 07:00:04'),
(8, NULL, '78979', '13465', '1345', 'LA', 'US', 'LA', '452010', 'LA', 'USA', '123132', '2018-06-20 13:49:11', '2018-06-20 13:49:11'),
(9, NULL, '78979', '13465', '1345', 'LA', 'US', 'LA', '452010', 'LA', 'USA', '123132', '2018-06-20 13:49:12', '2018-06-20 13:49:12');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Caregiver', 'Caregiver', '2018-06-20 13:48:54', '2018-06-20 13:48:54'),
(2, 'Patient', 'Patient', '2018-06-20 13:48:54', '2018-06-20 13:48:54'),
(3, 'admin', 'admin', '2018-06-20 13:48:54', '2018-06-20 13:48:54');

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `id` int(11) NOT NULL,
  `from_date` varchar(255) DEFAULT NULL,
  `to_date` varchar(255) DEFAULT NULL,
  `start_time` varchar(255) DEFAULT NULL,
  `end_time` varchar(255) DEFAULT NULL,
  `weekdays` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `service_provider` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`id`, `from_date`, `to_date`, `start_time`, `end_time`, `weekdays`, `createdAt`, `updatedAt`, `service_provider`) VALUES
(1, '1529401341526', '1529401341526', '1529401341526', '1529401341526', '[1,2,3]', '2018-06-20 13:49:09', '2018-06-20 13:49:09', 2),
(2, '1525518000000', '1525518000000', '1525518000000', '1525518000000', '[1,2,5]', '2018-06-20 13:49:09', '2018-06-20 13:49:09', 2),
(3, '1529401341526', '1529401341526', '1529401341526', '1529401341526', '[1,2,3]', '2018-06-20 13:49:09', '2018-06-20 13:49:09', 3),
(4, '1525518000000', '1525518000000', '1525518000000', '1525518000000', '[1,2,5]', '2018-06-20 13:49:09', '2018-06-20 13:49:09', 3),
(5, '1529401341526', '1529401341526', '1529401341526', '1529401341526', '[1,2,3]', '2018-06-20 13:49:09', '2018-06-20 13:49:09', 4),
(6, '1525518000000', '1525518000000', '1525518000000', '1525518000000', '[1,2,5]', '2018-06-20 13:49:09', '2018-06-20 13:49:09', 4),
(7, '1529401341526', '1529401341526', '1529401341526', '1529401341526', '[1,2,3]', '2018-06-20 13:49:10', '2018-06-20 13:49:10', 5),
(8, '1525518000000', '1525518000000', '1525518000000', '1525518000000', '[1,2,5]', '2018-06-20 13:49:10', '2018-06-20 13:49:10', 5),
(9, '1529401341526', '1529401341526', '1529401341526', '1529401341526', '[1,2,3]', '2018-06-20 13:49:10', '2018-06-20 13:49:10', 6),
(10, '1525518000000', '1525518000000', '1525518000000', '1525518000000', '[1,2,5]', '2018-06-20 13:49:10', '2018-06-20 13:49:10', 6),
(11, '1529401341526', '1529401341526', '1529401341526', '1529401341526', '[1,2,3]', '2018-06-20 13:49:11', '2018-06-20 13:49:11', 7),
(12, '1525518000000', '1525518000000', '1525518000000', '1525518000000', '[1,2,5]', '2018-06-20 13:49:11', '2018-06-20 13:49:11', 7),
(13, '1529401341526', '1529401341526', '1529401341526', '1529401341526', '[1,2,3]', '2018-06-20 13:49:12', '2018-06-20 13:49:12', 8),
(14, '1525518000000', '1525518000000', '1525518000000', '1525518000000', '[1,2,5]', '2018-06-20 13:49:12', '2018-06-20 13:49:12', 8),
(15, '1529401341526', '1529401341526', '1529401341526', '1529401341526', '[1,2,3]', '2018-06-20 13:49:12', '2018-06-20 13:49:12', 9),
(16, '1525518000000', '1525518000000', '1525518000000', '1525518000000', '[1,2,5]', '2018-06-20 13:49:12', '2018-06-20 13:49:12', 9),
(17, '1527791400000', '1532975400000', '1529492210000', '1529510210000', '[4,3]', '2018-06-20 13:57:56', '2018-06-20 13:57:56', 3),
(18, '1525113000000', '1535740200000', '1529492258000', '1529513858000', '[7,6,5]', '2018-06-20 13:57:56', '2018-06-20 13:57:56', 3),
(19, '1519929000000', '1535740200000', '1529551889000', '1529584289000', '[1,3,4]', '2018-06-21 05:32:08', '2018-06-21 05:32:08', 4),
(20, '1519842600000', '1538245800000', '1529544637000', '1529562637000', '[1,2,3,4,5,6,7]', '2018-06-21 05:45:03', '2018-06-21 05:45:03', 5),
(21, '1517423400000', '1541010600000', '1529549988000', '1529578788000', '[1,2,3,4,5,6,7]', '2018-06-21 07:00:04', '2018-06-21 07:00:04', 7);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Bathing', '2018-06-20 13:48:54', '2018-06-20 13:48:54'),
(2, 'Phisiotherapy', '2018-06-20 13:48:54', '2018-06-20 13:48:54'),
(3, 'Dressing', '2018-06-20 13:48:54', '2018-06-20 13:48:54'),
(4, 'Skin Care', '2018-06-20 13:48:54', '2018-06-20 13:48:54');

-- --------------------------------------------------------

--
-- Table structure for table `specialities`
--

CREATE TABLE `specialities` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `service_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `specialities`
--

INSERT INTO `specialities` (`id`, `createdAt`, `updatedAt`, `service_id`, `user_id`) VALUES
(1, '2018-06-20 13:49:09', '2018-06-20 13:49:09', 1, 2),
(4, '2018-06-20 13:49:09', '2018-06-20 13:49:09', 1, 3),
(7, '2018-06-20 13:49:09', '2018-06-20 13:49:09', 1, 4),
(8, '2018-06-20 13:49:09', '2018-06-20 13:49:09', 3, 4),
(10, '2018-06-20 13:49:10', '2018-06-20 13:49:10', 1, 5),
(11, '2018-06-20 13:49:10', '2018-06-20 13:49:10', 3, 5),
(12, '2018-06-20 13:49:10', '2018-06-20 13:49:10', 2, 5),
(13, '2018-06-20 13:49:10', '2018-06-20 13:49:10', 1, 6),
(14, '2018-06-20 13:49:10', '2018-06-20 13:49:10', 3, 6),
(15, '2018-06-20 13:49:10', '2018-06-20 13:49:10', 2, 6),
(16, '2018-06-20 13:49:11', '2018-06-20 13:49:11', 1, 7),
(19, '2018-06-20 13:49:12', '2018-06-20 13:49:12', 1, 8),
(20, '2018-06-20 13:49:12', '2018-06-20 13:49:12', 3, 8),
(21, '2018-06-20 13:49:12', '2018-06-20 13:49:12', 2, 8),
(22, '2018-06-20 13:49:12', '2018-06-20 13:49:12', 1, 9),
(23, '2018-06-20 13:49:12', '2018-06-20 13:49:12', 3, 9),
(24, '2018-06-20 13:49:12', '2018-06-20 13:49:12', 2, 9),
(27, '2018-06-20 13:57:56', '2018-06-20 13:57:56', 2, 3),
(28, '2018-06-21 05:32:08', '2018-06-21 05:32:08', 4, 4),
(29, '2018-06-21 05:45:03', '2018-06-21 05:45:03', 4, 5);

-- --------------------------------------------------------

--
-- Table structure for table `statuses`
--

CREATE TABLE `statuses` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `statuses`
--

INSERT INTO `statuses` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Upcoming', 'upcoming appointment', '2018-06-20 13:48:54', '2018-06-20 13:48:54'),
(2, 'Approved', 'Approved appoinment', '2018-06-20 13:48:54', '2018-06-20 13:48:54');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `primary_email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `contact_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `image`, `primary_email`, `first_name`, `middle_name`, `last_name`, `display_name`, `dob`, `gender`, `user_name`, `company_id`, `password_hash`, `createdAt`, `updatedAt`, `contact_id`) VALUES
(1, NULL, 'admin@gmail.com', 'admin', 'admin', 'admin', 'admin', '1527186600000', 'Male', NULL, 1, '$2y$12$HDFgibfIQJsgcGBTmR/Y8ODWOPAMvRJfJxC63UB2zpgz8jqyx9H3q', '2018-06-20 13:48:54', '2018-06-20 13:48:54', 1),
(2, NULL, 'tony@gmail.com', 'Antony', 'Howard', 'Starc', 'Tony', '1529401341000', 'Male', 'alice@gmail.com', 1, '$2a$10$94Ha7vX2V7Nrz2PjYKGKYOvcyuX.0XZhoduKGnfOkICDdumtIdON6', '2018-06-20 13:49:09', '2018-06-21 05:34:23', 2),
(3, NULL, 'sourabh.agrawal@zehntech.com', 'Sourabh', '', 'Agrawal', 'Sourabh Agrawal', '1529401341000', 'Male', 'alice@gmail.com', 1, '$2a$10$MDn4xlJUsxKGAs1rS5hgoeCFslbUHW4h.fU2NcWJgD1XPNMgZnIX6', '2018-06-20 13:49:09', '2018-06-21 05:45:39', 3),
(4, NULL, 'cap@gmail.com', 'Steve', '', 'Rogers', 'Steve Rogers', '202501800000', 'Male', 'alice@gmail.com', 1, '$2a$10$Bz4MawXinAYyPVMIChVVrOlNetFrZWhQilQ8vfo1346q1r5j3f1/K', '2018-06-20 13:49:09', '2018-06-21 05:32:08', 4),
(5, NULL, 'chandler@friends.com', 'Chandler', '', 'Bing', 'Chandler Bing', '-2135568070000', 'Male', 'alice@gmail.com', 1, '$2a$10$p8zoXxgx/VcIyZU7SSSG4ucnd817MRwZ/GMeZbM2fx827NKCuxXzC', '2018-06-20 13:49:10', '2018-06-21 05:45:03', 5),
(6, NULL, 'joey@friends.com', 'Joey', '', 'Tribiani', 'Joey Tribiani', '481141800000', 'Male', 'alice@gmail.com', 1, '$2a$10$xmzrexBnCYh7aKFN2vCR.eG0QjygNFiK42tb7gNW0uZRXxpOURMxm', '2018-06-20 13:49:10', '2018-06-21 06:54:22', 6),
(7, NULL, 'monica@friends.com', 'Monica', '', 'Geller', 'Monica Geller', '321733800000', 'Female', 'alice@gmail.com', 1, '$2a$10$ceFNK4OpdidTsmj0eoQudeEDo1TxLRYnAZGPg8XWDcft.YkjSi.eu', '2018-06-20 13:49:11', '2018-06-21 07:00:04', 7),
(8, NULL, 'alice@gmail.com', 'Alice', 'jkl', 'Joseph', 'ALice', '1529401341526', 'Male', 'alice@gmail.com', 1, '$2a$10$AB5fk8y244jOfiQKSEQWFeXQ96IS13t.udIuGk.QDu79Ox7jcOPhy', '2018-06-20 13:49:12', '2018-06-20 13:49:12', 8),
(9, NULL, 'alice@gmail.com', 'Alice', 'jkl', 'Joseph', 'ALice', '1529401341526', 'Male', 'alice@gmail.com', 1, '$2a$10$6X5XCMbPC1Y8cx9NOHWr/.hc1uVxIEmsyACVeFTlpVLYCwQ5h5hLe', '2018-06-20 13:49:12', '2018-06-20 13:49:12', 9);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`id`, `createdAt`, `updatedAt`, `role_id`, `user_id`) VALUES
(1, '2018-06-20 13:48:54', '2018-06-20 13:48:54', 3, 1),
(2, '2018-06-20 13:49:09', '2018-06-20 13:49:09', 2, 2),
(3, '2018-06-20 13:49:09', '2018-06-20 13:49:09', 2, 3),
(4, '2018-06-20 13:49:09', '2018-06-20 13:49:09', 2, 4),
(5, '2018-06-20 13:49:10', '2018-06-20 13:49:10', 2, 5),
(6, '2018-06-20 13:49:10', '2018-06-20 13:49:10', 2, 6),
(7, '2018-06-20 13:49:11', '2018-06-20 13:49:11', 1, 7),
(8, '2018-06-20 13:49:12', '2018-06-20 13:49:12', 1, 8),
(9, '2018-06-20 13:49:12', '2018-06-20 13:49:12', 1, 9);

-- --------------------------------------------------------

--
-- Table structure for table `weekdays`
--

CREATE TABLE `weekdays` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `weekdays`
--

INSERT INTO `weekdays` (`id`, `name`) VALUES
(1, 'Monday'),
(2, 'Tuesday'),
(3, 'Wednesday'),
(4, 'Thursday'),
(5, 'Friday'),
(6, 'Saturday'),
(7, 'Sunday');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `schedule_id` (`schedule_id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_provider` (`service_provider`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `specialities`
--
ALTER TABLE `specialities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `specialities_user_id_service_id_unique` (`service_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contact_id` (`contact_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_roles_user_id_role_id_unique` (`role_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `weekdays`
--
ALTER TABLE `weekdays`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `specialities`
--
ALTER TABLE `specialities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `statuses`
--
ALTER TABLE `statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `weekdays`
--
ALTER TABLE `weekdays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`service_provider`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `specialities`
--
ALTER TABLE `specialities`
  ADD CONSTRAINT `specialities_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `specialities_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

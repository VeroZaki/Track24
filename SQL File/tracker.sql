-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 29, 2021 at 11:12 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `authuser`
--

CREATE TABLE `authuser` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `authuser`
--

INSERT INTO `authuser` (`email`, `token`, `active`) VALUES
('vero.zaki16@gmail.com', 'zXW4V2ww8SIiiEG7M3ihZrAWca3jCmjq', 1),
('vero.zaki@yahoo.com', 'W83ymlsV5f6D8hMpmQeHiZ2N9tP28SbZ', 1);

-- --------------------------------------------------------

--
-- Table structure for table `urlschema`
--

CREATE TABLE `urlschema` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `statuscode` int(11) NOT NULL,
  `checkname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `urlschema`
--

INSERT INTO `urlschema` (`id`, `url`, `email`, `statuscode`, `checkname`) VALUES
(52, 'https://www.google.com/xxxxxxxxxxxx', 'vero.zaki16@gmail.com', 404, 'abc'),
(53, 'https://freshqa.qa/', 'vero.zaki@yahoo.com', 200, 'vokteck'),
(54, 'https://www.google.com/xxxxxxxxxxxx', 'vero.zaki@yahoo.com', 404, 'googleDown');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `username`, `password`) VALUES
('vero.zaki16@gmail.com', 'Veronia Osama', '$2b$10$5YUVyEJ0K1BK2l5pinidu.K8OmxZuM8rxWYNvxl1fRa0I.ozjQpli'),
('vero.zaki@yahoo.com', 'Veronia', '$2b$10$xrodrhrb60avdKfpp5z6JOD1JzKHsD6ZF320kNMLEDV0P0.qeSW4a');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authuser`
--
ALTER TABLE `authuser`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `urlschema`
--
ALTER TABLE `urlschema`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `urlschema`
--
ALTER TABLE `urlschema`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `urlschema`
--
ALTER TABLE `urlschema`
  ADD CONSTRAINT `urlschema_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`email`) REFERENCES `authuser` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

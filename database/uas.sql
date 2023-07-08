-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 08, 2023 at 05:47 AM
-- Server version: 10.11.4-MariaDB
-- PHP Version: 8.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `uas`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category`) VALUES
(1, 'Shirt'),
(2, 'Pants'),
(3, 'T-Shirt\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `price` int(100) NOT NULL,
  `rating` int(11) NOT NULL,
  `img` varchar(255) NOT NULL,
  `id_category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `rating`, `img`, `id_category`) VALUES
(1, 'Yellow Autumn T-Shirt', 'Veri cool shirt for autumn', 75000, 4, 'f3.jpg', 3),
(2, 'Nature pattern shirt', 'Some shirt', 100000, 3, 'f2.jpg', 3),
(3, 'Fun Shirt', 'Ordinary Fun Shirt', 10000, 4, 'f1.jpg', 1),
(4, 'White cotton shirt', '', 50000, 5, 'f4.jpg', 1),
(5, 'Dark cotton shirt', '', 50000, 5, 'f5.jpg', 1),
(6, 'Long sleeve T-Shirt, free inner white shirt', '', 75000, 5, 'f6.jpg', 3),
(7, 'Oversized pants', '', 95000, 3, 'f7.jpg', 2),
(8, 'Long sleeve light blue T-shirt', '', 120000, 2, 'n1.jpg', 3),
(9, 'Long sleeve grey T-shirt', '', 120000, 5, 'n2.jpg', 3),
(10, 'Long sleeve white T-shirt', '', 125000, 3, 'n3.jpg', 3),
(11, 'Traditional shirt', '', 90000, 4, 'n4.jpg', 3),
(12, 'Long sleeve denim T-shirt', '', 150000, 5, 'n5.jpg', 3),
(13, 'Short pants men', '', 50000, 5, 'n6.jpg', 2),
(14, 'Long sleeve brown T-shirt', '', 120000, 3, 'n7.jpg', 3),
(15, 'Black T-shirt', '', 70000, 2, 'n8.jpg', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

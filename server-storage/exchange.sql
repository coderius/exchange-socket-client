-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Мар 29 2023 г., 01:59
-- Версия сервера: 10.4.24-MariaDB
-- Версия PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `exchange`
--

-- --------------------------------------------------------

--
-- Структура таблицы `statistic`
--

CREATE TABLE `statistic` (
  `id` int(11) NOT NULL,
  `minExchange` float UNSIGNED NOT NULL,
  `maxExchange` float UNSIGNED NOT NULL,
  `arithmeticMean` float UNSIGNED NOT NULL,
  `standardDeviation` float UNSIGNED NOT NULL,
  `countLostExchanges` int(11) NOT NULL,
  `mode` text NOT NULL,
  `startDateTime` varchar(255) NOT NULL,
  `computeAllExecTime` float UNSIGNED NOT NULL,
  `computeExecTime` float UNSIGNED NOT NULL COMMENT 'время на расчеты по одной котировке'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `statistic`
--

INSERT INTO `statistic` (`id`, `minExchange`, `maxExchange`, `arithmeticMean`, `standardDeviation`, `countLostExchanges`, `mode`, `startDateTime`, `computeAllExecTime`, `computeExecTime`) VALUES
(24, 1046, 9785, 5630.6, 2702.64, 0, '', '28/3/2023 @ 23:31:23', 1.346, 0),
(25, 1010, 9972, 5753.91, 2718.59, 0, '', '28/3/2023 @ 23:31:28', 0.875, 0),
(26, 1164, 9832, 5593.94, 2384.7, 0, '', '28/3/2023 @ 23:31:33', 1.075, 0),
(27, 1041, 9775, 5364.93, 2424.55, 0, '', '28/3/2023 @ 23:31:48', 1.343, 0),
(28, 1022, 9944, 5463.76, 2932.86, 0, '', '28/3/2023 @ 23:31:58', 1.891, 0),
(29, 3853, 9159, 5786, 2393.55, 0, '', '28/3/2023 @ 23:50:56', 0.04, 0),
(30, 5890, 8499, 7168.33, 1065.76, 0, '', '28/3/2023 @ 23:51:21', 0.03, 0),
(31, 2221, 3362, 2853, 473.861, 0, '', '28/3/2023 @ 23:51:46', 0.031, 0),
(32, 1004, 9988, 5636.09, 2548.95, 0, '', '28/3/2023 @ 23:55:27', 36.779, 0),
(33, 1004, 9988, 5636.09, 2548.95, 0, '', '28/3/2023 @ 23:55:27', 36.779, 0),
(34, 1165, 9893, 5424.57, 2595.34, 0, '', '29/3/2023 @ 0:42:46', 1.029, 0),
(35, 1005, 9899, 5330.61, 2639.66, 0, '', '29/3/2023 @ 0:42:56', 3.557, 0),
(36, 1001, 9946, 5419.17, 2577.37, 0, '', '29/3/2023 @ 0:44:6', 2.067, 0),
(37, 4871, 6037, 5311, 517.195, 0, '', '29/3/2023 @ 0:54:28', 0.036, 0),
(38, 4682, 8871, 6792, 1710.29, 0, '', '29/3/2023 @ 1:1:29', 0.03, 0),
(39, 1044, 9981, 5716.04, 2591.02, 0, '', '29/3/2023 @ 1:1:39', 1.438, 0.001);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `statistic`
--
ALTER TABLE `statistic`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `statistic`
--
ALTER TABLE `statistic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

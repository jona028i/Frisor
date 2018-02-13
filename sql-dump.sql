-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Vært: 127.0.0.1
-- Genereringstid: 12. 02 2018 kl. 12:33:35
-- Serverversion: 10.1.30-MariaDB
-- PHP-version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `haarknuden`
--
CREATE DATABASE IF NOT EXISTS `haarknuden` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `haarknuden`;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `aabningstider`
--

CREATE TABLE `aabningstider` (
  `id` int(11) NOT NULL,
  `dag` varchar(7) NOT NULL,
  `fra` int(11) NOT NULL,
  `til` int(11) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `aabningstider`
--

INSERT INTO `aabningstider` (`id`, `dag`, `fra`, `til`, `status`) VALUES
(1, 'Mandag', 10, 1845, 'åbent'),
(2, 'Tirsdag', 10, 18, 'åbent'),
(3, 'onsdag', 10, 18, 'åbent'),
(4, 'torsdag', 10, 18, 'åbent'),
(5, 'fredag', 10, 18, 'åbent'),
(6, 'lørdag', 10, 14, 'åbent'),
(7, 'søndag', 0, 0, 'lukket');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `navn` varchar(55) NOT NULL,
  `brugernavn` varchar(55) NOT NULL,
  `kodeord` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `admin`
--

INSERT INTO `admin` (`id`, `navn`, `brugernavn`, `kodeord`) VALUES
(1, 'admin', 'admin', 'admin');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `ansatte`
--

CREATE TABLE `ansatte` (
  `id` int(11) NOT NULL,
  `navn` varchar(55) NOT NULL,
  `efternavn` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `ansatte`
--

INSERT INTO `ansatte` (`id`, `navn`, `efternavn`) VALUES
(1, 'Ady', 'Moussa'),
(2, 'Frank', 'Goldmann'),
(3, 'Hanne', 'Sørensen');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `navn` varchar(55) NOT NULL,
  `dato` int(11) NOT NULL,
  `telefon` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `ansat` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `booking`
--

INSERT INTO `booking` (`id`, `navn`, `dato`, `telefon`, `email`, `ansat`) VALUES
(1, 'Bent Jensen', 121213183, 47371371, 'bent@jensen.com', 'Ady Moussa');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `priser`
--

CREATE TABLE `priser` (
  `id` int(11) NOT NULL,
  `type` varchar(55) NOT NULL,
  `pris` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `priser`
--

INSERT INTO `priser` (`id`, `type`, `pris`) VALUES
(1, 'Maskinklip', 100),
(2, 'Almindeligt klip', 150),
(3, 'Langt hår', 200),
(4, 'Barbering', 225);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `produkter`
--

CREATE TABLE `produkter` (
  `id` int(11) NOT NULL,
  `varenr` int(11) NOT NULL,
  `pris` int(11) NOT NULL,
  `producent` varchar(55) NOT NULL,
  `navn` varchar(55) NOT NULL,
  `beskrivelse` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `produkter`
--

INSERT INTO `produkter` (`id`, `varenr`, `pris`, `producent`, `navn`, `beskrivelse`) VALUES
(1, 1, 100, 'Fish', 'Fingers', 'blah..');

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `aabningstider`
--
ALTER TABLE `aabningstider`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `ansatte`
--
ALTER TABLE `ansatte`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dato` (`dato`);

--
-- Indeks for tabel `priser`
--
ALTER TABLE `priser`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `produkter`
--
ALTER TABLE `produkter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `varenr` (`varenr`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `aabningstider`
--
ALTER TABLE `aabningstider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Tilføj AUTO_INCREMENT i tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tilføj AUTO_INCREMENT i tabel `ansatte`
--
ALTER TABLE `ansatte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tilføj AUTO_INCREMENT i tabel `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tilføj AUTO_INCREMENT i tabel `priser`
--
ALTER TABLE `priser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tilføj AUTO_INCREMENT i tabel `produkter`
--
ALTER TABLE `produkter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 08-11-2024 a las 20:27:18
-- Versión del servidor: 8.0.40
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_voyagesMachado`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Cliente`
--

CREATE TABLE `Cliente` (
  `dni` varchar(10) NOT NULL COMMENT 'dni cliente',
  `nombre` varchar(100) NOT NULL COMMENT 'nombre completo',
  `email` varchar(254) NOT NULL COMMENT 'email cliente',
  `telefono` varchar(15) NOT NULL COMMENT 'telefono con la extension del pais',
  `direccion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Cliente`
--

INSERT INTO `Cliente` (`dni`, `nombre`, `email`, `telefono`, `direccion`) VALUES
('49832814W', 'Vanessa Sampedro Cruz', 'vanecruz96q@gmail.com', '34658110448', 'Carrer Ali Bei 32, 4º1, Barcelona'),
('53771360M', 'Luis Martín Gimeno', 'luuis995@gmail.com', '34677803434', 'Calle Manzanilla nº11, Palomares del Río, Sevilla');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Cliente_Paquete`
--

CREATE TABLE `Cliente_Paquete` (
  `dni_cliente` varchar(10) NOT NULL,
  `id_paquete` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Relación NM Cliente_Paquete';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Paquete`
--

CREATE TABLE `Paquete` (
  `id` int NOT NULL COMMENT 'id paquete autoincrementado',
  `tipopaquete` varchar(10) NOT NULL COMMENT '{aventura, relax, cultura, romántico, familiar } ',
  `tipoalojamiento` varchar(20) NOT NULL COMMENT '{hotel 5 estrellas, hotel 4 estrellas, hostal, apartamento, camping } ',
  `fechainicio` datetime NOT NULL,
  `fechafin` datetime NOT NULL,
  `transporte` varchar(10) NOT NULL COMMENT '{ aéreo, terrestre, maritimo }',
  `viaje_id` int NOT NULL COMMENT 'fk_paquete_viaje'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='1:N entre viaje y paquete, N:M entre paquete y cliente';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Viaje`
--

CREATE TABLE `Viaje` (
  `id` int NOT NULL COMMENT 'id viaje autoincrementable',
  `origen` varchar(100) NOT NULL COMMENT 'origen viaje',
  `destino` varchar(100) NOT NULL COMMENT 'destino viaje',
  `fechainicio` datetime NOT NULL,
  `fechafin` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='1N entre viaje y paquete';

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Cliente`
--
ALTER TABLE `Cliente`
  ADD PRIMARY KEY (`dni`);

--
-- Indices de la tabla `Cliente_Paquete`
--
ALTER TABLE `Cliente_Paquete`
  ADD PRIMARY KEY (`dni_cliente`,`id_paquete`),
  ADD KEY `FK_PAQUETE` (`id_paquete`);

--
-- Indices de la tabla `Paquete`
--
ALTER TABLE `Paquete`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_PAQUETE_VIAJE` (`viaje_id`);

--
-- Indices de la tabla `Viaje`
--
ALTER TABLE `Viaje`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Paquete`
--
ALTER TABLE `Paquete`
  MODIFY `id` int NOT NULL AUTO_INCREMENT COMMENT 'id paquete autoincrementado';

--
-- AUTO_INCREMENT de la tabla `Viaje`
--
ALTER TABLE `Viaje`
  MODIFY `id` int NOT NULL AUTO_INCREMENT COMMENT 'id viaje autoincrementable';

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Cliente_Paquete`
--
ALTER TABLE `Cliente_Paquete`
  ADD CONSTRAINT `FK_CLIENTE` FOREIGN KEY (`dni_cliente`) REFERENCES `Cliente` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_PAQUETE` FOREIGN KEY (`id_paquete`) REFERENCES `Paquete` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `Paquete`
--
ALTER TABLE `Paquete`
  ADD CONSTRAINT `FK_PAQUETE_VIAJE` FOREIGN KEY (`viaje_id`) REFERENCES `Viaje` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

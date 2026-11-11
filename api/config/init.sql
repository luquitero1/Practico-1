SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS biblioteca_db
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE biblioteca_db;

CREATE TABLE IF NOT EXISTS `rol` (
    `id_rol`     INT AUTO_INCREMENT PRIMARY KEY,
    `nombre_rol` VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS `categoria` (
    `id_categoria`     INT AUTO_INCREMENT PRIMARY KEY,
    `nombre_categoria` VARCHAR(60) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS `editorial` (
    `id_editorial`     INT AUTO_INCREMENT PRIMARY KEY,
    `nombre_editorial` VARCHAR(100) NOT NULL,
    `pais`             VARCHAR(60) NULL
);

CREATE TABLE IF NOT EXISTS `autor` (
    `id_autor`     INT AUTO_INCREMENT PRIMARY KEY,
    `nombre_autor` VARCHAR(100) NOT NULL,
    `nacionalidad` VARCHAR(60) NULL
);

CREATE TABLE IF NOT EXISTS `usuario` (
    `id_usuario`     INT AUTO_INCREMENT PRIMARY KEY,
    `nombre_usuario` VARCHAR(80) NOT NULL,
    `email`          VARCHAR(100) NOT NULL UNIQUE,
    `password`       VARCHAR(255) NOT NULL,
    `activo`         BOOLEAN NOT NULL DEFAULT TRUE,
    `creado`         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `id_rol`         INT NOT NULL,
    CONSTRAINT `fk_usuario_rol`
        FOREIGN KEY (`id_rol`) REFERENCES `rol`(`id_rol`)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `libro` (
    `id_libro`         INT AUTO_INCREMENT PRIMARY KEY,
    `titulo`           VARCHAR(150) NOT NULL,
    `descripcion`      TEXT NULL,
    `tipo`             ENUM('Book', 'Light novel', 'Magazine', 'Audiobook') NOT NULL DEFAULT 'Book',
    `imagen`           VARCHAR(255) NULL,
    `anio_publicacion` SMALLINT NULL,
    `id_categoria`     INT NOT NULL,
    `id_editorial`     INT NULL,
    CONSTRAINT `fk_libro_categoria`
        FOREIGN KEY (`id_categoria`) REFERENCES `categoria`(`id_categoria`)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_libro_editorial`
        FOREIGN KEY (`id_editorial`) REFERENCES `editorial`(`id_editorial`)
        ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `libro_autor` (
    `id_libro` INT NOT NULL,
    `id_autor` INT NOT NULL,
    PRIMARY KEY (`id_libro`, `id_autor`),
    CONSTRAINT `fk_libroautor_libro`
        FOREIGN KEY (`id_libro`) REFERENCES `libro`(`id_libro`)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_libroautor_autor`
        FOREIGN KEY (`id_autor`) REFERENCES `autor`(`id_autor`)
        ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT IGNORE INTO `rol` (`id_rol`, `nombre_rol`) VALUES
    (1, 'Administrador'),
    (2, 'Usuario');

-- admin@ebook.com / admin1234
-- user@ebook.com  / user1234
INSERT IGNORE INTO `usuario` (`id_usuario`, `nombre_usuario`, `email`, `password`, `id_rol`) VALUES
    (1, 'Admin E-Book', 'admin@ebook.com', '$2y$12$yNGCRCpjBovdOMmDjo8aaOQax9ESE9RmQBkt9PpvkOqTtv/D4nEOi', 1),
    (2, 'Usuario Demo', 'user@ebook.com',  '$2y$12$Jq3ZHU8F0OqbQNCNAM/VlO4ViqyzBI/ssZd087rhu.qJNG67P5YDy', 2);

INSERT IGNORE INTO `categoria` (`id_categoria`, `nombre_categoria`) VALUES
    (1, 'Novel'),
    (2, 'Short stories'),
    (3, 'Fantasy');

INSERT IGNORE INTO `editorial` (`id_editorial`, `nombre_editorial`, `pais`) VALUES
    (1, 'Editorial Sudamericana', 'Argentina'),
    (2, 'Sociedad Cooperativa Editorial Limitada', 'Argentina'),
    (3, 'Media Factory', 'Japan');

INSERT IGNORE INTO `autor` (`id_autor`, `nombre_autor`, `nacionalidad`) VALUES
    (1, 'Gabriel García Márquez', 'Colombian'),
    (2, 'Horacio Quiroga', 'Uruguayan'),
    (3, 'Tappei Nagatsuki', 'Japanese');

INSERT IGNORE INTO `libro` (`id_libro`, `titulo`, `descripcion`, `tipo`, `imagen`, `anio_publicacion`, `id_categoria`, `id_editorial`) VALUES
    (1, 'One Hundred Years of Solitude',
        'One Hundred Years of Solitude is an epic story of seven generations of the Buendía family spanning one hundred years of turbulent Latin American history, from the post-colonial era of 1820 to that of 1920. The patriarch José Arcadio Buendía founds the utopian city of Macondo in the middle of a swamp.',
        'Book', 'cien-años.webp', 1967, 1, 1),
    (2, 'Cuentos de amor de locura y de muerte',
        'A collection of short stories by Horacio Quiroga.',
        'Book', 'amor-locura-muerte.jpg', 1917, 2, 2),
    (3, 'Re: Starting Life in Another World from Zero',
        'First volume of the light novel series by Tappei Nagatsuki.',
        'Light novel', 're-zero-volume-1.webp', 2014, 3, 3);

INSERT IGNORE INTO `libro_autor` (`id_libro`, `id_autor`) VALUES
    (1, 1),
    (2, 2),
    (3, 3);

DROP DATABASE IF EXISTS `tiendaDeVinos`;

CREATE SCHEMA IF NOT EXISTS `tiendaDeVinos` DEFAULT CHARACTER SET utf8 COLLATE=utf8_general_ci;
USE `tiendaDeVinos` ;


CREATE TABLE IF NOT EXISTS `tiendaDeVinos`.`Marca` (
  `id_marca` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id_marca`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8 COLLATE=utf8_general_ci;


CREATE TABLE IF NOT EXISTS `tiendaDeVinos`.`Categoria` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `desc` TEXT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8 COLLATE=utf8_general_ci;


CREATE TABLE IF NOT EXISTS `tiendaDeVinos`.`Producto` (
  `id_producto` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `stock` INT NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `discount` INT NULL DEFAULT NULL,
  `image` VARCHAR(255),
  `is_active` TINYINT(1) NULL,
  `id_categoria` INT NOT NULL,
  `id_marca` INT NOT NULL,
  PRIMARY KEY (`id_producto`, `id_categoria`, `id_marca`),
  INDEX `fk_Producto_Categoria1_idx` (`id_categoria` ASC),
  INDEX `fk_Producto_Marca1_idx` (`id_marca` ASC),
  CONSTRAINT `fk_Producto_Categoria1`
    FOREIGN KEY (`id_categoria`)
    REFERENCES `tiendaDeVinos`.`Categoria` (`id_categoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Producto_Marca1`
    FOREIGN KEY (`id_marca`)
    REFERENCES `tiendaDeVinos`.`Marca` (`id_marca`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8 COLLATE=utf8_general_ci;


CREATE TABLE IF NOT EXISTS `tiendaDeVinos`.`Usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `direccion` VARCHAR(255) ,
  `ciudad` VARCHAR(255) ,
  `codigoPostal` VARCHAR(255) ,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tipo` VARCHAR(255),
  `admin` TINYINT(1) NOT NULL DEFAULT '0',
  `is_active` TINYINT(1) NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8 COLLATE=utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tiendaDeVinos`.`Carrito` (
  `id_carrito` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_carrito`, `id_usuario`),
  INDEX `fk_Carrito_Usuario1_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_Carrito_Usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `tiendaDeVinos`.`Usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8 COLLATE=utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tiendaDeVinos`.`ItemCarrito` (
  `id_item` INT NOT NULL AUTO_INCREMENT,
  `id_carrito` INT NOT NULL,
  `id_producto` INT NOT NULL,
  `cantidad` INT,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_item`, `id_carrito`, `id_producto`),
  INDEX `fk_Item_Carrito1_idx` (`id_carrito` ASC),
  INDEX `fk_Item_Producto1_idx` (`id_producto` ASC),
  CONSTRAINT `fk_Item_Carrito1`
    FOREIGN KEY (`id_carrito`)
    REFERENCES `tiendaDeVinos`.`Carrito` (`id_carrito`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Item_Producto1`
    FOREIGN KEY (`id_producto`)
    REFERENCES `tiendaDeVinos`.`Producto` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8 COLLATE=utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tiendaDeVinos`.`Orden` (
  `id_orden` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_orden`, `id_usuario`),
  INDEX `fk_Orden_Usuario1_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_Item_Usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `tiendaDeVinos`.`Usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8 COLLATE=utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tiendaDeVinos`.`ItemOrden` (
  `id_item` INT NOT NULL AUTO_INCREMENT,
  `id_orden` INT NOT NULL,
  `cantidad` INT,
  `precioUnitario` DECIMAL(10, 2),
  `descuento` DECIMAL(10, 2),
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_item`, `id_orden`),
  INDEX `fk_Item_Orden1_idx` (`id_orden` ASC),
  CONSTRAINT `fk_Item_Orden1`
    FOREIGN KEY (`id_orden`)
    REFERENCES `tiendaDeVinos`.`Orden` (`id_orden`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8 COLLATE=utf8_general_ci;
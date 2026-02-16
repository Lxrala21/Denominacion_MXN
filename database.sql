-- ================================================
-- Base de Datos: Control de Denominaciones MXN
-- Version: 2.0.0 con MySQL
-- Autor: Lxrala21
-- ================================================

-- Crear base de datos
DROP DATABASE IF EXISTS denominaciones_db;
CREATE DATABASE denominaciones_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE denominaciones_db;

-- ================================================
-- Tabla: calculos
-- Descripción: Registros principales de cada cálculo
-- ================================================
CREATE TABLE calculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_proyecto DECIMAL(10,2) DEFAULT 0.00,
    total_nomina DECIMAL(10,2) DEFAULT 0.00,
    total_general DECIMAL(10,2) NOT NULL,
    usuario VARCHAR(50) DEFAULT 'admin',
    notas TEXT,
    INDEX idx_fecha (fecha_hora),
    INDEX idx_usuario (usuario)
) ENGINE=InnoDB;

-- ================================================
-- Tabla: subareas
-- Descripción: Desglose de montos por subárea
-- ================================================
CREATE TABLE subareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    calculo_id INT NOT NULL,
    area ENUM('proyecto', 'nomina') NOT NULL,
    subarea VARCHAR(100) NOT NULL,
    monto DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (calculo_id) REFERENCES calculos(id) ON DELETE CASCADE,
    INDEX idx_calculo (calculo_id),
    INDEX idx_area (area)
) ENGINE=InnoDB;

-- ================================================
-- Tabla: denominaciones
-- Descripción: Billetes y monedas por cálculo
-- ================================================
CREATE TABLE denominaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    calculo_id INT NOT NULL,
    area ENUM('proyecto', 'nomina', 'total') NOT NULL,
    denominacion INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 0,
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (calculo_id) REFERENCES calculos(id) ON DELETE CASCADE,
    INDEX idx_calculo (calculo_id),
    INDEX idx_area (area),
    INDEX idx_denominacion (denominacion)
) ENGINE=InnoDB;

-- ================================================
-- Datos de prueba (opcional)
-- ================================================
INSERT INTO calculos (total_proyecto, total_nomina, total_general, notas)
VALUES (25000.00, 18000.00, 43000.00, 'Cálculo de prueba inicial');

SET @ultimo_id = LAST_INSERT_ID();

-- Subareas Proyecto
INSERT INTO subareas (calculo_id, area, subarea, monto) VALUES
(@ultimo_id, 'proyecto', 'nomina-proyecto', 20000.00),
(@ultimo_id, 'proyecto', 'tiempo-extra-proyecto', 5000.00);

-- Subareas Nómina
INSERT INTO subareas (calculo_id, area, subarea, monto) VALUES
(@ultimo_id, 'nomina', 'nomina', 15000.00),
(@ultimo_id, 'nomina', 'personal-temporal', 3000.00);

-- Denominaciones Proyecto
INSERT INTO denominaciones (calculo_id, area, denominacion, cantidad, subtotal) VALUES
(@ultimo_id, 'proyecto', 1000, 25, 25000.00);

-- Denominaciones Nómina
INSERT INTO denominaciones (calculo_id, area, denominacion, cantidad, subtotal) VALUES
(@ultimo_id, 'nomina', 1000, 18, 18000.00);

-- Denominaciones Total
INSERT INTO denominaciones (calculo_id, area, denominacion, cantidad, subtotal) VALUES
(@ultimo_id, 'total', 1000, 43, 43000.00);

-- ================================================
-- Vistas útiles
-- ================================================

-- Vista: Resumen de cálculos con conteo de subareas
CREATE VIEW vista_calculos_resumen AS
SELECT
    c.id,
    c.fecha_hora,
    c.total_proyecto,
    c.total_nomina,
    c.total_general,
    c.usuario,
    COUNT(DISTINCT s.id) as total_subareas,
    COUNT(DISTINCT d.id) as total_denominaciones
FROM calculos c
LEFT JOIN subareas s ON c.id = s.calculo_id
LEFT JOIN denominaciones d ON c.id = d.calculo_id
GROUP BY c.id
ORDER BY c.fecha_hora DESC;

-- ================================================
-- Procedimientos almacenados
-- ================================================

DELIMITER //

-- Procedimiento: Obtener cálculo completo por ID
CREATE PROCEDURE sp_obtener_calculo(IN p_calculo_id INT)
BEGIN
    -- Información principal
    SELECT * FROM calculos WHERE id = p_calculo_id;

    -- Subareas
    SELECT * FROM subareas WHERE calculo_id = p_calculo_id ORDER BY area, subarea;

    -- Denominaciones
    SELECT * FROM denominaciones WHERE calculo_id = p_calculo_id ORDER BY area, denominacion DESC;
END //

-- Procedimiento: Eliminar cálculo (CASCADE automático)
CREATE PROCEDURE sp_eliminar_calculo(IN p_calculo_id INT)
BEGIN
    DELETE FROM calculos WHERE id = p_calculo_id;
    SELECT ROW_COUNT() as filas_eliminadas;
END //

DELIMITER ;

-- ================================================
-- Consultas útiles para debug
-- ================================================

-- Ver todos los cálculos con resumen
-- SELECT * FROM vista_calculos_resumen;

-- Ver cálculo específico completo
-- CALL sp_obtener_calculo(1);

-- Ver totales por área
-- SELECT area, SUM(monto) as total FROM subareas GROUP BY area;

-- Ver denominaciones más usadas
-- SELECT denominacion, SUM(cantidad) as total_piezas, SUM(subtotal) as total_monto
-- FROM denominaciones WHERE area = 'total' GROUP BY denominacion ORDER BY denominacion DESC;

-- ================================================
-- Información de la base de datos
-- ================================================
SELECT
    'Base de datos creada exitosamente' as mensaje,
    DATABASE() as base_datos,
    NOW() as fecha_creacion;

-- Mostrar tablas creadas
SHOW TABLES;

-- Mostrar registro de prueba
SELECT
    c.id,
    c.fecha_hora,
    c.total_general,
    COUNT(s.id) as subareas,
    COUNT(d.id) as denominaciones
FROM calculos c
LEFT JOIN subareas s ON c.id = s.calculo_id
LEFT JOIN denominaciones d ON c.id = d.calculo_id
GROUP BY c.id;

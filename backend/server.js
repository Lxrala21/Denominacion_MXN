/**
 * API Backend - Control de Denominaciones MXN
 * Version: 2.0.0
 * Autor: Lxrala21
 */

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3002;

// ================================================
// MIDDLEWARE
// ================================================

app.use(cors());
app.use(express.json());
app.use(express.static('../')); // Servir archivos estáticos

// ================================================
// CONEXIÓN A MySQL
// ================================================

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'controlpallets2026',
    database: 'denominaciones_db'
});

db.connect((err) => {
    if (err) {
        console.error('❌ Error conectando a MySQL:', err.message);
        process.exit(1);
    }
    console.log('✅ Conectado a MySQL - denominaciones_db');
});

// ================================================
// RUTAS API
// ================================================

// Health Check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        database: 'denominaciones_db',
        port: PORT
    });
});

// ================================================
// CALCULOS
// ================================================

/**
 * GET /api/calculos
 * Obtener todos los cálculos (historial)
 */
app.get('/api/calculos', (req, res) => {
    const query = `
        SELECT
            c.id,
            c.fecha_hora,
            c.total_proyecto,
            c.total_nomina,
            c.total_general,
            c.usuario,
            c.notas
        FROM calculos c
        ORDER BY c.fecha_hora DESC
        LIMIT 100
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error obteniendo cálculos:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

/**
 * GET /api/calculos/:id
 * Obtener un cálculo específico con todos sus detalles
 */
app.get('/api/calculos/:id', (req, res) => {
    const calculoId = req.params.id;

    // Obtener información principal
    const queryCalculo = 'SELECT * FROM calculos WHERE id = ?';

    db.query(queryCalculo, [calculoId], (err, calculos) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (calculos.length === 0) {
            return res.status(404).json({ error: 'Cálculo no encontrado' });
        }

        const calculo = calculos[0];

        // Obtener subareas
        const querySubareas = 'SELECT * FROM subareas WHERE calculo_id = ? ORDER BY area, subarea';

        db.query(querySubareas, [calculoId], (err, subareas) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Obtener denominaciones
            const queryDenominaciones = `
                SELECT * FROM denominaciones
                WHERE calculo_id = ?
                ORDER BY area, denominacion DESC
            `;

            db.query(queryDenominaciones, [calculoId], (err, denominaciones) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                // Organizar datos
                const datosProyecto = {};
                const datosNomina = {};

                subareas.forEach(s => {
                    if (s.area === 'proyecto') {
                        datosProyecto[s.subarea] = parseFloat(s.monto);
                    } else {
                        datosNomina[s.subarea] = parseFloat(s.monto);
                    }
                });

                // Organizar denominaciones por área
                const denomProyecto = { denominations: {} };
                const denomNomina = { denominations: {} };

                denominaciones.forEach(d => {
                    const denom = {
                        [d.denominacion]: d.cantidad
                    };

                    if (d.area === 'proyecto') {
                        denomProyecto.denominations = { ...denomProyecto.denominations, ...denom };
                        denomProyecto.total = parseFloat(calculo.total_proyecto);
                    } else if (d.area === 'nomina') {
                        denomNomina.denominations = { ...denomNomina.denominations, ...denom };
                        denomNomina.total = parseFloat(calculo.total_nomina);
                    }
                });

                // Respuesta completa
                res.json({
                    id: calculo.id,
                    fecha: calculo.fecha_hora,
                    totalProyecto: parseFloat(calculo.total_proyecto),
                    totalNomina: parseFloat(calculo.total_nomina),
                    totalGeneral: parseFloat(calculo.total_general),
                    datosProyecto,
                    datosNomina,
                    denominacionesProyecto: Object.keys(denomProyecto.denominations).length > 0 ? denomProyecto : null,
                    denominacionesNomina: Object.keys(denomNomina.denominations).length > 0 ? denomNomina : null
                });
            });
        });
    });
});

/**
 * POST /api/calculos
 * Guardar un nuevo cálculo
 */
app.post('/api/calculos', (req, res) => {
    const {
        totalProyecto,
        totalNomina,
        totalGeneral,
        datosProyecto,
        datosNomina,
        denominacionesProyecto,
        denominacionesNomina
    } = req.body;

    // Validación
    if (!totalGeneral || totalGeneral <= 0) {
        return res.status(400).json({ error: 'Total general inválido' });
    }

    // Insertar cálculo principal
    const queryCalculo = `
        INSERT INTO calculos (total_proyecto, total_nomina, total_general)
        VALUES (?, ?, ?)
    `;

    db.query(queryCalculo, [totalProyecto, totalNomina, totalGeneral], (err, result) => {
        if (err) {
            console.error('Error insertando cálculo:', err);
            return res.status(500).json({ error: err.message });
        }

        const calculoId = result.insertId;

        // Insertar subareas
        const subareasValues = [];

        if (datosProyecto) {
            Object.entries(datosProyecto).forEach(([subarea, monto]) => {
                if (monto > 0) {
                    subareasValues.push([calculoId, 'proyecto', subarea, monto]);
                }
            });
        }

        if (datosNomina) {
            Object.entries(datosNomina).forEach(([subarea, monto]) => {
                if (monto > 0) {
                    subareasValues.push([calculoId, 'nomina', subarea, monto]);
                }
            });
        }

        if (subareasValues.length > 0) {
            const querySubareas = 'INSERT INTO subareas (calculo_id, area, subarea, monto) VALUES ?';

            db.query(querySubareas, [subareasValues], (err) => {
                if (err) {
                    console.error('Error insertando subareas:', err);
                }
            });
        }

        // Insertar denominaciones
        const denomValues = [];

        if (denominacionesProyecto && denominacionesProyecto.denominations) {
            Object.entries(denominacionesProyecto.denominations).forEach(([denom, cantidad]) => {
                if (cantidad > 0) {
                    const subtotal = parseInt(denom) * cantidad;
                    denomValues.push([calculoId, 'proyecto', denom, cantidad, subtotal]);
                }
            });
        }

        if (denominacionesNomina && denominacionesNomina.denominations) {
            Object.entries(denominacionesNomina.denominations).forEach(([denom, cantidad]) => {
                if (cantidad > 0) {
                    const subtotal = parseInt(denom) * cantidad;
                    denomValues.push([calculoId, 'nomina', denom, cantidad, subtotal]);
                }
            });
        }

        // Calcular denominaciones totales
        const totalDenoms = {};
        [...(denominacionesProyecto?.denominations ? Object.entries(denominacionesProyecto.denominations) : []),
         ...(denominacionesNomina?.denominations ? Object.entries(denominacionesNomina.denominations) : [])]
            .forEach(([denom, cantidad]) => {
                totalDenoms[denom] = (totalDenoms[denom] || 0) + cantidad;
            });

        Object.entries(totalDenoms).forEach(([denom, cantidad]) => {
            const subtotal = parseInt(denom) * cantidad;
            denomValues.push([calculoId, 'total', denom, cantidad, subtotal]);
        });

        if (denomValues.length > 0) {
            const queryDenom = 'INSERT INTO denominaciones (calculo_id, area, denominacion, cantidad, subtotal) VALUES ?';

            db.query(queryDenom, [denomValues], (err) => {
                if (err) {
                    console.error('Error insertando denominaciones:', err);
                }
            });
        }

        res.json({
            success: true,
            id: calculoId,
            message: 'Cálculo guardado exitosamente'
        });
    });
});

/**
 * DELETE /api/calculos/:id
 * Eliminar un cálculo
 */
app.delete('/api/calculos/:id', (req, res) => {
    const calculoId = req.params.id;

    const query = 'DELETE FROM calculos WHERE id = ?';

    db.query(query, [calculoId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cálculo no encontrado' });
        }

        res.json({
            success: true,
            message: 'Cálculo eliminado exitosamente'
        });
    });
});

/**
 * DELETE /api/calculos
 * Limpiar todo el historial
 */
app.delete('/api/calculos', (req, res) => {
    const query = 'DELETE FROM calculos';

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({
            success: true,
            deletedCount: result.affectedRows,
            message: 'Historial limpiado exitosamente'
        });
    });
});

// ================================================
// ESTADÍSTICAS
// ================================================

/**
 * GET /api/estadisticas
 * Obtener estadísticas generales
 */
app.get('/api/estadisticas', (req, res) => {
    const queries = {
        totalCalculos: 'SELECT COUNT(*) as total FROM calculos',
        sumaTotal: 'SELECT SUM(total_general) as suma FROM calculos',
        promedioProyecto: 'SELECT AVG(total_proyecto) as promedio FROM calculos WHERE total_proyecto > 0',
        promedioNomina: 'SELECT AVG(total_nomina) as promedio FROM calculos WHERE total_nomina > 0'
    };

    const stats = {};

    Promise.all([
        new Promise((resolve, reject) => {
            db.query(queries.totalCalculos, (err, results) => {
                if (err) reject(err);
                else resolve({ totalCalculos: results[0].total });
            });
        }),
        new Promise((resolve, reject) => {
            db.query(queries.sumaTotal, (err, results) => {
                if (err) reject(err);
                else resolve({ sumaTotal: parseFloat(results[0].suma || 0) });
            });
        }),
        new Promise((resolve, reject) => {
            db.query(queries.promedioProyecto, (err, results) => {
                if (err) reject(err);
                else resolve({ promedioProyecto: parseFloat(results[0].promedio || 0) });
            });
        }),
        new Promise((resolve, reject) => {
            db.query(queries.promedioNomina, (err, results) => {
                if (err) reject(err);
                else resolve({ promedioNomina: parseFloat(results[0].promedio || 0) });
            });
        })
    ])
    .then(results => {
        results.forEach(result => Object.assign(stats, result));
        res.json(stats);
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
});

// ================================================
// SERVIDOR
// ================================================

app.listen(PORT, () => {
    console.log('');
    console.log('='.repeat(50));
    console.log('🚀 Servidor API - Control de Denominaciones MXN');
    console.log('='.repeat(50));
    console.log(`📡 API corriendo en: http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`💾 Base de datos: denominaciones_db`);
    console.log('='.repeat(50));
    console.log('');
});

// Manejo de errores
process.on('uncaughtException', (err) => {
    console.error('❌ Error no capturado:', err);
});

process.on('SIGINT', () => {
    console.log('\n👋 Cerrando servidor...');
    db.end();
    process.exit(0);
});

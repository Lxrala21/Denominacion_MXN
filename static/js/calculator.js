/**
 * calculator.js
 * Algoritmo de cálculo de denominaciones MXN
 */

const DENOMINATIONS = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];

/**
 * Calcula las denominaciones necesarias para un monto dado
 * Usa algoritmo greedy (mayor denominación primero)
 * @param {number} amount - Monto a calcular
 * @returns {object} Resultado con denominaciones, total y verificación
 */
function calculateDenominations(amount) {
    const result = {};

    // Convertir a centavos para evitar errores de punto flotante
    let cents = Math.round(amount * 100);

    for (const denom of DENOMINATIONS) {
        const denomCents = denom * 100;
        const count = Math.floor(cents / denomCents);
        result[denom] = count;
        cents -= count * denomCents;
    }

    return {
        denominations: result,
        total: amount,
        verified: Math.abs(cents) < 1  // cents debe ser 0
    };
}

/**
 * Suma las denominaciones de múltiples entradas
 * @param {Array} entries - Array de entradas con denominaciones
 * @returns {object} Totales por denominación
 */
function sumDenominations(entries) {
    const totals = {};

    // Inicializar totales en 0
    DENOMINATIONS.forEach(denom => {
        totals[denom] = 0;
    });

    // Sumar cada entrada
    entries.forEach(entry => {
        const denoms = entry.denominations || {};
        DENOMINATIONS.forEach(denom => {
            totals[denom] += denoms[denom] || 0;
        });
    });

    return totals;
}

/**
 * Calcula el total consolidado de todas las hojas
 * @param {object} sheets - Objeto con todas las hojas
 * @returns {object} Totales consolidados y gran total
 */
function calculateControlTotals(sheets) {
    const controlTotals = {};
    let grandTotal = 0;

    // Inicializar totales en 0
    DENOMINATIONS.forEach(denom => {
        controlTotals[denom] = 0;
    });

    // Sumar denominaciones de todas las hojas
    Object.values(sheets).forEach(sheet => {
        const totals = sheet.totals || {};
        DENOMINATIONS.forEach(denom => {
            controlTotals[denom] += totals[denom] || 0;
            grandTotal += (totals[denom] || 0) * denom;
        });
    });

    return {
        totals: controlTotals,
        grandTotal: grandTotal
    };
}

/**
 * Valida que un monto sea válido
 * @param {number} amount - Monto a validar
 * @returns {boolean} True si es válido
 */
function isValidAmount(amount) {
    return !isNaN(amount) && amount > 0 && amount <= 999999;
}

/**
 * Formatea un número como moneda MXN
 * @param {number} amount - Cantidad a formatear
 * @returns {string} Cantidad formateada
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(amount);
}

/**
 * Genera un UUID simple para IDs
 * @returns {string} UUID
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

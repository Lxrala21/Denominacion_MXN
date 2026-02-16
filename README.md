# 💰 Control de Denominaciones MXN

Sistema web minimalista para calcular y controlar la distribución de efectivo por áreas, con cálculo automático de denominaciones (billetes y monedas) e historial completo.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![HTML](https://img.shields.io/badge/HTML-5-orange)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![CSS](https://img.shields.io/badge/CSS-3-blue)

---

## ✨ Características

### 💵 **Control por Áreas**
- **Área Proyecto**: Nómina Proyecto, Tiempo Extra, Bono Proyecto
- **Área Nómina**: Nómina, Tiempo Extra, Bono Nómina, Bono de Recomendación, Personal Temporal, Día Festivo Laborado

### 🧮 **Cálculo Automático**
- Algoritmo greedy optimizado
- Denominaciones MXN: $1000, $500, $200, $100, $50, $20, $10, $5, $2, $1
- Muestra cantidad de piezas por denominación
- Subtotal por denominación (piezas × valor)
- Total general consolidado

### 📅 **Historial Completo**
- Guarda fecha y hora de cada cálculo
- Almacena montos por área y subárea
- Registra denominaciones exactas utilizadas
- Ver detalle expandible
- Eliminar registros individuales
- Exportar historial (próximamente)

### 🎨 **Diseño Minimalista Oscuro**
- Tema oscuro profesional
- Colores neutros y elegantes
- 100% responsive (móvil, tablet, desktop)
- Tipografía limpia del sistema
- Transiciones suaves

### 💾 **Persistencia Local**
- Datos guardados en localStorage del navegador
- No requiere servidor ni base de datos
- Historial persiste entre sesiones

---

## 🚀 Instalación

### **Opción 1: Uso Directo (Recomendado)**

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Lxrala21/Denominacion_MXN.git
   cd Denominacion_MXN
   ```

2. **Abrir el archivo HTML**
   - Doble clic en `control_denominaciones.html`
   - O abrir con tu navegador favorito

**¡Listo! No requiere instalación ni dependencias.**

### **Opción 2: Servidor Local (Opcional)**

Si prefieres usar un servidor local:

```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx http-server

# Abrir: http://localhost:8000/control_denominaciones.html
```

---

## 📖 Uso

### 1️⃣ **Ingresar Cantidades**

1. Escribe las cantidades en cada subárea
2. Formato automático al salir del campo ($1,000.00)
3. Totales se actualizan en tiempo real

**Ejemplo:**
```
📊 Proyecto
  Nómina Proyecto: 25000
  Tiempo Extra: 5000
  → Total: $30,000.00

👥 Nómina
  Nómina: 15000
  Personal Temporal: 3000
  → Total: $18,000.00

💵 Total General: $48,000.00
```

### 2️⃣ **Calcular Denominaciones**

1. Clic en **"🧮 Calcular Denominaciones"**
2. Aparecen las denominaciones por área:

```
📊 Proyecto - $30,000.00
💵 $1,000    30 piezas    $30,000.00
💵 $500       0 piezas    $0.00
...

👥 Nómina - $18,000.00
💵 $1,000    18 piezas    $18,000.00
...

🎯 TOTAL GENERAL - $48,000.00
💵 $1,000    48 piezas    $48,000.00
```

### 3️⃣ **Guardar en Historial**

1. Clic en **"💾 Guardar en Historial"**
2. El registro aparece abajo con:
   - Fecha y hora
   - Totales por área
   - Denominaciones utilizadas

### 4️⃣ **Consultar Historial**

- **Ver detalle**: Clic en "👁️ Ver Detalle"
  - Muestra subáreas
  - Muestra denominaciones exactas
  - Total por área y general

- **Eliminar registro**: Clic en "🗑️ Eliminar"

- **Limpiar todo**: Clic en "🗑️ Limpiar Todo" (confirmación requerida)

---

## 🏗️ Estructura del Proyecto

```
Denominacion_MXN/
├── control_denominaciones.html    # Archivo principal (abrir este)
├── dark-minimal-theme.css         # Tema oscuro reutilizable
├── DARK-THEME-GUIDE.md           # Guía del tema
├── README.md                      # Este archivo
├── .gitignore                     # Git ignore
└── static/
    └── js/
        └── calculator.js          # Algoritmo de cálculo
```

---

## 🧮 Algoritmo de Cálculo

Usa algoritmo **greedy** (codicioso):

```javascript
Monto: $2,478
1. $1,000 × 2 = $2,000 (resta: $478)
2. $200  × 2 = $400   (resta: $78)
3. $50   × 1 = $50    (resta: $28)
4. $20   × 1 = $20    (resta: $8)
5. $5    × 1 = $5     (resta: $3)
6. $2    × 1 = $2     (resta: $1)
7. $1    × 1 = $1     (resta: $0)

Total: $2,478 ✓ Verificado
```

---

## 🎨 Tema Oscuro Minimalista

### Paleta de Colores

| Elemento | Color | Uso |
|----------|-------|-----|
| Fondo | `#0a0a0a` | Background principal |
| Contenedores | `#1a1a1a` | Cards, inputs |
| Secciones | `#1f1f1f` | Áreas destacadas |
| Bordes | `#2a2a2a` | Bordes sutiles |
| Texto primario | `#ffffff` | Títulos, texto importante |
| Texto secundario | `#b0b0b0` | Labels, descripciones |

### Reutilizar el Tema

El tema está disponible en `dark-minimal-theme.css` para usar en otros proyectos.

**Ver guía completa:** [DARK-THEME-GUIDE.md](DARK-THEME-GUIDE.md)

---

## 💾 Almacenamiento

Los datos se guardan en **localStorage** del navegador:

- **Clave**: `historial_denominaciones`
- **Formato**: JSON array
- **Límite**: ~5-10 MB (navegador dependiente)
- **Persistencia**: Permanente hasta que se limpie

### Estructura de Datos

```json
{
  "id": 1708089600000,
  "fecha": "2026-02-16T10:30:00.000Z",
  "totalProyecto": 30000,
  "totalNomina": 18000,
  "totalGeneral": 48000,
  "datosProyecto": {
    "nomina-proyecto": 25000,
    "tiempo-extra-proyecto": 5000,
    "bono-proyecto": 0
  },
  "datosNomina": { ... },
  "denominacionesProyecto": {
    "denominations": {
      "1000": 30,
      "500": 0,
      ...
    },
    "total": 30000,
    "verified": true
  },
  "denominacionesNomina": { ... }
}
```

---

## 🔧 Características Técnicas

### Funcionalidades

- ✅ Inputs con formato de moneda automático
- ✅ Validación de entrada (solo números)
- ✅ Cálculo en tiempo real
- ✅ Todas las denominaciones visibles (incluso 0)
- ✅ Historial con fecha/hora/denominaciones
- ✅ LocalStorage para persistencia
- ✅ 100% responsive
- ✅ Sin dependencias externas

### Compatibilidad

| Navegador | Versión Mínima |
|-----------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

**Dispositivos:**
- ✅ Desktop (Windows, macOS, Linux)
- ✅ Tablet (iPad, Android)
- ✅ Móvil (iPhone, Android)

---

## 🛠️ Desarrollo

### Modificar el Proyecto

1. **Editar HTML/CSS/JS directamente**
   - `control_denominaciones.html` contiene todo
   - O usar `dark-minimal-theme.css` como base

2. **Probar cambios**
   - Refrescar el navegador (F5)
   - Abrir consola (F12) para debug

3. **Limpiar localStorage (si es necesario)**
   ```javascript
   localStorage.clear()
   ```

### Agregar Nuevas Áreas

1. Agregar HTML para la nueva área
2. Agregar inputs al array correspondiente
3. Actualizar funciones de cálculo

---

## 📱 Casos de Uso

### ✅ **Control de Nómina**
Calcular y registrar distribución de efectivo semanal/quincenal

### ✅ **Auditoría**
Revisar historial de distribuciones pasadas

### ✅ **Planeación**
Saber con anticipación qué denominaciones solicitar al banco

### ✅ **Reportes**
Consultar cuánto se ha distribuido por área/período

---

## 🤝 Contribuir

Si deseas mejorar el sistema:

1. **Fork** del repositorio
2. **Crear rama** para tu feature
3. **Commit** cambios
4. **Push** a tu rama
5. **Pull Request**

**Ideas para contribuir:**
- Exportar historial a CSV/Excel
- Filtros por fecha en historial
- Gráficas de distribución
- Modo de impresión
- Tema claro/oscuro toggle

---

## 📝 Changelog

### v2.0.0 (2026-02-16)
- ✅ Rediseño completo con tema minimalista oscuro
- ✅ Sistema de historial con fechas
- ✅ Guardado de denominaciones en historial
- ✅ Totales por área en tiempo real
- ✅ Ver detalle expandible
- ✅ Formato de moneda automático
- ✅ 100% HTML/JS (eliminada dependencia Flask/Python)
- ✅ Tema reutilizable (dark-minimal-theme.css)

### v1.0.0 (2026-02-13)
- ✅ Implementación inicial con Flask
- ✅ Cálculo básico de denominaciones
- ✅ 9 conceptos de pago

---

## 📄 Licencia

Este proyecto es de uso personal.

## 👨‍💻 Autor

**Lxrala21**
- GitHub: [@Lxrala21](https://github.com/Lxrala21)

---

## 🆘 Soporte

### Problemas Comunes

**No se guardan los datos:**
- Verificar que localStorage esté habilitado
- Abrir consola (F12) y buscar errores

**No aparecen las denominaciones:**
- Verificar que `calculator.js` esté cargando
- Refrescar la página (Ctrl+F5)

**Formato de moneda incorrecto:**
- Limpiar el campo y volver a ingresar
- Presionar Enter para forzar formato

### Debug

Abrir consola del navegador (F12) y ejecutar:

```javascript
// Ver localStorage
console.log(localStorage.getItem('historial_denominaciones'))

// Limpiar localStorage
localStorage.clear()

// Ver último cálculo
console.log(datosActuales)
```

---

**© 2026 Lxrala21** - Control de Denominaciones MXN

# 🔧 Control de Denominaciones MXN - Versión MySQL

Versión con backend MySQL para uso en servidor.

---

## 📋 Requisitos

- ✅ MySQL 8.4+ (ya instalado)
- ✅ Node.js v24.13.0+ (ya instalado)
- ✅ npm (incluido con Node.js)

---

## 🚀 Instalación

### **Paso 1: Ejecutar instalación automática**

Doble clic en:
```
INSTALL-MYSQL.bat
```

Esto hará:
1. Instalar dependencias de Node.js (express, mysql2, cors)
2. Crear base de datos `denominaciones_db`
3. Crear tablas (calculos, subareas, denominaciones)
4. Insertar datos de prueba

### **Paso 2: Iniciar servidor**

Doble clic en:
```
START-SERVER-MYSQL.bat
```

El servidor iniciará en: **http://localhost:3002**

---

## 📁 Archivos Creados

```
Denominacion_MXN/
├── control_denominaciones.html         # Versión LOCAL (localStorage)
├── control_denominaciones_mysql.html   # Versión MySQL (nueva) ⭐
├── database.sql                        # Script de creación de BD
├── INSTALL-MYSQL.bat                   # Instalador automático
├── START-SERVER-MYSQL.bat              # Iniciar servidor
└── backend/
    ├── server.js                       # API REST
    ├── package.json                    # Dependencias
    └── node_modules/                   # Librerías (auto-generado)
```

---

## 🎯 Uso

### **1. Asegúrate que el servidor esté corriendo**
```bash
START-SERVER-MYSQL.bat
```

Deberías ver:
```
==================================================
🚀 Servidor API - Control de Denominaciones MXN
==================================================
📡 API corriendo en: http://localhost:3002
📊 Health check: http://localhost:3002/api/health
💾 Base de datos: denominaciones_db
==================================================
```

### **2. Abrir la aplicación**

Doble clic en:
```
control_denominaciones_mysql.html
```

O abrir con navegador: http://localhost:3002/control_denominaciones_mysql.html

### **3. Usar normalmente**

- Ingresar cantidades
- Calcular denominaciones
- Guardar en historial (ahora se guarda en MySQL)
- Ver historial (datos desde MySQL)

---

## 🔧 API Endpoints

### **Health Check**
```
GET /api/health
```

### **Obtener Historial**
```
GET /api/calculos
```

### **Obtener Cálculo Específico**
```
GET /api/calculos/:id
```

### **Guardar Cálculo**
```
POST /api/calculos
Body: {
  totalProyecto: 25000,
  totalNomina: 18000,
  totalGeneral: 43000,
  datosProyecto: {...},
  datosNomina: {...},
  denominacionesProyecto: {...},
  denominacionesNomina: {...}
}
```

### **Eliminar Cálculo**
```
DELETE /api/calculos/:id
```

### **Limpiar Historial**
```
DELETE /api/calculos
```

### **Estadísticas**
```
GET /api/estadisticas
```

---

## 💾 Base de Datos

### **Tablas**

#### **calculos**
```sql
- id (INT, PRIMARY KEY)
- fecha_hora (DATETIME)
- total_proyecto (DECIMAL)
- total_nomina (DECIMAL)
- total_general (DECIMAL)
- usuario (VARCHAR)
- notas (TEXT)
```

#### **subareas**
```sql
- id (INT, PRIMARY KEY)
- calculo_id (INT, FOREIGN KEY)
- area (ENUM: 'proyecto', 'nomina')
- subarea (VARCHAR)
- monto (DECIMAL)
```

#### **denominaciones**
```sql
- id (INT, PRIMARY KEY)
- calculo_id (INT, FOREIGN KEY)
- area (ENUM: 'proyecto', 'nomina', 'total')
- denominacion (INT)
- cantidad (INT)
- subtotal (DECIMAL)
```

### **Consultas Útiles**

```sql
-- Ver todos los cálculos
SELECT * FROM calculos ORDER BY fecha_hora DESC;

-- Ver cálculo específico con detalles
SELECT
    c.*,
    s.area, s.subarea, s.monto
FROM calculos c
LEFT JOIN subareas s ON c.id = s.calculo_id
WHERE c.id = 1;

-- Ver denominaciones de un cálculo
SELECT * FROM denominaciones WHERE calculo_id = 1 ORDER BY denominacion DESC;

-- Estadísticas
SELECT
    COUNT(*) as total_calculos,
    SUM(total_general) as suma_total,
    AVG(total_general) as promedio
FROM calculos;
```

---

## 🆚 Diferencias: Local vs MySQL

| Característica | Local (localStorage) | MySQL (servidor) |
|----------------|----------------------|------------------|
| **Archivo** | control_denominaciones.html | control_denominaciones_mysql.html |
| **Almacenamiento** | Navegador (localStorage) | MySQL Server |
| **Servidor** | ❌ No requiere | ✅ Requiere backend |
| **Acceso** | Solo local | Red local/internet |
| **Usuarios** | 1 por navegador | Múltiples |
| **Persistencia** | Si se limpia navegador se pierde | Permanente en BD |
| **Límite** | ~5-10 MB | Ilimitado |
| **Uso** | Personal, offline | Empresarial, compartido |

---

## 🔄 Migrar Datos de localStorage a MySQL

Si ya tienes datos en la versión local y quieres pasarlos a MySQL:

1. **Abrir** `control_denominaciones.html` (versión local)
2. **Abrir consola** del navegador (F12)
3. **Copiar datos:**
   ```javascript
   console.log(localStorage.getItem('historial_denominaciones'))
   ```
4. **Guardar** el JSON en un archivo
5. **Importar** manualmente o crear script de migración

(Puedo crear un script de migración automática si lo necesitas)

---

## 🐛 Troubleshooting

### **Error: No conecta con el servidor**
- Verificar que START-SERVER-MYSQL.bat esté ejecutándose
- Verificar en el CMD que diga "Servidor corriendo en: http://localhost:3002"

### **Error: MySQL no inicia**
```bash
net start MySQL84
```

### **Error: Base de datos no existe**
Ejecutar de nuevo:
```
INSTALL-MYSQL.bat
```

### **Ver logs del servidor**
Los errores aparecen en la ventana CMD donde corre START-SERVER-MYSQL.bat

### **Reinstalar dependencias**
```bash
cd backend
npm install
```

---

## 🌐 Desplegar en Servidor Real

### **Opción 1: VPS/Cloud**
1. Instalar Node.js y MySQL en el servidor
2. Subir archivos del proyecto
3. Configurar credenciales MySQL en `backend/server.js`
4. Ejecutar: `npm install` y `npm start`
5. Usar PM2 para mantener servidor activo:
   ```bash
   npm install -g pm2
   pm2 start backend/server.js --name denominaciones
   pm2 startup
   pm2 save
   ```

### **Opción 2: Hosting Compartido (con Node.js)**
1. Subir archivos por FTP
2. Configurar base de datos MySQL desde panel
3. Actualizar credenciales en server.js
4. Iniciar con comando del hosting

---

## 📊 Ventajas de Usar MySQL

✅ **Datos centralizados** - Acceso desde cualquier computadora
✅ **Multi-usuario** - Varios usuarios pueden usar el sistema
✅ **Respaldo automático** - Backups programados de MySQL
✅ **Reportes avanzados** - Queries SQL para análisis
✅ **Escalable** - Soporta miles de registros
✅ **Seguridad** - Control de acceso por usuarios
✅ **API REST** - Puede integrarse con otras aplicaciones

---

## 📝 Siguientes Pasos

- [ ] Agregar autenticación de usuarios
- [ ] Exportar historial a Excel/PDF
- [ ] Dashboard con gráficas
- [ ] Filtros por fecha en historial
- [ ] Notificaciones en tiempo real
- [ ] App móvil

---

## 💡 Tips

- **Puerto ocupado:** Si el puerto 3002 está en uso, cambiar en `backend/server.js` línea 7
- **Contraseña MySQL:** Cambiar en `backend/server.js` línea 23
- **Backup:** Hacer respaldo regular de la base de datos:
  ```bash
  "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysqldump.exe" -u root -p denominaciones_db > backup.sql
  ```

---

**© 2026 Lxrala21** - Control de Denominaciones MXN con MySQL

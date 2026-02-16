# 🎨 Dark Minimal Theme - Guía de Uso

**Tema oscuro minimalista** creado para aplicaciones web profesionales.

---

## 📁 Archivos

- `dark-minimal-theme.css` - Archivo CSS reutilizable con todos los estilos

---

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| **Fondo principal** | `#0a0a0a` | Body background |
| **Contenedor** | `#1a1a1a` | Contenedores principales, cards |
| **Secciones** | `#1f1f1f` | Tarjetas, secciones destacadas |
| **Bordes sutiles** | `#2a2a2a` | Bordes principales |
| **Bordes hover** | `#3a3a3a` | Bordes en hover/focus |
| **Hover/Focus** | `#4a4a4a` | Estados interactivos |
| **Texto primario** | `#ffffff` | Títulos, texto importante |
| **Texto secundario** | `#e0e0e0` | Texto general |
| **Texto terciario** | `#b0b0b0` | Labels, subtítulos |
| **Texto muted** | `#8a8a8a` | Texto menos importante |
| **Texto disabled** | `#5a5a5a` | Elementos deshabilitados |

---

## 🚀 Cómo usar en nuevos proyectos

### Opción 1: Link al archivo CSS

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <link rel="stylesheet" href="dark-minimal-theme.css">
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Mi Aplicación</h1>
            <p>Descripción de la app</p>
        </div>
        <!-- Tu contenido aquí -->
    </div>
</body>
</html>
```

### Opción 2: Copiar estilos inline

Copia el contenido del archivo CSS y pégalo dentro de `<style>` tags en tu HTML.

---

## 📦 Clases disponibles

### Layout

```html
<div class="container">
    <!-- Contenedor principal centrado -->
</div>

<div class="section">
    <!-- Sección con fondo y bordes -->
    <h2 class="section-title">Título de Sección</h2>
</div>

<div class="card">
    <!-- Tarjeta individual -->
    <span class="card-title">Título</span>
</div>
```

### Grid System

```html
<div class="grid grid-2">
    <!-- Grid de 2 columnas -->
</div>

<div class="grid grid-3">
    <!-- Grid de 3 columnas -->
</div>

<div class="grid grid-4">
    <!-- Grid de 4 columnas -->
</div>
```

### Inputs y Forms

```html
<input type="text" placeholder="Escribe aquí...">
<textarea placeholder="Descripción"></textarea>
<select>
    <option>Opción 1</option>
</select>
```

### Botones

```html
<button class="btn">Botón Normal</button>
<button class="btn btn-primary">Botón Primario</button>
```

### Tablas

```html
<table>
    <thead>
        <tr>
            <th>Columna 1</th>
            <th>Columna 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Dato 1</td>
            <td>Dato 2</td>
        </tr>
    </tbody>
</table>
```

### Utilidades de Texto

```html
<p class="text-primary">Texto primario</p>
<p class="text-secondary">Texto secundario</p>
<p class="text-muted">Texto muted</p>

<p class="text-center">Texto centrado</p>
<p class="text-right">Texto derecha</p>

<p class="font-bold">Texto bold</p>
<p class="font-medium">Texto medium</p>

<p class="uppercase">Texto mayúsculas</p>
```

### Utilidades de Espaciado

```html
<!-- Margins -->
<div class="mt-1">Margin top pequeño</div>
<div class="mt-2">Margin top medio</div>
<div class="mt-3">Margin top grande</div>

<div class="mb-1">Margin bottom pequeño</div>
<div class="mb-2">Margin bottom medio</div>
<div class="mb-3">Margin bottom grande</div>

<!-- Padding -->
<div class="p-1">Padding pequeño</div>
<div class="p-2">Padding medio</div>
<div class="p-3">Padding grande</div>
```

---

## 🎯 Ejemplos de Uso

### Header básico

```html
<div class="header">
    <h1>Mi Aplicación</h1>
    <p>Sistema de control y gestión</p>
</div>
```

### Formulario

```html
<div class="section">
    <h2 class="section-title">Nuevo Usuario</h2>

    <div class="card">
        <label class="card-title">Nombre</label>
        <input type="text" placeholder="Escribe el nombre...">
    </div>

    <div class="card">
        <label class="card-title">Email</label>
        <input type="email" placeholder="usuario@ejemplo.com">
    </div>

    <button class="btn btn-primary">Guardar</button>
</div>
```

### Grid de tarjetas

```html
<div class="grid grid-3">
    <div class="card">
        <h3>Tarjeta 1</h3>
        <p>Contenido...</p>
    </div>
    <div class="card">
        <h3>Tarjeta 2</h3>
        <p>Contenido...</p>
    </div>
    <div class="card">
        <h3>Tarjeta 3</h3>
        <p>Contenido...</p>
    </div>
</div>
```

---

## 🎨 Personalización

### Cambiar colores

Edita las variables de color al inicio del archivo CSS:

```css
/* Cambiar fondo principal */
body {
    background: #tu-color-aqui;
}

/* Cambiar color de tarjetas */
.card {
    background: #tu-color-aqui;
}
```

### Agregar nuevas clases

```css
.mi-clase-custom {
    background: #1f1f1f;
    border: 1px solid #2a2a2a;
    padding: 20px;
    border-radius: 4px;
}
```

---

## 📱 Responsive

El tema es 100% responsive. Los grids se convierten en una sola columna en móvil automáticamente.

```css
@media (max-width: 768px) {
    /* Todos los grids se vuelven 1 columna */
}
```

---

## ✅ Compatibilidad

- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

---

## 📝 Notas

- **Tipografía**: Usa las fuentes del sistema (-apple-system, BlinkMacSystemFont, Segoe UI, Inter)
- **Border radius**: 3-4px para look minimalista
- **Transiciones**: 0.2s para interacciones rápidas
- **Letter spacing**: Usado en mayúsculas para mejor legibilidad

---

## 🚀 Proyectos que usan este tema

- ✅ Control de Denominaciones MXN
- [ ] Tu próximo proyecto aquí...

---

**Creado por:** Lxrala21
**Fecha:** 2026-02-16
**Versión:** 1.0

# Estructura del Sitio Web - Restaurante El Patio

## Descripción General
El sitio ha sido refactorizado de una sola página (SPA) a una estructura multi-página (MPA) para mayor modularidad y mantenibilidad.

## Páginas

### 📄 `index.html` - Página de Inicio
- **Secciones:** Hero, Servicios, Nosotros
- **Propósito:** Presentación principal del restaurante
- **Elementos:** Heading principal, propuesta de valor, información general

### 📄 `menu.html` - Catálogo de Platos
- **Secciones:** Menú completo, Pedido en línea
- **Propósito:** Mostrar todos los platos y permite agregar items al carrito
- **Elementos:** Filtros de categoría, info de precios, carrito flotante

### 📄 `galeria.html` - Fotos
- **Secciones:** Galería de imágenes
- **Propósito:** Muestra ambiente, platos y bebidas
- **Elementos:** Grid de fotos, vista ampliada (lightbox)

### 📄 `reservas.html` - Formulario de Reservas
- **Secciones:** Formulario de reserva
- **Propósito:** Permite al cliente solicitar reserva por WhatsApp
- **Elementos:** Campos: nombre, teléfono, fecha, hora, personas, notas

### 📄 `contacto.html` - Información de Contacto
- **Secciones:** Datos de contacto, Ubicación, Mapa
- **Propósito:** Proporciona todos los medios para comunicarse y ubicar el restaurante
- **Elementos:** Teléfono, WhatsApp, dirección, mapa incrustado

## Archivos Compartidos

### 📁 `css/`
- **styles.css** → Variable globales, layout base, componentes reutilizables

### 📁 `js/`
- **app.js** → Lógica principal (navegación, carrito, form de reservas, galería)
- **menu-data.js** → Datos de menú (categorías y platos)
- **translations.js** → Textos multiidioma (español/inglés)

### 📁 `images/`
- **patio/** → Fotos del restaurante, platos y ambiente

## Navegación

**Header (en todas las páginas):**
```
Logo/Inicio → Inicio, Servicios, Menú, Galería, Reservas, Pedido, Contacto
```

**Quick Action Bar (solo móvil):**
```
Menú | Reservar | Contacto
```

**Footer (en todas las páginas):**
```
Horario | Contacto | Ubicación | Redes Sociales | Copyright
```

## Flujos Principales

1. **Visualizar Menú → Agregar al Pedido → Enviar por WhatsApp**
   - Accesible desde cualquier página mediante el botón "Pedido"

2. **Ver Galería → Ampliar Foto**
   - Lightbox modal en galeria.html

3. **Realizar Reserva → Enviar por WhatsApp**
   - Formulario en reservas.html

4. **Ver Ubicación → Google Maps**
   - Mapa incrustado en contacto.html

## Decisiones de Diseño

✅ **Multi-página:** Mejor estructura, SEO mejorado, carga más rápida  
✅ **Header/Footer compartidos:** Consistencia en todas las páginas  
✅ **Carrito persistente:** LocalStorage mantiene pedido entre páginas  
✅ **Lenguajes:** Soporte español/inglés en todas las etiquetas  
✅ **Accesibilidad:** Skip links, ARIA labels, semantic HTML  

---
*Restaurante El Patio © 2026*

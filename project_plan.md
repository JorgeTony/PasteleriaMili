# Milis - Pastelería & Panadería

## 1. Descripción del Proyecto
Sitio web oficial de "Milis", una pastelería y panadería artesanal. El objetivo es mostrar productos de alta calidad (pasteles, panes, postres) con una galería visual atractiva, permitiendo a los visitantes explorar el catálogo y seleccionar productos mediante un carrito de compras. El público objetivo son amantes de la repostería artesanal.

## 2. Estructura de Páginas
- `/` - Página Principal (Hero, Galería, Catálogo, Testimonios, Footer)
- `/products` - Catálogo completo de productos
- `/cart` - Vista del carrito de compras (modal/sidebar)

## 3. Funcionalidades Principales
- [x] Hero section con imagen de fondo impactante
- [x] Galería destacada de productos (pasteles, panes, postres)
- [x] Catálogo de productos con tarjetas y precios
- [x] Carrito de compras (agregar, quitar, cantidad)
- [x] Sección Sobre Nosotros con estadísticas
- [x] Sección de Testimonios de clientes
- [x] Footer con newsletter, navegación y contacto
- [ ] Página de checkout (fase futura)

## 4. Modelo de Datos (Mock)
- Productos: id, nombre, categoría, precio, imagen, descripción, stock
- Carrito: items (productId, cantidad), total

## 5. Integraciones
- Supabase: No requerido en fase inicial
- Shopify: Posible integración futura para pagos reales
- Stripe: Posible integración futura

## 6. Plan de Fases

### Fase 1: Página Principal + Carrito (ACTUAL)
- Objetivo: Homepage completa con todas las secciones y carrito funcional
- Entregable: UI completa con mock data, carrito interactivo

### Fase 2: Página de Catálogo Completo
- Objetivo: Página independiente con todos los productos, filtros por categoría
- Entregable: /products con búsqueda y filtros

### Fase 3: Conectar Tienda Real
- Objetivo: Integrar Shopify o Stripe para pagos reales
- Entregable: Checkout funcional

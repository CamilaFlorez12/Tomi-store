# 🛍️ Tomi Store

**Tomi Store** es una tienda en línea que permite visualizar productos, filtrarlos por categoría, ordenarlos por precio o nombre, y agregarlos a un carrito con persistencia en `localStorage`. El proyecto está diseñado para ofrecer una experiencia de usuario intuitiva y agradable.

---

## 📁 Estructura de esta Carpeta


#### Página principal donde se podrá redirigir a las demás páginas.
![Portada Tomi store](./imagenes/Pag1%20Tomi%20store.png)
#### Cátalogo de las prendas que se venden en el sitio web
![Portada Tomi store](./imagenes/Pag2%20Tomi%20store.png)
#### Categorias divididas por prendas de mujer,hombre,joyeria y tecnología
![Portada Tomi store](./imagenes/Pag3%20Tomi%20store.png)
#### Vista del carrito dónde se guardan los productos añadidos
![Portada Tomi store](./imagenes/Pag4%20Tomi%20store.png)
## Análisis de diseño de interfaz y experiencia de usuario  Tomi Store 🛍️

## 🌐 Visión general del proyecto
Tomi Store es una tienda virtual que presenta productos obtenidos de una API pública, permitiendo a los usuarios visualizar, filtrar, agregar al carrito y gestionar sus compras de manera intuitiva.

## 🎨 Decisiones de diseño de la interfaz (UI)

1. **Estética moderna y minimalista**
   - Se utilizaron colores neutros (blanco, negro, gris) con acentos sutiles en los botones para mantener una estética limpia que no distraiga de los productos.
   - Tipografía clara y legible con jerarquías bien definidas para facilitar la lectura.

2. **Distribución con grid/flex**
   - El uso de `flexbox` y `grid` en la disposición de los productos permite una visualización uniforme y adaptativa según el tamaño de la pantalla.

3. **Íconos intuitivos**
   - Se emplearon íconos de carrito y navegación que los usuarios reconocen fácilmente, mejorando la interacción sin necesidad de mucho texto.

4. **Componentes reutilizables**
   - Las tarjetas de producto y el diseño del header/footer están pensados como componentes reutilizables, facilitando la escalabilidad del sitio.

## 🤝 Decisiones de experiencia de usuario (UX)

1. **Interacción clara con el carrito**
   - El ícono del carrito muestra un contador con la cantidad de productos añadidos, ayudando al usuario a seguir el estado de su compra.
   - Al hacer clic, se despliega una sección lateral con el detalle del carrito, lo cual evita redireccionamientos y mejora la fluidez.

2. **Carga dinámica de productos**
   - Se utiliza `fetch` para obtener los productos desde la API, lo que permite mantener el sitio actualizado sin intervención manual.

3. **Filtros y ordenamiento**
   - Los usuarios pueden filtrar los productos por categoría y ordenar por precio o nombre, facilitando la búsqueda dentro del catálogo.

4. **Persistencia del carrito**
   - Se usa `localStorage` para conservar el estado del carrito incluso si el usuario recarga la página o navega a otras secciones.

5. **Responsive Design**
   - Se implementaron `@media queries` para adaptar el diseño a dispositivos móviles, asegurando una buena experiencia en distintos tamaños de pantalla.

## 🔍 Mejores prácticas aplicadas
- Separación clara entre estructura (HTML), estilo (CSS) y lógica (JavaScript).
- Código modular y organizado.

---

## 🧱 Explicación de la estructura de datos usada
### 📦 Productos
Los productos se obtienen directamente desde una API externa (https://fakestoreapi.com/products) usando fetch. Esa respuesta se guarda en una variable llamada products, que es un arreglo de objetos. Cada objeto representa un producto y trae varias propiedades como:
- id: un número único para identificar el producto.
- title: el nombre del producto.
- price: el precio del producto.
- description: una descripción corta.
- category: la categoría a la que pertenece (por ejemplo: ropa de mujer, electrónica, etc.).
- image: la URL de la imagen del producto.

Estos productos se usan para mostrarlos en la tienda principal, filtrarlos por categoría, o para ordenarlos por nombre o precio.

## 🛒 Carrito de compras
Cuando un usuario hace clic en el ícono de agregar al carrito, el producto se guarda en un arreglo llamado car. Este arreglo se guarda en el localStorage del navegador para que los productos añadidos al carrito no se pierdan aunque se recargue la página o el usuario navegue entre vistas.

Cada producto dentro del carrito tiene la misma estructura que el original, pero se le agrega una propiedad nueva llamada cantidad, que sirve para saber cuántas veces se ha agregado ese producto.

Ejemplo de cómo queda un carrito en localStorage:

``` json
[
  {
    "id": 3,
    "title": "Camisa azul",
    "price": 25.99,
    "image": "https://...",
    "cantidad": 2
  },
  {
    "id": 7,
    "title": "Aretes de plata",
    "price": 15.50,
    "image": "https://...",
    "cantidad": 1
  }
]

```
Cada vez que se agrega o elimina un producto, el localStorage se actualiza con localStorage.setItem("car", JSON.stringify(car));, y cuando se carga la página o se consulta el carrito, se obtiene con JSON.parse(localStorage.getItem("car")).

## 🗂 Filtros y productos filtrados
Cuando el usuario hace clic en una categoría (como Mujer, Hombre, Electrónica, etc.), los productos se filtran en función de la propiedad category, y se guarda ese nuevo arreglo filtrado dentro del localStorage con la clave "filtered".

Esto se hace así para poder navegar a otra página (por ejemplo a category.html) y seguir viendo solo los productos de esa categoría sin tener que filtrar de nuevo.

## 🔃 Ordenamiento
También se permite al usuario ordenar los productos por nombre (alfabéticamente) o por precio. Esto se hace con el método .sort() sobre una copia del arreglo de productos. El orden no afecta el arreglo original, solo el que se muestra en pantalla.

## 🎯 Justificación de los filtros y ordenamientos implementados (usabilidad)

Los filtros por categoría y el ordenamiento de productos se implementaron para facilitarle al usuario la búsqueda rápida y eficiente de lo que desea comprar. Desde una perspectiva de usabilidad, estas funcionalidades permiten mejorar la experiencia del usuario al reducir el tiempo que le toma encontrar productos específicos.

## 🧭 Filtros por categoría
Se permiten filtrar los productos según la categoría (ropa de mujer, ropa de hombre, joyería y electrónica). Esto responde a una necesidad básica en cualquier tienda online: permitirle al usuario enfocarse solo en lo que le interesa, sin tener que recorrer todos los productos disponibles.

Además, al hacer clic en una categoría:
- Se filtran los productos localmente.

- Se guarda ese filtro en localStorage.

- Se redirige a una nueva página con los productos ya filtrados.

Esto ayuda a mantener la persistencia de la vista filtrada y evita confusión, haciendo que la navegación se sienta más natural e intuitiva.

## ↕️ Ordenamiento
Se agregó también un selector para ordenar los productos por:

- Precio: de menor a mayor.

- Nombre: orden alfabético.

Esta opción le da al usuario el control sobre cómo quiere ver los productos, lo que es útil por ejemplo para:

Buscar los productos más económicos.

Encontrar un producto rápidamente si ya conoce su nombre.

El selector se encuentra visible sobre la sección de productos, lo que lo hace fácil de encontrar y usar. Además, el ordenamiento se realiza en tiempo real sin recargar la página, haciendo que la interacción sea más rápida y fluida.